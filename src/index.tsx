import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import requests from './routes/requests'
import contacts from './routes/contacts'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// CORS для API
app.use('/api/*', cors())

// Статические файлы
app.use('/static/*', serveStatic({ root: './public' }))

// API роуты
app.route('/api/requests', requests)
app.route('/api/contacts', contacts)

// Главная страница
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TeleBot Agency - Разработка Telegram ботов</title>
        <meta name="description" content="Профессиональная разработка Telegram ботов под ключ. Автоматизация бизнеса, интеграция с CRM, прием платежей.">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/style.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  primary: '#0088cc',
                  secondary: '#229ED9',
                  dark: '#0c1015',
                  'dark-card': '#161b22'
                },
                animation: {
                  'float': 'float 3s ease-in-out infinite',
                  'slide-up': 'slideUp 0.5s ease-out',
                  'fade-in': 'fadeIn 0.6s ease-out',
                  'scale-in': 'scaleIn 0.4s ease-out'
                },
                keyframes: {
                  float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' }
                  },
                  slideUp: {
                    '0%': { transform: 'translateY(50px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                  },
                  fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                  },
                  scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' }
                  }
                }
              }
            }
          }
        </script>
    </head>
    <body class="bg-dark text-white antialiased">
        <!-- Header -->
        <header class="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-lg border-b border-gray-800">
            <nav class="container mx-auto px-6 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <i class="fab fa-telegram text-3xl text-primary"></i>
                        <span class="text-2xl font-bold">TeleBot<span class="text-primary">Agency</span></span>
                    </div>
                    <div class="hidden md:flex space-x-8">
                        <a href="#services" class="hover:text-primary transition">Услуги</a>
                        <a href="#portfolio" class="hover:text-primary transition">Портфолио</a>
                        <a href="#pricing" class="hover:text-primary transition">Цены</a>
                        <a href="#contact" class="hover:text-primary transition">Контакты</a>
                    </div>
                    <button onclick="scrollToContact()" class="bg-primary hover:bg-secondary px-6 py-2 rounded-lg transition transform hover:scale-105">
                        Заказать бота
                    </button>
                </div>
            </nav>
        </header>

        <!-- Hero Section -->
        <section class="pt-32 pb-20 px-6">
            <div class="container mx-auto max-w-6xl">
                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div class="animate-slide-up">
                        <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Создаем <span class="text-primary">Telegram ботов</span> для вашего бизнеса
                        </h1>
                        <p class="text-xl text-gray-400 mb-8">
                            Автоматизация процессов, интеграция с системами, прием платежей. Разработка под ключ за 7-14 дней.
                        </p>
                        <div class="flex flex-wrap gap-4">
                            <button onclick="scrollToContact()" class="bg-primary hover:bg-secondary px-8 py-4 rounded-lg text-lg transition transform hover:scale-105">
                                <i class="fas fa-rocket mr-2"></i>
                                Начать проект
                            </button>
                            <button onclick="scrollToPortfolio()" class="border border-gray-600 hover:border-primary px-8 py-4 rounded-lg text-lg transition">
                                <i class="fas fa-folder-open mr-2"></i>
                                Смотреть работы
                            </button>
                        </div>
                        <div class="flex gap-8 mt-8">
                            <div>
                                <div class="text-3xl font-bold text-primary">50+</div>
                                <div class="text-gray-400">Проектов</div>
                            </div>
                            <div>
                                <div class="text-3xl font-bold text-primary">98%</div>
                                <div class="text-gray-400">Довольных клиентов</div>
                            </div>
                            <div>
                                <div class="text-3xl font-bold text-primary">24/7</div>
                                <div class="text-gray-400">Поддержка</div>
                            </div>
                        </div>
                    </div>
                    <div class="relative animate-fade-in">
                        <div class="relative z-10">
                            <div class="bg-dark-card border border-gray-700 rounded-2xl p-6 shadow-2xl animate-float">
                                <div class="flex items-center space-x-3 mb-4">
                                    <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                        <i class="fab fa-telegram text-2xl"></i>
                                    </div>
                                    <div>
                                        <div class="font-bold">Ваш бот</div>
                                        <div class="text-sm text-gray-400">@yourbot</div>
                                    </div>
                                </div>
                                <div class="bg-dark rounded-lg p-4 mb-3">
                                    <div class="text-sm text-gray-400 mb-1">Пользователь</div>
                                    <div class="bg-primary/20 rounded-lg p-3 inline-block">
                                        Привет! Хочу оформить заказ
                                    </div>
                                </div>
                                <div class="bg-dark rounded-lg p-4">
                                    <div class="text-sm text-gray-400 mb-1">Бот</div>
                                    <div class="bg-gray-700 rounded-lg p-3 inline-block">
                                        Отлично! Выберите категорию товаров 👇
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
                        <div class="absolute -bottom-4 -left-4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Services Section -->
        <section id="services" class="py-20 px-6 bg-dark-card/50">
            <div class="container mx-auto max-w-6xl">
                <div class="text-center mb-16 animate-slide-up">
                    <h2 class="text-4xl font-bold mb-4">Наши <span class="text-primary">услуги</span></h2>
                    <p class="text-xl text-gray-400">Полный спектр разработки и поддержки Telegram ботов</p>
                </div>
                <div class="grid md:grid-cols-3 gap-8" id="services-grid">
                    <!-- Services будут добавлены через JS -->
                </div>
            </div>
        </section>

        <!-- Portfolio Section -->
        <section id="portfolio" class="py-20 px-6">
            <div class="container mx-auto max-w-6xl">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold mb-4">Наши <span class="text-primary">работы</span></h2>
                    <p class="text-xl text-gray-400">Реализованные проекты для различных бизнесов</p>
                </div>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8" id="portfolio-grid">
                    <!-- Portfolio будут добавлены через JS -->
                </div>
            </div>
        </section>

        <!-- Pricing Section -->
        <section id="pricing" class="py-20 px-6 bg-dark-card/50">
            <div class="container mx-auto max-w-6xl">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold mb-4">Тарифы и <span class="text-primary">цены</span></h2>
                    <p class="text-xl text-gray-400">Выберите подходящий пакет для вашего проекта</p>
                </div>
                <div class="grid md:grid-cols-3 gap-8" id="pricing-grid">
                    <!-- Pricing будут добавлены через JS -->
                </div>
            </div>
        </section>

        <!-- Contact Form -->
        <section id="contact" class="py-20 px-6">
            <div class="container mx-auto max-w-4xl">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold mb-4">Начните <span class="text-primary">проект</span></h2>
                    <p class="text-xl text-gray-400">Оставьте заявку, и мы свяжемся с вами в течение 1 часа</p>
                </div>
                <div class="bg-dark-card border border-gray-700 rounded-2xl p-8">
                    <form id="contact-form" class="space-y-6">
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium mb-2">Ваше имя *</label>
                                <input type="text" name="name" required class="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 focus:border-primary focus:outline-none transition">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Email *</label>
                                <input type="email" name="email" required class="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 focus:border-primary focus:outline-none transition">
                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium mb-2">Телефон</label>
                                <input type="tel" name="phone" class="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 focus:border-primary focus:outline-none transition">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Telegram</label>
                                <input type="text" name="telegram" placeholder="@username" class="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 focus:border-primary focus:outline-none transition">
                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium mb-2">Тип проекта *</label>
                                <select name="project_type" required class="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 focus:border-primary focus:outline-none transition">
                                    <option value="">Выберите тип</option>
                                    <option value="shop">Интернет-магазин</option>
                                    <option value="crm">CRM интеграция</option>
                                    <option value="booking">Система бронирования</option>
                                    <option value="support">Служба поддержки</option>
                                    <option value="custom">Индивидуальный</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Бюджет</label>
                                <select name="budget" class="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 focus:border-primary focus:outline-none transition">
                                    <option value="">Выберите бюджет</option>
                                    <option value="15000-30000">15 000 - 30 000 ₽</option>
                                    <option value="30000-50000">30 000 - 50 000 ₽</option>
                                    <option value="50000-100000">50 000 - 100 000 ₽</option>
                                    <option value="100000+">100 000+ ₽</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">Описание проекта *</label>
                            <textarea name="description" required rows="4" class="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 focus:border-primary focus:outline-none transition" placeholder="Расскажите подробнее о вашем проекте..."></textarea>
                        </div>
                        <button type="submit" class="w-full bg-primary hover:bg-secondary px-8 py-4 rounded-lg text-lg font-medium transition transform hover:scale-105">
                            <i class="fas fa-paper-plane mr-2"></i>
                            Отправить заявку
                        </button>
                    </form>
                    <div id="form-message" class="mt-4 hidden"></div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="py-12 px-6 bg-dark-card border-t border-gray-800">
            <div class="container mx-auto max-w-6xl">
                <div class="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div class="flex items-center space-x-2 mb-4">
                            <i class="fab fa-telegram text-2xl text-primary"></i>
                            <span class="text-xl font-bold">TeleBotAgency</span>
                        </div>
                        <p class="text-gray-400">Профессиональная разработка Telegram ботов</p>
                    </div>
                    <div>
                        <h3 class="font-bold mb-4">Услуги</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="#services" class="hover:text-primary transition">Разработка ботов</a></li>
                            <li><a href="#services" class="hover:text-primary transition">Интеграции</a></li>
                            <li><a href="#services" class="hover:text-primary transition">Поддержка</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="font-bold mb-4">Компания</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="#portfolio" class="hover:text-primary transition">Портфолио</a></li>
                            <li><a href="#pricing" class="hover:text-primary transition">Цены</a></li>
                            <li><a href="#contact" class="hover:text-primary transition">Контакты</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="font-bold mb-4">Контакты</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><i class="fas fa-envelope mr-2 text-primary"></i>info@telebotag.ru</li>
                            <li><i class="fas fa-phone mr-2 text-primary"></i>+7 (999) 123-45-67</li>
                            <li><i class="fab fa-telegram mr-2 text-primary"></i>@telebotag</li>
                        </ul>
                    </div>
                </div>
                <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
                    <p>&copy; 2026 TeleBotAgency. Все права защищены.</p>
                </div>
            </div>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

export default app
