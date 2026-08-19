---
date: "2026-08-20"
type: blog
tags:
  - 工具推荐
  - 开源
  - 安全
  - AI
title: "给 AI 用的逆向工程路由包"
description: "reverse-skill：26.7k Star 开源项目，AI Agent 遇到 APK/二进制/JS 加密/渗透测试任务时自动路由到正确方法论和工具。"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=gei-ai-yong-de-ni-xiang-gong-cheng-lu-you-bao"
---
[//]: # (notion-sync-id: ...)

AI Agent 面对 APK、ELF、JS 加密、PCAP 的时候，经常不知道该用 jadx 还是 Frida 还是 IDA。工具路径分散在不同机器，同样的问题每次重新踩坑，经验没法复用。

[**reverse-skill**](https://github.com/zhaoxuya520/reverse-skill) 就是解决这个问题的——一个给 AI Agent 用的逆向/渗透/安全研究 Skill 路由包，26.7k Star，3.6k Fork。

项目地址：https://github.com/zhaoxuya520/reverse-skill

![reverse-skill 项目 Logo](https://i.ibb.co/ccr2GXvT/811a231396e8.png)

## 🎯 它是什么

当 AI Agent（Claude Code、Codex、Cursor、OpenCode 等）遇到逆向或渗透任务时，这套系统能让它先路由到正确的方法论，再调用本机工具执行，而不是盲目猜命令。

```
用户任务 → RULES.md → MASTER-ROUTING → case-init（授权检查）
  → 目标 Skill → 工具/MCP/脚本 → 报告
```

## 🔧 核心数据

- **41 条路由规则**（R0–R40），覆盖主流逆向与安全场景
- **163 条回归基准**，跨平台 CI 验证
- **42 个已跟踪模块**
- 跨平台：Windows + Ubuntu 双 CI

## 🗺️ 支持场景（20+）

| 场景 | 入口 |
|------|------|
| APK / Android 逆向 | `skills/apk-reverse/` |
| iOS / 移动端 | `skills/mobile-reverse/` |
| 二进制逆向（exe/dll/so/elf） | `skills/ida-reverse/` / `radare2/` |
| .NET / C# | `skills/dotnet-reverse/` |
| 前端 JS 签名 / 加密参数 | `skills/js-reverse/` |
| 恶意软件 / YARA | `skills/malware-analysis/` |
| 渗透测试 / 漏洞扫描 | `skills/pentest-tools/` |
| CTF 竞赛 | `CTF-Sandbox-Orchestrator/`（42 个子技能） |
| 固件 / IoT | `skills/firmware-pentest/` |
| EDR 绕过 | `skills/edr-bypass-re/` |
| LLM / AI 安全 | `skills/llm-security/` |
| 补丁差分 / N-day | `skills/patch-diff-exploit/` |

## 🚀 快速上手

```bash
git clone https://github.com/zhaoxuya520/reverse-skill.git
```

然后让 AI 阅读 `README_AI.md`，系统会自动完成路由与工具检查。各平台有详细部署文档：Kali Linux、Ubuntu/Debian、macOS 全覆盖。

## 💡 为什么值得关注

这个项目解决了一个很实际的问题：AI Agent 在安全领域的能力被工具分散和知识碎片化限制住了。reverse-skill 把逆向工程的方法论、工具链、经验积累全部打包成结构化路由，Agent 拿到任务后自动走对的路。

路由核心由单一结构化配置驱动，通过跨平台 CI 验证，与各客户端的适配层保持分离。还内置了 `case-init` 授权检查机制——未就绪禁止对目标执行操作，安全边界清晰。

## 写在最后

对做逆向、渗透测试、安全研究的人来说，这就是一个"AI 副驾驶"的操作手册——把分散在不同工具、不同脚本、不同经验里的东西，全串成了一条自动路由。

41 条规则、163 条回归、42 个模块，开源 MIT 协议，值得一试。