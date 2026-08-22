---
date: "2026-08-22"
type: blog
tags:
  - 工具推荐
  - 开源
  - Cloudflare
  - 实用教程
title: "零成本自建导航站：CF-Navs"
description: "CF-Navs：跑在 Cloudflare Workers 上的个人导航面板，不用服务器，D1+KV 全边缘部署，支持 Sun-Panel 数据一键导入。"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=ling-cheng-ben-zi-jian-dao-hang-zhan-cf-navs"
---
[//]: # (notion-sync-id: ...)

自建导航面板这事儿，以前基本两条路：要么找个服务器跑 Docker（比如 Sun-Panel），要么忍受各种 SaaS 的免费额度限制。

[**CF-Navs**](https://github.com/lbjxr/CF-Navs) 给了第三条路——整个导航站直接跑在 Cloudflare Workers 上，前端、API、D1 数据库、KV 会话全在边缘，**不用任何服务器，免费额度内零成本**。

项目地址：https://github.com/lbjxr/CF-Navs

作者是 Sun-Panel 老用户，因为原版转收费且一年多没更新，就自己写了一个更贴合需求的替代品。

![CF-Navs 亮色首页](https://i.ibb.co/wFWSbfF6/2ea698691d86.jpg)

## 🎯 功能一览

- **两级分类导航**：所有一级分组同屏展示，组内二级横向切换；支持按书签标题、URL、描述、完整分类路径搜索
- **访问统计**：书签点击自动计数，后台看总点击、Top 20 排行和零访问列表
- **22 套内置主题**：亮暗模式、背景、遮罩、卡片尺寸透明度全可调；支持自定义页脚 HTML/CSS/JS
- **数据迁移**：支持 **Sun-Panel JSON 备份一键导入**、浏览器书签 HTML 导入
- **安全认证**：PBKDF2 密码哈希、Bearer Session、严格 CSP、登录失败限流
- **PWA 离线回退** + 图标懒加载 + 边缘缓存

![暗色主题](https://i.ibb.co/YBfFystX/d4f2638a9343.jpg)

## 🚀 部署：全程点鼠标

推荐走 Cloudflare 控制台部署，不需要本地装任何东西：

1. GitHub 上 Fork 仓库
2. Cloudflare 控制台 → Workers & Pages → 导入你的 Fork
3. 构建命令填 `npm run build`，部署命令填 `npx wrangler deploy`，生产分支 `main`
4. 首次部署后，Worker 会自动创建并绑定 D1 数据库和 KV 命名空间
5. 在 **设置 → 变量和密钥** 添加加密 Secret `SETUP_TOKEN`（随机长字符串）
6. 对最近的生产部署执行 Retry/Redeploy（让新部署读到 Secret）
7. 访问 `https://你的站点/install`，输入 SETUP_TOKEN，创建管理员账号
8. 装完把 SETUP_TOKEN 删掉或轮换

整个过程 10 分钟以内。唯一容易踩的坑是第 6 步——保存 Secret 后必须重新部署一次，否则 `/install` 读不到令牌。

技术栈是 Svelte 4 + Hono + D1/KV，代码质量不错，有完整的 Vitest 测试和 Chrome 回归脚本。

![后台设置页](https://i.ibb.co/mCK4rp5N/fde2fd7ba574.jpg)

## 💡 适合谁

- **Sun-Panel 用户想搬家**：JSON 备份直接导入，迁移无痛
- **没有服务器的人**：Workers 免费额度完全够个人导航站用
- **想要一个能自定义外观的起始页**：22 套主题 + 自定义 CSS/JS，折腾空间大

## 写在最后

导航站是个小东西，但每天打开浏览器的第一个页面就是它。CF-Navs 把部署门槛压到了"有个 GitHub 和 Cloudflare 账号就行"，数据在自己账号的 D1 里，不怕哪天服务关停。

MIT 协议，白嫖无忧。

<!-- ⟦ 已发布博客 CF-Navs 零成本自建导航站，3图推送成功 ⟧ -->