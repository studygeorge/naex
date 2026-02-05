import { Hono } from 'hono'
import type { Context } from 'hono'

type Bindings = {
  DB: D1Database
}

const contacts = new Hono<{ Bindings: Bindings }>()

// Получить все сообщения
contacts.get('/', async (c: Context) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    ).all()
    return c.json({ success: true, data: results })
  } catch (error) {
    return c.json({ success: false, error: 'Database error' }, 500)
  }
})

// Создать новое сообщение
contacts.post('/', async (c: Context) => {
  try {
    const body = await c.req.json()
    const { name, email, message } = body

    // Валидация
    if (!name || !email || !message) {
      return c.json({ 
        success: false, 
        error: 'Required fields: name, email, message' 
      }, 400)
    }

    // Простая валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return c.json({ 
        success: false, 
        error: 'Invalid email format' 
      }, 400)
    }

    const result = await c.env.DB.prepare(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)'
    ).bind(name, email, message).run()

    return c.json({ 
      success: true, 
      data: { id: result.meta.last_row_id }
    }, 201)
  } catch (error) {
    return c.json({ success: false, error: 'Failed to send message' }, 500)
  }
})

export default contacts
