---
date: "2026-06-27"
type: "Post"
tags:
  - "热门文章"
  - "AutoScrapeFreeNodes"
  - "免费节点"
  - "代理"
  - " 开源"
  - "自动化"
title: "免费节点自动化聚合系统，一个平台搞定所有代理订阅"
description: "AutoScrapeFreeNodes 开源免费节点自动化抓取聚合系统，多源聚合、全协议兼容（Clash/V2ray/Sing-Box 等）、智能去重、自动更新，支持在线使用或自部署，一站式搞定代理订阅"
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=autoscrape-free-nodes-aggregator"
---

[//]: # (notion-sync-id: 38c874cb-3972-813a-87bc-db5b30a2603f)

每次要找免费代理节点，是不是得逛好几个网站、手动复制订阅链接、还得担心时效性和重复？更烦的是不同客户端用的格式还不一样——Clash、V2ray、Sing-Box，换来换去。

AutoScrapeFreeNodes 是一个开源的免费节点自动化抓取聚合系统，从多个公共渠道自动提取节点信息，去重后整理成 Clash、V2ray、Sing-Box、Shadowrocket 等多种协议格式，一站式订阅分发。

项目地址:[https://github.com/Re0XIAOPA/AutoScrapeFreeNodes](https://github.com/Re0XIAOPA/AutoScrapeFreeNodes)

---

🎯 **多源聚合抓取**

系统从多个高质量的公共渠道自动提取免费订阅信息，覆盖了当前主流的节点分享平台。你不需要记住十几个网站，一个平台就能拿到所有来源的聚合数据。

智能去重过滤：内置指纹识别逻辑，自动剔除重复的节点链接，保证订阅列表干净不冗余。

定时自动更新：支持定时同步机制，24 小时自动刷新，节点数据始终保持时效性。

🎯 **全协议兼容**

目前支持的协议格式包括：

Clash、V2ray、Sing-Box、Shadowrocket、Quantumult、SS/SSR、Trojan、Hysteria、WireGuard、Tuic、NaiveProxy、GoFlyway

不管你用哪个客户端，基本都能找到对应的订阅格式。每种协议都有独立的订阅链接，复制即用。

![AutoScrapeFreeNodes 控制台界面](https://i.ibb.co/Pvgzg6q5/asfn-dashboard.png)

🎯 **在线控制台即开即用**

部署后的控制台界面很清晰：顶部显示节点总数、活跃源站数量、同步频率和下次更新时间。节点列表按协议分类，每个节点都标注了协议类型、来源和对应的订阅链接，支持一键复制和直接打开。

协议筛选器支持快速切换查看不同协议的节点，不用在冗长的列表里手动翻找。数据刷新按钮可以手动触发更新，不必等定时任务。

🎯 **本地部署方案**

静态模式：直接打开 `public/index.html` 即可查看静态快照数据，零依赖。

完整模式（支持实时抓取）：

```plain text
git clone https://github.com/Re0XIAOPA/AutoScrapeFreeNodes.git
cd AutoScrapeFreeNodes
npm install
npm start
```

需要 Node.js 18.0 或更高版本。

Docker 部署：

```plain text
docker run -d \
  --name autoscrape \
  -p 3000:3000 \
  ghcr.io/re0xiaopa/autoscrapefreenodes:latest
```

Docker 镜像支持多架构（amd64 + arm64），树莓派也能跑。

![AutoScrapeFreeNodes 项目主页](https://i.ibb.co/WwR4m9N/asfn-screenshot.png)

🎯 **GitHub Actions 自动化同步**

项目深度集成了 GitHub Actions，提交代码后自动触发抓取流程，更新节点数据并发布到 GitHub Pages 或你配置的服务器。这意味着你 Fork 项目后基本不用手动操作，自动化流水线会帮你维护节点数据的时效性。

自定义订阅源：修改根目录的 `config.json` 文件，可以添加你要抓取的网站或自定义订阅链接。

```json
"sites": [
    {
      "url": "https://example.com/clash",
      "enabled": true,
      "description": "自定义节点源"
    }
]
```

🔧 **在线使用（最简单的方式）**

如果不想自己部署，直接访问在线控制台就能用：

打开 [https://asfn.awafuns.cn/](https://asfn.awafuns.cn/) 进入控制台

在协议筛选器中选择你的客户端类型（Clash / V2ray / Sing-Box 等）

点击对应节点旁边的复制按钮，获取订阅链接

将链接粘贴到你的代理客户端中即可使用

控制台会在页面显示下次自动同步的倒计时，数据 24 小时自动刷新。

⚠️ **注意事项**

免费节点的速度和稳定性无法与付费机场相比，适合临时使用、测试环境或作为备用线路。

节点的来源是公开渠道，不保证所有节点都能正常连接，建议多试几个节点筛选可用的。

自部署时需要 Node.js 18+，老版本系统可能需要先升级 Node.js。

Docker 部署需确保镜像能正常拉取，GitHub Container Registry 在国内部分网络环境下可能需要代理。

自动同步频率默认 24 小时，如需更短的更新间隔可以自行修改 GitHub Actions 配置。

💡 **适合人群**

经常需要免费节点做临时使用的用户，一个平台聚合多个来源，省去四处找订阅链接的时间。

使用多款代理客户端的人，AutoScrapeFreeNodes 提供多种协议格式，切换客户端时不需要重新找订阅。

想自建免费节点聚合服务的技术爱好者，部署简单，Fork 即用，自动化维护不费劲。

对节点时效性有基础需求的用户，24 小时自动同步保证数据不过于陈旧。

把多个渠道的免费节点聚合到一个地方，按协议分类、一键复制、自动更新——省的是重复劳动的精力，换来的是即开即用的便利。


