---
date: "2026-07-19"
type: blog
tags:
  - 必看精选
  - Windows
  - 开源
  - 工具推荐
  - 免费
title: "不用U盘，桌面点几下就能重装系统"
description: "LetRecovery：在Windows桌面直接跑完重装流程，Rust+egui开发，零U盘零BIOS"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=no-usb-reinstall-system"
---
[//]: # (notion-sync-id: ...)

上周推荐了 HotPE，评论区好几个人问：**"装系统还是得先搞个 U 盘啊，有没有不用 U 盘的办法？"**

说实话，我写推荐的时候也想过这个问题。PE 是好工具，但它的定位是"急救"——系统进不去了、数据要抢救、密码忘了，用 PE 进一个小型 Windows 环境操作。但重装系统？你还是得先下 ISO、拿 Rufus 烧 U 盘、进 BIOS 改启动顺序，一套流程走下来，耐心已经耗掉一半。

后来翻到了 [**LetRecovery**](https://github.com/NORMAL-EX/LetRecovery)（⭐1.1k），上面这些问题一次性全解决了。

项目地址：https://github.com/NORMAL-EX/LetRecovery

## 🎯 它解决什么问题

简单说：**在 Windows 桌面里直接跑完整个重装流程，不需要 U 盘，不需要进 BIOS，点几下就行。**

LetRecovery 是一个用 Rust + egui 开发的开源系统重装工具，GitHub 上完全免费，零广告零捆绑。它分两个端：

| 端 | 用途 |
|---|---|
| **桌面端** | 正常 Windows 里直接跑，点几下开始安装 |
| **PE 端** | 内置 WinPE，重装当前系统盘时自动进 PE 完成后半程 |

整个过程你只需要打开软件，选镜像，选分区，点开始——剩下的它自己搞定。

## 📊 和 HotPE 比，区别在哪

很多人问"有了 HotPE 还要不要 LetRecovery"，简单做张表：

| 对比项 | HotPE | LetRecovery |
|---|---|---|
| 是否需要 U 盘 | ❌ 必须 | ✅ 完全不需要 |
| 运行方式 | U 盘启动进 PE | Windows 桌面直跑 |
| 重装当前系统盘 | ⚠️ 复杂，需 U 盘 | ✅ 一键搞定 |
| UI 美观度 | WinPE 原生界面 | Rust+egui 现代 UI |
| BitLocker 支持 | 无 | ✅ 自动解锁/解密 |
| 在线下载镜像 | 无 | ✅ Aria2 多线程 |
| 内置备份功能 | 无 | ✅ WIM/ESD/GHO |

**HotPE 适合急救场景**（分区、救数据、删密码），**LetRecovery 适合系统重装场景**（装新系统、备份、迁移）。两者互补，不是替代。

## 🔥 核心功能盘点

### 不用 U 盘的重装方式
打开软件 → 选镜像 → 选目标分区 → 点开始。自动写引导、重启、进内置 WinPE、完成部署。

传统流程：下 ISO → Rufus 烧 U 盘 → BIOS 设启动 → 进 PE → 手动装
LetRecovery：三步搞定，中间没有任何 U 盘插入的环节。

### 多格式镜像全支持
WIM / ESD / SWM / GHO / ISO 全支持，甚至包括 Windows XP / 2003 文本模式安装——这年头极少工具有这个能力。

### BitLocker 加密盘直接重装
很多公司笔记本都开了 BitLocker，传统重装流程要先手动关掉，不然连盘都读不了。LetRecovery 能自动识别 BitLocker 加密的系统盘，先解锁/解密再部署，省一步。

### 在线下载系统镜像
内置 Aria2 多线程下载引擎，在软件里直接选 Windows 版本下载，跑满带宽，不用自己找 ed2k / 磁力链。

### 完整工具箱
不只是重装——它还自带系统备份（完整/增量）、驱动导出导入、密码重置、引导修复、WiFi 配置迁移、无损扩大 C 盘、卸载预装 UWP 等实用功能。

![LetRecovery 界面截图](https://i.ibb.co/j93WJ1j6/624a7bbe39dc.png)

## 💡 实际体验：点了三下，喝了杯水

我昨天在虚拟机里试了一把：

1. **下载安装**：GitHub Releases 下最新版，右键"以管理员身份运行"
2. **选镜像**：本地已有 ISO 直接选，没有的话点"在线下载"，选 Windows 11 23H2，Aria2 多线程速度跑满带宽
3. **点开始**：确认目标分区，点开始，自动写引导 → 重启 → 进 PE → 部署

全程大约 15-20 分钟，比 U 盘方式省了"做启动盘 + BIOS 设启动项"这两步。

## 🎯 适合谁用

- **不想折腾 U 盘的人**：家里翻半天找不到 U 盘，或者 U 盘里还有重要数据不想格式化
- **需要批量部署的 IT 运维**：无人值守安装 + 在线下载镜像，装机效率提升一个数量级
- **BitLocker 加密用户**：公司笔记本、个人加密盘用户，省去手动解密的步骤
- **想要备份/恢复一体的人**：重装前先做个增量备份，装完不满意还能恢复

## 💬 最后说两句

LetRecovery 和 HotPE 各司其职，配合使用体验最佳。一个负责装系统，一个负责修急救。如果家里没有 U 盘、或者嫌 U 盘操作麻烦，LetRecovery 就是那个"懒人福音"——打开软件点几下，剩下的交给它。

官网：https://sysre.cn/
GitHub：https://github.com/NORMAL-EX/LetRecovery