# -*- coding: utf-8 -*-
import sys

from db import Database
from members import _compute_last_seen, _format_date
from openland import Openland
from utils import with_retry, datetime_now, datetime_format, date_format


def main():
    date_time = datetime_now.strftime(datetime_format)
    print("Saving missed members on {}\n".format(date_time))

    db = Database()
    members = db.get_members_missed()
    print("Found {} members".format(len(members)))
    sys.stdout.flush()

    members_count = 0
    with Openland() as ol:
        for member_id, in members:
            user = ol.member(member_id)
            print("Saving {} ({})".format(user["name"], user["id"]))
            sys.stdout.flush()

            org = user["primaryOrganization"]
            role = None
            last_seen, last_seen_days, last_seen_category = _compute_last_seen(user["lastSeen"])
            joined_date = _format_date(user["joinDate"])
            birthday = _format_date(user["birthDay"], d_format=date_format)

            data = []
            if org:
                data.append((user["id"], user["name"], user["firstName"], user["lastName"], role,
                             user["email"], user["photo"], user["photo"] is not None,
                             last_seen, last_seen_days, last_seen_category, user["isBot"], user["shortname"],
                             user["phone"], user["website"], user["about"], user["location"],
                             user["linkedin"], user["instagram"], user["twitter"], user["facebook"],
                             joined_date, datetime_now.strftime(date_format), birthday,
                             org["id"], org["name"].strip(), org["shortname"]))
            else:
                data.append((user["id"], user["name"], user["firstName"], user["lastName"], role,
                             user["email"], user["photo"], user["photo"] is not None,
                             last_seen, last_seen_days, last_seen_category, user["isBot"], user["shortname"],
                             user["phone"], user["website"], user["about"], user["location"],
                             user["linkedin"], user["instagram"], user["twitter"], user["facebook"],
                             joined_date, datetime_now.strftime(date_format), birthday,
                             None, None, None))
            db.insert_members(data)
            members_count += 1


    print("Total number of members saved: {}".format(members_count))


if __name__ == "__main__":
    with_retry(main)
