# -*- coding: utf-8 -*-

import re

from db import Database
from utils import with_retry


def main():
    db = Database()
    members_count = 0
    tags_count = 0
    for member_id, about in db.get_members_current_about():
        if about:
            fetched_tags = re.findall(r"#(\w+)", about)
            if fetched_tags:
                members_count += 1
                for tag in fetched_tags:
                    tags_count += 1
                    tag = tag.lower()
                    db.insert_hashtags(member_id, tag)

    print("Total number of members with hashtags: {}".format(members_count))
    print("Total number of hashtags: {}".format(tags_count))


if __name__ == "__main__":
    with_retry(main)
