#!/bin/bash

plymouth show-splash

plymouth message --text="Hello"
sleep 1
plymouth --update=fsck:sda1:0
sleep 1
plymouth --update=fsck:sda1:27
sleep 1
plymouth --update=fsck:sda1:54
sleep 1
plymouth --update=fsck:sda1:100
sleep 1
plymouth update --status="normal"


#plymouth pause-progress
#plymouth message --text="pausing boot - press 'c' or space bar to continue"
#plymouth watch-keystroke --keys="cC " --command="tee /tmp/c_key_pressed"
#plymouth message --text="resuming boot"
#plymouth unpause-progress

#sleep 1

#plymouth ask-question --prompt "what is your name? " | /usr/bin/tee
plymouth ask-for-password --prompt "specify password: " | /usr/bin/tee

sleep 15

plymouth --quit
