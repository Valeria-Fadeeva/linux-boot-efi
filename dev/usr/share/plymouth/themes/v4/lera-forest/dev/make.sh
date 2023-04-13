#!/bin/bash

THEME_NAME="lera-forest"

if [[ -n "$THEME_NAME" ]]; then
    echo "Non empty"
else
    echo "Theme name is empty. Exit"
    exit
fi

cp -f $THEME_NAME.js ../$THEME_NAME/script.script
sed -i 's/function/fun/g' ../$THEME_NAME/script.script

if [[ "$?" == 0 ]]; then
    echo "Make successed"
else
    echo "Make failed?"
fi
