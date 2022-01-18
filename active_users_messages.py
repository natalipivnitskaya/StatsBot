# -*- coding: utf-8 -*-

import sys
import getopt
from db import Database
from openland import Openland
from rooms_activity import get_last_message, _get_chat_messages
from utils import with_retry, datetime_now, datetime_format

from datetime import timedelta


def main():
    event_name, last_seen_days = _parse_options()
    date_time = datetime_now.strftime(datetime_format)
    fetch_date = datetime_now - timedelta(days=last_seen_days)
    print(f"Counting active users for {date_time}: last_seen_days={last_seen_days}, event_name={event_name}")

    with Openland() as ol:
        organization = ol.organization()
        rooms = ol.rooms(int(organization["roomsCount"]))
        total_messages = 0
        uniq_users = []

        for room in rooms:
            last_msg = get_last_message(ol, room["id"])
            ol.room_read(room["id"], last_msg["id"])
            fetched_room_messages = _get_chat_messages(ol, room["id"], fetch_date)
            for msg in fetched_room_messages:
                total_messages += 1
                if msg["sender"]["id"] not in uniq_users:
                    uniq_users.append(msg["sender"]["id"])

        db = Database()
        members_count = db.get_count_of_members_current()
        print(f"Total number of unique users with at least with one msg: {len(uniq_users)} out of {members_count}")
        print(f"Total number of messages: {total_messages}")

        db.insert_event(name=event_name, date=date_time, value=len(uniq_users), total=members_count)


def _parse_options():
    event_name = None
    last_seen_days = None

    options, remaining = getopt.getopt(sys.argv[1:], "n:d:", ["name=", "days="])
    for opt, arg in options:
        if opt in ("-n", "--name"):
            event_name = arg
        elif opt in ("-d", "--days"):
            last_seen_days = int(arg)

    if event_name is None:
        raise Exception("-n/--name option not found")
    if last_seen_days is None:
        raise Exception("-d/--days option not found")

    return event_name, last_seen_days


if __name__ == "__main__":
    with_retry(main)
