---
date: "2026-05-06"
type: "Post"
tags:
  - "教程"
  - "Notion"
  - " 开源"
title: "NotionNext 中文字体预览与配置指南"
description: "NotionNext 支持的 6 款中文字体预览对比，包括霞鹜文楷、思源宋体、思源黑体、得意黑、悠哉字体等，附 NOTION_CONFIG 配置方法"
categories:
  - "教程"
image: "https://bing.ee123.net/img/rand?seed=notionnext-chinese-font-preview-guide"
---

[//]: # (notion-sync-id: 358874cb-3972-8185-8201-daf6f907b46e)

NotionNext 支持通过 NOTION_CONFIG 自定义网站字体，无需修改源码即可切换不同风格。本文整理了 6 款优质开源中文字体，附每种字体的风格特点和配置代码，帮你快速选到心仪的字体。

---

## 1. 霞鹜文楷（LXGW WenKai）

> 🟢 温润优雅的手写楷体，最百搭的选择，适合绝大多数博客场景

霞鹜文楷是一款基于 Klee One 衍生的开源字体，字形温润舒展，长时间阅读不疲劳。无论是博客正文还是标题，都能呈现优雅舒适的视觉感受。推荐作为首选字体。

### NOTION_CONFIG 配置

FONT_URL：

```json
["https://npm.elemecdn.com/lxgw-wenkai-webfont@1.6.0/style.css", "https://fonts.googleapis.com/css?family=Bitter&display=swap", "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap", "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300&display=swap"]
```

GLOBAL_CSS：

```css
[id^="theme-"] { font-family: "LXGW WenKai", sans-serif; }
```

---

## 2. 霞鹜文楷 GB（LXGW WenKai GB）

> 🟢 霞鹜文楷的 GB2312 版本，字符覆盖更全面

与霞鹜文楷风格一致，但采用 GB2312 字符集，适合需要完整中文支持的场景。字形同样温润流畅，是霞鹜文楷的补充版本。

### NOTION_CONFIG 配置

FONT_URL：

```json
["https://cdn.jsdelivr.net/npm/lxgw-wenkai-gb-webfont@1.2.0/style.css", "https://fonts.googleapis.com/css?family=Bitter&display=swap", "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap", "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300&display=swap"]
```

GLOBAL_CSS：

```css
[id^="theme-"] { font-family: "LXGW WenKai GB", sans-serif; }
```

---

## 3. 思源宋体（Noto Serif SC）

> 🔴 端庄典雅的衬线字体，适合文学和深度阅读内容

思源宋体由 Adobe 与 Google 联合开发，笔画端庄典雅，具有浓厚的书卷气息。想要「纸质书」质感的博客选它就对了，特别适合长文阅读和文学类内容。

### NOTION_CONFIG 配置

FONT_STYLE：

```plain text
font-serif font-light
```

FONT_URL：

```json
["https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500;700&display=swap", "https://fonts.googleapis.com/css?family=Bitter&display=swap"]
```

GLOBAL_CSS：

```css
[id^="theme-"] { font-family: "Noto Serif SC", serif; }
```

---

## 4. 思源黑体（Noto Sans SC）

> 🔵 现代简洁的无衬线字体，技术博客的稳妥之选

同样出自 Adobe 与 Google 之手，笔画清晰规整，与代码混排非常和谐。不折腾、稳稳当当，是 NotionNext 的默认字体方案。

### NOTION_CONFIG 配置

FONT_STYLE：

```plain text
font-sans font-light
```

FONT_URL：

```json
["https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap", "https://fonts.googleapis.com/css?family=Bitter&display=swap"]
```

GLOBAL_CSS：

```css
[id^="theme-"] { font-family: "Noto Sans SC", sans-serif; }
```

---

## 5. 得意黑（Smiley Sans）

> 🟣 窄斜体风格，辨识度极高，一看就不一样

得意黑是一款创意窄斜体风格的开源中文字体，字形独特有个性。适合追求差异化的博客，但不太适合长篇正文阅读，建议用于标题或短内容场景。

### NOTION_CONFIG 配置

FONT_URL：

```json
["https://cdn.jsdelivr.net/npm/smiley-sans@1.1.1/dist/smiley-sans.css", "https://fonts.googleapis.com/css?family=Bitter&display=swap", "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap", "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght=300&display=swap"]
```

GLOBAL_CSS：

```css
[id^="theme-"] { font-family: "Smiley Sans", sans-serif; }
```

---

## 6. 悠哉字体（Yozai）

> 🟠 可爱圆润的圆体，适合轻松愉快的场景

悠哉字体基于 MomoTalk 改造，字形活泼亲切。适合生活类、手账风或轻松愉快的博客，给人温暖可爱的感觉。

### NOTION_CONFIG 配置

FONT_URL：

```json
["https://cdn.jsdelivr.net/npm/yozai-font@1.2.0/dist/yozai.css", "https://fonts.googleapis.com/css?family=Bitter&display=swap", "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap", "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300&display=swap"]
```

GLOBAL_CSS：

```css
[id^="theme-"] { font-family: "Yozai", sans-serif; }
```

---

## 配置方法

在 NotionNext 4.4.4 及以上版本，可以直接通过 NOTION_CONFIG 修改字体，无需改动源码：

1. 在 Notion 配置数据库中找到 FONT_URL 字段，填入字体 CSS 文件的 CDN 地址数组
1. 找到 GLOBAL_CSS 字段，填入 font-family 的 CSS 规则
1. 如果使用衬线字体（如思源宋体），还需修改 FONT_STYLE 为 font-serif font-light
1. 重新部署网站即可生效
---

> ⚠️ 字体名称含空格时必须用双引号包裹，如 "LXGW WenKai" 而非 LXGW WenKai

---

## 字体推荐

- 博客正文首选：霞鹜文楷 — 温润舒适，长时间阅读不累
- 书卷气质：思源宋体 — 传统宋体韵味，适合文学内容
- 技术博客：思源黑体 — 清晰规矩，和代码混排和谐
- 个性风格：得意黑 — 窄斜体，辨识度极高
- 轻松可爱：悠哉字体 — 圆润活泼，适合生活类博客
---

> 所有字体均为开源免费，配置代码可直接复制使用。更多字体配置说明请参考 NotionNext 官方文档。


