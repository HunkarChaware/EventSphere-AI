import mongoose from 'mongoose'
import Event from '../models/Event.js'
import User from '../models/User.js'
import dotenv from 'dotenv'

dotenv.config()

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eventsphere')
    
    // Clear existing data
    await Event.deleteMany({})
    await User.deleteMany({})

    // Create sample events
    const events = [
      {
        title: 'AI & Machine Learning Workshop',
        description: 'Deep dive into cutting-edge AI technologies and practical implementations',
        location: 'Hall A',
        time: '2:00 PM - 4:00 PM',
        startDateTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
        endDateTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
        capacity: 100,
        attendees: 85,
        status: 'live',
        tags: ['AI', 'Tech', 'Workshop']
      },
      {
        title: 'Networking Mixer',
        description: 'Meet fellow developers, entrepreneurs, and innovators',
        location: 'Main Hall',
        time: '5:00 PM - 6:30 PM',
        startDateTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
        endDateTime: new Date(Date.now() + 6.5 * 60 * 60 * 1000),
        capacity: 200,
        attendees: 120,
        status: 'upcoming',
        tags: ['Networking', 'Social']
      },
      {
        title: 'Web Development Bootcamp',
        description: 'Master modern web technologies including React, Node.js, and more',
        location: 'Hall B',
        time: '10:00 AM - 12:30 PM',
        startDateTime: new Date(Date.now() + 1 * 60 * 60 * 1000),
        endDateTime: new Date(Date.now() + 3.5 * 60 * 60 * 1000),
        capacity: 80,
        attendees: 80,
        status: 'live',
        tags: ['Web Dev', 'Bootcamp']
      },
      {
        title: 'Hackathon Finals',
        description: 'Watch the best projects battle it out for the top prize',
        location: 'Main Arena',
        time: '7:00 PM - 9:00 PM',
        startDateTime: new Date(Date.now() + 7 * 60 * 60 * 1000),
        endDateTime: new Date(Date.now() + 9 * 60 * 60 * 1000),
        capacity: 300,
        attendees: 250,
        status: 'upcoming',
        tags: ['Hackathon', 'Competition']
      }
    ]

    const createdEvents = await Event.insertMany(events)

    // Create sample users
    const users = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        interests: ['AI', 'Web Dev', 'Tech'],
        isAdmin: true
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        interests: ['Web Dev', 'Networking'],
        isAdmin: false
      }
    ]

    await User.insertMany(users)

    console.log('✅ Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()