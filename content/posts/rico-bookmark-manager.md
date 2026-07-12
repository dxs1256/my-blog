---
date: "2026-07-12"
type: blog
tags:
  - 书签管理
  - 导航站
  - 开源工具
  - Python
title: "书签一键变导航站"
description: "浏览器书签导出后一键生成可搜索的本地导航站，还能分类去重查死链，甚至导回浏览器，增量更新也支持。"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=rico-bookmark-manager"
---
[//]: # (notion-sync-id: )

浏览器书签攒了几年，乱七八糟的链接一大堆，想找的时候翻半天，想整理又觉得太麻烦——这大概是很多人的共同痛点。

最近发现一个工具叫 **Rico Bookmarks Manager**，正好解决这个问题。它把你的书签导出文件变成一个**可搜索的本地导航站**，顺带把分类、去重、查死链全干了，还能导回浏览器。

项目地址：https://github.com/ricocc/rico-bookmark-manager

## 🎯 核心功能一览

- **解析书签**：读取浏览器导出的 HTML 书签文件，生成结构化 `bookmarks.json`
- **智能分类**：支持三种模式——`source`（保持原始）、`optimized`（优化整理）、`hybrid`（混合），分类层级 1-3 级可调
- **去重检测**：自动找出重复 URL，合并清理
- **死链检查**：启用网络检查时检测失效链接，生成报告
- **生成导航站**：带搜索、筛选、双视图、主题切换的静态站点
- **导出多种格式**：Markdown 总览、分类文件、浏览器可导入 HTML
- **增量更新**：新导出书签可以和已有数据合并，保留人工编辑的分类

![书签导航站预览](https://i.ibb.co/dshTbW3S/b04da3c53221.jpg)

## 🎨 五种主题，各有味道

| 主题 | 设计风格 |
|------|---------|
| **ease**（默认） | 纸感目录风格，矿物蓝强调色，安静耐看 |
| **kami** | 暖色画布 + 象牙纸面，墨蓝强调色 + serif 层级，文气十足 |
| **minimal-mono** | 深色黑白灰，暖灰底色，极简党最爱 |
| **retro-blue** | 暖纸面 + 编辑感蓝色标题 + 克制金色点缀，复古味 |
| **ui** | 单色 Swiss 风格，强调边框和组件结构，硬朗干净 |

每种主题都配有 `DESIGN.md` 设计说明，还支持自定义设计——给个 `--design DESIGN.md` 参数就能生成专属主题。

![主题效果](https://i.ibb.co/7Nrh0v80/a582df62389b.jpg)
![主题效果](https://i.ibb.co/6ct6LNHP/7f9b838bc46f.jpg)
![主题效果](https://i.ibb.co/5xhZp07D/806840decd33.jpg)

## 📦 安装

既是 **Claude Code 的 skill**，也是**零依赖的 Python CLI**（只需 Python 3.8+，不用装任何第三方包）。

```bash
# 方式一：npx 一键安装（推荐）
npx skills add https://github.com/ricocc/rico-bookmark-manager.git

# 方式二：git clone
git clone https://github.com/ricocc/rico-bookmark-manager.git ~/.claude/skills/rico-bookmark-manager
```

装好后重启 Claude Code，输入 `/rico-bookmark-manager` 或说句 "rico，整理我的书签" 就能激活。

## 🚀 快速上手

**第一步**：从浏览器导出书签为 HTML 文件（Chrome 书签管理器 → 导出）。

**第二步**：运行完整流程：

```bash
python scripts/rico_bookmarks_manager.py all \
  --input bookmarks.html \
  --output rico-bookmarks
```

**第三步**：浏览器打开 `rico-bookmarks/site/index.html`，完事。

一次 `all` 命令会生成：

```
rico-bookmarks/
├── site/                    # 本地静态书签导航站
├── data/bookmarks.json      # 结构化书签数据
├── reports/*.md             # 重复、死链、建议、分布报告
├── categories/*.md          # 按分类生成的 Markdown
├── 书签总览.md              # Markdown 总览
└── bookmarks_import.html    # 浏览器可导入 HTML
```

## 🔍 导航站能干什么

生成的站点不止是好看，功能也到位：

- **全局搜索**：搜标题、URL、域名、描述、标签、路径
- **多维筛选**：按分类、二级分类、标签、域名、链接状态筛选
- **双视图**：卡片视图和列表视图，随你切换
- **详情弹窗**：点开书签看详情，URL、来源文件夹、分类标签一目了然
- **本地暂存**：在站内直接调整分类和标签，调整存在浏览器 `localStorage`，不会动源文件
- **一键导出**：站内就能导出 JSON、Markdown 和浏览器导入 HTML

## ♻️ 增量更新

书签是活的，过段时间又有新的了怎么办？支持增量合并：

```bash
python scripts/rico_bookmarks_manager.py update \
  --input new_bookmarks.html \
  --existing rico-bookmarks/data/bookmarks.json \
  --output rico-bookmarks \
  --dry-run
```

按标准化 URL 匹配旧书签，**保留已有人工审阅的分类**，只分类新增项目，先 `--dry-run` 预览再正式写入。

## 🔄 导回浏览器

整理后的分类会被还原成浏览器里的书签文件夹层级。`all` 自动生成了 `bookmarks_import.html`，直接导入：

- **Chrome / Edge**：书签管理器 → 右上角菜单 → 导入书签
- **Firefox**：书签库 → 导入和备份 → 从 HTML 导入

> 浏览器导入是**新增**而非替换，会作为一个新文件夹加入，不会删你原有的书签。想干净替换的话，先手动清一下旧书签。

## 📋 CLI 命令速查

| 命令 | 用途 |
|------|------|
| `analyze` | 解析书签 HTML，输出结构和重复分析 |
| `organize` | 解析并按策略分类整理 |
| `export-html` | 从 `bookmarks.json` 生成浏览器可导入 HTML |
| `export-md` | 生成 Markdown 总览和分类文件 |
| `manager` | 从已有数据生成导航站（可指定 `--theme`） |
| `update` | 增量合并新书签 |
| `all` | 一条命令跑完所有流程 |
| `themes` | 查看所有内置主题 |

## 💡 说两句

这工具最打动我的是两点：一是**零依赖**，Python 标准库就能跑，没有任何第三方包要装；二是**设计感在线**，五种主题各有味道，不是那种糙快的命令行产物。

导航站能直接搜索筛选、详情弹窗、本地暂存调整，整理书签这件事终于不再是一种折磨了。

