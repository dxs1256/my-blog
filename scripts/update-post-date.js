/**
 * Author: adou | alivedou@outlook.com
 * 该脚本用于自动更新 Markdown 文章中的 date 和 updated 字段。
 * 第一次保存时自动初始化 date 和 updated。
 * 后续修改时仅自动更新 updated。
 */
import fs from 'fs';
import path from 'path';

// 获取传入的文件路径
const filePath = process.argv[2];

if (!filePath) {
  process.exit(1);
}

let absolutePath = filePath;

// Windows+WSL 跨环境兼容路径解析：
// 如果在 Linux/WSL 下运行，但接收到了 Windows 格式的绝对路径（如 E:\... 或 e:\...）
if (process.platform !== 'win32') {
  const winDriveMatch = filePath.match(/^([a-zA-Z]):\\(.*)$/);
  if (winDriveMatch) {
    const drive = winDriveMatch[1].toLowerCase();
    const rest = winDriveMatch[2].replace(/\\/g, '/');
    absolutePath = `/mnt/${drive}/${rest}`;
  } else {
    const winDriveSlashMatch = filePath.match(/^([a-zA-Z]):\/(.*)$/);
    if (winDriveSlashMatch) {
      const drive = winDriveSlashMatch[1].toLowerCase();
      const rest = winDriveSlashMatch[2];
      absolutePath = `/mnt/${drive}/${rest}`;
    } else {
      absolutePath = path.resolve(filePath);
    }
  }
} else {
  absolutePath = path.resolve(filePath);
}

absolutePath = absolutePath.replace(/\\/g, '/');

// 只处理 content/posts 文件夹下的 markdown 文件
if (!absolutePath.includes('/content/posts/') || !absolutePath.endsWith('.md')) {
  process.exit(0);
}

try {
  let content = fs.readFileSync(absolutePath, 'utf-8');
  
  // 按行分割
  const lines = content.split(/\r?\n/);
  // 只检测前 15 行
  const scanLimit = Math.min(lines.length, 15);
  
  // 定位 date 和 updated 在前 15 行中的行号和对应的值
  let dateIndex = -1;
  let updatedIndex = -1;
  let dateValue = '';
  let updatedValue = '';

  for (let i = 0; i < scanLimit; i++) {
    const line = lines[i];
    const dateMatch = line.match(/^date:\s*["']?(.*?)["']?\s*$/);
    const updatedMatch = line.match(/^updated:\s*["']?(.*?)["']?\s*$/);
    
    if (dateMatch) {
      dateIndex = i;
      dateValue = dateMatch[1].trim();
    }
    if (updatedMatch) {
      updatedIndex = i;
      updatedValue = updatedMatch[1].trim();
    }
  }

  // 获取本地当前日期 (YYYY-MM-DD 格式)
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const dateStr = String(now.getDate()).padStart(2, '0');
  const today = `${year}-${month}-${dateStr}`;

  let hasChanged = false;

  // 1. 判断是否为第一次保存：date 未设置，或者为空值
  const isFirstSave = dateIndex === -1 || dateValue === "" || dateValue === "null" || dateValue === "undefined";

  if (isFirstSave) {
    // 第一次保存：更新 date 为当前日期
    if (dateIndex !== -1) {
      lines[dateIndex] = `date: "${today}"`;
      hasChanged = true;
    }
    // 第一次保存时，顺便把 updated 也更新为当前日期
    if (updatedIndex !== -1) {
      lines[updatedIndex] = `updated: "${today}"`;
      hasChanged = true;
    }
  } else {
    // 2. 后续修改：仅更新 updated 为当前日期
    if (updatedIndex !== -1) {
      if (updatedValue !== today) {
        lines[updatedIndex] = `updated: "${today}"`;
        hasChanged = true;
      }
    } else {
      // 如果没有 updated 字段但有 date 字段，在 date 字段下方插入 updated 字段
      if (dateIndex !== -1) {
        lines.splice(dateIndex + 1, 0, `updated: "${today}"`);
        hasChanged = true;
      }
    }
  }

  if (hasChanged) {
    fs.writeFileSync(absolutePath, lines.join('\n'), 'utf-8');
    console.log(`[CyberLog] 成功更新日期。第一次保存: ${isFirstSave}, 写入日期: ${today}`);
  }
} catch (error) {
  console.error(`[CyberLog] 自动更新日期失败: ${error.message}`);
}
