---
date: "2026-05-20"
type: "Post"
tags:
  - "教程"
  - "白嫖"
  - "GitHub"
  - "云服务器"
  - "Windows 11"
title: "白嫖党狂喜！GitHub Codespaces 免费 4 核 16G 云服务器跑 Windows 11"
description: "一套完整的 GitHub Codespaces 免费云服务器部署教程：从 Fork 仓库到跑起 Windows 11，4 核 16G 配置零成本，附带对比表格和操作步骤截图。"
categories:
  - "教程"
image: "https://bing.ee123.net/img/rand?seed=github-codespaces-free-win11"
---

[//]: # (notion-sync-id: 366874cb-3972-814e-b8f6-d1807bea1849)

最近我在折腾远程开发环境时，发现了一个 GitHub Codespaces 的超实用玩法——可以利用它免费创建的云端开发环境来跑 Windows 11。配置最高可选 4 核 16GB 内存，网络速度飞快，关键是全程零成本。

项目地址：https://github.com/1061700625/github_vps

---

## 原理说明

GitHub Codespaces 本质上是一个基于 Debian/Ubuntu 的云端开发环境（虚拟机）。我们只需要在这个虚拟机里执行一条命令，就能拉起一个 Windows 11 容器，然后通过端口转发或内网穿透工具（如 ngrok）直接远程访问。就这样，GitHub 免费送的高配 VPS 瞬间变成了一台能跑 Win11 的云电脑。

---

## 为什么这个方案这么香

跟其他方案对比下来，GitHub Codespaces 的优势非常明显：

| Header | Header | Header | Header | 
| --- | --- | --- | --- | 
> _(表格内容通过子行渲染)_

**GitHub Codespaces 的核心优势**：

- 完全免费：GitHub 官方提供，不花一分钱
- 配置给力：最高可选 4 核 16GB 内存，性能足够跑 Win11
- 纯净系统：没有国产云厂商那种臃肿预装软件和后台进程
- 网络出色：走 GitHub Cloudflare CDN，国内访问速度快
- Copilot 加持：自带 AI 编程助手，云端开发体验更丝滑
- 开箱即用：Fork 仓库后一键创建环境，不需要折腾配置
代价是什么？免费 Space 空闲 48 小时会休眠，第一次请求要等约 30 秒冷启动。能接受这个条件，就是真正的零成本。

---

## 保姆级部署教程

### 第一步：Fork 仓库

打开项目 https://github.com/1061700625/github_vps，点击右上角的 Fork 按钮。把仓库复制到你自己的 GitHub 账号下，这样你就能在 Codespaces 中引用它。


### 第二步：进入 Codespaces

Fork 完成后，点击页面左上角的 ☰ 三条横线菜单，切换到 Codespaces 标签页，这里会显示你所有的云端开发环境。


### 第三步：新建 Codespace

点击 New codespace 按钮（新建 Codespace），开始创建你的云端开发环境。


### 第四步：选择配置

选择你刚才 Fork 的那个仓库（github_vps），然后在下方配置中选择 4-Core（4核）规格。4 核比默认的 2 核配置性能强很多，Win11 跑起来更流畅。


### 第五步：启动 Win11 容器

```bash
bash start.sh
```

进入 Codespaces 后，底部会自动打开终端。在终端中输入以下命令来启动 Win11 容器：


### 第六步：获取访问链接

等待脚本执行完成。当终端出现端口转发链接时，把鼠标放上去，稍等片刻会出现 Open in Browser（在浏览器中打开）的提示，点击它！


### 第七步：安装 Windows 11

此时会进入 Windows 11 的安装界面，接下来就是标准的装系统流程：选择语言、输入密钥（可跳过）、选择版本、选择安装磁盘……需要注意的是，这一步需要耐心等待，安装过程会比较久，可以去泡杯咖啡。


### 第八步：进入桌面

当当当！熟悉的 Windows 11 桌面出现啦！现在你可以在云端用 Win11 了。因为是容器化的 Windows，轻量化的操作完全没问题。

---

## 注意事项

试用中可能会遇到的一些情况：

- GitHub Codespaces 免费账户每月有一定额度，但个人开发完全够用
- Codespaces 空闲超过 30 分钟会自动休眠，重新连接时需等待冷启动
- 如果端口转发速度不理想，可以配合 ngrok 做内网穿透获得更好的体验
- 建议部署完成后修改 Windows 容器密码，避免被他人扫描到
- 该项目为社区开源方案，GitHub 可能会调整免费策略，建议留意官方公告
---

## 写在最后

GitHub Codespaces 的这个用法对于需要临时使用 Windows 环境、做轻量级开发测试、或者只是想体验云桌面的朋友来说，确实很实用。4 核 16G 的配置跑 Win11 完全够用，而且不用心疼钱包。

如果你也遇到部署过程中的问题，不妨仔细检查每一步的操作——特别是 Fork 仓库后一定要选对自己的仓库，以及创建 Codespace 时记得选择 4-Core 配置。只要这几点没搞错，基本都能顺利跑起来。


