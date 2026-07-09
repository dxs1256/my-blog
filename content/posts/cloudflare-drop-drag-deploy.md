---
date: "2026-07-09"
type: blog
tags:
  - 工具
  - Cloudflare
  - 免费
title: "拖个文件夹就能上线"
description: "Cloudflare 新出的 Drop 工具，把文件夹往浏览器一拖就能全球上线，不用注册不用服务器，门槛低到离谱。"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=cloudflare-drop-drag-deploy"
---
[//]: # (notion-sync-id: )

刚部署一个演示站，本来想走 GitHub Pages 或者 Vercel，结果想想还得切分支、配构建、等 CI 跑完……我就想给人看个 HTML 原型而已，至于吗？

Cloudflare 大概也烦了这种场景，直接搞了个新玩具叫 **[Cloudflare Drop](https://www.cloudflare.com/drop/)**，上线方式简单到离谱：**把文件夹往浏览器里一拖，网站就上线了**，跑在全球边缘网络上，哪儿访问都是毫秒级延迟。

项目地址：https://www.cloudflare.com/drop/

## 🎯 这是什么东西

Cloudflare Drop 是 Cloudflare 刚推出的零门槛静态网站部署工具。核心逻辑就一句——扔掉构建工具、扔掉 CI/CD、扔掉服务器配置，**本地文件夹直接拖上去就行**。

![Cloudflare Drop 界面](https://i.ibb.co/Y742fRFY/003ffd055e93.png)

整个页面就是一个拖拽区 + 两个按钮（选文件夹 / 选 zip），没有任何多余的东西。

## ⚡ 到底有多简单

全程四个字：**零门槛起步**。

| 步骤 | 说明 |
|------|------|
| 1️⃣ 准备文件 | 写好 HTML/CSS/JS，放一个文件夹里 |
| 2️⃣ 打开网页 | 访问 https://www.cloudflare.com/drop/ |
| 3️⃣ 拖上去 | 把文件夹拖进浏览器窗口，或者点按钮上传 |
| 4️⃣ 上线 | 几秒后你的网站就在全球边缘网络上生效了 |

**关键亮点：全程不需要注册账号，不需要绑定域名，不需要配置任何服务器。**

## 🔍 什么场景用得上

最对口的场景其实很明确：

- **临时演示** — 给客户看个原型，丢个文件夹完事，不用折腾部署流程
- **分享静态页面** — 做个活动页、落地页、或者简单的信息展示，拖上去就能给链接
- **测试和原型验证** — 本地写好直接丢上去看看效果
- **临时文件转网页** — 把 Markdown 转成 HTML 文件夹，拖上去就是一个在线文档

![推文截图](https://i.ibb.co/jvGjKydw/4ce36a04fb98.jpg)

## ⏳ 一个坑：60 分钟过期

没登录认领的部署只会保留 60 分钟。如果只是做个临时演示或者给朋友瞄一眼，够用了。想长期留着——点一下登录，认领到你的 Cloudflare 账号就行，之后就一直在。

## 🧠 说人话

Cloudflare Drop 不是要取代 GitHub Pages 或者 Vercel——它是一个**更轻更快的选择**，专门解决"我就想让人看看这个页面"的需求。

比它更简单的建站方式，目前确实想不出来。拖个文件夹，等着就行。