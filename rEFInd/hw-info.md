```
$ efibootmgr -v
BootCurrent: 0000
Timeout: 1 seconds
BootOrder: 0000,0002,000E,000F,0005,0003,0004,0001,0006,0007
Boot0000* Linux Boot Manager    HD(1,GPT,7f26072f-02b1-6643-b30a-749b7a0e94a9,0x1000,0x96000)/File(\EFI\SYSTEMD\SYSTEMD-BOOTX64.EFI)
Boot0001* UEFI:CD/DVD Drive     BBS(129,,0x0)
Boot0002* Garuda        HD(1,GPT,7f26072f-02b1-6643-b30a-749b7a0e94a9,0x1000,0x96000)/File(\EFI\GARUDA\GRUBX64.EFI)
Boot0003* Hard Drive    BBS(HD,,0x0)..GO..NO........u.A.D.A.T.A. .S.U.9.0.0....................A.................................>..Gd-.;.A..MQ..L.I.2.4.4.0.2.5.0.3.3.2.1. . . . . . . . ........BO..NO........u.H.G.S.T. .H.U.S.7.2.6.T.6.T.A.L.E.6.L.4....................A.................................>..Gd-.;.A..MQ..L.8.V.B.G.Y.U.R.U. . . . . . . . . . . . ........BO..NO........q.S.a.m.s.u.n.g. .S.S.D. .9.7.0. .E.V.O. .5.0.0.G.B....................A...........................%8W..D......4..Gd-.;.A..MQ..L.S.4.6.6.N.X.0.K.7.4.5.2.2.1.L........BO
Boot0004* CD/DVD Drive  BBS(CDROM,,0x0)..GO..NO........u.A.S.U.S. . . . .D.R.W.-.2.0.1.4.S.1.T....................A.................................>..Gd-.;.A..MQ..L. . . . . . . . . . . . . . . . . . . . ........BO
Boot0005* Windows Boot Manager  HD(2,GPT,29147093-4c3a-41d5-805e-539ce7614bde,0xfa000,0x31800)/File(\EFI\MICROSOFT\BOOT\BOOTMGFW.EFI)WINDOWS.........x...B.C.D.O.B.J.E.C.T.=.{.9.d.e.a.8.6.2.c.-.5.c.d.d.-.4.e.7.0.-.a.c.c.1.-.f.3.2.b.3.4.4.d.4.7.9.5.}...,................
Boot0006* UEFI:Removable Device BBS(130,,0x0)
Boot0007* UEFI:Network Device   BBS(131,,0x0)
Boot000E* UEFI OS       HD(1,GPT,7f26072f-02b1-6643-b30a-749b7a0e94a9,0x1000,0x96000)/File(\EFI\BOOT\BOOTX64.EFI)..BO
Boot000F* Windows Boot Manager  HD(1,GPT,7f26072f-02b1-6643-b30a-749b7a0e94a9,0x1000,0x96000)/File(\EFI\MICROSOFT\BOOT\BOOTMGFW.EFI)..BO
```

```
$ lsblk
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
loop0         7:0    0 446,9M  1 loop /var/lib/anbox/rootfs
sda           8:0    0 476,9G  0 disk
├─sda1        8:1    0   499M  0 part
├─sda2        8:2    0    99M  0 part
├─sda3        8:3    0    16M  0 part
├─sda4        8:4    0 475,7G  0 part
└─sda5        8:5    0   655M  0 part
sdb           8:16   0   5,5T  0 disk
├─sdb1        8:17   0    16M  0 part
├─sdb2        8:18   0   3,5T  0 part /disk/HGST_6T
└─sdb3        8:19   0     2T  0 part /disk
sr0          11:0    1     2K  0 rom
zram0       254:0    0  31,3G  0 disk [SWAP]
nvme0n1     259:0    0 465,8G  0 disk
├─nvme0n1p1 259:1    0   300M  0 part /boot/efi
└─nvme0n1p2 259:2    0 465,5G  0 part /var/lib/anbox/rootfs/data
                                      /var/lib/anbox/rootfs/cache
                                      /var/tmp
                                      /var/log
                                      /var/cache
                                      /home
                                      /srv
                                      /root
                                      /
```

