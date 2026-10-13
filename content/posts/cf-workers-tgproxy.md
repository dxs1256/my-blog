---
date: "2026-10-13"
type: blog
tags:
  - Telegram
  - 代理
  - Cloudflare
  - 开源
title: "Workers 免费跑 Telegram 代理"
description: "一个 Cloudflare Worker 文件就能当 Telegram 客户端代理，不用买 VPS、不用订阅，客户端原生支持，流量走 Telegram 官方入口。"
categories:
  - 自托管
image: "https://bing.ee123.net/img/rand?seed=cf-workers-tgproxy"
---

Telegram 在网络受限的环境里总要折腾代理。试过的路子都各有各的麻烦：买 VPS 架 MTProxy，一个月几刀还要自己维护；用通用 VLESS 机场，客户端先导入订阅再选节点，链路多一跳还怕节点不稳。

后来翻到一个叫 **CF-Workers-TGProxy**（⭐774）的开源项目，思路完全不一样：**把一个 Worker 文件部署到 Cloudflare 免费额度上，它自己就是 Telegram 的代理后端**。不用 VPS、不用订阅、不用二次配置客户端。

项目地址：https://github.com/ToiCF/CF-Workers-TGProxy

## 它解决的是"官方代理模型"的痛点

Telegram 客户端本来就内置了 web-proxy 模式：在隔离 webview 里打开一个页面，页面里的 JS 建立 WebSocket 通道，把流量转发出去。按官方玩法，这套转发后端得自己架。

CF-Workers-TGProxy 就是这个后端，但它不是一个需要单独运维的中转服务器——它就是运行在 Cloudflare 边缘的一个 Worker。客户端 WebSocket 连到 Worker，Worker 解开传输层混淆、重新封一层，直接拨 **Telegram 官方的 Web K 入口**（`kws{1..5}.web.telegram.org`）中继出去。

![CF-Workers-TGProxy GitHub 仓库](https://i.ibb.co/7tmXCQ3W/00faac7fb7a3.png)

两个关键点：

**1. Worker 只碰传输层，不碰业务层。** 它做的是解开客户端 MTProto 传输层的 AES-CTR 混淆、再用自己的随机密钥重新封头，内层 MTProto 载荷由客户端端到端加密，Worker 接触不到聊天内容。链路里没有第三方中转服务器，也就没有第三方能截内容。

**2. 出站走官方域名。** 对比自建中转服务器，这里少一跳 RTT；且拨的是 `web.telegram.org` 官方边缘，线路质量比依赖质量不稳定的中间线路稳（README 提到第三方线路出现过 1034/403 边缘报错，切回官方域名即恢复）。

## 不用 Durable Object，按流拆 lane

公开的 Workers web-proxy 实现大多用 Durable Object 维持单条长连接，DO 是单线程、要路由到固定实例，瓶颈都堆在它身上。

这个项目换了个思路：**每条 Telegram 流拆成一条独立 WebSocket lane**，所有 lane 落在同一个 isolate 里：

- 单会话最多 **128 条 lane**，已用 sid 上限 4096
- 单 lane 上限 8MB / 1024 条，整会话队列上限 32MB / 16384 条
- 每条流各自背压、各自排队，不互相挤占

TG 客户端本身就有多流并自动分流，这样拆出来正好贴合——会话不被钉在单个对象上，也就避开了单连接限流。

## 小包汇聚，专治高频小帧

电报类流量一大特征是高频小包，每次 WebSocket 帧都有固定调度成本。代码里上下行各加了一层聚合：

- 上行 `upPack = 20KB` 合包目标
- 下行 `dnPack = 32KB` 聚合上限，`dnMs = 1ms` quiet-window 门控

连续小块先收进一颗薄核，尽量并成更少的实际写入再发。README 里标注这是基于代码路径的理论模型：加解密量约降到一半量级、少一跳 RTT，小包风暴场景在聚合叠加后提升更高（约 2x 起，未附实测基准）。

![CF-Workers-TGProxy README 架构说明](https://i.ibb.co/bMsL24Bj/8563c699775c.png)

## 安全设计没偷懒

- **鉴权链路**：页面只下发一次性 `nonce` + 短期 bootstrap（2 分钟过期），`POST /api/v1/session` 校验后再签发 5 分钟 session token，token 是 HMAC-SHA256 截断签名、常量时间比较
- **页面隔离**：CSP `default-src 'none'` + `sandbox`，`/api/v1/ws` 带 Origin 头时必须同源，否则拒绝
- **关闭 WS 压缩**：中继的是 TLS/HTTP2 高熵字节流，压缩换不来收益还烧 CPU，握手时显式置空 `Sec-WebSocket-Extensions`

## 部署：两个密钥，一个文件

单文件 `telegram_webproxy.js` 直接丢进 Workers，配两个环境变量：

| 变量 | 用途 | 要求 |
|------|------|------|
| `SECRET` | 传输密钥派生 + bridge 签名 | 32 位 hex（`openssl rand -hex 16`） |
| `BOOT` | bootstrap/session 签发密钥 | 非空，建议 ≥16 字符随机串 |

生成命令 README 给了：`openssl rand -hex 16` 出 SECRET，`openssl rand -hex 24` 出 BOOT。任一缺失，`/health` 直接 500 而不是装健康。想体验更好就绑自有域名走 CNAME/SaaS 优选，避免依赖不稳定的中间线路。

## 和 edgetunnel 这类通用方案怎么选

之前写过 edgetunnel——它在 Workers/Pages 上搭通用 VLESS 代理，客户端要导订阅、可以全局翻墙，覆盖面广。CF-Workers-TGProxy 则是 **TG 专用**：客户端原生 web-proxy 支持（Desktop/Android 内置），不用导入任何订阅，链路更短。

一句话判断：**只想让 Telegram 客户端稳定在线 → 这个更省事；需要整机翻墙看网页/视频 → 通用 VLESS 方案。** 两个可以并存，不冲突。