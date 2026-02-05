// Telegram WebApp Integration
let tg = window.Telegram?.WebApp;
if (tg) {
    tg.ready();
    tg.expand();
    tg.enableClosingConfirmation();
}

// App State
const app = {
    state: {
        selectedFeatures: new Set(),
        totalPrice: 0,
        userData: {},
        step: 1
    },
    
    features: [
        {
            id: 'catalog',
            icon: 'shopping_bag',
            title: 'Каталог товаров',
            description: 'Показ товаров с фото, ценами и фильтрами',
            price: 15000,
            category: 'ecommerce'
        },
        {
            id: 'cart',
            icon: 'shopping_cart',
            title: 'Корзина и заказы',
            description: 'Управление заказами и история покупок',
            price: 12000,
            category: 'ecommerce'
        },
        {
            id: 'payment',
            icon: 'credit_card',
            title: 'Прием платежей',
            description: 'Онлайн-оплата через YooKassa, Stripe',
            price: 8000,
            category: 'ecommerce'
        },
        {
            id: 'booking',
            icon: 'event',
            title: 'Бронирование',
            description: 'Запись на услуги с календарем',
            price: 18000,
            category: 'services'
        },
        {
            id: 'crm',
            icon: 'groups',
            title: 'CRM интеграция',
            description: 'Синхронизация с вашей системой',
            price: 25000,
            category: 'integration'
        },
        {
            id: 'support',
            icon: 'chat',
            title: 'Поддержка клиентов',
            description: 'Автоответы и передача оператору',
            price: 10000,
            category: 'support'
        },
        {
            id: 'notifications',
            icon: 'notifications',
            title: 'Рассылки',
            description: 'Массовые и персональные уведомления',
            price: 7000,
            category: 'marketing'
        },
        {
            id: 'analytics',
            icon: 'analytics',
            title: 'Аналитика',
            description: 'Статистика продаж и поведения пользователей',
            price: 9000,
            category: 'analytics'
        },
        {
            id: 'loyalty',
            icon: 'card_giftcard',
            title: 'Программа лояльности',
            description: 'Баллы, скидки и промокоды',
            price: 12000,
            category: 'marketing'
        }
    ],
    
    portfolio: [
        {
            title: 'Бот для ресторана',
            image: 'restaurant',
            category: 'Бронирование',
            metrics: {
                orders: '500+/день',
                conversion: '+85%',
                roi: '320%'
            },
            features: ['Бронирование столов', 'Меню и заказы', 'Программа лояльности'],
            description: 'Автоматизация бронирования и доставки для сети из 5 ресторанов'
        },
        {
            title: 'Интернет-магазин одежды',
            image: 'store',
            category: 'E-commerce',
            metrics: {
                revenue: '₽2.4M/мес',
                orders: '1200+',
                growth: '+145%'
            },
            features: ['Каталог 500+ товаров', 'Онлайн-оплата', 'Доставка и трекинг'],
            description: 'Полноценный магазин с автоматизацией от заказа до доставки'
        },
        {
            title: 'Фитнес-клуб Premium',
            image: 'fitness_center',
            category: 'Услуги',
            metrics: {
                clients: '800+',
                bookings: '95%',
                retention: '+68%'
            },
            features: ['Запись на тренировки', 'Абонементы', 'Персональная программа'],
            description: 'Система записи и управления клиентами для сети фитнес-клубов'
        },
        {
            title: 'Автосервис 24/7',
            image: 'directions_car',
            category: 'Бронирование',
            metrics: {
                bookings: '350/мес',
                automation: '90%',
                satisfaction: '4.8/5'
            },
            features: ['Онлайн-запись', 'Калькулятор услуг', 'История обслуживания'],
            description: 'Автоматизация записи и уведомлений для автосервиса'
        }
    ],
    
    init() {
        this.renderFeatures();
        this.renderCalculator();
        this.renderPortfolio();
        this.setupEventListeners();
        this.initTelegramWebApp();
    },
    
    renderFeatures() {
        const grid = document.getElementById('features-grid');
        if (!grid) return;
        
        const topFeatures = this.features.slice(0, 6);
        grid.innerHTML = topFeatures.map(feature => `
            <div class="card">
                <div class="card-icon">
                    <span class="material-icons-round">${feature.icon}</span>
                </div>
                <h3 class="card-title">${feature.title}</h3>
                <p class="card-description">${feature.description}</p>
                <div style="margin-top: 16px; color: var(--primary); font-weight: 600;">
                    от ${feature.price.toLocaleString('ru')} ₽
                </div>
            </div>
        `).join('');
    },
    
    renderCalculator() {
        const container = document.getElementById('calculator-container');
        if (!container) return;
        
        container.innerHTML = `
            <div style="max-width: 900px; margin: 0 auto;">
                <div class="card" style="padding: 40px;">
                    <div id="calculator-features" style="margin-bottom: 40px;">
                        <div style="display: grid; gap: 16px;">
                            ${this.features.map(feature => `
                                <label class="feature-option" data-feature-id="${feature.id}">
                                    <input type="checkbox" class="feature-checkbox" value="${feature.id}">
                                    <div class="feature-content">
                                        <div class="feature-header">
                                            <span class="feature-icon">
                                                <span class="material-icons-round">${feature.icon}</span>
                                            </span>
                                            <div class="feature-info">
                                                <div class="feature-title">${feature.title}</div>
                                                <div class="feature-description">${feature.description}</div>
                                            </div>
                                        </div>
                                        <div class="feature-price">${feature.price.toLocaleString('ru')} ₽</div>
                                    </div>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="calculator-summary">
                        <div class="summary-row">
                            <span class="summary-label">Выбрано функций:</span>
                            <span class="summary-value" id="selected-count">0</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Итоговая стоимость:</span>
                            <span class="summary-total" id="total-price">0 ₽</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Срок разработки:</span>
                            <span class="summary-value" id="development-time">7-10 дней</span>
                        </div>
                        <button class="btn btn-primary" id="order-btn" style="width: 100%; margin-top: 24px; padding: 16px;" disabled>
                            Оставить заявку
                        </button>
                    </div>
                </div>
                
                <div class="card" id="order-form" style="display: none; margin-top: 24px; padding: 40px;">
                    <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 24px;">Оформление заявки</h3>
                    <form id="request-form">
                        <div style="display: grid; gap: 20px;">
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Ваше имя *</label>
                                <input type="text" name="name" required 
                                    style="width: 100%; padding: 14px 16px; border: 2px solid var(--border); border-radius: 12px; font-size: 15px; transition: border-color 0.3s;"
                                    onfocus="this.style.borderColor='var(--primary)'"
                                    onblur="this.style.borderColor='var(--border)'">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Email *</label>
                                <input type="email" name="email" required 
                                    style="width: 100%; padding: 14px 16px; border: 2px solid var(--border); border-radius: 12px; font-size: 15px; transition: border-color 0.3s;"
                                    onfocus="this.style.borderColor='var(--primary)'"
                                    onblur="this.style.borderColor='var(--border)'">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Telegram</label>
                                <input type="text" name="telegram" placeholder="@username" 
                                    style="width: 100%; padding: 14px 16px; border: 2px solid var(--border); border-radius: 12px; font-size: 15px; transition: border-color 0.3s;"
                                    onfocus="this.style.borderColor='var(--primary)'"
                                    onblur="this.style.borderColor='var(--border)'">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Телефон</label>
                                <input type="tel" name="phone" placeholder="+7" 
                                    style="width: 100%; padding: 14px 16px; border: 2px solid var(--border); border-radius: 12px; font-size: 15px; transition: border-color 0.3s;"
                                    onfocus="this.style.borderColor='var(--primary)'"
                                    onblur="this.style.borderColor='var(--border)'">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Комментарий</label>
                                <textarea name="description" rows="4" placeholder="Расскажите подробнее о вашем проекте..."
                                    style="width: 100%; padding: 14px 16px; border: 2px solid var(--border); border-radius: 12px; font-size: 15px; resize: vertical; transition: border-color 0.3s;"
                                    onfocus="this.style.borderColor='var(--primary)'"
                                    onblur="this.style.borderColor='var(--border)'"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 16px; font-size: 16px;">
                                Отправить заявку
                            </button>
                        </div>
                    </form>
                    <div id="form-message" style="margin-top: 20px; display: none;"></div>
                </div>
            </div>
            
            <style>
                .feature-option {
                    display: block;
                    cursor: pointer;
                    padding: 20px;
                    border: 2px solid var(--border);
                    border-radius: 16px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .feature-option:hover {
                    border-color: var(--primary);
                    background: rgba(0, 136, 204, 0.02);
                }
                
                .feature-checkbox {
                    display: none;
                }
                
                .feature-checkbox:checked + .feature-content {
                    border-left: 4px solid var(--primary);
                    padding-left: 16px;
                }
                
                .feature-option:has(.feature-checkbox:checked) {
                    border-color: var(--primary);
                    background: rgba(0, 136, 204, 0.05);
                }
                
                .feature-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 20px;
                    transition: all 0.3s;
                }
                
                .feature-header {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    flex: 1;
                }
                
                .feature-icon {
                    font-size: 32px;
                    flex-shrink: 0;
                    width: 48px;
                    height: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
                    border-radius: 12px;
                    color: white;
                }
                
                .feature-icon .material-icons-round {
                    font-size: 28px;
                }
                
                .feature-info {
                    flex: 1;
                }
                
                .feature-title {
                    font-weight: 600;
                    font-size: 16px;
                    margin-bottom: 4px;
                }
                
                .feature-description {
                    font-size: 14px;
                    color: var(--text-secondary);
                }
                
                .feature-price {
                    font-weight: 700;
                    font-size: 18px;
                    color: var(--primary);
                    flex-shrink: 0;
                }
                
                .calculator-summary {
                    padding: 24px;
                    background: var(--bg-secondary);
                    border-radius: 16px;
                }
                
                .summary-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 0;
                    border-bottom: 1px solid var(--border);
                }
                
                .summary-row:last-of-type {
                    border-bottom: none;
                }
                
                .summary-label {
                    font-size: 15px;
                    color: var(--text-secondary);
                }
                
                .summary-value {
                    font-weight: 600;
                    font-size: 16px;
                }
                
                .summary-total {
                    font-weight: 800;
                    font-size: 28px;
                    color: var(--primary);
                }
                
                @media (max-width: 768px) {
                    .feature-content {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    
                    .feature-price {
                        align-self: flex-end;
                    }
                }
            </style>
        `;
        
        this.setupCalculatorListeners();
    },
    
    renderPortfolio() {
        const grid = document.getElementById('portfolio-grid');
        if (!grid) return;
        
        grid.innerHTML = this.portfolio.map(project => `
            <div class="card" style="padding: 0; overflow: hidden;">
                <div style="background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); padding: 60px 32px; text-align: center;">
                    <span class="material-icons-round" style="font-size: 64px; color: white; margin-bottom: 16px; display: inline-block;">
                        ${project.image}
                    </span>
                    <div>
                        <span style="background: rgba(255,255,255,0.2); color: white; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600;">
                            ${project.category}
                        </span>
                    </div>
                </div>
                <div style="padding: 24px;">
                    <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 16px;">${project.title}</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 14px;">${project.description}</p>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px;">
                        ${Object.entries(project.metrics).map(([key, value]) => `
                            <div style="text-align: center; padding: 12px; background: var(--bg-secondary); border-radius: 12px;">
                                <div style="font-weight: 700; color: var(--primary);">${value}</div>
                                <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase;">${key}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${project.features.map(feature => `
                            <span style="background: var(--bg-secondary); padding: 6px 12px; border-radius: 8px; font-size: 13px;">
                                ${feature}
                            </span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    },
    
    setupCalculatorListeners() {
        const checkboxes = document.querySelectorAll('.feature-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateCalculator();
                if (tg) tg.HapticFeedback.selectionChanged();
            });
        });
        
        const orderBtn = document.getElementById('order-btn');
        orderBtn?.addEventListener('click', () => {
            this.showOrderForm();
        });
    },
    
    updateCalculator() {
        const checkboxes = document.querySelectorAll('.feature-checkbox:checked');
        const selectedIds = Array.from(checkboxes).map(cb => cb.value);
        
        this.state.selectedFeatures = new Set(selectedIds);
        const selectedCount = selectedIds.length;
        
        let totalPrice = 0;
        selectedIds.forEach(id => {
            const feature = this.features.find(f => f.id === id);
            if (feature) totalPrice += feature.price;
        });
        
        this.state.totalPrice = totalPrice;
        
        // Обновление UI
        document.getElementById('selected-count').textContent = selectedCount;
        document.getElementById('total-price').textContent = totalPrice.toLocaleString('ru') + ' ₽';
        
        // Срок разработки
        let devTime = '7-10 дней';
        if (selectedCount >= 5) devTime = '14-21 день';
        else if (selectedCount >= 3) devTime = '10-14 дней';
        document.getElementById('development-time').textContent = devTime;
        
        // Кнопка заказа
        const orderBtn = document.getElementById('order-btn');
        if (selectedCount > 0) {
            orderBtn.disabled = false;
            orderBtn.textContent = `Оформить за ${totalPrice.toLocaleString('ru')} ₽`;
        } else {
            orderBtn.disabled = true;
            orderBtn.textContent = 'Выберите функции';
        }
    },
    
    showOrderForm() {
        const form = document.getElementById('order-form');
        if (form) {
            form.style.display = 'block';
            form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            if (tg) tg.HapticFeedback.impactOccurred('medium');
        }
    },
    
    setupEventListeners() {
        const form = document.getElementById('request-form');
        form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleFormSubmit(e.target);
        });
        
        // Smooth scroll для ссылок
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    },
    
    async handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            telegram: formData.get('telegram'),
            project_type: 'custom',
            budget: `${this.state.totalPrice}`,
            description: `Выбранные функции: ${Array.from(this.state.selectedFeatures).join(', ')}. ${formData.get('description') || ''}`
        };
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        
        try {
            const response = await fetch('/api/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.showMessage('Заявка успешно отправлена! Мы свяжемся с вами в течение часа.', 'success');
                form.reset();
                if (tg) {
                    tg.HapticFeedback.notificationOccurred('success');
                    tg.showAlert('Спасибо! Ваша заявка принята.');
                }
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            this.showMessage('Ошибка отправки. Попробуйте позже или свяжитесь напрямую.', 'error');
            if (tg) tg.HapticFeedback.notificationOccurred('error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    },
    
    showMessage(text, type) {
        const messageEl = document.getElementById('form-message');
        if (!messageEl) return;
        
        messageEl.textContent = text;
        messageEl.style.display = 'block';
        messageEl.style.padding = '16px';
        messageEl.style.borderRadius = '12px';
        messageEl.style.fontWeight = '600';
        
        if (type === 'success') {
            messageEl.style.background = '#E8F5E9';
            messageEl.style.color = '#2E7D32';
            messageEl.style.border = '2px solid #4CAF50';
        } else {
            messageEl.style.background = '#FFEBEE';
            messageEl.style.color = '#C62828';
            messageEl.style.border = '2px solid #F44336';
        }
        
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 5000);
    },
    
    initTelegramWebApp() {
        if (!tg) return;
        
        // Получаем данные пользователя из Telegram
        if (tg.initDataUnsafe?.user) {
            const user = tg.initDataUnsafe.user;
            this.state.userData = {
                telegram_id: user.id,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name
            };
            
            // Автозаполнение формы
            const nameInput = document.querySelector('input[name="name"]');
            const telegramInput = document.querySelector('input[name="telegram"]');
            
            if (nameInput && user.first_name) {
                nameInput.value = `${user.first_name}${user.last_name ? ' ' + user.last_name : ''}`;
            }
            
            if (telegramInput && user.username) {
                telegramInput.value = `@${user.username}`;
            }
        }
        
        // Настройка темы
        if (tg.themeParams) {
            document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#ffffff');
            document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#000000');
            document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#0088cc');
        }
    }
};

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    app.init();
    console.log('NaexAgency App initialized');
});
