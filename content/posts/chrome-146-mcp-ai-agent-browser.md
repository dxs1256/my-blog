---
date: "2026-05-20"
type: "Post"
tags:
  - "热门文章"
  - "Chrome"
  - "MCP"
  - "AI Agent"
  - "浏览器"
  - "自动化"
title: "Chrome 146 内置 MCP 支持：一键把浏览器变成 AI Agent 的操作界面"
description: "Chrome 146 悄悄内置了 MCP 支持，只需开启一个开关，就能把当前浏览器会话通过 MCP 协议暴露给 AI Agent。让 AI 直接帮你操作浏览器，批量处理网页任务。"
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=chrome-146-mcp-ai-agent-browser"
---

[//]: # (notion-sync-id: 366874cb-3972-814b-b5f4-e38e41d20fda)

Chrome 146 昨天更新了，带了一个大多数人没注意到的功能：内置 MCP 支持。你只需要打开 Chrome 设置里的一个开关，就能把当前的浏览器会话通过 MCP 协议暴露给你的 AI agent（OpenClaw、Claude Code 都行）。AI 可以看到你正在浏览的页面、帮你点按钮、填表单、批量处理网页操作，全程在你眼皮底下跑。


![](https://images.weserv.nl/?url=https://pbs.twimg.com/media/HDW_H1laUAEcgMo.jpg?name=orig)

---

## 🔍 核心思路

以前 AI agent 操控浏览器，要么靠一个个点，要么装个不靠谱的插件。现在 Chrome 官方把这个能力内置了。

全球 30 亿 Chrome 用户，理论上都可以一键把自己的浏览器变成 AI agent 的操作界面。这比之前那些第三方浏览器自动化工具（比如 Puppeteer、Selenium）要方便得多，因为它是直接内置在浏览器里的，不需要额外配置环境。

## 🚀 开启步骤

- 升级到 Chrome 146
- 打开 chrome://flags/#enable-webmcp-testing，设为 Enabled
- 重启 Chrome
- 你的 CLI agent（比如 OpenClaw）就能通过 MCP 协议连上去了
## 💡 实际应用场景

想象一下这些场景：

- 批量处理 LinkedIn 好友请求：告诉 AI 帮我把这些请求全部接受
- 自动化表单填写：让 AI 自动填写复杂的表格
- 网页数据抓取：让 AI 在浏览器里帮你整理数据
以前你需要写 Puppeteer 脚本或者找各种插件，现在直接让 AI agent 连上你的 Chrome，告诉它要做什么就行。

## 🎯 为什么重要？

这意味着浏览器正在从一个被动的内容消费工具，变成一个可以被 AI 程序调用的操作平台。

你不再需要为 AI 单独开发 API 或者接口，你的浏览器就是 API。这可能会彻底改变 AI agent 与互联网交互的方式。

---

## 📝 写在最后

Chrome 146 的这个内置 MCP 支持，让 AI agent 操控浏览器的门槛降到了最低。如果你经常需要让 AI 帮你处理浏览器里的重复性工作，不妨试试这个新功能。


