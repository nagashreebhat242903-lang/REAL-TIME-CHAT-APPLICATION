import React from 'react'

export default function UsersList({ users, selfId }) {
  return (
    <div className="users-list">
      <h3>Online ({users.length})</h3>
      <ul>
        {users.map(u => (
          <li key={u.id} className={u.id === selfId ? 'self' : ''}>
            <span className="dot" />
            <span className="name">{u.name}</span>
            {u.id === selfId && <span className="badge">you</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}
