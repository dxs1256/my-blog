# AGENTS.md - cf-blog 项目运维指南

> 本文件供 AI 编码助手（Cursor / Claude Code / opencode）阅读，帮助快速理解项目结构和日常操作流程。

---

## 项目概述

cf-blog 是一个纯静态的个人博客系统，基于 React 19 + Vite 6 + Tailwind CSS 4 构建。文章使用 Markdown 编写，构建时通过 `prebuild.cjs` 脚本将所有 `.md` 文件编译为 JSON 内嵌到前端 JS 中，实现无后端运行。

可部署到 Cloudflare Pages、TinkerHost、VPS（Nginx/Apache）等平台。

---

## 目录结构

```
├── blog.config.ts         # 【核心配置】站点标题、作者、主题色、菜单、背景透明度等
├── content/posts/         # 文章目录，所有 .md 文件放这里
│   └── template/          # 文章模板（不会被构建，仅供复制参考）
├── public/                # 静态资源，构建时原样复制到 dist/
│   ├── images/            # 本地图片，引用路径 /images/xxx
│   ├── _redirects         # Cloudflare Pages SPA 路由
│   └── .htaccess          # Apache SPA 路由（TinkerHost 用）
├── scripts/
│   ├── prebuild.cjs       # 构建前：扫描 content/posts/ 生成 src/posts-data.json
│   └── sync-date.cjs      # 工具：自动更新文章 updated 日期
├── src/
│   ├── App.tsx            # 应用主入口，路由、状态、Markdown 渲染
│   ├── components/        # 组件：Sidebar、PostCard、Search
│   ├── lib/               # 工具函数、LeanCloud 统计
│   ├── posts-data.json    # 【构建产物】自动生成，不手动编辑
│   └── index.css          # 全局样式 + Tailwind 配置 + markdown-body
├── dist/                  # 【构建产物】npm run build 输出，上传到此目录内容
├── server.ts              # Express 开发服务器（仅本地 npm run dev 使用）
├── package.json           # 依赖与脚本
└── vite.config.ts          # Vite 配置
```

---

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | React | 19.x |
| 构建 | Vite | 6.x |
| 语言 | TypeScript | 5.8 |
| 样式 | Tailwind CSS + @tailwindcss/typography | 4.x |
| 图标 | lucide-react | 0.546 |
| 动画 | motion (framer-motion) | 12.x |
| Markdown | react-markdown + remark-gfm + gray-matter | 10.x |
| 日期 | date-fns | 4.x |
| 服务端 | Express (仅本地开发) | 4.x |
| 统计 | LeanCloud (可选) | 4.x |

---

## 常用命令

```bash
npm install          # 安装依赖（克隆后首次执行）
npm run dev          # 启动本地开发服务器 http://localhost:3000
npm run build        # 构建：prebuild → vite build → esbuild server
npm run start        # 生产模式启动（需要 dist/）
npm run lint         # TypeScript 类型检查
npm run clean        # 清除 dist/
npm run sync-date    # 自动更新文章 updated 日期
```

---

## 日常工作流

### 添加新文章

1. 在 `content/posts/` 下创建 `.md` 文件，文件名遵循前缀约定：
   - `r-xxx.md` — 记录/学习心得类 → 封面图 `/images/r.jpg`
   - `s-xxx.md` — 分享/羊毛类 → 封面图 `/images/s.jpg`
   - `t-xxx.md` — 教程/指南类 → 封面图 `/images/t.png`
2. 撰写 frontmatter：

```yaml
---
title: "文章标题"
date: "2026-07-01"
updated: "2026-07-01"
draft: false          # true 时不参与构建
sticky: null          # 置顶填数字（1 最高），普通文章填 null
tags: ["标签1", "标签2"]
categories: ["分类1", "分类2"]
description: "简短摘要"
image: "/images/r.jpg"
---
```

3. 正文使用标准 Markdown 语法，支持 GFM 表格、代码块、图片等。

### 修改站点配置

