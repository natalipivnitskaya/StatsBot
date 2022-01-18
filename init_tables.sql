CREATE TABLE rooms(
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    members_count INT NOT NULL,
    kicked BOOLEAN NOT NULL,
    deleted_date DATE,
    has_photo BOOLEAN NOT NULL,
    short_name TEXT,
    description TEXT,
    is_channel BOOLEAN NOT NULL,
    is_premium BOOLEAN NOT NULL,
    replies_enabled BOOLEAN,
    has_social_image BOOLEAN,
    kind TEXT,
    welcome_message TEXT,
    welcome_message_is_on BOOLEAN,
    welcome_message_sender TEXT,
    owner TEXT,
    -- ALTER TABLE rooms ADD COLUMN saved_messages INT DEFAULT 0;
    saved_messages INT DEFAULT 0
    );

CREATE TABLE members_count(
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    chat_id TEXT REFERENCES rooms(id),
    date TIMESTAMP NOT NULL,
    members_count INT NOT NULL,
    PRIMARY KEY(id)
    );

CREATE TABLE online(
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    chat_id TEXT REFERENCES rooms(id),
    date TIMESTAMP NOT NULL,
    online_count INT NOT NULL,
    PRIMARY KEY(id)
    );

CREATE TABLE members(
    id TEXT PRIMARY KEY,
    name TEXT,
    first_name TEXT,
    last_name TEXT,
    role TEXT,
    email TEXT,
    photo TEXT,
    has_photo BOOLEAN,
    last_seen TEXT,
    last_seen_days INT,
    last_seen_category VARCHAR(30),
    is_bot BOOLEAN,
    short_name TEXT,
    phone TEXT,
    website TEXT,
    about TEXT,
    location TEXT,
    linkedin TEXT,
    instagram TEXT,
    twitter TEXT,
    facebook TEXT,
    -- ALTER TABLE members ADD COLUMN joined_date TIMESTAMP;
    joined_date TIMESTAMP,
    -- ALTER TABLE members ADD COLUMN left_date DATE;
    left_date DATE,
    org_id TEXT,
    org_name TEXT,
    org_shortname TEXT,
    -- ALTER TABLE members ADD COLUMN chat_id TEXT;
    chat_id TEXT,
    -- ALTER TABLE members ADD COLUMN birthday DATE;
    birthday DATE
    );

CREATE TABLE online_members(
    member_id TEXT REFERENCES members(id),
    date DATE NOT NULL,
    online BOOLEAN NOT NULL,
    PRIMARY KEY(member_id, date)
    );

CREATE TABLE events(
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    date TIMESTAMP NOT NULL,
    value INT NOT NULL,
    -- ALTER TABLE events ADD COLUMN total INT;
    total INT,
    PRIMARY KEY(id)
    );

CREATE TABLE rooms_activity(
    chat_id TEXT REFERENCES rooms(id),
    date TIMESTAMP NOT NULL,
    messages INT NOT NULL,
    PRIMARY KEY(chat_id, date)
    );

CREATE TABLE hashtags(
    member_id TEXT REFERENCES members(id),
    hashtag TEXT,
    PRIMARY KEY(member_id, hashtag)
    );

CREATE TABLE message_sent(
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    member_id TEXT REFERENCES members(id),
    msg_name TEXT NOT NULL,
    date TIMESTAMP NOT NULL,
    PRIMARY KEY(id)
    );

CREATE TABLE message_history(
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    chat_id TEXT NOT NULL REFERENCES rooms(id),
    member_id TEXT NOT NULL,
    date TIMESTAMP NOT NULL,
    message TEXT NOT NULL,
    reactions_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    PRIMARY KEY(id)
    );

CREATE TABLE rooms_members(
    chat_id TEXT NOT NULL REFERENCES rooms(id),
    member_id TEXT NOT NULL,
    PRIMARY KEY(chat_id, member_id)
    );


-- Indexes:

CREATE INDEX members_left_date_partial_idx ON members(left_date) WHERE left_date IS NULL;
CREATE INDEX members_has_photo_partial_idx ON members(has_photo) WHERE has_photo IS FALSE;
CREATE INDEX events_name_hash_idx ON events USING hash(name);
CREATE INDEX online_mesto_news_partial_idx ON online(chat_id) WHERE chat_id = 'rAb139w0DKSzVzmvla44FV4p9Z';
CREATE INDEX online_date_idx ON online USING btree(date);
CREATE INDEX members_count_mesto_co_partial_idx ON members_count(chat_id) WHERE chat_id = '3YgM91xQP1sa3ea5mxxVTwRkJg';
CREATE INDEX rooms_activity_mesto_co_partial_idx ON rooms_activity(chat_id) WHERE chat_id = '3YgM91xQP1sa3ea5mxxVTwRkJg';
