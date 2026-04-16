import express from 'express'
import axios from 'axios'
import Event from '../models/Event.js'

const router = express.Router()

// Initialize Gemini API
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

// Ask chatbot
router.post('/ask', async (req, res) => {
  try {
    const { message, userId, context } = req.body

    // Get event data for context
    const events = await Event.find()
    const eventContext = events.map(e => `${e.title} at ${e.location}, ${e.time}`).join('\n')

    // Prepare Gemini prompt
    const systemPrompt = `You are EventSphere AI, a helpful assistant for physical events. 
You help users with:
- Finding events and their details (location, time, capacity)
- Answering questions about ongoing events
- Providing recommendations
- Queue management information

Current Events:
${eventContext}

Be concise and helpful. Always provide accurate information about events.`

    const response = await axios.post(GEMINI_API_URL, {
      contents: [{
        parts: [{
          text: systemPrompt + '\n\nUser: ' + message
        }]
      }]
    }, {
      params: { key: GEMINI_API_KEY }
    })

    const reply = response.data.candidates[0].content.parts[0].text

    res.json({ reply })
  } catch (error) {
    console.error('Chatbot Error:', error)
    
    // Fallback response
    const fallbackReplies = {
      'where': 'The event details are available in the dashboard. Check the location information for each event.',
      'time': 'Event times are displayed in the dashboard. Check the specific event card for timing.',
      'capacity': 'Capacity information is shown on each event card with real-time attendance numbers.',
      'recommend': 'Check events that match your interests! Your personalized recommendations are shown on the dashboard.',
      'queue': 'You can join the queue for any event using the queue button. Wait times are estimated based on current capacity.'
    }

    let reply = 'I\'m here to help! Ask me about events, locations, times, or queue information.'
    
    for (const [keyword, answer] of Object.entries(fallbackReplies)) {
      if (message.toLowerCase().includes(keyword)) {
        reply = answer
        break
      }
    }

    res.json({ reply })
  }
})

export default router