# Деплой React Frontend на сервер

## Структура проекта

После деплоя будет две версии фронтенда:

1. **Оригинальный** (HTML/CSS/JS) - `/home/naex/public/` → http://naexagency.com
2. **React** (новый) - `/home/naex/frontend/` → настроить отдельный домен или поддомен

## Вариант 1: Заменить оригинальный фронтенд на React

Если хотите полностью перейти на React версию:

```bash
cd /home/naex
git pull origin main

# Сборка React приложения
cd frontend
npm install
npm run build

# Заменить текущий public на React сборку
cd /home/naex
mv public public_old_backup
mv frontend/dist public

# Перезапустить PM2
pm2 restart all
```

## Вариант 2: Запустить React на отдельном порту

Для параллельной работы обеих версий:

```bash
cd /home/naex
git pull origin main

cd frontend
npm install

# Создать ecosystem config для PM2
cat > ecosystem.config.cjs << 'EOF'
module.exports = {
  apps: [{
    name: 'naex-react',
    script: 'npm',
    args: 'run preview -- --host 0.0.0.0 --port 5173',
    cwd: '/home/naex/frontend',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Собрать приложение
npm run build

# Запустить через PM2
pm2 start ecosystem.config.cjs
pm2 save
```

Затем настроить Nginx для поддомена react.naexagency.com:

```nginx
server {
    listen 80;
    server_name react.naexagency.com;
    
    location / {
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Вариант 3: Статичный деплой через Nginx

Самый простой и быстрый:

```bash
cd /home/naex
git pull origin main

cd frontend
npm install
npm run build

# Скопировать сборку в новую папку
sudo mkdir -p /var/www/naex-react
sudo cp -r dist/* /var/www/naex-react/
sudo chown -R www-data:www-data /var/www/naex-react

# Настроить Nginx
sudo nano /etc/nginx/sites-available/naex-react

# Добавить конфиг:
server {
    listen 80;
    server_name react.naexagency.com;
    root /var/www/naex-react;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Включить сайт
sudo ln -s /etc/nginx/sites-available/naex-react /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Текущий статус

- ✅ React приложение создано
- ✅ Все компоненты реализованы
- ✅ Стили полностью скопированы
- ✅ Telegram WebApp интеграция
- ✅ Код запушен в GitHub

## Dev сервер (для разработки)

Сейчас работает на: https://5173-i4h6c7sfr7xbb1vj4az47-6532622b.e2b.dev

Для локальной разработки:
```bash
cd /home/naex/frontend
npm run dev
```

## Что нужно сделать

1. Выбрать вариант деплоя (1, 2 или 3)
2. Скопировать изображения слайдера в `frontend/public/images/`
3. Добавить компонент формы брифа (BriefModal.jsx)
4. Настроить автопереключение слайдера новостей

Какой вариант деплоя предпочтительнее?
