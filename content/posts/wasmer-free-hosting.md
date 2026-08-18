---
date: "2026-07-28"
type: blog
tags:
  - 免费资源
  - 虚拟主机
  - WebAssembly
title: "免费虚拟主机，PHP/Python/JS 都能跑"
description: "Wasmer Hobby 套餐免费：3 站点、月 10 万请求、150G 流量、1G 存储、支持绑定域名，基于 WebAssembly 部署各种语言框架。"
categories:
  - 自托管
image: "https://bing.ee123.net/img/rand?seed=wasmer-free-hosting"
---

我最近在折腾个人项目，想找个免费虚拟主机放着。一圈看下来，要么只支持 PHP，要么有广告，要么注册就要绑信用卡——烦得很。

后来发现 [**Wasmer**](https://wasmer.io/)，这东西是个基于 WebAssembly 的托管平台，能跑的花样比传统虚拟主机多太多了。

项目地址：https://wasmer.io/

## 🚀 注册简单，Hobby 套餐够用

不用手机号、不用绑卡，邮箱验证一下就能用。也可以用 Google 或 GitHub 账号直接登录。

注册完默认就是 Hobby 免费套餐，额度对于个人项目来说挺宽裕的：

![Wasmer Hobby 套餐定价页面](https://i.ibb.co/SwLq4sL2/6f6bac409332.png)

| 项目 | 额度 |
|------|------|
| 站点数 | 3 个 |
| 月请求 | 10 万次 |
| 流量 | 150 GB |
| 存储 | 1 GB |
| 数据库 | 100 MB |
| 自定义域名 | ✅ 支持 |
| 广告 | 无 |

## 📦 支持的语言和框架范围很广

部署方式有三种入口，上手没什么门槛：

**从模板一键部署** — WordPress、Flask、Hugo、Gatsby、Next.js、Docusaurus、Astro、Mkdocs 等十几种现成模板，选好就直接创建了。

![Wasmer 模板列表](https://i.ibb.co/07pXhqN/c2a494e3188e.png)

**导入 GitHub 仓库** — 绑定 GitHub 后直接选仓库，它会自动检测框架配置。

**手动上传** — 拖个文件夹上去，再选下语言/框架类型，提交就部署好了，全程十几秒。

支持的列表挺长：PHP、Python、Node.js、Hugo、WordPress、Laravel、Django、Jekyll、Astro、Gatsby、Next.js、Nuxt、Mkdocs、Staticfile，还有纯 JavaScript Worker。基本上常见的前后端框架都覆盖了。

## 🌐 绑定域名

每个站点支持绑自定义域名，免费用户也能用。DNS 配个 CNAME 指向分配的 `.wasmer.app` 域名就行。

![Wasmer 套餐功能对比](https://i.ibb.co/qMDJLtxB/276488698889.png)

## 🧪 实际用下来的感受

部署速度确实快，上传到上线十几秒搞定，比一些传统虚拟主机快多了。

有一点要注意：`.wasmer.app` 这个域名在国内移动网络下有人反馈打不开，但也有四川移动用户说正常访问。我试了下我这边的网络没问题，可能跟地区和 DNS 有关，建议绑个自定义域名省心。

另外评论区有人问 Python 是不是只支持 Flask 的"残血版"——我还没深测，如果你有特定依赖要跑，建议先验证再上车。

## 💬 小结

折腾一圈下来，Wasmer 的 Hobby 套餐算是目前免费虚拟主机里给得比较实在的：语言覆盖广、没广告、能绑域名、还不用绑卡。个人项目折腾或者放个 demo 站完全够用。

如果要挑毛病的话，就是文档对各个语言的具体支持程度写得不够细，有些框架的坑得自己踩了才知道。
