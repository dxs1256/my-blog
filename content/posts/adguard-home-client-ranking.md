---
date: "2026-08-18"
type: blog
tags:
  - "软路由"
  - "OpenWrt"
  - "AdGuard Home"
  - "DNS"
  - "排障"
title: "AdGuard Home 客户端排行全是路由器？DNS 端口交换方案一次解决"
description: "软路由上 AdGuard Home 客户端排行 99.92% 都显示成路由器，看不到每台设备？根因是 PassWall 劫持了 53 端口导致设备 IP 丢失。本文记录完整排障过程与 DNS 端口交换方案，让客户端按设备独立统计。"
categories:
  - 软路由与网络
image: "https://bing.ee123.net/img/rand?seed=adguard-home-client-ranking"
---

我的软路由是 ImmortalWrt 24.10.6（rockchip/armv8，NanoPi R4S），装了 AdGuard Home 做去广告、PassWall 做科学上网。最近发现 AdGuard Home 的「客户端」排行里，**99.92% 的查询都记在 `ImmortalWrt.lan (192.168.1.1)` 名下**（约 1,324 条），手机、电脑、电视全都看不到。这篇文章记录完整的排障过程、根因分析、修复方案（DNS 端口交换）和验证结果。

---

## 一、问题现象

AdGuard Home 的「客户端」排行（最近 7 天）里，**99.92% 的查询都记在 `ImmortalWrt.lan (192.168.1.1)` 名下**（约 1,324 条），其他设备完全看不到。

- 期望：每个设备（手机、电脑、电视等）按自己的 IP 独立统计
- 实际：所有查询的"客户端"都是路由器自己

---

## 二、诊断过程

### 2.1 直接原因

**没有一台设备直接问 AdGuard Home —— 所有查询都是路由器自己转发过去的。**

设备真实 IP 在层层中转中丢失，到达 AGH 的查询源头永远是路由器本机（192.168.1.1）。

### 2.2 实际链路（问题根源）

```
设备 → 53端口
        ↓（PassWall 劫持 53，重定向到 11400）
   PassWall 自带 dnsmasq(11400)
        ↓ chinadns-ng(15353) 国内外分流
        ├─ 国内域名 → 国内 DNS 直连（不过 AGH）
        └─ 国外域名 → remote_dns = 192.168.1.1:6060 = AdGuard Home
```

另外系统 dnsmasq 也配了 `server=192.168.1.1#6060` 把查询转给 AGH。两条路都经过路由器中转，设备 IP 全部丢失。

### 2.3 证据（防火墙规则命中数）

| 规则 | 指向 | 命中数 |
|---|---|---|
| PassWall 的 53 劫持（`PSW_DNS`/默认） | → 11400 | **1300+ 包** |
| LuCI 面板给 AGH 配的「重定向」（53→6060，本可保留设备 IP） | → 6060 | **仅 4 个包** |

**结论**：LuCI 其实已经设置了 redirect 模式（53→6060，这种模式能保留设备 IP），但 **PassWall 的劫持规则排在它前面，把流量全抢走了**，所以 LuCI 的规则形同虚设。

### 2.4 排查过程（怎么一步步锁定的）

排查顺序不是一开始就知道是 PassWall，是按证据排除出来的：

1. **先看 LuCI 集成配置**：`AdGuardHome` 的 uci 配置里 `redirect` 已设为 redirect 模式——面板这边是正常的
2. **查防火墙规则命中数**：发现 `PSW_DNS`/`默认` 的 53 劫持规则命中 **1300+ 包**，而 LuCI 的重定向规则只命中 **4 个包**——**流量被劫持规则抢走了**
3. **查 PassWall 的 DNS 配置**：确认 PassWall 用 chinadns-ng 做国内外分流（国内直连、国外 `remote_dns=192.168.1.1:6060` 指向 AGH），以及它自带 dnsmasq（11400）接收劫持流量
4. **查 AGH querylog**：最近记录里客户端只有 `192.168.1.1`，没有其他设备 IP——与现象吻合

至此锁定：**PassWall 的 53 劫持是中转的源头**。

