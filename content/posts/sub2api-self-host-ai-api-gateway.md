---
date: "2026-05-16"
type: "Post"
tags:
  - "教程"
  - "AI"
  - " 开源"
  - "部署"
  - "API"
title: "用 Sub2API 自建一个 AI 中转站"
description: "用 Docker Compose 一键部署 Sub2API，把 Claude、Codex、Gemini 等 AI 账号统一管理起来，打造完全属于自己的 AI API 中转站，告别第三方平台的费率不透明和数据安全隐患。"
categories:
  - "教程"
image: "https://bing.ee123.net/img/rand?seed=sub2api-self-host-ai-api-gateway"
---

[//]: # (notion-sync-id: 362874cb-3972-811d-8c0f-dabd9ea19f5d)

最近我在用 AI 编程工具时遇到了一个问题：官方订阅不够灵活，直接买 API 又贵，只能找中转站。但市面上的中转站要么费率不透明，要么担心模型真假，长期用下来成本可能比自己管理还高。

后来发现了这个叫 Sub2API 的开源项目，它不是一个简单的反向代理，而是一个完整的 AI API 网关平台。你可以把自己的上游账号接进去，生成 API Key 统一管理，背后的鉴权、转发、计费、用量统计、账号调度、并发控制全部自动搞定。

项目地址：https://github.com/Wei-Shaw/sub2api

---

## 为什么不自建中转站

如果你有自己的上游账号，或者想把几个 AI 账号统一管理起来，自建中转站其实是更划算也更安心的方案。

### 自建的优势

- 费率透明：用自己的账号，每一分钱花在哪里清清楚楚
- 模型真实：调用的就是自己接的模型，不存在降级或映射
- 数据安全：API Key 和调用记录都在自己的服务器上
- 统一管理：多个 AI 账号一个后台收口，不用到处切换
### Sub2API 的核心能力

- 支持多种上游：Claude、Codex、Gemini、Antigravity 等
- API Key 管理：生成自己的 Key，控制访问权限
- 鉴权转发：合法请求转上游，非法请求直接拦截
- 用量统计：每个 Key 的调用量、费用一目了然
- 并发控制：避免单个账号被限流
---

## 部署方式选择

Sub2API 文档里有三种部署方式：脚本安装、Docker Compose、源码编译。个人用户最推荐 Docker Compose，用官方 docker-deploy.sh 脚本配合 docker-compose.local.yml 一键部署。

它会自动准备好 PostgreSQL、Redis 和 Sub2API 本体，不需要单独装数据库，也不需要自己编译前后端。local 版本会把数据放在当前目录下，备份迁移直接打包整个目录就行。

### 部署前准备

- 一台 Linux 服务器（普通 VPS 就够了）
- Docker + Docker Compose v2
- curl + openssl
- 建议准备一个域名（非必需，测试可用 IP）
---

## 完整部署步骤

### 第一步：创建部署目录

登录服务器，创建一个单独目录：

```bash
mkdir -p sub2api-deploy
cd sub2api-deploy
```

### 第二步：运行官方部署脚本

```bash
curl -sSL https://raw.githubusercontent.com/Wei-Shaw/sub2api/main/deploy/docker-deploy.sh | bash
```

这个脚本会自动完成以下工作：

- 下载 Docker Compose 配置
- 下载 .env.example 并生成 .env
- 自动生成 POSTGRES_PASSWORD
- 自动生成 JWT_SECRET
- 自动生成 TOTP_ENCRYPTION_KEY
- 创建 data/、postgres_data/、redis_data/ 目录
注意：脚本自动生成的密钥不需要手动修改，但生成后最好把终端内容保存下来，.env 文件不要泄露。

### 第三步：启动服务

```bash
docker compose up -d
```

查看运行状态：

```bash
docker compose ps
```

查看启动日志：

```bash
docker compose logs -f sub2api
```

首次启动时 Sub2API 会自动完成数据库迁移和初始化。如果没有在 .env 里手动设置 ADMIN_PASSWORD，管理员密码会自动生成。用以下命令查看：

```bash
docker compose logs sub2api | grep "admin password"
```

### 第四步：打开后台

浏览器访问 http://服务器IP:8080，默认管理员邮箱 admin@sub2api.local，密码查看日志中自动生成的那一行。如果想自定义管理员信息，可以在 .env 中配置：

```plain text
ADMIN_EMAIL=你的邮箱
ADMIN_PASSWORD=你的密码
```

改完之后重启：

```bash
docker compose restart
```

### 第五步：接入上游账号

服务跑起来之后，在管理后台添加上游账号。Sub2API 支持 OAuth 和 API Key 两种接入方式，可接入 Claude、Codex、Gemini、Antigravity 等服务。

个人建议先接一个最常用的上游账号，确认能正常调用，再逐步增加。不要一次性配置太多账号和分组。

### 第六步：创建 API Key

上游账号添加好后，在后台创建自己的 API Key。之后客户端调用时，用这个 Key 访问 Sub2API 即可。

调用链路：客户端 → 你的 Sub2API → 上游 AI 服务

例如给 Claude Code 配置：

```bash
export ANTHROPIC_BASE_URL="http://localhost:8080/antigravity"
export ANTHROPIC_AUTH_TOKEN="sk-xxx"
```

如果部署在服务器上，把 localhost:8080 换成你的域名或服务器地址。

---

## HTTPS 配置建议

直接用 http://服务器IP 测试还行，但不适合长期使用。API Key 和请求内容会走明文 HTTP。推荐配置域名 + HTTPS + 反向代理。

项目里提供了 Caddyfile 示例，Caddy 的优势是自动签 HTTPS 证书，个人用户比 Nginx 省心。如果用 Nginx，搭配 Codex CLI 时需要在 http 块里加：

```plain text
underscores_in_headers on;
```

否则 Nginx 可能丢掉带下划线的请求头，影响多账号环境下的粘性会话。

---

## 日常维护

### 更新

```bash
docker compose pull
docker compose up -d
```

使用本地目录版本，数据不会因为镜像更新而丢失。

### 备份和迁移

这也是 Docker Compose 方案的好处。先停服务，打包整个目录：

```bash
docker compose down
cd ..
tar czf sub2api-deploy.tar.gz sub2api-deploy/
```

迁移到新服务器后解压再启动：

```bash
tar xzf sub2api-deploy.tar.gz
cd sub2api-deploy
docker compose up -d
```

配置、数据库、Redis 数据全在里面。

---

## 注意事项

- .env 不要丢：里面有数据库密码、JWT 密钥、TOTP 加密密钥，密钥乱改可能导致登录失效
- 不要长期裸奔 HTTP：测试可以，长期用建议上 HTTPS
- Nginx 反代要保留下划线请求头：给 Codex CLI 用时加 underscores_in_headers on
- 先跑通一个上游账号：不要一开始就配置一堆，个人使用先追求稳定调用
---

## 写在最后

Sub2API 的 Docker Compose 一键部署方案，把应用、PostgreSQL、Redis 都放进一套 Compose 里，部署命令少，后期备份也简单。

你需要做的就是三件事：准备一台服务器、运行官方部署脚本、在后台添加上游账号并生成 API Key。跑通之后，你就有了一个完全属于自己的 AI API 中转站。


