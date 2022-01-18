from db import Database
from utils import with_retry, datetime_now, datetime_format


def main():
    date_time = datetime_now.strftime(datetime_format)
    db = Database()
    members_count = db.get_count_of_members_current()
    stats = db.get_members_complete_profile_stats()
    for event_name, value in stats.items():
        print("{}: {} out of {}".format(event_name, value, members_count))
        db.insert_event(name=event_name, date=date_time, value=value, total=members_count)


if __name__ == "__main__":
    with_retry(main)
