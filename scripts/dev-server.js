import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number.parseInt(process.env.PORT ?? '3000', 10);
const ROOT = path.resolve(__dirname, '../pwa');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml'
};

function resolvePath(requestPath) {
  const cleanPath = decodeURIComponent(requestPath.split('?')[0]);
  let target = path.join(ROOT, cleanPath);

  if (cleanPath.endsWith('/')) {
    target = path.join(target, 'index.html');
  }

  if (!target.startsWith(ROOT)) {
    return null;
  }

  return target;
}

async function serveFile(res, filePath) {
  const extension = path.extname(filePath);
  const mimeType = MIME_TYPES[extension] ?? 'application/octet-stream';

  try {
    const data = await fs.readFile(filePath);
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
    } else {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Internal server error');
    }
  }
}

const server = http.createServer(async (req, res) => {
  const filePath = resolvePath(req.url ?? '/');

  if (!filePath) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  let stats;
  try {
    stats = await fs.stat(filePath);
  } catch (error) {
    if (error.code === 'ENOENT' && !filePath.endsWith('index.html')) {
      const fallback = `${filePath}/index.html`;
      try {
        await fs.access(fallback);
        await serveFile(res, fallback);
        return;
      } catch (fallbackError) {
        if (fallbackError.code !== 'ENOENT') {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('Internal server error');
          return;
        }
      }
    }

    if (error.code === 'ENOENT' && filePath.endsWith('index.html')) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Internal server error');
    return;
  }

  if (stats.isDirectory()) {
    await serveFile(res, path.join(filePath, 'index.html'));
  } else {
    await serveFile(res, filePath);
  }
});

server.listen(PORT, () => {
  console.log(`Simple Counter PWA running at http://localhost:${PORT}`);
});
