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
_msg_name = "welcome_bar_20201028"

_first_bold = "Если ты совсем недавно в Mesto – добро пожаловать в Welcome Bar 28 октября!"
_second_bold = "Регистрация в TimePad уже открыта!"


def main():
    global _retry_count, _total_sent
    _retry_count += 1

    print("Sending message: {}".format(_msg_name))
    with Openland() as ol:
        db = Database()
        if not _prod:
            send_to = db.get_members_send_to([
                "'Rgjvkyvw7QiVkkrzVv3ot4WWE4'",  # Idel
                # "'g0OmZEmP7zInqjmAm7ZJudZ3PJ'",  # Evgeniia Kopytina
            ])
        else:
            send_to = db.get_members_who_joined_after("2020-10-10", _msg_name)
        print("Number of selected users to send the message: {}".format(len(send_to)))

        for member_id, first_name, chat_id in send_to:
            message = """{}Привет, {}!
Это команда Mesto.Events.
Теперь ты часть коммьюнити, и нам обязательно нужно познакомиться поближе.

Ты, конечно, уже знаешь, что Mesto – это сообщество, где люди помогают друг другу создавать полезные компании и продукты. Здесь люди с идеями встречаются с людьми, мечтающими воплощать идеи.
Но как сделать первые шаги в этом уникальном пространстве правильно? Расскажем об этом на онлайн-вечеринке Welcome Bar!
{}

Мы подскажем, как быстро разобраться в чатах и группах и к кому обратиться, если возникли проблемы. Ещё обсудим наш внутренний этикет, расскажем о новой социальной сети, поделимся полезными лайфхаками. 
Ты сможешь задать вопросы активным участникам сообщества, и узнаешь об одной истории успеха: финалист «Идеального штурма» расскажет, как Mestо мотивировало его к активному развитию стартапа.

И, конечно же, мы будем знакомиться друг с другом, узнавать о каждом и рассказывать о себе!
Когда: среда, 28 октября, 19:00 Мск Где: Zoom (скачай, если у тебя ещё нет), ссылку мы пришлём за 24 часа до начала мероприятия.
{} Скорее регистрируйся здесь: https://is.gd/iKPoWE

Приходи обязательно!
            """.format("" if _prod else _warning_msg, first_name, _first_bold, _second_bold)

            spans = [
                {"type": "Bold", "offset": message.index(_first_bold), "length": len(_first_bold)},
                {"type": "Bold", "offset": message.index(_second_bold), "length": len(_second_bold)}
            ]

            ol.send_message(chat_id, message, spans=spans)
            _total_sent += 1
            db.insert_message_sent(member_id, _msg_name, _date_time)

    print("Total messages sent: {}, retried {} times.".format(_total_sent, _retry_count))


if __name__ == "__main__":
    with_retry(main)
