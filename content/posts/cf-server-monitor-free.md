---
date: "2026-06-17"
type: "Post"
tags:
  - "热门文章"
  - "监控"
  - "服务器"
  - "Cloudflare"
  - "Workers"
  - "D1"
  - "免费"
  - "工具"
title: "基于 Cloudflare Workers 的免费多服务器监控探针，零成本部署"
description: "CF-Server-Monitor 是基于 Cloudflare Workers + D1 的多服务器监控探针系统，零成本部署，支持 CPU/内存/磁盘/网络实时监控、历史图表、离线告警、地图展示。兼容 Linux、OpenWrt、Windows。"
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=cf-server-monitor-free"
---

[//]: # (notion-sync-id: 382874cb-3972-8175-ac0b-dc2065873e6c)

手头有几台 VPS 的站长应该都遇到过这个尴尬：想给机器加个监控，看看 CPU 是不是爆了、磁盘是不是满了，但为了看几台机器再去买一台监控服务器，总觉得不划算。用 Prometheus + Grafana 搭一套吧，功能确实强，但部署和维护成本对个人站长来说偏高了。

CF-Server-Monitor 提供了一个很取巧的方案——把整个监控控制端跑在 Cloudflare Workers 上，数据存 D1 数据库。Workers 的免费额度足够覆盖日常使用，D1 的读写消耗也控制得很低。你不需要买任何额外服务器，只要能访问 Cloudflare 就能用。

目前版本已经迭代到 v2.6.8，功能覆盖了实时监控、历史数据回看、延迟追踪、全球地图展示、离线告警，兼容 Linux、Alpine Linux、OpenWrt 和 Windows。

GitHub地址:[https://github.com/huilang-me/CF-Server-Monitor](https://github.com/huilang-me/CF-Server-Monitor)

演示地址:[https://tz.dashdeep.dpdns.org/](https://tz.dashdeep.dpdns.org/)

---

## 🎯 功能概览

监控覆盖面从基础的 CPU、内存、磁盘，到网络流量、进程数、连接数、负载均衡都有。具体来看几个核心能力：

### 📊 实时监控与历史回溯

每台被监控机器上报的数据实时刷新，Web 端查看各服务器的状态卡片。历史数据支持 1/3/6/12/24 小时查看，可以回溯定位问题是何时发生的。数据基于 D1 持久化存储，重启不会丢。

### 🌍 全球地图可视化

多台机器分布在不同地域时，地图模式可以直观展示各节点的状态和延迟。这个对于跨区域部署多台服务器的用户来说很有用，一眼看出哪条线路有问题。

### 🔔 离线告警

服务器宕机或失联时，支持 Telegram 和企业微信推送通知。平时不用一直盯着后台，机器出问题会自己找上门。

### ⚡ 实时推送

基于 Durable Objects + WebSocket 实现，探针上报数据后前端页面立即刷新，无轮询延迟。也就是说你打开监控页面，数据是实时推过来的，不是每隔几秒刷一次。

### 🌐 延迟追踪

国内电信、联通、移动、字节四个方向的延迟数据单独监测。如果你的服务器在国内有用户，这个功能比单纯的 ping 值更有参考价值——可以区分是哪家运营商的线路出了状况。

![监控面板](https://i.ibb.co/gLYbPwRZ/f7f581433d61.jpg)

## 🔧 部署流程

整个部署过程大概需要 10 分钟，前提是已经有 Cloudflare 和 GitHub 账号：

1. Fork 项目到自己的 GitHub 账号
1. 在 Cloudflare 控制台创建 D1 数据库，记下 Database ID
1. 配置 Cloudflare Workers，连上你的 GitHub 仓库部署
1. 设置环境变量（API_SECRET、数据库绑定等）
1. 在每台要监控的服务器上运行客户端脚本
部署方式支持两种：一是直接在 Cloudflare 控制台连接 GitHub 仓库一键部署，二是通过 GitHub Actions 自动化部署。推荐第二种，后续项目拉取更新更方便。

## 📈 客户端安装

被监控的机器上执行一键安装脚本即可。兼容主流 Linux 发行版、Alpine Linux、OpenWrt 以及 Windows。脚本会自动注册上报任务到 crontab 或 systemd timer，定时向 Cloudflare 端发送状态数据。

新版还增加了月流量统计功能，可以在后台设置流量重置日期（比如按自然月或者按你的账单周期），首页直接展示每个月的流量消耗。如果之前部署过低版本，升级后在后台手动点一下升级数据库就行。

## 🔐 安全设计

后台集成 Cloudflare Turnstile 人机验证保护 API 接口，登录用 JWT Token 认证并支持自定义密钥。另外可以设置特定服务器对未登录用户隐藏——如果某台机器不想公开暴露，可以单独隐藏掉。

## 💡 适合谁用

- 管理 3 台以上 VPS 的个人站长，不想为监控再买服务器
- 已有 Cloudflare 账号，熟悉 Workers 生态的技术用户
- 需要轻量监控方案，Prometheus 全家桶太重了
- 海外 + 国内多地域部署，需要跨区域统一监控面板
整体来看，CF-Server-Monitor 最适合的群体是「有一定技术基础但又不想花太多精力搭监控」的个人站长。部署门槛确实比 Uptime Kuma 这类单机监控高一点（需要 Cloudflare Workers 和 D1），但换来的是零成本和跨地域统一管理的能力，对于管理多台 VPS 的场景来说很划算。


