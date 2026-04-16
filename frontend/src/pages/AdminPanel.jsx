import React, { useState } from 'react'
import { Plus, Edit2, Trash2, TrendingUp } from 'lucide-react'
import axios from 'axios'

function AdminPanel() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'AI Workshop',
      location: 'Hall A',
      time: '2:00 PM',
      capacity: 100,
      attendees: 85,
      status: 'live'
    }
  ])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    time: '',
    capacity: '',
    tags: ''
  })

  const handleAddEvent = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/admin/events', formData)
      setEvents([...events, response.data])
      setFormData({ title: '', description: '', location: '', time: '', capacity: '', tags: '' })
      setShowForm(false)
    } catch (error) {
      console.error('Error adding event:', error)
    }
  }

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`/api/admin/events/${id}`)
      setEvents(events.filter(e => e.id !== id))
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
        <p className="text-slate-400">Manage events and monitor analytics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Events</p>
              <p className="text-3xl font-bold text-white">{events.length}</p>
            </div>
            <TrendingUp size={24} className="text-sky-400" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Attendees</p>
              <p className="text-3xl font-bold text-white">
                {events.reduce((sum, e) => sum + e.attendees, 0)}
              </p>
            </div>
            <TrendingUp size={24} className="text-green-400" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm mb-1">Avg. Capacity</p>
              <p className="text-3xl font-bold text-white">
                {Math.round(events.reduce((sum, e) => sum + (e.attendees / e.capacity), 0) / events.length * 100)}%
              </p>
            </div>
            <TrendingUp size={24} className="text-purple-400" />
          </div>
        </div>
      </div>

      {/* Add Event Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-8 bg-gradient-to-r from-sky-400 to-sky-600 hover:from-sky-500 hover:to-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center gap-2"
      >
        <Plus size={20} />
        Add New Event
      </button>

      {/* Add Event Form */}
      {showForm && (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Create New Event</h2>
          <form onSubmit={handleAddEvent} className="space-y-4">
            <input
              type="text"
              placeholder="Event Title"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 h-24 resize-none"
              required
            ></textarea>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="bg-slate-700 text-white placeholder-slate-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
              <input
                type="text"
                placeholder="Time (e.g., 2:00 PM)"
                value={formData.time}
                onChange={e => setFormData({ ...formData, time: e.target.value })}
                className="bg-slate-700 text-white placeholder-slate-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Capacity"
                value={formData.capacity}
                onChange={e => setFormData({ ...formData, capacity: e.target.value })}
                className="bg-slate-700 text-white placeholder-slate-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
              <input
                type="text"
                placeholder="Tags (comma-separated)"
                value={formData.tags}
                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                className="bg-slate-700 text-white placeholder-slate-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-lg transition"
              >
                Create Event
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Events Table */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-900 border-b border-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Event</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Location</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Time</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Attendees</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {events.map(event => (
              <tr key={event.id} className="hover:bg-slate-800/50 transition">
                <td className="px-6 py-4 text-white font-medium">{event.title}</td>
                <td className="px-6 py-4 text-slate-300">{event.location}</td>
                <td className="px-6 py-4 text-slate-300">{event.time}</td>
                <td className="px-6 py-4 text-slate-300">{event.attendees}/{event.capacity}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    event.status === 'live'
                      ? 'bg-green-500/20 text-green-400'
                      : event.status === 'upcoming'
                        ? 'bg-sky-500/20 text-sky-400'
                        : 'bg-slate-700 text-slate-300'
                  }`}>
                    {event.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="p-2 hover:bg-slate-700 rounded transition">
                    <Edit2 size={18} className="text-slate-300" />
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="p-2 hover:bg-red-500/20 rounded transition"
                  >
                    <Trash2 size={18} className="text-red-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPanel   