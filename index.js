import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// In-memory store
const clients = new Map(); // ws -> { id, name }
let nextClientId = 1;
const messages = []; // { id, userId, userName, text, timestamp }
let nextMessageId = 1;

// REST endpoint to fetch history
app.get('/api/history', (req, res) => {
  res.json(messages.slice(-100)); // last 100 messages
});

// Serve static client in production (if present)
const staticDir = path.resolve(__dirname, '../static');
app.use(express.static(staticDir));
app.get('/', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

function broadcast(data) {
  const msg = JSON.stringify(data);
  for (const ws of wss.clients) {
    if (ws.readyState === ws.OPEN) {
      ws.send(msg);
    }
  }
}

wss.on('connection', (ws) => {
  const userId = nextClientId++;
  let userName = `User-${userId}`;
  clients.set(ws, { id: userId, name: userName });

  // Send initial state
  ws.send(JSON.stringify({ type: 'welcome', payload: { userId, userName } }));
  ws.send(JSON.stringify({ type: 'history', payload: messages.slice(-100) }));

  // Notify others user joined
  broadcast({ type: 'users', payload: getUsers() });

  ws.on('message', (raw) => {
    try {
      const { type, payload } = JSON.parse(raw.toString());
      if (type === 'setName') {
        userName = String(payload?.name || userName).slice(0, 32);
        const meta = clients.get(ws);
        if (meta) meta.name = userName;
        broadcast({ type: 'users', payload: getUsers() });
      } else if (type === 'message') {
        const text = String(payload?.text || '').trim().slice(0, 500);
        if (!text) return;
        const message = {
          id: nextMessageId++,
          userId,
          userName,
          text,
          timestamp: Date.now()
        };
        messages.push(message);
        broadcast({ type: 'message', payload: message });
      }
    } catch (e) {
      console.error('Invalid message', e);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    broadcast({ type: 'users', payload: getUsers() });
  });
});

function getUsers() {
  return Array.from(clients.values()).map(({ id, name }) => ({ id, name }));
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`HTTP server listening on http://localhost:${PORT}`);
  console.log(`WebSocket server at ws://localhost:${PORT}/ws`);
});
