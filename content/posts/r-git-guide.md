---
title: Git 常用命令速查手册：GitHub 日常开发场景全攻略
date: "2026-05-18"
updated: "2026-05-18"
draft: false
sticky: null
tags: ["GitHub", "入门教程"]
categories: ["记录", "学习心得", "技巧"]
description: 专为小白准备的 Git 命令大全，涵盖 GitHub 日常开发的 7 个常见场景，从克隆仓库到解决冲突，一篇就够了。
image: "public\images\record.jpg"
---

# Git 常用命令速查手册：GitHub 日常开发场景全攻略

> 还在为忘记 Git 命令而头疼？这篇文章整理了 GitHub 日常开发中最常用的命令，按场景分类，拿来就能用。

## 📌 写在前面

Git 是现代开发的必备工具，但命令太多记不住很正常。本文将按照**真实开发流程**，把常用命令整理成 **7 个场景**，每个场景都有清晰的命令和说明。
**适用人群**：Git 初学者、偶尔使用 Git 的开发者、需要快速查阅命令的朋友。
---
# Git 常用场景速查手册
---
## 场景一：获取远程项目
- clone 方式
- ZIP 方式重新上传

## 场景二：配置用户信息

## 场景三：日常开发提交流程
- status
- add
- commit
- push
- log

## 场景四：拉取最新代码
- pull
- fetch

## 场景五：分支开发与合并
- branch
- checkout
- merge
- conflict

## 场景六：撤销和回退
- reset
- amend
- checkout

## 场景七：版本标签（Tag）管理

## 附录：常见报错处理

## 附录：快速命令卡片

## 附录：新手学习快捷指令


# Git 常用场景速查手册

适用于：
- Git 新手入门
- GitHub 日常使用
- VPS / Linux 项目部署
- 博客与开发项目管理
- 多人协作开发

---

# 场景一：获取远程项目到本地

## 方式 1：克隆远程仓库（推荐）

第一次从 GitHub 下载项目到本地。

```bash
# HTTPS 方式（推荐新手）
git clone https://github.com/用户名/仓库名.git

# SSH 方式（需要配置 SSH Key）
git clone git@github.com:用户名/仓库名.git

# 克隆到指定文件夹
git clone https://github.com/用户名/仓库名.git 我的项目
```

💡 小贴士：

- HTTPS 方式 push 时需要 Token
- SSH 方式配置一次后可长期免密

---

## 方式 2：下载 ZIP 后重新上传到自己的仓库

主要应用于：

- 借用他人电脑
- 临时办公环境
- 修改开源项目
- 不方便配置 SSH

> 注意：
>
> 下载 ZIP 后默认不包含 `.git` 历史记录。
>
> 如果是直接复制别人的项目文件夹，
> 不要把原项目中的 `.git` 文件夹一起复制过来。

压缩包解压后先进入项目目录：

```bash
cd 项目文件夹
```

---

### SSH 方式

适用于：

- 自己常用电脑
- 已配置 GitHub SSH Key
- 长期开发环境

```bash
git init
# Git 初始化仓库

git add .
# 添加所有文件（.gitignore 除外）

git commit -m "第一次上传"
# 保存当前工作区状态

git branch -M main
# 设置主分支为 main

git remote add origin git@github.com:你的用户名/你的仓库名.git
# 连接远程仓库

git push -u origin main
# 上传到 GitHub
```

---

### HTTPS 方式

适用于：

- 借用电脑
- 公共电脑
- 临时开发环境
- 未配置 SSH

```bash
git init

git add .

git commit -m "第一次上传"

git branch -M main

git remote add origin https://github.com/你的用户名/你的仓库名.git

git push -u origin main
```

首次 push 时：

```text
Username:
GitHub 用户名

Password:
GitHub Token（不是 GitHub 登录密码）
```

GitHub 已不再支持账号密码推送代码。

---

# 场景二：配置用户信息

第一次使用 Git 必须配置，否则无法提交。

```bash
# 设置全局用户名（所有仓库共用）
git config --global user.name "你的GitHub用户名"

# 设置全局邮箱
git config --global user.email "你的邮箱@example.com"

# 查看当前配置
git config --list
```

---

## 仅当前仓库使用独立配置

进入项目目录后执行：

```bash
git config user.name "项目专用用户名"

git config user.email "项目专用邮箱"
```

💡 小贴士：

建议使用 GitHub 相同邮箱，
这样提交记录会自动关联 GitHub 账号。

---

# 场景三：日常开发提交流程

Git 最常见工作流：

```text
查看状态 → 添加 → 提交 → 推送
```

---

## 查看当前状态

```bash
# 查看完整状态
git status

# 查看简洁状态
git status -s
```

---

## 添加文件到暂存区

```bash
# 添加单个文件
git add 文件名

# 添加所有修改
git add .

# 添加指定类型文件
git add *.js
```

---

## 提交修改

```bash
git commit -m "fix: 修复登录按钮样式"
```

---

## 推送到远程仓库

```bash
git push origin main
```

---

## 一次性提交（仅已跟踪文件）

```bash
git commit -am "feat: 新增用户头像功能"
```

---

## 查看提交历史

```bash
git log
```

💡 小贴士：

提交信息建议规范化：

- feat: 新功能
- fix: 修复问题
- docs: 文档修改
- style: 格式调整
- refactor: 重构代码

---

# 场景四：拉取最新代码

开始开发前建议先同步远程仓库。

---

## 拉取并合并

```bash
git pull origin main
```

---

## 主分支是 master 时

```bash
git pull origin master
```

