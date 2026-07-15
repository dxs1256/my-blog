---
date: "2026-07-15"
type: blog
tags:
  - 开源
  - SSH
  - Cloudflare
  - 运维
title: "在浏览器里管理所有服务器"
description: "ternssh 是一个基于 Cloudflare Workers 的 SSH 工作台，支持拖拽仪表盘、Web 终端、SFTP 文件管理、状态监控，还内置 AI 命令助手。"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=ternssh-cloudflare-ssh-workbench"
---
[//]: # (notion-sync-id: ...)

我最近在折腾几台服务器，每次 SSH 登录来登录去，终端窗口开了一堆，管理起来有点烦。直到发现了 [**ternssh**](https://github.com/HaradaKashiwa/ternssh)（⭐159），一个基于 Cloudflare Workers 的 SSH 工作台——直接在浏览器里管理所有服务器，零客户端安装。

项目地址：https://github.com/HaradaKashiwa/ternssh

## 🔧 核心功能

ternssh 把服务器管理需要的几个核心能力都整合到了一个可拖拽的仪表盘里：

### 可拖拽仪表盘

自由排列服务器列表、终端、文件管理器、状态监控等组件，按自己的喜好打造专属工作区。不同组件可以拖拽调整位置和大小，布局会持久化保存。

### Web 终端

基于 xterm.js 的全功能 Web SSH 终端，支持多会话同时开启，终端主题也可以自定义。不用再开一大堆本地终端窗口了。

### SFTP 文件管理

在浏览器里直接浏览、编辑、上传远程服务器上的文件，内置 CodeMirror 6 代码编辑器，改配置、看日志都在一个界面里搞定。

### 实时状态监控

CPU、内存、磁盘、网络、进程状态一目了然，不用再一个个 SSH 进去敲 `top` 或 `htop` 了。

### 快捷命令与 AI 助手

可以保存常用命令一键执行，提升日常运维效率。更赞的是内置了 AI 命令助手——用自然语言描述你想做的事，它会帮你生成对应的 Shell 命令，降低操作门槛。

## 🏗️ 架构亮点

ternssh 的技术架构很有看点：

| 层级 | 技术 | 说明 |
|------|------|------|
| 前端 | React + Vite + Tailwind + CodeMirror | 静态资源，由 Workers 同域托管 |
| 后端 | Cloudflare Workers | REST API、路由、身份解析 |
| 实时连接 | Durable Objects | 每个 SSH 会话一个 DO 实例，WebSocket 长连接 |
| SSH 协议 | 自研 TypeScript 栈 | 握手、Shell、SFTP、远程命令执行 |
| 数据库 | Cloudflare D1 | 用户、服务器、布局、凭据、会话等 |

每个 SSH 会话都对应一个 Cloudflare Durable Objects 实例，通过 WebSocket 保持长连接，做到了真正的边缘计算 + 实时通信。

![ternssh 暗色主题预览](https://i.ibb.co/4ZV4DfZv/ternssh-dark.png)
*ternssh 暗色主题下的仪表盘界面*

![ternssh 亮色主题预览](https://i.ibb.co/3YQQFCXV/ternssh-light.png)
*ternssh 亮色主题下的仪表盘界面*

## 🚀 两种部署方式

### 方式一：Cloudflare Workers（推荐）

一键部署，自动部署到 Cloudflare Edge 全球节点，低延迟访问。支持 D1 数据库持久化，后续升级只需要合并上游变更，Workers Builds 会自动触发重新部署。

### 方式二：Docker 自托管

适合内网或私有化部署，一行命令搞定：

```bash
docker run -d \
  --name ternssh \
  -p 8787:8787 \
  -v ternssh-data:/app/.wrangler \
  --restart unless-stopped \
  ghcr.io/haradakashiwa/ternssh:latest
```

启动后访问 `http://localhost:8787` 即可。

## 🔐 鉴权模式

- **Basic Auth 模式**：首次访问完成 onboarding 设置登录凭据，适合 Docker 自托管
- **Cloudflare Access 模式**：边缘 JWT 校验，通过后共享同一套服务器数据，适合生产环境

## 🤔 适合谁用

- **运维 / SRE**：日常管理多台服务器，需要统一入口
- **开发者**：不想装一堆 SSH 客户端，浏览器就够
- **团队协作**：需要共享服务器管理面板的场景
- **自托管爱好者**：喜欢 Cloudflare 生态，想要边缘部署的低延迟

## 💡 总结

ternssh 把 SSH 管理搬到了浏览器里，加上 Cloudflare Edge 的全球加速、Durable Objects 的实时能力，以及 AI 命令助手的加持，体验确实不错。关键是它完全开源（GPL-3.0），可以自己部署，数据在自己手里。

如果你也受够了 SSH 客户端来回切换的日子，不妨试试这个基于 Cloudflare 的 SSH 工作台。