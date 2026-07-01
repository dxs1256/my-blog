---
date: "2026-05-06"
type: "Post"
tags:
  - "Cloudflare"
  - " 开源"
  - "GitHub"
  - "热门文章"
title: "edgetunnel：3万Star的 Cloudflare Workers/Pages 边缘隧道方案"
description: "基于 Cloudflare Workers/Pages 的 VLESS/Trojan/Shadowsocks 边缘隧道，内置管理面板、订阅系统、ProxyIP 优化，支持多种部署方式，30.7k Star。"
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=edgetunnel-cloudflare-workers-vless-trojan"
---

[//]: # (notion-sync-id: 358874cb-3972-81da-a049-f7f49e23d4d8)

在 Cloudflare Workers 生态中，edgetunnel 是目前 Star 数最高的边缘隧道项目之一，达到了 30.7k Star，Fork 数也超过了 3 万。它将 Cloudflare 的免费边缘节点变成了一个功能完整的代理隧道服务，支持 VLESS、Trojan、Shadowsocks 三大主流协议，并且内置了可视化管理面板。

## 核心功能特性

edgetunnel 不只是一个简单的代理脚本，它提供了一套完整的解决方案：

- 多协议支持：VLESS、Trojan、Shadowsocks 三大主流协议全覆盖
- 可视化管理面板：内置后台，支持实时配置修改、日志查看及流量统计
- 订阅系统：自动生成订阅链接，适配 Clash、Sing-box、Surge 等主流客户端
- ProxyIP 优化：支持自定义 ProxyIP、SOCKS5/HTTP 链式代理及优选 API，有效降低延迟
- 多种部署方式：完整适配 CF Workers 和 CF Pages（上传部署 / GitHub 连接）
- 全平台客户端：Windows、Android、iOS、macOS 及各种软路由固件均有对应客户端
## 三种部署方式

### 方式一：Pages 上传部署（推荐）

这是作者推荐的最佳部署方式，操作最简单：

1. 下载项目中的 main.zip 压缩包
1. 在 Cloudflare Pages 控制台选择「上传资产」
1. 在生产环境变量中添加 ADMIN（管理员密码）
1. 绑定 KV 命名空间，变量名填写 KV
1. 绑定 CNAME 自定义域名
1. 访问 你的域名/admin 登录管理后台
### 方式二：Workers 部署

1. 在 CF Worker 控制台创建新 Worker
1. 将 _worker.js 的内容粘贴到 Worker 编辑器中
1. 添加环境变量 ADMIN 设置管理密码
1. 绑定 KV 命名空间
1. 添加自定义域名
### 方式三：Pages + GitHub 自动部署

1. Fork 本项目到自己的 GitHub 账号
1. 在 Cloudflare Pages 选择「连接到 Git」
1. 添加环境变量 ADMIN 和 KV 命名空间绑定
1. 绑定自定义域名，后续代码更新自动部署
## 关键环境变量

- ADMIN：管理员面板登录密码（必填）
- UUID：强制固定 UUID，仅支持 v4 格式（选填）
- PROXYIP：全局自定义反代 IP，如 proxyip.cmliussss.net:443（选填）
- URL：默认主页伪装地址（选填）
- KEY：快速订阅路径密钥（选填）
- BEST_SUB：设为 true 开启优选订阅生成器（选填）
---

## 客户端适配

edgetunnel 生成的订阅链接可以直接导入以下客户端使用：

- Windows：v2rayN、FlClash、mihomo-party、Clash Verge Rev
- Android：ClashMetaForAndroid、FlClash、v2rayNG
- iOS：Surge、Shadowrocket、Stash
- macOS：FlClash、mihomo-party、Clash Verge Rev、Surge
---

> ⚠️ 项目基于 Cloudflare 免费额度运行，无需服务器成本。但请务必遵守所在地区的法律法规，仅供学习和研究使用。

---

## 项目信息

- GitHub 地址：cmliu/edgetunnel
- Star：30.7k | Fork：30.4k | 语言：JavaScript
- 开源协议：GPL-2.0
- 作者 Telegram：@CMLiussss

