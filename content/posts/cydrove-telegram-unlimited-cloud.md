---
date: "2026-09-10"
type: blog
tags:
  - 工具
  - Telegram
  - 云存储
  - 开源
  - WebDAV
title: "把 Telegram 变成无限云盘，本地直接挂载"
description: "Telegram 云端存储近乎无限还免费，可惜没做成云盘。CyDrive 用 WebDAV 协议把它映射成 Windows 本地盘符，往 Y: 盘丢文件自动传云端，2GB 以上自动切片，还能加密上传。"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=cydrove-telegram-unlimited-cloud"
---

手机拍张合影，想同步到电脑，传统做法是开微信传文件。要是文件大、还想要个无限空间的备份盘，我一般会想到 Telegram——它的云端存储近乎无限、速度快、还免费。缺点也明显：Telegram 没被设计成云盘，文件只能手动发给自己，没法像本地硬盘那样直接拖拽。

后来发现了 **CyDrive**（⭐107），一个开源工具，把 Telegram 的 Saved Messages 整理映射成 Windows 本地盘符，云端存储秒变 Y: 盘。

项目地址：https://github.com/thecynetx/CyDrive

## 🎯 它怎么做到"无限云盘"

CyDrive 走 WebDAV 协议搭虚拟盘，底层用 Telegram MTProto 连云端。你往 Y: 盘丢文件 → 自动上传到 Telegram；给机器人发文件 → 文件立刻以 0 字节占位出现在 Y: 盘。本地磁盘不占空间，等于把 Telegram 的免费存储当成了你的备份盘。

| 存储容量 | 效果 |
|---------|------|
| 本地占用 | 几乎为零（元数据缓存） |
| 文件大小 | 单文件 2GB，超出自动切片上传 |
| 下载 | 无缝重组，感觉不到切片 |
| 加密 | 可选 AES-256-GCM 客户端加密 |

## ⚙️ 核心能力

**原生盘符体验。** 挂载后直接显示在"此电脑"里，像 C 盘 D 盘一样自然。开机自动挂载，关机自动卸载，完全无感。

**Web 面板。** 浏览器打开 `http://127.0.0.1:8088` 就能看到赛博朋克风格界面：实时存储仪表盘、即时搜索、拖拽上传、浏览器直接播放 MP4/FLAC/MP3/图片。手机开这个面板，在公司也能远程预览家里的文件。

**SQLite 元数据引擎。** 目录树、SHA-256 哈希、Telegram 消息 ID 全记录，亚毫秒级查询。存了 5000 张照片，搜索关键词秒出结果。

**大文件分块。** Telegram 单文件限制 2GB，CyDrive 自动切片编号上传，下载时无缝重组。备份 10GB 的 4K 视频母版，直接往里扔就行。

**零知识加密。** 开启 AES-256-GCM 后，文件在客户端先加密再上传，Telegram 只看到乱码，只有你能解密。存合同扫描件、隐私照片，连 Telegram 官方都看不到内容。

## 🚀 部署三步

1. Telegram 里找 **@BotFather**，发 `/newbot` 拿 Bot Token
2. 找 **@userinfobot** 按 Start，拿到你的 Chat ID
3. 本机装依赖启动：

**Windows：**
```bash
git clone https://github.com/thecynetx/CyDrive.git
cd CyDrive
pip install -r requirements.txt
python main.py
```

**Linux（Debian/Ubuntu/CentOS）：**
```bash
sudo apt update && sudo apt install -y python3 python3-pip python3-venv git
git clone https://github.com/thecynetx/CyDrive.git
cd CyDrive
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 main.py
```

首次运行会弹交互式向导，按提示填 Token 和 Chat ID，自动挂载本地盘符。

![CyDrive Web 管理面板截图，展示存储仪表盘](https://i.ibb.co/ZztBnW90/22c3e0e49fa9.png)

![CyDrive 命令行预览界面](https://i.ibb.co/60VwwT3J/4564a0962e39.png)

![CyDrive 项目 Banner 图](https://i.ibb.co/ycLzgQrh/5e5abcabd54e.jpg)

## 💡 使用技巧

1. **手机拍图发 Bot** → 电脑上 Y: 盘立刻出现，不用再开微信传文件
2. **零成本备份** → 照片、文档直接拖盘符，本地不占空间
3. **远程预览** → 手机开 Web 面板，公司看家里的文件，不用下载整包
4. **隐私文件** → 记得开加密，上传前就加密，连 Telegram 都读不到

## ⚠️ 要知道的边界

Telegram 不是专门为无限云盘设计的，CyDrive 是在它的文件存储上做了一层整理。自动化上传下载属于对 Telegram 的合理使用，但批量灌库、高频操作仍建议关注 Telegram 的账号风控。加密后连官方都读不到，请务必妥善保管你的密钥，丢了谁也解不开。

## 写在最后

实测下来，最值的是把 Telegram 的免费存储变成正经备份盘——照片、大文件、隐私文件都能往里塞，本地零占用。适合想白嫖云盘容量、又不信任第三方网盘的用户。操作门槛不高，部署三步就能跑起来。

如果你想要个无限空间的免费备份盘，CyDrive 比再开一家网盘会员实在。用它之前记得想清楚加密密钥怎么保管——这是唯一能锁死你数据的东西。

## 🤔 跟其他 Telegram 云盘方案有什么区别

目前 Telegram 生态里已经有 T-Drive、Telegram-Drive、teldrive 等类似项目。CyDrive 跟他们最大的不同在于**接入方式和形态**：

| 方案 | 形态 | 接入方式 | 核心差异 |
|------|------|---------|---------|
| **CyDrive** | 本地虚拟盘 + Web 面板 | Telegram Bot + MTProto | 映射为 Windows 盘符，像操作本地硬盘一样拖拽文件 |
| **Telegram-Drive** | 桌面 GUI 应用 | Telegram API (需 API ID/Hash) | 独立客户端界面，需要单独登录 Telegram 账号 |
| **T-Drive / teldrive** | 主要是 Web 服务 | Telegram API / Bot | 偏重网页端管理，不是原生盘符体验 |

CyDrive 走的是**系统级虚拟盘**路线——WebDAV + 本地盘符，不需要你换用新的客户端界面， Explorer 里直接操作。如果你想要的是"把 Telegram 当成本地 D 盘用"，而不是"再装一个网盘客户端"，CyDrive 是更轻量的选择。加密和 Web 面板是加分项，但核心差异还是盘符映射这一点。