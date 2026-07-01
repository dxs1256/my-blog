---
date: "2026-05-08"
type: "Post"
tags:
  - "必看精选"
  - "Chrome"
  - "AI"
  - "安全"
title: "Chrome浏览器后台偷装4GB AI大模型，删了还会自动重下"
description: "谷歌Chrome浏览器在用户不知情的情况下，后台自动下载约4GB的Gemini Nano模型文件，用于驱动辅助写作、诈骗检测等AI功能。本文详解事件经过及彻底禁用方法。"
categories:
  - "技术资讯"
image: "https://bing.ee123.net/img/rand?seed=chrome-silent-gemini-nano-download"
---

[//]: # (notion-sync-id: 359874cb-3972-81ca-ae25-d0a3c4efbaa3)

最近有安全研究员发现了一个让人不安的事情：你每天在用的 Chrome 浏览器，居然在后台悄悄下载了一个 4GB 的 AI 大模型，整个过程零通知、零授权。

更离谱的是，即使你手动把文件删了，它还会自动重新下载回来。这引发了不少用户对终端控制权和存储资源消耗的担忧。

---

## 到底发生了什么

谷歌 Chrome 浏览器开始在后台自动向符合硬件条件的用户设备下载体积约 4GB 的 **Gemini Nano** 人工智能模型文件。核心文件名为 `weights.bin`，存放在用户系统目录的 `OptGuideOnDeviceModel` 文件夹中。

在无用户交互的情况下，后台下载及部署过程约耗时 **14 分钟**。下载完成后，Chrome 会利用该本地大语言模型驱动一系列默认开启的 AI 功能。

---

## 哪些功能在用这个模型

- **辅助写作**：Chrome 内置的 AI 写作助手
- **端侧诈骗检测**：在本地检测钓鱼网站和诈骗信息
- **网页总结**：AI 自动摘要网页内容
这些功能都是默认开启的，用户在安装或更新 Chrome 时不会收到任何提示。

---

## 问题在哪里

- **零授权下载**：4GB 的文件在后台静默下载，不弹窗、不提示
- **删了还会下回来**：手动删除 `OptGuideOnDeviceModel` 文件夹后，Chrome 会在下次启动时自动重新下载
- **占用存储空间**：4GB 不是小数目，对存储紧张的设备影响明显
- **资源消耗**：后台部署和运行模型会占用 CPU 和内存资源
---

## 如何彻底禁用

如果你不想让 Chrome 在你的电脑上跑 AI 模型，可以按以下步骤操作：

### 第一步：禁用相关 Flag

打开 `chrome://flags`，搜索并禁用以下两项：

- **`optimization-guide-on-device-model`** → 设为 Disabled
- **`prompt-api-for-gemini-nano`**（或相关 Prompt API）→ 设为 Disabled
### 第二步：重启 Chrome

修改 Flag 后需要完全关闭并重启浏览器。

### 第三步：手动删除模型文件

- Windows：%LOCALAPPDATA%\Google\Chrome\User Data\OptGuideOnDeviceModel
- Mac：~/Library/Application Support/Google/Chrome/User Data/OptGuideOnDeviceModel
### 第四步：关闭 AI 实验功能

建议同时在 Chrome 设置里关闭所有 AI 实验功能，避免其他 AI 特性被自动启用。

---

## 写在最后

谷歌的做法确实值得商榷——4GB 的模型文件在后台静默下载，既不通知也不征求同意，这在隐私和用户自主权层面都有争议。虽然诈骗检测和网页总结等功能出发点是好的，但至少应该给用户一个选择的权利。

如果你对存储空间敏感，或者单纯不想让浏览器在后台跑 AI 模型，按上面的步骤操作就能彻底关掉。

---


