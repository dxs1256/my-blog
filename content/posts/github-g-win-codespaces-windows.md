---
date: "2026-06-14"
type: "Post"
tags:
  - "热门文章"
  - "教程"
  - "GitHub"
  - "Windows"
  - "云服务器"
  - "白嫖"
title: "白嫖党狂喜！在GitHub上免费申请4核16G云服务器，还能跑Win11"
description: "手把手教你用 GitHub Codespaces 白嫖一台 4 核 16GB 的云服务器，还能装 Windows 11，全程免费，有手就行。"
categories:
  - "教程"
image: "https://bing.ee123.net/img/rand?seed=github-g-win-codespaces-windows"
---

[//]: # (notion-sync-id: 37f874cb-3972-815c-bb0b-f4d7b9df0b5a)

最近刷到一个很有意思的项目——在 GitHub Codespaces 里跑 Windows 11，配置给到 4 核 16GB，而且是完全免费的。试了一下确实能跑起来。

🔗 GitHub：https://github.com/1061700625/github_vps

---

## 🎯 什么原理？

GitHub Codespaces 本质上是 GitHub 提供的云开发环境，底层是一台 Linux 虚拟机。这个项目做的事情很简单：在这个虚拟机里用 Docker 跑了一个 Windows 11 容器。

也就是说，GitHub 免费给你的那台 4 核 16GB 服务器，你拿来跑了一套完整的 Windows 11。

项目本身还支持 Ubuntu 和 Windows 双系统选择，端口分配也很清晰：

| Header | Header | Header | 
| --- | --- | --- | 
> _(表格内容通过子行渲染)_

![Ubuntu 终端运行界面](https://i.ibb.co/MLMYXFn/e7cd03390baf.png)

---

## 🎯 为什么值得搞？

- 完全免费，GitHub 官方提供，0 成本
- 配置最高 4 核 16GB，对于临时用用完全够
- 纯净系统，没有国产云厂商那些预装软件
- 网络走 GitHub 基础设施，国内访问速度不错
---

## 👇 操作步骤

### 📍 Fork 仓库

打开项目页，点右上角的 Fork，把仓库复制到你自己的 GitHub 账号下。

![Windows 11 桌面运行效果](https://i.ibb.co/Y4hs2zJq/67571d5f6b12.png)

### 📍 创建 Codespace

Fork 完后进入 Codespaces 页面，点 New codespace。选择你刚 Fork 的仓库，配置选 4-Core。

### 📍 启动 Windows

Codespace 启动后终端会自动打开，直接执行：

bash start.sh

脚本会自动拉取 Docker 镜像并启动 Windows 11 容器。这个过程需要几分钟，等终端出现端口转发链接就行了。

### 📍 访问 Windows

鼠标放到终端里的端口转发链接上，会出现 Open in Browser，点击它就会打开 Windows 11 的管理界面。

进去之后就是 Windows 11 的安装流程，走完就能看到熟悉桌面了。

## 🎯 一些注意事项

关于自动删除：Codespaces 如果不活动超过一段时间会自动删除。可以在 Codespaces 设置里关掉 auto-delete，或者在后台跑个脚本保持活跃。

关于网络访问：默认的端口转发是 private 的，只能你自己访问。如果需要分享给别人用，可以在 Codespaces 的 Ports 选项卡里把端口设为 Public。

![端口公开设置](https://i.ibb.co/7t0WS6BP/c533d0e11e9a.png)

关于性能：4 核 16GB 跑 Windows 11 确实不算快，但做临时测试、跑跑脚本完全够用。如果只是需要 Linux 环境，Ubuntu 模式会更流畅。

关于持久化：Codespace 停掉后数据不会丢，但长时间不活跃会被回收。重要数据建议定期备份到 GitHub 仓库或外部存储。

GitHub 免费用户每月有 120 小时（4 核）或 180 小时（2 核）的 Codespaces 额度，对个人使用来说相当充裕。


