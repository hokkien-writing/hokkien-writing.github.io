#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

sync_project() {
    local src_dir="$1"
    local target_dir="$2"
    local repo="$3"
    local branch="${4:-main}"

    local readme="$SCRIPT_DIR/$src_dir/README.md"
    local output="$SCRIPT_DIR/source/$target_dir/index.md"

    if [[ ! -f "$readme" ]]; then
        echo "Warning: $readme not found, skipping" >&2
        return 1
    fi

    local repo_url="https://github.com/$repo"
    local raw_base="https://github.com/$repo/raw/$branch"
    local blob_base="https://github.com/$repo/blob/$branch"
    local date_str
    date_str="$(date '+%Y-%m-%d %H:%M:%S')"

    local title
    title="$(grep -m1 '^# ' "$readme" | sed 's/^#[[:space:]]*//' | sed 's/[[:space:]]*$//')"

    if [[ -z "$title" ]]; then
        title="$(basename "$src_dir")"
    fi

    {
        echo "---"
        echo "title: $title"
        echo "date: $date_str"
        echo "source: $repo_url"
        echo "---"
        echo ""
        echo "📌 若有缺漏，歡迎移步 [$repo]($repo_url) 相輔修訂。"
        echo ""

        awk 'NR != 1 || !/^# /' "$readme" | awk '/./{p=1} p' | \
        RAW_BASE="$raw_base" BLOB_BASE="$blob_base" perl -pe '
            s{!\[([^\]]*)\]\((?!https?:)(?!#)([^)]+)\)}
             {qq{!\[$1\]($ENV{RAW_BASE}/$2)}}ge;
            s{(?<!!)\[([^\]]*)\]\((?!https?:)(?!mailto:)(?!#)([^)]+)\)}
             {qq{\[$1\]($ENV{BLOB_BASE}/$2)}}ge;
        '
    } > "$output"

    echo "Synced: $src_dir/README.md -> source/$target_dir/index.md"
}

sync_project "../rime-hokkien" "rime_hokkien" "hokkien-writing/rime-hokkien" "main"
sync_project "../rime-teochew" "rime_teochew" "hokkien-writing/rime-teochew" "master"
sync_project "../simple-puj" "simple_puj" "hokkien-writing/simple-puj" "main"
