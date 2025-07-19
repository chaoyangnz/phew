#!/bin/sh

base=$(dirname "$0")
DYLD_LIBRARY_PATH=$base $base/phew card $1 --variation full -o $2
