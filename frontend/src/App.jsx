import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import AdminPanel from './pages/AdminPanel'
import Chatbot from './components/Chatbot'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Simulate user login
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      interests: ['Tech', 'AI', 'Networking']
    }
    setUser(mockUser)
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Navigation user={user} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/admin" element={isAdmin ? <AdminPanel /> : <Dashboard user={user} />} />
        </Routes>
        <Chatbot user={user} />
      </div>
    </Router>
  )
}

export default App