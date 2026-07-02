---
date: "2026-07-02"
type: "Post"
tags:
  - "必看精选"
  - "Cloudflare"
  - "AI"
  - "OpenClaw"
  - "教程"
  - "免费"
title: "Cloudflare 官方出手：把 AI 助手部署到 Workers，$5/月跑满"
description: "Cloudflare 开源了 Moltworker，让你在 Workers 上跑 OpenClaw AI 助手，无需 VPS，Sandbox 容器 + R2 持久化 + 三重认证，$5/月起步。"
categories:
  - "教程"
image: "https://bing.ee123.net/img/rand?seed=moltworker"
---

[//]: # (notion-sync-id: moltworker-openclaw-tutorial)

Cloudflare 最近开源了一个项目叫 **Moltworker**，能让你直接把 OpenClaw（一个开源的 AI 助手）部署到 Cloudflare Workers 上跑。简单说就是：**不用买服务器，就能拥有一个 24 小时在线的私人 AI 助手**。

![Moltworker 架构示意](https://i.ibb.co/FbY6VpyB/cover.jpg)

这玩意儿可不是因为 Cloudflare 看 OpenClaw 火了就随便套个壳。它内置了浏览器自动化、R2 持久化存储、完整的管理面板，还集成了 Cloudflare Access 做身份认证。我体验下来，最爽的是**三重安全机制**和**Discord 集成**，真正做到了又能用又安全。

项目地址：[github.com/cloudflare/moltworker](https://github.com/cloudflare/moltworker)（⭐ 近 10,000）

## 为什么要用 Cloudflare 跑

一句话总结：**这是一个把 OpenClaw 部署到 Cloudflare Workers 的开箱即用方案，不用买 VPS**。

三个核心技术点：

### 1. Sandbox 容器替代传统服务器

以前你要跑这种东西，得买 VPS → 装 Docker → 维护系统，光想想就心累。Moltworker 直接用 Cloudflare Workers 的 Sandbox 容器技术，好处是自动扩缩容，冷启动后常驻，成本极低——Workers Paid 订阅才 **$5/月**。

### 2. 三重认证防白嫖

不像那些随手搭个服务就裸奔的，Moltworker 的访问流程是：用户请求 → Cloudflare Access 登录 → 验证 Gateway Token → 设备配对批准 → 才能聊天。三层把关，陌生人想蹭你的 AI ？门都没有。

![三重认证流程](https://i.ibb.co/Mkq7TQQd/arch.png)

### 3. R2 自动备份

容器重启通常意味着数据丢失，但 Moltworker 每 **5 分钟**自动备份到 R2 对象存储，启动时自动恢复。对话历史、设备配对信息都不会丢。

## 准备工作

开始之前，你需要这几样东西：

| 项目 | 说明 | 费用 |
|------|------|:----:|
| Cloudflare Workers Paid | Sandbox 容器的硬性门槛 | $5/月 |
| Node.js 18+ | 本地环境，部署脚本需要 | 免费 |
| Docker | 本地打包容器镜像 | 免费 |
| Cloudflare 账号 | 注册一个就行 | 免费 |
| AI 模型 API Key | DeepSeek / OpenRouter / Anthropic 均可 | 按量 |

## 安装步骤

### 第 1 步：安装 Wrangler CLI

Wrangler 是 Cloudflare Workers 的命令行工具，负责部署、配置、密钥管理。

```bash
npm install -g wrangler
wrangler login
```

### 第 2 步：克隆项目并配置密钥

```bash
git clone https://github.com/cloudflare/moltworker.git
cd moltworker
```

然后设置几个重要密钥：

```bash
# AI 模型 API Key（以 DeepSeek 为例）
echo "YOUR_DEEPSEEK_API_KEY" | wrangler secret put DEEPSEEK_API_KEY

# Gateway Token（访问密码）
echo "YOUR_GATEWAY_TOKEN" | wrangler secret put GATEWAY_TOKEN

# 允许访问的邮箱
echo "your@email.com" | wrangler secret put ALLOWED_EMAILS
```

### 第 3 步：配置 Cloudflare Access

在 Cloudflare Dashboard 创建一个 Zero Trust 应用，设置好登录页面，获取 Access 的认证域名和 Audience Tag，填入项目的 `wrangler.json` 配置文件中。

### 第 4 步：配置 R2 持久化存储

默认情况下 Workers 是无状态的，要想你的 AI 有"长期记忆"，必须配 R2。

![R2 API Token 配置](https://i.ibb.co/kVFbyCKB/r2setup.jpg)

1. 进入 Cloudflare Dashboard → R2 → 创建 API Token
2. 权限选 **Object Read & Write**
3. 范围指定 Bucket：`moltbot-data`
4. 保存好生成的 Access Key ID 和 Secret Access Key

然后设置密钥：

```bash
wrangler secret put R2_ACCESS_KEY_ID
wrangler secret put R2_SECRET_ACCESS_KEY  
wrangler secret put CLOUDFLARE_ACCOUNT_ID
```

### 第 5 步：部署

```bash
npm run deploy
```

部署成功后，你会看到终端输出访问地址。

### 第 6 步：首次访问

访问地址格式：`https://your-worker.workers.dev/?token=YOUR_GATEWAY_TOKEN`

![登录页面](https://i.ibb.co/ycfZ92rS/login.jpg)

首次访问需要 **1-2 分钟**的冷启动时间，耐心等待。进入界面后，会引导你进入 Admin 面板审批设备。

![最终界面](https://i.ibb.co/fZxLVnS/interface.jpg)

### 第 7 步：配置模型

Moltworker 支持多种模型接入方式：

- **DeepSeek**：直接配 API Key 就行，性价比最高的选择
- **OpenRouter**：聚合多家模型，按需切换
- **Anthropic Claude**：配合 Cloudflare AI Gateway 的 Unified Billing 使用
- **直接 API**：支持任何 OpenAI 兼容接口

## 接入 Discord

把 OpenClaw 接到 Discord 是我觉得最爽的部分。其他平台体验多少有点卡顿，但 Discord 的 Channel 体验非常丝滑。

![Discord 集成](https://i.ibb.co/pBcGKFGr/discord.png)

![Discord 聊天界面](https://i.ibb.co/6RRFfX94/discord-done.jpg)

## 费用估算

很多人看到 $5/月觉得便宜，但实际跑起来还有额外费用：

| 项目 | 月费 |
|------|:----:|
| Workers Paid 订阅 | $5 |
| Sandbox 容器（内存 4GB，24h 运行） | ~$26 |
| CPU（按 10% 利用率算） | ~$2 |
| 磁盘 8GB | ~$1 |
| **合计** | **~$34/月** |

不过如果你的 AI 不常用，容器会休眠，实际费用可能更低。

## 写在最后

这次 Cloudflare 亲自下场，算是给 OpenClaw 的部署方式开了个官方通道。不用折腾 VPS、不用操心 Docker，Wrangler 一把梭。虽然每月 $30+ 的运行成本不算白菜价，但考虑到**免运维、自动扩缩容、自带安全认证**，对于想认真用 AI 助手的人来说，比折腾 VPS 省心太多。

GitHub 仓库：https://github.com/cloudflare/moltworker（⭐ 近 10,000）