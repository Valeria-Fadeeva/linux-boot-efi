```
$ efibootmgr -v
BootCurrent: 0001
Timeout: 1 seconds
BootOrder: 0000,0001,0005,0012,0003,0004,0010,0011,0002,0006,0007
Boot0000* rEFInd Boot Manager   HD(1,GPT,9f349c4d-f06b-ba44-9663-5426a2ea0899,0x1000,0x96000)/File(\EFI\refind\refind_x64.efi)
Boot0001* Manjaro       HD(1,GPT,9f349c4d-f06b-ba44-9663-5426a2ea0899,0x1000,0x96000)/File(\EFI\MANJARO\GRUBX64.EFI)
Boot0002* UEFI:CD/DVD Drive     BBS(129,,0x0)
Boot0003* Hard Drive    BBS(HD,,0x0)..GO..NO........u.A.D.A.T.A. .S.U.9.0.0....................A.................................>..Gd-.;.A..MQ..L.I.2.4.4.0.2.5.0.3.3.2.1. . . . . . . . ........BO..NO........u.H.G.S.T. .H.U.S.7.2.6.T.6.T.A.L.E.6.L.4....................A.................................>..Gd-.;.A..MQ..L.8.V.B.G.Y.U.R.U. . . . . . . . . . . . ........BO..NO........q.S.a.m.s.u.n.g. .S.S.D. .9.7.0. .E.V.O. .5.0.0.G.B....................A...........................%8W..D......4..Gd-.;.A..MQ..L.S.4.6.6.N.X.0.K.7.4.5.2.2.1.L........BO
Boot0004* CD/DVD Drive  BBS(CDROM,,0x0)..GO..NO........u.A.S.U.S. . . . .D.R.W.-.2.0.1.4.S.1.T....................A.................................>..Gd-.;.A..MQ..L. . . . . . . . . . . . . . . . . . . . ........BO
Boot0005* Windows Boot Manager  HD(2,GPT,29147093-4c3a-41d5-805e-539ce7614bde,0xfa000,0x31800)/File(\EFI\MICROSOFT\BOOT\BOOTMGFW.EFI)WINDOWS.........x...B.C.D.O.B.J.E.C.T.=.{.9.d.e.a.8.6.2.c.-.5.c.d.d.-.4.e.7.0.-.a.c.c.1.-.f.3.2.b.3.4.4.d.4.7.9.5.}...,................
Boot0006* UEFI:Removable Device BBS(130,,0x0)
Boot0007* UEFI:Network Device   BBS(131,,0x0)
Boot0010* UEFI: JetFlashTranscend 8GB 8.07, Partition 2 PciRoot(0x0)/Pci(0x1,0x3)/Pci(0x0,0x0)/USB(10,0)/HD(2,GPT,6dd793ab-3405-5fe9-c5a7-dc4f97dcdf97,0xee7fd8,0x10000)..BO
Boot0011* USB   BBS(HD,,0x0)..GO..NO........Y.J.e.t.F.l.a.s.h.T.r.a.n.s.c.e.n.d. .8.G.B. .8...0.7....................A.............................&..Gd-.;.A..MQ..L.P.S.Z.T.N.D.7.A........BO
Boot0012* UEFI OS       HD(1,GPT,9f349c4d-f06b-ba44-9663-5426a2ea0899,0x1000,0x96000)/File(\EFI\BOOT\BOOTX64.EFI)..BO
```

```
$ lsblk
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda           8:0    0 476,9G  0 disk
├─sda1        8:1    0   499M  0 part
├─sda2        8:2    0    99M  0 part
├─sda3        8:3    0    16M  0 part
├─sda4        8:4    0 475,7G  0 part
└─sda5        8:5    0   655M  0 part
sdb           8:16   0   5,5T  0 disk
├─sdb1        8:17   0    16M  0 part
├─sdb2        8:18   0   3,5T  0 part
└─sdb3        8:19   0     2T  0 part /run/media/lera/d561edb9-e875-443e-875f-a59b045efaf6
sdc           8:32   1   7,5G  0 disk
├─sdc1        8:33   1   7,5G  0 part /run/media/lera/Ventoy
└─sdc2        8:34   1    32M  0 part
sr0          11:0    1     2K  0 rom
nvme0n1     259:0    0 465,8G  0 disk
├─nvme0n1p1 259:1    0   300M  0 part /boot/efi
└─nvme0n1p2 259:2    0 465,5G  0 part /var/log
                                      /var/cache
                                      /home
                                      /
```

