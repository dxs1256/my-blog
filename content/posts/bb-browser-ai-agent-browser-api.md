---
date: "2026-08-18"
type: blog
tags:
  - "AI Agent"
  - "浏览器"
  - "MCP"
  - "自动化"
  - "无头浏览器"
title: "让 AI 接管浏览器：三种路线怎么选"
description: "AI Agent 操控浏览器的三条路线——复用登录态（bb-browser）、官方内置 MCP（Chrome 146）、极简无头内核（Lightpanda），按场景对号入座"
categories:
  - AI
image: "https://bing.ee123.net/img/rand?seed=bb-browser-ai-agent-browser-api"
---

每次想让 AI 帮我查点东西，都绕不开浏览器这关。要登录态的网站，得找 API Key、处理 Cookie、跟反爬机制斗智斗勇；跑爬虫吧，Headless Chrome 动不动吃几个 G 内存，服务器直接爆满。同样是「让 AI 操控浏览器」，市面上其实有三条完全不同的路线，我把主流的三条都研究了一遍。

项目地址：https://github.com/epiral/bb-browser
项目地址：https://github.com/lightpanda-io/browser（Chrome 146 为内置功能，无需安装）

## 📊 三条路线一眼看懂

它们解决的是不同问题：bb-browser 借你的登录态，Chrome 146 靠官方内置，Lightpanda 把无头浏览器做轻。先看对比：

| 维度 | bb-browser | Chrome 146 MCP | Lightpanda |
|------|-----------|----------------|-----------|
| 核心思路 | 复用你已登录的浏览器 | 浏览器官方内置 MCP | 从零写的极简无头内核 |
| 需要登录的网站 | ✅ 直接用你的账号 | ✅ 直接用你的账号 | ❌ 无登录态 |
| 性能 | 取决于你的 Chrome | 取决于你的 Chrome | 内存少 16 倍、快 9 倍 |
| 上手成本 | 装 CLI / MCP，零配置 | 开一个 flags 开关 | brew / Docker 起服务 |
| 适合场景 | 跨平台数据调研 | 个人日常批量操作 | 大规模爬虫 / 自动化 |
| 集成方式 | 36 个平台 103 条命令 | 原生会话，连 CLI agent | CDP，兼容 Puppeteer / Playwright |

## 🧭 路线一：bb-browser——复用你已登录的浏览器

它的理念一句话说清：与其让网站提供机器接口，不如让机器直接用人的接口。通过 CDP（Chrome DevTools Protocol）WebSocket 连上你的真实 Chrome，AI 发指令、浏览器执行，对网站来说就是你在正常浏览，不会触发反爬。

覆盖的 36 个平台都是要登录才能看到内容的：Twitter、微博、小红书、即刻的社交动态，YouTube、B 站的搜索和弹幕评论，GitHub、V2EX、arXiv 的开发社区，雪球和东方财富的财经数据，连 BOSS 直聘都有。

命令行直接用，比如：

- `bb-browser site twitter/search "AI agent"` — 搜索推文
- `bb-browser site zhihu/hot` — 知乎热榜
- `bb-browser site bilibili/popular` — B 站热门
- `bb-browser site youtube/transcript VIDEO_ID` — 视频字幕

也支持 MCP Server，能直接集成进 Claude Code、Cursor。做技术调研时特别顺：同一件事在 arXiv 找论文、Twitter 看讨论、GitHub 搜代码、StackOverflow 查实现，全程一套登录态，不用维护多套 Cookie。

## 🌐 路线二：Chrome 146——官方内置 MCP，开个开关就行

Chrome 146 悄悄内置了 MCP 支持：打开设置里的开关，当前浏览器会话就能通过 MCP 协议暴露给 AI agent（OpenClaw、Claude Code 都行）。AI 能看到你正在看的页面，帮你点按钮、填表单、批量处理网页操作。

开启只要四步：

1. 升级到 Chrome 146
2. 打开 `chrome://flags/#enable-webmcp-testing`，设为 Enabled
3. 重启 Chrome
4. CLI agent 就能通过 MCP 连上来

对比 Puppeteer、Selenium 那套，它不需要额外配置环境，内置就是最大的优势——全球 30 亿 Chrome 用户理论上都能一键把浏览器变成 AI 的操作界面。适合批量处理 LinkedIn 好友请求、自动填复杂表单、让 AI 在浏览器里整理数据这类日常操作。

## ⚡ 路线三：Lightpanda——把无头浏览器做到极简

前两条路线依赖你的浏览器，Lightpanda 则是完全从零用 Zig 写的独立无头浏览器，砍掉所有图形渲染管线，只留 AI 和自动化需要的 DOM 解析、JavaScript 执行和网络请求。AWS EC2 m5.large 上请求 933 个真实网页的实测：

- 内存占用（100 个页面）：**Lightpanda 123MB vs Headless Chrome 2GB**
- 执行时间（100 个页面）：**Lightpanda 5 秒 vs Headless Chrome 46 秒**

从零写不代表要重写代码——它提供完整 CDP 支持，Puppeteer 只需把连接地址换成它的 WebSocket 端点，Playwright 走 CDP 兼容，还内置 MCP Server 可直接接 AI Agent。装起来也简单：`brew install lightpanda-io/browser/lightpanda`，或 `docker run -d -p 127.0.0.1:9222:9222 lightpanda/browser:nightly`。

## 💡 怎么选

按你的场景对号入座：

- **经常让 AI 跨平台查资料**（社交、视频、财经、招聘）→ bb-browser，登录态白拿，一条命令一个平台
- **只想让 AI 帮自己处理日常网页操作**（表单、批量点击、整理页面数据）→ Chrome 146，开个 flags 就行，零安装
- **跑爬虫或批量自动化、在意服务器资源** → Lightpanda，同样的活内存省 16 倍，成本肉眼可见地降

三条路线不互斥，可以组合用：登录态场景交给 bb-browser，个人日常用 Chrome 146，重活扔给 Lightpanda。我自己目前的判断是：**个人用途优先 Chrome 内置，数据调研加一个 bb-browser，Lightpanda 留给服务器上的批量任务**——不用急着全上，按需求一个个加就行。
