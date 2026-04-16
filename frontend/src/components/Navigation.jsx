import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, LogOut, Settings } from 'lucide-react'

function Navigation({ user, isAdmin, setIsAdmin }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">ES</span>
            </div>
            <span className="text-white font-bold text-xl hidden sm:inline">EventSphere</span>
          </Link>

          <div className="hidden md:flex gap-6">
            <Link to="/" className="text-slate-300 hover:text-sky-400 transition">
              Dashboard
            </Link>
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className="text-slate-300 hover:text-sky-400 transition flex items-center gap-2"
            >
              <Settings size={18} />
              {isAdmin ? 'Exit Admin' : 'Admin'}
            </button>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full"></div>
                <span className="text-slate-300 text-sm hidden sm:inline">{user.name}</span>
              </div>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-300">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-700">
          <div className="px-4 py-4 space-y-2">
            <Link to="/" className="block text-slate-300 hover:text-sky-400 py-2">
              Dashboard
            </Link>
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className="block w-full text-left text-slate-300 hover:text-sky-400 py-2"
            >
              {isAdmin ? 'Exit Admin' : 'Admin Panel'}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation