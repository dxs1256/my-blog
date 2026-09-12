---
date: "2026-09-12"
type: blog
tags:
  - 安卓
  - 开源
  - ReVanced
  - 应用商店
  - 免费
title: "安卓修改版应用一站下载"
description: "ReVanced 修补版应用不用自己编译了。NullStore 24/7 自动构建 APK 与 Magisk 模块，支持 Android TV，Obtainium 一键订阅更新。"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=nullstore-modded-apk-hub"
---

上个月想给 Android TV 装个去广告的 YouTube，按老路子走 ReVanced 官方流程：clone 仓库、装 JDK 17、跑 CLI、选补丁、等编译——光环境就折腾了四十分钟。最后包是打出来了，用了三天 YouTube 更新，补丁失效，一切归零。

后来被人推荐了 **NullStore**（⭐316），才知道有人已经把这件事做成了 24/7 自动流水线。

项目地址：https://github.com/nullcpy/rvb

## 它是什么

NullStore 不是另一个 ReVanced fork，而是一个**自动构建分发站**。每当 ReVanced、ReVanced Extended、MorpheApp、RVX Morphed、Revanced Advanced 这些补丁仓库有更新，NullStore 的 GitHub Actions 就会自动拉最新补丁、编译带 patch 的 APK，生成 Magisk/KernelSU 模块，然后同步到 https://nullcpy.github.io 供直接下载。

说人话就是：**你不需要懂 Java、不需要配 Gradle、不需要等编译，只需要点下载。**

## 我为什么需要它

手动打补丁的痛点不只是环境麻烦。更实际的问题是**补丁和 App 版本必须严格对应**——YouTube 官方一更新，昨天刚编译好的包今天就废了。NullStore 的自动化流水线把这件事变成了"它帮你盯着，有新构建直接通知你"。

网站本身是个极简列表页，顶部 Stable/Beta 两个 Tab，每个应用下面直接挂版本号和下载按钮。我试的那天，YouTube 最新构建是 `v21.07.247`，Google Photos 是 `v7.80.0.929302933`，时间戳精确到分钟。

![NullStore 官网首页截图](https://i.ibb.co/k2kHdKKv/92fabfec5751.jpg)

## 覆盖了什么

看最近的 Release 记录，构建编号已经跑到 260036，频率大概是每天几十个构建。覆盖的补丁生态包括：

- **ReVanced** / **ReVanced Extended**：最主流的 YouTube、Spotify、Twitter 等补丁
- **MorpheApp** / **RVX Morphed**：另一套活跃维护的补丁分支
- **Revanced Advanced**：较新的补丁集
- **De-Vanced**：RookieEnough 维护的 Google Photos 去广告方案

每个构建都会带架构标签（arm64-v8a / armeabi-v7a）和版本号，下载前能确认是不是你要的版本。

## 怎么用

**网页直连**：打开 NullStore 官网，按名称或最近更新排序，找到目标应用，直接下载 APK。页面会显示当前版本和构建时间，比我自己编译快得多。

**Obtainium 订阅**：如果你用 Obtainium 管理 FOSS 应用更新，可以在 NullStore 的应用详情页找到 RSS/JSON 订阅链接，丢进去之后它会自动检测新版本并推送通知。适合不想天天手动刷页面的场景。

![NullStore 网页截图，展示了应用列表和版本信息](https://i.ibb.co/6cNWZfCH/4236036f2e10.jpg)

![NullStore 应用详情页，显示 Stable/Beta 切换和下载按钮](https://i.ibb.co/vCM4JNLN/adccb6036c5f.jpg)

## 我的判断

316 颗 Star 在 GitHub 上不算大项目，但胜在**稳定**——仓库最后更新时间是 2026-09-12，24/7 自动构建不是口号，是真的在跑。对于不想自己维护 GitHub Actions、不想每天盯着补丁更新的人来说，NullStore 等于提供了一个现成的"补丁应用商店"。

需要注意的点：下载第三方修补版 APK 本身有一定风险，建议只从官方 GitHub 或 NullStore 这种可信来源获取，并在安装前核对签名。另外，如果你有非常定制化的补丁组合需求，NullStore 的预构建包可能不包含你想要的全部补丁，这种情况还是得自己跑 CLI。

如果你只是想要一个能用的、持续更新的修补版 YouTube/Spotify/Google Photos，NullStore 是目前最省心的方案。
