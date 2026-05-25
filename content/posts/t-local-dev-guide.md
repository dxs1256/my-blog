---
title: "从 GitHub 到本地开发：WSL + NVM 极简全流程指南"
date: "2026-05-18"
updated: "2026-05-18"
draft: false
sticky: null
tags: ["WSL","Node.js","GitHub","本地开发"]
categories: ["教程", "指南"]
description: "为你准备的本地开发全流程：从 GitHub Fork 仓库、WSL 环境搭建、NVM 版本管理到最后的代码提交上传。"
image: "public\images\t.jpg"
---

如果你想在本地更专业地管理博客，享受秒级预览和一键同步日期的便利，那么你需要这套“本地开发工作流”。

## 🍴 第一步：建立自己的仓库 (Fork)
1. **Fork 仓库**：访问 [仓库主页](https://github.com/alivedou/cf-blog)，点击右上角的 **Fork**。
2. **确认创建**：默认会创建一个属于你账号的副本，点击 **Create fork**。
3. **复制地址**：在你自己的仓库页面，点击绿色按钮 **Code**，选择 `HTTPS` (小白推荐) 或 `SSH` 链接并复制。

## 💻 第二步：WSL 环境连接与克隆
1. **打开 WSL 终端**：在 Windows 搜索框输入 `Ubuntu` (或其他你安装的发行版) 并启动。
2. **克隆代码**：
   ```bash
   git clone [你刚才复制的链接]
   cd cf-blog
   ```
3. **VS Code 连接**：在终端输入 `code .`， VS Code 会自动启动并连接到当前的 WSL 目录。

## 🛠️ 第三步：安装环境必备 (NVM & Node.js)
在 VS Code 的内置终端（快捷键 `Ctrl + j`）中执行：

### 1. 安装 NVM (版本管理器)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```
*提示：执行完后，请彻底关闭并重启 VS Code，或者在终端输入 `source ~/.bashrc` 以便让命令生效。*

### 2. 安装并切换到 Node 20
```bash
nvm install 20
nvm use 20
```

### 3. 安装项目依赖
```bash
npm install
```

## ✍️ 第四步：本地预览与写文
1. **启动预览**：在终端运行 `npm run dev`。
2. **访问网页**：按住 `Ctrl` 点击终端里的 `http://localhost:3000`，即可边改边看。
3. **一键同步日期**：写完文章后，按下 `Ctrl + Shift + B` 选择 **🔄 同步文章日期**，脚本会自动更新 `updated` 字段。

## 🚀 第五步：同步到 GitHub (Commit & Push)
当你对本地修改满意时，执行以下三部曲：

1. **添加文件**：
   ```bash
   git add .
   ```
2. **提交描述**：
   ```bash
   git commit -m "feat: 新增了一篇超级酷的文章"
   ```
3. **推送上线**：
   ```bash
   git push
   ```
*注意：如果你还没配置 Git 身份，第一次 commit 可能需要你运行 `git config --global user.email "你的邮箱"` 和 `user.name "你的名字"`。*

## 🎉 大功告成
现在，你的每一次 `push` 动作，Cloudflare Pages 都会自动帮你同步发布到线上。从此，你的个人博客开发体验已经达到了“专业程序员”的水平！
