---
date: "2026-07-03"
type: blog
tags:
  - AI
  - 免费
  - 开源
  - 网关
title: "237家免费AI额度串起来，封顶16亿Token"
description: "OmniRoute —— 一个本地跑的AI网关，聚合237家AI供应商的免费额度，支持自动切换、Token压缩，每月白嫖16亿Token。"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=omniroute-free-ai-gateway"
---
[//]: # (notion-sync-id: )

前段时间我在搞项目，每个月花在AI API上的钱够吃好几顿火锅了。Claude Pro买了、GPT Plus也买了、Cursor还要另付。结果呢？Claude的额度每个月剩一大截就重置，GPT写代码写到一半rate limit弹出来，卡在那等半小时。

最烦的是token烧得快。跑一次git diff，几百token没了。grep一段日志，又是几百。这些工具输出的东西你根本控制不了多长，但钱包替你心疼。

还有那些免费额度——散落在十几个平台上，Kiro有、Qoder有、Pollinations也有，但每个平台都要单独注册、单独管key，我光是记住哪个key对应哪个服务就够呛了。

后来发现了 [**OmniRoute**](https://github.com/diegosouzapw/OmniRoute)（⭐10.3k），上面这些问题一次性全解决了。

项目地址：https://github.com/diegosouzapw/OmniRoute


## 🎯 这是什么

一句话：一个本地跑的AI网关，帮你把237个AI供应商的免费额度全部串起来用。

它在你电脑上跑，你的IDE、Cursor、Cline、Claude Code，所有请求都走它。它干三件事：

**第一，帮你找最便宜的。** 237个供应商，90多个有免费额度，其中11个永久免费，不用信用卡。OmniRoute帮你盯着，哪个能用就用哪个。

**第二，挂了自动换。** 额度用完了？毫秒级切到下一个。供应商挂了？再换一个。你写代码的手根本停不下来，后台悄悄就切了。

**第三，帮你省token。** 内置的RTK + Caveman双重压缩，能砍掉15%到95%的token。我实测下来，工具密集的session里，平均能省89%。同样一个问题，压缩前69个token，压缩后19个，回答质量没差。

加起来，这些免费额度聚合到一起，**每个月大约有16亿个免费token可用**。第一个月注册的时候还能多拿一些，大概能到21亿。

![OmniRoute Dashboard 概览](https://i.ibb.co/VcVhhD2T/da9953556dd6.png)

## 🎯 零成本方案怎么配

几个主力免费供应商拼一起，日常开发完全够用：

| 供应商 | 免费模型 | 额度 |
|--------|---------|------|
| Kiro | Claude Sonnet 4.5、Haiku 4.5 | 每月约50积分 |
| Qoder | Kimi-K2、DeepSeek-R1 | ♾️ 无限 |
| Pollinations | GPT-5、Claude、Gemini | 无需Key |
| Cloudflare AI | 50+模型 | 每天10K neurons |

我自己跑了两个月，一分钱没花。

## 🎯 五分钟上手

### 安装

```bash
npm install -g omniroute
```

跑起来之后Dashboard自动弹出来，在 `http://localhost:20128`。

### 连免费供应商

Dashboard的 **Providers** 页面预置了200多家供应商，一键激活免费的。它自己探测哪些供应商在你的地区可用、延迟多少，直接勾上就行。

### 配IDE

| 工具 | 配置方式 |
|------|---------|
| **Cursor** | 设置 → Models → OpenAI兼容 → `http://localhost:20128/v1` |
| **Claude Code** | `export CLAUDE_CODE_BASE_URL=http://localhost:20128/v1` |
| **Cline** | API Provider选OpenAI Compatible → 填本地地址 |
| **Copilot** | 设置 → 自定义端点 → 填网关地址 |

配置完你的所有请求都走OmniRoute，它自动聚合免费额度、压缩token、故障切换，你完全感知不到。

![OmniRoute 工作流示意](https://i.ibb.co/JWmxZvg5/eb745462f26b.png)

## 🎯 更多亮点

- **17种路由策略**：最低成本、最低延迟、轮询、备用等
- **MCP/A2A协议支持**：未来AI Agent互通的协议
- **多模态API**：支持图片生成、语音转文字等
- **Desktop + PWA**：既当桌面应用装，也支持网页版
- **MIT开源**：完全免费，跑在自己机器上

## 💡 适合谁

- 日常重度依赖AI编码工具的开发者
- 对API账单敏感，想白嫖免费额度的个人开发者
- 厌倦了管理十几个平台API Key的人
- 想在Cursor、Claude Code、Cline之间统一管理AI调用的用户

OmniRoute本质上就是一个AI版的路由器，帮你把散落在各家的免费额度串起来统一调度。每月16亿个免费token，写项目够用了。


