---
date: "2026-08-05"
type: blog
tags:
  - "工具"
  - "Cloudflare"
  - "开源"
title: "手机管 Cloudflare，告别复制 API Token"
description: "Orange Cloud：原生 iOS/Android 客户端，OAuth 一键登录，DNS/Workers/R2 全功能，源码开源可自编译解锁全部 Pro 功能"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=orange-cloud-blog"
---

你有没有过这样的经历？

出门在外，手机突然收到网站告警。你想查一下 DNS 记录、清个缓存、或者看一眼 Workers 日志——但 Cloudflare 官方没给手机做适配。你只能打开浏览器，登录网页后台，在 6 寸小屏幕上跟桌面端界面较劲，左捏右 zoom，手指戳半天才能点到一个小按钮。

**Orange Cloud** 就是来终结这种痛苦的。

项目地址：https://github.com/chen2he/orange-cloud

## 🍊 这是什么

Orange Cloud 是一款 **Cloudflare 第三方原生客户端**，支持 iPhone、iPad、Apple Watch 和 Android。它用 Swift + SwiftUI 从零构建（Android 版是 Kotlin + Jetpack Compose），不是套壳网页，而是真正的原生 App——丝滑动画、即时响应、深度系统集成。

目前 GitHub 上已收获 425+ Stars，2026 年 6 月创建，App Store 已上架，许可证为 AGPL-3.0 + Commons Clause。

## 🔑 最大亮点：不用再复制 Token

用过 Cloudflare API 的人都知道，第三方工具通常需要你登录后台 → 创建 API Token → 复制 → 粘贴到 App 里。Token 万一泄露了还麻烦。

Orange Cloud 换了个路子：直接走 Cloudflare 官方的 **OAuth 2.0 + PKCE 登录流程**。

就像你用微信登录某个 App 一样——点击授权，跳转到 Cloudflare 官方页面，选权限范围，确认，搞定。Token 只存在系统钥匙串（Keychain）里，不会暴露给其他 App。支持多个 Cloudflare 账号同时登录，一键切换，需要更多权限时重新授权即可。

**不需要复制粘贴任何东西，安全又省心。** 这是它和其他 Cloudflare 客户端最大的区别。

![Orange Cloud 仪表盘概览页](https://i.ibb.co/cSqszngq/505acef2e56a.jpg)

## 🛠️ 核心功能一览

**域名与 DNS 管理**——域名列表、DNS 记录增删改查、缓存规则、负载均衡、批量重定向、按 URL 清理缓存、全球流量地图、一键开关代理（小黄云）。操作体验是原生 iOS 风格，滑动、长按、左划删除，一切符合直觉。

**流量分析**——基于 Cloudflare 的 GraphQL Analytics API，用 Swift Charts 原生绘制图表。免费用户可看 24 小时数据，Pro 用户可看 7 天和 30 天趋势。比网页版更直观，也更流畅。

![流量分析原生图表](https://i.ibb.co/F4mkG2sB/eeb65191dab3.jpg)

**Workers 开发者平台**——在手机上直接查看 Workers 脚本详情，甚至创建和部署新资源。实时日志流类似命令行 `wrangler tail`，直接在手机上通过 WebSocket 推送到锁屏和灵动岛。你走着路，瞟一眼灵动岛就知道 Worker 有没有报错。

![Workers 实时日志与灵动岛](https://i.ibb.co/bjxWn3RK/0d79395c2ddd.jpg)

**存储与 AI**——R2 存储桶原生挂载到 iOS「文件」App，像浏览本地文件一样浏览云端对象；D1 数据库可直接在手机上跑 SQL 查询；KV 键值存储管理也一应俱全。

**安全与 Zero Trust**——WAF 自定义规则编辑器、SSL 配置、Transform Rules、IP 访问规则、Zero Trust 设置、Cloudflare 隧道状态，安全功能一个不少。

**Apple Watch 支持**——抬腕就能看到域名列表和 24 小时请求量，还支持表盘 Complication。虽然不是刚需，但帅就是了。

**系统深度集成**——主屏小组件、锁屏小组件、控制中心控件、Siri 捷径、Spotlight 搜索索引、后台 Token 静默刷新、iPad 双栏布局。这些细节加起来，就是原生 App 和套壳网页之间质的差距。

## 🤖 Android 版也已就位

Android 用户不用眼红。Orange Cloud 的 Android 版已经用 Kotlin + Jetpack Compose 重写完毕，功能全面对齐 iOS：

- 同样的 OAuth + PKCE 多账号登录，Token 存 Android Keystore
- Material You 动态取色（基于晨昏主题）
- 平板和折叠屏自适应双栏布局
- 快速设置磁贴、主屏长按快捷方式
- 同样支持 13 种语言，已提供直接下载的 APK

## 💰 免费、Pro 与骚操作

Orange Cloud 的商业模式很良心：

| 功能 | 免费版 | Pro 版 |
|------|--------|--------|
| 单账号 + 完整域名/DNS | ✅ | ✅ |
| 小组件 / Watch / Siri | ✅ | ✅ |
| 多账号切换 | ❌ | ✅ |
| 存储功能 (R2/D1/KV) | ❌ | ✅ |
| Workers 实时日志 | ❌ | ✅ |
| WAF / 隧道 / Snippets | ❌ | ✅ |
| 7天/30天流量分析 | ❌ | ✅ |

但最骚的是开源策略：项目采用 AGPL-3.0 + Commons Clause 许可，**你可以自己拉代码编译，添加 `OPENSOURCE_UNLOCKED` 编译条件，零成本解锁全部 Pro 功能**。

作者的原话：「你完全可以自己编译，一分钱不花。」这种「源码全开放，嫌麻烦就付费买现成的」策略，非常尊重用户的选择。

## 🎯 适合谁用

- **独立开发者 / 站长**：有几个域名托管在 Cloudflare，想随时随地方便管理
- **Cloudflare Workers 用户**：想在手机上也能看日志、部署资源
- **注重安全的用户**：OAuth 登录比复制 Token 安全得多
- **Apple Watch 用户**：想在手腕上看到网站状态

📎 项目信息：GitHub [chen2he/orange-cloud](https://github.com/chen2he/orange-cloud) | 官网 o-c.do | App Store 搜索 "Orange Cloud"

我这几天用下来，最爽的就是 OAuth 登录——不用翻后台找 Token，直接在手机上点一下授权就完事了。如果你也在用 Cloudflare 管站，值得一试。