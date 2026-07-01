---
date: "2026-06-22"
type: "Post"
tags:
  - "热门文章"
  - "工具"
  - " 开源"
  - "GitHub"
  - "Twitter"
  - "Discord"
  - "Telegram"
  - "Cloudflare"
title: "给社媒链接换个前缀，嵌入预览秒变正常"
description: "FxEmbed 是一个开源工具，在 Twitter/X/Bluesky 链接前加个 fx 前缀，Discord、Telegram 就能正常展示视频、GIF、投票结果和图片墙。同时支持帖子翻译、API 数据获取、多图拼接等实用功能，基于 Cloudflare Worker 边缘计算架构，免费额度每天 10 万次请求。"
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=fxembed-social-media-link-embed-preview"
---

[//]: # (notion-sync-id: 387874cb-3972-814b-96bf-cc1a215c12cf)

在 Discord 或 Telegram 里甩一条 Twitter 链接，预览效果时好时坏——有时能出个标题，有时就是个光秃秃的链接，视频和 GIF 基本没戏。这个问题困扰我很久了。

后来发现了一个叫 FxEmbed 的开源工具，思路简单到让人怀疑：链接前面加个 fx，一切就正常了。

GitHub：[https://github.com/Robot-Inventor/fxembed](https://github.com/Robot-Inventor/fxembed)

---

## 🎯 痛点场景

用过 Discord 或 Telegram 分享链接的人应该都遇到过：Twitter/X 的链接发过去，对方看到的预览效果全看运气。有时候出个标题摘要算给面子了，视频、GIF、投票结果、图片墙这些基本不用指望，直接显示空白。

试过几个 embed 预览服务，要么配置太复杂，要么不稳定。直到看到这个项目，思路倒是简单粗暴——既然 Discord 和 Telegram 对某些域名的嵌入预览支持不完整，那就换个域名前缀，让它们重新识别。

## ⚡ 核心功能

### 链接转换

用法简单到不太像教程：

- Twitter/X 链接 → 前面加 fx：[https://fxtwitter.com/...](https://fxtwitter.com/...)
- X.com 链接 → 前面加 fixup：[https://fixupx.com/...](https://fixupx.com/...)
- Bluesky 链接 → 前面加 fx：[https://fxbsky.app/...](https://fxbsky.app/...)
改完之后再去 Discord 或 Telegram 发，视频能直接播放，GIF 能动，图片墙也能完整展开了。我试了几个不同类型的推文，效果都很稳定。

### 帖子翻译

链接末尾加语言代码（比如 /en），自动翻译帖子内容。关注海外技术动态的用户应该会喜欢这个功能——不用切到翻译软件来回看了，直接在聊天窗口里看到翻译结果。

### 获取原始 API 数据

把 X 链接域名换成 api.fxtwitter.com，直接拿到 JSON 格式的数据。对于做数据抓取或者二次开发的场景很实用，不用自己去解析网页结构了。

### 媒体链接提取

可以直接获取图片、视频的原始文件链接。如果你需要在其他平台上引用推文里的图片，这个功能省去了截图再上传的步骤。

![FxEmbed 效果](https://external-content.duckduckgo.com/iu/?u=https://i.ibb.co/cSRQ4vnw/326cc5ba3401.jpg)

### 多图拼接（Mosaic 模式）

多图推文在聊天软件里经常变成一连串链接，看起来很乱。Mosaic 模式把多张图拼成一张，显示更整齐。

### 额外能力

- Telegram Instant View：支持在 Telegram 中展开线程，查看完整对话
- 自动去追踪参数：自动清除链接中的 utm_source 等追踪参数，让链接更干净
## 🔧 技术背景

本质上就是一个 TypeScript 写的 Cloudflare Worker，边缘计算架构。免费额度每天 10 万次请求，个人用绰绰有余。

隐私方面做得不错：没有日志、没有数据库、没有广告追踪——Worker 跑完就释放内存，不留痕迹。

MIT 协议开源，也可以 Fork 到自己账户下部署，发布自己的实例。

## 💡 适合人群

- 重度 Discord/Telegram 用户：经常在群里分享链接，希望预览效果正常
- 需要跨平台分享社媒内容的人：发出去对方能看到完整的嵌入预览
- 内容创作者：经常需要在不同平台间搬运链接内容
- 对隐私有要求的技术用户：可以自部署实例，数据不走第三方服务
---

## 💭 写在最后

FxEmbed 是一个定位很清晰的小工具：解决一个具体的痛点，解决得很彻底，用起来几乎零成本。链接改个前缀就能搞定的事，没必要用那些重型的 embed 服务。

一个 Cloudflare Worker 就能跑起来的轻型工具，开源、免费、用完即走，对于效率优先的用户来说很值得收藏。


