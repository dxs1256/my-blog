---
title: Git 常用命令速查手册：GitHub 日常开发场景全攻略
date: 2026-05-17
draft: false
tags: ["it", "GitHub", "版本控制", "入门教程"]
description: 专为小白准备的 Git 命令大全，涵盖 GitHub 日常开发的 10+ 个常见场景，从克隆仓库到解决冲突，一篇就够了。
image: ""
---

# Git 常用命令速查手册：GitHub 日常开发场景全攻略

> 还在为忘记 Git 命令而头疼？这篇文章整理了 GitHub 日常开发中最常用的命令，按场景分类，拿来就能用。

## 📌 写在前面

Git 是现代开发的必备工具，但命令太多记不住很正常。本文将按照**真实开发流程**，把常用命令整理成 **10 个场景**，每个场景都有清晰的命令和说明。

**适用人群**：Git 初学者、偶尔使用 Git 的开发者、需要快速查阅命令的朋友。

---

## 场景一：克隆远程仓库

第一次从 GitHub 下载项目到本地。

```bash
# HTTPS 方式（推荐新手）
git clone https://github.com/用户名/仓库名.git

# SSH 方式（需要配置 SSH Key）
git clone git@github.com:用户名/仓库名.git

# 克隆到指定文件夹
git clone https://github.com/用户名/仓库名.git 我的项目
💡 小贴士：HTTPS 方式每次 push 需要输入账号密码，SSH 方式配置一次后免密。

场景二：配置用户信息
第一次使用 Git 必须配置，否则无法提交。

bash
# 设置全局用户名和邮箱（所有仓库共用）
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的邮箱@example.com"

# 查看当前配置
git config --list

# 只针对当前仓库设置（进入项目目录后执行）
git config user.name "项目专用名"
git config user.email "项目专用邮箱"
💡 小贴士：建议使用 GitHub 相同的邮箱，这样提交记录会关联到你的账号。

场景三：查看状态和提交记录
随时了解当前仓库的状态。

bash
# 查看文件状态（红色=未跟踪/修改，绿色=暂存）
git status

# 查看简洁版状态
git status -s

# 查看提交历史
git log

场景四：拉取最新代码
在开始工作前，先同步远程仓库的最新代码。

bash
# 拉取并合并（推荐，最常用）
git pull origin main

# 如果主分支叫 master 而不是 main
git pull origin master

# 只拉取不合并（查看远程更新内容）
git fetch origin

# 拉取指定分支
git pull origin develop
💡 小贴士：养成 git pull 后再工作的习惯，避免后续冲突。

场景五：日常提交流程
最常用的“三板斧”：添加 → 提交 → 推送。

bash
# 1️⃣ 添加文件到暂存区
git add 文件名          # 添加单个文件
git add .              # 添加所有修改的文件
git add *.js           # 添加所有 js 文件

# 2️⃣ 提交到本地仓库
git commit -m "fix: 修复登录按钮样式"

# 3️⃣ 推送到远程仓库
git push origin main

# 一次性完成添加和提交（只针对已跟踪的文件）
git commit -am "feat: 新增用户头像功能"
💡 小贴士：提交信息建议遵循规范：feat: 新功能、fix: 修复、docs: 文档、style: 格式等。

场景六：创建和切换分支
开发新功能或修复 bug 时，建议新建分支。

bash
# 查看所有分支（* 表示当前所在分支）
git branch

# 创建新分支
git branch 分支名

# 切换分支
git checkout 分支名

# 创建并立即切换（最常用）
git checkout -b 新分支名

# 基于远程分支创建本地分支
git checkout -b 本地分支名 origin/远程分支名

# 删除分支（-d 安全删除，-D 强制删除）
git branch -d 分支名
git branch -D 分支名
💡 小贴士：分支名用英文，如 feature/login-page、bugfix/button-error。

场景七：合并分支
功能开发完成后，合并回主分支。

bash
# 先切换到目标分支（比如 main）
git checkout main

# 确保 main 是最新的
git pull origin main

# 合并指定分支到当前分支
git merge 要合并的分支名

# 合并完成后推送
git push origin main

# 如果不需要开发分支了，可以删除
git branch -d 要合并的分支名
💡 小贴士：合并前务必先 git pull 更新当前分支，避免冲突。

场景八：解决冲突
多人同时修改同一文件时，可能会产生冲突。

bash
# 1️⃣ 先拉取最新代码（冲突会在此时提示）
git pull origin main

# 2️⃣ 手动打开冲突文件，Git 会用 <<<<<<< 和 >>>>>>> 标记冲突区域
# 编辑文件，保留你需要的代码，删除冲突标记

# 3️⃣ 解决后，标记为已解决
git add 冲突文件名

# 4️⃣ 继续完成合并
git commit -m "merge: 解决与 main 分支的冲突"

# 5️⃣ 推送
git push origin main

# 放弃合并（如果冲突太复杂想重来）
git merge --abort
💡 小贴士：冲突是正常现象，不要慌！用 VSCode 等编辑器可以可视化解决冲突。

场景九：撤销和回退
不小心提交错了？别怕，Git 有后悔药。

bash
# 撤销暂存区的文件（已 add 但想撤回）
git reset HEAD 文件名

# 撤销最近一次提交（保留修改内容）
git reset --soft HEAD~1

# 撤销最近一次提交（丢弃修改内容，危险⚠️）
git reset --hard HEAD~1

# 撤销工作区的修改（未 add 的文件）
git checkout -- 文件名

# 修正上一次提交信息（刚 commit 完发现写错了）
git commit --amend -m "新的提交信息"

# 恢复到指定版本（先通过 git log 找到版本号）
git reset --hard 版本号
💡 小贴士：--hard 会丢失未提交的代码，使用前先确认！

场景十：标签管理
给重要版本打标签，方便后续回溯。

bash
# 查看所有标签
git tag

# 创建轻量标签
git tag v1.0.0

# 创建附注标签（推荐，带说明）
git tag -a v1.0.0 -m "首次正式发布"

# 推送标签到远程仓库
git push origin v1.0.0

# 推送所有本地标签
git push origin --tags

# 删除本地标签
git tag -d v1.0.0

# 删除远程标签
git push origin --delete v1.0.0

# 根据标签创建分支（用于修复旧版本的 bug）
git checkout -b fix/old-bug v1.0.0
💡 小贴士：标签一般用于版本发布，如 v1.0.0、v2.1.3。

📋 快速命令卡片（复制即用）
bash
# === 新手每日流程 ===
git pull origin main          # 拉取最新代码
git add .                     # 添加所有修改
git commit -m "feat: xxx"     # 提交
git push origin main          # 推送

# === 分支操作 ===
git checkout -b feature/xxx   # 创建并切换分支
git checkout main             # 切换回主分支
git branch -d feature/xxx     # 删除分支

# === 查看状态 ===
git status                    # 查看文件状态

# === 紧急修复 ===
git checkout -- 文件名         # 丢弃工作区修改
git reset --soft HEAD~1       # 撤销上一次提交