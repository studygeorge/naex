// Компонентная архитектура приложения
class App {
  constructor() {
    this.state = {
      services: [
        {
          icon: 'fas fa-shopping-cart',
          title: 'Боты для e-commerce',
          description: 'Автоматизация продаж через Telegram. Каталог товаров, корзина, оплата и доставка.',
          features: ['Прием платежей', 'Интеграция с CRM', 'Управление заказами']
        },
        {
          icon: 'fas fa-calendar-check',
          title: 'Системы бронирования',
          description: 'Запись на услуги, бронирование столиков, управление расписанием.',
          features: ['Календарь записи', 'Напоминания', 'Отмена/перенос']
        },
        {
          icon: 'fas fa-headset',
          title: 'Служба поддержки',
          description: 'Автоматизация обработки обращений клиентов, FAQ, тикет-система.',
          features: ['База знаний', 'Приоритеты', 'Аналитика']
        },
        {
          icon: 'fas fa-chart-line',
          title: 'CRM интеграция',
          description: 'Подключение к вашей CRM системе для синхронизации данных клиентов.',
          features: ['API интеграция', 'Синхронизация', 'Автоматизация']
        },
        {
          icon: 'fas fa-bell',
          title: 'Рассылки и уведомления',
          description: 'Массовые рассылки, персонализированные сообщения, триггерные уведомления.',
          features: ['Сегментация', 'Аналитика', 'A/B тесты']
        },
        {
          icon: 'fas fa-cog',
          title: 'Кастомная разработка',
          description: 'Индивидуальная разработка под уникальные задачи вашего бизнеса.',
          features: ['Любая сложность', 'Полный цикл', 'Гарантия']
        }
      ],
      portfolio: [
        {
          title: 'Бот для ресторана',
          category: 'Бронирование',
          image: 'fas fa-utensils',
          stats: '500+ заказов/день',
          description: 'Система бронирования столиков с интеграцией в учетную систему'
        },
        {
          title: 'Интернет-магазин одежды',
          category: 'E-commerce',
          image: 'fas fa-tshirt',
          stats: '1M+ оборот/мес',
          description: 'Полноценный магазин с каталогом, корзиной и приемом платежей'
        },
        {
          title: 'Бот для фитнес-клуба',
          category: 'Услуги',
          image: 'fas fa-dumbbell',
          stats: '300+ клиентов',
          description: 'Запись на тренировки, продление абонементов, расписание'
        },
        {
          title: 'Служба техподдержки',
          category: 'Поддержка',
          image: 'fas fa-headset',
          stats: '95% автоматизации',
          description: 'Автоматическая обработка типовых обращений пользователей'
        },
        {
          title: 'Бот для автосервиса',
          category: 'Бронирование',
          image: 'fas fa-car',
          stats: '200+ записей/мес',
          description: 'Запись на ремонт, калькулятор стоимости, история обслуживания'
        },
        {
          title: 'CRM для агентства',
          category: 'Бизнес',
          image: 'fas fa-briefcase',
          stats: '50+ пользователей',
          description: 'Управление клиентами, сделками и задачами через Telegram'
        }
      ],
      pricing: [
        {
          name: 'Старт',
          price: '15 000',
          period: 'разовый платеж',
          features: [
            'Базовый функционал',
            'До 5 команд',
            'Простая админ-панель',
            'База данных',
            'Документация',
            '1 месяц поддержки'
          ],
          popular: false
        },
        {
          name: 'Бизнес',
          price: '35 000',
          period: 'разовый платеж',
          features: [
            'Расширенный функционал',
            'Неограниченные команды',
            'Продвинутая админ-панель',
            'Интеграция с API',
            'Прием платежей',
            'Аналитика',
            '3 месяца поддержки'
          ],
          popular: true
        },
        {
          name: 'Энтерпрайз',
          price: 'от 70 000',
          period: 'индивидуально',
          features: [
            'Любая сложность',
            'Интеграция с CRM',
            'Масштабирование',
            'Выделенный сервер',
            'Приоритетная поддержка',
            'SLA гарантии',
            'Год поддержки'
          ],
          popular: false
        }
      ]
    };
    
    this.init();
  }

  init() {
    this.renderServices();
    this.renderPortfolio();
    this.renderPricing();
    this.setupFormHandler();
    this.setupScrollAnimations();
  }

  renderServices() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;
    
