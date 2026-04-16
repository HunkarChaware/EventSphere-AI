import express from 'express'
import Event from '../models/Event.js'
import User from '../models/User.js'

const router = express.Router()

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ startDateTime: 1 })
    res.json(events)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) return res.status(404).json({ error: 'Event not found' })
    res.json(event)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Join event
router.post('/:id/join', async (req, res) => {
  try {
    const { userId } = req.body
    const event = await Event.findById(req.params.id)
    
    if (!event) return res.status(404).json({ error: 'Event not found' })
    if (event.attendees >= event.capacity) {
      return res.status(400).json({ error: 'Event is full' })
    }

    if (!event.registeredUsers.includes(userId)) {
      event.registeredUsers.push(userId)
      event.attendees += 1
      await event.save()

      // Also add to user's events
      await User.findByIdAndUpdate(userId, {
        $push: { eventsJoined: event._id }
      })
    }

    res.json({ success: true, event })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Leave event
router.post('/:id/leave', async (req, res) => {
  try {
    const { userId } = req.body
    const event = await Event.findById(req.params.id)
    
    if (!event) return res.status(404).json({ error: 'Event not found' })

    const index = event.registeredUsers.indexOf(userId)
    if (index > -1) {
      event.registeredUsers.splice(index, 1)
      event.attendees = Math.max(0, event.attendees - 1)
      await event.save()

      await User.findByIdAndUpdate(userId, {
        $pull: { eventsJoined: event._id }
      })
    }

    res.json({ success: true, event })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router