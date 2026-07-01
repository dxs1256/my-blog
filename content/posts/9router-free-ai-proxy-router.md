---
date: "2026-05-08"
type: "Post"
tags:
  - "必看精选"
  - "AI"
  - " 开源"
  - "工具"
title: "9Router：免费无限用Claude/GPT/Gemini的开源AI代理路由器"
description: "推荐开源项目9Router，本地部署的AI代理路由器，统一接入Claude Code、Cursor等编程工具，智能路由到40+提供商的免费/低价额度，支持自动故障转移、多账号轮询和Token压缩。"
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=9router-free-ai-proxy-router"
---

[//]: # (notion-sync-id: 35a874cb-3972-8113-915e-d2a989335872)

如果你是重度 AI 编程用户，大概率遇到过这种崩溃时刻：代码写到一半，Claude Code 的配额跑光了；切到 Cursor，发现这个月的额度也快见底；再换 Copilot，免费版的限制更多。三个工具来回切换，配置改来改去，效率全耗在了「找可用额度」上。

最近发现了一个叫 **9Router** 的开源项目，正好解决这个问题。它在本地跑一个代理服务，把你所有 AI 编程工具统一接入，然后智能地把请求分发到 40 多个 AI 提供商的免费和低价额度上，真正做到「一份订阅，多倍使用」。

---

## 项目概览

9Router 是一个开源的 AI 代理路由器（Universal AI Proxy），GitHub 上已经获得 3800+ Star，npm 月下载量超过两万次。

核心思路很简单：在本地起一个代理服务，所有 AI 编程工具的请求先经过 9Router，它会按照「订阅配额 → 低价 API → 免费额度」的优先级自动选择最佳渠道，当前渠道用完就无缝切到下一个，编码过程零中断。

项目地址：https://github.com/decolua/9router

---

## 核心能力

### 自动故障转移

- 按照「订阅配额 → 低价 API → 免费额度」的优先级自动切换
- 当前渠道用完或出错，立刻无缝切到下一个
- 编码过程完全无感知，零中断
### 配额追踪与最大化利用

- 针对每个提供商、每个模型单独追踪用量
- 确保每一分钱的额度都被用到极限
- 不再让配额白白归零
### 多账号轮询

- 同一个提供商支持绑定多个账号，自动轮流使用
- 相当于把额度直接倍增
### Token 压缩

- **RTK 压缩管道**：对输入内容无损压缩，减少 20-40% 的输入 Token
- **Caveman 精简模式**：重写系统提示词，减少输出冗余，节省高达 65% 的输出 Token
- 两者叠加，高频使用场景下的成本节省相当显著
---

## 支持的平台

- **AI 编程工具**：Claude Code、Cursor、Cline、Continue、Copilot、Aider、Gemini CLI、OpenCode 等
- **AI 提供商**：GitHub Models、Codex、Cursor、Kiro（AWS）、Gemini CLI、各类免费 OpenAI 兼容端点等 40+ 平台
- **免费资源来源**：GitHub Models（每月重置）、Codex（每5小时+每周重置）、Kiro（无限制）、Cursor（月度订阅）
---

## 三种部署方式

### npx 一键启动（推荐新手）

无需安装，直接运行：

```bash
npx 9router
```

浏览器会自动打开 Dashboard，默认运行在 `http://localhost:20128`。

### 全局安装

```bash
npm install -g 9router
9router --port 8080   # 自定义端口
9router --no-browser  # 不自动打开浏览器
```

### 源码自部署

```bash
git clone https://github.com/decolua/9router.git
cd 9router
npm install && npm run build && npm run start
```

配置环境变量后即可启动，适合服务器部署或需要自定义的场景。

---

## 接入你的 AI 工具

启动后在 Dashboard 中连接提供商（支持 OAuth 一键授权），然后在编程工具里配置：

- **Base URL**：`http://localhost:20128/v1`
- **API Key**：从 Dashboard 获取
- **Model**：选择对应模型，如 `gh/claude-sonnet-4.6`
以 Claude Code 为例，修改环境变量即可：

```bash
export ANTHROPIC_BASE_URL=http://localhost:20128
export ANTHROPIC_API_KEY=你的9router密钥
```

---

## 适合谁用

- **重度 AI 编程用户**：经常遇到配额限制，希望无缝继续工作
- **订阅了多个平台的开发者**：想要统一管理、避免手动切换
- **个人开发者 / 学生**：预算有限，希望最大化利用免费额度
---

## 注意事项

- **合规性**：部分提供商的免费 API 有使用条款限制，建议查阅各平台 TOS
- **本地运行**：默认只监听本地，数据不会上传。部署到服务器时注意认证和网络隔离
- **稳定性**：免费额度来源众多，部分渠道可能不稳定，建议配置付费备选渠道
- **Token 压缩**：Caveman 模式会改写系统提示，对格式敏感的任务建议测试后再开启
---

## 写在最后

9Router 本质上解决的是资源利用率问题——把碎片化的 AI 配额统一管理、智能调度，让开发者真正用满自己花出去的每一分钱。对于订阅了多个 AI 工具但经常撞墙的开发者来说，这个工具值得一试。

---


