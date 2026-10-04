---
date: "2026-10-04"
type: blog
tags:
  - 开源
  - VPS
  - Linux
  - Windows
  - 服务器
title: "VPS 换系统，跑个脚本就完事"
description: "13.5k Star 的一键 DD/重装脚本：20+ Linux 发行版、Windows 官方原版 ISO 通吃，256MB 内存小鸡也能跑，还自带救砖机制"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=vps-reinstall-one-command"
---

给 VPS 换系统，往往是既麻烦又容易翻车的事。商家控制面板一般只给几个固定模板，想换个发行版得先发工单；想装 Windows 更折腾，引导、驱动、IP 配置哪一环不对都白忙；最怕的是 SSH 崩了、系统起不来，只能扒着商家后台的 VNC 一帧一帧手动救。每次重装，最花时间的其实不是下载安装，而是装完以后手动配网络、装驱动这些脏活。

GitHub 上有个 13.5k Star 的开源项目 **reinstall**（截至 2026 年 10 月），作者 bin456789 用它把整套流程收成了一条命令。

项目地址：https://github.com/bin456789/reinstall

## 一个脚本五种玩法

reinstall 是一键 DD/重装脚本，GPL-3.0 协议，900+ 次提交打磨（截至 2026 年 10 月）。所谓 DD，就是把现成镜像直接写进硬盘的老操作，只是过去要手动下载、解压、写盘，这个脚本把它自动化了：下载、分区、写引导、装系统、配置网络全程不需要人盯着。

它能做的事分五类。第一类是一键装 Linux，覆盖 20 多种发行版；第二类是一键 DD Raw 镜像，把别人封装好的系统整个写进硬盘；第三类是重启进 Alpine Live OS 内存系统，留一个临时环境手动备份、改分区；第四类是重启到 netboot.xyz 引导菜单，用 VNC 手动装冷门系统；第五类是一键装 Windows 官方原版 ISO。前两类主打自动，后两类主打不删数据——手动模式改完重启就回原系统。

## 换 Linux：发行版名就是参数

想装什么系统，命令参数就是它的名字，一行一个：

```bash
bash reinstall.sh debian 12
bash reinstall.sh ubuntu 24.04
bash reinstall.sh alpine 3.24
bash reinstall.sh fnos 1
```

不填版本号就装最新版，脚本会提示设置用户名密码，不填默认 root 加随机密码。发行版清单覆盖很广：Debian、Ubuntu、Alpine、Kali、Arch、Gentoo、CentOS、Rocky、AlmaLinux、Fedora、openSUSE、NixOS，还有国产的飞牛 OS（装完走 http://IP:5666 的网页面板）。想顺手改 SSH 端口、塞公钥、指定用户名，加参数就行：

```bash
bash reinstall.sh debian 12 --username myuser --ssh-port 2222 --ssh-key 'ssh-ed25519 AAAA...'
```

作者在 README 里特别提到，这套脚本专门适配低配小鸡——Alpine 只需要 256MB 内存加 1GB 硬盘就能跑，比官方网络安装的要求低不少。

## 装 Windows：官方原版 ISO，云驱动自动装

VPS 装 Windows 最怕两件事：镜像不干净、驱动缺失。作者的处理方式是只用官方原版 ISO，云厂商驱动按需自动装：

```bash
bash reinstall.sh windows --image-name "Windows 11 Enterprise LTSC 2024" --lang zh-cn
```

ISO 会从专门的官方镜像索引站自动查找，不用自己翻 ed2k 链接；Windows 11 的硬件限制自动绕过；VirtIO、XEN、AWS ENA、GCP gVNIC、Azure MANA、Intel VMD 这些公有云驱动按需自动下载安装。一个 ISO 里通常含家庭版、专业版等多个版本，用 `--image-name` 指定，README 里给了用 DISM++ 查映像名的方法——装之前查一下要装的版本名，比填错重来省事。

![用 DISM++ 查看 ISO 里包含哪些系统版本](https://i.ibb.co/GvmjPthf/e3c3985f398d.png)

装的过程不是盲等，重启后会进入官方 Windows 安装界面，跟本地装系统的体验差不多，商家 VNC 里就能看到：

![VPS 上自动进入 Windows 官方安装界面](https://i.ibb.co/6kBC7Jt/993898a0fa7c.png)

## 值钱的地方在网络和救砖细节

大多数重装脚本容易翻车的场景，作者在 README 里都专门处理过：

- 纯 IPv6、/32、/128 掩码、网关不在子网内、IPv4 和 IPv6 分属不同网卡——这类网络怪胎都能自动配置
- 安装进度可以通过 SSH、HTTP 80 端口、商家 VNC 或串行控制台查看
- 安装中途出错，能 SSH 连上去手动救砖，甚至一条命令转 Alpine 先抢救数据
- 误运行了脚本？只要还没重启，跑 `bash reinstall.sh reset` 就能取消
- 全程用分区表 ID 识别硬盘，多盘服务器也不会写错目标盘

手动模式里还有个 netboot.xyz 入口，引导进一个图形菜单，可以手动安装更多系统版本：

![netboot.xyz 引导菜单，手动装更多系统](https://i.ibb.co/Ldt74v2q/0b381fd29264.jpg)

## 动手前先看清代价

上面这些能力都来自项目 README 的介绍，实际效果以你机器上的表现为准。有几条代价是明确的，动手前必须知道：

- 一键重装会清空整块硬盘，所有分区和数据不留；手滑了只有在重启前跑 `reset` 才来得及
- 不支持 OpenVZ/LXC 这类共享内核容器，那类机器得换别的工具（作者推荐 OsMutation）
- 装完是裸系统，为了速度不会自动更新，记得装完自己跑 `apt update && apt upgrade`
- 想改 SSH 端口或密钥登录，`/etc/ssh/sshd_config.d/` 里的配置也要一起改，只动主配置可能不生效

## 什么人不适合用

如果 VPS 是商家面板开箱即用、你也没打算折腾，那没必要碰它；有重要数据又没有备份习惯的人，千万别拿生产机试；512MB 以下内存还想装 Windows 的小鸡，ISO 模式可能跑不动。另外提醒一句：脚本通过 curl 下载后执行，稳妥起见可先下载到本地打开看一眼再运行——毕竟是会清盘的家伙，多花十秒确认不亏。

之前介绍过的 LetRecovery（2.1k Star，截至 2026 年 10 月）和它是两个路线：那个工具面向家用电脑，在 Windows 桌面点几下完成重装；reinstall 面向服务器，在 SSH 里一行命令换系统，还能 Linux 和 Windows 任意方向互装。一个家用，一个站长，按场景选。

## 我的判断

这个脚本最值钱的地方不是命令短，而是把装系统里最容易翻车的部分——网络怎么配、驱动装哪些、引导怎么写——全部自动判断，你只需要决定装什么。经常折腾服务器的人，手里的重复劳动能被它省掉一大半。真要上手，先在测试机上跑一遍、确认网络和引导都正常，再考虑上生产机器。

本文由 AI 辅助撰写
最后验证：2026-10-04