    grid.innerHTML = this.state.services.map(service => `
      <div class="bg-dark-card border border-gray-700 rounded-xl p-6 hover:border-primary transition transform hover:-translate-y-2 duration-300 animate-scale-in">
        <div class="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
          <i class="${service.icon} text-3xl text-primary"></i>
        </div>
        <h3 class="text-xl font-bold mb-3">${service.title}</h3>
        <p class="text-gray-400 mb-4">${service.description}</p>
        <ul class="space-y-2">
          ${service.features.map(feature => `
            <li class="flex items-center text-sm text-gray-300">
              <i class="fas fa-check text-primary mr-2"></i>
              ${feature}
            </li>
          `).join('')}
        </ul>
      </div>
    `).join('');
  }

  renderPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;
    
    grid.innerHTML = this.state.portfolio.map((project, index) => `
      <div class="bg-dark-card border border-gray-700 rounded-xl overflow-hidden hover:border-primary transition transform hover:-translate-y-2 duration-300" style="animation-delay: ${index * 0.1}s">
        <div class="bg-gradient-to-br from-primary/20 to-secondary/20 h-48 flex items-center justify-center">
          <i class="${project.image} text-6xl text-primary"></i>
        </div>
        <div class="p-6">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">${project.category}</span>
            <span class="text-xs text-gray-400">${project.stats}</span>
          </div>
          <h3 class="text-xl font-bold mb-2">${project.title}</h3>
          <p class="text-gray-400 text-sm">${project.description}</p>
        </div>
      </div>
    `).join('');
  }

  renderPricing() {
    const grid = document.getElementById('pricing-grid');
    if (!grid) return;
    
    grid.innerHTML = this.state.pricing.map((plan, index) => `
      <div class="bg-dark-card border ${plan.popular ? 'border-primary' : 'border-gray-700'} rounded-xl p-8 hover:border-primary transition transform hover:-translate-y-2 duration-300 relative" style="animation-delay: ${index * 0.1}s">
        ${plan.popular ? '<div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-sm font-bold">Популярный</div>' : ''}
        <h3 class="text-2xl font-bold mb-2">${plan.name}</h3>
        <div class="mb-6">
          <span class="text-4xl font-bold text-primary">${plan.price}</span>
          <span class="text-gray-400 text-sm ml-2">₽</span>
          <div class="text-gray-400 text-sm mt-1">${plan.period}</div>
        </div>
        <ul class="space-y-3 mb-8">
          ${plan.features.map(feature => `
            <li class="flex items-start text-sm text-gray-300">
              <i class="fas fa-check text-primary mr-3 mt-1"></i>
              <span>${feature}</span>
            </li>
          `).join('')}
        </ul>
        <button onclick="scrollToContact()" class="w-full ${plan.popular ? 'bg-primary hover:bg-secondary' : 'border border-gray-600 hover:border-primary'} px-6 py-3 rounded-lg transition">
          Выбрать план
        </button>
      </div>
    `).join('');
  }

  setupFormHandler() {
    const form = document.getElementById('contact-form');
    const message = document.getElementById('form-message');
    
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      // Валидация
      if (!this.validateForm(data)) {
        this.showMessage('Пожалуйста, заполните все обязательные поля', 'error');
        return;
      }

      try {
        // Показываем загрузку
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Отправка...';
        submitBtn.disabled = true;

        const response = await axios.post('/api/requests', data);
        
        if (response.data.success) {
          this.showMessage('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
          form.reset();
        } else {
          throw new Error(response.data.error);
        }
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      } catch (error) {
        this.showMessage('Ошибка при отправке заявки. Попробуйте позже или свяжитесь с нами напрямую.', 'error');
        console.error('Form submission error:', error);
        
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Отправить заявку';
        submitBtn.disabled = false;
      }
    });
  }

  validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.name || data.name.trim().length < 2) return false;
    if (!data.email || !emailRegex.test(data.email)) return false;
    if (!data.project_type) return false;
    if (!data.description || data.description.trim().length < 10) return false;
    
    return true;
  }

  showMessage(text, type) {
    const message = document.getElementById('form-message');
    if (!message) return;
    
    message.className = `mt-4 p-4 rounded-lg ${type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500' : 'bg-red-500/20 text-red-400 border border-red-500'}`;
    message.textContent = text;
    message.classList.remove('hidden');
    
    setTimeout(() => {
      message.classList.add('hidden');
    }, 5000);
  }

  setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
  }
}

// Утилиты для прокрутки
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function scrollToPortfolio() {
  document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  new App();
  console.log('TeleBotAgency App initialized');
});
