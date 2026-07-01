# cf-blog 文章模板说明

本项目有三个文章模板，根据内容类型选用：

| 文件 | 前缀 | 用途 | categories | 配图 |
|:---|:---|:---|:---|:---|
| `t-template-tutorial.md` | `t-` | 教程、部署指南 | `["教程", "指南"]` | `t.png` |
| `s-template-share.md` | `s-` | 分享、羊毛、福利 | `["分享", "羊毛"]` | `share.jpg` |
| `r-template-record.md` | `r-` | 记录、学习心得 | `["记录", "学习心得"]` | `record.jpg` |

## 正文格式规则

- 链接用 markdown：`[text](url)`，**禁止裸 URL**
- 表格用 GFM 语法：`|列1|列2|` + `|:---|:---|`
- **禁止 `<!--more-->`**：`react-markdown` 不解析 HTML 注释，会原样显示

## 构建注意事项

- CF Pages 执行 `npm ci`，新依赖装完后必须更新 `package-lock.json`
- 表格需要 `remark-gfm` 插件，已在 `App.tsx` 中配置

## 发布前 checklist

- [ ] `draft` 改为 `false`
- [ ] `date` 和 `updated` 填当天日期
- [ ] `sticky` 置顶文章填数字（1 最高），普通文章填 `null`
- [ ] 配图使用本地路径：`/images/r.jpg` / `/images/s.jpg` / `/images/t.png`
