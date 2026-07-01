---
date: "2026-05-20"
type: "Post"
tags:
  - "热门文章"
  - "AI Agent"
  - "浏览器"
  - "CLI"
  - "MCP"
  - "自动化"
title: "bb-browser: 让你的浏览器成为 AI Agent 的 API"
description: "发现 bb-browser，一个让 AI Agent 直接利用你已登录浏览器状态的工具。支持 36 个平台 103 个命令，通过 CLI 或 MCP Server 控制 Chrome，无需 API Key。"
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=bb-browser-ai-agent-browser-api"
---

[//]: # (notion-sync-id: 366874cb-3972-81fe-a975-ed022cb00201)

## bb-browser: 让你的浏览器成为 AI Agent 的 API

每次想让 AI 工具帮我查点东西，比如 Twitter 上的热门话题、B 站的最新视频，或者某个需要登录才能看到的网站数据，都要折腾半天。要么找 API Key，要么处理 Cookie，要么跟反爬机制斗智斗勇。

后来我发现了 bb-browser，它直接把这个问题绕过去了：你的浏览器就是 API，AI Agent 直接用你已经登录的状态去访问网站。

**项目地址**：https://github.com/epiral/bb-browser

---

## 💡 核心思路

bb-browser 的理念非常简单：与其让网站提供机器接口，不如让机器直接用人的接口。

它通过 CDP (Chrome DevTools Protocol) WebSocket 连接到你的真实 Chrome 浏览器。AI Agent 发送指令，浏览器执行操作。对网站来说，这就是你在正常浏览，完全不会被检测到。

## 🔧 支持的平台

目前支持 36 个平台，超过 100 条命令，覆盖了你日常需要的大部分场景：

- 社交媒体：Twitter、Reddit、微博、小红书、即刻、LinkedIn
- 视频平台：YouTube、B 站（搜索、热门、弹幕、评论）
- 开发社区：GitHub、StackOverflow、HackerNews、V2EX、arXiv
- 新闻资讯：BBC、Reuters、36 氪、今日头条
- 财经数据：雪球、东方财富、Yahoo Finance
- 求职招聘：BOSS 直聘、LinkedIn
## 🚀 使用方式

安装后可以直接用命令行操作：

- bb-browser site twitter/search "AI agent" - 搜索推文
- bb-browser site zhihu/hot - 查看知乎热榜
- bb-browser site bilibili/popular - B 站热门视频
- bb-browser site youtube/transcript VIDEO_ID - 获取视频字幕
同时也支持 MCP Server，可以直接集成到 Claude Code、Cursor 等开发工具中。

## 🎯 实际应用场景

对于需要跨平台研究的人来说，这个工具特别实用。比如你要调研某个技术话题，可以同时在 arXiv 找论文、Twitter 看讨论、GitHub 搜代码、StackOverflow 查实现。

所有数据都是通过你的真实浏览器获取的，不需要维护多套登录状态，也不用担心被反爬。

## 📝 写在最后

bb-browser 把浏览器变成了 AI Agent 的通用接口。如果你经常需要让 AI 帮你从各种网站获取数据，或者想让 AI 工具能直接操作你的浏览器，这个工具值得试试。


