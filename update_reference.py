#!/usr/bin/python
# -*- coding: UTF-8 -*-
import requests

header = """---
title: 參考資料
date: 2022-12-04 15:43:00
source: https://github.com/hokkien-writing/reference
---
"""

url = "https://raw.githubusercontent.com/hokkien-writing/reference/main/README.md"
response = requests.get(url)
content = response.text

lines = content.split("\n")
lines = lines[1:]

modified_lines = [
    line.replace("/book", "https://raw.githubusercontent.com/hokkien-writing/reference/main/book")
    for line in lines
]

with open("source/reference.md", 'w', encoding='utf-8') as f:
    f.write(header)
    f.write("\n".join(modified_lines))
