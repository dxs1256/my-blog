---
date: "2026-08-15"
type: blog
tags:
  - 工具推荐
  - AI
  - 开源
title: "给 Agent 一个链接，视频自动下好"
description: "video-catcher：一个开源视频下载 Skill，支持 23 个平台，自动 fallback 链路，你的 Agent 从此能自己下视频了。"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=gei-agent-yi-ge-lian-jie-shi-pin-zi-dong-xia-hao"
---
[//]: # (notion-sync-id: ...)

我最近在捣鼓本地 Agent（Codex、Claude Code 这些）的时候，发现一个很烦的问题：让 Agent 帮忙下个视频，它要么报错，要么装一堆工具，要么问我一堆"这个平台用什么工具""Cookie 在哪里""要不要换浏览器"。

本来就是想省事的，结果更麻烦。

后来翻到了 [**video-catcher**](https://github.com/Weikezi-AI/video-catcher)，一个专门给 Agent 用的视频下载 Skill，上面的问题一次性全解决了。

项目地址：https://github.com/Weikezi-AI/video-catcher

## 🎯 这项目解决了什么

给 Agent 下视频，痛点就两个。

**第一，平台太多，每个都要单独适配。** YouTube 用 yt-dlp，B 站又要换一套，抖音要过签名验证，X 要处理反爬。Agent 要么一个一个装工具，要么自己写一堆解析代码。

**第二，失败了不知道怎么救。** 下载了一半断了，Agent 不会续传。清晰度不对，Agent 不会换。遇到 DRM 保护的视频，Agent 直接报错。

video-catcher 的解法是：把整个下载链路封装成一个 Skill，Agent 一句命令就能跑完整流程。

## 🔧 核心能力

### 平台覆盖

优先用 yt-dlp 解析，覆盖了 YouTube、Bilibili、Vimeo、X、TikTok、抖音、Instagram、Facebook 等主流平台。网页里的 `<video>` 标签、m3u8 流、DASH MPD 流，全都支持。

### 下载功能

- **多清晰度**：360p / 720p / 1080p / 2K / 4K / best 任选
- **精确画质**：指定 1080p 就真的下 1080p，没有就报错，不会偷偷降到 720p
- **音视频合并**：自动处理 video-only / audio-only 轨道，FFmpeg 合并
- **字幕和封面**：一行命令带字幕和缩略图一起下
- **批量下载**：传一组链接，全部跑一遍
- **播放列表**：支持 YouTube 播放列表批量下载
- **断点续传**：直链用 `.part` + HTTP Range，yt-dlp 自带 continue

### DRM 检测

它区分 `protected / clear / unknown / not-checked` 四种状态。遇到受保护的流，它会告诉你，不会瞎试。

## 🚀 最值钱的地方：自动 fallback 链

video-catcher 最聪明的设计就是它的自动降级链路：

```
URL
 ↓
显式媒体直链 → HTTP Range 下载
 ↓
yt-dlp 常规解析
 ↓失败 → YouTube PO Token 恢复路线
 ↓失败 → 浏览器/TLS 指纹模拟
 ↓失败 → 网页媒体发现
 ↓失败 → 浏览器嗅探（Playwright 监听网络请求）
 ↓
音视频下载/合并 → ffprobe 验证 → 报告
```

每一条路走不通，自动换下一条。Agent 完全不需要管这些细节，把 URL 丢给它就行。

## 📦 安装使用

安装三步走：

```bash
pip install -U -r requirements.txt
python -m playwright install chromium
# 确认 ffmpeg 在 PATH 里
ffmpeg -version
```

跑一下环境检查：

```bash
python scripts/doctor.py
```

看到 `autonomous-ready=true` 就齐活了。

### 下载一个视频

```bash
python scripts/video_catcher.py download "URL"
```

### 看看有哪些清晰度

```bash
python scripts/video_catcher.py formats "URL"
```

### 精确下载 1080p

```bash
python scripts/video_catcher.py download "URL" --quality 1080p --quality-mode exact
```

## 🧠 Agent 应该怎么用

对于普通用户请求"帮我下载这个视频"，Agent 直接执行 `download` 命令就行。不要在第一条路线失败后立刻问用户"要不要换浏览器""要不要导 Cookie"——脚本自己会走 fallback 链。

如果用户先问"这个视频有哪些清晰度"，先跑 `formats`，用户说"下 1080p"之后，再拿同一 URL 跑 `download --quality 1080p --quality-mode exact`。

## 写在最后

视频下载这摊事，以前是人工复制粘贴链接、打开各种工具、手动选清晰度。

现在一句话告诉 Agent，剩下的它自己搞定。

分工明确，Agent 负责跑腿，你负责喊一声。