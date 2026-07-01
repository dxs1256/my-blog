---
date: "2026-05-20"
type: "Post"
tags:
  - "热门文章"
  - "AI"
  - "提示词"
  - "涂鸦"
  - "JSON"
  - "Midjourney"
title: "AI 生成街头涂鸦合照提示词：4 种主题场景，JSON 直接可用"
description: "发现一套超实用的 AI 涂鸦合照提示词，上传照片即可生成街头涂鸦风格合照。内置新年、赛博、民国、国潮四种主题，JSON 格式直接复制使用。"
categories:
  - "工具推荐"
image: "https://bing.ee123.net/img/rand?seed=ai-street-graffiti-portrait-prompt-json"
---

[//]: # (notion-sync-id: 366874cb-3972-81a5-bd72-f0c047693fcd)

最近看到很多人在社媒上发那种街头涂鸦风格的合照，效果特别有质感。我试了一下这套提示词，上传自己的照片就能生成，效果出乎意料地好。

它内置了四个主题场景：新年、赛博朋克、民国风、国潮禅意。提示词是完整的 JSON 格式，直接复制就能用。

![](https://images.weserv.nl/?url=https://pbs.twimg.com/media/G-oPCpSbMAA7lB4.jpg?name=orig)

---

## 💡 核心提示词

这套提示词的结构非常清晰，主要分为以下几个部分：

- global_settings：全局设置，比例、视角、整体氛围
- variables：可自定义变量，文字内容、主题选择
- mural_aesthetics：涂鸦美学，渲染风格、粗糙感细节
- style_scenarios：四种主题场景的具体描述
- foreground_subject：前景人物，姿态、服装、位置
- technical_finish：技术细节，墙面纹理、光影
下面是完整的 JSON 提示词，直接复制使用：

```json
{
  "task_description": "Create a natural street portrait of a real person standing in front of a layered, messy graffiti wall. The wall features a spontaneous, hand-painted caricature of the person.",
  "global_settings": {
    "aspect_ratio": "4:3",
    "camera_view": "Front-on or slight 15-degree angle; avoid extreme perspective distortion; eye-level shot",
    "overall_vibe": "Authentic urban street culture, raw, energetic, and candid"
  },
  "variables": {
    "mural_main_text": "月入百万",
    "mural_secondary_text": "2026",
    "theme": "New Year Festive",
    "style_pool": ["New Year Festive", "Cyberpunk Underground", "Vintage Republican", "Traditional Zen"]
  },
  "mural_aesthetics": {
    "rendering_style": "Hand-painted aerosol art, not a digital print",
    "messiness_factors": [
      "Visible paint splatters and spontaneous drips",
      "Soft, blurred spray edges (no sharp digital outlines)",
      "Layered effect: the main portrait is painted over faint, messy background tags and scribbles",
      "Imperfect symmetry to enhance the 'freehand' look"
    ],
    "content": "A vibrant caricature based on the reference person's facial features and joyful expression, integrated into the chaotic beauty of the street wall."
  },
  "style_scenarios": {
    "New_Year_Festive": {
      "setting": "An old city street during dusk",
      "palette": "Dominant deep reds and gold, contrasted with the reference image's colors",
      "details": "Faint lanterns in the distance, festive graffiti tags"
    },
    "Cyberpunk_Underground": {
      "setting": "A dimly lit pedestrian tunnel with wet floors",
      "palette": "Neon blue and violet, mixed with the reference image's color tones",
      "details": "Exposed wires on the wall, industrial textures"
    },
    "Vintage_Republican": {
      "setting": "A historic brick alleyway (Lilong)",
      "palette": "Muted earth tones, sepia, and charcoal",
      "details": "Old wooden window frames, textured grey bricks"
    },
    "Traditional_Zen": {
      "setting": "A quiet courtyard with a stone wall",
      "palette": "Ink black, sage green, and white-wash",
      "details": "Subtle bamboo shadows, weathered limestone texture"
    }
  },
  "foreground_subject": {
    "logic": "Mirror the gender and facial features of the reference image.",
    "attire_strategy": "Inherit the dominant color palette from the reference photo's clothing. For example, if the reference is wearing a black T-shirt, generate a stylish, theme-appropriate outfit in black or dark tones (e.g., a black techwear jacket for Cyberpunk theme).",
    "position": "Grounded in the bottom right corner, waist-up or three-quarter view.",
    "pose_randomization": [
      "Casually leaning back against the wall",
      "One hand adjusting hair or a hat",
      "A relaxed, mid-laugh stance with hands in pockets",
      "Slightly looking away from the camera for a candid feel"
    ]
  },
  "technical_finish": {
    "wall_texture": "Naturally weathered concrete or brick; subtle cracks and water stains that feel organic, not forced.",
    "lighting": "Dynamic natural lighting (soft sunlight or ambient street glow) that casts a soft shadow from the person onto the wall, ensuring a deep blend."
  }
}
```

---

## 🎨 四种主题说明

在 `style_pool` 数组中可以选择不同的主题风格：

- New Year Festive：新年喜庆风，深红金色调，远处灯笼点缀
- Cyberpunk Underground：赛博朋克，霓虹蓝紫色，潮湿隧道场景
- Vintage Republican：民国复古，大地色系，老砖墙巷道
- Traditional Zen：国潮禅意，水墨黑白，石墙庭院竹影
## 🔧 自定义参数

提示词中有几个关键参数可以根据需要修改：

- `mural_main_text`：涂鸦墙上的主要文字（如'月入百万'）
- `mural_secondary_text`：辅助文字（如年份'2026'）
- `theme`：从 style_pool 中选择当前使用的主题
- `pose_randomization`：人物姿态，可增删或修改
## 📷 使用建议

为了获得最好的效果，建议参考照片满足以下条件：

- 面部清晰，光线自然
- 表情轻松（大笑或微笑效果最佳）
- 服装颜色与所选主题色调有一定呼应
生成时保持 4:3 比例，正面或轻微 15 度角视角，避免极端透视变形。

---

## 📝 写在最后

这套提示词把街头涂鸦的美学拆解得很细致，从喷漆质感、颜料飞溅到墙面风化效果都有具体描述。如果你也想生成自己的涂鸦风格合照，直接复制上面的 JSON 就能开始尝试。


