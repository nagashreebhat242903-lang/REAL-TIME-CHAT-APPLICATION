# Real-Time Chat Application (WebSockets + React)

This project is a full-stack real-time chat application using:
- Backend: Node.js + Express + ws (WebSocket server)
- Frontend: React (Vite) with a responsive UI

Features:
- Real-time messaging via WebSockets
- Join with a display name
- Online users list
- Message history (in-memory on server during runtime)
- Responsive layout for mobile and desktop

## Prerequisites
- Node.js >= 18
- npm >= 9

## Quick Start

In one terminal, start the server:
```
cd server
npm install
npm run dev
```
Server runs at http://localhost:3001 and WebSocket at ws://localhost:3001

In another terminal, start the client:
```
cd client
npm install
npm run dev
```
Client runs at http://localhost:5173

Open the client in multiple browser tabs to simulate multiple users.

## Build for Production

- Build the client:
```
cd client
npm run build
```
- Serve the static client build from the Node server (already configured):
```
cd ../server
npm install
npm run start
```
- Visit: http://localhost:3001

## Project Structure
```
.
├─ server/                # Node.js + Express + ws
│  ├─ package.json
│  ├─ src/
│  │  └─ index.js         # Server entry
│  └─ static/             # Built client will be copied here automatically in prod
└─ client/                # React + Vite
   ├─ package.json
   ├─ index.html
   ├─ vite.config.js
   └─ src/
      ├─ main.jsx
      ├─ App.jsx
      ├─ components/
      │  ├─ ChatWindow.jsx
      │  ├─ MessageInput.jsx
      │  └─ UsersList.jsx
      └─ styles.css
```

## Notes
- The server keeps messages in memory only (resets on restart). Swap the store with a DB for persistence.
- WebSocket protocol path: `/ws`
- Environment variables: You can set PORT (default 3001).
