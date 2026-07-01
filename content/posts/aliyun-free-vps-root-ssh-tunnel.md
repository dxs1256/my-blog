---
date: "2026-06-17"
type: "Post"
tags:
  - "热门文章"
  - "阿里云"
  - "VPS"
  - "免费"
  - "SSH"
  - "Cloudflare"
  - "隧道"
  - "教程"
title: "阿里云免费 2C4G 30GB VPS 获取 root 权限，通过 Cloudflare 隧道 SSH 连接"
description: "阿里云 AgentScope 免费提供 2C4G 30GB SSD 的 VPS 用于部署 QwenPaw。通过 Cloudflare Zero Trust 隧道获取 root SSH 访问权限后，还可以在这台机器上搭建其他服务。"
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=aliyun-free-vps-root-ssh-tunnel"
---

[//]: # (notion-sync-id: 382874cb-3972-81a3-9789-f15b70409a10)

阿里云的 AgentScope 平台最近推出了一项活动：免费提供一台 2 核 CPU、4GB 内存、30GB SSD 的云服务器，预装 QwenPaw。直接通过浏览器就能用上 QwenPaw 的 AI 助手功能。

不过这台机器默认只暴露了 QwenPaw 的 Web 端口，SSH 隐藏在 NAT 后面，没法直接连上去。如果你需要 root 权限进去装点别的服务——比如搭个下载器、跑个定时任务、挂个代理——就需要想办法把 SSH 通过隧道暴露出来。

好在操作不复杂，借助 Cloudflare Zero Trust 的 TCP 隧道功能，几分钟就能搞定。

AgentScope 部署地址:[https://platform.agentscope.io/deploy](https://platform.agentscope.io/deploy)

---

## 🎯 整体思路

这台 VPS 本身没有公网 IP，走 NAT 共享出口。SSH 服务其实已经在跑了，只是没有暴露到公网。我们要做的是：在 VPS 上安装 cloudflared，建立一个到 Cloudflare 的 TCP 隧道，然后本地也装 cloudflared 通过隧道连接回去。

Cloudflare Zero Trust 的免费套餐足够覆盖这个用量，不需要额外付费。

## 📋 详细步骤

### 步骤一：一键部署 QwenPaw

打开 AgentScope 的部署页面，注册登录后点击一键部署。部署成功后会出现一个「打开 QwenPaw」的按钮，点击进入 QwenPaw 的 Web 界面。

![AgentScope 部署页面](https://i.ibb.co/PzFxG5Mx/8c0f60815a9d.png)

### 步骤二：让 QwenPaw 帮你配置隧道

进入 QwenPaw 后，直接用它的模型对话。推荐用自定义模型来减少踩坑（免费的 DeepSeek 或通义千问都行）。跟 AI 助手说：

帮我把 SSH 跑到 Cloudflare Zero Trust 走隧道，让我从外面连

QwenPaw 内置了执行命令的能力，它会自动在机器上安装 cloudflared 并配置隧道。过程中如果提示需要 Tunnel Token 或域名，按提示提供即可。

![QwenPaw 对话界面](https://i.ibb.co/DPkzxKC3/49cadc65210a.png)

![QwenPaw 执行安装 cloudflared](https://i.ibb.co/PzhSC0DR/8e34f2e37dd2.png)

### 步骤三：在 Cloudflare Zero Trust 中配置隧道

登录 Cloudflare 控制台，进入 Zero Trust → Networks → Tunnels。创建一条 TCP 隧道，把 VPS 上的 SSH 端口（默认 22）映射到一个自定义域名或通过 Cloudflare 的边缘网络暴露。

创建完成后，Zero Trust 会生成一个 Tunnel Token，把它提供给 QwenPaw 完成隧道的认证连接。

![Cloudflare Zero Trust 配置](https://i.ibb.co/21DCYRtc/c17d9b15d3a6.png)

![创建隧道](https://i.ibb.co/dJW9g2Tf/e17df05f58f3.png)

### 步骤四：本地安装 cloudflared

本地机器也需要安装 cloudflared 客户端才能通过隧道连接 SSH。下载对应系统的版本：

Windows：https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe

macOS：brew install cloudflared

Linux：根据发行版安装对应包

![cloudflared 配置](https://i.ibb.co/0jPVW8Wc/1a2ec3bf712a.png)

### 步骤五：本地连接 SSH

配置好本地 cloudflared 后，使用 SSH 客户端连接：

主机地址填 127.0.0.1，端口填你在隧道中映射的本地端口。用户名 root，密码就是在 VPS 上设置的 root 密码。

![SSH 连接配置](https://i.ibb.co/fdDdYm83/6ffb33fb7a3a.png)

连接成功后，你会进入这台阿里云 VPS 的 root shell。接下来想装什么就装什么。

![SSH 连接成功](https://i.ibb.co/RkFyvPy1/41726fdb8f8a.png)

![终端操作界面](https://i.ibb.co/fdjLdxyF/fcc1e4ab5bfa.png)

## 🔧 拿到 root 后能做什么

2C4G 30GB SSD 的配置虽然不算高，但跑一些轻量服务绰绰有余：

- 搭建 frp 或哪吒探针，纳入你的服务器管理网络
- 跑定时脚本：签到、监控、数据采集
- 挂载 Alist 或 Rclone，做文件中转
- 部署轻量 Web 服务：导航页、短链接、状态页
- 作为 WireGuard/Tailscale 节点，打通内网
唯一的限制是 NAT 公网出口，无法直接暴露端口给公网——但既然已经有了 Cloudflare 隧道，需要用到的服务都可以用同样的方式穿透出来。

## 💡 注意事项

- 这台机器的本质是一台容器化的 VPS，系统层面做了限制，但不影响大多数常规操作
- QwenPaw 自带的 AI 助手能力很强，配置隧道这种操作完全可以在对话中完成，不需要你自己敲命令
- Cloudflare Zero Trust 的免费套餐每天有 100MB 数据限制，SSH 操作这点流量完全够用
- 如果不想用 Cloudflare，Tailscale 或蒲公英也是可行的替代方案
总体来说，阿里云这次送的机器虽然不是传统独立 VPS，但对想白嫖一台云服务器的人来说，2核4G的配置已经相当大方了。配合 Cloudflare 隧道拿到 root 之后，它和一台常规 VPS 用起来差别不大。


