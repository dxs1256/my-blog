---
date: "2026-09-07"
type: blog
tags:
  - Cloudflare
  - 开源
  - 自托管
title: "Workers 免费版升到 64MB，10 个开源项目免费跑"
description: "Cloudflare Workers 免费额度从 3MB 涨到 64MB 后，我整理了 10 个可以直接部署的开源项目，从临时邮箱到 AI 语音转文字都有。"
categories:
  - 自托管
image: "https://bing.ee123.net/img/rand?seed=cloudflare-workers-64mb-10-projects"
---

昨天 Cloudflare 做了一次很实际的更新：Workers 免费版大小限制从 3MB 提到了 64MB。

以前免费用户打包后稍微复杂点的项目就放不下，现在翻了二十多倍。这意味着很多以前只能上 VPS 的应用，现在可以直接跑在 Cloudflare 上了。

我翻了一遍 GitHub，从 awesome-cloudflare 里挑了 10 个比较成熟、个人用免费额度就够的项目。

## 1. cloudflare_temp_email：自己的临时邮箱

这是我最推荐折腾的一个。

注册网站经常要填邮箱收验证码，不想暴露主邮箱的话，临时邮箱是最实用的方案。这个项目可以直接用 Cloudflare 搭一个属于自己的临时邮箱，比如你有个域名 `ruguo.dev`，就能生成 `anything@ruguo.dev` 来收验证码。

它已经不是一个简单的转发脚本了，支持附件、多语言、自动回复，甚至 IMAP 和 SMTP。邮件接收、程序、数据库全都可以跑在 Cloudflare 上，不用自己维护邮件服务器。

