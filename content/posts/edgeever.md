---
date: "2026-09-13"
type: blog
tags:
  - 开源
  - AI
  - 自托管
  - 笔记
  - MCP
title: "免费自托管 AI 笔记知识库"
description: "EdgeEver 是开源的 AI 原生知识库，保留 Evernote 经典三栏布局，原生支持 MCP 让 AI Agent 直接读写笔记，Cloudflare 免费额度部署或 Docker 自托管，数据完全在你手里。"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=edgeever"
---

我是 Evernote 老用户，笔记攒了七八年。但这几年越来越难受：启动越来越慢，免费版限制越来越多，广告和推荐内容往界面里挤，想导出数据还得研究半天。试过 Obsidian，官方同步要钱，图片附件塞进库里把同步拖得巨慢；试过 Memos，微博式的时间线，根本不像正经整理笔记的地方。

后来发现了 **EdgeEver**（⭐1.4k），一个开源的 AI 原生知识库，定位就是「便携的 Evernote 替代品」：保留经典三栏布局，数据完全开放，原生支持 MCP 协议，还能直接部署在 Cloudflare 免费额度上——服务器都不用买。

项目地址：https://github.com/tianma-if/edgeever

## 三栏布局，老用户零学习成本

EdgeEver 保留了 Evernote 经典的「笔记本树 + 笔记列表 + 编辑器」三栏布局。这一点对我来说比什么炫酷功能都重要——用了十年 Evernote，肌肉记忆已经长在这套结构里了，换工具最怕重新适应。

![EdgeEver 产品界面](https://i.ibb.co/5h66mvGZ/429f52e92043.png)

笔记本可以无限嵌套，桌面端还有专注模式，写长文的时候不会被边栏干扰。编辑器支持富文本和 Markdown 双视图无缝切换，写技术笔记直接切到源码，写随笔就用富文本。

## 数据完全开放，不怕被锁

这是它和主流笔记工具最本质的区别：笔记存在标准 SQLite 里，提供完整的 REST API、MCP 和 CLI 访问，不依赖某个 App 才能读出来。

- **ZIP 导出**：整个库导出为一个压缩包，里面是干净的 Markdown + Front Matter + 嵌套文件夹 + 相对附件链接 + 版本历史，拿到任何地方都能恢复
- **迁移友好**：官方给了 Evernote、flomo、Memos、Notion 的迁移指南，老用户搬家有现成路径
- **多账户隔离**：一个实例支持多个账号，每个账号的工作区完全隔离

## 原生 MCP：AI 直接读写你的知识库

这是 EdgeEver 最让我眼前一亮的地方。在 Profile → MCP settings 里创建一个 API token，交给你的 AI Agent，Claude Code、Codex、Antigravity 这些工具就能直接检索、整理、总结你的笔记，还能跟 Notion 数据库、飞书多维表格打通。

![AI Agent 部署流程](https://i.ibb.co/yBpmGG4v/ce19181625eb.jpg)

比如我最近的做法：让 Claude Code 读我攒的几篇技术笔记，按主题重组成一篇结构化的知识文档，再存回知识库。以前这种事得自己手动整理半天，现在丢给 Agent 就行。AI 不再是隔着一层剪贴板跟笔记打交道，而是真正能读写你的知识资产。

## 编辑器内 AI，模型自选

除了 MCP，编辑器本身也内置了 AI 能力：接入 OpenAI、Anthropic、Gemini 兼容服务或者第三方中转，就能对整篇笔记或选中文字做总结、提取要点、校对、翻译、续写。模型自己带，不绑定任何厂商。

## 部署：Cloudflare 免费额度 or Docker

部署是 EdgeEver 的主打卖点，两条路任选：

- **Cloudflare 路线（推荐，零成本）**：用 D1 数据库 + R2 存储，个人使用完全落在免费额度内——官方数据是约 15 万条短笔记和 5 万张图片。手动部署 6 步：fork 仓库、建 D1/R2、导入 Workers & Pages、设管理员密码、构建验证、开启自动更新。甚至可以把部署步骤直接丢给 AI Agent 让它帮你操作
- **Docker 路线**：有 VPS、NAS 或家庭服务器的，一条命令 `curl -fsSL https://edgeever.org/install.sh | bash` 拉镜像起服务，SQLite 存储规模可以轻松撑起上百万条笔记

![移动端笔记列表](https://i.ibb.co/DHNd5trv/a5f25518458f.jpg)

## 细节也做得很全

- **全平台覆盖**：Web / PWA / Android / iOS / macOS / Windows / Linux，桌面端是 Electron + Rust 侧车，移动端离线编辑、增量同步
- **Web Clipper**：Chrome、Edge、Firefox 官方扩展，网页一键剪藏
- **微信文章剪藏**：手机上把公众号文章分享给 EdgeEver，直接提取正文存成笔记
- **本地图片压缩**：上传前在客户端转 WebP，体积普遍缩小 50%-90%，省存储也加快加载
- **大附件**：PDF、Office、zip、音视频都能塞进笔记，分块上传支持到 1 GiB
- **可视化图表笔记**：思维导图、流程图、架构图直接在笔记里画，还能导出 PNG/SVG
- **版本历史**：每条笔记的迭代都能回溯恢复
- **离线草稿**：断网也能写，联网自动同步

![Web Clipper 配置界面](https://i.ibb.co/CKDvNvr9/e4feab0ccd5f.jpg)

![移动端功能特性](https://i.ibb.co/8LBBTtFW/48b5ea4b6fa8.png)

## 我的判断

折腾完一轮，EdgeEver 是这几类人值得认真考虑的：**Evernote 老用户**（三栏布局零迁移成本）、**自托管党**（数据完全在自己手里，Cloudflare 免费额度够个人用）、**玩 AI Agent 的人**（原生 MCP 是它和 Obsidian、Notion 最大的差异化）。

我自己已经把技术笔记搬过来了，微信文章剪藏 + Web Clipper + MCP 三件套配合着用，数据存在自己的 Cloudflare 账号里。提醒一点：Cloudflare R2 虽然免费额度大，但首次使用需要绑卡开通订阅；国内网络拉 Docker 镜像可能慢，记得配代理或镜像源。
