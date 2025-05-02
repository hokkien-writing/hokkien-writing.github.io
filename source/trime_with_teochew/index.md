---
title: 同文輸入法伴潮州話拍字方案
date: 2025-05-02 22:50:05
source: https://github.com/hokkien-writing/trime-with-teochew
dependencies: ["https://github.com/hokkien-writing/teochew-lexicon"]
---

📌 若有缺漏，歡迎移步 [hokkien-writing/trime-with-teochew](https://github.com/hokkien-writing/trime-with-teochew) 相輔修訂。


附帶[潮州話拍字方案](https://github.com/hokkien-writing/rime-teochew)其同文輸入法，適用於 Android平臺 (TRIME IM for Android with rime-teochew schema)。

潮語文 | [简体中文](https://github.com/hokkien-writing/trime-with-teochew/raw/master/README_sc.md)

> 📌 本文採用漢字佮潮州白話字寫成，請參考[簡明潮州白話字](https://hokkien-writing.github.io/simple_puj/)。

## 源起

以先，我介紹過做呢在 iPhone手機上用潮州話拍字。後來，收着一些讀者反饋，其中有部分讀者希望在 Android手機上也能安裝即用潮州話拍字。

本儂覔了一支 Android手機按照網頂教程親自操作了一遍，發現同文輸入法其配置過勢複雜，且經常出問題，連我者會別(pat) 加減 Android 開發其儂還無心情(sim-chiâⁿ)去物，何況平常儂？

> 📌 同文輸入法是一款開源其 Android輸入法，伊基於 RIME引擎，可定製各種拍字方案，爲地方語言其存續作出了不小其貢獻。不過靈活定製意味着配置上頂複雜，平常儂睇了頭痛。

好彩，我所費了寡日其時間佮精力，創設了此個項目，拍包了內置[潮州話拍字方案](https://github.com/hokkien-writing/rime-teochew)其同文輸入法，實現免配置、安裝即用潮州話拍字 🎉。

## 下載

現在大家儂哩快活(khuàⁿ-ua̍h)了，只要在 [騰訊微雲](https://share.weiyun.com/yxVJfsN7) 、 [微軟雲盤](https://1drv.ms/f/s!AgqX3Jd3VLa4gS3ujqPC7hpY4lKt?e=Wc8xvk)  或者 [GitHub Release](https://github.com/hokkien-writing/trime-with-teochew/releases) 下載同文輸入法潮州話定製版，然後按照下底視頻方式安裝即用。

> <img src="https://github.com/hokkien-writing/trime-with-teochew/raw/master/assets/微信視頻號-不輟集.jpeg" height="250"><br/>
> 微信視頻號《不輟集》

## 拍包

若是汝想欲家己拍包，添加新其拍字方案或使用更新版本其同文輸入法，可綴我下底其方式來操作。

### 環境準備

1. 安裝 Android Studio。
2. 安裝 JDK (OpenJDK) 17。

### 拖取代碼

爲穩定起見，一般使用最新版本其上一個版本，現在最新是 v3.2.18，所以此地方使用 v3.2.17。

```bash
git clone git@github.com:osfans/trime.git
git checkout v3.2.17
git submodule update --init --recursive
```

### 整合配置

```bash
# 請掠下底配置換成家己其
TRIME_DIR=~/Desktop/trime/
SCHEMA_NAME=rime-teochew
SCHEMA_URL=https://github.com/hokkien-writing/rime-teochew.git

# 創建工作文件夾
rm -rf "workdir/trime"
mkdir -p "workdir/trime"
cd workdir || return

# 下載並解壓 rimerc-trime
mkdir rimerc-trime
curl -LO https://github.com/Bambooin/rimerc/releases/download/v0.1.7/rimerc-trime-v0.1.7.zip
unzip rimerc-trime-v0.1.7.zip -d rimerc-trime
find rimerc-trime/trime/* -type f ! -name "luna*" -exec cp {} trime \;

# 下載朙月拼音
git clone https://github.com/rime/rime-luna-pinyin.git
cp rime-luna-pinyin/*.yaml trime

# 下載五筆畫
git clone https://github.com/rime/rime-stroke.git
cp rime-stroke/*.yaml trime

# 下載拍字方案並複製到trime文件夾
git clone --depth 1 "$SCHEMA_URL"
cp "$SCHEMA_NAME"/*.yaml trime

# 複製所有配置文件到 TRIME_DIR
cp -rf trime/* "$TRIME_DIR/app/src/main/assets/rime"
```

### 拍包調試版

```bash
# On Linux or macOS
make debug

# On Windows
.\gradlew assembleDebug
```

### 拍包正式版

在 Andoroid Studio 中，點擊 `Build` => `Generate Signed App Bundle / APK... `。

## 致謝

1. [osfans/trime](https://github.com/osfans/trime)
2. [Bambooin/rimerc](https://github.com/Bambooin/rimerc)
3. [RIME](https://rime.im/)
4. [潮州話拍字方案](https://github.com/hokkien-writing/rime-teochew)
5. [【朙月拼音】輸入方案](https://github.com/rime/rime-luna-pinyin)
