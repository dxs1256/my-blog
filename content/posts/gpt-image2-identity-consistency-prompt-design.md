---
date: "2026-05-21"
type: "Post"
tags:
  - "热门文章"
  - "AI"
title: "如何用参考图 + 提示词结构让 AI 肖像保持身份一致性"
description: "用参考图锁身份、单束光造氛围、负向提示清杂草——一套让 GPT Image 2 生成高一致性电影感肖像的提示词设计逻辑，收藏率 1.2% 验证了实用价值"
categories:
  - "技术资讯"
image: "https://bing.ee123.net/img/rand?seed=gpt-image2-identity-consistency-prompt-design"
---

[//]: # (notion-sync-id: 366874cb-3972-810b-b164-c48450a748c7)

用 AI 生成人像，最常遇到的问题是什么？我体验到的是：换了提示词，肤色变了；加了细节，眼睛又不对了。出来的图「像但不完全像」。

最近我注意到，用 GPT Image 2 配合参考图生成了一套电影感肖像，成片保持了高度身份一致性。拆解他的提示词后发现，这套方法的核心不是描述有多详细，而是**结构设计**有多清晰。

**原文地址**：https://x.com/i/status/2056647551470997670

---

## 底层原理是什么

这套提示词的本质是一套**分层控制系统**，它不是一段长描述，而是一组层层递进的目标约束。

第一层约束是身份锁定。用参考图告诉模型：「这是同一个人的面孔」。这一步解决的是「像不像」的问题，也是后续所有效果成立的前提。第二层约束是场景边界。描述「暗色展厅」「壁画墙」「人物位于画面下方中央」，这是在告诉模型「人在什么环境里」。第三层约束是光影设计。单束斜光从右上打向左下，只照亮半侧身体——光影对比是电影感最廉价也最有效的来源，不需要复杂的灯光参数。第四层约束是风格过滤。用负面提示排除 anime、smiling、blur、bad anatomy 等，明确告诉模型「不要什么」。在生成式模型里，负向提示和正向提示同等重要。

四层约束的顺序不是随意的。身份锁定在前，场景构建在中，光影设计在后，风格过滤兜底。这个顺序决定了模型的「先理解人物，再构建画面」的思维链路。

---

## 性能数据是什么

生成内容在 X 上的实际互动数据：

- 4.1 万次浏览，657 个赞，517 次收藏收藏率 1.2%，远超普通推文的均值高收藏意味着读者认为「我以后可能用到」这类内容适合作为提示词模板收藏，而不是一次性消费
收藏率是判断提示词结构是否值得复用的最直接指标。这套结构 1.2% 的收藏率说明它不仅「好看」，而且「有用」。

---

## 如何使用这套结构

正向提示参考：

```markdown
Use my reference photo to preserve the exact facial features,
hairstyle, bangs, facial proportions, skin tone, body posture,
and overall silhouette with high identity consistency.

Cinematic portrait of a woman standing alone inside a dark
exhibition room. She wears a vintage white shirt layered with
a soft pink outer jacket and a black vintage-textured skirt.
Front-profile pose, relaxed posture, hands gently adjusting
her hair. Calm, mysterious expression.

A single dramatic diagonal spotlight cuts across the scene from
the upper right to the lower left, illuminating only half of her
body while the rest fades into shadow.

Camera settings: cinematic low-light photography, shallow depth
of field, Kodak Portra film color grading.
```

负面提示参考：

```markdown
anime, smiling, overexposed lighting, extra limbs,
bad anatomy, overly colorful outfit, cyberpunk neon, blurry face,
low quality, distorted hands, unrealistic skin, HDR overload,
exaggerated makeup, busy composition, duplicate person
```

实际使用时，只需要替换人物描述和场景描述，保留四层结构的骨架即可。这套结构对任何 AI 图像生成工具通用。

---

## 适用场景

这套结构最适合以下场景：

- 需要保持风格一致的人像系列生成
- 想要电影感、光影感强烈而不是高光磨皮感的画面
- 需要构建「参考图 + AI 生成」工作流的摄影师或设计师
- 研究 AI 图像生成提示词结构的从业者或爱好者
---

## 技术价值总结

这套方法的本质是用**分层约束**替代单句描述：先用参考图锁定身份，再用场景和光影构建氛围，最后用负向提示清杂草。结构清晰，顺序固定，效果可复现。对于需要生成高一致性人像的场景，这套逻辑值得作为基础模板收藏。


