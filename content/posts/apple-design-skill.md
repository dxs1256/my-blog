---
date: "2026-07-17"
type: blog
tags:
  - 设计
  - 开源
  - Web
  - CSS
title: "Apple 设计风格，被提炼成了可复用的 Skill"
description: "前 Vercel/Linear 设计师将 Apple WWDC 设计精华蒸馏成 Web 可用的代码模式，17 条原则让你写出一流的界面"
categories:
  - 工具推荐
image: "https://bing.ee123.net/img/rand?seed=apple-design-skill"
---
[//]: # (notion-sync-id: apple-design-skill-20260717)

做前端/UI 的应该都有过这种体验：盯着一个界面，感觉"差点意思"，但说不上来哪里不对。动画的缓动函数选错了？间距不对？还是颜色差点火候？

最近在 X 上看到一条推文被疯狂转发（14.5k+ 点赞），讲的是 [**emilkowalski/skills**](https://github.com/emilkowalski/skills) 项目里的一个 skill——**apple-design**。作者是前 Vercel 和 Linear 的设计师 Emil Kowalski，他把 Apple 在 WWDC 上分享的设计与动效原则，系统性地蒸馏成了一份 Web 开发者可以直接用的知识库。

项目地址：https://github.com/emilkowalski/skills

## 🎯 这不是一篇设计文章，而是一个可执行的 Skill

这个项目的特别之处在于，它不是一篇"读完了就完了"的设计博客。它是设计给 AI Agent 用的 **Skill**——通过 `npx skills@latest add emilkowalski/skills` 安装后，你的 AI 编程助手就能按照 Apple 的设计标准来写代码。

作者的原话很到位："AI 没有品味。它们分不清 `ease-in` 和 `ease-out` 的区别，也不知道什么时候该用半透明阴影而不是实线边框。这些小细节叠加起来，决定了你的界面是惊艳还是平庸。"

## 🍎 17 条核心原则，来自 WWDC 设计精华

这份 SKILL 汲取了 Apple 多年 WWDC 设计讲座的精华——尤其是《Designing Fluid Interfaces》（2018）和《The Details of UI Typography》（2020），并将其转化为 Web 平台（CSS、Pointer Events、Spring 动画库）的具体实现。

### 核心哲学

> "当界面与我们的思维和动作方式对齐时，它就不再像一台电脑，而开始感觉像我们自身的延伸。"

### 要点速览

| 原则 | 核心要点 |
|------|---------|
| **响应** | 按下的瞬间给出反馈，不是松开时。延迟一秒就失去了"直接感" |
| **直接操控** | 拖拽时元素必须"粘"在手指上，尊重抓取偏移量 |
| **可中断性** | 任何动画必须可随时打断、反转。用户在半路抓住一个正在关闭的弹窗，它应该跟着手指走 |
| **Spring 动画** | 用弹簧代替固定时长动画。弹簧天然可中断、可继承速度 |
| **速度传递** | 手势结束瞬间，动画以手指的精确速度继续——这是"流畅"和"还行"的分界线 |
| **动量投射** | 不根据释放点就近吸附，而是根据速度预测终点再吸附 |
| **空间一致性** | 从哪来、回哪去。对称路径，锚定原点 |
| **橡皮筋效应** | 到边界时渐进抵抗，而不是硬停 |
| **毛玻璃与深度** | `backdrop-filter: blur()` + 半透明背景，层次感通过材料透明度传达 |
| **排版** | 字距随字号变化，行高和字号反向相关，系统字体优先 |

### 具体的 Spring 参数对照表

Apple 内部使用的参数，被直接翻译成了 Web 可用的数值：

| 交互场景 | 阻尼 | 响应时间 |
|---------|------|---------|
| 移动/重定位（如画中画） | `1.0` | `0.4` |
| 旋转 | `0.8` | `0.4` |
| 抽屉/面板 | `0.8` | `0.3` |

对应到 Motion / Framer Motion 的写法：

```js
// 无过冲的临界阻尼（默认）
animate(el, { y: 0 }, { type: 'spring', bounce: 0, duration: 0.4 });

// 带微量弹性，只用于有动量的交互
animate(el, { y: target }, { type: 'spring', bounce: 0.2, duration: 0.4 });
```

### 动量投射的精确算法

Apple 在 WWDC 上展示的投射函数（来自 Designing Fluid Interfaces 示例代码）：

```js
function project(initialVelocity, decelerationRate = 0.998) {
  return (initialVelocity / 1000) * decelerationRate / (1 - decelerationRate);
}
```

### 排版：Apple 的细节

- 大号展示文字用**负字距**（字母间距随字号增大而收紧）
- 小号文字用**微正字距**提高可读性
- 固定一个 `letter-spacing` 值在不同字号下都是错的
- 行高与字号反向相关：大标题行距紧，正文行距松

```css
.display {
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
}
```

## 💡 为什么这个项目值得关注

这个项目戳中了一个很实在的点：**AI 编程助手正在大量生成 UI 代码，但生成的界面普遍"差点意思"。** 原因不是 AI 不会写代码，而是它缺乏设计品味——不知道什么时候该用哪种缓动、什么场景用什么材质、排版细节怎么调。

Emil 的做法是把这些"隐性知识"显式化为可复用的规则集，让 AI 在生成代码时有一份设计标准可循。**15.6k Star 和 14.5k 点赞已经说明了一切。**

## 🎯 适合谁用

- 前端工程师，想让界面动效更丝滑
- 设计工程师，想把 Apple 的设计语言带到 Web
- AI 编程的重度用户，想让 AI 生成的 UI 有更好的品味
- 任何对"界面为什么感觉好"这件事感兴趣的人

## 🔚 总结

这份 apple-design skill 不是让你照抄 Apple 的 UI，而是理解它背后的**设计决策逻辑**——为什么用弹簧而不是定时器、为什么进入和退出的路径必须对称、为什么毛玻璃层的透明度需要随层级变化。

装一个试试：

```bash
npx skills@latest add emilkowalski/skills
```

然后让 AI 按照 Apple 的标准帮你写界面。结果可能会让你惊喜。