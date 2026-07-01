---
date: "2026-06-25"
type: "Post"
tags:
  - "热门文章"
  - "AI"
  - "FreeLLMAPI"
  - " 开源"
  - "LLM"
  - "API聚合"
title: "把十六家的免费额度凑到一个接口里"
description: "FreeLLMAPI 聚合 16 家大模型平台的免费额度，约每月 17 亿 Token，OpenAI 兼容、自动切换限流、带管理面板和桌面客户端，适合不想在前期测试阶段花冤枉钱的开发者"
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=freellmapi-aggregate-llm-free-tier"
---

[//]: # (notion-sync-id: 366874cb-3972-8127-8c24-c8a94e5cce74)

用各大 AI 厂商的 API 时，最常遇到的问题是什么？每家的免费额度单独看根本不够用，想凑在一起用又要对付十几套不同的 SDK 和复杂的接口限制。

最近有个开源项目 FreeLLMAPI 把十六家大模型平台的免费额度全部聚合到一个接口里，背后是约每月 17 亿 Token 的免费推理容量，自动路由、自动切换、带管理面板。

项目地址:[https://github.com/tashfeenahmed/freellmapi](https://github.com/tashfeenahmed/freellmapi)

---

🎯 **和传统方案有什么不同**

传统做法是分别管理十几套 SDK，每个平台有自己的接口文档、认证方式和限流规则。哪家快超限了得手动切换，维护成本不低。FreeLLMAPI 把这十六家的免费额度封装成一个 OpenAI 兼容的端点，改个 base URL 就能用。

聚合规模：约每月 17 亿 Token 的免费额度，覆盖十六家主流平台，100+ 个模型可选。

OpenAI 兼容：支持 `/v1/chat/completions` 和 `/v1/models`。官方 OpenAI SDK、LangChain、LlamaIndex、Continue 等直接改 base_url 就能接入。

Responses API：实现了 `/v1/responses` 端点，Codex CLI 这类工具可以直接对接使用。

Anthropic Messages API：支持 `/v1/messages`，Claude Code 和 Anthropic 官方 SDK 可以直接跑在免费池上。

自动故障切换：某个平台触发限流（429）或返回服务端错误（5xx）后，路由器自动跳转到下一个可用平台，最多尝试 20 次。被限流的 key 会进入短时冷却，冷却结束后恢复正常。

速率追踪：每个密钥的 RPM、RPD、TPM、TPD 实时计数，确保永远不会超过任何一家的免费上限。

加密存储：API Key 用 AES-256-GCM 加密后存入 SQLite 数据库，请求时才在内存中解密使用。

统一 API Key：客户端用一个 `freellmapi-` 开头的统一 Token 认证，上游厂商的密钥从不暴露给应用层。

![免费额度聚合路由示意图](https://i.ibb.co/sv1612wV/freellmapi-fallback.png)

🎯 **覆盖的平台**

目前支持十六家平台：Google Gemini、Groq、Cerebras、Mistral、OpenRouter、GitHub Models、Cohere、Cloudflare Workers AI、HuggingFace、Z.ai（智谱）、Ollama Cloud、Kilo Gateway、Pollinations、LLM7、OVH AI Endpoints、OpenCode Zen。

还可以自建自定义 Provider，连接本地 llama.cpp、LM Studio、vLLM 或远程网关，从 Keys 页面配置即可。

支持的模型涵盖 Gemini 2.5 Flash、Llama 3.3/4、Qwen3、DeepSeek V4 Flash、GPT-4o（GitHub Models）、Mistral Large、GLM-4.7、Kimi K2 等数十种，且有视觉模型（Vision）标签区分能力。

🎯 **Desktop App 桌面客户端**

项目附带一个原生桌面应用，安装在菜单栏常驻，显示实时请求统计的透明小窗。macOS 提供 `.dmg`，Windows 提供 `.exe` 安装器，直接从 GitHub Releases 页面下载即可使用。

![FreeLLMAPI 桌面客户端](https://i.ibb.co/6cN84DCY/freellmapi-desktop.png)

🎯 **Admin Dashboard 管理面板**

除了 API 代理，还有完整的 React 管理界面，包含几个核心页面：

Keys 页面：管理各个平台的 API Key 凭证，查看每个 Key 的健康状态（绿色健康、黄色限流、红色无效），获取统一的 API Token。

Playground 页面：直接发送聊天请求测试，实时显示哪个平台/模型处理了请求，以及处理耗时。

Analytics 页面：查看请求量、成功率、输入输出 Token 数、平均延迟，支持 24 小时 / 7 天 / 30 天维度，按平台细分统计。

支持多语言（英语、中文简体、法语、西班牙语、葡萄牙语、意大利语），自动检测浏览器语言。

![管理面板 Playground 页面](https://i.ibb.co/KjrPn1nr/freellmapi-playground.png)

🎯 **Sticky Sessions 粘性会话**

多轮对话会保持同一个模型处理，持续 30 分钟。避免中途切换模型导致回答风格突变或产生幻觉。如果开启了 Context Handoff 功能，当确实需要切换模型时，会自动插入一条系统消息告知新模型"你在接手一个已有对话"，减少上下文断裂的影响。

🎯 **图像生成与 TTS**

除了文本对话，还支持 `/v1/images/generations`（图片生成）和 `/v1/audio/speech`（文字转语音），在有对应媒体模型的平台上自动路由。可以在 Dashboard 的 Models → Image / Audio 标签页中查看和开关。

🎯 **Embeddings 向量嵌入**

`/v1/embeddings` 端点支持按模型家族路由。与对话路由不同的是，向量嵌入的故障切换不会跨模型——同一家族的向量才能兼容。默认支持 Google Gemini（3072维）、Cohere（1536维）、Cloudflare（1024维）等多种嵌入模型家族。

🔧 **快速部署**

最简单的部署方式是一行命令：

```plain text
curl -fsSL https://freellmapi.co/install.sh | bash
```

这行命令会拉取 Docker 镜像，生成加密密钥，启动容器在 3001 端口。重复运行是安全的，会保留已有的 `.env` 和加密密钥，容器更新到最新版本。

手动用 Docker Compose 部署也很简单：

```plain text
git clone https://github.com/tashfeenahmed/freellmapi.git
cd freellmapi
ENCRYPTION_KEY="$(openssl rand -hex 32)"
printf "ENCRYPTION_KEY=%s\nPORT=3001\n" "$ENCRYPTION_KEY" > .env
docker compose up -d
```

安装完成后打开 `http://localhost:3001`，在 Keys 页面添加各平台的 API Key，调整 Fallback Chain 的优先级，获取统一 API Key，然后用你喜欢的 AI 客户端连上来即可。

Python 客户端示例：

```python
from openai import OpenAI
client = OpenAI(
    base_url="http://localhost:3001/v1",
    api_key="freellmapi-你的统一key",
)
resp = client.chat.completions.create(
    model="auto",
    messages=[{"role": "user", "content": "用一句话概括罗马的衰落。"}],
)
print(resp.choices[0].message.content)
```

Claude Code 配置：

```bash
export ANTHROPIC_BASE_URL=http://localhost:3001
export ANTHROPIC_AUTH_TOKEN=freellmapi-你的统一key
claude
```

注意要用 `ANTHROPIC_AUTH_TOKEN` 而不是 `ANTHROPIC_API_KEY`，否则 Claude Code 会认为有冲突拒绝启动。

⚠️ **注意事项**

这个项目在个人实验和学习场景下很好用，但有一些现实限制需要了解：

- 没有顶级模型。免费池的天花板在 Llama 3.3 70B、GLM-4.5、Gemini 2.5 Pro 这个级别，不会跑到 GPT-5 或 Claude Opus。
- 智能水平会随着时间推移下降。最高优先级的模型（如 Gemini 2.5 Pro、GPT-4o）每日额度最低，用完后会自动降级到更小/更弱的模型。通常每天下午到傍晚效果会下降，UTC 零点重置。
- 延迟差异很大。Cerebras 和 Groq 极快，其他平台一般。你能用哪个取决于当时的配额情况。
- 免费额度随时可能变化。厂商经常调整免费策略，如果突然出现 429 或认证错误，需要更新模型目录。
- 没有 SLA。这不是生产级服务，需要稳定性的场景请用付费 API。
- 保持本地部署。不要暴露到公网，项目是单用户设计，没有多租户认证。
💡 **适合人群**

- 需要在多个 AI 模型之间做对比测试的开发者
- 想在不同项目中使用不同模型但不想维护多套 API 集成的个人用户
- 预算有限但需要较大推理量的个人项目和原型验证
- 想体验 Claude Code 等工具但不想付费开通 Claude API 的用户
FreeLLMAPI 用一个合理的抽象解决了多供应商管理的痛点。它不是生产级方案，但对于个人开发测试和项目原型来说，每月 17 亿 Token 的免费额度确实能省下一笔可观的费用。


