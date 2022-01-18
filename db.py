# -*- coding: utf-8 -*-

import os
from typing import List, Dict, NoReturn, Tuple
import psycopg2
from psycopg2.extras import RealDictCursor


class Database:
    def __init__(self):
        self.__host = os.getenv("db_host")
        self.__port = os.getenv("db_port")
        self.__user = os.getenv("db_user")
        self.__password = os.getenv("db_password")
        self.__database = os.getenv("db_name")

    # Private methods:

    def _execute_many(self, query: str, data: List):
        conn = None
        try:
            conn = psycopg2.connect(host=self.__host, port=self.__port,
                                    user=self.__user, password=self.__password,
                                    database=self.__database)
            cur = conn.cursor()
            cur.executemany(query, data)
            conn.commit()
            cur.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if conn is not None:
                conn.close()

    def _execute(self, query: str, data: Tuple):
        conn = None
        try:
            conn = psycopg2.connect(host=self.__host, port=self.__port,
                                    user=self.__user, password=self.__password,
                                    database=self.__database)
            cur = conn.cursor()
            cur.execute(query, data)
            conn.commit()
            cur.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if conn is not None:
                conn.close()

    def _select_count(self, query: str) -> int:
        conn = None
        try:
            conn = psycopg2.connect(host=self.__host, port=self.__port,
                                    user=self.__user, password=self.__password,
                                    database=self.__database)
            with conn.cursor() as cur:
                cur.execute(query)
                result = cur.fetchone()
                return result[0]
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if conn is not None:
                conn.close()

    def _select(self, query: str) -> List:
        conn = None
        try:
            conn = psycopg2.connect(host=self.__host, port=self.__port,
                                    user=self.__user, password=self.__password,
                                    database=self.__database)
            with conn.cursor() as cur:
                cur.execute(query)
                result = cur.fetchall()
                return result
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if conn is not None:
                conn.close()

    def _select_dict(self, query:str) -> Dict:
        conn = None
        try:
            conn = psycopg2.connect(host=self.__host, port=self.__port,
                                    user=self.__user, password=self.__password,
                                    database=self.__database)
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(query)
                result = cur.fetchone()
                return result
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if conn is not None:
                conn.close()

    # Public methods:

    def insert_members(self, data: List) -> NoReturn:
        self._execute_many("""
        INSERT INTO members (id, name, first_name, last_name, role, email, photo, has_photo,
            last_seen, last_seen_days, last_seen_category, is_bot, short_name, phone, website, about, location,
            linkedin, instagram, twitter, facebook, joined_date, left_date, birthday, org_id, org_name, org_shortname)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name, first_name = EXCLUDED.first_name, last_name = EXCLUDED.last_name, role = EXCLUDED.role,
            email = EXCLUDED.email, photo = EXCLUDED.photo, has_photo = EXCLUDED.has_photo, last_seen = EXCLUDED.last_seen,
            last_seen_days = EXCLUDED.last_seen_days, last_seen_category = EXCLUDED.last_seen_category,
            is_bot = EXCLUDED.is_bot, short_name = EXCLUDED.short_name, phone = EXCLUDED.phone, website = EXCLUDED.website,
            about = EXCLUDED.about, location = EXCLUDED.location, linkedin = EXCLUDED.linkedin,
            instagram = EXCLUDED.instagram, twitter = EXCLUDED.twitter, facebook = EXCLUDED.facebook,
            joined_date = EXCLUDED.joined_date, left_date = EXCLUDED.left_date, birthday = EXCLUDED.birthday,
            org_id = EXCLUDED.org_id, org_name = EXCLUDED.org_name, org_shortname = EXCLUDED.org_shortname
        """, data)

    def insert_rooms(self, data: List) -> NoReturn:
        self._execute_many("""
        INSERT INTO rooms (id, name, members_count, kicked, has_photo, short_name, description, is_channel, is_premium,
            replies_enabled, has_social_image, kind, welcome_message, welcome_message_is_on, welcome_message_sender,
            owner)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name, members_count = EXCLUDED.members_count, kicked = EXCLUDED.kicked,
            has_photo = EXCLUDED.has_photo, short_name = EXCLUDED.short_name, description = EXCLUDED.description,
            is_channel = EXCLUDED.is_channel, is_premium = EXCLUDED.is_premium,
            replies_enabled = EXCLUDED.replies_enabled, has_social_image = EXCLUDED.has_social_image,
            kind = EXCLUDED.kind, welcome_message = EXCLUDED.welcome_message,
            welcome_message_is_on = EXCLUDED.welcome_message_is_on,
            welcome_message_sender = EXCLUDED.welcome_message_sender, owner = EXCLUDED.owner
        """, data)

    def insert_online(self, data: List) -> NoReturn:
        self._execute_many("INSERT INTO online (chat_id, date, online_count) VALUES (%s, %s, %s)", data)

    def insert_members_count(self, data: List) -> NoReturn:
        self._execute_many("INSERT INTO members_count (chat_id, date, members_count) VALUES (%s, %s, %s)", data)

    def insert_rooms_activity(self, data: List) -> NoReturn:
        self._execute_many("""
        INSERT INTO rooms_activity (chat_id, date, messages)
        VALUES (%s, %s, %s)
        ON CONFLICT (chat_id, date) DO UPDATE SET
            messages = EXCLUDED.messages
        """, data)

    def insert_event(self, name: str, date: str, value: int, total: int) -> NoReturn:
        self._execute_many("INSERT INTO events (name, date, value, total) VALUES (%s, %s, %s, %s)",
                           [(name, date, value, total)])

    def get_count_of_members_last_seen_days(self, last_seen_days: int) -> int:
        return self._select_count("""SELECT count(*) FROM members 
        WHERE last_seen_days <= {} AND left_date IS NULL""".format(last_seen_days))

    def get_count_of_members_no_online(self) -> int:
        return self._select_count("""SELECT count(*) FROM members 
        WHERE (last_seen_days > 30 OR last_seen_days IS NULL) AND left_date IS NULL""")

    def get_count_of_members_current(self) -> int:
        return self._select_count("SELECT count(*) FROM members WHERE left_date IS NULL")

    def update_rooms_mark_deleted(self, date: str, ids: List) -> NoReturn:
        self._execute("""
        UPDATE rooms
        SET deleted_date = %s
        WHERE id NOT IN %s and deleted_date IS NULL
        """, (date, tuple(ids),))

    def update_rooms_saved_messages(self, room_id: str, saved_messages: int) -> NoReturn:
        self._execute("UPDATE rooms SET saved_messages = %s WHERE id = %s", (saved_messages, room_id,))

    def get_members_current_about(self) -> List:
        return self._select("SELECT id, about FROM members WHERE left_date IS NULL")

    def get_members_without_chat_id(self) -> List:
        return self._select("SELECT id FROM members WHERE chat_id IS NULL")

    def update_members_chat_id(self, member_id: str, chat_id: str) -> NoReturn:
        self._execute("UPDATE members SET chat_id = %s WHERE id = %s", (chat_id, member_id))

    def update_members_mark_as_left(self, date: str) -> NoReturn:
        self._execute("UPDATE members SET left_date = %s WHERE left_date IS NULL", (date,))

    def get_members_send_to(self, ids: List) -> List:
        if not ids:
            return []

        return self._select("""
        SELECT id, first_name, chat_id
        FROM members
        WHERE id IN ({}) AND left_date IS NULL
        """.format(", ".join(ids)))

    def get_members_who_need_to_update_profile(self, msg_name: str) -> List:
        if not msg_name:
            raise ValueError("msg_name can not be empty")

        return self._select("""
        SELECT id, first_name, chat_id
        FROM members
        WHERE (has_photo IS FALSE
                OR first_name ~ '^[^A-Za-zА-Яа-я]+$'
                OR (last_name IS NULL OR last_name ~ '^[^A-Za-zА-Яа-я]+$')
                OR (location IS NULL OR location ~ '^[^A-Za-zА-Яа-я]+$')
                OR (about IS NULL OR length(about) < 10))
            AND id NOT IN (SELECT member_id FROM message_sent WHERE msg_name = '{}')
            AND left_date IS NULL
        """.format(msg_name))

    def get_members_who_joined_after(self, date: str, msg_name: str) -> List:
        return self._select("""
        SELECT id, first_name, chat_id
        FROM members
        WHERE joined_date >= DATE '{}'
            AND id NOT IN (SELECT member_id FROM message_sent WHERE msg_name = '{}')
            AND left_date IS NULL
        """.format(date, msg_name))

    def insert_message_sent(self, member_id: str, msg_name: str, date: str) -> NoReturn:
        self._execute_many("INSERT INTO message_sent (member_id, msg_name, date) VALUES (%s, %s, %s)",
                           [(member_id, msg_name, date)])

    def get_members_complete_profile_stats(self) -> Dict:
        return self._select_dict("""
        SELECT count(*) FILTER (WHERE has_photo IS FALSE) AS no_photo,
               count(*) FILTER (WHERE first_name ~ '^[^A-Za-zА-Яа-я]+$') AS no_first_name,
               count(*) FILTER (WHERE last_name IS NULL OR last_name ~ '^[^A-Za-zА-Яа-я]+$') AS no_last_name,
               count(*) FILTER (WHERE location IS NULL OR location ~ '^[^A-Za-zА-Яа-я]+$') AS no_location,
               count(*) FILTER (WHERE about IS NULL OR length(about) < 10) AS no_about,
               count(*) FILTER (WHERE short_name IS NULL) AS no_short_name,
               count(*) FILTER (WHERE linkedin IS NULL) AS no_linkedin,
               count(*) FILTER (WHERE instagram IS NULL) AS no_instagram,
               count(*) FILTER (WHERE twitter IS NULL) AS no_twitter,
               count(*) FILTER (WHERE facebook IS NULL) AS no_facebook,
               count(*) FILTER (WHERE website IS NULL) AS no_website,
               count(*) FILTER (WHERE phone IS NULL) AS no_phone,
               count(*) FILTER (WHERE email IS NULL) AS no_email,
               count(*) FILTER (WHERE has_photo IS FALSE
                                OR first_name ~ '^[^A-Za-zА-Яа-я]+$'
                                OR (last_name IS NULL OR last_name ~ '^[^A-Za-zА-Яа-я]+$')
                                OR (location IS NULL OR location ~ '^[^A-Za-zА-Яа-я]+$')
                                OR (about IS NULL OR length(about) < 10)) AS no_full_profile        
        FROM members
        WHERE left_date IS NULL
        """)

    def insert_hashtags(self, member_id: str, hashtag: str) -> NoReturn:
        self._execute_many("""
        INSERT INTO hashtags (member_id, hashtag)
        VALUES (%s, %s)
        ON CONFLICT (member_id, hashtag) DO NOTHING;
        """, [(member_id, hashtag)])

    def insert_online_members(self, date: str) -> NoReturn:
        self._execute("""INSERT INTO online_members 
        SELECT id, %s, true FROM members WHERE last_seen_days = 0 AND left_date IS NULL
        """, (date,))

        self._execute("""INSERT INTO online_members 
        SELECT id, %s, false FROM members 
            WHERE (last_seen_days != 0 OR last_seen_days IS NULL) AND left_date IS NULL
        """, (date,))

    def get_online_members_for_date(self, date: str) -> Dict:
        return self._select_dict("""
        SELECT count(*) FILTER (WHERE online IS TRUE) AS online,
               count(*) FILTER (WHERE online IS FALSE) AS offline      
        FROM online_members
        WHERE date = DATE '{}'
        """.format(date))

    def get_rooms(self) -> List:
        return self._select("SELECT id, name FROM rooms")

    def get_rooms_unsaved(self) -> List:
        return self._select("""
        SELECT id, name
        FROM rooms
        WHERE saved_messages = 0
        ORDER BY members_count DESC
        """)

    def insert_message_history(self, data: List) -> NoReturn:
        self._execute_many("""
        INSERT INTO message_history (chat_id, member_id, date, message, reactions_count, comments_count)
        VALUES (%s, %s, %s, %s, %s, %s)""", data)

    def insert_rooms_members(self, data: List) -> NoReturn:
        self._execute_many("""
        INSERT INTO rooms_members (chat_id, member_id)
        VALUES (%s, %s)
        ON CONFLICT (chat_id, member_id) DO UPDATE SET
            chat_id = EXCLUDED.chat_id, member_id = EXCLUDED.member_id
        """, data)

    def get_members_missed(self) -> List:
        return self._select("""
        SELECT DISTINCT(member_id)
        FROM rooms_members
        WHERE member_id NOT IN (SELECT id FROM members)
        UNION
        SELECT DISTINCT(member_id)
        FROM message_history
        WHERE member_id NOT IN (SELECT id FROM members)
        """)
