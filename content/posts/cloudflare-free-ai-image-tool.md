---
date: "2026-05-06"
type: "Post"
tags:
  - "Cloudflare"
  - "AI"
  - "开源项目"
  - "免费"
  - "教程"
title: "白嫖党狂喜！用Cloudflare免费搭个AI画图工具"
description: "利用Cloudflare Workers免费搭建AI文生图服务，支持FLUX、SDXL等主流模型，白嫖Cloudflare算力，无需服务器。"
categories:
  - "教程"
image: "https://bing.ee123.net/img/rand?seed=cloudflare-free-ai-image-tool"
---

[//]: # (notion-sync-id: 358874cb-3972-81e1-89d3-f5fb4b428121)

说实话，现在各种AI画图工具满天飞，但要么要充会员要么有次数限制。前阵子发现Cloudflare居然开放了AI能力，而且免费额度还挺够用，折腾了一番总算搭起来了，记录一下过程。

## 这玩意儿是啥

简单说就是利用Cloudflare Workers来跑AI文生图。Cloudflare大家应该都知道吧，搞网站的基本都用过他家的CDN。他们现在搞了个Workers AI服务，可以直接调用各种AI模型，包括文生图。

有个大佬在GitHub上开源了一个项目叫Text2img-Cloudflare-Workers，把前端界面和后端逻辑都写好了，我们只需要部署一下就能用。支持FLUX、SDXL这些主流模型，生成质量还可以。

最关键的是——免费。Cloudflare每天给的免费额度对个人用户来说完全够了，又不是开公司批量生成。

## 开始部署

没有Cloudflare账号的先去注册一个，这个不用教吧。注册完登录进去，按照下面的步骤来就行。

### 创建Worker

在控制面板左侧找到【计算(Workers)】，点击【Workers and Pages】，然后在页面右上角点击【创建】按钮。选择【从Hello World开始】这个模板，Worker名字随便起一个，比如text2img，然后点部署。

### 替换代码

部署好了之后，点击项目面板的【编辑代码】按钮进入在线编辑器。把worker.js里的代码全删掉，换成GitHub项目里src/worker.js的代码。

项目源码地址：https://github.com/huarzone/Text2img-Cloudflare-Workers

### 添加前端页面

在编辑器左边点击添加文件按钮，新建一个index.html文件。把GitHub项目里src/index.html的代码复制进去，然后点右上角的【部署】按钮，等待部署完成。

### 绑定AI服务

部署完成后，点击左上角的项目名称返回项目界面。在项目页面找到【绑定】按钮，选择绑定Workers AI，变量名称填AI（必须大写），然后点【添加绑定】按钮。

绑定完毕，恭喜🎉你就搭建好了！在项目界面右上角点击【访问】按钮，就能看到你的文生图服务了。

## 私有化配置

默认部署完是公开的，谁都能用。如果不想被别人白嫖你的额度，建议加个密码保护。

### 访问密码

编辑worker.js文件，找到PASSWORDS数组，把你的密码加进去就行。支持多密码并行，比如给不同的朋友分配不同密码。留空则允许无密码访问。

### 模型设置

在worker.js的AVAILABLE_MODELS里可以添加、删除或修改可用的模型及其介绍。改完记得重新部署才能生效。

### 绑定自己的域名

workers.dev这个域名国内访问可能有点问题，建议绑定自己的域名。在Worker设置里找到【域和路由】，添加自定义域就行，Cloudflare会自动帮你配置好DNS记录。

## 怎么用

界面很简单，在提示词框里用英文描述你想要的图片，选个模型，点生成就行。支持设置图片尺寸、迭代步数这些参数，不懂的话默认就行。

生成速度的话，FLUX模型大概要十几秒，SDXL快一点可能几秒就出来了。看你选的模型和图片大小。

## 踩过的坑

说几个我遇到的问题吧。

- AI绑定变量名必须是大写的AI，小写不行。这个前面说过了。
- 免费版每天请求次数有限制，但正常个人用基本够了。如果你疯狂生成那肯定不够。
- 提示词最好用英文，中文效果一般。实在不会写可以用页面上的随机提示词功能找找灵感。
- 还有就是偶尔会超时，特别是FLUX模型生成大图的时候。多试几次或者换个模型就好了。
整体来说这个方案还是挺香的，白嫖Cloudflare的算力，不用自己搞服务器，全球CDN加速访问也快。唯一的门槛可能就是需要会点基本的操作，不过跟着上面的步骤来应该问题不大。

项目地址：https://github.com/huarzone/Text2img-Cloudflare-Workers


