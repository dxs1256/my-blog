---
date: "2026-05-06"
type: "Post"
tags:
  - "教程"
  - "教程"
  - "Docker"
  - "音乐"
  - " 开源"
title: "LX Music Sync Server 完整部署与使用指南：从零搭建私有云音乐平台"
description: "一份完整的 LX Music Sync Server 部署指南，涵盖 Docker/源码编译部署、全量配置参数手册、Nginx反向代理、Web播放器使用、客户端同步、WebDAV云端备份、自定义音源管理、Subsonic协议接入及常见问题排查。"
categories:
  - "教程"
image: "https://bing.ee123.net/img/rand?seed=lx-music-sync-server-deploy-guide"
---

[//]: # (notion-sync-id: 358874cb-3972-81bb-954a-fb6e6fe3ef34)

# LX Music Sync Server 完整部署与使用指南

> 基于 [XCQ0607/lxserver](https://github.com/XCQ0607/lxserver) 项目，本文档涵盖从零到可用的全流程。

---

<!-- toc -->

---

## 目录

- [一、项目简介](#一项目简介)
- [二、环境准备](#二环境准备)
- [三、Docker 部署（推荐）](#三docker-部署推荐)
- [四、源码编译部署](#四源码编译部署)
- [五、配置参数完全手册](#五配置参数完全手册)
- [六、Nginx 反向代理（公网部署）](#六nginx-反向代理公网部署)
- [七、管理控制台使用](#七管理控制台使用)
- [八、Web 播放器使用](#八web-播放器使用)
- [九、LX Music 客户端同步连接](#九lx-music-客户端同步连接)
- [十、WebDAV 云端备份](#十webdav-云端备份)
- [十一、自定义音源管理](#十一自定义音源管理)
- [十二、Subsonic 协议接入](#十二subsonic-协议接入)
- [十三、常见问题与排查](#十三常见问题与排查)
- [十四、安全加固建议](#十四安全加固建议)
---

## 一、项目简介

LX Music Sync Server 是修改自 [lx-music-sync-server](https://github.com/lyswhut/lx-music-sync-server) 的增强版本，从一个简单的数据中转站升级为全功能私有云音乐平台。

### 核心能力


### 架构概览

```plain text
┌─────────────────────────────────────────────────────┐
│                   客户端层                            │
│  LX Music 桌面端 │ Web 播放器 │ Subsonic 客户端      │
└───────────┬──────────┬────────────┬──────────────────┘
            │          │            │
            ▼          ▼            ▼
┌─────────────────────────────────────────────────────┐
│              LX Sync Server (Node.js)               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │ 同步 API  │ │ 播放 API  │ │ 管理 API  │            │
│  └──────────┘ └──────────┘ └──────────┘            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │ 用户管理  │ │ 音源引擎  │ │ 文件缓存  │            │
│  └──────────┘ └──────────┘ └──────────┘            │
└──────────────────────┬──────────────────────────────┘
                       │
            ┌──────────┼──────────┐
            ▼          ▼          ▼
       本地存储     WebDAV云    音乐平台CDN
       /data       (坚果云等)   (kw/kg/tx/wy/mg)
```

---

## 二、环境准备

### Docker 部署（推荐）


### 源码编译部署


---

## 三、Docker 部署（推荐）

### 方式一：docker run（快速启动）

```bash
docker run -d \
  -p 9527:9527 \
  -v /opt/lxserver/data:/server/data \
  -v /opt/lxserver/logs:/server/logs \
  -v /opt/lxserver/cache:/server/cache \
  -v /opt/lxserver/music:/server/music \
  --name lx-sync-server \
  --restart unless-stopped \
  -e FRONTEND_PASSWORD=你的管理员密码 \
  -e ENABLE_WEBPLAYER_AUTH=true \
  -e WEBPLAYER_PASSWORD=你的播放器密码 \
  -e DISABLE_TELEMETRY=true \
  -e NODE_ENV=production \
  xcq0607/lxserver:latest
```

参数说明：


### 方式二：Docker Compose（生产首选）

创建 docker-compose.yml：

```yaml
version: '3'
services:
  lx-sync-server:
    image: xcq0607/lxserver:latest
    container_name: lx-sync-server
    restart: unless-stopped
    ports:
      - "9527:9527"
    volumes:
      - ./data:/server/data
      - ./logs:/server/logs
      - ./cache:/server/cache
      - ./music:/server/music
    environment:
      - NODE_ENV=production
      - FRONTEND_PASSWORD=你的管理员密码
      - ENABLE_WEBPLAYER_AUTH=true
      - WEBPLAYER_PASSWORD=你的播放器密码
      - DISABLE_TELEMETRY=true
```

启动：

```bash
docker-compose up -d
```

### 方式三：GitHub Packages 镜像

```bash
# 使用 GitHub Packages 的镜像
docker pull ghcr.io/xcq0607/lxserver:latest
```

### 容器管理常用命令

```bash
# 查看运行状态
docker ps | grep lx-sync-server

# 查看日志（最近50行）
docker logs lx-sync-server --tail 50 -f

# 重启服务
docker restart lx-sync-server

# 进入容器调试
docker exec -it lx-sync-server sh

# 停止并删除重建
docker stop lx-sync-server && docker rm lx-sync-server
# 然后重新执行 docker run 命令
```

---

## 四、源码编译部署

```bash
# 1. 克隆代码
git clone https://github.com/XCQ0607/lxserver.git
cd lxserver

# 2. 安装依赖
npm ci

# 3. 构建前端和后端
npm run build

# 4. 启动服务
npm start
```

### 使用 PM2 守护进程（推荐无人值守环境）

```bash
# 安装 PM2
npm install -g pm2

# 启动
pm2 start npm --name "lxserver" -- start

# 设置开机自启
pm2 save
pm2 startup
```

### 源码部署的配置方式

可通过环境变量或项目根目录下的 config.js 进行配置：

```javascript
// config.js
module.exports = {
  port: 9527,
  bindIP: '0.0.0.0',
  frontendPassword: '你的密码',
  // ... 其他配置项
}
```

---

## 五、配置参数完全手册

### 配置优先级（从高到低）

```plain text
运行时环境变量 (Environment Variables)
        ↓
WebDAV 云端同步数据
        ↓
显式自定义配置文件 (CONFIG_PATH 指定)
        ↓
全局 config.js 文件
        ↓
系统默认值 (src/defaultConfig.ts)
```

### 网络通讯与底层服务


### 账户与数据管理


### WebDAV 云端同步


### Web 播放器


### 播放列表与协议


### CLI 静默预置账户

启动时通过环境变量自动创建用户：

```bash
# 命名规则：LX_USER_<用户名>=<密码>
export LX_USER_foo="mypassword123"
export LX_USER_bar="mypassword321"
```

账户数据会自动持久化到 DATA_PATH/users.json。

---

## 六、Nginx 反向代理（公网部署）

公网暴露时强烈建议使用 Nginx 做前置代理：

### 启用 HTTPS

```bash
# 安装 certbot
apt install certbot python3-certbot-nginx

# 申请证书并自动配置 Nginx
certbot --nginx -d music.yourdomain.com
```

---

## 七、管理控制台使用

### 访问

浏览器打开 http://你的IP:9527/（如果修改了 ADMIN_PATH 则访问对应路径），输入管理员密码登录。

### 功能模块


### 通过 API 管理

管理控制台的所有操作都可以通过 RESTful API 实现，详见 [API 文档](#附录-api-速查)。

---

## 八、Web 播放器使用

### 访问

浏览器打开 http://你的IP:9527/music

如果启用了 ENABLE_WEBPLAYER_AUTH，需先输入播放器密码。

### 核心功能

### 🔍 搜索与音源

- 支持五大平台聚合搜索
- 可导入自定义 JS 脚本扩展音源
- 支持搜索专辑、歌手并收藏
### 🎵 播放控制

- 多音质选择：128k / 320k / FLAC / Hi-Res
- 音质自动降级：FLAC → 320k → 192k → 128k
- 播放速度调节（0.5x - 2.0x）
- 淡入淡出效果
- 播放进度记忆
### 🎨 UI 与交互

- 5 种内置主题
- 底部音频波形可视化
- 卡拉OK逐字歌词高亮
- 支持翻译和罗马音显示
- 快捷键操作
- 睡眠定时器
- PWA 支持（可添加到手机桌面）
### 📥 下载与缓存

播放器采用三级缓存机制：

```plain text
第一级：本地文件（/music + /cache 目录） → 最快
    ↓ 未命中
第二级：浏览器 LocalStorage 链接缓存 → 中速
    ↓ 未命中/过期
第三级：实时在线解析获取 → 最慢但最可靠
```


可在播放器设置中将缓存文件"移动"到 /music 目录实现持久化保存。

---

## 九、LX Music 客户端同步连接

### 桌面客户端设置

1. 下载安装 [LX Music 客户端](https://github.com/lyswhut/lx-music-desktop/releases)
1. 打开客户端 → 设置 → 同步设置
1. 开启同步功能，填入：
- 服务器地址：http://你的服务器IP:9527
- 用户名/密码：服务端创建的账号
1. 连接成功后，歌单、设置自动双向同步
### 多设备同步

所有设备连接同一个服务器地址，使用同一账号登录即可。歌单变更会自动同步到所有设备。

### 在服务端创建用户

方式一：环境变量预置

```bash
-e LX_USER_mike=abc123
-e LX_USER_sarah=xyz789
```

方式二：管理控制台

访问 http://IP:9527/ → 用户管理 → 创建新用户

方式三：API

```bash
curl -X POST http://IP:9527/api/users \
  -H "Content-Type: application/json" \
  -H "x-frontend-auth: 你的管理员密码" \
  -d '{"name": "新用户名", "password": "用户密码"}'
```

---

## 十、WebDAV 云端备份

### 坚果云配置示例

1. 登录 [坚果云](https://www.jianguoyun.com) → 设置 → 安全选项 → 第三方应用管理
1. 添加应用，获取应用专用密码（不是登录密码！）
1. 启动容器时加环境变量：
```bash
-e WEBDAV_URL=https://dav.jianguoyun.com/dav/同步文件夹路径 \
-e WEBDAV_USERNAME=你的坚果云邮箱 \
-e WEBDAV_PASSWORD=应用专用密码 \
-e SYNC_INTERVAL=60
```

### 工作机制


---

## 十一、自定义音源管理

### 导入方式

1. 在线导入：设置 → 自定义源管理 → 粘贴源 URL
1. 上传脚本：设置 → 自定义源管理 → 上传本地 JS 文件
1. API 导入：
```bash
curl -X POST http://IP:9527/api/custom-source/import \
  -H "x-user-token: 你的Token" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/source.js"}'
```

### 账号隔离机制


- 同ID的私有源会覆盖公开源
- 禁用私有源不会回退到公开同名源
- 每个用户可独立控制公开源的启用/禁用状态
### 音源推荐

自定义源脚本会过期失效。建议定期关注社区维护的源：

- GitHub 搜索 lx-music-source
- 官方源：[lyswhut/lx-music-desktop](https://github.com/lyswhut/lx-music-desktop)
---

## 十二、Subsonic 协议接入

启用后可使用兼容 Subsonic 协议的第三方客户端：


### 连接信息

```plain text
服务器地址：http://你的IP:9527/rest
用户名：你的LX Music账号
密码：你的LX Music密码
```

### 关闭 Subsonic 协议

```bash
-e SUBSONIC_ENABLE=false
```

---

## 十三、常见问题与排查

### 播放失败：NotSupportedError

现象：日志中出现 [Player] Playback blocked: NotSupportedError

原因与解决：


### 认证失败 401

```plain text
[Auth] 用户 Token 已过期
[Cache] 获取缓存统计失败
```

解决：在 Web 播放器中重新登录账号。

### 缓存统计失败

原因：未登录或权限不足。

解决：登录后自动恢复。如仍失败，检查 FRONTEND_PASSWORD 是否正确。

### Pitch Shifter 初始化失败

```plain text
Cannot read properties of undefined (reading 'addModule')
```

原因：浏览器不支持 AudioWorklet（HTTP 环境或旧版浏览器）。

解决：不影响播放功能，可忽略。

### 自定义源 403

```plain text
[CustomSource] List access denied (403)
```

原因：ENABLE_PUBLIC_USER_RESTRICTION=true 限制了未登录用户。

解决：登录账号后操作。

### 服务器日志排查

```bash
# 实时跟踪日志
docker logs lx-sync-server -f --tail 100

# 查看服务端处理播放请求的具体错误
docker logs lx-sync-server --tail 50 2>&1 | grep -i "error\|fail"
```

---

## 十四、安全加固建议

### 必做


### 建议


---

## 附录：生产级 Docker Compose 模板

```yaml
version: '3'
services:
  lx-sync-server:
    image: xcq0607/lxserver:latest
    container_name: lx-sync-server
    restart: unless-stopped
    ports:
      - "127.0.0.1:9527:9527"   # 仅本机监听，配合 Nginx
    volumes:
      - ./data:/server/data
      - ./logs:/server/logs
      - ./cache:/server/cache
      - ./music:/server/music
    environment:
      - NODE_ENV=production
      - FRONTEND_PASSWORD=your_admin_password
      - ENABLE_WEBPLAYER_AUTH=true
      - WEBPLAYER_PASSWORD=your_player_password
      - DISABLE_TELEMETRY=true
      - ADMIN_PATH=/admin         # 隐藏管理入口
      - SERVER_NAME=My Music
      - SUBSONIC_ENABLE=true
      - ENABLE_CACHE_SIZE_LIMIT=true
      - CACHE_SIZE_LIMIT=5000     # 5GB缓存上限
      - LX_USER_mike=user_password_1
      - LX_USER_sarah=user_password_2
    # 如果服务器无法直接访问音乐CDN，取消注释：
    # - PROXY_ALL_ENABLED=true
    # - PROXY_ALL_ADDRESS=socks5://127.0.0.1:10808
```

---

> 📝 本文档基于 LX Music Sync Server 项目整理，结合实际部署经验编写。如有疑问请参考 [GitHub 项目](https://github.com/XCQ0607/lxserver) 或 [官方文档](https://xcq0607.github.io/lxserver/)。

```yaml
server {
    listen 80;
    server_name music.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:9527;

        # IP 透传
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # WebSocket 长连接支持（同步通信必需）
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```


