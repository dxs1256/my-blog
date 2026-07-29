---
date: "2026-07-29"
type: blog
tags:
  - AI
  - 开源
  - 爬虫
title: "Firecrawl 无 Key 免费用，每月 1000 次"
description: "130K Star 的网页数据接口 Firecrawl，现在不用 API Key 也能调接口，每月白送 1000 次免费额度。"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=firecrawl-keyless-free"
---
[//]: # (notion-sync-id: )

今天刷到一条消息：Firecrawl 官方发推说，从今天起不用申请 Key、不用配环境变量，直接调接口就能用。

[**Firecrawl**](https://github.com/nicholasgriffintn/firecrawl) 是一个专门给 AI 用的网页数据接口，130K+ Star，已经是社区 Top 100 的仓库了。Apple、Canva、Stanford、Zapier 这些公司都在用它的服务。

项目地址：https://github.com/nicholasgriffintn/firecrawl

## 它到底能干嘛

你给它一个网址，它返回给你：

- **干干净净的正文 Markdown** — 去掉了导航栏、广告、页脚这些杂碎
- **结构化的 JSON** — 你定义 schema，它按结构提取
- **截图、HTML、元数据** — 也行

它有三个核心能力，把 AI 和网页之间的隔阂彻底打通了。

![Firecrawl 核心能力界面](https://i.ibb.co/R4S3P6k8/55be7eb1935b.png)

## 这次更新了什么

**无 Key 模式**，三个入口同时上线。

### MCP

如果你在用 Claude Code、Codex 这些支持 MCP 的工具，一行命令搞定：

```
claude mcp add --transport http firecrawl https://mcp.firecrawl.dev/v2/mcp
```

Agent 自己就能完成接入，不需要你在中间手动传 Key。

### CLI

```
npx firecrawl-cli@latest
```

相比 MCP，我更喜欢 CLI 的方式，直接终端里跑，干净利落。

![Firecrawl CLI 和 MCP 接入方式](https://i.ibb.co/QhmPwGQ/a9b3cc1cd2b7.png)

### REST API

这个更离谱，连 HTTP 请求里的 Authorization header 都不用写了。

以前调 API：

```
curl -H "Authorization: Bearer fc-xxxxxx" https://api.firecrawl.dev/v2/scrape
```

现在：

```
curl https://api.firecrawl.dev/v2/scrape
```

就这样。每月 1000 次免费额度是自动给的，不用做任何操作。用超了再去注册账号、升级付费 plan。

![Firecrawl REST API 无 Key 调用方式](https://i.ibb.co/JR1WZn7j/40e4c45b1c07.png)

## 这波操作背后的逻辑

表面上看，Firecrawl 只是去掉了 API Key 这一个步骤。但仔细想想，他们想得很清楚 — 就是在 Agent 吞没整个数字世界之前，先把 Agent 接入互联网这个基建啃下来。

以前 API Key 是给人的：开发者注册、付费、管理 Key。但 Agent 不会注册账号，也不会自己绑邮箱，它只会调用接口。

所以当 AI Agent 越来越多地成为 API 的主要消费者时，**无 Key 调用就会从特权变成默认**。

Firecrawl 这一步，等于是提前押注了这个趋势。

![Firecrawl 背后的趋势分析](https://i.ibb.co/BKzSVQN4/92e0af00b458.png)

## 我的感受

Firecrawl 一直以来开源、免费送额度的策略，本质上是在打一场基础设施卡位战：先把开发者心智占住，规模化阶段再变现。

无 Key 这个操作，说实话挺狠的 — 它把接入门槛降到了零。以后任何 AI Agent 不需要任何配置就能直接让 Firecrawl 帮它上网，这个体验上的差距，其他竞品要追上来可不容易。

互联网正在从人浏览的资源变成 AI 调用的接口。Firecrawl 这一波 Keyless，给这个趋势又加了一把火。

![Firecrawl 项目 Logo 及社区数据](https://i.ibb.co/b5kwKW5B/d0ace72a2be8.png)