编辑根目录 `blog.config.ts`：
- `SITE_TITLE` — 浏览器标签页标题
- `HOME_PAGE_DESCRIPTION` — 首页描述
- `AUTHOR_NAME / AUTHOR_TITLE / AUTHOR_AVATAR / AUTHOR_CONTACT` — 个人信息
- `MENU_ITEMS` — 侧边栏菜单
- `RECOMMENDED_LINKS` — 侧边栏底部链接
- `ABOUT_PAGE_CONFIG` — 关于页面
- `THEME_COLOR` — 主题色（Tailwind 颜色名）
- `SITE_BG_OPACITY` — 背景透明度（0.0 ~ 1.0）
- `POST_BOTTOM_IMAGES` — 文章底部二维码/图片
- `LEANCLOUD_CONFIG` — 阅读量统计开关

### 本地调试

```bash
npm run dev
# 访问 http://localhost:3000
# Express 服务器实时读取 content/posts/ 下的 .md 文件
# 支持 HMR 热更新
```

### 部署到 TinkerHost

```bash
npm run build
# 上传 dist/ 内容到 TinkerHost 的 public_html/ 目录
# .htaccess 已内置，无需额外配置
```

### 部署到 Cloudflare Pages

- Fork 本项目到 GitHub
- Cloudflare Pages 连接仓库
- Build command: `npm run build`
- Build output directory: `dist`
- 推送代码自动触发部署

---

## 构建产物说明

`npm run build` 执行流程：
1. `scripts/prebuild.cjs` — 扫描 `content/posts/*.md`，生成 `src/posts-data.json`
2. `vite build` — 编译 React 前端到 `dist/`
3. `esbuild server.ts` — 编译 Express 到 `dist/server.cjs`（仅本地生产模式用）

`dist/` 目录内容：

| 文件 | 用途 | 是否上传 TinkerHost |
|------|------|:---:|
| `index.html` | 网站入口 | ✅ |
| `assets/index-*.js` | 前端 JS 包（含文章数据） | ✅ |
| `assets/index-*.css` | 前端样式 | ✅ |
| `images/` | 静态图片 | ✅ |
| `.htaccess` | Apache SPA 路由 | ✅ |
| `_redirects` | Cloudflare Pages SPA 路由 | ✅（不影响 Apache） |
| `server.cjs` | Express 服务器 | ❌ 静态主机用不到 |

> **关于 SPA 路由**：`.htaccess` 和 `_redirects` 可共存于 `dist/`，各平台只认自己的配置，互不干扰。两者都从 `public/` 目录在构建时自动复制。

---

## 关键代码说明

### Markdown 渲染流程

1. `react-markdown` + `remarkGfm` 插件渲染 Markdown
2. `.markdown-body` 类使用 `prose prose-zinc` 排版
3. 行内代码 `<code>` 已显式设置样式（`src/index.css:39-43`），并禁用了 Tailwind Typography 的 `::before/::after` 伪元素（避免显示多余反引号）
4. 图片自动添加 `referrerPolicy="no-referrer"`

### 数据加载两层容错

`App.tsx` 的 `fetchPosts()` 和 `handlePostClick()`：
1. 优先通过 `/api/posts` API 获取（开发环境 Express 提供）
2. API 失败时回退到 `posts-data.json`（构建产物，打包在 JS 中）
3. 纯静态部署（Cloudflare Pages / TinkerHost）自动走回退路径

### 文章模板系统

`content/posts/template/` 下的文件不会被构建（不在 `content/posts/` 根目录），仅供复制使用：
- `r-template-record.md` — 记录类
- `s-template-share.md` — 分享类
- `t-template-tutorial.md` — 教程类
- `！TEMPLATE-README.txt` — 模板使用说明

---

## 注意事项 / 踩坑记录

1. **`src/posts-data.json` 不要手动编辑** — 它是 `prebuild.cjs` 自动生成的，每次 `npm run build` 会覆盖。
2. **文章必须放在 `content/posts/` 根目录** — 子目录下的 `.md` 不会被 `prebuild.cjs` 扫描。
3. **`draft: true` 的文章不会出现在构建产物中**。
4. **TinkerHost 上传后页面不变？** — 先删服务器上的 `assets/` 再上传新的，避免浏览器使用缓存的旧 JS。
5. **行内代码样式异常** — v2 已修复 Tailwind Typography 伪元素问题，详见 `src/index.css`。
6. **`.htaccess` 已在 `public/` 中** — 每次构建自动进入 `dist/`，无需手动维护。
