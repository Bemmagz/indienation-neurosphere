#!/data/data/com.termux/files/usr/bin/bash
TARGET_PORT=9999
TARGET_HOST=127.0.0.1
while true; do
    TIMESTAMP=$(date +"%Y-%m-%dT%H:%M:%S")
    echo -e "GET /simulate?time=$TIMESTAMP HTTP/1.1\r\nHost: localhost\r\n\r\n" | nc $TARGET_HOST $TARGET_PORT
    echo -e "\033[1;33m[SIMULATE] GET request @ $TIMESTAMP\033[0m"
    sleep 1
done
