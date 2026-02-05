import { Router } from 'express'
import { db, Request as RequestModel } from '../database'

const router = Router()

// Получить все заявки
router.get('/', (req, res) => {
  try {
    const requests = db.prepare(
      'SELECT * FROM requests ORDER BY created_at DESC'
    ).all()
    
    res.json({ success: true, data: requests })
  } catch (error) {
    console.error('Error fetching requests:', error)
    res.status(500).json({ success: false, error: 'Database error' })
  }
})

// Создать новую заявку
router.post('/', (req, res) => {
  try {
    const { name, email, phone, telegram, project_type, budget, description } = req.body

    // Валидация
    if (!name || !email || !project_type || !description) {
      return res.status(400).json({ 
        success: false, 
        error: 'Required fields: name, email, project_type, description' 
      })
    }

    const stmt = db.prepare(`
      INSERT INTO requests (name, email, phone, telegram, project_type, budget, description, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'new')
    `)
    
    const result = stmt.run(name, email, phone, telegram, project_type, budget, description)

    res.status(201).json({ 
      success: true, 
      data: { id: result.lastInsertRowid }
    })
  } catch (error) {
    console.error('Error creating request:', error)
    res.status(500).json({ success: false, error: 'Failed to create request' })
  }
})

// Получить заявку по ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params
    const request = db.prepare('SELECT * FROM requests WHERE id = ?').get(id)

    if (!request) {
      return res.status(404).json({ success: false, error: 'Request not found' })
    }

    res.json({ success: true, data: request })
  } catch (error) {
    console.error('Error fetching request:', error)
    res.status(500).json({ success: false, error: 'Database error' })
  }
})

// Обновить статус заявки
router.patch('/:id/status', (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!['new', 'processing', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' })
    }

    const stmt = db.prepare('UPDATE requests SET status = ? WHERE id = ?')
    stmt.run(status, id)

    res.json({ success: true })
  } catch (error) {
    console.error('Error updating status:', error)
    res.status(500).json({ success: false, error: 'Failed to update status' })
  }
})

export default router