### 2.5 概念解释：为什么 redirect 保留设备 IP，劫持会丢

设备把 DNS 查询发到路由器 53 端口后，有两种"接管"方式，区别在**是否改源 IP**：

| 方式 | 机制 | 客户端 IP |
|---|---|---|
| **DNAT 重定向（redirect）** | nftables 只把**目标地址**从 53 改写为 6060，源地址保持设备 IP 不变 | ✅ 保留（AGH 能看到真实设备） |
| **中转转发（PassWall 劫持）** | 查询被交给 PassWall 的 dnsmasq（11400），dnsmasq 再**以路由器自己的身份**向上游（chinadns-ng → AGH）重新发起查询 | ❌ 丢失（第一跳就被替换成 192.168.1.1） |

关键点：**只要链路里存在"以路由器名义重新查询"的中转层，设备 IP 在第一跳就丢了**——不管后面是 dnsmasq、chinadns-ng 还是别的，AGH 永远只能看到路由器。

所以"保留设备 IP"只有一条路：**让设备直连 AGH，中间没有任何中转**。这就是后面端口交换方案的由来。

---

## 三、解决方案：DNS 端口交换（AGH 接管 53）

### 3.1 方案思路

要让客户端排行显示每个设备，必须让**设备直连 AGH**。标准方案是「端口交换」：

1. **AdGuard Home**：6060 → **53**（直面设备，才能看到真实 IP）
2. **系统 dnsmasq**：53 → **5353**（只负责 DHCP + 局域网 `lan` 域名）
3. **PassWall**：关掉 53 劫持；`remote_dns` 从「AGH:6060」改成真实国外 DNS（否则死循环）
4. **AGH 上游**：→ PassWall 的 chinadns-ng（继续国内外分流）+ `[/lan/]` → 5353

> ⚠️ 涉及科学上网和 DNS 主链路，做错会断网或科学上网失效。执行原则：**分步执行、每步验证、随时可回滚**。

### 3.2 备份（回滚的关键）

- 路由器 `/tmp/agh-backup/`：uci 导出 + AGH yaml + nft ruleset（**注意重启会丢**）
- 本地 `.backup/`：原始 yaml、全部 uci 导出、ruleset（持久保存）

### 3.3 分步执行（含命令、验证与失败排查）

**Step 1：dnsmasq 挪到 5353，去掉指向 AGH 的转发**（此步不中断，DNS 仍走 PassWall 链路）

```bash
uci set dhcp.@dnsmasq[0].port='5353'
uci -q delete dhcp.@dnsmasq[0].server
uci commit dhcp; /etc/init.d/dnsmasq restart
```

- 验证：解析测试仍正常（此时查询还走 PassWall 链路，不受影响），WAN 正常
- 小插曲：验证输出曾被截断，重新跑一遍确认无误——**验证命令输出异常时先重试，别急着判断失败**
- 失败情况：无

**Step 2：PassWall remote_dns 改为真实国外 DNS，重建 chinadns-ng**（短暂中断科学上网几秒）

```bash
uci set passwall.@global[0].remote_dns='1.1.1.1:53'
uci commit passwall; /etc/init.d/passwall restart
```

chinadns-ng 重建为：`china-dns=电信ISP`（国内）/ `trust-dns=tcp://1.1.1.1`（国外）。

- 验证：`uci get passwall.@global[0].remote_dns` 返回 `1.1.1.1:53`，chinadns-ng 配置已重建，DNS 正常
- 小插曲：执行命令链**末尾报了 exit 127**，但复查状态后发现配置实际已生效——**命令链尾部报错 ≠ 操作失败，先确认实际状态再判断**
- 失败情况：无

**Step 3：AGH 停 → 改 yaml → 启动**（端口交换，有数秒 DNS 中断）

```bash
/etc/init.d/AdGuardHome stop
# 用脚本通过 SFTP 精确修改 yaml：
#   bind_port: 6060 → 53
#   upstream_dns: 127.0.0.1:15353（chinadns-ng）+ [/lan/]127.0.0.1:5353（局域网域名）
/etc/init.d/AdGuardHome start
```

