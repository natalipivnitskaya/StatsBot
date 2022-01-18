# -*- coding: utf-8 -*-

import getopt
import sys

from db import Database
from utils import datetime_now, datetime_format


def main():
    event_name, last_seen_days = _parse_options()
    db = Database()
    date_time = datetime_now.strftime(datetime_format)
    if event_name == "NO_ONLINE":
        value = db.get_count_of_members_no_online()
    else:
        if event_name == "MAU_MONTHLY":
            prev_month = datetime_now.replace(month=datetime_now.month - 1 if datetime_now.month > 1 else 12)
            last_seen_days = (datetime_now - prev_month).days
        value = db.get_count_of_members_last_seen_days(last_seen_days)
    members_count = db.get_count_of_members_current()
    print("{} ({} day(s) from {}): {} out of {}".format(event_name, last_seen_days, date_time, value, members_count))
    db.insert_event(name=event_name, date=date_time, value=value, total=members_count)
    pass


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
    main()
