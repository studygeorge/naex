# TeleBotAgency - Node.js VPS Version

## Описание проекта
Профессиональный сайт веб-агентства для разработки Telegram ботов. **Адаптирован для развертывания на VPS с Node.js**.

## Технологический стек
- **Backend**: Express.js + TypeScript
- **Frontend**: Vanilla JS с компонентной архитектурой
- **Стилизация**: TailwindCSS + кастомные анимации
- **База данных**: SQLite3 (локальная файловая БД)
- **Process Manager**: PM2
- **Runtime**: Node.js 18+

## Структура проекта
```
webapp/
├── src/
│   ├── server.ts              # Основной Express сервер
│   ├── database.ts            # SQLite подключение и схема
│   └── routes/
│       ├── requests-node.ts   # API для заявок
│       └── contacts-node.ts   # API для контактов
├── public/
│   └── static/
│       ├── app.js             # Клиентский JavaScript
│       └── style.css          # Кастомные стили
├── database/
│   └── webapp.db              # SQLite база данных (создается автоматически)
├── logs/                       # PM2 логи
├── ecosystem.config.cjs        # PM2 конфигурация
├── package.json               # Зависимости
├── .env.example               # Пример переменных окружения
└── README.md
```

## Быстрый старт

### 1. Клонирование репозитория
```bash
# На вашем VPS
git clone https://github.com/ваш-username/webapp.git
cd webapp
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Настройка окружения
```bash
# Скопируйте пример .env файла
cp .env.example .env

# Отредактируйте если нужно
nano .env
```

### 4. Запуск приложения

#### Разработка (с автоперезагрузкой)
```bash
npm run dev
```

#### Production (с PM2)
```bash
# Запуск
npm run pm2:start

# Проверка статуса
pm2 list

# Просмотр логов
npm run pm2:logs

# Перезапуск
npm run pm2:restart

# Остановка
npm run pm2:stop

# Удаление из PM2
npm run pm2:delete
```

## API Endpoints

### Заявки
- `GET /api/requests` - получить все заявки
- `POST /api/requests` - создать новую заявку
- `GET /api/requests/:id` - получить заявку по ID
- `PATCH /api/requests/:id/status` - обновить статус

**Пример создания заявки:**
```bash
curl -X POST http://localhost:3000/api/requests \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Иван Иванов",
    "email": "ivan@example.com",
    "phone": "+7 999 123-45-67",
    "telegram": "@ivanov",
    "project_type": "shop",
    "budget": "30000-50000",
    "description": "Нужен бот для интернет-магазина"
  }'
```

### Контакты
- `GET /api/contacts` - получить все сообщения
- `POST /api/contacts` - отправить новое сообщение

### Служебные
- `GET /health` - health check endpoint

## Настройка для Production на VPS

### 1. Установка зависимостей на сервере
```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Установка PM2 глобально
sudo npm install -g pm2

# Установка build-essential для native модулей (better-sqlite3)
sudo apt install -y build-essential python3
```

### 2. Настройка приложения
```bash
# Клонирование и установка
git clone https://github.com/ваш-username/webapp.git /var/www/webapp
cd /var/www/webapp
npm install --production

# Создание директорий
mkdir -p database logs

