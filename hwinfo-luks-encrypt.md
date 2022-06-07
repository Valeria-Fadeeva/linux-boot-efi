```
$ efibootmgr -v
BootCurrent: 0004
Timeout: 3 seconds
BootOrder: 0004,0002,0001,0000,0003
Boot0000* UiApp FvVol(7cb8bdc9-f8eb-4f34-aaea-3ee4af6516a1)/FvFile(462caa21-7614-4503-836e-8ab6f4662331)
Boot0001* UEFI QEMU DVD-ROM QM00003     PciRoot(0x0)/Pci(0x1f,0x2)/Sata(1,65535,0)N.....YM....R,Y.
Boot0002* UEFI Misc Device      PciRoot(0x0)/Pci(0x2,0x7)/Pci(0x0,0x0)N.....YM....R,Y.
Boot0003* EFI Internal Shell    FvVol(7cb8bdc9-f8eb-4f34-aaea-3ee4af6516a1)/FvFile(7c04a583-9e3e-4f1c-ad65-e05268d0b4d1)
Boot0004* rEFInd Boot Manager   HD(1,GPT,b1c738ca-d27c-a149-8fac-2f0831b97def,0x1000,0x96000)/File(\EFI\refind\refind_x64.efi)
```

```
$ lsblk
NAME                                          MAJ:MIN RM  SIZE RO TYPE  MOUNTPOINTS
sr0                                            11:0    1  1,4G  0 rom
zram0                                         252:0    0  7,7G  0 disk  [SWAP]
vda                                           254:0    0  100G  0 disk
├─vda1                                        254:1    0  300M  0 part  /boot/efi
└─vda2                                        254:2    0 99,7G  0 part
  └─luks-2f67acef-3619-458c-a190-1829017b6531 253:0    0 99,7G  0 crypt /root
                                                                        /var/log
                                                                        /var/tmp
                                                                        /var/cache
                                                                        /home
                                                                        /srv
                                                                        /

```

```
# blkid
/dev/sr0: BLOCK_SIZE="2048" UUID="2022-04-28-06-22-18-00" LABEL="GARUDA_KDELITE_TALON" TYPE="iso9660" PTTYPE="dos"
/dev/mapper/luks-2f67acef-3619-458c-a190-1829017b6531: UUID="f1540446-9b39-4f01-bda7-8de1c297e4fd" UUID_SUB="e23f74c1-a241-41ff-9fe1-5903fcaaad8a" BLOCK_SIZE="4096" TYPE="btrfs"
/dev/zram0: LABEL="zram0" UUID="d5267c2a-365d-46a7-a848-3ca7b6411569" TYPE="swap"
/dev/vda2: UUID="2f67acef-3619-458c-a190-1829017b6531" TYPE="crypto_LUKS" PARTLABEL="root" PARTUUID="10e26f50-5cd0-1545-a5f7-4ee9454578a1"
/dev/vda1: LABEL_FATBOOT="NO_LABEL" LABEL="NO_LABEL" UUID="8DB3-CD41" BLOCK_SIZE="512" TYPE="vfat" PARTUUID="b1c738ca-d27c-a149-8fac-2f0831b97def"
```

```
# ls -plash /boot/efi/EFI/Linux
итого 92M
4,0K drwx------ 2 root root 4,0K мая 10 00:13 ./
4,0K drwx------ 7 root root 4,0K мая  9 20:16 ../
 52K -rwx------ 1 root root  50K апр 12 11:14 amd-ucode.img
4,0K -rwx------ 1 root root  228 мая  9 23:57 cmdline.txt
 33M -rwx------ 1 root root  33M мая  9 12:35 initramfs-linux-zen-fallback.img
 19M -rwx------ 1 root root  19M мая  9 23:47 initramfs-linux-zen.img
 30M -rwx------ 1 root root  30M мая 10 00:13 linux-zen.efi
4,0K -rwx------ 1 root root  842 мая  9 23:56 refind_linux.conf
 11M -rwx------ 1 root root  11M мая  7 22:20 vmlinuz-linux-zen
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
quiet splash bgrt_disable rd.luks.uuid=2f67acef-3619-458c-a190-1829017b6531 root=UUID=f1540446-9b39-4f01-bda7-8de1c297e4fd rw rootflags=subvol=@ loglevel=3 systemd.unified_cgroup_hierarchy=0 mitigations=auto fsck.mode=force fsck.repair=yes
```

### GRUB WITH UDEV in mkinitcpio.conf
```
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash bgrt_disable cryptdevice=UUID=2f67acef-3619-458c-a190-1829017b6531:luks-2f67acef-3619-458c-a190-1829017b6531 root=/dev/mapper/luks-2f67acef-3619-458c-a190-1829017b6531 loglevel=3"
```

