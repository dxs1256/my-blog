---
date: "2026-05-11"
type: "Post"
tags:
  - "必看精选"
  - " 开源"
  - "Cloudflare"
  - "Workers"
  - "自托管"
  - "数据安全"
title: "NodeWarden：用 Cloudflare 免费搭建私人密码库"
description: "介绍 NodeWarden 这个开源项目，基于 Cloudflare Workers 零成本搭建私人密码库，兼容 Bitwarden 插件，支持多端同步、TOTP 二验证和 WebDAV 备份。"
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=nodewarden-free-password-manager"
---

[//]: # (notion-sync-id: 35d874cb-3972-8181-a61c-d5e2edde2a24)

还在用浏览器自带的密码管理器凑合？或者为了 1Password、Bitwarden 的付费功能犹豫不决？最近发现了一个叫 **NodeWarden** 的开源项目，可以用 Cloudflare Workers 免费搭建一个完全属于自己的密码管理库，而且兼容 Bitwarden 的浏览器插件，多端同步毫无问题。

对于不想把密码交给第三方、又不想花钱的用户来说，这个方案基本是一步到位的解法。

---

## 项目概览

NodeWarden 是一个基于 Cloudflare Workers 的开源密码管理工具。核心思路很简单：把密码库跑在你自己的 Cloudflare Workers 上，数据存在 Cloudflare R2 或 KV 里，前端兼容 Bitwarden 插件，所有密码数据完全掌控在自己手里。

---

## 核心能力

- **零成本部署**：Cloudflare Workers 免费额度足够个人使用，不花一分钱
- **多端同步**：兼容 Bitwarden 浏览器插件，Chrome、Edge、Firefox 全支持
- **TOTP 二次验证**：支持开启两步验证，安全性拉满
- **WebDAV 备份**：支持云端备份，密码库不怕丢
- **数据自控**：所有数据存在 Cloudflare，不经过任何第三方服务器
- **开源透明**：代码完全公开，可以审计安全性
---

## 部署步骤

### 第一步：Fork 仓库

打开 GitHub，找到 NodeWarden 仓库，点击右上角的 Fork，把项目同步到你自己的账号下。这是后续部署的基础。

### 第二步：从 GitHub 部署

登录 Cloudflare，进入 Workers 部署页面，选择「从 GitHub 部署」。授权后选中刚才 Fork 的仓库，默认使用 R2 存储。如果 R2 没开通，可以用 KV 代替，部署命令改为 `npm run deploy:kv`。

### 第三步：绑定域名

部署完成后，在设置里找到「域和路由」，绑定一个自己的域名。第一次打开页面，系统会提示你设置 **JWT_SECRET**——这是加密密钥，务必妥善保存。

复制这串密钥，回到 Cloudflare 的变量设置里，添加一个名为 `JWT_SECRET` 的机密变量，粘贴进去并保存部署。

### 第四步：创建主账号

刷新域名，现在可以创建主账号和主密码了。**这是唯一的通行证，千万不能忘！** 建议开启 TOTP 二次验证，并保存好恢复代码。

---

## 接入浏览器插件

以 Edge 浏览器为例，安装 Bitwarden 插件后：

- 点击底部的「自托管」选项
- 在服务器 URL 里填入你绑定的自定义域名
- 输入账号密码，就能实现多端同步了
Chrome、Firefox 等其他浏览器的操作步骤基本一致，只是插件安装方式略有不同。

---

## 密码迁移

如果你之前用的是浏览器自带的密码管理器：

- 在浏览器设置中导出 CSV 格式的密码文件
- 在 NodeWarden 网页端点击导入
- 几秒钟，所有数据就搬家完成了
---

## 备份策略

部署完成后，**强烈建议开启 WebDAV 云端备份**。给密码库加一层双保险，即使 Cloudflare 出了问题，你的密码数据也不会丢失。

---

## 适合谁用

- **注重隐私的用户**：不想把密码交给第三方公司管理
- **独立开发者**：想要完全掌控自己的数据
- **轻量级需求**：个人使用，不需要企业级的团队管理功能
- **白嫖党**：想用免费方案解决密码管理问题
---

## 注意事项

- **主密码务必牢记**：忘记主密码无法恢复，建议写在安全的地方
- **JWT_SECRET 不能丢**：这是加密密钥，丢失意味着数据无法解密
- **定期备份**：虽然有 WebDAV 备份，建议定期检查备份是否正常
- **免费额度有限**：Cloudflare Workers 免费版有请求限制，个人使用足够，但不适合高频调用场景
---

## 写在最后

NodeWarden 本质上解决的是「密码数据主权」的问题——你的密码不应该存在别人的服务器上，由别人说了算。用 Cloudflare Workers 搭建自己的密码库，零成本、高安全、完全可控。对于注重隐私、喜欢折腾的用户来说，值得一试。

---


