# Grub theme


Copyright (c) Saran Kumar - sarancodes https://github.com/sarancodes/pentract-grub-theme

* Original theme


Copyright (c) AliciaT - AliciaTransmuted, Alberto Bursi - bobafetthotmail

* Color OS icons from AliciaT - AliciaTransmuted https://github.com/AliciaTransmuted/rEFInd-details


Copyright (c) Valeria Fadeeva - https://github.com/Valeria-Fadeeva/linux-boot-efi

* Changed the background, fonts, icons, minor changes.


```
$ cat /etc/default/grub | grep -v ^# | grep -v ^$
GRUB_DEFAULT="0"
GRUB_DISTRIBUTOR="Garuda"
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash bgrt_disable loglevel=3 vt.global_cursor_default=0 systemd.unified_cgroup_hierarchy=0 mitigations=auto fsck.mode=force fsck.repair=yes"
GRUB_CMDLINE_LINUX=""
GRUB_PRELOAD_MODULES="part_gpt part_msdos"
GRUB_TIMEOUT=10
GRUB_TERMINAL_OUTPUT="gfxterm"
GRUB_GFXMODE=1920x1080x32,1280x800x32,1024x768x32,800x600x32,auto
GRUB_GFXPAYLOAD_LINUX=keep
GRUB_DISABLE_OS_PROBER=false
GRUB_THEME=/boot/grub/themes/lera-forest/theme.txt
```
