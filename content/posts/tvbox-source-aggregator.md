---
date: "2026-05-25"
type: "Post"
tags:
  - "TVBox"
  - "源聚合"
  - "Cloudflare"
  - "免费搭建"
  - "自部署"
title: "手把手搭建你自己的 TVBox 源聚合服务"
description: "TVBox 源聚合服务搭建教程，从零配置到稳定运行，支持多源聚合、自定义接口，电视盒子用户的影视聚合利器。"
categories:
  - "教程"
image: "https://bing.ee123.net/img/rand?seed=tvbox-source-aggregator"
---

[//]: # (notion-sync-id: 36b874cb-3972-8168-a9d0-f7e459ce9850)

用 TVBox 看剧的人都知道一个痛点：源经常失效，今天能看的明天就打不开了，得不断找新源、手动换地址。

最近看到一篇教程，思路很巧妙——与其不断换源，不如把多个源自动聚合成一个稳定地址。部署在 Cloudflare Workers 上，全程免费，不需要自己买服务器。

项目开源地址：[https://gitee.com/tengxiaobao/tvbox-source-aggregator](https://gitee.com/tengxiaobao/tvbox-source-aggregator)

---

## 部署后能得到什么

整个部署完成后，你会得到一套完整的 TVBox 源聚合系统：

- 一个专属地址（如 [https://tvbox.你的域名.com/），TVBox](https://tvbox.xn--6qqv7i2xdt95b.com/），TVBox) 直接填这个地址就能用
- 一个管理后台（/admin），在网页上添加、删除你的源
- 一个监控页面（/status），随时查看聚合状态
- 每天自动更新，定时抓取所有源 → 测速 → 去重 → 合并
![TVBox 聚合架构图](https://external-content.duckduckgo.com/iu/?u=https://mmbiz.qpic.cn/mmbiz_png/eelDybicYvDBpsmwOLOHtXiaep5fhUHuh5eMib015ib6qNHd4GicUzhra3DAIlibbeAvNL9mCI7PQwib7t95BjhRJlDlXn6WoqFno1fYicuIuXcwFK4/640?wx_fmt=png)

## 部署步骤（全程免费）

整个部署过程需要 Cloudflare 账号 + 一个域名，大约 15 分钟。

### Step 1：Fork 并克隆仓库

```bash
git clone https://gitee.com/你的用户名/tvbox-source-aggregator.git
cd tvbox-source-aggregator
npm install
```

### Step 2：登录 Cloudflare 并创建 KV 存储

```bash
npx wrangler login
npx wrangler kv namespace create KV
```

记下返回的 KV ID，编辑 wrangler.toml 填入配置。

### Step 3：设置密码并部署

```bash
echo "你的密码" | npx wrangler secret put ADMIN_TOKEN
echo "你的Token" | npx wrangler secret put REFRESH_TOKEN
npm run deploy
```

部署成功后，你会得到一个 *.workers.dev 地址。建议绑定自定义域名，国内访问更稳定。

![管理后台界面](https://external-content.duckduckgo.com/iu/?u=https://mmbiz.qpic.cn/mmbiz_png/eelDybicYvDDibHp3XKdnHMybuicpbJyk8SaDeuk22hERohqt3C1SImA7dHoOMbPf5MPVr431DuT2mNSBpppcD6U46y6DzEZlxP7kIvt2Pdg1s/640?wx_fmt=png)

### Step 4：添加源并在 TVBox 中配置

打开管理后台登录后，把你现有的 TVBox 接口地址添加进去，点一下「刷新」，等待十几秒即可。

TVBox 客户端填入你的聚合地址：

```plain text
https://tvbox.你的域名.com/
```

保存后，内容就会自动加载出来。

## 使用感受

部署完成后基本不用再管了——系统每天自动更新，失效的源会被自动过滤掉。你只需要偶尔往管理后台加几个新源。

源的维护从"手动换地址"变成了"系统自动聚合"，体验好了不止一个档次。如果你手上也有 TVBox，值得一试。

---

全程免费，Cloudflare Workers 的免费额度完全够用。有动手能力的可以试试。


