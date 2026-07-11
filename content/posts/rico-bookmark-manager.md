---
date: "2026-07-12"
type: blog
tags:
  - 书签管理
  - 导航站
  - 开源工具
  - Python
title: "书签一键变导航站"
description: "浏览器书签导出后一键生成可搜索的本地导航站，还能分类去重查死链，甚至导回浏览器。"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=rico-bookmark-manager"
---
[//]: # (notion-sync-id: )

浏览器书签攒了几年，乱七八糟的链接一大堆，想找的时候翻半天，想整理又觉得太麻烦——这大概是很多人的共同痛点。

最近发现一个工具叫 **Rico Bookmarks Manager**，正好解决这个问题。它把你的书签导出文件变成一个**可搜索的本地导航站**，顺带把分类、去重、查死链全干了，还能导回浏览器。

## 🎯 它能干什么

- **解析书签**：读取浏览器导出的 HTML 书签文件，生成结构化数据
- **智能分类**：自动分析文件夹结构，把书签归类
- **去重**：找出重复的 URL，合并清理
- **查死链**：检测失效链接，生成报告
- **生成导航站**：一个带搜索、筛选、主题切换的静态站点
- **导回浏览器**：整理完的 HTML 可以直接导回 Chrome、Edge 等浏览器

![书签导航站预览](https://i.ibb.co/dshTbW3S/b04da3c53221.jpg)

## 🎨 五种主题

自带五套主题，总有一款合眼缘：

| ease（默认） | kami | minimal-mono |
|:---:|:---:|:---:|
| ![ease主题](https://i.ibb.co/7Nrh0v80/a582df62389b.jpg) | ![kami主题](https://i.ibb.co/6ct6LNHP/7f9b838bc46f.jpg) | ![ui主题](https://i.ibb.co/5xhZp07D/806840decd33.jpg) |

还有 retro-blue 和 minimal-mono 两款风格可选，换主题只是改个参数的事。

## 📦 安装

既是 **Claude Code 的 skill**，也是一个**零依赖的 Python 命令行工具**。

**方式一：npx 一键安装（推荐）**
```bash
npx skills add https://github.com/ricocc/rico-bookmark-manager.git
```

**方式二：git clone**
```bash
git clone https://github.com/ricocc/rico-bookmark-manager.git ~/.claude/skills/rico-bookmark-manager
```

**方式三：直接下载 ZIP** 解压到 skills 目录即可。

## 🚀 使用

装好后，在 Claude Code 里直接说人话就行：

> "rico，整理我的书签，生成导航站"
> "帮我查下书签里的死链和重复链接"
> "换 retro-blue 主题重新生成"

它会自动解析书签文件、分类、生成站点，全程不用记命令。

## 💡 说两句

浏览器书签这玩意儿，用的时候觉得重要，但平时根本懒得管。这个工具好就好在——**一次导出，永久清爽**。整理完的导航站不仅自己能搜，还能当个本地收藏夹门户用，想找什么直接搜，比在浏览器书签栏里翻来翻去快多了。

GitHub：https://github.com/ricocc/rico-bookmark-manager