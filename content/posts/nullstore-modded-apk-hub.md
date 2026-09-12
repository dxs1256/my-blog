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

后来发现 **NullStore**（⭐316），把 ReVanced 系列补丁应用的自动构建和下载都打包好了，不用自己维护 GitHub Actions。

项目地址：https://github.com/nullcpy/rvb

## 🎯 这是什么

NullStore 本质是一个**自动构建分发站**：每当 ReVanced、ReVanced Extended、MorpheApp、RVX Morphed 等补丁更新时，它会在 GitHub 上自动编译出带补丁的 APK 和 Magisk/KernelSU 模块，然后同步到它的官网供直接下载。

对我这种不想每天盯着 GitHub Actions 看有没有新构建的人来说，等于有人替你蹲更新。

## ✅ 解决了什么问题

用过 ReVanced 的人都知道，标准流程是 clone 官方仓库、装 Java、跑 CLI、选补丁、等编译——单是环境搭好就要半小时。更烦的是 YouTube 官方一更新，前一天刚打好的包第二天就失效。

NullStore 把这事自动化了：

| 维度 | 说明 |
|------|------|
| 构建频率 | 24/7 监控补丁更新，自动触发 GitHub Actions 构建 |
| 覆盖补丁 | ReVanced、ReVanced Extended、MorpheApp、RVX Morphed、Revanced Advanced |
| 安装方式 | 直接下载 APK，或通过 Obtainium 订阅自动更新 |
| 平台支持 | 手机、Android TV |
| 模块格式 | 除 APK 外，还提供 Magisk / KernelSU 模块 |
| 费用 | 完全免费 |

网站本身是个极简列表页，顶部两个 Tab 分开 Stable 和 Beta 构建，每个应用点进去就能看到版本号和下载按钮。

## 📱 怎么用

**网页直连**：打开 https://nullcpy.github.io ，按名称或更新时间排序，找到你要的应用，直接下载 APK。页面会显示当前版本和构建时间，一眼判断是不是最新的。

**Obtainium 订阅**：如果你用 Obtainium 管理 FOSS 应用更新，可以在 NullStore 的应用详情页找到 RSS/JSON 订阅链接，丢进 Obtainium 后它会自动检测新版本并提示更新，比手动刷新省事得多。

![NullStore 网页截图，展示了应用列表和版本信息](https://i.ibb.co/6cNWZfCH/4236036f2e10.jpg)

![NullStore 应用详情页，显示 Stable/Beta 切换和下载按钮](https://i.ibb.co/vCM4JNLN/adccb6036c5f.jpg)

![NullStore 官网首页截图](https://i.ibb.co/k2kHdKKv/92fabfec5751.jpg)

## 💡 我的判断

NullStore 的定位很明确：**你只管用，构建和更新交给它**。316 颗 Star 不算大项目，但胜在稳定——GitHub 仓库显示最近一次更新是 2026-09-12，24/7 自动构建不是口号，是真的在跑。

如果你已经受够了手动打补丁、等构建、刷失效包，这个站值得 bookmark。唯一的注意点是下载第三方修补版 APK 本身有一定风险，建议只从官方 GitHub 或 NullStore 这种可信来源获取，并在安装前核对签名。
