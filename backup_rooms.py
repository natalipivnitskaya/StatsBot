# -*- coding: utf-8 -*-
import sys

from db import Database
from openland import Openland
from utils import with_retry, datetime_now, datetime_format


def main():
    date_time = datetime_now.strftime(datetime_format)
    print("Saving members for each group on {}\n".format(date_time))

    db = Database()
    rooms = db.get_rooms()

    room_num = 0
    with Openland() as ol:
        for room_id, room_name in rooms:
            if room_id == "3YgM91xQP1sa3ea5mxxVTwRkJg":
                continue    # Skip Mesto.co

            room_num += 1
            room = ol.get_room(room_id)
            members_count = room["membersCount"]
            print(f"Room#{room_num}: {room_name} ({room_id}) with {members_count} members")
            sys.stdout.flush()

            members_counter = 0
            after = None
            while members_count > 0:
                members = ol.room_members(room_id, limit=min(members_count, 200), after=after)
                after = members[-1]["user"]["id"]
                data = []
                for member in members:
                    members_count -= 1
                    members_counter += 1
                    member_id = member["user"]["id"]
                    data.append((room_id, member_id))

                db.insert_rooms_members(data)

            print("Total number of members recognized: {}. Matched: {}\n"
                  .format(members_counter, members_counter == room["membersCount"]))


if __name__ == "__main__":
    with_retry(main)
