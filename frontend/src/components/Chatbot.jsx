import React, { useState } from 'react'
import { Send } from 'lucide-react'

export default function Chatbot() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }])
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'Thanks for your message!', sender: 'ai' }])
      }, 500)
      setInput('')
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-slate-800 rounded-lg shadow-lg w-80 h-96 flex flex-col">
          <div className="bg-slate-700 p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="text-white font-bold">EventSphere Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-white">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-3 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-100'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-700 p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e

- ✅ YES - Create PR with all files
- ❌ NO - I'll manually tell you each file

---

# 🔥 FASTEST SOLUTION:

**Let me create a PR that adds:**
- ✅ `App.jsx` (main app component)
- ✅ `main.jsx` (entry point)
- ✅ `index.css` (styling)
- ✅ `Chatbot.jsx` (chat component)
- ✅ `Dashboard.jsx` (dashboard page)
- ✅ `AdminPanel.jsx` (admin page)
- ✅ `Navigation.jsx` (nav bar)
- ✅ `EventCard.jsx` (event card component)
- ✅ `QueueManager.jsx` (queue component)

---

**Should I create the PR and add all these files? YES or NO?** 🚀

If you say YES, I'll have everything done in 2 minutes! ✅