import React, { useEffect, useMemo, useRef, useState } from 'react'
import ChatWindow from './components/ChatWindow'
import MessageInput from './components/MessageInput'
import UsersList from './components/UsersList'

const WS_URL = `ws://${location.hostname}:3001/ws`
const API_URL = `http://${location.hostname}:3001/api`

export default function App() {
  const [ws, setWs] = useState(null)
  const [self, setSelf] = useState({ userId: null, userName: '' })
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])

  useEffect(() => {
    fetch(`${API_URL}/history`).then(r => r.json()).then(data => setMessages(data)).catch(()=>{})

    const socket = new WebSocket(WS_URL)
    socket.onopen = () => console.log('WS connected')
    socket.onclose = () => console.log('WS closed')
    socket.onmessage = (ev) => {
      const { type, payload } = JSON.parse(ev.data)
      if (type === 'welcome') {
        setSelf(payload)
      } else if (type === 'history') {
        setMessages(payload)
      } else if (type === 'users') {
        setUsers(payload)
      } else if (type === 'message') {
        setMessages(prev => [...prev, payload])
      }
    }
    setWs(socket)
    return () => socket.close()
  }, [])

  const send = useMemo(() => (type, payload) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type, payload }))
    }
  }, [ws])

  const handleSetName = (name) => send('setName', { name })
  const handleSendMessage = (text) => send('message', { text })

  return (
    <div className="app">
      <header className="app-header">
        <h1>Real-Time Chat</h1>
        <NameEditor current={self.userName} onSubmit={handleSetName} />
      </header>
      <main className="app-main">
        <aside className="sidebar">
          <UsersList users={users} selfId={self.userId} />
        </aside>
        <section className="content">
          <ChatWindow messages={messages} selfId={self.userId} />
          <MessageInput onSend={handleSendMessage} />
        </section>
      </main>
      <footer className="app-footer">WebSocket: {WS_URL}</footer>
    </div>
  )
}

function NameEditor({ current, onSubmit }) {
  const [name, setName] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (current && !name) setName(current)
  }, [current])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (trimmed) onSubmit(trimmed)
  }

  return (
    <form className="name-editor" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your display name"
        maxLength={32}
      />
      <button type="submit">Set</button>
    </form>
  )
}
