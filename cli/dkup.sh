#!/bin/bash

: '
使用方式：
    ./dkup.sh <環境> <docker-compose指令> [額外參數...]

參數說明：
    <環境>              選擇 "local" 或 "prod"
    <docker-compose指令> 任何有效的 docker-compose 指令
    [額外參數]          docker-compose 指令的額外參數

範例：
    ./dkup.sh local up -d     # 在本地環境啟動容器（後台運行）
    ./dkup.sh prod up -d      # 在生產環境啟動容器（後台運行）

注意：
    確保 docker-compose.yml 和對應的環境配置文件（如 docker-compose.local.yml）
    存在於當前目錄中。
'

# 檢查參數數量
if [ "$#" -lt 2 ]; then
    echo "錯誤：缺少 dokcer-compose 啟動參數"
    echo "=================================================="
    echo "使用範例："
    echo "  本地環境啟動：    $0 local up -d"
    echo "  生產環境啟動：    $0 prod up -d"
    echo "=================================================="
    exit 1
fi

# 獲取環境參數
ENV=$1
shift

# 檢查環境參數是否有效
if [ "$ENV" != "local" ] && [ "$ENV" != "prod" ]; then
    echo "無效的環境。請使用 'local' 或 'prod'。"
    exit 1
fi

# 設置 Docker Compose 文件
BASE_COMPOSE_FILE="docker-compose.yml"
ENV_COMPOSE_FILE="docker-compose.$ENV.yml"

# 檢查文件是否存在
if [ ! -f "$BASE_COMPOSE_FILE" ]; then
    echo "錯誤：找不到 $BASE_COMPOSE_FILE 文件。"
    exit 1
fi

if [ ! -f "$ENV_COMPOSE_FILE" ]; then
    echo "錯誤：找不到 $ENV_COMPOSE_FILE 文件。"
    exit 1
fi

# 執行 Docker Compose 命令
docker-compose -f "$BASE_COMPOSE_FILE" -f "$ENV_COMPOSE_FILE" "$@"