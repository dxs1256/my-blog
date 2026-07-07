---
date: "2026-07-08"
type: blog
tags:
  - DNS
  - 开源工具
  - Rust
  - 运维
title: "一条命令查全球DNS生效状态"
description: "dnsglobe：开源终端工具，同时向34个全球DNS服务器查询域名解析，世界地图实时显示生效进度，盯梢模式自动等全部生效。"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=dnsglobe-dns-propagation"
---
[//]: # (notion-sync-id: )

改完域名解析后最熬人的是什么？不是配置本身，而是等全球生效。

改完A记录、CNAME或者NS记录，你只能反复刷 dnschecker.org 或者 whatsmydns.net，一遍遍手动刷新，像在等水烧开。运气好几分钟，运气差几个小时，中间你什么事都干不踏实。

后来发现了一个叫 **dnsglobe** 的开源终端工具，这些问题一次性全解决了。

项目地址：https://github.com/514-labs/dnsglobe

## 🎯 这是什么

dnsglobe 是一个用 Rust 写的终端 TUI 工具，能同时向全球 34 个公共 DNS 服务器发起查询，然后对比各家拿到的解析结果。终端窗口够宽的话，右侧还会画一张世界地图，每个服务器一个点，绿色代表已生效，一目了然。

![dnsglobe 推文截图](https://i.ibb.co/qYkRGNMR/d9b11795c4dc.jpg)

GitHubDaily 前两天发了条推文介绍它，已经 5500+ 浏览了，确实是个挺实用的工具。

## 🌍 核心功能一览

### 34 个全球 DNS 服务器并行查询

覆盖了全球各个区域的 DNS 服务：

| 区域 | 代表性服务器 |
|------|-------------|
| 全球 Anycast | Google (8.8.8.8)、Cloudflare (1.1.1.1)、Quad9 (9.9.9.9) |
| 北美 | Comcast、Level3、Verizon |
| 欧洲 | 德国 Fraunhofer、荷兰 DNS.WATCH、英国 |
| 俄罗斯 | Yandex、SkyDNS |
| 中东 | 阿联酋电信 |
| 东亚 | 日本、韩国 |
| 南半球 | 澳大利亚 Telstra、新西兰 SafeSurfer、巴西 UOL |

每个服务器直连查询（不走缓存、带 EDNS0、TCP 回退），看到的是每个服务器自己的实时视图。

### 世界地图可视化

终端宽度 ≥150 列时，右侧自动渲染一张世界地图，每个 DNS 服务器一个点：

- 🟢 **绿色**：已生效（和多数派一致）
- 🟣 **紫色**：不一致（标为 `≠ DIFFERS`）
- 🔴 **红色**：连接错误
- 🟡 **黄色**：查询中

另外，Anycast 网络的服务器（Quad9、Cloudflare、Google 等）会自动探测实际响应节点。比如你在中国查询 1.1.1.1，它显示的是日本/新加坡节点而不是美国总部的坐标，精度高不少。

### 盯梢模式（Watch Mode）

这是最实用的功能。执行查询后按 Enter，dnsglobe 每 30 秒自动重查一次，直到所有节点都拿到新记录为止。期间你可以切去做别的事，不用手动刷。

### 记录类型支持

Tab / Shift+Tab 切换查询类型：**A、AAAA、CNAME、MX、NS、TXT、SOA**，基本上涵盖了日常用的所有记录类型。

## 💻 上手实操

### 安装

安装方式很丰富，挑一个你习惯的：

```bash
# Homebrew（macOS/Linux）
brew install 514-labs/tap/dnsglobe

# Cargo（有 Rust 环境的话）
cargo install dnsglobe

# Arch Linux
yay -S dnsglobe       # 源码编译
yay -S dnsglobe-bin   # 预编译二进制

# Nix
nix run github:514-labs/dnsglobe

# 或者直接从 GitHub Releases 页下载预编译二进制
```

### 基本使用

```bash
# 启动后输入域名查询
dnsglobe

# 直接查某个域名
dnsglobe example.com

# 指定记录类型
dnsglobe example.com TXT

# 单次查询（不进入 TUI，适合脚本调用）
dnsglobe --once example.com TXT
```

### 快捷键

| 按键 | 功能 |
|------|------|
| 字母键 | 编辑域名 |
| Enter | 开始查询并进入盯梢模式（每30秒重查） |
| Ctrl+R | 暂停/恢复盯梢 |
| Tab / Shift+Tab | 切换记录类型 |
| ↑/↓ / PgUp/PgDn | 滚动服务器列表 |
| Ctrl+S | 切换排序方式（服务器/位置/时间/状态/结果） |
| Ctrl+U | 清空域名 |
| Esc / Ctrl+C | 退出 |

### 自定义 DNS 服务器

支持通过 TOML 配置文件添加自己的 DNS 服务器，路径 `~/.config/dnsglobe/config.toml`：

```toml
# 替换内置列表（设为 true 则只用自己的）
replace = false

[[resolvers]]
name = "公司DNS"
ip = "10.0.0.53"
location = "总部"
lat = 39.9
lon = 116.4
```

配置里可以指定经纬度，会显示在世界地图上。如果你有自己的内网 DNS，或者想专门监控某几个特定 DNS 服务器，这个功能很实用。

## 💡 适用场景

- **域名迁移或更换 DNS 服务商**：改完 NS 记录后盯着看全球生效进度
- **CDN 切换**：确认各个区域的 DNS 解析是否已经指向新的 CDN 节点
- **DNS 故障排查**：某个区域反馈打不开，直接看是哪家 DNS 还没更新
- **运维脚本/CI 集成**：`--once` 模式可以接入部署流程，等 DNS 全生效后再继续

## 📝 小结

dnsglobe 把「改DNS→等生效」这个环节从干等变成了可视化。34 个全球节点、世界地图、盯梢模式，覆盖了查 DNS 传播的所有需求。

唯一的门槛是终端宽度要够（≥150列）才能看到地图，不过就算看不到地图，表格视图里的结果也已经够用了。对于经常折腾域名和服务器的人来说，可以放进工具箱备着。