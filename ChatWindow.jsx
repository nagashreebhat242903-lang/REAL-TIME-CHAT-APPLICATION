import React, { useEffect, useRef } from 'react'

export default function ChatWindow({ messages, selfId }) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="chat-window" ref={ref}>
      {messages.map(m => (
        <Message key={m.id} msg={m} isSelf={m.userId === selfId} />
      ))}
    </div>
  )
}

function Message({ msg, isSelf }) {
  const time = new Date(msg.timestamp)
  const t = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return (
    <div className={`msg ${isSelf ? 'self' : ''}`}>
      <div className="meta">
        <span className="name">{msg.userName}</span>
        <span className="time">{t}</span>
      </div>
      <div className="text">{msg.text}</div>
    </div>
  )
}
