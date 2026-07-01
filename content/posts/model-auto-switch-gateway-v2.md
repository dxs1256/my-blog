---
date: "2026-05-06"
type: "Post"
tags:
  - " 开源"
  - "AI"
  - "Docker"
  - "工具"
  - "API"
  - "热门文章"
title: "一个带Web UI管理的轻量级高性能OpenAI模型代理网关"
description: "model_auto_switch 是一个支持多供应商、负载均衡和故障转移的 OpenAI 兼容 API 代理网关，支持 Docker 快速部署，提供 Web UI 管理界面，可在线配置供应商和模型，实时查看健康状态和运行日志。"
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=model-auto-switch-gateway-v2"
---

[//]: # (notion-sync-id: 358874cb-3972-8122-955d-ce9bf56de603)

model_auto_switch 是一个支持多供应商、负载均衡和故障转移的 OpenAI 兼容 API 代理网关。

项目地址 https://github.com/luler/model_auto_switch

---

## 一、主要功能

- 支持接入多个 OpenAI API 兼容的模型供应商，如 openai、openrouter、newapi 等
- 支持供应商级别、模型级别的优先级和权重调整
- 支持模型别名、失败重试
- 可实现可靠的负载均衡和故障转移
- 提供 Web UI，可在线管理供应商和模型配置
- 在线查看模型使用与健康情况、程序运行日志
- 支持 Docker 部署，容器镜像和运行内存占用只有几 MB
GitHub 地址：https://github.com/luler/model_auto_switch

## 二、Docker 安装

前提准备：

- 安装 Docker、docker-compose
- 拉取代码并进入目录
```bash
git clone https://github.com/luler/model_auto_switch.git
cd model_auto_switch
```

配置 docker-compose.yml：

```yaml
services:
  model_auto_switch:
    image: ghcr.io/luler/model_auto_switch:latest
    restart: always
    ports:
      - 20261:3000
    volumes:
      - ./runtime:/app/runtime
      - ./app/appconfig/openai_proxy.yaml:/app/app/appconfig/openai_proxy.yaml
    environment:
      - TZ=Asia/Shanghai
      - PORT=3000
```

API Key 配置，编辑 openai_proxy.yaml：

```yaml
api_keys:
  - "sk-your-custom-api-key"

max_retries: 3
max_failures: 3
recovery_interval: 30
health_check_period: 3600

providers:
  - name: "openai"
    base_url: "https://api.openai.com"
    api_key: "sk-xxxx"
    weight: 1
    priority: 1
    timeout: 120
    model_mappings:
      - upstream: "gpt-5"
        alias: "gpt-5"
        priority: 0
        weight: 1
      - upstream: "gpt-4o"
        alias: "gpt-5"
        priority: 0
        weight: 1
```

启动服务：

```bash
docker-compose up -d
```

访问地址：http://127.0.0.1:20261/

## 三、使用说明

- 登录管理页面，输入配置的 api_keys
- 在线配置模型供应商
- 实时查看模型健康状况、负载状况
- 在线查看程序运行日志
- 接入 OpenAI 兼容的客户端使用
## 四、特点总结

- 与 newapi 等网关类似，但更强调模型可靠性
- 优先级机制：高优先级模型不可用后自动降级
- 故障转移：指定重试次数内根据负载权重尝试所有可用模型
- 可作为其他网关或模型供应商的轻量化下游
---


