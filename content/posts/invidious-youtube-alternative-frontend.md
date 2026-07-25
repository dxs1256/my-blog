---
date: "2026-07-25"
type: blog
tags:
  - 开源项目
  - YouTube
  - 隐私保护
title: "替代 YouTube Premium 的开源前端"
description: "一个开源、轻量、无广告的 YouTube 替代前端，361 位志愿者共同维护"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=invidious-youtube-alternative-frontend"
---
[//]: # (notion-sync-id: ...)

最近有个老哥在 X 上发帖说他刚取消了 YouTube Premium，找到了一个完全免费的替代方案，试用后决定不回头了。我去看了一眼，确实是个好东西。

项目地址：https://github.com/iv-org/invidious

## 🎯 这是什么

**Invidious** 是一个开源的 YouTube 替代前端，由 361 位志愿者在 GitHub 上共同维护，目前已有 **20.7k Stars**。

它做的事情很简单：让你用 YouTube 的内容，但绕过 Google 的追踪、广告和臃肿的页面。

## 🔧 核心功能

### 无广告体验
所有的 YouTube 广告在 Invidious 上都不存在。不是过滤，而是压根就不加载广告模块。

### 后台播放
手机端支持音频后台播放，熄屏也能继续听——这是 YouTube Premium 的核心卖点之一。

### 无需登录
看视频不需要 Google 账号，也不会有任何追踪像素或 Cookie 跟着你。

### 极速加载
页面渲染不需要 JavaScript，加载速度以毫秒计。没有自动播放，没有算法推荐把你往坑里带。

### 订阅管理
可以订阅频道而不需要 Google 账号，支持新视频通知，还能一键导入 YouTube/NewPipe/FreeTube 的订阅数据。

## 🚀 怎么用

### 最简单的方式
直接访问公共实例列表 [instances.invidious.io](https://instances.invidious.io)，选一个用就行。几十个实例遍布全球，一个挂了换另一个。

### 搭配浏览器扩展
配合 **Privacy Redirect** 扩展，所有 YouTube 链接自动跳转到 Invidious，嵌入视频也会被替换，无感切换。

### 自部署
想完全掌控的话，在自己的 VPS 上部署，每月成本大概 5 美元。支持 Docker 一键部署：

```yaml
# docker-compose.yml
services:
  invidious:
    image: quay.io/invidious/invidious:latest
    ports:
      - "3000:3000"
    environment:
      INVIDIOUS_CONFIG: |
        domain: your-domain.com
```

## 📸 界面预览

![Invidious 播放器界面](https://i.ibb.co/39mwvRj4/99df2f5ada0e.png)

![偏好设置页面](https://i.ibb.co/tp7Vf0Hj/eef9e6f0a071.png)

![订阅管理](https://i.ibb.co/gL6k449Q/30ba61546eae.png)

## 💡 我的看法

YouTube Premium 一个月十几块，说贵不贵，但心里总有点不爽——你花钱买的是"不被追踪"和"没有广告"的基本权利，而不是增值服务。Invidious 把这两件事做到了，还做得更轻更快。

当然它也有局限：没有评论区推荐算法（对有些人来说是好事）、没有 YouTube Music 集成、部分功能依赖公共实例的稳定性。但日常刷视频、听背景音、追订阅频道，完全够用。

如果你对隐私有点在意，或者单纯不想每个月给 Google 交钱，这是一个值得花 5 分钟配置的方案。