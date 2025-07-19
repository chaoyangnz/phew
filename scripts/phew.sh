#!/bin/sh

#$(dirname "$0")/phew card $1 --variation full -o $2

cd ~/Work/phew
~/.bun/bin/bun run src/main.ts card $1 --variation full -o $2 >> ~/phew/1.txt
