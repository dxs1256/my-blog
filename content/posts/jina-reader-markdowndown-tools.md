---
date: "2026-05-28"
type: "Post"
tags:
  - "热门文章"
  - "工具"
  - "爬虫"
  - "Markdown"
  - "免费"
title: "两个免费网页转 Markdown 工具，爬虫好帮手"
description: "发现两个免费的网页转 Markdown 工具：Jina Reader（URL 前加 r.jina.ai 直接把网页变 LLM 友好格式）和 MarkdownDown（一键转 Markdown 文件并下载图片），实测好用。"
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=jina-reader-markdowndown-tools"
---

[//]: # (notion-sync-id: 36e874cb-3972-810a-8216-cacded28e9e1)

平时做内容抓取，最烦的就是网页结构乱七八糟，提取正文费半天劲。昨天发现两个很实用的免费工具，一个能把任意 URL 转成 LLM 友好的 Markdown 格式，另一个专注把网页变 Markdown 文件还支持下载图片，搭配起来非常好用。

---

## 📚 Jina Reader — URL 转 LLM 友好格式

Jina Reader 是一个完全免费的 API 工具，用法简单到离谱：在任意 URL 前面加上 `r.jina.ai/` 前缀就能拿到格式化后的 Markdown 内容。

**核心优势**：

- 完全免费（官方 FAQ 确认的），没有隐藏收费
- 支持 API 调用，方便集成到自己的自动化流程
- 输出格式对 LLM 非常友好，可以直接喂给 AI 模型做摘要、分析
- 除了 Reader 模式，还有 `s.jina.ai` 搜索模式和 `mcp.jina.ai` MCP 服务
试了一下效果确实不错，爬下来做网页摘要、内容提取都很顺手。

![Jina Reader 界面](https://external-content.duckduckgo.com/iu/?u=https://pbs.twimg.com/media/HI-Myd1agAAujYX.jpg?name=orig)

---

## 🚀 MarkdownDown — 网页一键转 Markdown 文件

如果说 Jina Reader 是给开发者准备的 API 工具，那 MarkdownDown 就是给普通用户准备的傻瓜式工具。打开网站，贴上 URL，点一下转换按钮，直接下载 Markdown 文件。

**亮点功能**：

- 支持下载图片到本地并嵌入 Markdown 中引用
- 内置 GPT Filter 选项，智能过滤非正文内容
- 支持移除非内容元素（导航栏、广告等），只保留正文
- 零配置，打开即用
试了一下转换效果也很干净，适合做内容归档和本地阅读。

![MarkdownDown 转换示例](https://external-content.duckduckgo.com/iu/?u=https://pbs.twimg.com/media/HI-MydxbQAAtctU.jpg?name=orig)

---

## 💡 使用场景

这两个工具其实定位不太一样，但可以互补：

Jina Reader 适合嵌入到自动化流程里——写个脚本批量抓取网页内容、喂给 AI 做分析摘要，完全免费不心疼。MarkdownDown 则适合偶尔手动使用——看到一篇好文章想存下来离线看，一键转 Markdown 下载到本地，图片也一并打包。

如果是做内容抓取或 AI 数据处理，这两个都值得放进工具箱。

---

如果你也在做网页内容抓取或 AI 数据处理，不妨试试这两个工具，免费的永远是真香。


