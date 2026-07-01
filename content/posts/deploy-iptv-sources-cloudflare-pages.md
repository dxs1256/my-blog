---
date: "2026-05-06"
type: "Post"
tags:
  - "Cloudflare"
  - "教程"
  - "GitHub Actions"
  - "教程"
title: "在 Cloudflare Pages 上部署 iptv-sources：从零到定时更新"
description: "详细教程说明如何把 iptv-sources 部署到 Cloudflare Pages，包括初始化、构建设置、自定义域名、定时更新等完整流程，并理清 Git 构建、GitHub Actions 定时任务、直连上传之间的关系。"
categories:
  - "教程"
image: "https://bing.ee123.net/img/rand?seed=deploy-iptv-sources-cloudflare-pages"
---

[//]: # (notion-sync-id: 358874cb-3972-8198-a78d-f545cdf85c11)

这是一篇关于如何在 Cloudflare Pages 上部署 iptv-sources 的详细教程，包含从零到定时更新的完整流程。

GitHub项目：https://github.com/yunnysunny/iptv-sources

## 项目概览

项目使用 Node 开发，构建在 Cloudflare Pages 中触发，构建完成后，站点根目录对应仓库里的 m3u/ 目录，其中包含：

- TVBox 等用的 sources/ JSON
- EPG：原始 XML 以及按日期、频道拆好的静态 JSON（epg/…）
- public/ 里拷贝过去的静态资源（由脚本的 postbuild:static 等步骤处理）
## 前置条件

- GitHub 账号，并已 Fork（或克隆后推送到）你要部署的仓库
- Cloudflare 账号（免费套餐即可用于 Pages，具体额度以官方说明为准）
- 对分支与 Secret 有基本了解（后面配置定时更新会用到）
## 部署步骤

### 第一步：在 Cloudflare Pages 里「连接 Git」

- 打开 Cloudflare Dashboard，进入 Workers & Pages
- 选择 Create → Pages → Connect to Git
- 按提示授权 GitHub，选中你的仓库与要部署的分支（一般为 main）
### 第二步：构建设置（控制台）

- Framework preset：None
- Build command：pnpm build:static
- Build output directory：m3u
- Root directory：/
### 第三步：部署结果自检

- 打开 Cloudflare 为该 Pages 项目分配的域名
- 确认能访问到首页或列表
- 随机抽查一个 M3U 或 EPG 路径是否 200
- 若你在 TVBox / 播放器里配置了 EPG，把文档中的 your-domain.pages.dev 换成你的 Pages 域名或已绑定的自定义域名
## 定时更新方案

### 方式 A：直连上传（推荐）

- 在 GitHub 仓库里配置了非空的 Secret CLOUDFLAREAPITOKEN
- 工作流在 Runner 上执行：npx wrangler pages deploy m3u --project-name="你的 Pages 项目名"
- 需要在 GitHub 配置：CLOUDFLAREAPITOKEN、CLOUDFLAREACCOUNTID、PROJECT_NAME
### 方式 B：不配置 Token —— 用空 commit 触发云端构建

- 当没有配置 CLOUDFLAREAPITOKEN（或为空）时，工作流不会调用 Wrangler
- 执行 git commit --allow-empty
- 这样会触发已连接 Git 的 Pages 认为有新提交，从而在 Cloudflare 构建环境里再跑一遍你在控制台配置的 pnpm build:static
## 常见问题排查

- Token 权限不足、Account ID / 项目名错误
- 核对 Secret 与 Pages 项目名大小写、Token 模板权限
- 等待 TTL 或在 Cloudflare 对关键路径调整缓存策略
## 小结

- 首次上线：Pages 连接 Git + 正确填写 Build command 与输出目录 m3u
- 持续更新：依赖 schedule 工作流；要么配置 Cloudflare API + Wrangler 直连上传，要么依赖空 commit 触发云端构建（并保证 bot 能 push）
- 播放器侧：把域名换成你自己的 Pages / 自定义域名，并按 EPG.md 配置 XML 或 JSON EPG