```
# blkid
/dev/nvme0n1p1: LABEL_FATBOOT="NO_LABEL" LABEL="NO_LABEL" UUID="2FAA-1C06" BLOCK_SIZE="512" TYPE="vfat" PARTUUID="7f26072f-02b1-6643-b30a-749b7a0e94a9"
/dev/nvme0n1p2: UUID="249576bf-b94b-4b6b-8882-ec1293df3a17" UUID_SUB="9bd80259-fc1a-49b4-8321-694cb06ecec6" BLOCK_SIZE="4096" TYPE="btrfs" PARTLABEL="root" PARTUUID="6027f313-184b-834c-9c6a-210e78b6d8a9"
/dev/sdb2: LABEL="HGST 6T" BLOCK_SIZE="512" UUID="3EC61CECC61CA665" TYPE="ntfs" PARTLABEL="Basic data partition" PARTUUID="4d537355-843b-46e9-bae6-8f17fc0729dd"
/dev/sdb3: UUID="d561edb9-e875-443e-875f-a59b045efaf6" UUID_SUB="cd1d7fe7-7d64-4ae5-9895-cdcea8b96e96" BLOCK_SIZE="4096" TYPE="btrfs" PARTUUID="f448991f-7b46-4669-bd18-75ea7d714bae"
/dev/loop0: TYPE="squashfs"
/dev/sda4: LABEL="ADATA SU900 500G" BLOCK_SIZE="512" UUID="66DA4485DA445409" TYPE="ntfs" PARTLABEL="Basic data partition" PARTUUID="89a4f8e6-87e7-4daa-af7e-683b73111393"
/dev/sda2: UUID="083F-7C24" BLOCK_SIZE="512" TYPE="vfat" PARTLABEL="EFI system partition" PARTUUID="29147093-4c3a-41d5-805e-539ce7614bde"
/dev/sda5: BLOCK_SIZE="512" UUID="280AA6300AA5FB48" TYPE="ntfs" PARTUUID="975b49ef-5d20-4dd7-99a5-d2214aa2b333"
/dev/sda1: BLOCK_SIZE="512" UUID="1A6048F16048D4E3" TYPE="ntfs" PARTLABEL="Basic data partition" PARTUUID="3ee4d806-1d06-44cc-88f3-7ba9470357fe"
/dev/zram0: LABEL="zram0" UUID="c97eeeee-7e91-4862-9b32-4bd6e43de182" TYPE="swap"
```

```
# ls -plash /boot/efi/EFI/Linux
итого 210M
4,0K drwx------  2 root root 4,0K мая 10 00:46 ./
4,0K drwx------ 11 root root 4,0K мая  9 12:04 ../
 52K -rwx------  1 root root  50K апр 12 11:14 amd-ucode.img
4,0K -rwx------  1 root root  194 мая 10 00:42 cmdline.txt
 80M -rwx------  1 root root  80M мая 10 00:47 initramfs-linux-zen-fallback.img
 55M -rwx------  1 root root  55M мая 10 00:46 initramfs-linux-zen.img
 66M -rwx------  1 root root  66M мая 10 00:46 linux-zen.efi
 11M -rwx------  1 root root  11M апр 28 15:00 vmlinuz-linux-zen
```

```
$ zgrep FRAMEBUFFER_CONSOLE_DEFERRED_TAKEOVER= /proc/config.gz
CONFIG_FRAMEBUFFER_CONSOLE_DEFERRED_TAKEOVER=y
```

```
$ zgrep CONFIG_EFI_STUB= /proc/config.gz
CONFIG_EFI_STUB=y
```

```
$ cat /proc/cmdline
quiet splash bgrt_disable root=PARTUUID=6027f313-184b-834c-9c6a-210e78b6d8a9 rw rootflags=subvol=@ loglevel=3 systemd.unified_cgroup_hierarchy=0 mitigations=auto fsck.mode=force fsck.repair=yes
```

