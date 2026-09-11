---
date: "2026-09-10"
type: blog
tags:
  - 工具
  - Android
  - 测试
  - 抓包
  - 开源
title: "浏览器侧边栏免代理抓 Android 包"
description: "Android 抓包总得先配半小时代理和证书。TabQA 是个跑在 Chrome/Edge 侧边栏的开源扩展，用 WebUSB 直连手机，免 Wi-Fi 代理、免装根证书，实时抓请求、看 logcat、录屏、出 Bug 报告，一步到位。"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=tabqa-android-testing"
---

我最近在调一个 App 的 H5 页面，卡在抓包上。手机连上电脑 Wi-Fi 代理，装根证书，Android 7.0+ 还不认用户证书，抓出来一屏锁头和问号。折腾半小时，就为看一眼这个页面调了哪个接口、返回什么错。

后来发现了 **TabQA**（⭐1），一个跑在 Chrome/Edge 侧边栏的 Android 测试扩展。它用 WebUSB 直连手机，把我上面那堆前置工作全省了。

项目地址：https://github.com/openutx/TabQA

## 🎯 它到底解决了什么

传统抓包卡在两头：**代理配置**和**证书信任**。TabQA 直接绕开这两件事——不配 Wi-Fi 代理、不装根证书，靠浏览器原生的 WebUSB + CDP（Chrome DevTools Protocol）通道，在浏览器里跟手机通信。

| 对比项 | 传统方式（Charles/Fiddler） | TabQA |
|--------|---------------------------|-------|
| Wi-Fi 代理 | 手动填 IP 端口 | 不需要 |
| 根证书 | 下载安装+信任 | 不需要 |
| Android 7.0+ 证书信任 | 常见坑，抓包全 Unknown | 天然免疫 |
| 本地环境 | 常要装 ADB/驱动 | 零外部依赖 |
| 抓 HTTPS | 锁头问号 | 直接看明文请求 |

## ⚙️ 核心能力

**实时网络面板。** 抓 Android Chrome 和已开调试的 WebView 请求，看请求/响应详情、耗时、失败请求、一键复制 cURL、导出脱敏 HAR。调接口定位报错，比截图给研发快得多。

**投屏 + 操作手机。** 侧边栏里实时镜像手机屏幕，还能直接点控。复现问题的时候，Bug 发生在哪一步，画面就在那，不用再四五个窗口来回拼。

**logcat + 录屏 + 截图。** 采集目标 App 的 logcat 上下文、截图、无设备音频的录屏。截图还能标注、打码，把缺陷证据一次性对齐。

**拖文件进手机。** 测试文件拖到镜像屏幕上，直接进手机共享存储，省掉来回传文件的麻烦。

## 🔐 隐私

所有请求解析、日志筛选、脱敏都在扩展本地跑，不上传任何第三方服务器。存敏感数据的话还有可选 AES-256-GCM 客户端加密，上传前就加密了，Telegram 只看到乱码。

## ⚠️ 两个要知道的限制

一是 **OkHttp、Retrofit 这类原生网络栈的请求不显示**——目前只覆盖 Android Chrome 和开了 `setWebContentsDebuggingEnabled(true)` 的 WebView。二是采集期间侧边栏要保持打开。自动脱敏也不是万能，分享日志/HAR/截图前最好人工扫一眼。

## 💡 怎么用

1. Chrome/Edge 装 TabQA（商店搜 TabQA）
2. 手机开 USB 调试，用数据线连电脑
3. 浏览器里选设备授权
4. 侧边栏操作手机、抓请求、出报告

![TabQA 产品工作台截图，展示侧边栏镜像与网络面板](https://i.ibb.co/zTFk6Hjb/558cf3699bcb.png)

![TabQA 中文界面截图](https://i.ibb.co/Vc46FT0N/54bfa66b3bfb.png)

![TabQA 功能概览图](https://i.ibb.co/rRx5B7TK/31022da2d468.png)

## 写在最后

实测下来，最值的是把"抓包前半小时"压没了——尤其 Android 7.0+ 证书那个坑，一次没踩过。适合排查 H5 页面、WebView 活动页、商城下单这类场景的 QA 和开发。原生网络栈的盲区还在，但作为轻量测试工作台，够顺手。

如果你是在找"免装证书抓包"的轻量方案，TabQA 值得放进工具箱；要抓 OkHttp/Retrofit 的请求，那还得回到 Charles 那套。