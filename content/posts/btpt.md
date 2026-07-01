---
date: "2026-06-04"
type: "Post"
tags:
  - "Prowlarr"
  - "BT/PT"
  - "种子搜索"
  - "开源工具"
title: "BT/PT 种子站聚合索引器，一个接口搜遍全网"
description: "Prowlarr、把所有搜索站集中到一块：玩 PT 的人都知道这种痛苦——手上一堆种子站，每次找资源得一个个站去搜，比来比去烦得很。 Prowlarr 就是干这个的。它把你收藏的几十个磁力搜索站、PT "
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=btpt"
---

[//]: # (notion-sync-id: 375874cb-3972-817e-8e37-f070b2ad9403)

玩 PT 的人都知道这种痛苦——手上一堆种子站，每次找资源得一个个站去搜，比来比去烦得很。

**Prowlarr** 就是干这个的。它把你收藏的几十个磁力搜索站、PT 站点全部聚合在一起，提供一个统一的搜索接口和 API。

🔗 **官网**：[https://prowlarr.com](https://prowlarr.com/)

---

## 🎯 它能做什么

Prowlarr 是一款开源的 BT/PT 种子站聚合索引器。核心功能就一个——**把所有搜索站集中到一块**。

你只需要配置一次，之后搜什么东西都不用再一个一个站去翻了。搜出来的结果按来源站点、做种数、大小等信息排列，一目了然。

## ⚡ 核心特性

- **统一搜索**：一个搜索框搜遍所有已配置的索引器
- **API 集成**：支持 Sonarr、Radarr、Lidarr 等自动化工具无缝对接
- **自动同步**：新增的索引器会自动同步到关联的 *arr 应用
- **多站管理**：同时管理公开磁力搜索站和私有 PT 站点
- **健康检查**：自动检测索引器是否可用并报告状态
## 🔧 部署方式

Prowlarr 支持多种部署方式，最方便的是 Docker：

```yaml
version: '3'
services:
  prowlarr:
    image: lscr.io/linuxserver/prowlarr:latest
    container_name: prowlarr
    ports:
      - 9696:9696
    volumes:
      - ./prowlarr:/config
    restart: unless-stopped
```

也可以直接下载二进制文件运行，或者部署在群晖/Unraid 等 NAS 系统上。

## 💡 搭配什么用

Prowlarr 通常是自动化下载管线的**入口层**：

```yaml
Prowlarr(搜) → Sonarr(剧)/Radarr(电影) → 下载器(qB/TR) → 媒体库(Emby/Plex)
```

这套组合拳下来，找资源、下资源、整理入库全自动，追剧基本不用动手。

如果你是 PT 玩家或者经常用磁力找资源，Prowlarr 可以省下大量重复操作的时间。


