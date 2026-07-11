---
date: "2026-07-11"
type: blog
tags:
  - Docker
  - IPTV
  - 直播源
  - 自建服务
title: "Docker部署IPTV源"
description: "一行命令自建IPTV直播源，换台无卡顿，Potplayer直接播放。"
categories:
  - 教程
image: "https://bing.ee123.net/img/rand?seed=iptv-docker-deploy"
---
[//]: # (notion-sync-id: )

想自己搞个 IPTV 直播源，又不想折腾复杂的配置？有个现成的 Docker 镜像，一行命令搞定。

## 🚀 一键部署

```bash
docker run -d \
  --name iptvs-app \
  --restart unless-stopped \
  -p 5000:5000 \
  hurryos/iptvs-app:latest
```

跑完直接访问 `http://你的IP:5000` 就能看到后台。

第一次登录它会自动更新源并测试，等它自己跑完就行，不用手动干预——除非以后 API 失效了才需要重新部署。

## 🖥 不会用命令怎么办

去 [Docker Hub](https://hub.docker.com/) 搜索 **iptvs-app**，直接图形化拉取部署，不需要映射本地文件，一样简单。

## 📺 播放器配置

把下面的链接添加到播放器即可：

```
http://你的IP:5000/iptv
```

以 **Potplayer** 为例：右键 → 打开 → 打开链接 → 粘贴上面的地址，搞定。

![Potplayer播放效果](https://i.ibb.co/Kjz00KwW/99e2ae0bd28b.jpg)

## 💡 特点

- **换台无卡顿**，体验流畅
- **自动更新源**，部署后基本不用管
- **轻量级**，单容器搞定，资源占用低

自建 IPTV 源，就这么简单。