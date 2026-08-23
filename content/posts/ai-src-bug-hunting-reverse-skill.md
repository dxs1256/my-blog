---
date: "2026-08-23"
type: blog
tags:
  - 安全
  - AI
  - 开源
  - 渗透测试
title: "让 AI 帮你挖 SRC 漏洞"
description: "reverse-skill 内置 src-hunter 技能包：未授权访问、JWT 越权、OAuth 缺陷全套 playbook，按标准流程带 AI 挖洞换赏金。"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=ai-src-bug-hunting-reverse-skill"
---

上回介绍过 **reverse-skill**（⭐27.7k）这个 AI 逆向工程技能包的整体架构。这次单说一个很多人关心的玩法：**用它挖 SRC 漏洞换赏金**。

项目地址：https://github.com/zhaoxuya520/reverse-skill

![reverse-skill 仓库主页，27.7k Star](https://i.ibb.co/KpzTy8fV/665124556483.png)

## 🎯 什么是 SRC 挖洞

SRC（Security Response Center）是各大厂的安全应急响应中心——阿里、腾讯、字节都开放了自己的业务给白帽子测试。你在授权范围内找到漏洞、提交报告，平台给你积分或现金。

国内还有补天、漏洞盒子这类聚合平台，新手注册就能接单练手。**在平台规则内测试完全合法**，这是安全圈公认的正路。

## 🔧 reverse-skill 里的挖洞装备

项目内置 **src-hunter** 技能包，翻了下目录，playbook 覆盖了主流洞型：

![src-hunter 技能包目录](https://i.ibb.co/5PgKyFG/080d678a4b1f.png)

| Playbook | 查什么 |
|----------|--------|
| unauth-access | 未授权访问（接口裸奔） |
| arbitrary-x-authz | 水平/垂直越权 |
| oauth-saml-jwt | JWT 弱密钥、OAuth 流程缺陷 |
| jwt-oauth-testing | 令牌伪造与刷新攻击 |

配合其他模块的 SQL 注入、XSS、命令注入检测，常见 Web 漏洞的方法论基本齐了。

## 🚀 工作流长什么样

装好技能包后，给 AI 一个目标 URL + 授权依据：

```
任务 → case-init 建案（填授权状态）
    → 路由到 pentest-tools / src-hunter
    → 信息收集 → 攻击面梳理
    → 按 playbook 逐项测试
    → 输出漏洞报告
```

它会把老手的挖洞经验结构化成检查清单喂给 AI——比如测越权时自动想到改 user_id、替换 token、遍历订单号这些套路，不用你自己一条条试。

![reverse-skill 项目 Logo](https://i.ibb.co/mChfzNkm/3ae3f0c84fd1.png)

## ⚖️ 授权机制：申报制 + 留痕

很多人担心合法性。它的 `case-init` 是这么设计的：

```bash
bash case-init.sh --target-url "https://目标" \
  --auth-status granted --auth-basis "src-platform"
```

动手前必须建案件、声明授权来源（自己的站 / SRC 平台范围 / 书面合同），后续每步操作都绑定案件记录。

说白了这是**自我申报制**——工具没法真验证你有没有权限，但它逼你先想清楚这个问题，并且全程留痕。真正的红线是《刑法》285/286 条，自己的站、靶场、SRC 规则内的目标随便测，其他的别碰。

## 💡 冷静评价

**它能给你的**：标准化流程 + 老手经验清单，AI 按图索骥不漏项。

**它不能替你的**：高价值漏洞靠的是对业务逻辑的理解和那么点灵感，AI 全扫一遍能捡低垂的果子，但真正值钱的洞还得人来想。另外本机工具链（burp、nmap、sqlmap）得自己装齐。

定位准确点说：它是本**带流程引导的挖洞手册**，不是全自动印钞机。适合想入行安全的新手建立方法论，也适合有经验的白帽子提效做初筛。
