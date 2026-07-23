---
date: "2026-07-23"
type: blog
tags:
  - 开源
  - 开发工具
  - 演示
title: "把代码变成动画幻灯片，免费开源离线的OpenSlides"
description: "免费开源离线的桌面应用，把代码变成带动画效果的演示幻灯片，支持Magic Move、16种语法高亮主题"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=openslides-code-presentation-tool"
---
[//]: # (notion-sync-id: )

最近在准备一个技术分享，想把代码讲得清楚一点。试过直接在 IDE 里演示，观众经常跟不上光标在跳哪一行；截图贴到 PPT 里又太死板，代码改起来还要重新截图。后来发现了一个专门解决这个痛点的工具——OpenSlides。

项目地址：https://github.com/codewiththiha/OpenSlides

OpenSlides 是一个免费、开源、离线的桌面应用，专门用来把代码变成带动画效果的演示幻灯片。你可以理解成 Keynote 和 VS Code 的合体，但更聚焦在代码演示这个场景上。它基于 Tauri 2 构建，Rust 做后端，前端是 React + TypeScript，所有数据存在本地 SQLite 里，不需要注册账号，不需要联网，不需要订阅。

🎯 每行代码单独设高亮步骤和强调效果

把一段代码拆成多个步骤，演示的时候一行一行地展示，观众能清楚看到你讲到哪一行了。每步还可以设置不同的强调效果，比如放大、变色、加边框。你可以精确控制每一步要展示什么内容，而不是一次性把整段代码甩出来。

![OpenSlides 演示截图](https://i.ibb.co/5Nx7RKF/openslides-thumb.jpg)

🎯 Magic Move 代码状态切换动画

这是最酷的功能——同一个函数从初始版本变成优化版本，中间的过程用平滑动画过渡，而不是生硬地跳转。看起来就像 Apple 发布会上的那种丝滑效果。底层用的是 shiki-magic-move 引擎，渲染效果和 VS Code 保持一致。

🎯 16 种语法高亮主题

内置 16 种语法高亮主题，支持浅色和深色模式。不管你是暗色主题党还是需要浅色背景做演示，都能找到合适的配色。主题基于 Shiki 引擎，和 VS Code 同款。

🎯 全屏演示 + 自动播放

做好幻灯片后直接进入全屏演示模式，每页可以设置不同的停留时间，支持自动播放。适合录制教程视频或者无人值守的展示。键盘快捷键操作，演示过程中流畅切换。

🎯 项目管理

一个项目可以包含多张幻灯片，支持拖拽排序、复制粘贴、搜索筛选。项目可以导出为文件分享给其他人，也可以导入别人分享的项目。支持缩略图预览和悬停预览。

🎯 技术细节

- 技术栈：Tauri 2 + Rust + React + TypeScript + Vite + Tailwind CSS
- 代码渲染：Shiki + shiki-magic-move
- 本地存储：SQLite
- 最新版本：v1.0.3
- 支持平台：macOS（DMG）、Windows（exe/msi）
- 许可证：MIT

🎯 适合谁用

录制技术教程的创作者——逐行展示代码，配合 Magic Move 平滑过渡，视频效果比录屏好得多。准备技术分享或演讲的开发者——不用再在 IDE 和 PPT 之间来回切换，一个工具搞定所有代码演示。在线教学的老师——学生能清楚看到每一行代码的讲解，不会跟丢。直播写代码的主播——每步高亮让观众知道你当前在写什么。

OpenSlides 目前还比较新（GitHub 63 Star），但核心功能已经非常完整了。如果你经常需要做代码演示，值得一试。
