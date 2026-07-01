---
date: "2026-05-06"
type: "Post"
tags:
  - "开源项目"
  - "Telegram"
  - "必看精选"
title: "Telegram收藏夹变无限容量网盘：Telegram-Drive工具详解"
description: "介绍Telegram-Drive这款开源跨平台桌面应用，将Telegram账号变成标准的无限容量云存储网盘，通过利用收藏夹和私有频道实现文件管理功能。"
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=telegram-drive-unlimited-cloud-storage"
---

[//]: # (notion-sync-id: 358874cb-3972-8102-b195-d08cd1f29a0f)

Telegram 收藏夹当网盘用，但原生界面没有分类、没有搜索，文件一多就找不到。Telegram-Drive 就是来解决这个问题的。

项目地址：https://github.com/caamer20/Telegram-Drive

---

## 问题背景

平时很多人喜欢把 Telegram 的收藏夹当成免费的无限容量网盘来屯资源，但 TG 原生的聊天界面拿来做文件管理简直是灾难，没有分类，如果想找个旧文件找到天荒地老。

## 解决方案

GitHub 上有个叫 Telegram-Drive 的开源跨平台桌面应用，直接把你的 TG 账号变成了一个标准的无限容量云存储网盘。

## 核心原理

它巧妙地把 TG 的收藏夹 和用户创建的私有频道 (Channels) 当作网盘的文件夹 来处理，为你提供一个直观的文件管理器界面；同时所有 API 密钥和数据仅保留在本地，绝不经过任何第三方服务器，主打一个安全白婪。

## 核心功能

### 无限云存储

依托 Telegram 慷憎的云基础设施实现无限量文件存储，不依赖第三方服务器，敏感数据全在本地。

### 直接媒体流播放

支持直接在软件内流式播放视频和音频文件，看片听歌完全无需将文件下载到本地。

### 高性能文件展示

采用虚拟滚动技术构建了高性能网格视图，即便文件夹内包含数千个文件也能瞬间加载和处理。

### 直观交互与管理

就像使用常规网盘一样，支持便捷的拖拽上传与文件夹分类，并提供图像及媒体文件的内联缩略图在线预览。

### 跨平台与自动更新

提供适用于 macOS（包括 Intel 和 ARM 架构）、Windows 以及 Linux 的原生应用程序，并支持无缝的自动更新。

## 使用前提

### 前置准备 (API 获取)

你必须拥有一个 Telegram 账号，并且需要自行前往 my.telegram.org 申请获取 API ID 和 Hash 密钥才能登录使用。

### 源码编译环境

如果要开发或从源码运行该项目，本地需要准备 Node.js (v18 或以上版本) 以及最新稳定版的 Rust 环境。

## 合规与风控警告

开发者特别声明，该应用与 Telegram 官方 (Telegram FZ-LLC) 没有任何隶属关系。利用 TG 做大容量网盘属于薏羊毛行为，用户务必遵守 Telegram 的服务条款负责任地使用，防止账号被风控。

## 项目状态

项目目前以 MIT 协议免费开源，由 caamer20 发起，当前有两位贡献者参与开发，在 GitHub 上拥有 125 个 Star 和 14 个 Fork，处于持续更新状态。

```python
print("Hello World")

# 正确的Python代码块格式
import requests
import json

def api_call(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        return {"error": str(e)}

# 调用示例
result = api_call("https://api.example.com/data")
print(result)
```

```bash
#!/bin/bash

# 正确的Bash代码块格式
echo "开始检查..."

if command -v docker &> /dev/null; then
    echo "✅ Docker已安装"
else
    echo "❌ Docker未安装"
fi

echo "检查完成"
```

```javascript
// 正确的JavaScript代码块格式
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

// 使用示例
fetchData('https://api.example.com/data')
    .then(data => console.log(data));
```


