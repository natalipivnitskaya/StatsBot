# -*- coding: utf-8 -*-
import traceback
from datetime import datetime
from typing import Callable, NoReturn

datetime_now = datetime.now().replace(second=0, microsecond=0)
datetime_format = "%Y-%m-%d %H:%M:%S"
date_format = "%Y-%m-%d"


def with_retry(to_run: Callable, max_retries: int = 5) -> NoReturn:
    print("===start at {}===".format(datetime_now.strftime(datetime_format)))
    finished = False
    retry_attempt = 0
    while not finished and retry_attempt < max_retries:
        try:
            to_run()
            finished = True
        except Exception as err:
            print("Unexpected error: {0}".format(err))
            traceback.print_exc()
            retry_attempt += 1
    print("===finished at {}===\n".format(datetime.now().strftime(datetime_format)))
