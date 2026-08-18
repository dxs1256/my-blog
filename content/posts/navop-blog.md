---
date: "2026-08-03"
type: blog
tags:
  - "开源"
  - "运维"
title: "数据库SSH远程桌面AI，一个软件全搞定"
description: "Navop - 基于 Rust+GPUI 的全能工作台，集成数据库管理、SSH、SFTP、远程桌面、VNC、AI 助手，开源免费，跨平台。"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=navop-blog"
---

作为运维，你是不是也这样：早上打开电脑，先开 Navicat 查数据库，再开 xShell 连 SSH，WinSCP 拖文件，mstsc 远程桌面连 Windows 服务器，最后再开个 AI 工具查文档……一天下来窗口切到飞起。

如果把这些全部整合到一个应用里，那不是爽死了？

最近发现的 **Navop** 就是干这个的——一个把数据库、SSH、SFTP、远程桌面、VNC、AI 全部集成到一起的工作台，而且目前全免费。

项目地址：https://github.com/feigeCode/navop

## ⚡ 技术底子扎实

Navop 用 **Rust + GPUI** 构建，GPU 加速渲染，启动快、内存低、交互跟手。macOS、Windows、Linux 三端都能跑出接近系统原生的体验，不是那种 Electron 套壳的笨重货。

## 🗄️ 数据库工作台

内置支持的数据库覆盖面很广：

- **主流关系型：** MySQL、PostgreSQL、SQLite、DuckDB、SQL Server、Oracle、ClickHouse
- **NoSQL：** Redis、MongoDB
- **国产及扩展：** 达梦 DM、人大金仓 KingbaseES、GBase 8s、OceanBase、openGauss、Apache IoTDB 等

信创场景直接即装即用，这一点对国内用户很友好。

![数据库工作台界面](https://i.ibb.co/CprRzJxt/97618d10553e.png)

## 🔌 SSH / SFTP / 终端

支持 SSH 连接 Linux 服务器，自带 SFTP 文件管理器，侧边栏拖拽上传、粘贴剪贴板图片、路径收藏快速跳转，还有端口转发和 X11 支持。

## 🖥️ 远程桌面 RDP / VNC

直接支持 RDP 和 VNC，Windows 服务器和 VNC 主机从同一个工作区进入，不用再开第三个软件。对于用 macOS 内网连 Windows 服务器的场景特别方便。

![远程桌面与SSH终端](https://i.ibb.co/5hHQSvsJ/ebb6910cff37.png)

## 🤖 AI 助手

支持自然语言转 SQL，看不懂某段 SQL？直接问 AI 就行。支持接入免费大模型，日常查文档、写查询都很方便。

## 🔒 安全 & 团队同步

连接配置跨设备加密同步，主密钥本地加密。支持个人同步和团队共享连接配置、权限分配，团队协作也不用愁。

## 📊 对比一下

| 维度 | Navicat | Navop |
|------|---------|-------|
| 数据库管理 | ✅ 强 | ✅ 强，含国产库 |
| SSH/SFTP | ❌ | ✅ 原生集成 |
| 远程桌面 | ❌ | ✅ 原生集成 |
| 端口转发 | ❌ | ✅ 支持 |
| AI 助手 | 部分有 | ✅ 深度集成 |
| 技术架构 | Java/Electron | Rust+GPUI |

![功能对比与界面展示](https://i.ibb.co/0RqsnjL6/12c62ac40382.png)

## 📥 获取方式

项目完全开源，GitHub：https://github.com/feigeCode/navop

官网：https://navop.dev，文档：https://docs.navop.dev/zh-CN/

三端安装包都能从 GitHub Releases 下载。

![Navop 整体界面](https://i.ibb.co/zVmf7YQs/fea0aec850bd.png)

## 💡 最后说几句

Navop 还很年轻，可能会有小 bug，但开发者的迭代速度很快，社区反馈的问题基本都能及时修。对于运维来说，一个软件搞定数据库、服务器、远程桌面和 AI 查询，确实省事不少。值得一试。