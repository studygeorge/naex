import { Hono } from 'hono'
import type { Context } from 'hono'

type Bindings = {
  DB: D1Database
}

const requests = new Hono<{ Bindings: Bindings }>()

// Получить все заявки
requests.get('/', async (c: Context) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM requests ORDER BY created_at DESC'
    ).all()
    return c.json({ success: true, data: results })
  } catch (error) {
    return c.json({ success: false, error: 'Database error' }, 500)
  }
})

// Создать новую заявку
requests.post('/', async (c: Context) => {
  try {
    const body = await c.req.json()
    const { name, email, phone, telegram, project_type, budget, description } = body

    // Валидация
    if (!name || !email || !project_type || !description) {
      return c.json({ 
        success: false, 
        error: 'Required fields: name, email, project_type, description' 
      }, 400)
    }

    const result = await c.env.DB.prepare(
      `INSERT INTO requests (name, email, phone, telegram, project_type, budget, description, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'new')`
    ).bind(name, email, phone, telegram, project_type, budget, description).run()

    return c.json({ 
      success: true, 
      data: { id: result.meta.last_row_id }
    }, 201)
  } catch (error) {
    return c.json({ success: false, error: 'Failed to create request' }, 500)
  }
})

// Получить заявку по ID
requests.get('/:id', async (c: Context) => {
  try {
    const id = c.req.param('id')
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM requests WHERE id = ?'
    ).bind(id).all()

    if (results.length === 0) {
      return c.json({ success: false, error: 'Request not found' }, 404)
    }

    return c.json({ success: true, data: results[0] })
  } catch (error) {
    return c.json({ success: false, error: 'Database error' }, 500)
  }
})

// Обновить статус заявки
requests.patch('/:id/status', async (c: Context) => {
  try {
    const id = c.req.param('id')
    const { status } = await c.req.json()

    if (!['new', 'processing', 'completed', 'cancelled'].includes(status)) {
      return c.json({ success: false, error: 'Invalid status' }, 400)
    }

    await c.env.DB.prepare(
      'UPDATE requests SET status = ? WHERE id = ?'
    ).bind(status, id).run()

    return c.json({ success: true })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to update status' }, 500)
  }
})

export default requests
