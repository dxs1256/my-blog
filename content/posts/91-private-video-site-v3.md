---
date: "2026-06-02"
type: "Post"
tags:
  - "热门文章"
  - " 开源"
  - "视频站"
  - "自托管"
  - "网盘"
  - "91"
  - "私有部署"
title: "个人私有视频站搭建方案，多网盘聚合 + 零带宽播放 + 自动Teaser"
description: "GitHub、给自己和家人用的自托管方案：想自己搭个视频站，把 115、PikPak、OneDrive、Google Drive 上的视频统一管理？91 是一个面向个人私有部署的开源视频聚合站，Go 后"
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=91-private-video-site-v3"
---

[//]: # (notion-sync-id: 373874cb-3972-8175-9119-e31fc49326a7)

想自己搭个视频站，把 115、PikPak、OneDrive、Google Drive 上的视频统一管理？**91** 是一个面向个人私有部署的开源视频聚合站，Go 后端 + Vite 前端，2C2G 服务器就能跑。

🔗 **GitHub**：[https://github.com/nianzhibai/91](https://github.com/nianzhibai/91)

---

## 🎯 项目定位与架构

91 不是公开视频平台，而是**给自己和家人用的自托管方案**。后端用 Go 实现，前端基于 Vite + Vue，所有数据存在本地 SQLite 里。

后端核心模块：

```plain text
cmd/server/main.go          入口
internal/
  config/                   YAML 配置
  catalog/                  SQLite 元数据
  drives/                   网盘统一抽象层
  scanner/                  扫目录 → 落库
  preview/                  ffmpeg 抽封面 + 生成 teaser
  proxy/                    直链代理播放
  auth/                     管理员 session
  api/                      REST 路由
```

每个网盘都实现统一的 `Drive` 接口，上层不需要关心底层差异。

## ⚡ 网盘支持详解

目前支持 7 种存储后端，每种授权方式不同：

| Header | Header | Header | 
| --- | --- | --- | 
> _(表格内容通过子行渲染)_

**PikPak 速度说明：** 默认走 `web_content_link` 单连接约 2.8-3 MiB/s。把 `disable_media_link` 设为 `false` 后会使用 CDN 节点（`medias[].link.url`），实测可到 8.9 MiB/s。

**Google Drive 特殊处理：** 下载地址必须携带 `Authorization` 头，浏览器不能直接 302 使用，所以走后端 `/p/stream` 代理播放，不加入零带宽白名单。

**OneDrive 免配置：** 通过 OpenList 在线 API 刷新 token，不需要配置 Azure 应用的 `client_id`/`client_secret`，后台只需要填 refresh_token。

## 🔧 部署方式

### 一键脚本

```bash
curl -fsSL https://raw.githubusercontent.com/nianzhibai/91/main/install.sh | bash
```

### Docker Compose

```bash
curl -fsSL https://raw.githubusercontent.com/nianzhibai/91/main/docker-compose.yml -o docker-compose.yml
docker compose pull
docker compose up -d
```

### 数据目录

| Header | Header | 
| --- | --- | 
> _(表格内容通过子行渲染)_

首次启动会自动生成 `config.yaml` 和数据库，默认监听 `127.0.0.1:9192`，首次访问登录页要求设置管理员用户名和密码。

![首页截图](https://i.ibb.co/B2c0x1t5/e6408fbb5a37.png)

## 🎬 Teaser 自动预览

这是 91 的核心体验——不用点进播放页就能预览视频内容。

扫描器发现新视频后，会丢进 worker 队列，用 ffmpeg 自动处理：

```plain text
ffmpeg -ss <起点> -headers "UA/Cookie/Referer" -i <直链> \
       -t 3 -an -vf scale=480:-2 -c:v libx264 -preset veryfast -crf 28 \
       -movflags +faststart -y <local>.mp4
```

- 每段固定 3 秒
- 30 秒以下最多 3 段，30 秒及以上固定 4 段
- 长视频在 20% 到 80% 区间均匀取段
- 封面和 teaser 只保存在本地 `data/previews/`，不回写网盘
前端卡片统一指向 `/p/preview/<videoID>`，后端读取本地文件响应。

## 🔍 视频去重机制

项目有三层去重：

1. **同网盘内去重**：按 `(drive_id, file_id)` 形成稳定 ID，重复扫描只更新同一行
1. **扫盘时去重**：优先用 `content_hash`，没有 hash 时退化为 `file_name + size_bytes`
1. **跨网盘指纹去重**：后台 worker 异步读取视频少量 Range 片段生成 `sampled_sha256`，按 `size_bytes + sampled_sha256` 只展示最早入库的 canonical 视频
跨网盘去重适合识别同一个视频文件被复制到 115、PikPak、OneDrive 等不同网盘的情况。不会删除任何网盘文件，只清理本地重复的封面和 teaser。

## 🏷️ 标签与文件名解析

扫描器自动解析文件名提取标题和作者：

```plain text
[前缀] 标题 - 作者.mp4
[前缀] 标题.mp4
标题 - 作者.mp4
标题.mp4
```

标签来自三类规则：

- 文件名、作者、目录名命中系统标签或已有标签
- 符合条件的目录名自动创建 `collection` 合集标签
- 番号类噪声归并到 `AV` 标签
当前内置系统标签：后入、奶子、口交、臀、人妻、女大、AV。解析结果可在管理后台手动覆盖，标记为人工标签后不会被自动扫描覆盖。

## 🖥️ 前端功能

- **双主题**：黑黄经典主题 / 粉白清新主题，一键切换
- **短视频模式**：抖音风格竖屏沉浸刷片
- **搜索**：热门标签 + 搜索框快速定位
- **管理后台**：`/admin/drives` 新增编辑网盘、`/admin/videos` 筛选编辑视频、`/admin/tags` 管理标签
- **视频隐藏**：播放页可标记"不再展示"，隐藏后的视频不出现在首页、搜索和相关推荐中
![播放页截图](https://i.ibb.co/Rwbb5vB/82a2c53b85fc.png)

## 📋 更多文档

| Header | Header | 
| --- | --- | 
> _(表格内容通过子行渲染)_

---

**注意事项：** 本项目面向个人私有部署，请仅接入你有权访问和管理的内容，遵守对应网盘的服务条款及当地法律法规。不对外传播，仅限个人使用。


