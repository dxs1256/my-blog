---
date: "2026-05-06"
type: "Post"
tags:
  - "NAS"
  - "音乐"
  - "Docker"
  - "工具"
  - "热门文章"
title: "告别付费！NAS 部署 SqMusic，无损音乐免费下还能自动监听歌单"
description: "SqMusic 是一款适用于 NAS 的音乐下载工具，支持 FLAC、APE、MP3 等无损格式下载，下载后的歌曲可适配 Emby、Jellyfin 及 Navidrome 等媒体服务，支持文件标签识别与歌词下载。"
categories:
  - "教程"
image: "https://bing.ee123.net/img/rand?seed=nas-sqmusic-lossless-music-download"
---

[//]: # (notion-sync-id: 358874cb-3972-817a-9ae2-e1610aa35915)

SqMusic 是一款专为 NAS 用户打造的音乐下载神器，支持 FLAC、APE、MP3 等多种无损格式，下载后的歌曲目录结构可直接适配 Emby、Jellyfin 及 Navidrome 等主流媒体服务。

## 功能亮点

- 无损音质：支持 FLAC、APE、MP3 等格式下载
- 开箱即用：无需配置音乐源，直接搜索即可使用
- 媒体适配：下载目录结构适配 Emby、Jellyfin、Navidrome
- 标签识别：自动识别歌曲标签信息
- 歌词下载：支持自动下载歌词文件
- 在线播放：搜索结果可直接在线试听
## Docker Compose 部署

```yaml
services:
  sqmusic_main:
    image: registry.cn-hangzhou.aliyuncs.com/sqdockler/simple_sq_music_plus:latest
    container_name: sqmusic_main
    environment:
      - DB_IP=mysql
      - DB_PORT=3306
      - DB_NAME=sqmusicv3
      - DB_USERNAME=root
      - DB_PASSWORD=sqmusicv3password
    volumes:
      - ./music:/music
    depends_on:
      mysql:
        condition: service_healthy
    expose:
      - "8099"
    restart: always

  sqmusic_web:
    image: registry.cn-hangzhou.aliyuncs.com/sqdockler/simple_sq_music_plus_web:latest
    container_name: sqmusic_web
    ports:
      - "8096:80"
    depends_on:
      - sqmusic_main
    restart: always

  mysql:
    image: mysql:5.7
    container_name: sqmusic_mysql
    environment:
      MYSQL_ROOT_PASSWORD: sqmusicv3password
      MYSQL_DATABASE: sqmusicv3
    volumes:
      - ./mysql_data:/var/lib/mysql
    ports:
      - "3306:3306"
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: always
```

## 参数说明

- DB_IP：数据库地址（容器内使用服务名）
- DB_PORT：数据库端口，默认 3306
- DB_NAME：数据库名称
- DB_USERNAME：数据库用户名
- DB_PASSWORD：数据库密码
- ./music：音乐文件存储目录
- 8096 端口：Web 前端访问端口
## 使用方法

1. 浏览器访问 http://NAS的IP:8096
1. 使用默认账号密码登录：admin/admin
1. 选择音乐来源，搜索想听的音乐
1. 选择音质，点击下载即可
---

> 💡 建议登录后立即修改默认密码，并在设置中配置下载路径等参数。

---

> 本文内容整理自微信公众号「NASBox」，感谢原作者分享。