---

## 只拉取不合并

```bash
git fetch origin
```

---

## 拉取指定分支

```bash
git pull origin develop
```

💡 小贴士：

养成：

```bash
git pull
```

后再开始工作的习惯，
可以有效减少冲突。

---

# 场景五：分支开发与合并

开发新功能时建议创建独立分支。

---

## 查看所有分支

```bash
git branch
```

`*` 表示当前所在分支。

---

## 创建新分支

```bash
git branch 分支名
```

---

## 切换分支

```bash
git checkout 分支名
```

---

## 创建并立即切换（最常用）

```bash
git checkout -b 新分支名
```

---

## 基于远程分支创建本地分支

```bash
git checkout -b 本地分支名 origin/远程分支名
```

---

## 合并分支

```bash
# 切换到 main
git checkout main

# 更新 main
git pull origin main

# 合并开发分支
git merge 要合并的分支名

# 推送
git push origin main
```

---

## 删除分支

```bash
# 安全删除
git branch -d 分支名

# 强制删除
git branch -D 分支名
```

💡 小贴士：

推荐分支命名：

```text
feature/login-page
bugfix/button-error
hotfix/api-error
```

---

## 解决冲突

多人修改同一文件时可能会产生冲突。

---

### 拉取代码

```bash
git pull origin main
```

冲突通常会在这里出现。

---

### 编辑冲突文件

Git 会使用：

```text
<<<<<<<
=======
>>>>>>>
```

标记冲突区域。

保留需要的代码后，
删除这些冲突标记。

---

### 标记已解决

```bash
git add 冲突文件名
```

---

### 完成合并

```bash
git commit -m "merge: 解决冲突"
```

---

### 推送代码

```bash
git push origin main
```

---

### 放弃本次合并

```bash
git merge --abort
```

💡 小贴士：

VSCode 可以可视化解决冲突，
非常适合新手。

---

# 场景六：撤销和回退

Git 的“后悔药”。

---

## 撤销暂存区文件

```bash
git reset HEAD 文件名
```

适用于：

```text
git add 后发现加错文件
```

---

## 撤销最近一次提交（保留代码）

```bash
git reset --soft HEAD~1
```

---

## 强制回退（危险⚠️）

```bash
git reset --hard HEAD~1
```

会直接删除未保存修改。

---

## 撤销工作区修改

```bash
git checkout -- 文件名
```

适用于：

```text
文件改乱了但还没 add
```

---

## 修改最近一次提交信息

```bash
git commit --amend -m "新的提交信息"
```

---

## 恢复到指定版本

先查看历史：

```bash
git log
```

然后恢复：

```bash
git reset --hard 版本号
```

💡 小贴士：

`--hard` 操作危险，
执行前请务必确认。

---

# 场景七：版本标签（Tag）管理

给重要版本打标签，
方便版本发布与后续回溯。

---

## 查看所有标签

```bash
git tag
```

---

## 创建轻量标签

```bash
git tag v1.0.0
```

---

## 创建附注标签（推荐）

```bash
git tag -a v1.0.0 -m "首次正式发布"
```

---

## 推送单个标签

```bash
git push origin v1.0.0
```

---

## 推送所有标签

```bash
git push origin --tags
```

---

## 删除本地标签

```bash
git tag -d v1.0.0
```

---

## 删除远程标签

```bash
git push origin --delete v1.0.0
```

---

## 基于标签创建修复分支

```bash
git checkout -b fix/old-bug v1.0.0
```

💡 小贴士：

标签通常用于版本发布：

```text
v1.0.0
v1.2.5
v2.0.1
```

---

# 附录一：常见 Git 报错处理

---

## `fatal: not a git repository`

原因：

当前目录不是 Git 项目目录。

解决：

```bash
cd 你的项目文件夹
```

然后执行：

```bash
git init
```

---

## `remote origin already exists`

原因：

远程仓库已存在。

解决：

```bash
git remote remove origin
```

然后重新添加：

```bash
git remote add origin 仓库地址
```

---

## `failed to push some refs`

原因：

远程仓库已有内容，
本地与远程发生冲突。

解决：

```bash
git pull origin main --allow-unrelated-histories
```

处理完成后再：

```bash
git push origin main
```

---

# 附录二：推荐习惯

首次上传代码前建议先执行：

```bash
git status
```

用于确认：

- 哪些文件会被上传
- `.gitignore` 是否生效
- 是否误上传敏感文件

通常不建议上传：

```text
.env
node_modules
dist
__pycache__
```

---

# 📋 Git 快速命令卡片（复制即用）

```bash
# 克隆仓库
git clone 仓库地址

# 查看状态
git status

# 添加文件
git add .

# 提交
git commit -m "message"

# 推送
git push origin main

# 拉取最新代码
git pull origin main

# 创建并切换分支
git checkout -b 新分支名

# 合并分支
git merge 分支名

# 查看日志
git log

# 查看标签
git tag
```


# === 新手每日流程 ===
```bash
git pull origin main          # 拉取最新代码
git add .                     # 添加所有修改
git commit -m "feat: xxx"     # 提交
git push origin main          # 推送
```
# === 分支操作 ===
```bash
git checkout -b feature/xxx   # 创建并切换分支
git checkout main             # 切换回主分支
git branch -d feature/xxx     # 删除分支
```
# === 查看状态 ===
```bash
git status                    # 查看文件状态
```
# === 紧急修复 ===
```bash
git checkout -- 文件名         # 丢弃工作区修改
git reset --soft HEAD~1       # 撤销上一次提交
```