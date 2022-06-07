#!/bin/bash

sudo plymouth show-splash

#sudo plymouth message --text="Hello"
#sleep 1
#sudo plymouth --update=fsck:sda1:0
#sleep 1
#sudo plymouth --update=fsck:sda1:27
#sleep 1
#sudo plymouth --update=fsck:sda1:54
#sleep 1
#sudo plymouth --update=fsck:sda1:100
#sleep 1
#sudo plymouth update --status="normal"


#sudo plymouth pause-progress
#sudo plymouth message --text="pausing boot - press 'c' or space bar to continue"
#sudo plymouth watch-keystroke --keys="cC " --command="tee /tmp/c_key_pressed"
#sudo plymouth message --text="resuming boot"
#sudo plymouth unpause-progress

#sleep 1

#sudo plymouth ask-question --prompt "what is your name? " | /usr/bin/tee
sudo plymouth ask-for-password --prompt "specify password: " | /usr/bin/tee

sleep 15

sudo plymouth --quit
