---
date: "2026-06-25"
type: "Post"
tags:
  - "热门文章"
  - "Umami"
  - "网站统计"
  - "Vercel"
  - " 开源"
  - "隐私"
title: "Vercel 零成本部署 Umami，开源网站统计替代 Google Analytics"
description: "Umami 开源轻量网站统计工具，部署在 Vercel 零成本运行。替代 Google Analytics，隐私友好、界面简洁、实时数据，几分钟就能拥有自己的网站统计后台"
categories:
  - "教程"
image: "https://bing.ee123.net/img/rand?seed=umami-vercel-free-website-analytics"
---

[//]: # (notion-sync-id: 38a874cb-3972-81cd-a639-efda463b2fed)

很多人搭好了网站，却不知道每天有多少访客、用户从哪里来、哪个页面最受欢迎。靠感觉做网站，数据一片空白。

Umami 是一款开源、轻量、隐私优先的网站统计工具，可以理解为 Google Analytics 的简洁替代方案。部署在 Vercel 上零成本运行，几分钟就能拥有自己的网站统计后台。

项目地址:[https://github.com/umami-software/umami](https://github.com/umami-software/umami)

---

🎯 **Umami 的核心优势**

开源免费：MIT 协议，完全开源，没有隐藏收费。

界面简洁：没有 Google Analytics 那种复杂的配置面板，核心数据一目了然。

实时访问统计：访客数据秒级刷新，随时能看当前在线人数。

访客来源分析：自然搜索、社交媒体、直接访问等渠道占比清晰。

热门页面排行：哪些内容真正有人看，哪些页面需要优化，数据说话。

注重用户隐私：不追踪个人身份信息，无需 Cookie 弹窗提示，符合 GDPR 合规要求。

部署简单：Vercel 一键部署，无需购买服务器。

![Umami 数据面板概览](https://i.ibb.co/pvMjjcHw/umami-wechat-0.png)

🎯 **部署流程（Vercel 零成本方案）**

注册 Vercel 账号：访问 [https://vercel.com/，用](https://vercel.com/，用) GitHub 账号注册即可。

Fork 项目：打开 Umami 的 GitHub 仓库，点击 Fork 把代码复制到自己的账号下。

导入项目：登录 Vercel 控制台，点击 Projects → Add New，授权 GitHub 后找到 umami 仓库点击 Import。

首次部署：项目名称随意填写，其他选项保持默认，点击 Deploy。因为没有配置数据库，这次部署会失败，这是正常的。

创建数据库：在 Vercel 控制台点击 Storage → Create Database，类型选择 Neon（PostgreSQL），区域选新加坡（延迟最低）。数据库名字随意。

关联项目：进入刚创建的数据库管理页面，点击 Connect to Project，选择 umami 项目完成关联。

重新部署：回到 Deployments 页面，找到刚刚失败的部署记录，点击 Redeploy。等待几分钟后部署成功。

登录后台：部署成功后访问 Vercel 分配的域名，进入 Umami 后台。默认账号密码是 admin / umami。

![Vercel 部署 Umami 步骤](https://i.ibb.co/PG6gHxy7/umami-wechat-1.png)

🎯 **接入网站**

部署好 Umami 后，在后台添加网站：

进入 Settings → Websites → Add Website，输入你的网站名称和域名。

获取跟踪代码：添加完成后，复制 Umami 提供的 JavaScript 跟踪代码片段。

在你的网站每个页面（</body> 标签前）插入这段代码，访客数据就会自动上报到 Umami。

如果是静态站点（如 Hugo、Hexo、Astro），可以在主题模板的 footer 中全局添加。如果是 Next.js 等框架，可以在 _app.jsx 或布局组件中添加。

![Umami 数据统计页面](https://i.ibb.co/s9Jq531B/umami-wechat-2.png)

🎯 **和 Google Analytics 的对比**

隐私方面：Umami 不需要 Cookie 弹窗，Google Analytics 需要。

数据归属：Umami 自托管，数据完全归自己；GA 数据归 Google。

复杂度：Umami 界面简洁直观，GA 的报表层级深、学习成本高。

性能开销：Umami 追踪脚本约 2KB，GA 约 45KB，对页面加载影响极小。

合规成本：Umami 默认符合 GDPR，无需额外配置；GA 需要配合 Cookie 管理工具。

🔧 **其他部署方式**

除了 Vercel，Umami 也支持 Docker 自部署：

```plain text
docker run -d \
  --name umami \
  -p 3000:3000 \
  -e DATABASE_URL=postgres://user:pass@host:5432/umami \
  ghcr.io/umami-software/umami
```

需要先准备好 PostgreSQL 数据库（自建或使用 Neon、Supabase 等云服务）。

也可以直接用 Railway、Fly.io 等 PaaS 平台一键部署，原理和 Vercel 类似。

⚠️ **注意事项**

Neon 免费版 Postgres 有限制：15 个项目、每个项目 500MB 存储、每月的计算小时数有上限。个人网站流量完全够用，如果流量很大可能需要升级。

Umami 不会追踪个人身份信息，所以访客的 IP、浏览器指纹、设备信息等数据不可用。这是设计取舍——隐私优先意味着放弃某些精细化分析能力。

跟踪代码要放在每个页面，如果网站有多个子域名，需要分别在 Umami 中添加对应网站。

默认账号密码 admin / umami 首次登录后建议立即修改。Umami 没有内置邮件系统，修改密码需要在 Settings → Profile 中直接设置新密码。

💡 **适合人群**

博客站长：想了解哪些文章受欢迎、访客从哪来，优化内容方向。

AI 导航站/工具站：监控各个页面的点击和访问情况，调整布局。

个人主页/作品集：看看有没有人关注你的作品，数据驱动更新决策。

独立开发者：多项目统一管理，在一个面板看所有网站的数据。

初学者：不想折腾服务器，Vercel 零成本部署，几分钟上手。

很多人每天都在更新网站，却从不关注数据。Umami 最大的价值就是让你用最简单的方式，看懂网站流量和用户行为。免费、轻量、隐私友好，没有不试一下的理由。


