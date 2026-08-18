---
date: "2026-08-07"
type: blog
tags:
  - "工具"
  - "监控"
  - "免费"
title: "网页变化监控怎么选：WebDiff 与 changedetection.io 横评"
description: "网页变化监控工具横评：WebDiff（在线服务，8 类监控任务、AI 建任务、登录态同步）vs changedetection.io（32.7k Star 开源自部署、AI 去噪摘要、Docker 一键部署），一张对比表看清怎么选。"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=webdiff-web-monitor"
---

你有没有过这种经历：盯着一个商品页等降价，刷了一天手都酸了，结果晚上八点它偷偷调了价；想抢个活动名额，页面放出来的时候你正在开会；招投标公告、政策文件更新了，你隔几天才看到，黄花菜都凉了。

手动刷新这事儿，纯靠人力盯根本盯不过来。网页变化监控工具就是干这个的——按设定频率巡检，内容一变就通知你。目前主流方案分两派：

- **在线服务**：开箱即用，不用自己维护，代表是 [**WebDiff 网页侦探**](https://webdiff.perk-net.com)
- **开源自部署**：数据完全在自己手里，代表是 GitHub 32.7k Star 的 [**changedetection.io**](https://github.com/dgtlmoon/changedetection.io)

这篇把两款主流工具放在一起横评，看完你就知道该选谁。

## 📊 一图看懂：两款工具对比

| 维度 | WebDiff 网页侦探 | changedetection.io |
|------|----------------|-------------------|
| 形态 | 在线服务 + 桌面客户端 | 自部署（Docker/pip）或托管 |
| 部署成本 | 零部署，注册即用 | Docker 一条命令，数据在本地 |
| 监控类型 | 8 类（网页/接口/RSS/邮件/域名/证书/Ping/脚本） | 网页/JSON API/PDF 等，重网页与接口 |
| 建任务方式 | 可视化点选元素 + AI 对话建任务 | 可视化画框选择器 + 规则配置 |
| AI 能力 | AI 把自然语言转成任务 | AI 去噪摘要（GPT/Ollama 等） |
| 登录态页面 | ✅ cookie plus 同步登录态 | ✅ Browser Steps 自动操作 |
| 通知渠道 | 微信/钉钉/飞书/邮件/Webhook 等 | Apprise 全家桶（微信/Telegram/Discord…） |
| 开源 | ❌ 闭源 | ✅ Apache-2.0 全开源 |
| 价格 | 免费版够日常用，高频/多任务需会员 | 免费自部署，托管版 $8.99/月 |

## ✅ WebDiff 网页侦探：在线服务派

核心就一句话：**按设定频率巡检，内容一变就通知你。** 一共支持 8 类监控任务，全在一个界面里管理：

| 任务类型 | 盯什么 | 典型场景 |
|---------|--------|---------|
| 网站内容 | 页面元素变化 | 商品比价、公示公告、活动报名 |
| HTTP 请求 | 接口状态码/响应体 | API 健康检查、接口巡检 |
| RSS 订阅 | 新条目/字段变化 | 博客、播客更新提醒 |
| 邮件提醒 | 新邮件标题/发件人/正文 | 重要邮件过滤推送 |
| 域名到期 | WHOIS 注册到期时间 | 防止域名被抢注 |
| 网站证书 | SSL/TLS 有效期 | 证书临期告警 |
| Ping 检测 | 主机连通性与延迟 | 服务器宕机监测 |
| 自定义脚本 | JS/Python/Shell 输出 | 想怎么玩怎么玩 |

三个让人惊艳的点：

**1. 鼠标点哪监控哪。** 网站类任务用真实浏览器渲染页面，可视化点选元素，点完自动生成 XPath/CSS，零代码上手，不用懂技术也能配监控。

**2. 内置 AI 助手。** 直接说人话建任务：「监控某商品价格低于 100 就通知我」，AI 自动解析成任务草稿，还能多轮对话调整规则、频率和通知方式。敏感信息（Cookie、邮箱授权码）由你自己本地补充，不上传云端。

**3. 登录态也能同步。** 通过 cookie plus 功能把浏览器登录状态同步过去，需要登录才能看的后台页面照样监控——这是很多同类工具做不到的。

![WebDiff 官网首页](https://i.ibb.co/b54HMxMD/a3a478a275fa.png)

通知渠道多到挑花眼：pushplus（微信/短信/语音/App）、本地桌面/浏览器通知、钉钉机器人、企业微信机器人、飞书机器人、邮件、自定义 Webhook。我在钉钉和微信各绑了一个，手机震动从来没落空过。

![网站内容监控配置](https://i.ibb.co/TMzhhD7R/395a690009e3.png)

部署方式灵活：提供**桌面客户端**和 **Web 部署**两种方式，功能完全一致。任务、Cookie、执行快照默认保存在本机，微信扫码登录，会员权益云端同步。调度频率从每 1 分钟到自定义 Cron 都行，执行记录、差异对比、通知回执都能回查——就算漏了一次，也能翻记录看当时页面长啥样。

![快速上手文档](https://i.ibb.co/k27Gb3pP/ab927716f6e0.png)

## ✅ changedetection.io：开源自部署派

**可视化画框监控**——用鼠标在页面上框选你要监控的区域，自动跳过广告、导航栏、页脚等无关内容。只关注你关心的那部分，减少噪音。

**AI 智能去噪摘要**——接入 GPT-4o-mini、Ollama 本地大模型等 AI 后，不再死板地报「网页变了」，而是能帮你归纳出「降了 50 块」或「新增了某某功能」。写个自然语言规则就能过滤所有噪音，只接收有价值的通知。

![AI 可视化选择器监控区域](https://i.ibb.co/B55pMxm2/36938e0e0ecc.png)

**无缝对接通知通道**——微信、钉钉、Telegram、Discord、邮件、Slack、Webhook……你能想到的通知渠道基本都支持。基于 Apprise 通知库，配置一条 URL 就能搞定。

**自动模拟点击操作**——支持 Browser Steps 功能，自动登录网站、自动点同意 Cookie、自动翻页，完成一系列操作后再检测页面变化。监控需要登录的页面也不在话下。

**更多实用功能**：按文本/CSS 选择器/正则触发、XPath/JSONPath/jq 精确到元素（连 JSON API 的数据变化也能监控）、PDF 文件监控、定时调度（时区/工作日）、每任务独立代理、Chrome 扩展一键加入监控、REST API 方便自动化管理。

Docker 一键启动：

```bash
docker run -d --restart always -p 5000:5000 \
  -v datastore-volume:/datastore \
  --name changedetection dgtlmoon/changedetection.io
```

访问 `http://localhost:5000` 即可开始使用。也支持 pip 安装、docker-compose 编排，数据完全在你手里。

![变动对比与通知配置](https://i.ibb.co/wZcQr9TW/7fee3e0f5f27.png)

## 🎯 怎么选

- **不想碰服务器、要最快上手** → WebDiff，注册即用，8 类任务一个界面管完
- **要监控邮件/域名/证书/Ping** → WebDiff 覆盖更全
- **重视开源和隐私、有 Docker 环境** → changedetection.io，数据全在本地
- **要 AI 总结「变了什么」** → changedetection.io 的 AI 去噪摘要更成熟
- **要监控需登录的页面** → 两者都行：WebDiff 用 cookie plus，changedetection.io 用 Browser Steps

## 💡 一点提醒

WebDiff 免费版就能跑日常监控，高频巡检和更多任务配额属于会员权益；changedetection.io 自部署免费，托管版 $8.99/月。建议先拿一两个高频场景试起来，比如把常逛的商品页和常看的博客 RSS 先挂上，体验一下"被提醒"而不是"去刷新"的感觉。

网页这东西，更新不会等你。有个 7×24 的哨兵替你盯着，真能省下不少事。
