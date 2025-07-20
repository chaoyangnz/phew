#!/usr/bin/env bash

base=$(dirname "$0")
echo "start processing $1" > $base/log.txt

nohup env DYLD_LIBRARY_PATH=$base $base/phew card $1 --variation full -o $2 >> $base/log.txt 2>&1 &
