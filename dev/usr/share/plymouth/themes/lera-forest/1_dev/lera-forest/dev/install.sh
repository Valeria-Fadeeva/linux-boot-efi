#!/bin/bash

THEME_NAME="lera-forest"

if [[ -n "$THEME_NAME" ]]; then
    echo "Non empty"
else
    echo "Theme name is empty. Exit"
    exit
fi

./make.sh

sudo rm -rf /usr/share/plymouth/themes/$THEME_NAME
sudo mkdir -p /usr/share/plymouth/themes/$THEME_NAME
sudo cp -r ../ /usr/share/plymouth/themes/$THEME_NAME
ls -plash /usr/share/plymouth/themes/$THEME_NAME

if hash update-alternatives 2>/dev/null; then
    sudo update-alternatives --install /usr/share/plymouth/themes/default.plymouth default.plymouth /usr/share/plymouth/themes/$THEME_NAME/$THEME_NAME.plymouth 10
    sudo update-alternatives --set default.plymouth /usr/share/plymouth/themes/$THEME_NAME/$THEME_NAME.plymouth
fi

sudo plymouth-set-default-theme $THEME_NAME

read -p 'Make initramfs. y/n? ' mifs
if [[ "${mifs,,}" == "y" ]]; then
    sudo plymouth-set-default-theme $THEME_NAME -R
    #sudo mkinitcpio -P
    sudo grub-mkconfig -o /boot/grub/grub.cfg
    sudo /boot/STUB/make-efi.sh
else
    echo "Selected not to create initramfs"
fi
