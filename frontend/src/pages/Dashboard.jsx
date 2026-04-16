import React, { useState, useEffect } from 'react'
import { Search, Filter, Calendar } from 'lucide-react'
import EventCard from '../components/EventCard'
import QueueManager from '../components/QueueManager'
import axios from 'axios'

function Dashboard({ user }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedEventQueue, setSelectedEventQueue] = useState(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events')
      setEvents(response.data)
    } catch (error) {
      console.error('Error fetching events:', error)
      // Use sample data
      setSampleEvents()
    } finally {
      setLoading(false)
    }
  }

  const setSampleEvents = () => {
    setEvents([
      {
        id: 1,
        title: 'AI & Machine Learning Workshop',
        description: 'Deep dive into cutting-edge AI technologies and practical implementations',
        time: '2:00 PM - 4:00 PM',
        location: 'Hall A',
        capacity: 100,
        attendees: 85,
        status: 'live',
        tags: ['AI', 'Tech', 'Workshop'],
        hasJoined: true
      },
      {
        id: 2,
        title: 'Networking Mixer',
        description: 'Meet fellow developers, entrepreneurs, and innovators',
        time: '5:00 PM - 6:30 PM',
        location: 'Main Hall',
        capacity: 200,
        attendees: 120,
        status: 'upcoming',
        tags: ['Networking', 'Social'],
        hasJoined: false
      },
      {
        id: 3,
        title: 'Web Development Bootcamp',
        description: 'Master modern web technologies including React, Node.js, and more',
        time: '10:00 AM - 12:30 PM',
        location: 'Hall B',
        capacity: 80,
        attendees: 80,
        status: 'live',
        tags: ['Web Dev', 'Bootcamp'],
        hasJoined: false
      },
      {
        id: 4,
        title: 'Cloud Architecture Talk',
        description: 'Learn about scalable cloud solutions and best practices',
        time: '12:00 PM - 1:00 PM',
        location: 'Theater',
        capacity: 150,
        attendees: 95,
        status: 'past',
        tags: ['Cloud', 'Talk'],
        hasJoined: true
      },
      {
        id: 5,
        title: 'Hackathon Finals',
        description: 'Watch the best projects battle it out for the top prize',
        time: '7:00 PM - 9:00 PM',
        location: 'Main Arena',
        capacity: 300,
        attendees: 250,
        status: 'upcoming',
        tags: ['Hackathon', 'Competition'],
        hasJoined: true
      },
      {
        id: 6,
        title: 'Startup Pitch Session',
        description: 'Innovative startups pitch their ideas to investors',
        time: '3:00 PM - 4:00 PM',
        location: 'Conference Room',
        capacity: 60,
        attendees: 40,
        status: 'upcoming',
        tags: ['Startup', 'Pitch'],
        hasJoined: false
      }
    ])
  }

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || event.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleJoinEvent = async (eventId) => {
    try {
      const response = await axios.post(`/api/events/${eventId}/join`, {
        userId: user?.id
      })
      setEvents(events.map(e => e.id === eventId ? { ...e, hasJoined: true, attendees: e.attendees + 1 } : e))
    } catch (error) {
      console.error('Error joining event:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-slate-700 border-t-sky-400 rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Live Event Dashboard</h1>
        <p className="text-slate-400">Discover and join amazing events happening today</p>
      </div>

      {/* Search & Filter */}
      <div className="mb-8 space-y-4 md:flex gap-4">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search events..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <div className="flex gap-2">
          {['all', 'live', 'upcoming', 'past'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filterStatus === status
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredEvents.map(event => (
          <EventCard
            key={event.id}
            event={event}
            onJoin={() => handleJoinEvent(event.id)}
            onQueueClick={() => setSelectedEventQueue(event)}
          />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar size={48} className="mx-auto text-slate-600 mb-4" />
          <p className="text-slate-400 text-lg">No events found</p>
        </div>
      )}

      {/* Queue Manager Modal */}
      {selectedEventQueue && (
        <QueueManager
          event={selectedEventQueue}
          onClose={() => setSelectedEventQueue(null)}
          user={user}
        />
      )}
    </div>
  )
}

export default Dashboard