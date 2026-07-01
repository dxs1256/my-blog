---
date: "2026-06-27"
type: "Post"
tags:
  - "热门文章"
  - "WinUtil"
  - "Windows"
  - "系统优化"
  - " 开源"
  - "ChrisTitusTech"
title: "重装系统后的配置马拉松，WinUtil 一条命令全搞定"
description: "WinUtil 开源 Windows 系统维护工具：一键批量安装软件、系统瘦身去臃肿、优化设置、修复更新，管理员 PowerShell 一条命令启动，56.5k GitHub 星标"
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=winutil-windows-utility-install-tweaks"
---

[//]: # (notion-sync-id: 38c874cb-3972-8133-8b83-d327f3c398f4)

每次重装完 Windows 是种什么体验？系统本身装起来不过半小时，真正磨人的是后面那一长串琐事：软件得一个个找安装包、乱七八糟的预装组件要手动清理、设置项藏得深还得翻来翻去。时间砸进去了，体验未必好。

Chris Titus Tech 的 WinUtil 就是专治这些重复劳动的开源工具。一条 PowerShell 命令启动，把常见的系统维护需求整合到一个清爽的图形界面里：批量装软件、系统瘦身、优化设置、排障修复、更新处理，一套流程走完。

项目地址:[https://github.com/ChrisTitusTech/winutil](https://github.com/ChrisTitusTech/winutil)

---

🎯 **一键批量安装常用软件**

系统装完后最烦的就是找软件安装包——浏览器、压缩工具、播放器、办公套件，一个个下载安装浪费时间。WinUtil 内置了常用软件仓库，勾选你要的软件，一键批量安装。

涵盖浏览器（Chrome、Firefox、Edge）、开发工具（VS Code、Git、Node.js）、媒体播放器（VLC、MPC-HC）、实用工具（7-Zip、Everything、Notepad++）等几十款常见软件。不用到处找下载链接，不用一个个点下一步。

![WinUtil 主界面](https://i.ibb.co/WNVnbfpw/winutil-screen.png)

🎯 **系统瘦身去臃肿**

Windows 预装了大量你可能根本用不上的东西——Candy Crush、Xbox 相关组件、OneDrive、Cortana、Edge 的某些模块，还有些系统自带但大多数人不需要的应用。

WinUtil 的 Debloat 功能把这些组件列得清清楚楚，你可以按需移除。它还提供了系统服务优化选项，关闭不必要的后台服务，让系统更轻快。

操作方式：勾选要移除的应用和组件 → 点击移除按钮。也支持一键应用预设方案（Standard/Minimal/Advanced），不用逐项勾选。

🎯 **系统设置优化**

不少系统默认设置其实不是最优的——隐私设置过于激进、资源管理器布局不顺手、右键菜单太多项。WinUtil 把这些散落在各个设置面板的选项集中到一个界面里。

包括隐私优化（禁用遥测、关闭广告 ID）、性能调整（禁用动画特效、优化内存管理）、文件资源管理器优化（显示隐藏文件、显示文件扩展名）、右键菜单管理。每个选项都有说明，选之前知道它在改什么。

![WinUtil Tweaks 功能面板](https://i.ibb.co/hJk7jtjJ/winutil-tweaks.png)

🎯 **多功能标签页，操作直观**

WinUtil 的界面按功能分成了几个清晰的标签页：Install（软件安装）、Tweaks（系统优化与去臃肿）、Config（配置修复）、Updates（更新管理）。每个标签页内的选项都带说明，勾选后点击执行按钮即可。

不用记任何命令参数，所见即所得。而且每条操作执行前都有确认提示，误操作风险低。

![WinUtil 功能模块展示](https://i.ibb.co/GQZg8qJR/winutil-tweet.png)

🎯 **Windows 更新修复**

Windows 更新翻车不是稀罕事——更新失败卡在某个版本、更新后蓝屏、更新下载卡住不动。WinUtil 提供了专门的修复工具。

一键重置 Windows Update 组件（清空更新缓存、重置更新服务、重新注册更新 DLL）、系统文件检查（SFC /scannow 的一键版本）、DISM 修复（处理映像损坏）、网络重置（修复 DNS、重置 Winsock）。基本上更新出了问题，跑一遍这些修复大概率能解决。

🎯 **预设自动化配置**

不想手动勾选每一项？WinUtil 支持预设模式，一条命令直接应用整个配置方案：

| Header | Header | 
| --- | --- | 
> _(表格内容通过子行渲染)_

命令示例：在管理员 PowerShell 中运行 `& ([ScriptBlock]::Create((irm https://christitus.com/win))) -Preset Standard`

预设的具体配置项可以在项目 config/preset.json 中查看，也支持自定义 preset。

🔧 **快速上手**

WinUtil 使用不需要下载安装包，只要电脑能联网，在管理员模式 PowerShell 中输入一行命令即可启动：

```plain text
irm https://christitus.com/win | iex
```

如何打开管理员终端：开始菜单右键 → Windows PowerShell（管理员）或终端（管理员）。或者按 Windows 键搜索 PowerShell，然后按 Ctrl + Shift + Enter。

启动后界面分几个功能标签页：Install（软件安装）、Tweaks（系统优化）、Config（配置修复）、Updates（更新管理）。点进对应标签页勾选操作就行。

⚠️ **注意事项**

WinUtil 需要进行系统级更改，必须以管理员身份运行。非管理员模式下功能不可用。

去臃肿操作移除的组件无法从常规方式恢复，移除前看清每个项目的说明。建议先用 Minimal 预设熟悉功能。

预设方案（Standard/Minimal/Advanced）的详细内容可在 GitHub 的 config/preset.json 中查看，建议先了解再应用。

WinUtil 主要面向 Windows 10/11，部分功能在老版本 Windows 上可能不支持。

项目有专门的 EXE 封装版（付费 $10），功能和 PowerShell 版完全一致，只是有独立图标。开源版完全够用。

💡 **适合人群**

刚重装系统想快速配好环境的人，一条命令启动，软件批量装、系统顺手调，省去一个个找安装包翻设置面板的时间。

觉得 Windows 预装太臃肿想瘦身的人，去臃肿功能一目了然，比手动翻设置面板高效得多。

Windows 更新出问题不想重装的人，内置修复工具跑一轮，大部分更新相关故障能解决。

用 Windows 但不想折腾系统的人，预设方案一键应用，平衡/最小/深度三种选择覆盖大多数需求。

**WinUtil 把重装系统后的配置马拉松压缩成一条命令加几次点击——56.5k GitHub 星标不是白来的。**


