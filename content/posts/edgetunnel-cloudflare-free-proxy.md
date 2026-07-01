---
date: "2026-05-24"
type: "Post"
tags:
  - "代理"
  - "Cloudflare"
  - "免费资源"
  - "开源工具"
  - "翻墙"
title: "用 Cloudflare + 一个域名搭建永久免费节点，告别付费机场"
description: "edgetunnel 基于 Cloudflare Workers/Pages 搭建永久免费代理节点，无需服务器零成本部署，适合需要稳定翻墙的个人用户。"
categories:
  - "教程"
image: "https://bing.ee123.net/img/rand?seed=edgetunnel-cloudflare-free-proxy"
---

[//]: # (notion-sync-id: 36a874cb-3972-8126-84f6-f093e45eefb4)

每次看到月底又要续费机场的时候，是不是觉得钱包在滴血？一个月几十块，一年下来大几百，关键是高峰期该卡还是卡。

最近发现了一个叫 edgetunnel 的开源项目，把我给看傻了。你只需要一个 Cloudflare 账号和一个域名（域名一年才几块钱），就能拥有自己的无限节点、永久免费的代理网络。

项目链接：[https://github.com/cmliu/edgetunnel](https://github.com/cmliu/edgetunnel)

---

## 🚀 核心功能

这个项目到底能干什么？简单说就是利用 Cloudflare 自家的 CDN 通道，帮你搭建一个全局代理网络：

- 无限节点，永久免费，不存在月底续费
- 油管 4K 随便拉，Netflix 刷剧不卡顿
- ChatGPT 直接丝滑访问
- 走 Cloudflare 自家 CDN 通道，全球节点随便挑
- 稳定性比某些付费机场还强
![edgetunnel 项目截图](https://external-content.duckduckgo.com/iu/?u=https://pbs.twimg.com/media/HJEz7aKboAE3Wwb.jpg?name=orig)

## 🔧 上手步骤

部署难度对小白也算友好，跟着教程一步步走，十分钟搞定：

### 1. 准备材料

一个 Cloudflare 账号 + 一个域名（几块钱注册一个就行）。

### 2. 部署工具

从 GitHub 仓库获取 edgetunnel 项目，按照说明完成配置。

### 3. 体验效果

可以先访问 Demo 演示站点看看效果，再决定是否动手。

- 演示站点：[https://edt-pages.github.io/admin/](https://edt-pages.github.io/admin/)
- 保姆级图文教程：[https://cdn.blog.cmliussss.com/p/edt2/](https://cdn.blog.cmliussss.com/p/edt2/)
## 💡 使用感受

我自己上手试了一下，确实比想象中简单。关键是稳定性出乎意料，毕竟走的是 Cloudflare 的基础设施，比自己瞎折腾靠谱多了。

还在花冤枉钱买机场的兄弟，真的可以试试这个方案。一次配置，永久免费，省下的钱够吃好几顿火锅了。

---

如果你也在为代理网络发愁，不妨花十分钟试试 edgetunnel。


