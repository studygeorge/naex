# Naex Agency - React Frontend

Современный React фронтенд для Naex Agency, полностью повторяющий дизайн и функционал оригинальной версии.

## Структура проекта

```
frontend/
├── public/
│   └── images/          # Изображения для слайдера
├── src/
│   ├── components/      # React компоненты
│   │   ├── Header.jsx   # Шапка сайта
│   │   └── BottomNav.jsx # Нижняя навигация
│   ├── pages/           # Страницы приложения
│   │   ├── HomePage.jsx
│   │   ├── ServicesPage.jsx
│   │   ├── PortfolioPage.jsx
│   │   └── ContactsPage.jsx
│   ├── styles/          # CSS модули (скопированы из оригинала)
│   │   ├── variables.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   ├── sections.css
│   │   └── responsive.css
│   ├── utils/           # Утилиты
│   │   └── telegram.js  # Telegram WebApp интеграция
│   ├── App.jsx          # Главный компонент
│   └── main.jsx         # Entry point
└── package.json
```

## Технологии

- **React 18** - UI библиотека
- **Vite** - сборщик и dev server
- **CSS Modules** - стили (импортированы из оригинала)
- **Telegram WebApp SDK** - интеграция с Telegram

## Команды

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр продакшен сборки
npm run preview
```

## Особенности

1. **Полное повторение дизайна** - все CSS файлы скопированы из оригинала
2. **Компонентная архитектура** - каждая часть интерфейса это отдельный React компонент
3. **Независимый скролл страниц** - каждая страница имеет свой scroll контейнер
4. **Telegram WebApp интеграция** - поддержка темной темы и haptic feedback
5. **Адаптивный дизайн** - работает на всех устройствах

## TODO

- [ ] Добавить форму брифа (BriefModal компонент)
- [ ] Реализовать слайдер новостей с автопереключением
- [ ] Добавить анимации переходов между страницами
- [ ] Интегрировать с бэкенд API

## Разработка

Приложение использует Vite для быстрой разработки с HMR (Hot Module Replacement).

Запустите dev сервер:
```bash
npm run dev
```

Откройте http://localhost:5173 в браузере.

## Сборка

Для продакшена:
```bash
npm run build
```

Файлы будут в папке `dist/`.
