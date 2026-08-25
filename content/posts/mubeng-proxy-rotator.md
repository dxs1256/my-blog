---
date: "2026-08-25"
type: blog
tags:
  - 代理
  - 爬虫
  - 开源
  - Go
title: "每次请求自动换 IP 的代理轮换器"
description: "mubeng 用 Go 写的代理轮换器，本地起代理服务器，每发一次请求自动换一个 IP，顺手帮你把代理池体检一遍。"
categories:
  - 软路由与网络
image: "https://bing.ee123.net/img/rand?seed=mubeng-proxy-rotator"
---

搞爬虫、跑批量请求的，最头大的不是代码，是 IP——墙了一死死一片，代码写得再花也白搭。手动换代理、自己写轮换逻辑，费时费力还容易出 bug。

我后来发现了 **mubeng**（⭐2.4k），Go 写的，一个二进制解决两件事：代理轮换 + 代理体检。

项目地址：https://github.com/mubeng/mubeng

## 🎯 核心玩法：本地代理服务器，请求一次换一个 IP

mubeng 最核心的用法，是把你的代理池变成一台本地代理服务器：

```bash
mubeng -file proxies.txt -address 127.0.0.1:8080
```

之后的请求只要指向这个本地端口，它**每转发一次请求就自动换一个代理 IP**。暴力破解防护、API 限速、按 IP 封的 WAF，全都绕道走。轮换逻辑不用自己手搓了，扔个代理文件进去就开工。

## 🩺 顺手还带代理池体检

检测代理能不能用，不需要再装别的工具。mubeng 支持两种模式：

- 代理文件里挨个测活，能蹦跶的、已经凉了的一眼看清
- 支持 HTTP/HTTPS、SOCKS v4/v5 全家桶，甚至 Amazon API Gateway 的代理格式

实测在代理池几百个节点的情况下，跑一轮体检几十秒完成，速度这块没得挑。

![mubeng 代理轮换工具](https://i.ibb.co/0p9tbRgq/c41ec4c377bf.png)

## 🔧 零配置，跨平台

- 单二进制，没有依赖，Windows / Linux / Mac / 树莓派都能跑
- Docker：`docker pull ghcr.io/mubeng/mubeng:latest`
- 跟 Burp Suite、OWASP ZAP 这类渗透工具也能直接串成上游代理链

![mubeng GitHub 仓库](https://i.ibb.co/tPKwN5Cw/5f45a7712fde.png)

## 📊 和仓库里另外两个代理工具的区别

之前写过 **Proxy Checker**（代理体检面板）、**Proxifly**（免费代理聚合）、**AutoScrape**（节点聚合）、**Clashoo**（软路由代理管理插件）、**EdgeTunnel**（Cloudflare 免费代理）。它们和 mubeng 是一条链上的不同环节：

| 工具 | 定位 | 解决什么 |
|------|------|---------|
| Proxifly / AutoScrape | 代理聚合源 | 没代理可用时，去那里捞一批活的 |
| Proxy Checker | 代理体检中心 | 手上一堆代理，筛出能用的 |
| EdgeTunnel | 自建免费代理通道 | 不想花钱，用 Cloudflare 白嫖节点 |
| Clashoo | 代理客户端管理 | OpenWrt 上管理 Clash 等内核、切换配置 |
| mubeng | IP 轮换器 | 代理没问题但用起来费劲时，自动换 IP |

如果想要"拿来即用"的轮换能力，mubeng 是这条链上最直接的——其他工具管"找代理、验代理、管代理"，mubeng 管的是"用代理"。

![mubeng 推文介绍截图](https://i.ibb.co/GvbRCsjH/4273b6354b4e.png)

## ⚠️ 提醒

- 免费代理池的质量决定效果——池子里死代理太多，轮换也会卡壳
- 只建议个人合规爬虫/测试场景用；商业爬取要上贵的住宅代理池，别指望免费池扛大流量