- 验证：53 端口由 AGH 监听、劫持规则已清（详见 Step 4）、dnsmasq 在 5353、chinadns-ng 在 15353
- **失败情况：出现 SERVFAIL 故障——排查过程详见 3.4**

**Step 4：关 PassWall 53 劫持，LuCI redirect 改 none**（劫持规则清除）

```bash
uci set passwall.@global[0].dns_redirect='0'
uci set passwall.@global[0].dnsmasq_dns_redirect='0'
uci set AdGuardHome.@AdGuardHome[0].redirect='none'
uci commit passwall; uci commit AdGuardHome
```

- 验证：PassWall 的 PSW 劫持规则不再生成，AGH 独占 53 端口
- 失败情况：无

### 3.4 关键坑：11400 不存在了（含故障排查过程）

**现象**：Step 3 启动 AGH 后，`nslookup` 测国内外域名全部 **SERVFAIL**；但广告拦截（`doubleclick.net` → `0.0.0.0`）和局域网解析（`ImmortalWrt.lan`）**正常**。

**排查过程**：

1. 先排除 AGH 本身：广告拦截和局域网解析正常，说明 AGH 进程和监听没问题——问题出在**上游**
2. 查 11400 端口：`netstat` 显示 **11400 没有任何进程监听**
3. 查 PassWall 生成目录：里面**只有 chinadns-ng 的配置，没有 dnsmasq 的配置**——PassWall 在 `dns_redirect=0` 时**不再运行自己的 11400 dnsmasq**
4. 结论：AGH 上游指向 11400 就是指向一个不存在的服务 → 国内外域名 SERVFAIL

**修正**：把 AGH yaml 的上游从 `127.0.0.1:11400` 改为 **`127.0.0.1:15353`（chinadns-ng 本体）**，重启 AGH → 解析全部恢复，国内外分流和 ipset 标记正常。

**为什么广告拦截和局域网解析不受影响**：广告过滤在 AGH 本地完成（上游不可达也照常拦截）；局域网域名走 `[/lan/]` 直接转发给 5353 的 dnsmasq，不经过坏掉的上游。

**教训**：PassWall 的组件不是固定存在的——**劫持关闭后它的 dnsmasq 就不跑了**。改完要实测端口和进程，不要假设配置里写过的服务一定在。

### 3.5 改造后架构

```
设备 → AdGuard Home(:53) → chinadns-ng(:15353) 国内外分流
                              ├─ 国内 → 电信 ISP DNS
                              └─ 国外 → tcp://1.1.1.1 走代理
      └─ [/lan/] → dnsmasq(:5353) 局域网域名
```

### 3.6 改动明细

| 项 | 改前 | 改后 |
|---|---|---|
| AdGuard Home | 端口 6060，上游阿里/360 DoH/DoT | 端口 **53**，上游 `127.0.0.1:15353` + `[/lan/]127.0.0.1:5353` |
| dnsmasq | 端口 53，`server=192.168.1.1#6060` 转发到 AGH | 端口 **5353**，只管 DHCP/局域网 |
| PassWall 53 劫持 | 开（抢走所有流量） | **关**（`dns_redirect=0`、`dnsmasq_dns_redirect=0`） |
| PassWall `remote_dns` | `192.168.1.1:6060`（指向 AGH，死循环源） | **`1.1.1.1:53`** |
| LuCI 重定向 | redirect（DNAT 53→6060） | **none** |

---

## 四、验证结果

| 验证项 | 结果 |
|---|---|
| 国内域名 `www.baidu.com` | 正常解析 ✓ |
| 国外域名 `www.google.com` | 经代理解析无污染（HTTP 200，0.8s）✓ |
| 广告拦截 `doubleclick.net` | 返回 `0.0.0.0` ✓ |
| 局域网 `ImmortalWrt.lan` | → `192.168.1.1` ✓ |
| **按设备识别** | querylog 中 `192.168.1.191`（本机）、`192.168.1.116`（另一台设备，正在刷小红书）**各自独立记录** ✓ |
| 科学上网端到端 | google 0.8s（走代理）、baidu 0.1s（直连）✓ |

