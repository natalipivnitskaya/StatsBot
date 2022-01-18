# -*- coding: utf-8 -*-
import sys
from datetime import datetime
from typing import List

from db import Database
from openland import Openland
from utils import with_retry, datetime_format

fetch_date = datetime(year=2020, month=5, day=1)
db = Database()


def save_messages(ol: Openland,
                  chat_id: str,
                  before_msg_id: str = "",
                  message_cnt: int = 0) -> int:

    fetched_msgs = None
    while fetched_msgs is None:
        payload = ol.messages(chat_id, before_msg_id, first=100, include_text=True)

        if payload.get("errors"):
            msg = payload["errors"][0]["message"]
            if "Access Denied" in msg:
                join_resp = ol.room_join(chat_id)
                if not join_resp.get("errors"):
                    ol.room_mute(chat_id)
                else:
                    print("Can not join the room {}: {}".format(chat_id, join_resp["errors"][0]["message"]))
                    fetched_msgs = {}
            else:
                print("Unknown error from Openland: {}".format(msg))
                fetched_msgs = {}
        else:
            fetched_msgs = payload["data"]["gammaMessages"]["messages"]

    if fetched_msgs:
        last_msg = fetched_msgs[-1]
        _messages = []
        for message in fetched_msgs:
            #  ms -> sec, so / 1000
            created_at = msg_date(message)
            if fetch_date <= created_at:
                if message["__typename"] == "GeneralMessage" and message["message"]:
                    message_cnt += 1
                    _messages.append((chat_id, message["sender"]["id"], created_at.strftime(datetime_format),
                                      message["message"], reactions(message["reactionCounters"]),
                                      message["commentsCount"]))
                #  Messages about groups joins / pinned posts / etc
                if message["__typename"] == "ServiceMessage":
                    pass
                #  if we're stuck in the last message with the current date, go deeper
                if message == last_msg:
                    if _messages:
                        db.insert_message_history(_messages)
                    message_cnt = save_messages(ol, chat_id, last_msg["id"], message_cnt)
            #  go ahead until we find requested message dates
            elif message == last_msg and fetch_date < created_at and len(_messages) < 1:
                if _messages:
                    db.insert_message_history(_messages)
                message_cnt = save_messages(ol, chat_id, last_msg["id"], message_cnt)

    return message_cnt


def reactions(counters: List) -> int:
    result = 0
    for counter in counters:
        result += int(counter["count"])
    return result


def msg_date(message):
    #  ms -> sec, so / 1000
    dt_obj = datetime.fromtimestamp(int(message["date"]) / 1000)
    return dt_obj.replace(second=0, microsecond=0)


def get_last_message_id(ol: Openland, chat_id: str) -> str:
    more = True
    last_message = None
    last_message_id = ""

    while more:
        fetched_msgs = ol.messages_after(chat_id, last_message_id)
        fetched_msgs = fetched_msgs["data"]["batch"]["messages"]
        if fetched_msgs:
            last_message = fetched_msgs[0]
            last_message_id = last_message["id"]
        else:
            more = False

    if last_message:
        last_message_seq = last_message["seq"]
        last_message_date = msg_date(last_message).strftime(datetime_format)
        print(f"Last message seq={last_message_seq}, date={last_message_date}")
    return last_message_id


def save_room(ol: Openland, room_num: int, room_id: str, room_name: str):
    print(f"Room#{room_num}: {room_name} ({room_id})")

    last_msg_id = get_last_message_id(ol, room_id)
    ol.room_read(room_id, last_msg_id)

    sys.stdout.flush()
    total_saved_messages = save_messages(ol, room_id)
    db.update_rooms_saved_messages(room_id, total_saved_messages)
    print("Total number of saved messages: {}".format(total_saved_messages))


def main():
    print(f"Saving messages up to {fetch_date}\n")

    with Openland() as ol:
        rooms = db.get_rooms_unsaved()
        # rooms = [("4dmAE76OJySEZav4evRnU9V9DW", "Mesto.Kazakhstan"),
        #          ("4dmAE76OJySEZav4evRnU9V9DW", "Mesto.Kazakhstan")]

        room_num = 0
        for room_id, room_name in rooms:
            if room_id == "3YgM91xQP1sa3ea5mxxVTwRkJg":
                continue    # Skip Mesto.co

            room_num += 1
            with_retry(to_run=lambda: save_room(ol, room_num, room_id, room_name), max_retries=10)


if __name__ == "__main__":
    with_retry(main)
