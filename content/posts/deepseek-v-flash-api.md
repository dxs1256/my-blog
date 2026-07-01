---
date: "2026-06-07"
type: "Post"
tags:
  - "DeepSeek"
  - "AI"
  - "免费API"
  - "商汤"
  - "热门文章"
title: "注册商汤送 DeepSeek-V4-Flash 免费 API"
description: "商汤 Token Plan 免费送 DeepSeek-V4-Flash API，手机注册即开通。模型 ID、API 地址、配置方法全流程说明，开发者 0 成本接入，适合轻量测试和原型验证。"
categories:
  - "AI"
image: "https://bing.ee123.net/img/rand?seed=deepseek-v-flash-api"
---

[//]: # (notion-sync-id: 378874cb-3972-8196-b0fc-e84522d5c813)

DeepSeek 便宜又大碗，性价比确实能打。但还有更有性价比的——直接免费白嫖。

商汤正在公测他们的 Token Plan，只要手机注册就能免费用 DeepSeek-V4-Flash。虽然上下文没有 1M，但对日常文档处理完全够用，都白嫖了还要什么自行车。

🔗 商汤大模型平台：[https://platform.sensenova.cn/](https://platform.sensenova.cn/)

---

## 🎯 注册步骤

打开商汤大模型平台，点击右上角注册，手机号验证即可开通 Token Plan 免费额度。

注册完成后在控制台找到「快速接入」，右侧会显示 API Key，直接复制就能用。

## 🔧 接口配置

API 是 OpenAI 兼容格式，现有客户端直接换地址和 Key 就能无缝切换：

- **模型 ID**：`deepseek-v4-flash`
- **API 地址**：`https://token.sensenova.cn/v1/chat/completions`
- **API Key**：控制台复制的那个
如果你是写代码调用的，基本就是把 OpenAI 的 base_url 和 api_key 换一下的事，几行代码搞定。

官方文档写得挺清楚，有疑问可以直接翻：[https://platform.sensenova.cn/docs](https://platform.sensenova.cn/docs)

## 💡 适合场景

适合开发者和 AI 爱好者做轻量级测试、原型验证。文档处理、文本生成这些常见场景都够用，而且是 0 成本，没有额度焦虑。