改造后第 2 天起，AGH「客户端」页面就能看到每个设备了（历史 7 天里 192.168.1.1 的大头是改造前的旧数据）。

---

## 五、重启自恢复验证

### 5.1 开机自启顺序（正确）

```
S19dnsmasq     → 5353（先起，AGH 的 lan 上游）
S95AdGuardHome → 53（后起，接管主端口）
S99passwall    → chinadns-ng:15353 + xray（最后起，AGH 的国内外上游）
```

### 5.2 重启后状态（全部通过）

- 进程/端口：`AdGuardHome:53`、`dnsmasq:5353`、`chinadns-ng:15353`、`xray` 全部就位 ✓
- 解析实测：国内/国外/广告拦截/局域网域名全通 ✓
- 按设备识别：`192.168.1.116`、`192.168.1.191`、`192.168.1.228`、`192.168.1.114` 及多个 IPv6 设备各自独立记录 ✓

### 5.3 192.168.1.1 仍有约一半查询 —— 正常，分两类

1. **路由器自身业务**（正常）：`in-addr.arpa` 反查、`cn.ntp.org.cn` 对时、`api.miwifi.com` 等——路由器自己在做网络记账
2. **科学上网代理代解析**（不可避免）：小红书 / `vivo` / `getui` 等域名也记在 192.168.1.1 名下——**走代理的连接由路由器端的 xray 负责解析域名**（和 2.5 同样的原理：代理就是一层"以路由器名义重新查询"的中转），这类流量永远会记在路由器头上，不会显示真实设备

> 结论：**直连流量按设备区分；代理流量归路由器**。这是代理的工作方式，不是故障，无需处理。

---

## 六、回滚方案

备份位置：路由器 `/tmp/agh-backup/`、本地 `.backup/`。

```bash
# 1. 恢复 dnsmasq
uci set dhcp.@dnsmasq[0].port='53'
uci add_list dhcp.@dnsmasq[0].server='192.168.1.1#6060'
uci commit dhcp; /etc/init.d/dnsmasq restart

# 2. 恢复 PassWall
uci set passwall.@global[0].remote_dns='192.168.1.1:6060'
uci set passwall.@global[0].dns_redirect='1'
uci set passwall.@global[0].dnsmasq_dns_redirect='1'
uci commit passwall; /etc/init.d/passwall restart

# 3. 恢复 LuCI 重定向
uci set AdGuardHome.@AdGuardHome[0].redirect='redirect'
uci commit AdGuardHome

# 4. 恢复 AGH yaml 并重启
/etc/init.d/AdGuardHome stop
cp /tmp/agh-backup/AdGuardHome.yaml /etc/AdGuardHome.yaml
/etc/init.d/AdGuardHome start
```

---

## 附录：验证命令速查

```bash
# 解析测试（经 AGH:53）
nslookup www.baidu.com 127.0.0.1        # 国内
nslookup www.google.com 127.0.0.1       # 国外（应无污染）
nslookup doubleclick.net 127.0.0.1      # 广告（应 0.0.0.0）
nslookup ImmortalWrt.lan 127.0.0.1      # 局域网

# 查 AGH 最近客户端 IP 分布（看是否按设备）
tail -c 3000000 /etc/AdGuardHome/data/querylog.json | grep -oE '"IP":"[^"]+"' | sort | uniq -c | sort -rn | head

# 查 192.168.1.1 在查什么域名（区分自身业务 vs 代理代解析）
tail -c 3000000 /etc/AdGuardHome/data/querylog.json | grep '"IP":"192.168.1.1"' | grep -oE '"QH":"[^"]+"' | sort | uniq -c | sort -rn | head -20

# 端口确认（53=AGH、5353=dnsmasq、15353=chinadns-ng、11400=PassWall dnsmasq【劫持关闭后不存在】）
netstat -tlnpu | grep -E ':53 |:5353 |:15353 |:11400 '

# 开机自启确认
ls /etc/rc.d/ | grep -iE 'adguard|dnsmasq|passwall|chinadns'
```