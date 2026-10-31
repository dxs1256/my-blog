---
date: "2026-10-31"
type: blog
tags:
  - Android TV
  - 电视盒子
  - 开源
  - 桌面
  - 去广告
title: "5 个 AI 改造电视的开源项目"
description: "CleanYourTV 带起了一波电视桌面改造风：从只禁用不删除的 tv-detox，到直接给 APK 的 tvhome-zh，再到带儿童模式的 quiet-tv、会随天气变天的 weatherglass-tv 和最像 tvOS 的 Tigris。Android 4.0 老电视也能跑。"
categories:
  - 影音娱乐
image: "https://bing.ee123.net/img/rand?seed=ai-tv-reform-5-projects"
---

上个月给家里电视换了 **Aerial** 桌面之后，我顺着 GitHub 上游翻了一圈，发现 CleanYourTV 刮起的这阵"电视桌面改造"风，已经长出一整套生态。这股风的起点就是让 AI Agent 通过 ADB 自动清理电视系统，于是衍生出了各种针对特定需求的版本：有专注性能的老电视优化版，有直接给安装包的汉化分支，有带儿童模式的"家庭版"，还有两个风格完全不同的桌面。这篇文章把其中 5 个值得折腾的项目放一起对比，旧电视（Android 4.0）也能找到合适的。

项目地址：
- https://github.com/Ansub/tv-detox
- https://github.com/mclhm8182/tvhome-zh
- https://github.com/BeatsAD/quiet-tv
- https://github.com/faizaldjoo/weatherglass-tv
- https://github.com/lesnolie/Tigris

![CleanYourTV 掀起的电视桌面改造，生态里已经有了一批针对特定需求的衍生项目](https://i.ibb.co/0y9Q76gr/c9dbc960ae9c.png)

## 一句话对比

| 项目 | 定位 | 最突出的点 | 最低系统 |
|------|------|-----------|---------|
| tv-detox | 清理 | 只禁用不删除，2GB 内存电视清理后可用内存提升约 90% | Android 4.0 |
| tvhome-zh | 桌面 | 373KB APK 直接装，支持中文，适配小米信号源切换 | Android 4.0 |
| quiet-tv | 桌面 + 管理 | 儿童模式、开机自启、应用分类，家庭刚需全带上 | Android 4.0–4.4 |
| weatherglass-tv | 桌面 | 背景天空跟真实天气和时间变化，1GB 老电视有待机 0% CPU 的 Lite 模式 | Android 4.0 |
| Tigris | 桌面 | 视觉最接近 tvOS 26，桌面直接放 B 站热门 | Android 5.0+ |

<hr>

## 🧹 tv-detox：老电视性能救星

和 CleanYourTV 一个路子——通过 ADB 清理电视，思路是**只禁用、不删除**，系统组件还在，只是不跑了，随时能恢复。它的卖点是老电视提速：有开发者实测，一台 2GB 内存的电视清理后可用内存提升约 90%（按之前几台电视的经验，这个数字乐观但方向没错，禁用系统应用确实能腾出一大块）。

![tv-detox：专注提升老电视性能的清管理者](https://i.ibb.co/ZyRjyhh/f9b49d7bb5c0.png)

桌面本体只有 52KB，就装应用列表、常用设置、HDMI 入口这几样，是真·极简。适合配置低的老电视和电视盒子——反正它们也跑不动花哨桌面。

## 🇨🇳 tvhome-zh：不用编译的汉化 APK

这是 CleanYourTV 的一个衍生分支，解决的是上游门槛问题：原版 release 只附源码，想装得自己编译。tvhome-zh 直接给你一个 **373KB 的 APK**，装上就是中文，省掉所有折腾。

![tvhome-zh：373KB APK 直接安装，中文界面](https://i.ibb.co/tw0T99Dk/dcb3298082fb.png)

它的另一个特点，是针对**小米国行固件的信号源切换做了专门适配**——走小米自家播放器接口，不用改任何设置就能切 HDMI。如果你要的是一块干净、中文齐全、遥控器就能调完的 tvOS 风格桌面，又不想碰 AI 和编译，选这个。

## 👨‍👩‍👧 quiet-tv：把儿童模式做进桌面的家庭版

同样基于 CleanYourTV，面向国内电视做了本地化：壁纸每日更新、天气、应用分类管理都有，还给了更细的机型验证和可恢复的精简方案。简单总结就是**桌面 + 管理工具**。

![quiet-tv：桌面 + 应用管理 + 儿童模式，家庭场景齐活](https://i.ibb.co/5WW8Dtyv/e268b873674d.png)

值得单独说的是儿童模式：支持单次/每日使用时长限制、家长验证、到点休息提醒。家里有小孩、又在意应用管理的，它是这批里最"家庭"的一个。

## 🌤️ weatherglass-tv：桌面会跟着天气变天

纯桌面，特点全在背景：天空会跟着你所在城市的真实天气和真实时间变化——日出、正午、黄金时刻、雨、星空，太阳低的时候云会染上暖色。时钟、天气、日期坐在玻璃卡片上，卡片的光从太阳或月亮的方向打过来。

![weatherglass-tv：背景天空随真实天气和时间变化](https://i.ibb.co/v4BfSx0b/ddb7898a4751.png)

三个主题各管一摊：Live wallpaper 让天空跟天气走；Movie 主题配 TMDB key 后首页变成电影 Billboard，左右翻卡、15 秒自动换；Lite 模式是给 1GB 内存老电视的——极光只画一次、时钟纯文本、待机 0% CPU。这个属于"有个性"的桌面，喜欢氛围感的可以试。

## 🎬 Tigris：最接近 tvOS 26 的界面

这批项目里视觉上最像 tvOS 26 的一个：毛玻璃控制中心、风景照片背景、相框屏保，都是 Apple TV 的味道。

![Tigris：毛玻璃控制中心 + 风景背景，最像 tvOS](https://i.ibb.co/dwbrR4YG/835a44fc6d58.png)

它最有意思的是桌面能直接放**哔哩哔哩热门**，壁纸支持必应每日、Wallhaven 二次元、Apple TV 航拍三套，手机扫码能把照片传上去当背景。

![Tigris 的控中心与屏保样式](https://i.ibb.co/27HX7yHJ/79e73908bae6.png)

## 怎么选

- **家里有小孩** → quiet-tv，儿童模式是独一份
- **电视很旧、内存小** → tv-detox（清理）配 weatherglass-tv 的 Lite 主题（桌面）
- **想省事不折腾编译** → tvhome-zh，一个 APK 完事
- **追求 Apple TV 质感、爱看 B 站** → Tigris

这批项目的最低系统基本都压到 Android 4.0–4.4 了，之前的"系统版本低玩不了"已经不是借口。安装方式和 Aerial 那套一样：电视开 ADB，电脑连同一网络，一条命令装完。挑一个自己喜欢的先跑起来，不满意再换，反正都是可恢复的。