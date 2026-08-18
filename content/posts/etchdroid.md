---
date: 2026-08-18 19:30:00
type: blog
tags:
  - Android
  - 开源
  - 工具
  - Linux
title: Android 手机做启动盘，不用电脑
description: "EtchDroid：一个开源 Android 应用，不需要 root，把 Linux 系统镜像直接写入 U 盘，出门在外也能做启动盘。"
categories:
  - 🛠️ 工具推荐
image: https://bing.ee123.net/img/rand?seed=etchdroid
---

[**EtchDroid**](https://github.com/etchdroid/etchdroid)（⭐3.4k）

项目地址：<https://github.com/etchdroid/etchdroid>

上个月出差，笔记本突然进不去系统，手边只有一台 Android 手机和一根 OTG 线。想做个 Ubuntu 启动盘重装，但身边没有电脑——以前遇到这种情况只能干瞪眼。

EtchDroid 就是专治这个场景的：Android 手机上直接写 U 盘，不需要 root，不需要电脑。

## 支持什么

写盘工具最怕的就是"插上去不认"。EtchDroid 的兼容性写得很清楚：

**支持的设备：**
- USB 闪存盘 ✅
- USB SD 卡读卡器 ✅
- USB 硬盘/SSD ❌（为了避免误擦除，不支持）
- 内建 SD 卡槽 ❌

**支持的镜像类型：**
- Arch Linux、Ubuntu、Debian、Fedora、pop!_OS、Linux Mint、FreeBSD、BlissOS 等现代 Linux 发行版 ✅
- 树莓派 SD 卡镜像（需提前解压）✅
- Windows 官方 ISO ❌
- Apple DMG ❌
- 2010 年以前的老 Linux 镜像 ❌

日常常用的发行版基本全覆盖，踩坑最多的是 Windows——官方 ISO 格式特殊，EtchDroid 不处理，但社区有人做了改装版，不过作者提醒可能有病毒，慎用。

## 怎么用

流程很简单：插上 U 盘 → 打开 App → 选择镜像 → 选目标 U 盘 → 确认写入。没有复杂的参数，没有命令行，选完点一下就行。

后台用了 Android 的 Mass Storage 模式直接操作 U 盘，不需要 root——这是它和其他同类工具最大的区别。同类工具要么需要 root，要么只支持写入内部存储，不能做可启动盘。

## 哪下载

三种渠道，随便选：

- [Google Play](https://play.google.com/store/apps/details?id=eu.depau.etchdroid)（含遥测，帮助开发者排查兼容性问题）
- [F-Droid](https://f-droid.org/packages/eu.depau.etchdroid/)（无遥测，更干净）
- [GitHub Releases](https://github.com/EtchDroid/EtchDroid/releases)（APK 直下）

如果你不想分享数据，直接下 F-Droid 版或者 GitHub 版就行。

## 几点注意

- 写盘前会先校验镜像完整性，防止写到一半发现文件坏了
- 预览版支持写入到 DriveDroid 兼容的虚拟光驱镜像，不过目前还在实验阶段
- 项目 Kotlin 开发，GPL-3.0 协议，1,260 次提交，社区活跃度还行

那次出差之后，我就在手机里常备了一份 EtchDroid APK 和 Ubuntu ISO，跟充电宝放一起。万一哪天又翻车，至少不用再干瞪眼了。