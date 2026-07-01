---
date: "2026-05-06"
type: "Post"
tags:
  - "工具推荐"
  - "Docker"
  - " 开源"
  - "媒体播放"
  - "自托管"
title: "Webtor：一行Docker命令搭建私有磁力链在线播放平台"
description: "Webtor 是 webtor.io 的开源自托管版本，一行 Docker 命令即可搭建磁力链在线播放平台，支持浏览器直接串流播放视频音频、自动识别影视资源、打包下载和 Stremio 集成，是家庭影院和影视资源管理的轻量级方案。"
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=build-bt-magnet-online-player"
---

[//]: # (notion-sync-id: 358874cb-3972-81ac-b95e-e02c1a966880)

最近在折腾家庭影院方案时，发现了一个特别好用的开源项目——Webtor。简单来说，它能让你直接在浏览器里播放磁力链接和种子文件里的视频，不用下载、不用转码、不用折腾播放器。一行Docker命令就能跑起来，体验相当丝滑。

项目地址：https://github.com/webtor-io/self-hosted

---

## Webtor 是什么

Webtor 是 [webtor.io](https://webtor.io) 的开源自托管版本，用一个 Docker 镜像把整套服务打包好了。它本质上是一个 **磁力链在线播放器**——你扔一个磁力链接进去，它就能直接在浏览器里串流播放视频和音频，边下边播，无需等待。

项目目前在 GitHub 上有 **568 Star**，采用 MIT 协议，活跃更新中。

---

## 核心功能

### 即时串流播放

选择种子里的任意视频或音频文件，点击即可在浏览器内直接播放。支持的格式相当全面：

| Header | Header | 
| --- | --- | 
> _(表格内容通过子行渲染)_

不需要下载到本地，不需要转码，浏览器原生就能播。遇到 MKV 这种浏览器不直接支持的格式，Webtor 会自动处理。

### 直接下载链接（DDL）

不想在线看？可以选中种子里的任意单个文件，生成直接下载链接，用浏览器或下载工具拉取。

### 打包下载

支持把整个种子打包成 ZIP 一键下载，保留原始目录结构。不需要额外装 qBittorrent 之类的客户端。

### 个人媒体库

可以创建账号，把种子添加到自己的媒体库里。系统会自动识别电影和剧集，按系列归类整理，像一个私有的影视资源管理器。

### Stremio 集成

个人媒体库可以直接对接 Stremio——装上 Webtor 提供的 addon，就能在电视上通过 Stremio 播放你自建的影视库。搭配电视大屏体验很棒。

### 开发者 SDK

项目还提供了 [JavaScript SDK](https://github.com/webtor-io/embed-sdk-js)，可以在自己的网站里嵌入磁力链在线播放功能，让用户直接在你的平台上看种子视频。

---

## 快速部署

部署过程极其简单，只需要 Docker 环境：

### 基础启动

```bash
docker run -d \
  -p 8080:8080 \
  -v data:/data \
  -v pgdata:/pgdata \
  --name webtor \
  --restart=always \
  ghcr.io/webtor-io/self-hosted:latest
```

启动后访问 `http://localhost:8080` 就能用了。整个镜像包含了 Web 应用、内嵌 PostgreSQL 数据库和 BitTorrent 引擎，开箱即用。

### 自定义域名

如果部署在服务器上需要通过域名访问，设置 `DOMAIN` 环境变量：

```bash
docker run -d \
  -e DOMAIN=https://webtor.example.com \
  -p 8080:8080 \
  -v data:/data \
  -v pgdata:/pgdata \
  --name webtor \
  --restart=always \
  ghcr.io/webtor-io/self-hosted:latest
```

### 自定义端口

```bash
docker run -d \
  -e DOMAIN=http://localhost:8085 \
  -p 8085:8080 \
  -v data:/data \
  -v pgdata:/pgdata \
  --name webtor \
  --restart=always \
  ghcr.io/webtor-io/self-hosted:latest
```

---

## 进阶配置

### 自动清理

Webtor 内置了自动清理机制，磁盘空间不足时会自动清理旧数据。可以通过环境变量调整：

| Header | Header | Header | 
| --- | --- | --- | 
> _(表格内容通过子行渲染)_

两个变量都支持百分比和具体数值（如 `10G`、`500M`）。

### 数据库配置

| Header | Header | Header | 
| --- | --- | --- | 
> _(表格内容通过子行渲染)_

默认使用内嵌 PostgreSQL，也可以连接外部数据库：

---

## 适用场景

- **家庭影院**：把 NAS 或迷你主机变成私有串流服务器，电视/手机/电脑都能看
- **影视资源管理**：自动识别电影和剧集，按系列归类，告别手动整理文件夹
- **临时预览**：收到磁力链想快速看看内容质量，不用下载完整文件
- **团队共享**：部署在服务器上，团队成员都能访问同一个媒体库
- **嵌入式播放**：通过 SDK 在自己的网站里提供磁力链在线播放能力
---

## 和同类工具对比

| Header | Header | Header | Header | Header | 
| --- | --- | --- | --- | --- | 
> _(表格内容通过子行渲染)_

Webtor 的核心优势在于**把下载和播放合二为一**。不需要先用 BT 客户端下载，再用播放器打开，整个流程在一个界面里完成。

---

## 写在最后

Webtor 解决了一个很实际的痛点：拿到磁力链接想在线看，以前要么等下载完，要么折腾各种转码方案。现在一行 Docker 命令搞定，浏览器直接播，体验接近在线视频网站。

对于有 NAS 或闲置服务器的用户来说，这是一个非常值得尝试的项目。部署成本几乎为零，但能显著提升影视资源的使用效率。

项目采用 MIT 协议开源，欢迎 Star 和 PR。



