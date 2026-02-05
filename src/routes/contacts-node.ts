import { Router } from 'express'
import { db, Contact } from '../database'

const router = Router()

// Получить все сообщения
router.get('/', (req, res) => {
  try {
    const contacts = db.prepare(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    ).all()
    
    res.json({ success: true, data: contacts })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    res.status(500).json({ success: false, error: 'Database error' })
  }
})

// Создать новое сообщение
router.post('/', (req, res) => {
  try {
    const { name, email, message } = req.body

    // Валидация
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Required fields: name, email, message' 
      })
    }

    // Простая валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid email format' 
      })
    }

    const stmt = db.prepare('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)')
    const result = stmt.run(name, email, message)

    res.status(201).json({ 
      success: true, 
      data: { id: result.lastInsertRowid }
    })
  } catch (error) {
    console.error('Error creating contact:', error)
    res.status(500).json({ success: false, error: 'Failed to send message' })
  }
})

export default router
