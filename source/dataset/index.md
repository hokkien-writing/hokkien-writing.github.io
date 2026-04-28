---
title: 閩南語數據集專案
date: 2026-04-28 21:37:00
source: https://github.com/hokkien-writing/dataset
---

📌 若有缺漏，歡迎移步 [hokkien-writing/dataset](https://github.com/hokkien-writing/dataset) 相輔修訂。

閩南語文字數位化專案，書籍、歌詞等等經原文經人工校注後，可透過腳本匯出原版與修改版。

## 專案結構

```
books/               校注後的書籍來源（含編輯標記）
lyrics/              校注後的歌詞來源（含編輯標記）
clippings/           採集詞條（從書本或日常對話中摘錄的 CSV）
external/            外部資料集原始檔（由 sync_external.sh 同步）
export/              匯出輸出
  books/             書籍匯出
  lyrics/            歌詞匯出
  clippings/         採集詞條匯出
  external/          外部資料集標準化 CSV
scripts/             工具腳本
  export.py          匯出原版 / 修改版 Markdown
  export_csv.py      匯出結構化 CSV
  import_external.py 轉換外部資料集為標準化 CSV
  importers/         各外部資料集的轉換器
  processors/        各書籍的 CSV 解析處理器
    base.py          基礎類別與共用函數
  tests/             單元測試
build.sh             一鍵建置腳本
sync_external.sh     同步外部資料集
test.sh              一鍵測試腳本
```

## 編輯標記規則

在 `books/`、`lyrics/` 等目錄中的 Markdown 檔案使用以下五種標記記錄校勘修改：

| 標記 | 含義 | 原版輸出 | 修改版輸出 |
|------|------|---------|-----------|
| `~~餮~~` | 刪除，不需改正 | 餮 | （移除） |
| `~~餮~~(餐)` | 刪除並改正為括號內文字 | 餮 | 餐 |
| `~~小暑~~()` | 刪除但不知如何改正，暫時留白 | 小暑 | `〔〕` |
| `++等++` | 新增文字 | （移除） | 等 |
| `++++` | 需要新增但暫時找不到合適文字 | （移除） | `〔〕` |
| `人[訓]` | 訓用字，`[訓]` 標記前方為訓用字 | 人 | 人[訓] |
| `丕[音]` | 借音字，`[音]` 標記前方為借音字 | 丕 | 丕[音] |

### 範例

**來源（校注版）：**
```
~~菓~~(果)子
~~污穢~~(垃圾)  ++污糟++
~~巧語~~()
++漉++
++++
```

**原版輸出：**
```
菓子
污穢
巧語


```

**修改版輸出：**
```
果子
垃圾  污糟
〔〕
漉
〔〕
```

## 使用方式

### 匯出

```bash
./build.sh
```

會在 `export/` 目錄下按來源目錄分別匯出，每個檔案產生三個版本：
- `*_original.md` — 原版（移除標記，保留原始文字）
- `*_modified.md` — 修改版（套用所有校勘修改）
- `*.csv` - 詞句列表

### CSV 匯出

每個檔案還會匯出結構化 CSV（需在 `scripts/processors/` 中有對應的處理器）：

| 欄位 | 說明 |
|------|------|
| `puj` | 潮州白話字（校注後） |
| `puj_orig` | 潮州白話字（原始，僅當與 puj 不同時填寫） |
| `poj` | 白話字（校注後） |
| `poj_orig` | 白話字（原始，僅當與 poj 不同時填寫） |
| `tl` | 台灣話羅馬字（校注後） |
| `tl_orig` | 台灣話羅馬字（原始，僅當與 tl 不同時填寫） |
| `dp` | 潮州話拼音（校注後） |
| `dp_orig` | 潮州話拼音（原始，僅當與 dp 不同時填寫） |
| `bp` | 閩南話拼音（校注後） |
| `bp_orig` | 閩南話話拼音（原始，僅當與 bp 不同時填寫） |
| `han` | 漢字（校注後） |
| `han_orig` | 漢字（原始，僅當與 han 不同時填寫） |
| `en` | 英文翻譯（校注後） |
| `en_orig` | 英文翻譯（原始，僅當與 en 不同時填寫） |
| `zh_CN` | 普通話翻譯（校注後） |
| `zh_CN_orig` | 普通話翻譯（原始，僅當與 zh_CN 不同時填寫） |
| `zh_TW` | 國語翻譯（校注後） |
| `zh_TW_orig` | 國語翻譯（原始，僅當與 zh_TW 不同時填寫） |
| `source` | 來源（書名 > 章節） |

新增書籍時，只需在 `scripts/processors/` 新增同名的 `.py` 檔案，定義繼承 `BookProcessor` 的 `Processor` 類別即可。

### 採集詞條（Clippings）

`clippings/` 目錄存放從書本或日常對話中採集的詞條，格式為 CSV，命名規則為 `{teochew|hokkien}.{source}.csv`。

CSV 表頭：

| 欄位 | 說明 |
|------|------|
| `latn_norm` | 標準化羅馬字（帶調號數字，如 `ka2-thiann3`） |
| `han` | 漢字，多個異體用 `|` 分隔（如 `滂沛\|霶霈`） |
| `zh_TW` | 繁體中文釋義 |
| `zh_CN` | 簡體中文釋義 |
| `en` | 英文釋義 |

檔名前綴 `teochew` 或 `hokkien` 決定 `latn_norm` 轉換為 PUJ 或 POJ。`|` 分隔的異體（`latn_norm`、`han`、`zh_TW` 皆支援）會在匯出時自動拆分為獨立行。

## 測試

專案使用 Python 內置的 `unittest` 框架進行測試。執行以下指令即可運行所有單元測試：

```bash
./test.sh
```

## 系統間轉換

支援 POJ、TL、PUJ、BP、DP 等系統間的互相轉換，以 LATN_NORM 為中介自動鏈式轉換。

```python
from scripts.latn import create_translator

# PUJ → POJ
t = create_translator("PUJ", "POJ")
t.translate("tsàng")  # "chàng"
t.translate("kóu")    # "kó͘"

# POJ → TL
t = create_translator("POJ", "TL")
t.translate("chùi")   # "tsùi"

# POJ → BP
t = create_translator("POJ", "BP")
t.translate("pàng")   # "bàng"
```

## 收錄內容

- [Books 書籍](books/README.md)
- [Lyrics 歌詞](lyrics/README.md)
- [Clippings 採集詞條](clippings/)
- [External 外部資料集](external/README.md)

## 授權

本專案程式碼以 MIT License 授權。

外部資料集各自有其授權條款，詳見 [external/README.md](external/README.md)。其中包含 CC BY-SA 4.0、CC BY-NC-SA 3.0 TW、CC BY-ND 3.0 TW、CC0 等不同授權。
