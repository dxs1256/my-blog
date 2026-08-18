---
date: 2026-08-18 19:45:00
type: blog
tags:
  - Android
  - 开源
  - 工具
  - Linux
title: Android 手机做启动盘，不用电脑
description: "EtchDroid：一个开源 Android 应用，不需要 root，把 Linux 系统镜像直接写入 U 盘，出门在外也能做启动盘。"
categories:
  - 工具推荐
image: https://bing.ee123.net/img/rand?seed=etchdroid
---

去年有次出差，笔记本蓝屏彻底起不来了，手边只有一台 Android 手机和一根 OTG 线。当时想的是：要是手机能直接写 U 盘就好了。

翻了一圈，找到了 [**EtchDroid**](https://github.com/etchdroid/etchdroid)（⭐3.4k），一个在 Android 上把系统镜像写入 U 盘的开源工具，不需要 root，不需要第二台电脑。

项目地址：<https://github.com/etchdroid/etchdroid>

## 原理

Android 手机写 U 盘最大的障碍是权限——普通 App 没有裸设备写入权限，必须 root。EtchDroid 绕开的方式是走 Mass Storage 模式：U 盘通过 OTG 插入后，系统识别为可移除存储，EtchDroid 通过 Android 的 Storage Access Framework 拿到写入权限，以块设备级别直接写入。

这也是为什么它有明确的设备限制——绕过 USB 硬盘和 SSD。这些设备在 Android 上通常被挂载为内部存储，写错了就是一锅端。

## 上手

操作流程三步：

1. 插 U 盘（需要 OTG 线，Type-C 直插的 U 盘也行）
2. 打开 App，点"Write raw image or ISO"
3. 选镜像文件，确认目标 U 盘，点开始

![选择写入模式](https://i.ibb.co/XxVzNs4F/0020c8b9326a.png)

写入过程在后台跑，通知栏显示进度。一个 4GB 左右的 Ubuntu ISO 大约 14 分钟写完。写完后自动校验，确保数据没损坏。

v2.0 新增了一个很实用的功能：写入中途失败（比如 U 盘松了）会提示你重新插拔继续，不用从头再来。

## 设备兼容性

支持的设备就两类：USB 闪存盘和 USB SD 读卡器。

![选择 U 盘](https://i.ibb.co/nNcNBST0/2918e2bea6d7.png)

明确不支持的是：
- USB 硬盘/SSD
- USB Hub 和 Dock
- 内建 SD 卡槽
- 雷电接口设备

不是技术做不到，是作者故意限制——避免误操作把重要数据清掉。

镜像方面，常见的 Linux 发行版都支持：Ubuntu、Debian、Fedora、Arch、Linux Mint、pop!_OS、FreeBSD，树莓派镜像也行（需提前解压）。Windows 官方 ISO 不支持，微软的镜像格式比较特殊。

## 哪下载

三个渠道，看需求选：

| 渠道 | 遥测 | 更新速度 | 签名 |
|------|------|---------|------|
| Google Play | 有，可关 | 最快 | 官方 |
| GitHub Releases | 有，可关 | 次之 | 官方 |
| F-Droid | 无 | 慢几天 | 社区 |

遥测只收集镜像文件名和 USB 设备 ID，用来排查兼容性问题，不涉及个人身份信息。不放心的话下 F-Droid 版就行。

![写入进度](https://i.ibb.co/HpT6Lt5M/920cd18388ba.png)

## 几个实测细节

- 写 4GB 镜像大约 14 分钟，取决于 U 盘写入速度
- 写完后建议用电脑校验一下——我遇到过一次写完插到电脑上不识别，重新拔插一次就好了
- U 盘格式会被覆盖，写之前确认 U 盘上没有重要数据
- 至少需要 Android 5.0
- 需要开启通知权限，不然看不到写入进度

![写入完成](https://i.ibb.co/FbwkYSHP/bbf2f1574a2a.png)

那次出差之后，我养成了一个习惯：手机里固定存一份 Ubuntu ISO 和 EtchDroid 的 APK，跟充电宝放一起。万一哪天又翻车，至少不用再干瞪眼了。

![校验完成](https://i.ibb.co/CpNjHcpN/1f7781efd3ac.png)