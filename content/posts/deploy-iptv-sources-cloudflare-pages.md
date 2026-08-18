---
date: "2026-07-11"
type: blog
tags:
  - "Cloudflare"
  - "IPTV"
  - "教程"
  - "Docker"
  - "直播"
title: "自建 IPTV 源：Cloudflare 和 Docker 两条路"
description: "自己搭 IPTV 直播源的两条路线：Cloudflare Pages 免费部署 iptv-sources 支持定时更新，或 Docker 一行命令跑 iptvs-app。从零到播放器直接看。"
categories:
  - 自托管
image: "https://bing.ee123.net/img/rand?seed=deploy-iptv-sources-cloudflare-pages"
---

想自己搞个 IPTV 直播源,又不想折腾复杂配置,现在有现成方案了。主流做法是两条路:**Cloudflare Pages 免费部署**和 **Docker 一行命令**,前者适合有 GitHub 账号想白嫖免费额度的,后者适合有 NAS 或 VPS 的。我把两条路都走了一遍,下面是从零到播放器能看的完整过程。

项目地址：https://github.com/yunnysunny/iptv-sources、https://hub.docker.com/r/hurryos/iptvs-app

## 📊 两条路怎么选

| 维度 | Cloudflare Pages | Docker (iptvs-app) |
|------|------------------|--------------------|
| 成本 | 免费（Pages 免费套餐） | 需要一台常开的机器（NAS/VPS） |
| 上手难度 | 稍高（GitHub + CF 控制台） | 一行命令 |
| 更新机制 | GitHub Actions 定时 / 空 commit 触发 | 首次登录自动更新源 |
| 产出 | m3u/ 目录（JSON + EPG 静态文件） | /iptv 的 m3u8、/txt 的 txt 文件 |
| 适合 | 想零成本 + 定时自动更新 | 有现成 Docker 环境、不想碰构建配置 |

## ☁️ 路线一：Cloudflare Pages 部署 iptv-sources

项目用 Node 开发,构建在 Cloudflare Pages 中触发。构建完成后,站点根目录对应仓库里的 `m3u/` 目录,包含 TVBox 等用的 sources/ JSON、按日期和频道拆好的 EPG 静态文件。

**前置条件**:GitHub 账号(已 Fork 仓库)、Cloudflare 账号(免费套餐即可)、对分支和 Secret 有基本了解。

### 部署步骤

1. **连接 Git**:Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git,授权 GitHub,选中你的仓库和分支(一般为 main)
2. **构建设置**:
   - Framework preset:None
   - Build command:`pnpm build:static`
   - Build output directory:`m3u`
   - Root directory:/
3. **自检**:打开 Pages 分配的域名,确认能访问首页;随机抽查一个 M3U 或 EPG 路径是否 200。若在 TVBox/播放器里配了 EPG,把文档中的 `your-domain.pages.dev` 换成你的域名

### 定时更新方案

- **方式 A(推荐)**:在 GitHub 仓库配置 Secret `CLOUDFLAREAPITOKEN`,工作流在 Runner 上执行 `npx wrangler pages deploy m3u --project-name="你的 Pages 项目名"`,另需配置 `CLOUDFLAREACCOUNTID`、`PROJECT_NAME`
- **方式 B(不配 Token)**:工作流不会调用 Wrangler,改用 `git commit --allow-empty` 触发已连接 Git 的 Pages 认为有新提交,在 Cloudflare 构建环境里重跑一遍 `pnpm build:static`

**常见问题**:Token 权限不足、Account ID/项目名大小写错误——核对 Secret 与 Pages 项目名,必要时等 TTL 或调整 Cloudflare 缓存策略。

## 🐳 路线二：Docker 部署 iptvs-app

不想碰构建配置的话,有个现成镜像,一行命令:

```bash
docker run -d \
  --name iptvs-app \
  --restart unless-stopped \
  -p 5000:5000 \
  hurryos/iptvs-app:latest
```

跑完直接访问 `http://你的IP:5000` 看后台,第一次登录会自动更新源并测试,自己跑完就行,不用手动干预(除非以后 API 失效需要重新部署)。不会用命令的话,去 Docker Hub 搜 **iptvs-app** 图形化拉取部署也行。

**播放器配置**:把 `http://你的IP:5000/iptv` 添加到播放器即可。以 Potplayer 为例:右键 → 打开 → 打开链接 → 粘贴地址。容器还提供 `/txt` 路径输出 txt 格式。

特点:换台无卡顿、自动更新源部署后基本不用管、单容器轻量。

## 🔧 两条路的收尾

- **Cloudflare 路线**:首次上线靠 Pages 连接 Git + 正确填 Build command 与输出目录 `m3u`;持续更新靠 schedule 工作流(配 API Token 直连上传,或空 commit 触发云端构建);播放器侧把域名换成你自己的 Pages/自定义域名,按 EPG.md 配置 XML 或 JSON EPG
- **Docker 路线**:映射端口改成你机器上可用的端口,记得加 `--restart unless-stopped` 保证开机自启

我现在的用法是:NAS 上跑 Docker 版当主力(省心),Cloudflare 版作为备用源挂在不同播放器上。两条路都可以在电视盒子、手机、电脑播放器里直接看。
