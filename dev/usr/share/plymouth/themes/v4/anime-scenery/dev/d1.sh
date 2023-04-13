#!/bin/bash

sudo plymouth --show-splash
sudo plymouth change-mode --boot-up
sudo plymouth update --status="normal"

sudo plymouth pause-progress
sudo plymouth message --text="pausing boot - press 'c' or space bar to continue"
sleep 2
# sudo plymouth watch-keystroke --keys="cC " --command="tee /tmp/c_key_pressed"
sudo plymouth message --text="resuming boot"
sudo plymouth unpause-progress

#sudo plymouth ask-question --prompt "what is your name? " | /usr/bin/tee
sudo plymouth ask-for-password --prompt "specify password: " | /usr/bin/tee

#sudo plymouth message --text="Hello"

sudo plymouth --update=fsck:sda1:0
sudo plymouth --update=fsck:sda1:1
sudo plymouth --update=fsck:sda1:2
sudo plymouth --update=fsck:sda1:3
sudo plymouth --update=fsck:sda1:4
sudo plymouth --update=fsck:sda1:5
sudo plymouth --update=fsck:sda1:6
sudo plymouth --update=fsck:sda1:7
sudo plymouth --update=fsck:sda1:8
sudo plymouth --update=fsck:sda1:9
sudo plymouth --update=fsck:sda1:10
sudo plymouth --update=fsck:sda1:11
sudo plymouth --update=fsck:sda1:12
sudo plymouth --update=fsck:sda1:27
sudo plymouth --update=fsck:sda1:54
sudo plymouth --update=fsck:sda1:100

END=50
for i in $(seq 1 $END); do
    sudo plymouth --update="$i длинная_строка_предлинная_строка_прямо_вот_такая"
    sudo plymouth --update="$i long_str_long_strlong_str_long_strlong_str_long_str"
done

sleep 5
sudo plymouth --quit
