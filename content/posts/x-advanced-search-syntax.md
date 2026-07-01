---
date: "2026-05-30"
type: "Post"
tags:
  - "热门文章"
  - "X"
  - "搜索技巧"
  - "高级搜索"
  - "推特"
  - "教程"
title: "精准过滤你想要的推文"
description: "搜索中文视频内容、点赞过千：、搜索中文图片内容、点赞过百：：X 的搜索框大多数人只用来搜关键词，但其实它内置了一套搜索参数语法。组合起来用，可以精准筛选语言、内容类型、点赞数、时间范围，把有效信息从海量推文中捞出来"
categories:
  - "教程"
image: "https://bing.ee123.net/img/rand?seed=x-advanced-search-syntax"
---

[//]: # (notion-sync-id: 370874cb-3972-8109-bd88-fac6b32414db)

X 的搜索框大多数人只用来搜关键词，但其实它内置了一套搜索参数语法。组合起来用，可以精准筛选语言、内容类型、点赞数、时间范围，把有效信息从海量推文中捞出来。

---

## 🎯 搜索参数速查

X 高级搜索的核心是在关键词后面加筛选参数。每个参数控制一个维度，组合使用效果翻倍。

| Header | Header | Header | 
| --- | --- | --- | 
> _(表格内容通过子行渲染)_

## ⚡ 组合搜索技巧

单一参数不够用，组合起来效果翻倍。

**搜索中文视频内容、点赞过千：**

```plain text
关键词 lang:zh-cn min_faves:1000 filter:videos
```

**搜索中文图片内容、点赞过百：**

```plain text
关键词 lang:zh-cn min_faves:100 filter:images
```

**搜索通过 @ 用户引流的推文：**

```plain text
关键词 filter:mentions lang:zh-cn min_faves:1000 filter:videos
```

`min_faves` 是过滤噪音的关键——设置一个合理的点赞下限，可以跳过广告 bot 和低质量内容。

## 💡 实用场景

- **内容筛选**：只看高质量中文推文，设 `min_faves:500` 以上
- **资源搜索**：找视频或图片类内容，加 `filter:videos` / `filter:images`
- **时间限定**：只搜近一个月，用 `since:` + `until:`
- **去噪音**：不想看 @ 引流的推广，加 `-filter:mentions` 排除
参数值可以按需调整，灵活搭配就能从 X 的海量信息中精准捞出你想要的内容。

---


