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


Candidate Name: Nagashree bhat

Selected For: Frontend Web Development

Organization: Codtech IT Solutions Private Limited

Duration: 4 Weeks

Internship Period: 08 February 2026-08 March 2026

Intern ID: CTIS5403

discretion: Real-Time Chat Application focuses on building a responsive chat app using WebSockets and a modern front-end framework like React.js or Vue.js. The application enables real-time messaging between users and includes message history for seamless communication. A completion certificate will be issued at the end of the internship.

output:
