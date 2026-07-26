---
date: "2026-07-25"
type: blog
tags:
  - 开源项目
  - Windows
  - 系统优化
title: "Windows 后台清理神器"
description: "开源免费、离线可用，一键清理 Windows 冗余服务和预装软件"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=optimizerduck-windows-optimization-tool"
---
[//]: # (notion-sync-id: ...)

Windows 开机后后台跑着 200 多个服务，大半不认识，不知道在干嘛。吃内存、占 CPU、还往外面传数据。有人受不了，写了款免费工具，就是 [**optimizerDuck**](https://github.com/itsfatduck/optimizerDuck)（⭐7.5k），试用后确实好用。

项目地址：https://github.com/itsfatduck/optimizerDuck

## 🎯 这是干什么的

optimizerDuck 是一款开源的 Windows 10/11 优化工具，能把预装软件（bloatware）、后台服务、遥测、隐私设置一锅端。全部离线可用，不需要联网。

## 🔧 核心功能

### 35+ 项系统优化
覆盖性能、隐私、GPU、电源、预装软件和用户体验六大类，每项都有风险标签和说明。

### 200+ 服务管理
每个 Windows 服务都标了风险等级——Safe、Moderate、Risky，告诉你关了会有什么影响。

### 预装软件清理
列出所有可卸载的 AppX 包，带风险标签，删之前能预览，不怕误删。

### GPU 专项优化
AMD、NVIDIA、Intel 三家都有独立注册表优化项，涵盖电源状态、时钟门控和显示延迟。

### 内置工具集
- **系统仪表盘**：一眼看 CPU、内存、GPU、硬盘
- **启动项管理**：开关开机自启的软件
- **计划任务管理**：浏览、启停 Windows 计划任务
- **磁盘清理**：清缓存、临时文件、更新残留
- **一键回滚**：每条改动自动生成回滚文件，支持单条或全部还原

## 🛡️ 安全设计

改之前强制创建系统还原点，每条改动写入本地回滚文件。没有安装器、没有广告、没有遥测、没有付费版。GPL v3 开源。

## 💡 我的看法

同类工具不少，但 optimizerDuck 赢在"安全透明"——每条改动告诉你风险等级，每个操作都能一键还原。适合想给 Windows 瘦身但又怕把系统搞崩的人。下载即用，不需要安装，U 盘带着走也行。

![optimizerDuck 界面预览](https://i.ibb.co/HLRvws11/b433a4d3158d.png)