#!/bin/bash

THEME_NAME="lost-ark"

if [[ -n "$THEME_NAME" ]]; then
    echo "Non empty"
else
    echo "Theme name is empty. Exit"
    exit
fi

./make.sh

sudo rm -rf /usr/share/plymouth/themes/$THEME_NAME
sudo mkdir -p /usr/share/plymouth/themes/$THEME_NAME
sudo cp -r ../$THEME_NAME /usr/share/plymouth/themes/
ls -plash /usr/share/plymouth/themes/$THEME_NAME



if hash update-alternatives 2>/dev/null; then
    sudo update-alternatives --install /usr/share/plymouth/themes/default.plymouth default.plymouth /usr/share/plymouth/themes/$THEME_NAME/$THEME_NAME.plymouth 10
    sudo update-alternatives --set default.plymouth /usr/share/plymouth/themes/$THEME_NAME/$THEME_NAME.plymouth

    sudo update-alternatives --install /usr/share/plymouth/themes/default.plymouth default.plymouth /usr/share/plymouth/themes/$THEME_NAME/$THEME_NAME.plymouth 10
    sudo update-alternatives --set default.plymouth /usr/share/plymouth/themes/$THEME_NAME/$THEME_NAME.plymouth
    sudo update-alternatives --config default.plymouth
elif hash plymouth-set-default-theme 2>/dev/null; then
    sudo plymouth-set-default-theme $THEME_NAME
fi

read -p 'Make initramfs. y/N? ' mifs
if [[ "${mifs,,}" == "y" ]]; then

    if hash plymouth-set-default-theme 2>/dev/null; then
        sudo plymouth-set-default-theme $THEME_NAME -R
    elif hash update-initramfs 2>/dev/null; then
        sudo update-initramfs -u
    elif hash mkinitcpio 2>/dev/null; then
        sudo mkinitcpio -P
    fi

    sudo update-grub
    #sudo grub-mkconfig -o /boot/grub/grub.cfg
else
    echo "Selected not to create initramfs"
fi
