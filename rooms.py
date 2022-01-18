# -*- coding: utf-8 -*-

from typing import Dict, Tuple

from db import Database
from openland import Openland
from utils import with_retry, datetime_now, datetime_format, date_format


def main():
    date_time = datetime_now.strftime(datetime_format)
    with Openland() as ol:
        organization = ol.organization()
        print("{}. Groups: {}, Members: {}".format(organization["name"], organization["roomsCount"],
                                                   organization["membersCount"]))

        rooms_list = []
        member_count_list = []

        rooms_list.append((organization["id"], organization["name"], int(organization["membersCount"]), False, True,
                           organization["shortname"], organization["about"],
                           False, False, None, None, None, None, None, None,
                           "EQxWy3WALQSJ7lWMRJoqT30E3K"))
        member_count_list.append((organization["id"], date_time, int(organization["membersCount"])))

        rooms = ol.rooms(int(organization["roomsCount"]), all_info=True)
        for room in rooms:
            room_id = room["id"]
            kicked = False
            payload = ol.room_join(room_id)
            if not payload.get("errors"):
                ol.room_mute(room_id)
            elif "kicked" in payload["errors"][0]["message"]:
                kicked = True
            has_photo = room.get("photo") and room.get("photo").startswith("http")
            has_social_image = room.get("socialImage") and len(room.get("socialImage")) > 0
            welcome_message_text, welcome_message_is_on, welcome_message_sender = \
                _welcome_message(room["welcomeMessage"])

            room_members_count = int(room["membersCount"])
            rooms_list.append((room_id, room["title"], room_members_count, kicked, has_photo, room["shortname"],
                               room["description"], room["isChannel"], room["isPremium"], room["repliesEnabled"],
                               has_social_image, room["kind"], welcome_message_text, welcome_message_is_on,
                               welcome_message_sender, room["owner"]["id"]))
            member_count_list.append((room_id, date_time, room_members_count))

        db = Database()
        db.insert_rooms(rooms_list)
        db.insert_members_count(member_count_list)

        db.update_rooms_mark_deleted(datetime_now.strftime(date_format), [x[0] for x in rooms_list])


def _welcome_message(wm: Dict) -> Tuple:
    if wm:
        welcome_message_text = wm["message"]
    else:
        welcome_message_text = None

    if wm:
        welcome_message_is_on = wm["isOn"]
    else:
        welcome_message_is_on = None

    if wm and wm.get("sender"):
        welcome_message_sender = wm["sender"]["id"]
    else:
        welcome_message_sender = None

    return welcome_message_text, welcome_message_is_on, welcome_message_sender


if __name__ == "__main__":
    with_retry(main)
