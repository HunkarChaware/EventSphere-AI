import express from 'express'
import Event from '../models/Event.js'

const router = express.Router()

// Create event
router.post('/events', async (req, res) => {
  try {
    const { title, description, location, time, capacity, tags, startDateTime, endDateTime } = req.body

    const event = new Event({
      title,
      description,
      location,
      time,
      capacity,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      startDateTime: startDateTime || new Date(),
      endDateTime: endDateTime || new Date(),
      status: 'upcoming'
    })

    await event.save()
    res.status(201).json(event)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update event
router.put('/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!event) return res.status(404).json({ error: 'Event not found' })
    res.json(event)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete event
router.delete('/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id)
    if (!event) return res.status(404).json({ error: 'Event not found' })
    res.json({ success: true, message: 'Event deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get event statistics
router.get('/stats', async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments()
    const totalAttendees = await Event.aggregate([
      { $group: { _id: null, total: { $sum: '$attendees' } } }
    ])
    const avgCapacity = await Event.aggregate([
      {
        $group: {
          _id: null,
          avg: { $avg: { $divide: ['$attendees', '$capacity'] } }
        }
      }
    ])

    res.json({
      totalEvents,
      totalAttendees: totalAttendees[0]?.total || 0,
      avgCapacity: avgCapacity[0]?.avg || 0
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router