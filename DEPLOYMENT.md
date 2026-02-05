# Руководство по развертыванию на VPS

## Краткая инструкция для развертывания

### Шаг 1: Подготовка VPS
```bash
# Подключение к серверу
ssh root@ваш-ip

# Создание пользователя (опционально)
adduser webapp
usermod -aG sudo webapp
su - webapp

# Обновление системы
sudo apt update && sudo apt upgrade -y
```

### Шаг 2: Установка необходимого ПО
```bash
# Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Build tools для компиляции native модулей
sudo apt install -y build-essential python3

# PM2
sudo npm install -g pm2

# Nginx
sudo apt install -y nginx

# Git
sudo apt install -y git
```

### Шаг 3: Клонирование проекта
```bash
# Создание директории
sudo mkdir -p /var/www
sudo chown -R $USER:$USER /var/www

# Клонирование (замените URL на ваш)
git clone https://github.com/ваш-username/webapp.git /var/www/webapp
cd /var/www/webapp
```

### Шаг 4: Установка зависимостей
```bash
npm install --production
```

### Шаг 5: Запуск приложения
```bash
# Запуск через PM2
pm2 start ecosystem.config.cjs

# Сохранение конфигурации
pm2 save

# Настройка автозапуска
pm2 startup systemd
# Выполните команду, которую покажет PM2
```

### Шаг 6: Настройка Nginx
```bash
# Создание конфига
sudo nano /etc/nginx/sites-available/webapp
```

Вставьте конфигурацию:
```nginx
server {
    listen 80;
    server_name ваш-домен.ru www.ваш-домен.ru;

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

Активация:
```bash
sudo ln -s /etc/nginx/sites-available/webapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Шаг 7: Установка SSL (Let's Encrypt)
```bash
# Установка Certbot
sudo apt install -y certbot python3-certbot-nginx

# Получение сертификата (замените домен)
sudo certbot --nginx -d ваш-домен.ru -d www.ваш-домен.ru
```

### Шаг 8: Настройка Firewall
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### Шаг 9: Проверка работы
```bash
# Проверка PM2
pm2 list
pm2 logs webapp

# Проверка Nginx
sudo systemctl status nginx

# Проверка в браузере
# Откройте: https://ваш-домен.ru
```

## Обновление кода через Git

```bash
cd /var/www/webapp
git pull origin main
npm install --production
pm2 restart webapp
```

## Полезные команды

### PM2
```bash
pm2 list              # Список процессов
pm2 logs webapp       # Логи
pm2 restart webapp    # Перезапуск
pm2 stop webapp       # Остановка
pm2 delete webapp     # Удаление
pm2 monit             # Мониторинг
```

### Nginx
```bash
sudo systemctl status nginx    # Статус
sudo systemctl restart nginx   # Перезапуск
sudo nginx -t                  # Проверка конфига
sudo tail -f /var/log/nginx/access.log  # Логи
```

### База данных
```bash
# Бэкап
cp database/webapp.db database/backup-$(date +%Y%m%d).db

# Проверка размера
ls -lh database/webapp.db

# Открыть в sqlite3
sqlite3 database/webapp.db
```

## Troubleshooting

### Ошибка "port 3000 already in use"
```bash
sudo fuser -k 3000/tcp
pm2 restart webapp
```

### Ошибка "permission denied" для БД
```bash
sudo chown -R $USER:$USER /var/www/webapp/database
chmod 644 /var/www/webapp/database/webapp.db
```

### Nginx 502 Bad Gateway
```bash
# Проверить работу Node.js
pm2 status
pm2 logs webapp

# Проверить порт
curl http://localhost:3000
```
