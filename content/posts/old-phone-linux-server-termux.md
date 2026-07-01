---
date: "2026-05-15"
type: "Post"
tags:
  - "教程"
  - "技术"
  - "DIY"
  - " 开源"
  - "Linux"
title: "10元手机魔改为Linux桌面服务器，超低成本的家用服务器"
description: "利用闲置旧手机通过Termux安装Linux桌面系统，打造超低成本的家用服务器，可用于智能家居控制、AI服务、电子相册等场景。"
categories:
  - "教程"
image: "https://bing.ee123.net/img/rand?seed=old-phone-linux-server-termux"
---

[//]: # (notion-sync-id: 362874cb-3972-819d-b6ad-e7094b922ef2)

前几天整理房间时翻出一部 N 年前的荣耀 6，屏幕碎了一角，电池也鼓包了，连回收小哥都不愿意收。本想直接扔掉，但想起 GitHub 上有个项目可以在低配 Android 手机上跑桌面版 Linux，一台原本要花不少钱才能买到的 Linux 服务器，就这样用一部吃灰的旧手机实现了。

项目地址：https://github.com/mayukh4/linux-android。该仓库目前已获得 1700+ Star，支持将任何旧 Android 手机变成 Linux 桌面或智能家居服务器，无需 PC、无需 Root、无需云服务。

---

## 项目概览

linux-android 是一个通过 Termux 在 Android 设备上部署 Linux 环境的自动化脚本。项目支持以下模式，可同时运行在一台手机上，互不冲突：

- Linux Desktop（Linux 桌面）：在手机上运行完整的图形化桌面环境，支持 GPU 加速
- Smart Home Server（智能家居服务器）：部署 Home Assistant Core，构建本地智能家居控制中心
### 项目基本信息

- GitHub：https://github.com/mayukh4/linux-android
- Star：1700+
- 语言：Shell
- 配套视频：https://youtu.be/tYm2rQpkOcg
---

## 硬件与软件要求

### 硬件要求

- 搭载 arm64（64 位）处理器的 Android 手机
- 推荐 3GB 以上内存（KDE Plasma 需要 4GB 以上）
- 5-10 GB 可用存储空间（安装 Wine 需要更多）
- 高通 Snapdragon 芯片效果最佳，支持 Turnip GPU 加速；Mali 等其他 GPU 也能用，但性能会稍低
手机品牌不重要，关键是芯片型号。三星在不同地区销售的同款手机可能分别使用 Adreno 或 Mali GPU，仅靠品牌判断不准确。项目通过硬件属性自动检测 GPU 类型。

### 软件要求

- Termux：必须从 F-Droid 下载（不要用 Play Store 版本，已过时）
- Termux-X11：从 GitHub Releases 下载最新的 .apk 文件
---

## 桌面环境选择

项目支持 4 种桌面环境，根据手机配置选择：

- XFCE4（默认）：适合大多数用户，快速可定制，macOS 风格 Dock，资源占用低-中
- LXQt：适合老旧或低内存手机（2-3GB），资源占用极低
- MATE：经典桌面体验，资源占用中等
- KDE Plasma：仅推荐高性能手机，Windows 11 风格，资源占用高
如果不确定该选哪个，建议直接选 XFCE4，兼容性最好。

---

## 安装步骤（完整流程）

### 第一步：安装必备 APP

从以下地址下载并安装两个 APP，确保授予所有请求的权限。

- Termux（F-Droid）：https://f-droid.org/en/packages/com.termux/
- Termux-X11（GitHub）：https://github.com/termux/termux-x11/releases（选 app-universal-debug.apk）
### 第二步：预升级 Termux（重要）

打开 Termux，运行以下命令：

```bash
termux-wake-lock
pkg upgrade -y
```

termux-wake-lock 确保屏幕关闭时不会被系统杀死。pkg upgrade 将基础系统更新到最新版本，防止已知的崩溃问题。

### 第三步：下载并运行安装脚本

```bash
curl -O https://raw.githubusercontent.com/mayukh4/linux-android/main/termux-linux-setup.sh
chmod +x termux-linux-setup.sh
bash termux-linux-setup.sh
```

脚本会要求选择桌面环境和是否安装 Wine，其余自动完成。安装需 10-30 分钟。如果出现问题，完整日志保存在 ~/termux-setup.log 中。

### 第四步：启动 Linux 桌面

```bash
bash ~/start-linux.sh
```

然后打开手机上的 Termux-X11 App，Linux 桌面就会显示在其中。

### 停止运行

```bash
bash ~/stop-linux.sh
```

---

## 脚本自动安装的组件

- Termux-X11：显示服务器，负责在屏幕上渲染桌面
- 桌面环境：XFCE4 / LXQt / MATE / KDE Plasma（根据选择）
- Mesa / Zink：通过 Vulkan 实现 OpenGL，GPU 加速图形
- Turnip 驱动：高通 Adreno 开源 Vulkan 驱动（自动检测）
- PulseAudio：音频服务器
- Firefox：完整桌面版网页浏览器
- VLC：视频和音频播放器
- Git、wget、curl：标准开发工具
- Python 3 + pip：Python 运行时和包管理器
- OpenSSH：SSH 服务器和客户端
- Wine（可选）：通过 Hangover + Box64 运行 Windows x86 程序
---

## GPU 加速机制

脚本通过硬件属性自动检测 GPU 类型（不是看品牌名称，因为同款手机在不同地区可能用不同 GPU）。

### 高通 Adreno（骁龙手机）

使用开源 Turnip Vulkan 驱动 + Zink（通过 Vulkan 实现 OpenGL），可获得接近原生的 GPU 性能。

### Mali / 其他 GPU

回退到 Zink + SwRast（软件 Vulkan）。功能正常，但强烈建议选择轻量级桌面（XFCE4、LXQt）。

GPU 环境配置保存在 ~/.config/linux-gpu.sh 中，每次 start-linux.sh 会自动加载。可手动编辑该文件调整 Mesa 参数。

---

## SSH 远程连接配置

OpenSSH 由脚本自动安装。可以通过同一 Wi-Fi 网络从电脑 SSH 到手机。

### 首次 SSH 设置

在 Termux 中（不是桌面内）打开终端，运行：

```bash
sshd
passwd
```

查看手机 IP 地址：

```bash
ip addr show wlan0 | grep 'inet '
```

输出类似 inet 192.168.1.42/24，斜杠前的就是 IP 地址。

### 从电脑连接

```bash
ssh 你的-termux-用户名@192.168.1.42 -p 8022
```

端口是 8022，不是标准的 22（Termux SSH 使用非标准端口）。查看用户名：在 Termux 运行 whoami

### 简化登录（可选）

在电脑的 ~/.ssh/config 文件中添加：

```plain text
Host myphone
    HostName 192.168.1.42
    User 你的用户名
    Port 8022
```

之后连接只需：ssh myphone

### 文件传输

从电脑传文件到手机：

```bash
scp -P 8022 文件名.txt 你的用户名@192.168.1.42:~/
```

从手机拉文件到电脑：

```bash
scp -P 8022 你的用户名@192.168.1.42:~/文件名.txt ./
```

### 保持 SSH 后台运行

默认关闭 Termux 后 sshd 会停止。如需持续运行：

```bash
echo 'sshd 2>/dev/null' >> ~/.bashrc
```

---

## Wine 运行 Windows 程序（可选）

如果安装时选择了 Wine，项目使用 Hangover Wine + Box64 将 Windows x86 调用转换为 ARM64。简单工具和实用程序通常可以正常运行；重型软件或游戏可能不兼容。

配置 Wine：

```bash
winecfg
```

---

## 扩展：智能家居服务器模式

除了 Linux 桌面，该项目还支持将旧手机变成 Home Assistant 智能家居控制中心。本地运行，不依赖云服务。

### 支持的设备类型

- WiFi 智能灯：TP-Link Kasa、Govee、LIFX 等
- WiFi 智能插座：TP-Link Kasa、Wemo 等
- 涂鸦/小智能设备：通过云 API 连接
- 其他 WiFi 设备：通过 IP 或云集成连接
### 安装智能家居服务器

```bash
curl -O https://raw.githubusercontent.com/mayukh4/linux-android/main/setup-homeassistant.sh
bash setup-homeassistant.sh
```

安装需 15-45 分钟，最耗时的是编译 Python 依赖包（numpy、cryptography 等）。

### 启动和停止

```bash
bash ~/start-homeassistant.sh
```

停止：

```bash
bash ~/stop-homeassistant.sh
```

### 访问控制面板

Home Assistant 启动后，在同一 Wi-Fi 网络的任意设备浏览器中访问：

```bash
http://手机IP:8123
```

首次启动需 5-10 分钟初始化，首次访问时需在浏览器中创建管理员账户。

### 添加 TP-Link Kasa 设备示例

- 打开 Kasa App，记下设备 IP 地址
- 在 HA 控制面板：设置 → 设备与服务 → + 添加集成
- 搜索 TP-Link Kasa Smart，填入设备 IP 地址
- 设备添加成功，可在 HA 控制面板中控制
注意：由于 Android 10+ 阻止了 /proc/net/dev，mDNS 自动发现不可用。必须通过 IP 地址或云 API 添加设备，不能依赖自动发现。

---

## Android 平台的限制

- 不支持蓝牙：HA 无法通过 Termux 访问手机蓝牙
- 不支持 USB 设备：Zigbee/Z-Wave USB 适配器需要 Root 和内核支持
- 不支持自动发现：mDNS 被阻止，必须通过 IP 或云 API 添加设备
- 不支持 Docker/插件：这是 HA Core，不是 HA OS，需要 Docker 的社区插件无法使用
---

## 写在最后

一部吃灰的旧手机，加上一个开源脚本，就能变身为功能完整的 Linux 服务器或智能家居控制中心。相比购买树莓派或小主机，这个方案几乎零成本，却能实现同样的效果。

无论是用来跑自动化任务、部署私人 AI 助手、搭建 Home Assistant 智能家居，还是当作家庭媒体中心，都值得一试。


