#!/bin/bash

#tmux attach -t s1
tmux new-session -d -s s1;
tmux rename-window user;

tmux split-window -h;
tmux selectp -t 1;

tmux split-window -h;

#tmux select-layout even-horizontal;

tmux selectp -t 2;
tmux split-window -v;

tmux selectp -t 0;

tmux send -t s1.3 'sudo plymouthd --debug --debug-file=/root/plymouth.log --tty=/dev/tty7 --no-daemon --mode=boot' ENTER;
tmux send -t s1.2 'sudo plymouth --ping; if [[ "$?" == 0 ]]; then echo plymouth is running; else echo plymouth NOT running; fi' ENTER;
tmux send -t s1.2 'sudo plymouth show-splash; sudo plymouth message --text="hello world"; sudo plymouth update --status="This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. "; sleep 15; sudo plymouth --quit' ENTER;
tmux send -t s1.0 'mc /home/lera/Загрузки/linux-boot-efi/plymouth/2/lera-forest/dev' ENTER;

tmux a;