```
$ lspci -v | grep -A 10 NVIDIA
0a:00.0 VGA compatible controller: NVIDIA Corporation GP102 [GeForce GTX 1080 Ti] (rev a1) (prog-if 00 [VGA controller])
        Subsystem: NVIDIA Corporation GP102 [GeForce GTX 1080 Ti]
        Flags: bus master, fast devsel, latency 0, IRQ 116, IOMMU group 15
        Memory at fb000000 (32-bit, non-prefetchable) [size=16M]
        Memory at d0000000 (64-bit, prefetchable) [size=256M]
        Memory at e0000000 (64-bit, prefetchable) [size=32M]
        I/O ports at d000 [size=128]
        Expansion ROM at 000c0000 [virtual] [disabled] [size=128K]
        Capabilities: <access denied>
        Kernel driver in use: nvidia
        Kernel modules: nouveau, nvidia_drm, nvidia

0a:00.1 Audio device: NVIDIA Corporation GP102 HDMI Audio Controller (rev a1)
        Subsystem: NVIDIA Corporation Device 1b06
        Flags: bus master, fast devsel, latency 0, IRQ 113, IOMMU group 15
        Memory at fc080000 (32-bit, non-prefetchable) [size=16K]
        Capabilities: <access denied>
        Kernel driver in use: snd_hda_intel
        Kernel modules: snd_hda_intel

0b:00.0 Non-Essential Instrumentation [1300]: Advanced Micro Devices, Inc. [AMD] Zeppelin/Raven/Raven2 PCIe Dummy Function
        Subsystem: ASUSTeK Computer Inc. Device 8747
        Flags: fast devsel, IOMMU group 16
        Capabilities: <access denied>
```

```
$ lsmod | grep nvidia
nvidia_uvm           2605056  0
nvidia_drm             73728  8
nvidia_modeset       1163264  19 nvidia_drm
nvidia              39178240  1147 nvidia_uvm,nvidia_modeset
```

```
$ cat /etc/mkinitcpio.conf | grep -v "^#" | grep -v "^$"
MODULES=(crc32c nvidia nvidia_modeset nvidia_uvm nvidia_drm)
BINARIES=()
FILES=""
HOOKS="base systemd autodetect modconf block keyboard sd-vconsole sd-plymouth filesystems grub-btrfs-overlayfs fsck"
COMPRESSION="xz"
COMPRESSION_OPTIONS=(-9)
```

```
$ cat /etc/mkinitcpio.d/linux-zen.preset
# mkinitcpio preset file for the 'linux-zen' package

ALL_config="/etc/mkinitcpio.conf"
ALL_kver="/boot/vmlinuz-linux-zen"
ALL_microcode=(/boot/*-ucode.img)

PRESETS=('default' 'fallback')

#default_config="/etc/mkinitcpio.conf"
default_image="/boot/initramfs-linux-zen.img"
default_efi_image="/boot/efi/EFI/Linux/linux-zen.efi"
default_options="--cmdline /boot/cmdline.txt"

#fallback_config="/etc/mkinitcpio.conf"
fallback_image="/boot/initramfs-linux-zen-fallback.img"
fallback_options="-S autodetect"
```

```
$ cat /etc/modules-load.d/garuda-nvidia.conf
nvidia-uvm
nvidia-drm
```

