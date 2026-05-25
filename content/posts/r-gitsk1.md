---
title: "使用 Git 初始化项目并推送到 GitHub 侧分支（完整教程）"
date: "2026-05-24"
updated: "2026-05-18"
draft: "false"
sticky: null
tags: ["git操作","学习记录","技巧"]
categories: ["记录", "学习心得"]
description: "记录github的一些操作"
image: "https://img.163898.xyz/api/rfile/record.jpg"
---
# 使用 Git 初始化项目并推送到 GitHub 侧分支（完整教程）

在开发项目时，很多人一开始都会直接把代码上传到 GitHub 的 `main` 主分支。
但随着项目越来越复杂，直接在主分支开发会带来很多问题：

* 容易误操作
* 不方便测试新功能
* 后期维护混乱
* 不符合实际开发流程

因此，更推荐的方式是：

> 使用侧分支（如 `dev`）进行开发，再合并到主分支。

这篇文章记录一次完整的 Git 初始化、创建侧分支以及首次推送 GitHub 的流程，适合新手入门参考。

---

# 一、进入项目目录

首先打开终端。

Windows 用户推荐：

* Git Bash
* VSCode 内置终端
* Windows Terminal

然后进入你的项目目录：

```bash
cd 项目路径
```

例如：

```bash
cd D:\my-project
```

---

# 二、初始化 Git 仓库

执行：

```bash
git init
```

作用：

* 在当前目录创建 `.git` 隐藏文件夹
* 将当前项目变成 Git 仓库
* 后续即可使用 Git 进行版本管理

执行成功后通常会看到：

```bash
Initialized empty Git repository
```

---

# 三、创建并切换到侧分支

执行：

```bash
git checkout -b dev
```

这里的：

```bash
dev
```

是分支名称，可以根据需求修改，例如：

* `feature-v1`
* `test`
* `develop`

等等。

---

## 为什么不直接在 main 开发？

很多新手都会直接在：

```text
main
```

分支开发。

虽然短期没问题，但长期会出现：

* 提交记录混乱
* 功能测试不方便
* 容易影响稳定版本
* 回滚困难

因此推荐：

```text
main -> 稳定版本
dev  -> 日常开发
```

后续如果功能更多，还可以继续细分：

```text
feature-login
feature-ui
feature-api
```

这样的结构会更加专业。

---

# 四、查看当前分支

执行：

```bash
git branch
```

如果看到：

```bash
* dev
```

说明已经成功切换到 `dev` 分支。

其中：

```text
*
```

表示当前所在分支。

---

# 五、添加项目文件到 Git 暂存区

执行：

```bash
git add .
```

作用：

* 将当前目录所有文件添加到 Git 暂存区
* 为提交做准备

---

# 六、关于 .gitignore

很多项目都会包含一些不需要上传的文件，例如：

* `node_modules`
* `.env`
* 缓存文件
* 构建文件

因此建议提前创建：

```text
.gitignore
```

文件。

例如：

```gitignore
node_modules
.env
dist
.cache
```

这样 Git 会自动忽略这些文件。

---

# 七、提交代码

执行：

```bash
git commit -m "Initial commit: High-customization navigation site"
```

这里：

```bash
-m
```

表示提交说明。

---

## 提交信息建议

推荐：

* 简洁
* 明确
* 能描述当前功能

例如：

```bash
git commit -m "初始化项目"
```

或者：

```bash
git commit -m "完成导航站首页"
```

---

# 八、关联 GitHub 远程仓库

在 GitHub 创建好仓库后，执行：

```bash
git remote add origin <YOUR_REPO_URL>
```

将：

```text
<YOUR_REPO_URL>
```

替换成自己的仓库地址。

例如：

```bash
git remote add origin https://github.com/yourname/my-project.git
```

作用：

* 将本地仓库与 GitHub 仓库绑定
* 后续即可直接推送代码

---

# 九、首次推送到侧分支

执行：

```bash
git push -u origin dev
```

作用：

* 将本地 `dev` 分支上传到 GitHub
* 建立默认跟踪关系

首次配置完成后，以后只需：

```bash
git push
```

即可直接推送。

---

# 十、完整命令汇总

这里整理一次完整流程：

```bash
# 1. 初始化本地仓库
git init

# 2. 创建并切换到侧分支
git checkout -b dev

# 3. 添加所有文件
git add .

# 4. 提交代码
git commit -m "Initial commit: High-customization navigation site"

# 5. 关联 GitHub 仓库
git remote add origin <YOUR_REPO_URL>

# 6. 推送到远程 dev 分支
git push -u origin dev
```

---

# 十一、常见问题

## 1. push 提示没有权限

通常原因：

* 没配置 SSH Key
* GitHub 登录状态失效

解决方法：

* 配置 GitHub SSH
* 或重新登录 Git Credential Manager

---

## 2. remote origin already exists

说明之前已经绑定过远程仓库。

查看当前远程仓库：

```bash
git remote -v
```

删除旧仓库：

```bash
git remote remove origin
```

重新绑定：

```bash
git remote add origin 仓库地址
```

---

## 3. 推送失败提示当前分支不存在

查看当前分支：

```bash
git branch
```

确认是否在：

```text
dev
```

分支。

---

# 十二、推荐的 Git 分支开发习惯

推荐结构：

```text
main
 └── dev
      ├── feature-login
      ├── feature-ui
      └── feature-api
```

这样做的优点：

* 开发更加安全
* 功能互不影响
* 更容易回滚
* 更符合真实开发流程
* 后期接触 CI/CD 会更加轻松

---

# 结语

对于个人项目来说：

很多人会觉得：

> “反正只有我自己开发，没必要分支管理。”

但实际上：

* 越早养成规范习惯
* 后期越轻松
* 项目也越不容易失控

即使是小项目，也推荐：

* 使用 `dev` 分支开发
* 保持 `main` 分支稳定
* 重要功能单独开 feature 分支

长期来看会非常有帮助。

