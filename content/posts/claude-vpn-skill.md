---
date: "2026-08-31"
type: blog
tags:
  - 开源
  - AI
  - 翻墙
  - VPS
  - Claude Code
title: "让 AI 帮你搭梯子：一句话完成部署和运维"
description: "claude-vpn-skill：Claude Code Skill，对 AI 说一句'帮我部署一个 VPN'，它会问你 9 个参数、SSH 登录 VPS、按 15 步部署 VLESS+XHTTP+TLS+Cloudflare CDN，输出可直接导入 Shadowrocket/v2rayN 的链接，后续加用户、续证书、排障都能对话完成。"
categories:
  - 软路由与网络
image: "https://bing.ee123.net/img/rand?seed=claude-vpn-skill"
---

自建翻墙节点这事，我几年前就试过：买 VPS、配 Cloudflare、装 Xray、申请证书、改 Nginx……一套流程下来折腾大半天，中间任何一步卡住就得从头排查。后来这类安装脚本越做越成熟，**一行命令能完成部署**——但问题变成了另一个：报错时脚本只会原地卡住，想加个用户、续个证书、排查一下连不上的原因，还是得翻文档自己动手。

最近在 GitHub 上看到 **claude-vpn-skill**（⭐113），思路又往前走了一步：把部署从"跑脚本"变成了"让 AI 干活"。

项目地址：https://github.com/ystyleb/claude-vpn-skill

## 🎯 它和安装脚本本质不同

我前几周写过 XHTTP-Installer 这类一行命令脚本，它们解决的问题是「把部署流程压缩成一条命令」。claude-vpn-skill 不是一个脚本，而是一个 **Claude Code Skill**——AI 的扩展能力包。区别在于：

| 维度 | 安装脚本 | claude-vpn-skill |
|------|---------|-----------------|
| 交互方式 | 命令行参数固定 | AI 会问你服务器 IP、域名、Cloudflare 凭据等 9 个参数 |
| 出错处理 | 报错就卡住 | AI 按 troubleshooting.md 诊断并修复 |
| 部署流程 | 一次性 | 15 步完整蓝图，随问随答 |
| 后续运维 | 重新跑脚本 | 对话式：「帮我加个用户」「证书要续期吗」「VPN 连不上了」 |

装好之后，你只需要对 Claude Code 说一句「帮我部署一个 VPN」，它会问你该问的问题，然后自己 SSH 登录 VPS 干活。

![claude-vpn-skill 仓库主页](https://i.ibb.co/VccjJJ1f/0db9bedf6703.png)

## 🔧 它实际部署什么

Skill 的核心是 `references/manual-deploy.md`——一份完整的 15 步部署蓝图，涵盖：

- **架构**：客户端 → Cloudflare CDN → Nginx（TLS 反代）→ Xray，真实 IP 藏在 CDN 后面
- **协议**：VLESS + XHTTP over TLS，替代老式 WebSocket，抗 GFW 检测更强
- **面板**：3X-UI（MHSanaei），Web 界面管理用户和流量
- **证书**：acme.sh + Cloudflare DNS 自动申请通配符证书，每 60 天自动续期

![claude-vpn-skill 架构与部署流程](https://i.ibb.co/cSx2mG0R/293dc399ea08.png)

部署完成会输出一条 VLESS 链接，直接导入 Shadowrocket、v2rayNG、v2rayN、Clash Verge 就能用。

## 🛡️ 安全设计是默认项

这一点是让我比较放心的地方——配置文件里默认开启了全套加固：

- **UFW 防火墙**：只放行 SSH / 80 / 443
- **X-UI 面板仅 localhost**：通过 SSH 隧道访问，不暴露公网
- **Fail2Ban**：SSH 暴力破解 3 次封 2 小时
- **伪装站点随机化**：每台 VPS 生成一个随机英文公司名（如 Atlas Ventures），防 GFW 批量指纹识别
- **TLSv1.2/1.3 only** + HSTS，安全头齐全

## 💬 日常运维也靠对话

这可能是它最实用的一面。官方使用场景里列了这些：

| 你说什么 | AI 会做什么 |
|---------|-----------|
| 「帮我部署一个 VPN」 | 新部署全流程 |
| 「VPN 连不上了」 | 按故障排查清单诊断 + 修复 |
| 「帮我加一个 VPN 用户」 | 通过 SSH 隧道进面板添加客户端 |
| 「证书要续期吗」 | 检查证书状态，必要时强制续期 |

![skill 安装与使用方法](https://i.ibb.co/nqgWVPkR/88e30d21a6f4.png)

## 🚀 怎么装

项目支持 Claude Code、Codex CLI、OpenCode，**最省事的装法是把安装指令整个丢给你的 AI**：

```
安装这个 skill：https://github.com/ystyleb/claude-vpn-skill
做法：git clone 后，把 skills/x-ui-deploy 复制到 ~/.claude/skills/，
装完验证能被识别，然后删掉临时目录。
```

AI 会自动识别自己用的是哪个 CLI、处理复制和清理。装完说一句「帮我部署一个 VPN」，剩下的交给它。

需要具备的前提条件：一台境外 VPS（Debian/Ubuntu）、一个接入 Cloudflare 的域名、Anthropic 账号或 API Key。

## ✍️ 我的判断

claude-vpn-skill 适合**已经在用 Claude Code / Codex CLI**、手上有 VPS 和域名、但又不想啃十几篇部署博客的人。相比之前的一键脚本，它的增量不是"更快"，而是**把部署之后的运维也纳入了对话**——加用户、续证书、排障这些高频操作，从此不用再翻文档。

提醒两点：一是它走 Cloudflare CDN 免费版有长连接软限速，日常觉得卡可以按文档再加一条直连节点做主力；二是**整套架构配合 AI 自动操作 SSH，安全性取决于你对 AI 的信任度**——建议部署后自己看一眼关键配置，不要完全当甩手掌柜。如果你连 VPS 和域名都没有，直接买商业机场更省心，这个 Skill 不适合你。