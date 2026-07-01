---
date: "2026-06-20"
type: "Post"
tags:
  - "热门文章"
  - "小米"
  - "HyperOS"
  - "澎湃"
  - "去广告"
  - "ADB"
  - "系统优化"
  - "教程"
title: "小米 HyperOS 去广告净化指南，ADB 卸载系统应用适配澎湃 1/2/3"
description: "小米 HyperOS 系统去广告优化的完整教程。通过 ADB 命令卸载系统应用，关闭广告和反诈相关服务，适配 HyperOS 1/2/3（澎湃 1/2/3），不需 root。"
categories:
  - "教程"
image: "https://bing.ee123.net/img/rand?seed=xiaomi-hyperos-debloat-adb"
---

[//]: # (notion-sync-id: 385874cb-3972-8155-92f5-efdc80000adf)

小米的 HyperOS（澎湃系统）功能确实丰富，但伴随而来的系统广告、预装应用、以及各种后台统计服务一直是用户吐槽的重灾区。系统设置里有大部分广告开关，然而关掉一个冒出来两个的现象并不少见，有些广告 SDK 甚至直接集成在系统应用里，光靠界面开关根本清不干净。

GitHub 上这个名为 clean_hyperos 的项目提供了一个非常彻底的解决方案——通过 ADB 命令直接卸载系统组件，从根源上清除广告和不需要的后台服务。项目适配 HyperOS 1/2/3（澎湃 1/2/3），不需要 root，操作完恢复出厂设置也不会影响手机正常使用。

项目地址:[https://github.com/fyonecon/clean_hyperos](https://github.com/fyonecon/clean_hyperos)

---

## 🎯 能干掉什么

项目提供了完整的包名列表，覆盖小米系统里的主要广告和冗余服务：

- 系统广告组件：com.miui.systemAdSolution、com.miui.analytics、com.miui.yellowpage 等
- 游戏中心：com.xiaomi.gamecenter、com.xiaomi.gamecenter.sdk.service
- 安全与反诈相关：com.miui.guardprovider、com.xiaomi.security.onetrack、com.miui.securityadd
- 支付相关：com.xiaomi.payment、com.miui.tserviceclient
- 统计分析：com.miui.misightservice、com.xiaomi.mtb、com.android.traceur
- 云服务与广告推送：com.miui.miservice、com.miui.contentcatcher、com.miui.phrase
项目同时提供了详细的注意事项，标注了哪些包坚决不能卸载。比如 com.android.htmlviewer（HTML查看器）卸载会直接卡米，com.miui.packageinstaller（应用包管理器）也不能动，com.miui.miwallpaper（小米壁纸）卸载了屏幕直接黑屏。

![clean_hyperos 项目](https://i.ibb.co/N2yVLQq8/593de9fae427.png)

## 🔧 准备工作

操作前务必做好以下准备：

1. 备份手机数据到云盘或电脑，ADB 卸载操作虽然风险可控，但万一卡米数据会全部丢失
1. 下载 ADB 工具包（platform-tools），Windows/Mac/Linux 都支持
1. 手机开启开发者模式——连续点击 MIUI 版本号直到提示已开启
1. 开启 USB 调试和数据传输模式
建议第一次操作时用备用机来试。如果主用机只有一台，至少先完整备份一次。

## 📋 操作步骤

### 第一步：基础设置清理

项目 README 规划得很细致，从设置层面就开始处理：

- 断网不插卡（避免操作期间广告后台刷新）
- 卸载预装应用（保留运动、录音、日历即可）
- 关闭负一屏广告和卡片
- 关闭桌面设置里的上滑搜索
- 设置里逐一关闭安全检测、广告开关、第三方统计
- 关闭内存扩展、设置动画为 0.5 倍
### 第二步：ADB 卸载系统组件

连接手机到电脑后，逐条执行卸载命令。项目提供了一个「一次性运行命令.txt」文件，里面包含完整的包名列表，可以直接粘贴到 ADB 环境一次性运行。

每条命令格式如下：

adb shell pm uninstall --user 10 com.miui.yellowpage

其中 user 10 是当前用户的标号，如果需要确认当前用户标号，可以运行 adb shell am get-current-user 查看。

### 第三步：导入应用和配置

卸载完重启手机后，可以导入替代应用：

- Gboard 输入法替代小米输入法
- 三星浏览器或 Firefox 替代系统浏览器
- Lawnchair 类原生桌面替代系统桌面（可选）
- 谷歌相机替代自带相机（需要设备支持）
项目还提供了通过 Activity Launcher 调出原生安卓设置的方法，方便进一步禁用系统应用的部分权限。

## ⚠️ 几个关键提醒

项目文档里标注了好几处容易踩坑的地方：

- com.android.htmlviewer 和 com.miui.packageinstaller 千万别卸载，重启直接卡米
- com.xiaomi.metoknlp 和 com.xiaomi.location.fused 卸载后切换明暗主题会卡死
- com.miui.miwallpaper 卸载后桌面直接黑屏
- 从 HyperOS 2 升级到 3 后重启可能会卡米，建议升级前手动备份文件
- 虚拟内存建议关闭或只扩展到 4GB，实际感知不强
如果不小心卡米了，长按音量上 + 开关键 10 秒进入刷机模式，清除全部数据重新开始。所以操作前一定一定记得备份。

## 💡 适合谁用

- 小米手机用户，受够了系统广告但又不想换手机
- HyperOS 系统版本在 1/2/3 的用户，需要一个干净的手机环境
- 拿小米手机当备用机的用户，希望尽可能精简系统
- 有 ADB 基础或愿意花时间了解命令行操作的折腾派
如果你是第一次接触 ADB，建议先把项目的 README 完整读一遍再动手。整个操作过程不算复杂，但涉及的包名比较多，一次操作大概需要 15-20 分钟。完成后重启手机，你会得到一个几乎没有广告的小米手机。


