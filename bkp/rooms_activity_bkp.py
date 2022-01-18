# -*- coding: utf-8 -*-

from db import Database
from openland import Openland
from utils import with_retry, datetime_now, date_format

from datetime import datetime, timedelta


def _get_chat_messages(ol: Openland,
                       chat_id: str,
                       fetch_date: datetime,
                       before_msg_id: str = "",
                       _messages: list = None) -> list:
    """
    Returns a list of collected messages fetched by chat_id and date
    Datetime must be in format datetime(YYYY, MM, DD) without hrs, mints, sec, ms
    e.g. date = datetime(dt.year, dt.mnt, dt. day)
    By default we fetch all messages for yesterday
    """

    if _messages is None:
        _messages = []
    fetch_date = fetch_date.replace(hour=0, minute=0, second=0, microsecond=0)
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
            created_at = datetime(dtobj.year, dtobj.month, dtobj.day)
            if fetch_date == created_at:
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


def main():
    date_time = datetime_now - timedelta(days=1)
    print("Counting messages for {}".format(date_time.strftime(date_format)))

    with Openland() as ol:
        organization = ol.organization()
        rooms = ol.rooms(int(organization["roomsCount"]))
        rooms_messages_data = []
        total_messages = 0
        for room in rooms:
            messages = len(_get_chat_messages(ol, room["id"], date_time))
            total_messages += messages
            rooms_messages_data.append((room["id"], date_time, messages))

        rooms_messages_data.append((organization["id"], date_time, total_messages))

        print("Total number of messages: {}".format(total_messages))

        db = Database()
        db.insert_rooms_activity(rooms_messages_data)


if __name__ == "__main__":
    with_retry(main)
