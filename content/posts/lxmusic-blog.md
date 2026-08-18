---
date: "2026-07-31"
type: blog
tags:
  - "音乐"
  - "开源"
title: "洛雪音乐音源指南，告别空壳一键导入"
description: "洛雪音乐 LX Music 音源配置指南，推荐 pdone 的 7 套免费音源，在线一键导入，永久收藏。"
categories:
  - 影音娱乐
image: "https://bing.ee123.net/img/rand?seed=lxmusic-blog"
---

洛雪音乐（LX Music）是个好东西——开源、干净、跨平台、没广告。但它本质上只是个播放器"空壳"，必须搭配音源才能用。

对不常逛 GitHub 的朋友来说，找一个稳定、持续更新的音源仓库，比安装软件本身还难。很多仓库写着写着就停更，或者链接失效，非常折腾。

这篇文章直接把最靠谱的方案整理好，省得一个个去试。

## 🎯 主力推荐：pdone 免费音源仓库

如果只收藏一个链接，那就选这个。作者 pdone 更新频率非常高，几乎每周都在维护——哪个音源挂了会及时标注，有新的立刻补上，非常负责。

**仓库地址：** https://github.com/pdone/lx-music-source

一共提供 7 套免费音源，可在线一键导入，组合使用基本不会"全军覆没"：

| 音源名称 | 特点 | 在线导入链接 |
|---------|------|------------|
| 六音 (SixYin) | 老牌稳定，覆盖面广，日常首选 | `https://raw.githubusercontent.com/pdone/lx-music-source/main/sixyin/latest.js` |
| 汇百泉 (Huibq) | 音质不错，常补上六音搜不到的歌曲 | `https://raw.githubusercontent.com/pdone/lx-music-source/main/huibq/latest.js` |
| 花 (Flower) | 轻量快速，没有多余功能 | `https://raw.githubusercontent.com/pdone/lx-music-source/main/flower/latest.js` |
| LX | 同名音源，与软件本身磨合得最好 | `https://raw.githubusercontent.com/pdone/lx-music-source/main/lx/latest.js` |
| ikun | 社区热度高，比较活跃 | `https://raw.githubusercontent.com/pdone/lx-music-source/main/ikun/latest.js` |
| 聚合 (Juhe) | 多平台聚合，一次覆盖多个渠道 | `https://raw.githubusercontent.com/pdone/lx-music-source/main/juhe/latest.js` |
| grass | 体积极小，适合老电脑或备用机 | `https://raw.githubusercontent.com/pdone/lx-music-source/main/grass/latest.js` |

## 🔄 备选方案：guoyue2010 的音源仓库

万一主力仓库哪天出了意外（比如被投诉删库），还有个备胎。

**仓库地址：** https://github.com/guoyue2010/lxmusic-guoyue2010

提供"免费版 + 付费版"两套方案。免费版日常够用，付费版音质更好、更稳定。

## 📖 在 LX Music 中导入音源

只需三步：

1. 点击右上角**设置**
2. 进入**自定义源管理**
3. 选择**在线导入**，粘贴上面的链接，点击确定

⚠️ 注意：一定要使用 `raw.githubusercontent.com` 开头的原始链接，不要直接复制 GitHub 的网页地址。

![洛雪音乐音源导入界面](https://i.ibb.co/rKCKTZ12/9d3b29a58f3c.png)

## 🌐 GitHub 打不开怎么办？

裸连 GitHub 抽风是常态。解决办法很简单：在原始链接前加上加速代理前缀 `https://ghproxy.net/` 即可。

示例：
- 原链接：`https://github.com/pdone/lx-music-source`
- 加速后：`https://ghproxy.net/https://github.com/pdone/lx-music-source`

如果这个加速服务挂了，可以自行搜索"GitHub 加速"寻找替代品。

## 💡 最后说几句

这类音源仓库最大的敌人是时间。能稳定维护半年的屈指可数。pdone 的仓库不宣传、不收费、默默更新，非常难得。

建议配好后直接收藏仓库地址。哪天音源失效了，回去看一眼 README，大概率已经有新的解决方案了。