#!/bin/bash

THEME_NAME="lera-forest"

if [[ -n "$THEME_NAME" ]]; then
    echo "Non empty"
else
    echo "Theme name is empty. Exit"
    exit
fi

sudo rm -rf /boot/grub/themes/$THEME_NAME
sudo mkdir -p /boot/grub/themes/$THEME_NAME
sudo cp -r ../$THEME_NAME /boot/grub/themes/
ls -plash /boot/grub/themes/$THEME_NAME

if hash $EDITOR 2>/dev/null; then
    sudo $EDITOR /etc/default/grub
fi

sudo update-grub
