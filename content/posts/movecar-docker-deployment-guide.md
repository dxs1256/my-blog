---
date: "2026-05-06"
type: "Post"
tags:
  - "Docker"
  - "教程"
title: "MoveCar Docker部署指南：私家车管理系统私有化部署完整教程"
description: "详细介绍MoveCar Docker项目的私有化部署全过程，包括系统架构、环境变量配置、多用户设置、Bark通知代理配置等核心内容。提供完整的Docker Compose部署步骤和避坑指南。"
categories:
  - "教程"
image: "https://bing.ee123.net/img/rand?seed=movecar-docker-deployment-guide"
---

[//]: # (notion-sync-id: 358874cb-3972-8134-bec9-f8c85828347e)

MoveCar Docker部署指南：私家车管理系统私有化部署完整教程

## 系统架构与核心组件

MoveCar 是一个基于 Docker 的私家车管理系统，采用微服务架构设计，包含以下核心组件：

## 环境要求

在开始部署前，请确保你的系统满足以下要求：

- Docker 20.10+ 和 Docker Compose 2.0+
- 至少 2GB 可用内存
- 至少 10GB 可用磁盘空间
- Linux/macOS/Windows 系统
- 稳定的网络连接
## 快速部署

按照以下步骤快速部署 MoveCar 系统：

首先准备部署环境：

### 步骤 1：准备工作

- 确保 Docker 和 Docker Compose 已安装
### 步骤 2：获取代码

### 步骤 3：配置环境变量

复制环境变量配置文件：

### 步骤 4：启动服务

使用以下命令启动所有服务：

## 网络配置

MoveCar 系统需要正确的网络配置才能正常工作：

确保防火墙和网络设置允许以下端口：

- 80/tcp - Web 界面
- 443/tcp - HTTPS 访问
- 3306/tcp - 数据库
## 故障排除

常见问题及解决方案：

由于 Bark 的服务器 (api.day.app) 位于海外，国内许多宽带运营商会对该节点进行物理拦截或导致连接超时。表现为：PushPlus 能瞬间收到，但 Bark 毫无反应，且 Docker 日志中出现连接超时错误。

解决方案：

1. 使用代理服务器

2. 更换通知服务提供商

3. 配置网络代理

## 多用户配置

配置多用户访问权限：

在环境变量中配置用户信息：

示例配置：

保存配置后重启服务生效。

## 数据备份

定期备份系统数据：

使用以下命令备份数据库：

恢复数据：

建议每周自动备份一次。

```bash
USER1_NAME=张三
USER1_EMAIL=zhangsan@example.com
USER1_PASSWORD=password123
```

```bash
USER2_NAME=李四
USER2_EMAIL=lisi@example.com
USER2_PASSWORD=password456
```


