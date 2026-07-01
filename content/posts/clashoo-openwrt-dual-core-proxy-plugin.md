---
date: "2026-06-07"
type: "Post"
tags:
  - "必看精选"
  - "OpenWrt"
  - "代理"
  - "翻墙"
  - "软路由"
title: "OpenWrt 软路由代理管理插件，双内核一键切换"
description: "针对 OpenWrt 系统的 Clashoo 代理管理插件，同时集成 clash/Mihomo 和 Sing-box 双内核，支持一键切换、可视化配置，适合在软路由上管理翻墙代理的玩家。"
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=clashoo-openwrt-dual-core-proxy-plugin"
---

[//]: # (notion-sync-id: 378874cb-3972-8131-aba6-f5f355a6d6b2)

玩软路由的朋友应该都有体会——代理管理插件往往是一个让人头疼的环节。要么只支持单内核，切来切去要手动停启用；要么配置复杂，对着 YAML 文件 debug 半天。

**GitHub：**[https://github.com/kenzok8/openwrt-clashoo](https://github.com/kenzok8/openwrt-clashoo)

---

## 💡 什么是 Clashoo

Clashoo 是一个面向 OpenWrt 系统的 LuCI 代理管理插件，核心亮点是同时集成了 clash/Mihomo 和 Sing-box 两套代理内核，并支持在 Web 界面里一键切换，不用再 SSH 上去折腾了。

![](https://i.ibb.co/WpxHypRR/7a15dc7257b7.jpg)

## 🎯 双内核意味着什么

现在代理方案主要分两派：

- **clash/Mihomo** — 生态成熟，规则配置灵活，社区资源丰富，适合大多数用户
- **Sing-box** — 新一代全能代理框架，性能更轻量，支持协议更全面
以前如果想在两个方案间切换，得分别安装不同的插件，配置两套东西。Clashoo 把两者整合到一个界面里，想用哪个就在后台点一下，不用重装、不用改配置。

## 🚀 实际用下来的感受

- 安装很简单，用 OpenWrt 的 opkg 或者直接从源码编译都能装上，试下来一次成功
- Web 界面做得挺清爽，基本操作都不需要碰命令行
- 内核切换速度很快，几秒钟的事情，不会断流太久
- 每个内核的配置独立保存，切来切去不会串
对于有多条线路、或者喜欢折腾不同代理方案的人来说，减少了大量重复劳动。

## 👥 适合谁

- 软路由玩家，不想多装几个插件来回切换的
- 想从 clash 迁移到 Sing-box，但还想保留 clash 当备用的
- 给别人维护路由器，希望界面统一、操作简单的
---

## 📝 写在最后

Clashoo 的定位很明确——它不是一个从头造轮子的代理方案，而是把两个主流内核整合到一个管理界面里，让 OpenWrt 用户少操点心。对于已经在用软路由、想把代理管理做得更清爽的人来说，值得一试。