```
$ systemctl status sddm-plymouth.service
● sddm-plymouth.service - Simple Desktop Display Manager
     Loaded: loaded (/usr/lib/systemd/system/sddm-plymouth.service; enabled; vendor preset: disabled)
     Active: active (running) since Wed 2022-05-04 14:35:18 +05; 10min ago
       Docs: man:sddm(1)
             man:sddm.conf(5)
   Main PID: 775 (sddm)
      Tasks: 4 (limit: 38318)
     Memory: 130.9M
     CGroup: /system.slice/sddm-plymouth.service
             ├─ 775 /usr/bin/sddm
             └─ 796 /usr/lib/Xorg -nolisten tcp -background none -seat seat0 vt1 -auth /var/run/sddm/{de8c0cca-18fe-4a3b-a2b6-54c82a>

мая 04 14:35:30 Lera-PC sddm-helper[3708]: [PAM] Preparing to converse...
мая 04 14:35:30 Lera-PC sddm-helper[3708]: [PAM] Conversation with 1 messages
мая 04 14:35:30 Lera-PC sddm[775]: Authentication information: "Web console: https://localhost:9090/\n"
мая 04 14:35:30 Lera-PC sddm[775]: Auth: sddm-helper exited successfully
мая 04 14:35:30 Lera-PC sddm[775]: Greeter stopped.
мая 04 14:35:30 Lera-PC sddm-helper[3708]: pam_env(sddm:session): deprecated reading of user environment enabled
мая 04 14:35:30 Lera-PC sddm-helper[3708]: gkr-pam: gnome-keyring-daemon started properly and unlocked keyring
мая 04 14:35:30 Lera-PC sddm-helper[3708]: pam_kwallet5(sddm:session): pam_kwallet5: pam_sm_open_session
мая 04 14:35:30 Lera-PC sddm-helper[3708]: Starting: "/usr/share/sddm/scripts/Xsession \"/usr/bin/startplasma-x11\""
мая 04 14:35:30 Lera-PC sddm[775]: Session started
lines 1-22/22 (END)
```

```
# cat /boot/efi/EFI/refind/refind.conf | grep -v "^#" | grep -v "^$"
timeout 10
use_nvram false
screensaver 60
resolution 3
enable_touch
enable_mouse
mouse_speed 16
use_graphics_for osx,linux,grub,windows
showtools shutdown, reboot, exit, firmware, fwupdate
scan_driver_dirs /EFI/refind/drivers_x64,EFI/tools/drivers,drivers
scanfor manual,internal,external,optical
also_scan_dirs boot,ESP:EFI/Linux,ESP2:EFI/linux/kernels
scan_all_linux_kernels true
extra_kernel_version_strings linux-lts,linux,linux-zen
write_systemd_vars true
include manual.conf
include themes/lera-forest/theme.conf
```

```
# cat /boot/efi/EFI/refind/manual.conf
menuentry "Garuda Linux EFI" {
    icon     /EFI/refind/themes/lera-forest/color-icons/os_garuda.png
    ostype   Linux
    graphics on
    loader   /EFI/Linux/linux-zen.efi

    submenuentry "Boot Garuda Linux via GRUB" {
        loader /EFI/Linux/grubx64.efi
    }

    submenuentry "Boot using fallback initramfs" {
        loader   /EFI/Linux/linux-zen-fallback.efi
    }
}

menuentry "Garuda Linux" {
    icon     /EFI/refind/themes/lera-forest/color-icons/os_garuda.png
    ostype   Linux
    graphics on
    loader   /EFI/Linux/vmlinuz-linux-zen
    initrd   /EFI/Linux/initramfs-linux-zen.img
    options  "quiet splash bgrt_disable root=PARTUUID=6027f313-184b-834c-9c6a-210e78b6d8a9 rw rootflags=subvol=@ loglevel=3 systemd.unified_cgroup_hierarchy=0 mitigations=auto fsck.mode=force fsck.repair=yes add_efi_memmap initrd=/EFI/Linux/amd-ucode.img"

    submenuentry "Boot Garuda Linux via GRUB" {
        loader /EFI/Linux/grubx64.efi
    }

    submenuentry "single-user mode" {
        add_options "single"
    }

    submenuentry "Boot to rescue terminal" {
        add_options "systemd.unit=rescue"
    }

    submenuentry "Boot using fallback initramfs" {
        initrd /EFI/Linux/initramfs-linux-fallback.img
    }

    submenuentry "Boot to terminal" {
        add_options "systemd.unit=multi-user.target"
    }
}

menuentry "Windows" {
    icon      /EFI/refind/themes/lera-forest/color-icons/os_win11.png
    ostype    Windows
    loader    /EFI/Microsoft/Boot/bootmgfw.efi
}

menuentry "Memtest86+ from EFI" {
    icon     /EFI/refind/themes/lera-forest/color-icons/tool_memtest.png
    loader   /EFI/memtest/bootx64.efi
}

default_selection "Garuda Linux EFI"
```

