---
date: "2026-05-22"
type: "Post"
tags:
  - "Motrix"
  - "下载工具"
  - " 开源"
  - "Rust"
  - "Tauri"
  - "跨平台"
title: "用 Rust 重写的轻量级跨平台下载工具"
description: "介绍 Motrix Next：用 Rust + Tauri 2 重写的跨平台下载工具，安装包体积从 80MB 降至 20MB（减少75%）。保持全平台支持（Windows/macOS/Linux）、多协议（HTTP/BT/磁力）、智能功能（自动分类、剪贴板监控、浏览器扩展）。适合追求轻量高效的用户。"
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=motrix-next-rust-based-lightweight-downloader"
---

[//]: # (notion-sync-id: 368874cb-3972-81d7-9a29-cf7dbcb2e270)

## 💡 下载工具也需要 "瘦身"？

你有没有这种体验：电脑里装了几个下载工具，个个占几十 GB 空间，启动还要等半天？特别是那些基于 Electron 的应用，虽然跨平台方便，但"自带浏览器"的代价就是体积臃肿、启动迟缓。

Motrix 原本是我很喜欢的下载工具——干净、无广告、全平台。可惜项目停在 2023 年，Electron 带来的体积问题也一直没解决。

直到我注意到 Motrix Next 的出现：**体积减少 75%，从 80MB 降到 20MB，底层用 Rust 重写**。这让我很好奇，它到底是怎么做到的？

## 🔗 项目地址

GitHub：[https://github.com/agalwood/Motrix](https://github.com/agalwood/Motrix)

## ⚙️ 技术架构大换血

Motrix Next 放弃 Electron，全面转向 **Tauri 2** 框架，这是最核心的变革。

| Header | Header | Header | 
| --- | --- | --- | 
> _(表格内容通过子行渲染)_

**为什么 Rust + Tauri 能做到这么小？**

Electron 把整个 Chromium 浏览器内核打包进应用，占了大头。Tauri 复用系统自带的 WebView，只保留 Rust 编写的核心逻辑，安装包自然轻量不少。

实际体验上，在 MacBook 上点击图标到界面弹出，等待时间缩短明显。那种"秒开"的感觉，比 Electron 应用确实舒服很多。

## 🧬 功能保持完整

虽然底层换了，但 Motrix Next 的下载能力一点没打折：

### 协议支持全面

- HTTP / HTTPS
- FTP
- BitTorrent（BT）
- 磁力链接
- 迅雷专用链（thunder://）
日常遇到的下载链接，基本都能搞定。

### 六大平台全覆盖

Motrix Next 做了静态编译，支持：

- **macOS**：Apple Silicon + Intel
- **Windows**：x64 + ARM64
- **Linux**：x64 + ARM64
无论你用什么系统和架构，都能找到对应的安装包。

### 实用细节优化

- **Tracker 自动同步**：内置社区源，自动更新 BT Tracker 列表，避免速度掉线
- **文件自动分类**：下载的视频、文档、压缩包等自动归类，不用手动整理
- **剪贴板智能监控**：复制磁力链接或下载地址，软件自动弹窗新建任务，省去 3 步操作
- **浏览器扩展**：配合官方扩展，可拦截 Chrome/Edge 的下载请求并转发给 Motrix Next，支持 Cookie 转发
- **自动关机**：挂机下载完成后自动关机，省电省心
## 🚀 快速上手

### Windows 用户

直接访问 GitHub Releases 页面，下载对应架构（x64 或 ARM64）的安装包，运行安装程序即可。

### macOS 用户（推荐 Homebrew）

```bash
brew tap AnInsomniac/motrix-next
brew install --cask motrix-next
```

也可以下载 `.tar.gz` 包，手动拖到 Applications 文件夹。

### 基础使用

1. 打开 Motrix Next
1. 点击左侧 "+" 按钮
1. 粘贴下载链接，开始下载
批量下载：换行输入多个链接，一次性添加。

## 🔧 后记

Motrix Next 让我看到 Electron 应用"瘦身"的另一种可能性：**Rust + Tauri + Vue 3** 的组合，既保持了跨平台能力，又大幅削减了体积开销。

如果你是 Motrix 老用户，或者正在找一个干净、全能、轻量的下载工具，Motrix Next 值得试试。项目目前 Star 数已破 5K，社区活跃度不错，值得长期关注。

**一句话总结**：用 Rust 重写底层、Tauri 替换 Electron，Motrix Next 把跨平台全能下载这个老命题重新做了一遍——更小、更快、功能不减。


