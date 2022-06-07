#!/bin/bash

THEME_NAME="lera-police"

if [[ -n "$THEME_NAME" ]]; then
    echo "Non empty"
else
    echo "Theme name is empty. Exit"
    exit
fi

cp -f $THEME_NAME.js ../$THEME_NAME/$THEME_NAME.script
sed -i 's/function/fun/g' ../$THEME_NAME/$THEME_NAME.script

if [[ "$?" == 0 ]]; then
    echo "Make successed"
else
    echo "Make failed?"
fi