```
# blkid
/dev/nvme0n1p1: LABEL_FATBOOT="NO_LABEL" LABEL="NO_LABEL" UUID="B2F7-6E94" BLOCK_SIZE="512" TYPE="vfat" PARTUUID="9f349c4d-f06b-ba44-9663-5426a2ea0899"
/dev/nvme0n1p2: UUID="9a356946-5cab-4c6f-a5b3-29aa7937a4cd" UUID_SUB="662e6d90-bd2e-46d6-bb73-c01b9c8ba0e8" BLOCK_SIZE="4096" TYPE="btrfs" PARTLABEL="root" PARTUUID="153af990-cffa-0943-a947-ef4fcf510fe9"
/dev/sdb2: LABEL="HGST 6T" BLOCK_SIZE="512" UUID="3EC61CECC61CA665" TYPE="ntfs" PARTLABEL="Basic data partition" PARTUUID="4d537355-843b-46e9-bae6-8f17fc0729dd"
/dev/sdb3: UUID="d561edb9-e875-443e-875f-a59b045efaf6" UUID_SUB="cd1d7fe7-7d64-4ae5-9895-cdcea8b96e96" BLOCK_SIZE="4096" TYPE="btrfs" PARTUUID="f448991f-7b46-4669-bd18-75ea7d714bae"
/dev/sdc2: SEC_TYPE="msdos" LABEL_FATBOOT="VTOYEFI" LABEL="VTOYEFI" UUID="6353-2A54" BLOCK_SIZE="512" TYPE="vfat" PARTLABEL="VTOYEFI" PARTUUID="6dd793ab-3405-5fe9-c5a7-dc4f97dcdf97"
/dev/sdc1: LABEL="Ventoy" UUID="6FB0-9816" BLOCK_SIZE="512" TYPE="exfat" PTTYPE="dos" PARTLABEL="Ventoy" PARTUUID="4e58af86-fdfb-0fb6-b8a3-16e339982ac1"
/dev/sda4: LABEL="ADATA SU900 500G" BLOCK_SIZE="512" UUID="66DA4485DA445409" TYPE="ntfs" PARTLABEL="Basic data partition" PARTUUID="89a4f8e6-87e7-4daa-af7e-683b73111393"
/dev/sda2: UUID="083F-7C24" BLOCK_SIZE="512" TYPE="vfat" PARTLABEL="EFI system partition" PARTUUID="29147093-4c3a-41d5-805e-539ce7614bde"
/dev/sda5: BLOCK_SIZE="512" UUID="280AA6300AA5FB48" TYPE="ntfs" PARTUUID="975b49ef-5d20-4dd7-99a5-d2214aa2b333"
/dev/sda1: BLOCK_SIZE="512" UUID="1A6048F16048D4E3" TYPE="ntfs" PARTLABEL="Basic data partition" PARTUUID="3ee4d806-1d06-44cc-88f3-7ba9470357fe"
/dev/sdb1: PARTLABEL="Microsoft reserved partition" PARTUUID="8bcfca2e-a6d7-4cbe-aa81-cb1dcd0b560c"
/dev/sda3: PARTLABEL="Microsoft reserved partition" PARTUUID="8e5bb117-31b9-4933-be8d-daf2fa09a873"
```

```
# ls -plash /boot/efi/EFI/Linux
итого 68M
4,0K drwx------ 2 root root 4,0K мая 21 00:20 ./
4,0K drwx------ 7 root root 4,0K мая 21 00:24 ../
 26M -rwx------ 1 root root  26M мая 21 00:19 linux.efi
 42M -rwx------ 1 root root  42M мая 21 00:20 linux-fallback.efi
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
quiet splash bgrt_disable root=UUID=9a356946-5cab-4c6f-a5b3-29aa7937a4cd rw rootflags=subvol=@ loglevel=3 systemd.unified_cgroup_hierarchy=0 mitigations=auto fsck.mode=force fsck.repair=yes
```

