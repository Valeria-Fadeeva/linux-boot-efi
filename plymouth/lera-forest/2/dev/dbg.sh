#!/bin/bash

tmux send -t s1.3 'sudo plymouthd --debug --tty=`tty` --no-daemon --mode=boot' ENTER;
tmux send -t s1.2 'sudo plymouth --ping; if [[ "$?" == 0 ]]; then echo plymouth is running; else echo plymouth NOT running; fi' ENTER;
tmux send -t s1.2 'sudo plymouth show-splash; sleep 15; sudo plymouth --quit' ENTER;




#sudo plymouth message --text="HHHHhhh"
#sudo plymouth update --status="normal"

#sudo plymouth pause-progress&
#sudo plymouth message --text="pausing boot - press 'c' or space bar to continue"&
#sudo plymouth watch-keystroke --keys="cC " --command="tee /tmp/c_key_pressed"&
#sudo plymouth message --text="resuming boot"&
#sudo plymouth unpause-progress&

#sudo plymouth ask-question --prompt "what is your name? " | /usr/bin/tee
#sudo plymouth ask-for-password --prompt "specify password: " | /usr/bin/tee
sudo plymouth update --status="fsck:sda1:27"

