# -*- coding: utf-8 -*-

from db import Database
from openland import Openland
from rooms_activity_hour import get_last_message, _get_chat_messages
from utils import with_retry, datetime_now, datetime_format

from datetime import datetime, timedelta

# TODO:
# 1. Move common funcs to another level (? rename they)


def main():
    fetch_date = datetime_now - timedelta(days=1)
    print(f"Counting users for {fetch_date}")

    with Openland() as ol:
        organization = ol.organization()
        rooms = ol.rooms(int(organization["roomsCount"]))
        rooms_messages_data = []
        total_messages = 0
        uniq_users = []

        for room in rooms:
            last_msg = get_last_message(ol, room["id"])
            ol.room_read(room["id"], last_msg["id"])
            fetched_room_messages = _get_chat_messages(ol, room["id"], fetch_date)
            for msg in fetched_room_messages:
                if msg["sender"]["id"] not in uniq_users:
                    uniq_users.append(msg["sender"]["id"])
        rooms_messages_data.append((organization["id"], fetch_date, total_messages))
        print(f"Total number of uniq users at least with one msg: {len(uniq_users)}")

        db = Database()
        db.insert_users_with_one_msg(len(uniq_users), fetch_date)


if __name__ == "__main__":
    with_retry(main)