```
$ lspci -v | grep -A 10 NVIDIA
0a:00.0 VGA compatible controller: NVIDIA Corporation GP102 [GeForce GTX 1080 Ti] (rev a1) (prog-if 00 [VGA controller])
        Subsystem: NVIDIA Corporation GP102 [GeForce GTX 1080 Ti]
        Flags: bus master, fast devsel, latency 0, IRQ 111, IOMMU group 15
        Memory at fb000000 (32-bit, non-prefetchable) [size=16M]
        Memory at d0000000 (64-bit, prefetchable) [size=256M]
        Memory at e0000000 (64-bit, prefetchable) [size=32M]
        I/O ports at d000 [size=128]
        Expansion ROM at 000c0000 [virtual] [disabled] [size=128K]
        Capabilities: [60] Power Management version 3
        Capabilities: [68] MSI: Enable+ Count=1/1 Maskable- 64bit+
        Capabilities: [78] Express Legacy Endpoint, MSI 00
        Capabilities: [100] Virtual Channel
--
0a:00.1 Audio device: NVIDIA Corporation GP102 HDMI Audio Controller (rev a1)
        Subsystem: NVIDIA Corporation Device 1b06
        Flags: bus master, fast devsel, latency 0, IRQ 108, IOMMU group 15
        Memory at fc080000 (32-bit, non-prefetchable) [size=16K]
        Capabilities: [60] Power Management version 3
        Capabilities: [68] MSI: Enable- Count=1/1 Maskable- 64bit+
        Capabilities: [78] Express Endpoint, MSI 00
        Capabilities: [100] Advanced Error Reporting
        Kernel driver in use: snd_hda_intel
        Kernel modules: snd_hda_intel

0b:00.0 Non-Essential Instrumentation [1300]: Advanced Micro Devices, Inc. [AMD] Zeppelin/Raven/Raven2 PCIe Dummy Function
```

```
$ lsmod | grep nvidia
nvidia_uvm           2650112  0
nvidia_drm             73728  4
nvidia_modeset       1163264  14 nvidia_drm
nvidia              39165952  901 nvidia_uvm,nvidia_modeset
```

```
$ cat /etc/mkinitcpio.conf | grep -v "^#" | grep -v "^$"
MODULES=(crc32c)
BINARIES=(btrfs)
FILES=""
HOOKS="base systemd autodetect modconf block keyboard sd-vconsole sd-plymouth filesystems grub-btrfs-overlayfs fsck"
COMPRESSION="xz"
COMPRESSION_OPTIONS=(-9)
```

```
$ cat /etc/mkinitcpio.d/linux-zen.preset
# mkinitcpio preset file for the 'linux518' package

ALL_config="/etc/mkinitcpio.conf"
ALL_kver="/boot/vmlinuz-5.18-x86_64"
ALL_microcode=(/boot/*-ucode.img)

PRESETS=('default' 'fallback')

#default_config="/etc/mkinitcpio.conf"
default_image="/boot/initramfs-5.18-x86_64.img"
default_efi_image="/boot/efi/EFI/Linux/linux.efi"
default_options="--cmdline /boot/cmdline.txt"

#fallback_config="/etc/mkinitcpio.conf"
fallback_image="/boot/initramfs-5.18-x86_64-fallback.img"
fallback_efi_image="/boot/efi/EFI/Linux/linux-fallback.efi"
fallback_options="-S autodetect --cmdline /boot/cmdline.txt"
```

```
$ cat /etc/modules-load.d/mhwd-gpu.conf
##
## Generated by mhwd - Manjaro Hardware Detection
##

nvidia
nvidia-drm
```

```
# systemctl enable sddm-plymouth.service

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
menuentry "Linux EFI" {
    icon     /EFI/refind/themes/lera-forest/color-icons/os_manjaro.png
    ostype   Linux
    graphics on
    loader   /EFI/Linux/linux.efi

    submenuentry "Boot Linux via GRUB" {
        loader /EFI/boot/bootx64.efi
    }

    submenuentry "Boot using fallback initramfs" {
        loader   /EFI/Linux/linux-fallback.efi
    }
}

menuentry "Linux" {
    icon     /EFI/refind/themes/lera-forest/color-icons/os_manjaro.png
    ostype   Linux
    graphics on
    loader   /EFI/Linux/vmlinuz
    initrd   /EFI/Linux/initramfs.img
    options  "quiet splash bgrt_disable root=UUID=9a356946-5cab-4c6f-a5b3-29aa7937a4cd rw rootflags=subvol=@ loglevel=3 systemd.unified_cgroup_hierarchy=0 mitigations=auto fsck.mode=force fsck.repair=yes add_efi_memmap initrd=/EFI/Linux/amd-ucode.img"

    submenuentry "Boot Linux via GRUB" {
        loader /EFI/boot/bootx64.efi
    }

    submenuentry "single-user mode" {
        add_options "single"
    }

    submenuentry "Boot to rescue terminal" {
        add_options "systemd.unit=rescue"
    }

    submenuentry "Boot using fallback initramfs" {
        initrd /EFI/Linux/initramfs-fallback.img
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

default_selection "Linux EFI"
```

