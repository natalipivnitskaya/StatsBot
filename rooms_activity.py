# -*- coding: utf-8 -*-

from db import Database
from openland import Openland
from utils import with_retry, datetime_now, datetime_format

from datetime import datetime, timedelta


def _separate_by_hour(messages):
    msgs_per_hour = []

    hour_msg_cnt = 0
    prev_msg_date = None
    for msg in messages:
        msg_date = datetime.fromtimestamp(int(msg["date"]) // 1000)
        msg_date = msg_date.replace(minute=0, second=0, microsecond=0)
        if prev_msg_date is None:
            prev_msg_date = msg_date
            hour_msg_cnt = 1
        elif msg_date == prev_msg_date:
            hour_msg_cnt += 1
        elif msg_date != prev_msg_date:
            msgs_per_hour.append((prev_msg_date.strftime(datetime_format), hour_msg_cnt))
            prev_msg_date = msg_date
            hour_msg_cnt = 1
        if msg == messages[-1]:
            msgs_per_hour.append((prev_msg_date.strftime(datetime_format), hour_msg_cnt))

    return msgs_per_hour


def _get_chat_messages(ol: Openland,
                       chat_id: str,
                       fetch_date: datetime,
                       before_msg_id: str = "",
                       _messages: list = None) -> list:
    """
    Returns a list of collected messages fetched by chat_id and date
    Datetime must be in format datetime(YYYY, MM, DD, HH, MM, SS)
    e.g. date = datetime(dt.year, dt.mnt, dt. day)
    By default we fetch all messages for yesterday
    """

    if _messages is None:
        _messages = []
    fetched_msgs = None

    while fetched_msgs is None:
        payload = ol.messages(chat_id, before_msg_id)

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
        for message in fetched_msgs:
            #  ms -> sec, so / 1000
            dtobj = datetime.fromtimestamp(int(message["date"]) / 1000)
            created_at = datetime(dtobj.year, dtobj.month, dtobj.day, dtobj.hour, dtobj.minute)
            if fetch_date <= created_at:
                if message["__typename"] == "GeneralMessage":
                    _messages.append(message)
                #  Messages about groups joins / pinned posts / etc
                if message["__typename"] == "ServiceMessage":
                    pass
                #  if we're stuck in the last message with the current date, go deeper
                if message == fetched_msgs[-1]:
                    _get_chat_messages(ol, chat_id, fetch_date, message["id"], _messages)
            #  go ahead until we find requested message dates
            elif message == fetched_msgs[-1] and fetch_date < created_at and len(_messages) < 1:
                _get_chat_messages(ol, chat_id, fetch_date, fetched_msgs[-1]["id"], _messages)

    return _messages


def get_last_message(ol: Openland, chat_id: str) -> dict:

    more = True
    start_from_id = ""
    last_message = {}

    while more:
        fetched_msgs = ol.messages_after(chat_id, start_from_id)
        fetched_msgs = fetched_msgs["data"]["batch"]["messages"]
        if fetched_msgs:
            start_from_id = fetched_msgs[0]["id"]
            last_message = fetched_msgs[0]
        else:
            more = False

    return last_message


def main():
    fetch_date = datetime_now - timedelta(hours=1)
    print(f"Counting messages for {fetch_date}")

    with Openland() as ol:
        organization = ol.organization()
        rooms = ol.rooms(int(organization["roomsCount"]))
        rooms_messages_data = []
        total_messages = 0
        for room in rooms:
            last_msg = get_last_message(ol, room["id"])
            ol.room_read(room["id"], last_msg["id"])
            fetched_room_messages = _get_chat_messages(ol, room["id"], fetch_date)
            separated_room_messages = _separate_by_hour(fetched_room_messages)
            for date_entry in separated_room_messages:
                (date, cnt) = date_entry
                total_messages += cnt
                rooms_messages_data.append((room["id"], fetch_date, cnt))

        rooms_messages_data.append((organization["id"], fetch_date, total_messages))
        print("Total number of messages: {}".format(total_messages))

        db = Database()
        db.insert_rooms_activity(rooms_messages_data)


if __name__ == "__main__":
    with_retry(main)