### GRUB WITH SYSTEMD in mkinitcpio.conf
```
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash bgrt_disable rd.luks.uuid=2f67acef-3619-458c-a190-1829017b6531 root=UUID=f1540446-9b39-4f01-bda7-8de1c297e4fd rw rootflags=subvol=@ loglevel=3 systemd.unified_cgroup_hierarchy=0 mitigations=auto fsck.mode=force fsck.repair=yes"
```

```
$ lspci -v | grep -A 10 VGA
00:01.0 VGA compatible controller: Red Hat, Inc. Virtio GPU (rev 01) (prog-if 00 [VGA controller])
        Subsystem: Red Hat, Inc. Device 1100
        Flags: bus master, fast devsel, latency 0, IRQ 21
        Memory at c0000000 (32-bit, prefetchable) [size=8M]
        Memory at 800700000 (64-bit, prefetchable) [size=16K]
        Memory at c1c4f000 (32-bit, non-prefetchable) [size=4K]
        Expansion ROM at 000c0000 [disabled] [size=128K]
        Capabilities: [98] MSI-X: Enable+ Count=3 Masked-
        Capabilities: [84] Vendor Specific Information: VirtIO: <unknown>
        Capabilities: [70] Vendor Specific Information: VirtIO: Notify
        Capabilities: [60] Vendor Specific Information: VirtIO: DeviceCfg

```

```
$ lsmod | grep virtio
vmw_vsock_virtio_transport    20480  0
virtio_rng             16384  0
virtio_scsi            28672  0
virtio_balloon         28672  0
vmw_vsock_virtio_transport_common    49152  1 vmw_vsock_virtio_transport
virtio_net             69632  0
virtio_gpu             81920  2
virtio_blk             20480  2
vsock                  57344  2 vmw_vsock_virtio_transport_common,vmw_vsock_virtio_transport
net_failover           24576  1 virtio_net
virtio_dma_buf         16384  1 virtio_gpu
virtio_console         49152  2
virtio_pci             24576  0
virtio_pci_legacy_dev    16384  1 virtio_pci
virtio_pci_modern_dev    20480  1 virtio_pci
rng_core               16384  3 virtio_rng,ccp,tpm
```

```
$ cat /etc/mkinitcpio.conf | grep -v "^#" | grep -v "^$"
MODULES="crc32c"
BINARIES=(btrfs)
FILES="/crypto_keyfile.bin"
HOOKS="base systemd sd-plymouth autodetect modconf block keyboard sd-vconsole sd-encrypt filesystems btrfs grub-btrfs-overlayfs fsck"
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
fallback_efi_image="/boot/efi/EFI/Linux/linux-zen-fallback.efi"
fallback_options="-S autodetect"
```

```
# cat /boot/efi/EFI/Linux/refind_linux.conf
"LUKS Boot password"             "quiet splash bgrt_disable rd.luks.uuid=2f67acef-3619-458c-a190-1829017b6531 root=UUID=f1540446-9b39-4f01-bda7-8de1c297e4fd rw rootflags=subvol=@ loglevel=3"
"LUKS Boot password single"      "quiet splash bgrt_disable rd.luks.uuid=2f67acef-3619-458c-a190-1829017b6531 root=UUID=f1540446-9b39-4f01-bda7-8de1c297e4fd rw rootflags=subvol=@ loglevel=3 single"
"LUKS Boot keyfile"              "quiet splash bgrt_disable rd.luks.key=/crypto_keyfile.bin rd.luks.uuid=2f67acef-3619-458c-a190-1829017b6531 root=UUID=f1540446-9b39-4f01-bda7-8de1c297e4fd rw rootflags=subvol=@ loglevel=3"
"LUKS Boot keyfile single"       "quiet splash bgrt_disable rd.luks.key=/crypto_keyfile.bin rd.luks.uuid=2f67acef-3619-458c-a190-1829017b6531 root=UUID=f1540446-9b39-4f01-bda7-8de1c297e4fd rw rootflags=subvol=@ loglevel=3 single"
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
    options  "quiet splash bgrt_disable rd.luks.uuid=2f67acef-3619-458c-a190-1829017b6531 root=UUID=f1540446-9b39-4f01-bda7-8de1c297e4fd rw rootflags=subvol=@ loglevel=3 systemd.unified_cgroup_hierarchy=0 mitigations=auto fsck.mode=force fsck.repair=yes add_efi_memmap initrd=/EFI/Linux/amd-ucode.img"

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