# Настройка прав
chown -R $USER:$USER /var/www/webapp
chmod -R 755 /var/www/webapp
```

### 3. Настройка Nginx как reverse proxy
```bash
sudo apt install nginx -y
```

Создайте конфиг `/etc/nginx/sites-available/webapp`:
```nginx
server {
    listen 80;
    server_name ваш-домен.ru www.ваш-домен.ru;

    # Увеличение лимита размера загружаемых файлов
    client_max_body_size 10M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Активируйте конфиг:
```bash
sudo ln -s /etc/nginx/sites-available/webapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4. Настройка SSL с Let's Encrypt
```bash
# Установка Certbot
sudo apt install certbot python3-certbot-nginx -y

# Получение SSL сертификата
sudo certbot --nginx -d ваш-домен.ru -d www.ваш-домен.ru

# Автообновление (проверка)
sudo certbot renew --dry-run
```

### 5. Настройка автозапуска PM2
```bash
# Запуск приложения
cd /var/www/webapp
pm2 start ecosystem.config.cjs

# Сохранение списка процессов
pm2 save

# Настройка автозапуска при перезагрузке сервера
pm2 startup systemd
# Выполните команду, которую покажет PM2

# Проверка
sudo reboot
# После перезагрузки:
pm2 list  # Приложение должно работать
```

### 6. Мониторинг и логи
```bash
# Логи PM2
pm2 logs webapp

# Статус процессов
pm2 status

# Мониторинг ресурсов
pm2 monit

# Просмотр логов Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Обновление приложения

### Через Git
```bash
cd /var/www/webapp

# Получить последние изменения
git pull origin main

# Установить новые зависимости (если есть)
npm install --production

# Перезапустить приложение
pm2 restart webapp
```

### Резервное копирование БД
```bash
# Создание бэкапа
cp database/webapp.db database/webapp.db.backup-$(date +%Y%m%d-%H%M%S)

# Или через cron (каждый день в 3:00)
crontab -e
# Добавьте строку:
# 0 3 * * * cp /var/www/webapp/database/webapp.db /var/www/webapp/database/webapp.db.backup-$(date +\%Y\%m\%d)
```

## Переменные окружения

Создайте файл `.env` в корне проекта:
```env
NODE_ENV=production
PORT=3000
DATABASE_PATH=./database/webapp.db
LOG_LEVEL=info
```

## Безопасность

### Firewall
```bash
# UFW (Ubuntu)
sudo ufw allow 22/tcp      # SSH
sudo ufw allow 80/tcp      # HTTP
sudo ufw allow 443/tcp     # HTTPS
sudo ufw enable
```

### Rate Limiting (опционально)
Для защиты от DDoS можно добавить rate limiting в Nginx или использовать модуль `express-rate-limit`.

## Производительность

### Оптимизация SQLite
База данных уже оптимизирована с индексами:
- `idx_requests_status` - для фильтрации по статусу
- `idx_requests_created` - для сортировки по дате
- `idx_contacts_created` - для сортировки контактов

### PM2 кластер (опционально)
Для высоконагруженных проектов можно запустить несколько инстансов:
```javascript
// ecosystem.config.cjs
module.exports = {
  apps: [{
    name: 'webapp',
    script: 'tsx',
    args: 'src/server.ts',
    instances: 'max',  // Использовать все CPU ядра
    exec_mode: 'cluster'
  }]
}
```

## Мониторинг

### PM2 Plus (опционально)
```bash
pm2 link <secret> <public>  # Регистрация на pm2.io
```

### Logrotate для больших логов
```bash
sudo nano /etc/logrotate.d/webapp
```
```
/var/www/webapp/logs/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 username username
    sharedscripts
}
```

## Troubleshooting

### Приложение не запускается
```bash
# Проверить логи PM2
pm2 logs webapp --err

# Проверить права на директории
ls -la /var/www/webapp/database
ls -la /var/www/webapp/logs

# Проверить порт
sudo netstat -tlnp | grep 3000
```

### База данных не работает
```bash
# Проверить существование файла БД
ls -la database/webapp.db

# Проверить права
chmod 644 database/webapp.db

# Пересоздать БД (удалит все данные!)
rm database/webapp.db
npm run pm2:restart
```

### Nginx ошибки
```bash
# Тест конфигурации
sudo nginx -t

# Перезапуск
sudo systemctl restart nginx

# Логи
sudo tail -f /var/log/nginx/error.log
```

## Контакты и поддержка
- Email: info@telebotag.ru
- Telegram: @telebotag
- Телефон: +7 (999) 123-45-67

## Лицензия
Proprietary - все права защищены.
