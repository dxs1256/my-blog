---
date: "2026-05-06"
type: "Post"
tags:
  - "AI"
  - " 开源"
  - "智能家居"
  - "小讯音箱"
  - "热门文章"
title: "R1 音箱 AI 复活方案"
description: "让斐讯音箱接入大模型，解锁音乐、故事、广播、AI对话等功能的开源方案"
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=r1-speaker-ai-revival"
---

[//]: # (notion-sync-id: 358874cb-3972-819f-9dc9-d47981adfd3f)

😀

斐讯 R1 音箱 AI 复活方案是一个让斐讯智能音箱重新焕发生机的开源项目。通过修改 APK 接入大模型，无需网络劫持，即可实现音乐播放、广播故事、AI 对话、氛围灯控制等功能。

---

## 📥 下载地址

- 百度网盘：https://pan.baidu.com/s/1KE2ejj_h5MuwtaICE8rWDg（提取码：9iaq）
- GitHub：https://github.com/ring1012/r1-dummy
> 📌 Star 数超过 1000 后开源 APK 源码

---

## ⚙️ 设备要求

- 仅支持：原厂 3448 版本的斐讯设备
- ROOT 设备请自行测试
- 其他版本需先刷回原版斐讯固件
---

## 🚀 快速开始

### 1. 安装 APK

将下载的 APK 安装到 斐讯 R1 音箱

### 2. 访问管理页面

安装完成后，在浏览器访问：

> 🔗 http://音箱IP地址:18888

### 3. 基础功能

- 音乐服务：安装后默认可用
- 控制器：操作氛围灯、切换发音人、修改音乐源
- 支持自定义音乐播放源
---

## 🤖 AI 配置（免 Docker 方案）

### 步骤 1：进入 AI 配置页面

打开 http://音箱IP:18888，点击 AI 配置

### 步骤 2：填写 API 信息

支持以下 AI 平台：

- 模搭：默认配置，免费（需实名认证）
- GLM：备用选择，免费
- Qwen：需填写 extra 参数
### 步骤 3：测试并保存

点击「测试」验证连接，测试通过后保存配置

### 步骤 4：修改 AI Endpoint（可选）

默认请求发送到 r1-py 服务，可在控制器页面修改 endpoint 地址

> 🔑 AI Key 需自行申请获取

---

## 📁 开源项目

- r1-py（Cloudflare Python）：AI 调用 Tools 的边缘服务 - https://github.com/ring1012/r1-py
- r1-admin-page（EdgeOne Node.js）：小讯管理后台页面 - https://github.com/ring1012/r1-admin-page
> 💡 媒体服务部署在 Cloudflare，不开源

---

## ⚠️ 注意事项

- 旧方案已废弃：网络拦截 ASR 方案不再维护，用过网络劫持的用户请取消 asrv3.hivoice.cn 的劫持
- 音乐源说明：APK 默认集成一个音乐源，音乐服务不开源（防止律师函），支持自定义添加其他音源
- 设备兼容性：仅测试过原厂 3448 版本，ROOT 或非官方固件请自行测试
- AI 配置：配置后设备 ID 会发生变化，需在 AI 后台重新绑定设备


