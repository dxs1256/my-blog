---
date: "2026-08-15"
type: blog
tags:
  - Cloudflare
  - 订阅管理
  - 开源
title: "Cloudflare 零成本部署订阅管理"
description: "一个基于 Cloudflare Workers 的轻量级订阅管理系统，部署零成本，支持 Telegram 等多种渠道推送到期提醒。"
categories:
  - 自托管
image: "https://bing.ee123.net/img/rand?seed=substracker-cloudflare-subscription"
---

我手机里现在躺着 7 个自动续费的订阅：iCloud、Netflix、机场、域名续费、eSIM 保号……每个月总有那么一两笔在账单日才想起来"哦原来我还开着这个"。

之前试过用日历提醒、备忘录，但要么忘了加，要么到期日改了还得手动改，麻烦。后来翻到一个国人写的开源项目 **SubsTracker**（⭐3.1k），部署在 Cloudflare Workers 上，一分钱不用花，管理订阅、到期提醒全搞定。

项目地址：https://github.com/wangwangit/SubsTracker

## 🎯 它是干什么的

一个基于 Cloudflare Workers + KV 的订阅到期提醒系统。在网页里管理你的所有订阅，到期自动通过 **Telegram / Bark / 企业微信 / ntfy / PushPlus / 邮件 / Webhook** 等 10 种渠道推消息给你。

说白了就是把你的"还有几天到期"这件事，从你脑子里搬到一个自动化的系统里。

## 部署有多简单

```bash
git clone https://github.com/wangwangit/SubsTracker.git
cd SubsTracker
npm install
export CLOUDFLARE_API_TOKEN=你的token
npm run deploy:safe
```

`deploy:safe` 一步到位：自动创建 KV 命名空间、绑定、部署 Worker。跑完终端会给一个 `https://subscription-manager.你的子域.workers.dev` 的链接，打开就能用。

默认账号 `admin / password`，**登录后第一件事就是改密码**。

## 功能亮点

### 订阅管理

支持增删改查、启用/停用、克隆（同构订阅如 eSIM 保号一键复制）、续订记支付、按状态/分类筛选。

周期模式有两种：

| 模式 | 场景 | 说明 |
|------|------|------|
| **循环订阅** | 会员续费 | 从当前到期日往后接，比如 6/15 到期、6/3 续费 → 新到期约 7/15 |
| **到期重置** | 保号卡 | 从支付日重新算整段周期，比如充值日起重新算 180 天 |

### 提醒规则

默认预设：到期前 7 天、3 天、1 天 + 到期当天。每条订阅可以配多条规则，灵活组合。

**注意语义**："到期前 N 天" = 剩余天数正好等于 N 的那天发一次，不是从第 N 天起每天发。想要多天提醒就加多条规则。

### 通知渠道（10 种）

Telegram、Bark、企业微信、ntfy、PushPlus、Server酱、Gotify、Webhook、Resend 邮件、NotifyX，基本覆盖了主流推送方式。

### 其他实用功能

- 农历周期支持（适合农历生日等场景）
- 多币种 + 仪表盘支出统计
- 备份导出/导入（迁移 Cloudflare 账号毫无压力）
- 第三方 API 调用接口（生成令牌后别的系统也能调你的通知服务）
- 调度日志：每条通知的命中/去重/跳过原因都能查到，排查问题很方便
- 批量续订：多个订阅一键批量操作
- 多人协作：支持共享订阅清单，适合家庭或小团队
- 深色模式 + 移动端适配：手机上用也很舒服

![SubsTracker 界面截图](https://i.ibb.co/9kYMrhLJ/2b49b424fddc.jpg)

## 适合谁用

- 手上有多个订阅（域名/VPS/机场/会员）经常忘记续费的人
- 喜欢 Cloudflare 生态、不想为此多掏服务器钱的人
- 需要一个轻量、可自托管、不依赖第三方服务的到期提醒工具

这个项目胜在**轻**——一个 Worker 搞定，不需要数据库，不需要服务器，甚至不需要域名（用 workers.dev 就行）。如果你已经在用 Cloudflare，部署就是两三分钟的事。