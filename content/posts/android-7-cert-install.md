---
date: "2026-05-06"
type: "Post"
tags:
  - "教程"
  - "Android"
  - "抓包"
  - "Charles"
  - "HTTPS"
title: "Android 7.0+ HTTPS抓包：系统级证书安装完整指南"
description: "Android 7.0+ 不再信任用户证书导致 HTTPS 抓包失败，本文整理从证书转换、ADB 推送到系统目录的完整流程，覆盖 Root/Magisk/证书哈希计算和常见排错。"
categories:
  - "教程"
image: "https://bing.ee123.net/img/rand?seed=android-7-cert-install"
---

[//]: # (notion-sync-id: 358874cb-3972-81da-92e8-cfa0358f347c)

Android 7.0 开始，系统不再默认信任用户安装的 CA 证书，导致 Charles、Fiddler 等抓包工具无法正常拦截 HTTPS 流量。这个问题困扰了不少开发者和测试同学，网上方案零散且容易踩坑。这里整理一套从零到可用的完整流程，覆盖证书转换、ADB 导入和常见排错。

---

## 前置条件与工具

开始之前需要准备好以下几样东西：

| Header | Header | Header | 
| --- | --- | --- | 
> _(表格内容通过子行渲染)_

> ⚠️ Root 是必须的。没有 Root 权限无法写入 `/system` 分区，后续所有步骤都无法执行。

---

## 证书安装详细步骤（Android 7.0+）

### 1. 导出/下载证书

在手机浏览器中访问抓包工具提供的证书下载地址：

- **Charles**：访问 `chls.pro/ssl`
- **Fiddler**：访问 `http://ipv4.fiddler:8888`
下载后通常得到 `.cer` 或 `.pem` 格式的证书文件。

### 2. 将证书转换为 PEM 格式

如果下载的是 `.cer` 格式，建议先转为 `.pem`，方便后续计算哈希值。可以用 OpenSSL 命令转换：

```bash
openssl x509 -inform DER -in certificate.cer -out certificate.pem
```

### 3. 计算证书哈希值

Android 系统通过哈希文件名来识别系统证书。使用 OpenSSL 计算：

```bash
openssl x509 -inform PEM -subject_hash_old -in <证书文件名>.pem
```

执行后会输出一个 8 位十六进制字符串，例如 `e5c3e449`。这个值就是证书的哈希名。

### 4. 重命名证书文件

将证书文件重命名为 `<哈希值>.0` 的格式：

```bash
# 例如哈希值为 e5c3e449
cp certificate.pem e5c3e449.0
```

### 5. 将证书导入系统根目录

通过 ADB 将重命名后的证书推送到系统证书目录：

```bash
adb root
adb remount
adb push e5c3e449.0 /sdcard/
adb shell "mv /sdcard/e5c3e449.0 /system/etc/security/cacerts/"
adb shell "chmod 644 /system/etc/security/cacerts/e5c3e449.0"
adb reboot
```

> 💡 对于 Android 14 及以上版本，证书路径可能需要改为 `/apex/com.android.conscrypt/cacerts/`，具体取决于系统版本。

### 6. 验证证书

手机重启后，进入 **设置 → 安全 → 受信任的凭据**，在「系统」标签页中能看到 Charles 或 Fiddler 的证书就说明安装成功了。

---

## 常见问题排查

### 应用抓不到包

即使证书安装成功，部分应用仍然无法抓包。这是因为 Android 7.0+ 的应用默认不信任用户子证书。常见解决方案：

- 修改应用的 `network_security_config.xml`，添加信任用户证书的配置
- 使用 Xposed 模块 **JustTrustMe** 绕过 SSL Pinning
- 使用 Magisk 模块 **TrustMeAlready** 全局绕过证书校验
### 无法挂载 System 分区

执行 `adb remount` 失败时，检查以下几点：

- 确保使用 Magisk 进行 Root（不是 SuperSU）
- 在 Magisk 中开启「System-as-Root」或「Magic Mount」
- 部分机型需要先解锁 Bootloader
### 重启后证书消失

某些 ROM 在 OTA 更新或重启后会重置 System 分区。可以使用 Magisk 模块「BusyBox for Android NDK」配合脚本实现开机自动导入证书。

---

## 完整流程速查

把整个流程浓缩成一张速查表：

| Header | Header | 
| --- | --- | 
> _(表格内容通过子行渲染)_

---

整个过程并不复杂，核心就是把证书从「用户信任」提升到「系统信任」级别。搞定之后 Charles 和 Fiddler 都能正常抓 HTTPS 包，开发调试效率直接拉满。


