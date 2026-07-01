---
date: "2026-06-03"
type: "Post"
tags:
  - "热门文章"
  - "CloakBrowser"
  - "反检测"
  - "爬虫"
  - " 开源"
  - "Chromium"
  - "自动化"
title: "全网第一隐形浏览器开源，反检测拉满"
description: "CloakBrowser、GitHub：做爬虫的朋友都懂这种痛：好不容易写好的脚本，跑了两天突然全部 403。Cloudflare 升了一次级，你的 Selenium 配置就废了。 更离谱的是，现在连"
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=cloakbrowser-stealth-browser"
---

[//]: # (notion-sync-id: 374874cb-3972-8130-870f-f306990f06f5)

做爬虫的朋友都懂这种痛：好不容易写好的脚本，跑了两天突然全部 403。Cloudflare 升了一次级，你的 Selenium 配置就废了。

更离谱的是，现在连正常的网页截图、自动化测试都会被风控系统拦截。GitHub Actions 跑个 CI 都能被识别成机器人——就因为它用了 headless Chrome。

**CloakBrowser** 就是专门解决这个问题的。GitHub 15,788 星，Python 编写，MIT 协议全开源。

🔗 **GitHub**：[https://github.com/CloakHQ/CloakBrowser](https://github.com/CloakHQ/CloakBrowser)

---

## 🎯 它做了什么

CloakBrowser 是一套源码级的 Chromium 反检测补丁。不是那种写几行 JavaScript 伪装 navigator 的插件，而是直接改了 Chromium 的 C++ 源码，一共 **57 个补丁**。

常见反检测方案（puppeteer-extra-stealth、undetected-chromedriver）都是在 JavaScript 层面改参数。但真正的检测工具早就进化到可以读取 Chromium 底层特征了——比如 GPU 渲染器字符串、WebGL 指纹、字体列表、时区偏移——这些在 JS 层根本改不了。

CloakBrowser 的做法是：从浏览器最底层把这些特征全部抹掉。官方测试结果 **30/30 全过**，市面上大多数检测工具都认不出来。

## ⚡ 怎么用

用法极其简单。如果你用过 Playwright，上手零成本：

```python
from cloakbrowser import launch
browser = launch(headless=True)
page = browser.new_page()
page.goto("https://target.com")
print(page.title())
browser.close()
```

完全兼容 Playwright API，只是换了 import。不需要额外配置，不需要代理，不需要伪装 User-Agent。

**安装：**

```bash
pip install cloakbrowser
```

Chrome 二进制文件会在首次运行时自动下载（约 200MB），之后和普通 Playwright 一样使用。

## 🔬 实测效果

| Header | Header | 
| --- | --- | 
> _(表格内容通过子行渲染)_

和内置的 Playwright 浏览器对比——同样的代码，Playwright 被 Cloudflare 拦住，CloakBrowser 直接进。

## 🔧 技术原理

核心是 57 个 C++ 补丁，覆盖不同维度的检测特征：

- **navigator 属性**：webdriver、plugins、languages 等特征全部清除
- **Chrome 运行时特征**：`--headless` 模式下的痕迹
- **WebGL 渲染器**：修改 GPU 厂商字符串
- **Canvas 指纹**：消除不同浏览器间的渲染差异
- **字体枚举**：返回标准字体列表
- **时区和语言**：可自定义
- **Permissions API**：模拟真实用户权限状态
这些补丁打在 Chromium 146 基础上，每个版本发布时都会同步更新。

## 💡 适用场景

- **网页抓取**：绕过风控拿数据
- **自动化测试**：不让被测试网站识别出是自动化工具
- **AI Agent 浏览器操作**：Agent 操控浏览器时不会被拦
- **截图服务**：批量生成网页截图不触发验证
- **SEO 监控**：查看搜索引擎怎么看你的页面
---

爬虫和反爬就像军备竞赛。Cloudflare、Akamai 这些公司的检测手段越来越深，从 HTTP 头部特征一路检测到 WebGL 渲染参数。CloakBrowser 的意义在于——它证明了从源码层面绕过检测是可行的，而且做成了开源项目。


