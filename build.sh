#!/bin/sh

if [ $# -eq 0 ]; then
    echo "At least 1 argument is needed"
    exit 1
fi

node ./replace-env-file.js "$1"
react-native run-android
react-native start
node ./restore-dummy-env-file.js

