---
date: "2026-05-08"
type: "Post"
tags:
  - "热门文章"
  - "Cloudflare"
  - "工具"
  - " 开源"
title: "SubsTracker：一个跑在 Cloudflare Workers 上的订阅管理神器"
description: "推荐开源项目 SubsTracker，基于 Cloudflare Workers 部署的订阅管理工具，支持 Telegram、Bark 等多渠道到期提醒，还有农历显示、多币种汇率换算和支出仪表盘。"
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=substracker-subscription-manager-cf-workers"
---

[//]: # (notion-sync-id: 359874cb-3972-8127-b138-e61c187c166e)

你有多少个订阅服务在续费？视频会员、音乐会员、云存储、各种 SaaS 工具……算一算，每个月不知不觉就花出去不少钱。等到扣款短信来了才发现，有的早就不用了。

最近发现了一个开源项目 **SubsTracker**，正好解决这个问题。它跑在 Cloudflare Workers 上，帮你追踪所有订阅的到期时间和花费，到期前还会主动提醒你。

项目地址：https://github.com/wangwangit/SubsTracker

---

## 项目概览

SubsTracker 是一个轻量级的订阅管理工具，完全运行在 Cloudflare Workers 上，不需要自己的服务器。部署只需要一条命令，通过 Wrangler 自动创建 KV 存储并部署 Worker。

### 核心能力

- **订阅管理**：添加、编辑、停用订阅，支持自定义续订周期
- **多渠道提醒**：Telegram、企业微信、Bark、Server酱、PushPlus、邮件、Webhook 等 7+ 渠道
- **提前预警**：可设定到期前几天提醒，不会错过续费
- **支出仪表盘**：可视化展示每月/每年的订阅花费
- **多币种汇率换算**：不同币种的订阅统一换算对比
- **农历显示**：贴心的农历日期适配
- **批量续订**：支持一键批量操作
- **深色模式 + 移动端适配**：手机上用也很舒服
---

## 部署方式

部署非常简单，只需要安装 Wrangler CLI 然后跑一条命令：

```bash
git clone https://github.com/wangwangit/SubsTracker
cd SubsTracker
npm install
npm run deploy:safe
```

执行 `deploy:safe` 后会自动创建 Cloudflare KV 命名空间并部署 Worker，整个过程几分钟就能搞定。

---

## 适合谁用

- **订阅服务多的人**：视频、音乐、云服务、AI 工具……统一管理不再遗漏
- **注重开支的用户**：支出仪表盘让你清楚每一分钱花在哪里
- **喜欢自托管的人**：完全开源，数据在自己的 Cloudflare 账户里
- **多人协作场景**：支持多人共享订阅清单，适合家庭或小团队
---

## 写在最后

SubsTracker 把订阅管理这个需求做得很扎实——多渠道提醒、支出可视化、一键部署，基本覆盖了日常使用的所有场景。对于订阅服务越来越多的我们来说，这类工具确实值得部署一个。

---


