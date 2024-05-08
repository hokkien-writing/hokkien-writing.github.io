#!/usr/bin/python
# -*- coding: UTF-8 -*-
import requests
import datetime

header = f"""---
title: 頭頁
date: { datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S') }
source: https://github.com/hokkien-writing/reference
---

📌 若有缺漏，歡迎移步 [hokkien-writing/reference](https://github.com/hokkien-writing/reference) 相輔修訂。

"""

url = "https://raw.githubusercontent.com/hokkien-writing/reference/main/README.md"
response = requests.get(url)
content = response.text

lines = content.split("\n")
lines = lines[1:]

modified_lines = [
    line.replace("/book", "https://github.com/hokkien-writing/reference/blob/main/book")
    for line in lines
]

with open("source/index.md", 'w', encoding='utf-8') as f:
    f.write(header)
    f.write("\n".join(modified_lines))
