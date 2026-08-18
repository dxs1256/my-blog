---
date: "2026-07-30"
type: blog
tags:
  - "工具"
  - "SSH"
  - "AI"
title: "轻量级 SSH 工具，Claude 也能直接接管"
description: "Pixshell 是一款轻量级 SSH 客户端，终端 SFTP 同屏、AI 交互、Web SSH、多标签管理，还能一键注册为系统默认 SSH 工具让 AI 无缝接管。"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=pixshell-ssh"
---

用过不少 SSH 工具，要么太臃肿，要么功能不够，要么频繁弹窗授权烦死人。最近发现了一个叫 [**Pixshell**](https://github.com/lyu0805/pixshell) 的工具，轻量级，UI 紧凑，功能却意外地丰富。

项目地址：https://github.com/lyu0805/pixshell

## 核心体验

### 多标签 + 同屏 SFTP

多标签管理服务器，终端和 SFTP 同屏显示，切换目录同步，不用再开两个窗口来回切了。

![Pixshell 主界面截图](https://i.ibb.co/PsmXbTgN/e28f2ee8ab0c.jpg)

### AI 交互支持

内置 HTTP Agent Bridge（`127.0.0.1:8766`），支持 MCP Server 与无头模式驱动持久会话。这意味着 Claude Code、Codex、Grok 这些 AI 工具可以直接通过它来操作远程服务器。

### AI SSH 自动注册

一键检测并注册为系统默认 SSH 包装工具（`pixshell-ssh`），AI 工具自动接管 SSH 会话，不用手动配置。

![Pixshell AI 功能配置](https://i.ibb.co/8n8JKH5h/5eceee20c420.jpg)

### Web SSH 网页终端

内置轻量 xterm.js 浏览器终端接口（`GET /webssh`），浏览器里也能直接 SSH 连接。

### 零弹窗打扰

采用本地 `credentials.dat` 加密存储凭证，没有 Keychain 弹窗，没有本地网络授权弹窗，清爽。

## 实用功能盘点

**文件权限修改（Chmod）**：9 项读写执复选框，八进制显示，递归设置子目录与类型过滤，支持窗口拖动与随意缩放。

**打包传输**：大文件与目录自动压缩传输，目标端自动解压并清理两端临时包。

**主机指纹管理**：`known_hosts` 查看、单条删除、导入与导出备份。

**内置文本编辑器**：支持远程文本编辑、查找、替换与一键保存回写。

**命令输入框快捷键**：全选、剪切、复制、粘贴与 Esc 焦点切换，操作流畅。

![Pixshell 文件管理和编辑功能](https://i.ibb.co/S7tGNYTC/72a0350782a2.jpg)

**服务器性能与网络实时监控**：CPU、内存、磁盘及网卡实时上下行速率。

**密钥与代理支持**：密码/私钥认证，SOCKS5 / HTTP 代理。

![Pixshell 性能监控和连接管理](https://i.ibb.co/x8hs5PJw/4761d31ee156.jpg)

## 一句话总结

如果你想找一个轻量但不简陋、功能丰富又不打扰的 SSH 工具，Pixshell 值得试试。尤其是 AI 相关的集成能力，在同类工具里算是独一份的。