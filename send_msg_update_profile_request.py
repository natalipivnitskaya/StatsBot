# -*- coding: utf-8 -*-

import os

from db import Database
from openland import Openland
from utils import with_retry, datetime_now, datetime_format

_prod = os.getenv("env_name", "dev") == "prod"
_warning_msg = "# Это тестовое сообщение, отправлено тебе на проверку:\n\n"

_total_sent = 0
_retry_count = -1

_date_time = datetime_now.strftime(datetime_format)
_msg_name = "update_profile_request"

_first_bold = "Укажите настоящие Имя и Фамилию латиницей, добавьте реальное фото, напишите пару предложений о себе, чем занимаетесь, расскажите откуда вы (локация на английском языке)"
_mention_support_name = "@Mesto Support"
_mention_support_user_id = "BPx6kJ6LjXsd1mbe9RlgiO77Pp"


def main():
    global _retry_count, _total_sent
    _retry_count += 1

    print("Sending message: {}".format(_msg_name))
    with Openland() as ol:
        db = Database()
        if not _prod:
            send_to = db.get_members_send_to([
                "'Rgjvkyvw7QiVkkrzVv3ot4WWE4'",  # Idel
                # "'EQxWy3WALQSJ7lWMRJoqT30E3K'",  # Yana Belova
                # "'61xLrvL09QfnyBBDXKoRC3BeZW'",  # Jules Smirnova
                # "'Om5VkoV6APhJ0pzzRxeYC4onL3'",  # Natalia Klimenskaya
                # "'k46MqEMblKCRypoko6AxIrO5QJ'",  # Kanan Safarli
                # "'1pkzZ9z6l3TerWXby4PDCd0koa'",  # Elena Malyanova
            ])
        else:
            send_to = db.get_members_who_need_to_update_profile(_msg_name)
        print("Number of selected users to send the message: {}".format(len(send_to)))

        for member_id, first_name, chat_id in send_to:
            message = """{}Привет, {}!

Я местный виртуальный помощник и помогаю пользователям заполнять личные профили. Каждое заполненное поле помогает людям в Mesto найти друг друга для того, чтобы познакомиться, получить профессиональный совет или сделать что-то новое вместе.

Я заметил, что в вашем профиле есть пропущенные поля. Давайте сделаем ваш профиль полнее?

https://openland.com/settings/profile

{}. Также важно иметь уникальный никнейм - это упростит поиск вашего профиля через @ в сообществе. Например: @ivanov_ivan.

Обязательно проставляйте хэштеги через #m_ по сферам компетенций и формату помощи, а еще добавляйте контакты и ссылки на соц. сети и проекты. Актуальные теги сообщества смотрите по ссылке [1].

Всё это поможет вам быстрее познакомиться с действительно близкими по духу и по интересам людьми и найти единомышленников для совместных проектов.

И, прошу, не откладывайте задачу на потом, добавьте недостающие поля сейчас! [2] Это основа коммуникаций в сообществе, такая же, как знание правил и ценностей. Если вы ещё не познакомились с ними, обязательно откройте наш гайд по ссылке [3].

Спасибо вам за отзывчивость!
Пожалуйста, не стесняйтесь писать нам на {}, если возникают любые вопросы.

1. Как устроен поиск в сообществе -> Список тегов: https://is.gd/EJQvHZ
2. Настройка профиля в Openland: https://openland.com/settings/profile
3. Путеводитель сообщества: https://is.gd/oKCm6B
            """.format("" if _prod else _warning_msg, first_name, _first_bold, _mention_support_name)

            spans = [
                {"type": "Bold", "offset": message.index(_first_bold), "length": len(_first_bold)}
            ]
            mentions = [
                {"offset": message.index(_mention_support_name), "length": len(_mention_support_name),
                 "userId": _mention_support_user_id}
            ]

            ol.send_message(chat_id, message, spans=spans, mentions=mentions)
            _total_sent += 1
            db.insert_message_sent(member_id, _msg_name, _date_time)

    print("Total messages sent: {}, retried {} times.".format(_total_sent, _retry_count))


if __name__ == "__main__":
    with_retry(main)