![cloudflare_temp_email](https://i.ibb.co/7NdJQVNC/4ec008a9b29d.jpg)

项目地址：https://github.com/dreamhunter2333/cloudflare_temp_email

## 2. CloudFlare-ImgBed：自己的免费图床

经常写博客或者 Markdown 的人应该懂图床的痛点：图片传上去，直接拿到一个可引用的 URL，以后写文档再也不用塞 base64 或者到处存图片。

CloudFlare-ImgBed 就是一个完整的图床程序，支持 Cloudflare R2，也支持 Telegram、S3、WebDAV、Discord 等存储方式，自带网页管理界面。如果你平时写东西多，部署一个很省心。

![CloudFlare-ImgBed](https://i.ibb.co/p6rd8j6J/b4bc2702934d.jpg)

项目地址：https://github.com/MarSeventh/CloudFlare-ImgBed

## 3. CloudPaste：文件和文本分享

这个项目有点像 Pastebin + 文件快递的合体。

大段文字不用塞进聊天窗口，粘贴进去生成链接发过去就行。它还可以分享文件，支持密码保护、Markdown、阅后即焚，存储层支持 S3、OneDrive、Telegram 等。临时传文件、分享代码片段都很合适。

![CloudPaste](https://i.ibb.co/rfTmw7Nx/ed4d16695a48.jpg)

项目地址：https://github.com/ling-drag0n/CloudPaste

## 4. ZeroLink：安全分享密码和 API Key

有时候需要把密码、API Key、恢复码发给别人，直接扔微信或 Telegram 总觉得不放心。

ZeroLink 专门解决这个问题：你把秘密放进去，生成一个分享链接，对方打开才能看到内容。关键的是，内容在浏览器里就已经加密了，服务器本身不知道你分享的是什么，也不需要注册账号。

以后给朋友发敏感信息，至少比直接丢群聊优雅。

![ZeroLink](https://i.ibb.co/0R71bgBQ/29f17470c5ab.jpg)

项目地址：https://github.com/yclgkd/ZeroLink

## 5. memos-worker：私人笔记

喜欢记东西的人可以看看这个。

它是一个运行在 Cloudflare 上的笔记和知识库，支持 Markdown、文件附件、公开分享、Telegram 机器人，还可以按标签整理。你可以把它理解成一个非常轻量的私人 Notion。

看到一个有意思的网站、突然想到一个产品点子、写了一段代码，都可以记下来。最重要的是数据在自己手里。

![memos-worker](https://i.ibb.co/bjvTQ0QC/7e2d1db715bb.jpg)

项目地址：https://github.com/souvenp/memos-worker

## 6. whisper_cloudflare：AI 语音转文字

这个项目直接利用 Cloudflare 提供的 Whisper 模型做语音转文字。

上传一个音频文件，Cloudflare 帮你转成文字，还能直接生成 SRT 字幕。也就是说，你可以用它搭一个属于自己的 AI 音频转文字网站。

以前说到 AI 应用，大家第一反应是需要服务器、GPU 或者购买 API。现在连这种需求都可以直接跑在 Cloudflare 上了。

![whisper_cloudflare](https://i.ibb.co/NnxF43FH/c4f2564fbb38.jpg)

项目地址：https://github.com/thun888/whisper_cloudflare

## 7. GitPush：自动追踪 GitHub 项目更新

如果你关注很多开源项目，这个东西很实用。

比如你一直在跟 React、Next.js 或者某个 AI 项目，但不可能每天打开 GitHub 看更新了什么。GitPush 可以订阅这些项目，更新以后用 AI 帮你总结这次改了什么，然后直接通过邮件发给你。

它用到了 Cloudflare Workers、Workers AI、Workflow 和 Email Routing，已经是一个相当完整的 AI 应用了。

![GitPush](https://i.ibb.co/M5pQxWm0/01a396724da9.jpg)

项目地址：https://github.com/fatwang2/gitpush

## 8. cf-drop：文件传输助手

这个项目的定位非常简单：文件传输助手。

你可以上传文件，然后通过链接分享给其他设备或者朋友。文件存在 Cloudflare R2，信息存在 D1，支持密码保护、多文件下载，并且针对手机做了优化，甚至可以直接添加到手机桌面。

如果你经常需要在电脑和手机之间临时传文件，可以自己部署一个。

![cf-drop](https://i.ibb.co/LXmBNSsk/f96b9dffba9a.jpg)

项目地址：https://github.com/lyonbot/cf-drop

## 9. CloudNav：自己的网址导航

浏览器收藏夹用久了基本都会变成垃圾场——几百个网站塞进去，最后自己都不知道收藏了什么。

CloudNav 可以搭建一个属于自己的网址导航，比如把常用的 AI 工具、开发工具、网站全部放进去。它还有 Chrome 扩展，看到一个不错的网站可以直接收藏到自己的导航页。

任何设备打开一个网址就能看到自己的收藏，比浏览器本地收藏夹方便很多。

![CloudNav](https://i.ibb.co/hFnvF1ps/2721046fd17c.jpg)

项目地址：https://github.com/sese972010/CloudNav-

## 10. microfeed：自己的内容发布平台

最后一个稍微重量级一点。

microfeed 是一个完整的内容发布工具，支持文字、图片、播客、视频，然后自动生成网页、RSS Feed 和 JSON Feed。你可以拿它搭一个自己的博客、播客网站或者个人内容中心。

数据和文件都可以放在 Cloudflare 上，一个完整的内容发布平台不需要传统服务器。

![microfeed](https://i.ibb.co/PGpbWMg2/45faa4b0e9e8.jpg)

项目地址：https://github.com/microfeed/microfeed

## Cloudflare 已经越来越不像 CDN 了

把这些项目放在一起看，会发现一件很有意思的事情。

很多人对 Cloudflare 的印象还是 CDN、DNS、网站加速。但现在的 Cloudflare 已经完全不是这样了：Workers 可以运行程序，D1 可以当数据库，R2 可以存图片和文件，KV 可以保存数据，Email Routing 可以收邮件，Workers AI 甚至可以直接运行 AI 模型。

一个普通网站需要的绝大部分东西，Cloudflare 都已经准备好了，而且基本都有免费额度。对于一个每天只有几十、几百个人访问的个人项目来说，很多时候已经足够用了。

这也是为什么现在 GitHub 上出现了越来越多这种项目：不需要 VPS，不需要 Docker，不需要维护服务器，注册一个 Cloudflare 账号，绑定自己的域名，部署就能用。

如果你想继续挖这类项目，推荐一个 GitHub 仓库：https://github.com/zhuima/awesome-cloudflare

作者收集了大量可以利用 Cloudflare 部署的开源项目，还标注了项目目前是否仍在维护。以后在 GitHub 看到一个喜欢的开源工具，可能真的不用第一时间去买 VPS 了——先看看它能不能扔到 Cloudflare 上。
