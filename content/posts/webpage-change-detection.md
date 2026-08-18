---
date: "2026-08-05"
type: blog
tags:
  - 工具推荐
  - 开源
  - 监控
title: "全网网页盯盘，变动自动通知你"
description: "changedetection.io：32.7k Star 的开源网页监控工具，支持 AI 智能摘要、可视化选区域、Docker 一键部署，商品降价/补货/内容变动第一时间推送"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=webpage-change-detection"
---

想监控某个商品降价，但不想天天刷新页面？想知道某个网页有没有偷偷改内容？或者想第一时间知道某位大佬的推文被删了？

**changedetection.io** 就是干这个的——一个开源的网页变动监控工具，GitHub 上狂拽 **32.7k Star**。

项目地址：https://github.com/dgtlmoon/changedetection.io

## 这是什么

简单说，它就是「全网网页盯盘外挂」。你告诉它监控哪个页面，它定时去检查，一旦页面内容发生变化，立刻推送通知给你。

不管是商品降价、库存补货、网页偷偷打补丁、还是某篇文章被修改，哪怕只变了一个字，它都能第一时间告诉你。

![changedetection.io 概览界面](https://i.ibb.co/pvYx7ZcM/f28854e08f36.png)

## 🔥 核心绝活

**可视化画框监控**——用鼠标在页面上框选你要监控的区域，自动跳过广告、导航栏、页脚等无关内容。只关注你关心的那部分，减少噪音。

**AI 智能去噪摘要**——这是最近加入的王炸功能。接入 GPT-4o-mini、Ollama 本地大模型等 AI 后，不再死板地报「网页变了」，而是能帮你归纳出「降了 50 块」或「新增了某某功能」。写个自然语言规则就能过滤所有噪音，只接收有价值的通知。

![AI 可视化选择器监控区域](https://i.ibb.co/B55pMxm2/36938e0e0ecc.png)

**无缝对接通知通道**——微信、钉钉、Telegram、Discord、邮件、Slack、Webhook……你能想到的通知渠道基本都支持。基于 Apprise 通知库，配置一条 URL 就能搞定。

**自动模拟点击操作**——支持 Browser Steps 功能，自动登录网站、自动点同意 Cookie、自动翻页，完成一系列操作后再检测页面变化。监控需要登录的页面也不在话下。

**支持本地私有化部署**——Docker 一键拉起，数据完全在你手里，不用担心隐私泄露。

![变动对比与通知配置](https://i.ibb.co/wZcQr9TW/7fee3e0f5f27.png)

## 🛠️ 更多实用功能

- **多种触发条件**：按文本触发、按 CSS 选择器忽略、用正则提取，灵活度很高
- **XPath / CSS / JSONPath / jq 定位**：精确到页面上的某个元素，连 JSON API 的数据变化也能监控
- **PDF 文件监控**：跟踪 PDF 文档内容变化，适合监控政府文件、产品手册等
- **定时调度**：支持按时间、时区、工作日/周末设置检查频率
- **代理支持**：可配置每个监控任务走不同的代理，不怕被封
- **Chrome 扩展**：一键把当前页面加入监控列表
- **REST API**：完整的 API 接口，方便自动化管理

## 🚀 部署方式

Docker 一键启动：

```bash
docker run -d --restart always -p 5000:5000 \
  -v datastore-volume:/datastore \
  --name changedetection dgtlmoon/changedetection.io
```

或者用 docker-compose：

```bash
git clone https://github.com/dgtlmoon/changedetection.io
cd changedetection.io
docker compose up -d
```

访问 `http://localhost:5000` 即可开始使用。

也支持 pip 安装，还提供托管服务（$8.99/月，省去自己维护的麻烦）。

## 🎯 适合谁用

- **薅羊毛党**：监控商品降价、补货通知，第一时间下单
- **站长/运维**：监控网站异常变动、安全告警
- **信息收集者**：跟踪政策文件、新闻更新、竞争对手动态
- **自动化玩家**：把网页监控作为触发条件，联动其他自动化工具

📎 项目信息：GitHub [dgtlmoon/changedetection.io](https://github.com/dgtlmoon/changedetection.io) | 官网 https://changedetection.io | 许可证 Apache-2.0

我自己的用法是监控几个想买的东西等降价，搭配 Telegram 通知，手机收到推送就去下单。省了天天手动刷页面的精力，值了。