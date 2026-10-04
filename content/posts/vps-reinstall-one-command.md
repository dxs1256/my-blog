---
date: "2026-10-04"
type: blog
tags:
  - 开源
  - VPS
  - Linux
  - Windows
  - 服务器
title: "VPS 换系统，一条命令的事"
description: "13.5k Star 的一键 DD/重装脚本：20+ Linux 发行版、Windows 官方原版 ISO 通吃，256MB 内存小鸡也能跑，还自带救砖机制"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=vps-reinstall-one-command"
---

玩 VPS 的人都有过这种时刻：买了个便宜小鸡，商家只给 CentOS 和 Ubuntu 两个模板，想要 Debian 得先发工单；想装个 Windows 挂个程序，折腾半天引导失败；最惨的是 SSH 崩了、系统起不来，只能等商家后台 VNC 手动救。

我前阵子收了一台搬瓦工（北京时间凌晨 2 点的特价款），默认系统不满意，想着干脆重装。面板里点了一圈，重装要排工单、还要自己记 IP 配置，烦得我直接放弃。后来在 V2EX 看到有人提 **reinstall**（⭐13.5k），一个脚本把上面所有问题解决了。

项目地址：https://github.com/bin456789/reinstall

## 🎯 这是什么

一句话：**下载一个小脚本，跑一行命令，VPS 自动重装成你想要的系统。**

"DD"这个词你可能听过——它是"直接往硬盘写入镜像"的简称。早期 DD 都是手动下载镜像、解压、写盘一步步来，reinstall 把这套流程自动化了：下载、分区、写引导、装系统、配置网络全包，中间不用你盯着。

作者写了 900 多次提交打磨出来的脚本，核心就仨原则：

- **全程从官方/镜像源实时拉取资源**，不掺任何自制包，杜绝魔改系统
- **用分区表 ID 识别硬盘**，多盘服务器也不会写错目标盘
- **低配鸡照常服务**，专门适配 256MB 内存的小鸡

五个玩法，覆盖日常所有场景：

| 功能 | 干什么 | 典型场景 |
|------|--------|---------|
| 一键装 Linux | 20+ 发行版，一个参数一个版本 | 换 Debian/Ubuntu/Alpine |
| 一键 DD Raw 镜像 | 把现成镜像整个写进硬盘 | 用别人封装好的系统 |
| 重启 Alpine Live OS | 进内存系统手动操作 | 备份/改分区/救砖 |
| 重启 netboot.xyz | 引导进网络安装菜单 | VNC 手动装冷门系统 |
| 一键装 Windows | 官方原版 ISO | VPS 跑 Windows 挂机 |

## 💻 Linux：一行一个发行版

支持的数量是同类脚本里最全的：Debian、Ubuntu、Alpine、Kali、Arch、Gentoo、CentOS、Rocky、AlmaLinux、Fedora、openSUSE、NixOS、Anolis、openEuler、OpenCloudOS、RHEL，甚至国产的飞牛 OS 都在列表里。

```bash
bash reinstall.sh debian 12          # 装 Debian 12
bash reinstall.sh ubuntu 24.04       # 装 Ubuntu 24.04
bash reinstall.sh alpine 3.24        # 装 Alpine 3.24
bash reinstall.sh fnos 1             # 装飞牛 OS，装完后台 http://IP:5666
```

不填版本号就装最新版，会提示输入用户名密码（不填就用 root + 随机密码）。几个常用的可选参数：

```bash
bash reinstall.sh debian 12 \
    --username myuser \              # 设置用户名
    --password 'mypass' \            # 设置密码
    --ssh-port 2222 \                # 顺手改 SSH 端口
    --ssh-key 'ssh-ed25519 AAAA...'  # 或直接塞公钥
```

## 🪟 Windows：官方原版，驱动不用愁

VPS 装 Windows 最怕两件事：镜像带后门、驱动装不上。reinstall 的处理方式是——**用官方原版 ISO，云厂商驱动自动装**。

想装 Windows 11 LTSC 2024 中文版？一行：

```bash
bash reinstall.sh windows \
    --image-name "Windows 11 Enterprise LTSC 2024" \
    --lang zh-cn
```

脚本会从专门的镜像索引站自动找官方 ISO，不用手动翻 ed2k 链接。如果镜像包含多个版本（家庭版/专业版/LTSC……），用 `--image-name` 指定映像名，不知道准不准就随便填，重启后看报错再改——README 里给了 DISM++ 查映像名的方法。

![用 DISM++ 查看 ISO 里包含哪些系统版本](https://i.ibb.co/GvmjPthf/e3c3985f398d.png)

装完不怕没网、没显卡、硬盘不识别——VirtIO、XEN、AWS ENA、GCP gVNIC、Azure MANA、Intel VMD 这些公有云驱动会**按需自动下载安装**，Windows 11 的硬件限制也会自动绕过。整个安装过程有官方安装界面可看，跟本地装系统体验差不多：

![VPS 上自动进入 Windows 官方安装界面](https://i.ibb.co/6kBC7Jt/993898a0fa7c.png)

## 🔥 几个"只有用过才知道"的细节

**纯 IPv6 小鸡直接支持。** 很多脚本遇到只有 IPv6、或者网关不在子网范围内的机器就翻车，reinstall 专门处理了这些网络怪胎，`/32`、`/128` 都能自动配置。

**装系统不再是盲等。** 重启后可以 SSH 连进去、浏览器开 80 端口、或者用商家 VNC 看安装日志，跟 tty 直播一样。装到一半出问题，还能 SSH 手动救砖，甚至一条命令转 Alpine 把数据救出来。

**误运行了能反悔。** 重启前跑 `bash reinstall.sh reset` 直接取消，不用慌。

**手动模式不删数据。** "重启到 Alpine Live OS"和"netboot.xyz"这两个功能不会自动重装，只是给一个内存环境让你手动备份、改分区、装冷门系统，改完重启就回原系统。

![netboot.xyz 引导菜单，手动装更多系统](https://i.ibb.co/Ldt74v2q/0b381fd29264.jpg)

## ⚠️ 动手前必须知道的

- **会清空整块硬盘。** 所有数据包括其他分区都没了，动手前先备份。手滑了？重启前跑 `reset` 还来得及
- **OpenVZ/LXC 虚拟化不支持。** 这种共享内核的容器没法跑，得用专门的 OsMutation
- **装完不自动更新。** 为了速度快，新系统是"裸装"，记得自己 `apt update && apt upgrade`
- **改 SSH 配置要注意。** 重装后要改端口或密钥登录，记得连 `/etc/ssh/sshd_config.d/` 里的文件一起改，只改主配置可能不生效

之前写过一篇不用 U 盘重装系统的 **LetRecovery**（⭐1.1k），有人可能觉得重复了——其实完全两个赛道：LetRecovery 是给你**家里台式机**在 Windows 桌面点几下装新系统；reinstall 是给**服务器/VPS** 在 SSH 里一行命令换系统，还能 Linux↔Windows 任意方向互相装。一个面向家庭用户，一个面向站长，按需选。

## 💬 我的判断

它不是又一个装机工具——**真正值钱的是把脏活包圆了**：网络怎么配、驱动装哪些、引导怎么写，这些全是脚本自动判断的，你不用懂 IP 子网也不用管 VirtIO 是什么。对我这种有四五台小鸡、隔三差五想折腾的人，这脚本就是省命工具。

如果你也有 VPS，想换系统又不想发工单、不想手动跟引导死磕，下载下来跑一行就行。GitHub 上 13.5k Star 和 900 多次提交，就是这脚本靠谱度最好的证明。