# -*- coding: utf-8 -*-

import sys

from db import Database
from openland import Openland
from utils import with_retry, datetime_now, datetime_format


def main():
    date_time = datetime_now.strftime(datetime_format)
    with Openland() as ol:
        online_count_list = []
        # Track only most popular rooms:
        rooms = [
            {
                "id": "rAb139w0DKSzVzmvla44FV4p9Z",
                "name": "Mesto.News"
            },
            {
                "id": "5Xmd1J763nhJvBxzza3bHQgWbJ",
                "name": "Mesto."
            }
        ]
        for room in rooms:
            room_id = room["id"]
            data = None
            while data is None:
                payload = ol.online_count(room_id)

                if payload.get("errors"):
                    msg = payload["errors"][0]["message"]
                    if "Access Denied" in msg:
                        join_resp = ol.room_join(room_id)
                        if not join_resp.get("errors"):
                            ol.room_mute(room_id)
                        else:
                            data = {}
                    else:
                        print("Unknown error from Openland: {}".format(msg))
                        data = {}
                else:
                    data = payload.get("data")

            online_members = -1
            if data:
                online_members = max(0, int(data["chatOnlinesCount"]["onlineMembers"]) - 1)
                online_count_list.append((room_id, date_time, online_members))
            print("{}: {}".format(room["name"], online_members))

        Database().insert_online(online_count_list)


if __name__ == "__main__":
    with_retry(main)
