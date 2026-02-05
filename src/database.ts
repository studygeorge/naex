import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Путь к базе данных
const dbPath = path.join(__dirname, '../database/webapp.db')

// Создаем соединение с БД
export const db = new Database(dbPath)

// Включаем поддержку внешних ключей
db.pragma('foreign_keys = ON')

// Инициализация схемы БД
export function initDatabase() {
  db.exec(`
    -- Таблица для заявок клиентов
    CREATE TABLE IF NOT EXISTS requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      telegram TEXT,
      project_type TEXT NOT NULL,
      budget TEXT,
      description TEXT NOT NULL,
      status TEXT DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Таблица для контактных форм
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Индексы для производительности
    CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);
    CREATE INDEX IF NOT EXISTS idx_requests_created ON requests(created_at);
    CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts(created_at);
  `)
  
  console.log('Database initialized successfully')
}

// Типы для TypeScript
export interface Request {
  id?: number
  name: string
  email: string
  phone?: string
  telegram?: string
  project_type: string
  budget?: string
  description: string
  status?: string
  created_at?: string
}

export interface Contact {
  id?: number
  name: string
  email: string
  message: string
  created_at?: string
}
