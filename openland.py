# -*- coding: utf-8 -*-

from __future__ import annotations

import json
import os
from typing import Dict, List, NoReturn

import websocket

_prod = os.getenv("env_name", "dev") == "prod"


class Openland:
    def __init__(self):
        self.__id = 0
        self._organization_id = "3YgM91xQP1sa3ea5mxxVTwRkJg"
        self._organization_name = "Mesto.co"
        self.__auth_token = os.getenv("x_openland_token")
        self.__ws_connection = None

    # Private methods:

    def __enter__(self):
        return self.connect()

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.disconnect()

    def _send_request(self, request) -> Dict:
        if request.get("id"):
            self.__id += 1
            request["id"] = str(self.__id)

        self._ws_send(request)
        response = self._handle_response(self.__id)

        if response.get("payload") and response.get("payload").get("errors"):
            errors = response.get("payload").get("errors")
            # retry unexpected errors:
            if "unexpected error" in errors[0]["message"]:
                return self._send_request(request)
        return response

    def _handle_response(self, expected_id) -> Dict:
        response = self._ws_recv()

        # Handle "ping" request from the server:
        while response.get("type") == "ping":
            self._ws_send({"type": "pong"})
            response = self._handle_response(expected_id)

        # Ignore "complete" response from the server:
        while response.get("type") == "complete":
            response = self._handle_response(expected_id)

        # Ignore delayed responses for previous requests:
        while response.get("id") and int(response.get("id")) < expected_id:
            response = self._handle_response(expected_id)

        return response

    def _ws_send(self, request) -> NoReturn:
        self._verify_connected()

        request_json = json.dumps(request)
        if not _prod:
            print("Sending: {}".format(request_json))
        self.__ws_connection.send(request_json)

    def _ws_recv(self) -> Dict:
        self._verify_connected()

        response = self.__ws_connection.recv()
        if not _prod:
            print("Received: {}".format(response))
        return json.loads(response)

    def _verify_connected(self) -> NoReturn:
        if self.__ws_connection is None:
            raise ConnectionError("Not connected to Openland")

    @staticmethod
    def _with_id(payload: Dict) -> Dict:
        return {
            "id": "-to-be-replaced-",
            "type": "start",
            "payload": payload
        }

    # Public methods:

    def connect(self) -> Openland:
        if self.__ws_connection:
            return self

        self.__ws_connection = websocket.create_connection("wss://api-us.openland.com/gql_ws")
        response = self._send_request({
            "protocol_v": 2,
            "type": "connection_init",
            "payload": {
                "x-openland-token": self.__auth_token,
                "protocol_v": 2,
                "type": "connection_init"
            }
        })

        if response.get("type") != "connection_ack":
            raise ConnectionError("Did not receive connection_ack from Openland: {}".format(response))

        if not _prod:
            print("Connected to Openland")
        return self

    def disconnect(self) -> NoReturn:
        ws = self.__ws_connection
        self.__ws_connection = None
        ws.close()
        if not _prod:
            print("Disconnected from Openland")

    def close(self) -> NoReturn:
        self.disconnect()

    def organization(self) -> Dict:
        response = self._send_request(self._with_id({
            "name": "Organization",
            "query": "query Organization($organizationId:ID!){organization(id:$organizationId){__typename ...OrganizationFragment}}fragment OrganizationFragment on Organization{__typename id name shortname membersCount shortname about roomsCount:betaPublicRoomsCount}",
            "variables": {
                "organizationId": self._organization_id
            }
        }))
        return response["payload"]["data"]["organization"]

    def members(self, limit: int = 200, after: str = None) -> List:
        payload = {
            "name": "OrganizationMembers",
            "query": "query OrganizationMembers($organizationId:ID!,$first:Int,$after:ID){organization(id:$organizationId){members:alphaOrganizationMembers(first:$first,after:$after){role user{id name firstName lastName photo phone birthDay email website about location isBot lastSeen linkedin instagram twitter facebook shortname joinDate primaryOrganization{id name shortname}}}}}",
            "variables": {
                "organizationId": self._organization_id,
                "first": limit
            }
        }
        if after:
            payload["variables"]["after"] = after

        response = self._send_request(self._with_id(payload))
        return response["payload"]["data"]["organization"]["members"]

    def rooms(self, limit: int = 200, all_info: bool = False) -> List:
        query = "query OrganizationPublicRooms($organizationId:ID!,$first:Int!,$after:ID){organizationPublicRooms(id:$organizationId,first:$first,after:$after){__typename items{__typename ...SharedRoomView}cursor}}fragment SharedRoomView on SharedRoom{__typename id title membersCount}"
        if all_info:
            query = "query OrganizationPublicRooms($organizationId:ID!,$first:Int!,$after:ID){organizationPublicRooms(id:$organizationId,first:$first,after:$after){__typename items{__typename ...SharedRoomView}cursor}}fragment SharedRoomView on SharedRoom{__typename id title membersCount photo shortname description isChannel isPremium repliesEnabled socialImage kind welcomeMessage{__typename isOn sender{__typename id name}message} owner{__typename id}}"

        response = self._send_request(self._with_id({
            "name": "OrganizationPublicRooms",
            "query": query,
            "variables": {
                "organizationId": self._organization_id,
                "first": limit
            }
        }))
        return response["payload"]["data"]["organizationPublicRooms"]["items"]

    def online_count(self, chat_id: str) -> Dict:
        response = self._send_request(self._with_id({
            "name": "ChatOnlinesCountWatch",
            "query": "subscription ChatOnlinesCountWatch($chatId:ID!){chatOnlinesCount(chatId:$chatId){__typename onlineMembers}}",
            "variables": {
                "chatId": chat_id
            }
        }))
        return response["payload"]

    def messages(self, chat_id: str, before_message_id: str = "", first: int = 20, include_text: bool = False):
        query = "query ChatInitFromUnread($chatId:ID!,$before:ID,$first:Int!){gammaMessages(chatId:$chatId,first:$first,before:$before){__typename messages{__typename ...FullMessage}haveMoreForward haveMoreBackward}state:conversationState(id:$chatId){__typename state}lastReadedMessage(chatId:$chatId){__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge} ... on GeneralMessage{__typename id commentsCount reactionCounters{__typename ...MessageReactionCounter}}... on StickerMessage{__typename id commentsCount sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge} source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}... on GeneralMessage{__typename id edited commentsCount}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment UserShort on User{__typename id name}"
        if include_text:
            query = "query ChatInitFromUnread($chatId:ID!,$before:ID,$first:Int!){gammaMessages(chatId:$chatId,first:$first,before:$before){__typename messages{__typename ...FullMessage}haveMoreForward haveMoreBackward}state:conversationState(id:$chatId){__typename state}lastReadedMessage(chatId:$chatId){__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message ... on GeneralMessage{__typename id commentsCount reactionCounters{__typename ...MessageReactionCounter}}... on StickerMessage{__typename id commentsCount sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge} source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}... on GeneralMessage{__typename id edited commentsCount}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment UserShort on User{__typename id name}"

        response = self._send_request(self._with_id({
            "name": "ChatInitFromUnread",
            "query": query,
            "variables": {
                "chatId": chat_id,
                "before": before_message_id,
                "first": first
            }
        }))
        return response["payload"]

    def messages_after(self, chat_id: str, after_id: str, limit: int = 20):
        query = "query ChatNewLoadAfter($chatId:ID!,$after:ID!,$limit:Int!){batch:gammaMessages(chatId:$chatId,first:$limit,after:$after){__typename messages{__typename ...ChatNewMessageFragment}haveMoreForward}}fragment ChatNewMessageFragment on ModernMessage{__typename id date seq}"

        response = self._send_request(self._with_id({
            "name": "ChatNewLoadAfter",
            "query": query,
            "variables": {
                "chatId": chat_id,
                "after": after_id,
                "limit": limit
            }
        }))
        return response["payload"]

    def messages_before(self, chat_id: str, before_id: str, limit: int = 20):
        query = "query ChatNewLoadBefore($chatId:ID!,$before:ID!,$limit:Int!){batch:gammaMessages(chatId:$chatId,first:$limit,before:$before){__typename messages{__typename ...ChatNewMessageFragment}haveMoreBackward}}fragment ChatNewMessageFragment on ModernMessage{__typename id date seq}"

        response = self._send_request(self._with_id({
            "name": "ChatNewLoadBefore",
            "query": query,
            "variables": {
                "chatId": chat_id,
                "before": before_id,
                "limit": limit
            }
        }))
        return response["payload"]

    def room_read(self, chat_id: str, message_id: str):
        query = "mutation RoomRead($id:ID!,$mid:ID!){roomRead(id:$id,mid:$mid)}"
        response = self._send_request(self._with_id({
            "name": "RoomRead",
            "query": query,
            "variables": {
                "id": chat_id,
                "mid": message_id
            }
        }))
        return response["payload"]

    def room_join(self, room_id: str) -> Dict:
        response = self._send_request(self._with_id({
            "name": "RoomJoin",
            "query": "mutation RoomJoin($roomId:ID!){join:betaRoomJoin(roomId:$roomId){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}",
            "variables": {
                "roomId": room_id
            }
        }))
        return response["payload"]

    def room_mute(self, room_id) -> Dict:
        response = self._send_request(self._with_id({
            "name": "RoomSettingsUpdate",
            "query": "mutation RoomSettingsUpdate($settings:RoomUserNotificaionSettingsInput!,$roomId:ID!){betaRoomUpdateUserNotificationSettings(settings:$settings,roomId:$roomId){__typename id mute}}",
            "variables": {
                "roomId": room_id,
                "settings": {
                    "mute": True
                }
            }
        }))
        return response["payload"]

    def send_message(self, to_chat_id: str, message: str, spans: List = None, mentions: List = None) -> Dict:
        if spans is None:
            spans = []
        if mentions is None:
            mentions = []

        response = self._send_request(self._with_id({
            "name": "SendMessage",
            "query": "mutation SendMessage($chatId:ID!,$message:String,$replyMessages:[ID!],$mentions:[MentionInput!],$fileAttachments:[FileAttachmentInput!],$spans:[MessageSpanInput!],$repeatKey:String){sentMessage:sendMessage(chatId:$chatId,message:$message,replyMessages:$replyMessages,mentions:$mentions,fileAttachments:$fileAttachments,spans:$spans,repeatKey:$repeatKey)}",
            "variables": {
                "chatId": to_chat_id,
                "message": message,
                "replyMessages": [],
                "mentions": mentions,
                "fileAttachments": None,
                "spans": spans
            }
        }))
        return response["payload"]

    def get_chat_id(self, user_id: str) -> str:
        response = self._send_request(self._with_id({
            "name": "RoomChat",
            "query": "query RoomChat($id:ID!){room(id:$id){id}}",
            "variables": {
            "id": user_id
            }
        }))
        return response["payload"]["data"]["room"]["id"]

    def get_room(self, room_id: str) -> Dict:
        response = self._send_request(self._with_id({
            "name": "RoomChat",
            "query": "query RoomChat($id:ID!){room(id: $id){__typename ...RoomShort}} fragment RoomShort on Room{__typename ... on SharedRoom{id title membership membersCount}}",
            "variables": {
                "id": room_id
            }
        }))
        return response["payload"]["data"]["room"]

    def room_members(self, room_id: str, limit: int = 200, after: str = None) -> List:
        payload = {
            "name": "RoomMembersPaginated",
            "query": "query RoomMembersPaginated($roomId:ID!,$first:Int,$after:ID){members:roomMembers(roomId:$roomId,first:$first,after:$after){__typename user{__typename ...UserShort}}} fragment UserShort on User{__typename ...UserSmall} fragment UserSmall on User{__typename id name}",
            "variables": {
                "roomId": room_id,
                "first": limit
            }
        }
        if after:
            payload["variables"]["after"] = after

        response = self._send_request(self._with_id(payload))
        return response["payload"]["data"]["members"]

    def member(self, member_id: str) -> Dict:
        response = self._send_request(self._with_id({
            "name": "User",
            "query": "query User($userId:ID!){user(id:$userId){__typename ...UserFull}} fragment UserFull on User{__typename id name firstName lastName photo phone birthDay email website about location isBot lastSeen joinDate linkedin instagram twitter facebook shortname primaryOrganization{id name shortname}}",
            "variables": {
                "userId": member_id
            }
        }))
        return response["payload"]["data"]["user"]
