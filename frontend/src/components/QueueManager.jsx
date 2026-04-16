import React, { useState, useEffect } from 'react'
import { X, Clock, Users, CheckCircle } from 'lucide-react'
import axios from 'axios'

function QueueManager({ event, onClose, user }) {
  const [queueData, setQueueData] = useState(null)
  const [joined, setJoined] = useState(false)
  const [loading, setLoading] = useState(false)

  const estimateWaitTime = () => {
    // Simple estimation: 5 minutes per person
    return Math.max(0, (event.capacity - event.attendees) * 5)
  }

  const handleJoinQueue = async () => {
    setLoading(true)
    try {
      const response = await axios.post(`/api/queue/${event.id}/join`, {
        userId: user?.id
      })
      setQueueData(response.data)
      setJoined(true)
    } catch (error) {
      console.error('Error joining queue:', error)
    } finally {
      setLoading(false)
    }
  }

  const waitTime = estimateWaitTime()

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-8 animate-in">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-white">{event.title}</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        {joined ? (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle size={48} className="mx-auto text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">You're in the Queue!</h3>
              <p className="text-slate-300">Position will be assigned shortly</p>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 space-y-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Estimated Wait Time</p>
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-sky-400" />
                  <span className="text-2xl font-bold text-white">{waitTime} min</span>
                </div>
              </div>

              <div className="h-px bg-slate-700"></div>

              <div>
                <p className="text-slate-400 text-sm mb-1">Queue Position</p>
                <p className="text-2xl font-bold text-sky-400">#42</p>
              </div>

              <div className="h-px bg-slate-700"></div>

              <div>
                <p className="text-slate-400 text-sm mb-2">Event Details</p>
                <div className="space-y-1 text-sm text-slate-300">
                  <p><strong>Location:</strong> {event.location}</p>
                  <p><strong>Time:</strong> {event.time}</p>
                  <p><strong>Capacity:</strong> {event.attendees}/{event.capacity}</p>
                </div>
              </div>
            </div>

            <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-4">
              <p className="text-sky-300 text-sm">
                You'll receive a notification when it's your turn to enter the event.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Got it!
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sky-500/20 rounded-lg flex items-center justify-center">
                  <Users size={24} className="text-sky-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Current Occupancy</p>
                  <p className="text-2xl font-bold text-white">{event.attendees}/{event.capacity}</p>
                </div>
              </div>

              <div className="h-px bg-slate-700"></div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sky-500/20 rounded-lg flex items-center justify-center">
                  <Clock size={24} className="text-sky-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Est. Wait Time</p>
                  <p className="text-2xl font-bold text-white">{waitTime} minutes</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleJoinQueue}
                disabled={loading}
                className="w-full bg-gradient-to-r from-sky-400 to-sky-600 hover:from-sky-500 hover:to-sky-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Joining...' : 'Join Queue'}
              </button>
              <button
                onClick={onClose}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QueueManager