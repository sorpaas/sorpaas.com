---
title: "Remount Directory under Systemd"
layout: post
category: en
---

Recently I migrated my Linux into Btrfs, everything works fine until I installed docker. I got a wired _permission denied_ failure. It turns out that docker needs to execute some files under `/var/lib`, but the `/var/lib` directory is mounted with option `noexec`.

I once thought this should be a simple problem, and I can just add an `exec` option into `/etc/fstab` file and everything should work fine.

However, it is not, the problem is that my `/etc/fstab` file looks like this:
```
UUID=...	/var	btrfsrw,nosuid,nodev,noexec,relatime,space_cache,subvol=__active/var	0 0

UUID=...	/run/btrfs-root	btrfs	rw,nosuid,nodev,noexec,relatime,space_cache,subvol	0 0

/run/btrfs-root/__active/ROOT/var/lib	/var/lib	none	bind	0 0
```

The paritition on my Btrfs forces me to mount `/run/btrfs-root` first, which I wanted a `noexec` option, and then bind the right folder as `/var/lib`. The man page of `mount` indicates that I should first bind the folder, and then remount if I want different mount options.

But the `systemd-fstab-generator` disallows me to create two items with the same mount destination, so I ended up create a service file under `/usr/lib/systemd/system/remount-var-lib.service` with the content:
```
[Unit]
Description=Remount /var/lib
After=local-fs.target

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/bin/mount -o remount,nosuid,nodev /var/lib

[Install]
WantedBy=multi-user.target
```

After running `systemctl enable remount-var-lib` and rebooting, everything is back to normal.
