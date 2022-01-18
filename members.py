# -*- coding: utf-8 -*-

from datetime import datetime
from typing import Optional, Tuple

from db import Database
from openland import Openland
from utils import with_retry, datetime_now, datetime_format, date_format


def main():
    with Openland() as ol:
        total_count = ol.organization()["membersCount"]

        today_date = datetime_now.strftime(date_format)
        db = Database()
        # Mark everyone as "left today", then the cycle below will nullify "left_date" from existing members
        db.update_members_mark_as_left(today_date)

        members_counter = 0
        after = None
        while total_count > 0:
            members = ol.members(limit=min(total_count, 200), after=after)
            length = len(members)
            after = members[-1]["user"]["id"]
            data = []
            for i in range(length):
                members_counter += 1
                user = members[i]["user"]
                org = members[i]["user"]["primaryOrganization"]
                role = members[i]["role"]
                last_seen, last_seen_days, last_seen_category = _compute_last_seen(user["lastSeen"])
                joined_date = _format_date(user["joinDate"])
                birthday = _format_date(user["birthDay"], d_format=date_format)

                if org:
                    data.append((user["id"], user["name"], user["firstName"], user["lastName"], role,
                                 user["email"], user["photo"], user["photo"] is not None,
                                 last_seen, last_seen_days, last_seen_category, user["isBot"], user["shortname"],
                                 user["phone"], user["website"], user["about"], user["location"],
                                 user["linkedin"], user["instagram"], user["twitter"], user["facebook"],
                                 joined_date, None, birthday,
                                 org["id"], org["name"].strip(), org["shortname"]))
                else:
                    data.append((user["id"], user["name"], user["firstName"], user["lastName"], role,
                                 user["email"], user["photo"], user["photo"] is not None,
                                 last_seen, last_seen_days, last_seen_category, user["isBot"], user["shortname"],
                                 user["phone"], user["website"], user["about"], user["location"],
                                 user["linkedin"], user["instagram"], user["twitter"], user["facebook"],
                                 joined_date, None, birthday,
                                 None, None, None))

            db.insert_members(data)
            total_count -= length

        print("Total number of members: {}".format(members_counter))

        # Fill missed chat_id:
        without_chat_ids = db.get_members_without_chat_id()
        if without_chat_ids:
            print("Members without chat_id: {}".format(len(without_chat_ids)))
        total_chat_ids = 0
        for member in without_chat_ids:
            member_id = member[0]
            chat_id = ol.get_chat_id(member_id)
            db.update_members_chat_id(member_id, chat_id)
            total_chat_ids += 1
        if total_chat_ids > 0:
            print("Filled missed chat_id for {} members".format(total_chat_ids))

        # Remember members who were online/offline today
        db.insert_online_members(today_date)
        online_members_stats = db.get_online_members_for_date(today_date)
        print("Online today: {}".format(online_members_stats["online"]))
        print("Offline today: {}".format(online_members_stats["offline"]))


def _compute_last_seen(last_seen_str: str) -> Tuple:
    if last_seen_str == "never_online":
        return None, None, "never"

    if last_seen_str == "online":
        last_seen = datetime_now
    else:
        last_seen = datetime.fromtimestamp(int(last_seen_str) // 1000)

    days = max(0, (datetime_now - last_seen).days)
    category = None

    if days <= 0:
        category = "today"
    elif days == 1:
        category = "1 day ago"
    elif days == 2:
        category = "2 days ago"
    elif days == 3:
        category = "3 days ago"
    elif 4 <= days <= 7:
        category = "4-7 days ago"
    elif 8 <= days <= 14:
        category = "8-14 days ago"
    elif 15 <= days <= 30:
        category = "15-30 days ago"
    elif days > 30:
        category = "30+ days ago"

    return last_seen.strftime(datetime_format), days, category


def _format_date(date: str, d_format: str = datetime_format) -> Optional[str]:
    if date:
        try:
            return datetime.fromtimestamp(int(date) // 1000).strftime(d_format)
        except:
            return None
    else:
        return None


if __name__ == "__main__":
    with_retry(main)
