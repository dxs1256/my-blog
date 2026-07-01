---
date: "2026-05-06"
type: "Post"
tags:
  - "Docker"
  - "音乐"
  - "下载"
  - "热门文章"
title: "NAS上听音乐没有资源？TuneScout帮你自动同步热门歌单"
description: "TuneScout 是一款强大的本地音乐库管理工具，支持自动同步热门歌单、榜单，解决多平台音乐版权分散问题，配合 Navidrome 打造私人音乐库。"
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=tunescout-nas-music-sync"
---

[//]: # (notion-sync-id: 358874cb-3972-81f4-a106-c3f15fc76fc9)

小伙伴们有没有一种困扰：想听某首歌，A应用没有版权，B应用有版权但需要会员，或者下载后发现不是常规音乐格式？今天这些问题全部解决！

项目地址 https://github.com/yuwancumian2009/TuneScout-v2

---

资源问题交给 TuneScout，格式问题交给转换工具，让 NAS 成为你的私人音乐库。

## 🎵 TuneScout 是什么

TuneScout 是一个强大的、一体化的本地音乐库管理与自动化工具，它是 Navidrome 服务器的最佳伴侣。

- 现代化 Web 界面，操作简单直观
- 音乐下载、元数据刮削、自动整理
- 歌单同步、榜单同步、后台任务管理
- 让音乐库始终保持井井有条
## ⚡ 核心功能

### 搜索下载

- 直接搜索歌曲名称即可下载
- 下载完成后自动刷新歌曲库
### 歌单/榜单同步

- 自动扫描缺失内容进行下载补全
- 支持热门歌单、榜单同步
- 同步过程需要耐心等待
## 🚀 安装部署

使用 docker-compose 方式部署。

> ⚠️ 特别注意：config.json 和 library_cache.db 需要手动创建空白文件！

```yaml
version: '3'
services:
  tunescout:
    image: yuwancumian2009/tunescout-v2:latest
    container_name: tunescout
    environment:
      - TZ=Asia/Shanghai            # 设置时区，确保定时任务准确
      - WEB_USERNAME=admin          # Web界面登录用户名 (可选, 默认 admin)
      - WEB_PASSWORD=nasqdz666      # Web界面登录密码 (设置后自动开启认证)
      - PUID=1000                   # (可选) 设置运行用户ID
      - PGID=1000                   # (可选) 设置运行组ID
      - ND_DB_PATH=/navidrome_data/navidrome.db
      - ND_MUSIC_PREFIX=/music
    volumes:
      - ./config.json:/app/config.json                 # 配置文件存储路径
      - ./library_cache.db:/app/library_cache.db       # 数据库文件持久化
      - ./music:/music                 # 本地音乐库目录
      - ./download:/download           # 临时下载目录
      - /vol1/1000/docker/navidrome:/navidrome_data    # 映射navidrome数据库
    ports:
      - "8503:8503"
    restart: unless-stopped
```

## 📋 使用说明

### 搜索下载

- 直接搜索歌曲名称，即可下载
- 下载完成以后刷新歌曲库
### 歌单/榜单同步

- 自动扫描缺失的内容进行下载补全（过程较长，需耐心等待）
## 📝 总结

- 再也不用在不同平台之间来回切换找歌了
- 配合 Navidrome、Daulyu 等播放器使用效果更佳
- NAS 直接变成私人音乐库，想听什么就有什么
- 随时随地流畅播放，告别会员限制
---



