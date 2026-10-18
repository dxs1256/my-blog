---
date: "2026-10-18"
type: blog
tags:
  - SSH
  - AI
  - 开源
  - DevOps
  - 终端
title: "会自己动手的 AI 运维搭档"
description: "Netcatty 是 2025 年底开源、不到一年冲到 6.6k star 的 SSH 客户端：终端、SFTP、主机库全在一个工作区，内置的 Catty Agent 能直接上手执行命令，一句话跨两台服务器编排 Docker Swarm 集群。"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=netcatty-ai-ssh-client"
---

还在用 PuTTY、SecureCRT 的时候，管理几台服务器是这么个画面：终端窗口开一排，每台机器一个标签，排查问题就挨个敲 `top`、`journalctl`，想不起来某台机器装了什么就 SSH 进去翻。工具本身没问题，烦的是"人肉运维"这件事——命令要自己记、多台机器的操作要自己排队。

后来发现了一个叫 **Netcatty** 的开源 SSH 客户端（⭐6.6k，2025 年 12 月创建，不到一年冲到六千多星）。它把终端、SFTP 和 AI 放进一个工作区，而且那个 AI 是真的会干活，不是只会聊天。

项目地址：https://github.com/binaricat/Netcatty

## 🎯 这是什么

Netcatty 是基于 Electron + React + xterm.js 的跨平台 SSH 工作台（macOS / Windows / Linux），定位是 PuTTY、Termius、SecureCRT 的现代替代品。它把四件事塞进一个窗口：SSH 终端、SFTP 文件管理、主机库（Vault）、内置 AI 搭档 **Catty Agent**。

如果你手头有 3 台以上服务器要管、想少敲点命令，这个项目值得花十分钟摸熟。下面是它跟普通 SSH 客户端不一样的地方。

![Netcatty 主界面全景](https://i.ibb.co/bMM4cx5V/69bfff027bae.png)

## ✅ Catty Agent：AI 不是问答框，是执行者

大多数工具里的"AI 功能"是内置一个聊天窗口，你问它"这条命令什么意思"，它回答你，然后你自己去敲。Catty Agent 不一样，它能直接操作你的服务器。

单主机场景：让它检查一台服务器的健康状态，它会自己决定跑什么命令（uptime、df、journalctl 这类），分析输出，再给你一个结论——从"要求"到"结论"全程不用你动手。

![Catty Agent 单主机智能诊断，自动运行命令并分析输出](https://i.ibb.co/nsJHXBp9/62b31fdefc93.png)

多主机场景更夸张。README 里有个演示：用一句话让它在两台服务器上搭 Docker Swarm 集群，它自己完成 init、token 交换、节点加入——这些操作平时要登录两台机器来回拷 token，现在一句人话搞定。

![Catty Agent 跨两台服务器编排 Docker Swarm 集群](https://i.ibb.co/Y44wyv3D/fba3cfdc8478.png)

关键在"上下文感知"：它不是拿通用答案糊弄你，而是能感知你连的是哪台机器、什么系统，再给出针对性的操作。命令由你确认，执行和编排交给它。

## 🖥️ 工作区设计：分屏 + Vault

对经常同时盯几台机器的人来说，Netcatty 的主界面按"工作区"设计，不是单个终端窗口。

**分屏**：水平/垂直都能拆。部署的时候一边跑 build，一边 tail 日志，一边看监控，三个面板一个窗口，不用来回切。

![分屏终端，多台服务器同时监控](https://i.ibb.co/qYc7CHSF/dc6f294473c9.png)

**Vault（主机库）**：网格、列表、树形三种视图管理主机和分组。机器多了以后，树形视图 + 快速搜索比翻书签强。它还会自动识别远程系统（Ubuntu、Debian、Arch、Kali……一长串），在列表里显示对应图标，一眼看清每台机器是什么系统。

![Vault 树形视图管理主机](https://i.ibb.co/qf7fWNS/9fa540424ff4.png)

**会话恢复**：工作区会记住你的布局，长期驻留的工作流不用每次重新开。

## 📁 SFTP：双窗格 + 就地编辑

文件传输不是"附加功能"而是日常：双窗格文件浏览，拖拽上传下载，远程文件用内置编辑器直接改、直接保存。对经常改 nginx 配置、翻日志的人来说，省掉"下载 → 改 → 上传"的循环。

## 🎨 细节：内联图片、自定义主题

- **内联图片**：支持渲染远端程序输出的 Kitty graphics、SIXEL、iTerm 图片——在终端里直接看图，不用把文件拉回来再打开
- **自定义主题 + 关键词高亮**：外观和终端输出高亮都能按自己习惯调

## 📦 上手

到 GitHub Releases 下载对应平台的安装包：macOS（Universal，已签名公证）、Windows（x64 / arm64）、Linux（x64 / arm64，AppImage / deb / rpm / pacman 都有）。Windows 用户也可以用 Scoop 装，NixOS 有现成 flake。

安装后打开，把服务器加进 Vault 就能开用，没有复杂的初始化流程。

![Netcatty 主界面](https://i.ibb.co/67hQPY3t/c2bc91913c20.png)

## 💡 我的判断

同类工具里我之前写过 HexHub（SSH+数据库+Docker+AI 工具链）、Pixshell（轻量 + 让 Claude Code 接管）、ternssh（浏览器里跑 Cloudflare Workers 工作台）——Netcatty 跟它们的差异在两点：**桌面原生的工作区体验**（分屏、Vault、会话恢复这套组合只有桌面客户端做得出）和 **Catty Agent 真正执行多主机操作**（其他几个的 AI 要么生成命令、要么让外部 AI 接管，只有它自带执行能力）。

适合手头有多台服务器、愿意把重复操作交给 AI 的运维和开发者。只连一台机器、装个最小终端就够的人，没必要为了 AI 多背一个 Electron 应用。

两个提醒：Windows 版目前可能未签名（项目正在申请 SignPath 免费签名，装的时候留意 Defender 提示）；便携版数据存在程序旁的 `data` 文件夹，密码和私钥受系统用户保护，迁移电脑要重新录入。项目是 GPL-3.0，完全开源。
