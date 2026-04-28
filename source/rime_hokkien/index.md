---
title: 福建話拍字方案 (beta)
date: 2026-04-28 21:37:00
source: https://github.com/hokkien-writing/rime-hokkien
---

📌 若有缺漏，歡迎移步 [hokkien-writing/rime-hokkien](https://github.com/hokkien-writing/rime-hokkien) 相輔修訂。


```
【漢字】汝好世界
【POJ】Lí-hó sè-kài
【TL】Lí-hó sè-kài
【BP】Lǐ-hǒ sè-gài
```

## 簡介

本福建話拍字法方案是建基佇 Rime 輸入法引擎￼，支援多種羅馬字系統佮漢字輸入，會使佇全平台（Windows、macOS、Linux、iOS、Android）使用。

特色

- **多種羅馬字系統**：支援 POJ（白話字）、TL（台羅）、BP（閩南語拼音）
- **漢字輸入**：支援純漢字佮羅馬字混合輸入
- **自動標調**：使用數字聲調（1-8），會自動轉做正確个聲調符號
- **Lua 過濾**：利用自訂 Lua 腳本，實現精準个音節過濾佮轉換
- **反查功能**：支持普通話拼音反查福建音佮福建話普通話對照；支持英文反查福建話


## 安裝

### 電腦端

#### Windows（小狼毫）

```bash
# 下載福建話拍字法方案
curl -LO https://github.com/hokkien-writing/rime-hokkien/archive/main.zip
# 解壓縮了後複製到設定目錄
unzip main.zip
cp -f rime-hokkien-main/*.yaml %APPDATA%\Rime
cp -f rime-hokkien-main/*.lua %APPDATA%\Rime
```

了後點擊 開始功能表 > 【小狼毫】重新部署。

#### macOS（鼠鬚管）

```bash
# 下載福建話拍字法方案
curl -LO https://github.com/hokkien-writing/rime-hokkien/archive/main.zip
# 解壓縮了後複製到設定目錄
unzip main.zip
cp -f rime-hokkien-main/*.yaml ~/Library/Rime
cp -f rime-hokkien-main/*.lua ~/Library/Rime
# 重新部署
/Library/Input\ Methods/Squirrel.app/Contents/MacOS/Squirrel --reload
```

#### Linux

請參考 RIME 官網￼ 安裝對應个前端（IBus-Rime 或 Fcitx-Rime），了後共檔案複製到 ~/.config/ibus/rime 抑是 ~/.local/share/fcitx5/rime。

### 手機端

	- 	iOS：建議使用「倉輸入法」
	- 	Android：建議使用「同文輸入法」

## 使用

### 切換輸入方案

按 F4 抑是 `` Ctrl+` `` 來選擇下面个方案：
- 	hokkien_poj：白話字輸入
- 	hokkien_tl：台羅輸入
- 	hokkien_bp：閩南語拼音輸入

### 輸入規則（以 POJ 為例）

1. 聲調數字：使用數字 1–8 表示聲調
   - 	li2 → lí（第二聲）
2. 鼻化韻：用 nn 表示鼻化
   - 	ainn → aiⁿ
   - 	ainn2 → áiⁿ
3. 入聲韻尾：直接輸入 p / t / k / h
   - 	tap4 → tap
   - 	tah8 → ta̍h
4. 連字符：免特別輸入
   - 	li2ho2 → lí-hó
5. 簡拼支援：支援頭字母簡拼
   - 	lh → 你好

### 反查功能

- **福建音查詢**：按 `` ` `` 鍵，輸入普通話拼音可查福建音
- **普通話對照查詢**：按 `!` 鍵，輸入普通話拼音可查福建話地道用詞
- **英文對照查詢**：按 `~` 鍵，輸入英文可查福建話地道用詞

## 開發

若欲重新建立字典抑是更新 Lua 過濾器：

```bash
./build.sh
```

這个腳本會：
1. 清理 build 目錄
2. 取得最新个 rime-luna-pinyin 相依套件
3. 複製必要个 YAML 設定佮 Lua 腳本
4. 打包做 hokkien.zip

檔案結構
- 	*.schema.yaml：各輸入方案个設定定義
- 	*.dict.yaml：字典檔，包含音節佮漢字
- 	lua/：自訂 Lua 過濾器（poj_filter.lua、tl_filter.lua、bp_filter.lua）
- 	rime.lua：Lua 主入口檔

## 參考

1. [白話字 - 維基百科](https://zh.wikipedia.org/wiki/%E7%99%BD%E8%A9%B1%E5%AD%97)
2. [Rime 輸入法引擎](https://rime.im/)
3. [hokkien-writing/dataset](https://github.com/hokkien-writing/dataset) 

## 貢獻

歡迎提出 Issue 抑是 Pull Request 來改善這个專案！
1. 拍字法設定：請修改 *.schema.yaml
2. 字典資料：請到 [hokkien-writing/dataset](https://github.com/hokkien-writing/dataset) 專案修改

## 授權

本專案採用開源授權，Rime 引擎相關元件請參考原本个授權說明。
