import React from 'react'
import { MapPin, Clock, Users, TrendingUp } from 'lucide-react'

function EventCard({ event, onJoin, onQueueClick }) {
  const isLive = event.status === 'live'
  const isFull = event.attendees >= event.capacity

  return (
    <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 hover:border-sky-400/50 transition-all duration-300 overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10">
        {/* Status Badge */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                isLive
                  ? 'bg-green-500/20 text-green-400'
                  : event.status === 'upcoming'
                    ? 'bg-sky-500/20 text-sky-400'
                    : 'bg-slate-700 text-slate-300'
              }`}
            >
              {event.status.toUpperCase()}
            </span>
          </div>
          {isLive && (
            <div className="flex items-center gap-1">
              <TrendingUp size={16} className="text-green-400" />
              <span className="text-xs text-green-400 font-semibold">Trending</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-400 transition">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-300 mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Details */}
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2 text-slate-300">
            <Clock size={16} className="text-sky-400" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin size={16} className="text-sky-400" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Users size={16} className="text-sky-400" />
            <span>{event.attendees}/{event.capacity}</span>
          </div>
        </div>

        {/* Capacity Bar */}
        <div className="mb-4">
          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all ${
                event.attendees / event.capacity > 0.8
                  ? 'bg-red-500'
                  : 'bg-gradient-to-r from-sky-400 to-sky-500'
              }`}
              style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {Math.round((event.attendees / event.capacity) * 100)}% Capacity
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.map(tag => (
            <span key={tag} className="px-2 py-1 text-xs bg-sky-500/20 text-sky-300 rounded-lg">
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onJoin}
            disabled={isFull && !event.hasJoined}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              event.hasJoined
                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                : isFull
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-sky-500 text-white hover:bg-sky-600'
            }`}
          >
            {event.hasJoined ? '✓ Joined' : isFull ? 'Full' : 'Join Event'}
          </button>
          <button
            onClick={onQueueClick}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition"
          >
            Queue
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventCard