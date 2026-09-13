---
date: "2026-09-13"
type: blog
tags:
  - 开源
  - 工具
  - 下载
title: "六种下载协议，一个应用全搞定"
description: "Ghost-Downloader-3：HTTP/磁链/BT/M3U8/DASH/eD2k 多协议合一的跨平台下载管理器，内置视频嗅探"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=ghost-downloader-3"
---

追剧要在 B 站找资源，下电影离不开 BT 种子，GitHub 镜像加速是日常刚需，M3U8 直播源还得另起一个工具——我的桌面曾经堆着四五个下载器。更烦人的是：浏览器下载动不动 403，迅雷对磁链限速，IDM 又不认 HLS 流，每换一种协议就像换一套工具链。

后来在 GitHub 上看到 **Ghost-Downloader-3**（⭐8.6k），项目自我定位写着「The only downloader you need」。它把 HTTP、磁链/BT、FTP、M3U8、MPEG-DASH、eD2k 全收进同一个 GUI，再叠加 YouTube/Bilibili/GitHub/HuggingFace 专用解析器，一个应用抵掉五款工具。

项目地址：https://github.com/XiaoYouChR/Ghost-Downloader-3

## 🎯 这是什么

Ghost-Downloader-3 是基于 PySide6 的跨平台下载管理器，作者 XiaoYouChR。最早是为了帮 B 站 UP 主搬运资源，现在已迭代到支持 Windows、macOS、Linux、Android 四大平台，覆盖 x86_64 与 arm64 双架构。三个关键词：多协议合一、视频嗅探、原生跨平台。

![Ghost-Downloader-3 主界面](https://i.ibb.co/S4TYD0xg/22923a533ec7.png)

## ✅ 核心功能

### 智能分块：免合并、跑满带宽

它抛弃了传统「下载完再合并文件」的思路，边下边写、自动探测带宽余量。分块大小根据实时网速动态调整——小文件不过度切片浪费连接，大块也不拖慢并发效率。配合 `wreq` 这个支持真实浏览器 TLS 指纹的 HTTP 客户端，反爬虫站点也能顺利拿到资源。

![智能分块与下载任务界面](https://i.ibb.co/yFVB3yMS/be0919f046e2.png)

### 协议全家桶：HTTP/磁链(BT)/FTP/M3U8/DASH/eD2k

底层集成了 libtorrent（BT 引擎）、N_m3u8DL-RE（HLS 下载）、goed2k（eD2k 守护进程）、yt-dlp（视频站解析）。一个 GUI 内既能拖 HTTP 链接，也能塞磁力链接、`.torrent` 文件、eD2k 链接、直播 M3U8，以及 YouTube/Bilibili 视频页 URL。

### 视频嗅探：页面上看到就能下载

借鉴 cat-catch 浏览器扩展的思路，它提供悬浮下载按钮与页面媒体浮窗——打开任意视频页，悬浮窗列出页内所有媒体资源并支持选清晰度；点击下载后桌面端接管，登录态也跟着带过去，省去「复制链接—粘贴—解析」三连。

![视频嗅探悬浮下载演示](https://i.ibb.co/RTywtzFy/01af4dd09945.png)

### 任务可干预：aria2 兼容 RPC

下到一半想换 URL、改 Header、换代理？支持中途修改，已下载的分块不丢进度。还兼容 aria2 的 RPC 协议，现成的 aria2 前端（比如 AriaNg）可以直接接管它的任务队列。

## ⚙️ 技术亮点

技术栈上，它用 PySide6 + PyQt-Fluent-Widgets 搭出 Fluent 设计风格界面；网络层用 `wreq` 做 TLS 指纹伪装、`uvloop`（Linux）或 `winloop`（Windows）替换 asyncio 事件循环；视频解析交给 yt-dlp 与 N_m3u8DL-RE；包体积控制靠 Nuitka 编译而非 PyInstaller，FFmpeg 负责音视频转码。

性能层面项目没有公布固定数字，但官方文档点出两个关键能力：真实浏览器 TLS 指纹（绕过 Cloudflare/Akamai 等反爬）和带宽自适应分块。生态上，Arch Linux AUR 已有 `ghost-downloader-bin` 社区包，插件系统 Feature Packs 已在运转、API 正在稳定中。

![下载进度与任务管理](https://i.ibb.co/yFCGJXsV/40b38d4f01d1.png)

## 📊 和主流下载器怎么选

| 工具 | 协议覆盖 | 视频嗅探 | 跨平台 | 中途改链接 |
|------|---------|---------|--------|-----------|
| Ghost-Downloader-3 | HTTP/BT/M3U8/DASH/FTP/eD2k 全覆盖 | 内置浮窗+扩展 | Win/macOS/Linux/Android | 支持 |
| IDM (Windows) | HTTP/FTP/MMS | 浏览器插件 | 仅 Windows | 不支持 |
| 迅雷 | HTTP/BT/磁链 | 无 | Win/macOS/Android | 不支持 |
| aria2 (命令行) | 几乎全 | 无 | 全平台 | 支持 |

相比 IDM，它多了 BT、eD2k、M3U8；相比迅雷，少了会员加速但也没限速；相比裸 aria2，省掉命令行还能做视频嗅探。

## 🚀 快速上手

去 Releases 页面下载对应平台安装包（Windows 10+、macOS 13+、Android 11+、Linux glibc 2.35+）：

```bash
# Linux 用户可走 AUR
yay -S ghost-downloader-bin
```

装完浏览器嗅探扩展（GitHub Release 同目录有 .crx/.zip），打开任意视频页就能测试悬浮下载按钮。进阶玩法：接入 aria2 RPC 配合 AriaNg 做远程任务管理，或安装 Feature Packs 插件扩展站点解析器。

注意：Qt 6.6+ 已放弃对无 AVX 指令集 CPU 的支持，老机器要先确认 CPU 是否带 AVX。

![软件信息与设置界面](https://i.ibb.co/5Wx6rpJ8/82c72b4c01ea.png)

## 🎯 我的看法

Ghost-Downloader-3 的核心价值很直白：一个应用吃掉六种下载场景。它的差异化在于把多协议支持、视频嗅探、跨平台、任务可干预四件事同时做透，而不是只做其中一项。和仓库里之前介绍过的 ReClip（自托管网页版）、YTSage（YouTube 专用 CLI）、better-douyin（抖音专用）都不冲突——那几个是"专才"，这个是覆盖桌面全场景的"通才"。

如果你受够了桌面堆满下载器、浏览器下载总 403、Linux 下找不到顺手的 GUI 工具，可以给它一个机会——至少多协议合一这一点，能让你卸载掉一半的下载器。
