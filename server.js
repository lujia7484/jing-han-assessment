/**
 * 先天气质评估 — 测试记录收集服务器
 *
 * 用法: node server.js
 * 页面: http://localhost:3000
 * 下载全部记录: http://localhost:3000/api/records
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;
const RECORDS_FILE = path.join(ROOT, 'records.csv');
const BOM = '﻿';
const HEADER = '序号,测试时间,孩子昵称,年龄,性别,气质类型,精娃%,憨娃%,倔娃%,精娃项数,憨娃项数,倔娃项数,总勾选数\n';

// 如果 CSV 文件不存在，写入 BOM + 表头；如果存在但缺 BOM，补上
if (!fs.existsSync(RECORDS_FILE)) {
  fs.writeFileSync(RECORDS_FILE, BOM + HEADER, 'utf-8');
} else {
  var head = fs.readFileSync(RECORDS_FILE, 'utf-8');
  if (!head.startsWith(BOM)) {
    fs.writeFileSync(RECORDS_FILE, BOM + head, 'utf-8');
  }
}

// MIME 类型
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.json': 'application/json',
};

function serveStatic(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

function parseBody(req, cb) {
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    try { cb(null, JSON.parse(body)); }
    catch (e) { cb(e); }
  });
}

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // POST /api/save — 保存一条测试记录
  if (req.method === 'POST' && req.url === '/api/save') {
    parseBody(req, (err, data) => {
      if (err) {
        res.writeHead(400);
        return res.end(JSON.stringify({ ok: false, msg: '数据格式错误' }));
      }

      // 读取现有记录数来生成序号
      const existing = fs.readFileSync(RECORDS_FILE, 'utf-8');
      const lineCount = existing.split('\n').filter(l => l.trim()).length; // 含表头
      const seq = lineCount; // 表头占1行，所以第一条从1开始

      const row = [
        seq,
        data.time || new Date().toLocaleString('zh-CN'),
        data.name   || '未填写',
        data.age    || '未填写',
        data.gender || '未填写',
        data.type   || '',
        data.jingPct != null ? data.jingPct + '%' : '',
        data.hanPct  != null ? data.hanPct  + '%' : '',
        data.juePct  != null ? data.juePct  + '%' : '',
        data.jingN   != null ? data.jingN : '',
        data.hanN    != null ? data.hanN  : '',
        data.jueN    != null ? data.jueN  : '',
        data.total   != null ? data.total : '',
      ].join(',');

      fs.appendFileSync(RECORDS_FILE, row + '\n', 'utf-8');
      console.log(`[保存] ${data.name} | ${data.age} | ${data.gender} | ${data.type}`);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    });
    return;
  }

  // GET /api/records — 下载全部 CSV 记录
  if (req.method === 'GET' && req.url === '/api/records') {
    res.writeHead(200, {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="records.csv"',
    });
    fs.createReadStream(RECORDS_FILE).pipe(res);
    return;
  }

  // 静态文件
  let filePath = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  filePath = path.join(ROOT, filePath);

  // 安全检查：防止目录穿越
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  serveStatic(res, filePath);
});

server.listen(PORT, () => {
  console.log(`\n  🧒 先天气质评估服务已启动`);
  console.log(`  页面:    http://localhost:${PORT}`);
  console.log(`  下载CSV: http://localhost:${PORT}/api/records`);
  console.log(`  记录文件: ${RECORDS_FILE}\n`);
});
