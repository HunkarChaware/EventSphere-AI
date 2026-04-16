import express from 'express'
import Queue from '../models/Queue.js'
import Event from '../models/Event.js'

const router = express.Router()

// Join queue
router.post('/:eventId/join', async (req, res) => {
  try {
    const { userId } = req.body
    const { eventId } = req.params

    // Check if already in queue
    const existingQueueEntry = await Queue.findOne({ eventId, userId })
    if (existingQueueEntry) {
      return res.json({ 
        position: existingQueueEntry.position,
        estimatedWaitTime: existingQueueEntry.estimatedWaitTime
      })
    }

    // Get total queue length
    const queueLength = await Queue.countDocuments({ eventId, status: 'waiting' })
    const position = queueLength + 1

    // Calculate estimated wait time (5 minutes per person)
    const estimatedWaitTime = position * 5

    const queueEntry = new Queue({
      eventId,
      userId,
      position,
      estimatedWaitTime
    })

    await queueEntry.save()

    res.json({
      success: true,
      position,
      estimatedWaitTime,
      message: `You are #${position} in the queue`
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get queue status
router.get('/:eventId/status/:userId', async (req, res) => {
  try {
    const { eventId, userId } = req.params
    
    const queueEntry = await Queue.findOne({ eventId, userId })
    if (!queueEntry) {
      return res.status(404).json({ error: 'Not in queue' })
    }

    res.json({
      position: queueEntry.position,
      status: queueEntry.status,
      estimatedWaitTime: queueEntry.estimatedWaitTime
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update queue status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    const queueEntry = await Queue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    res.json(queueEntry)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router