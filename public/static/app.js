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
            icon: 'restaurant',
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
            icon: 'store',
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
            icon: 'fitness_center',
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
            icon: 'directions_car',
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
        grid.innerHTML = topFeatures.map((feature, index) => `
            <div class="card" style="animation-delay: ${index * 0.1}s">
                <div class="card-icon">
                    <span class="material-icons-round">${feature.icon}</span>
                </div>
                <h3 class="card-title">${feature.title}</h3>
                <p class="card-description">${feature.description}</p>
                <div style="margin-top: 20px; color: var(--primary); font-weight: 700; font-size: 18px;">
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
                <div class="card" style="padding: 48px;">
                    <div id="calculator-features" style="margin-bottom: 48px;">
                        <div style="display: grid; gap: 16px;">
                            ${this.features.map(feature => `
                                <label class="feature-option" data-feature-id="${feature.id}">
                                    <input type="checkbox" class="feature-checkbox" value="${feature.id}">
                                    <div class="feature-content">
                                        <div class="feature-header">
                                            <div class="feature-icon-small">
                                                <span class="material-icons-round">${feature.icon}</span>
                                            </div>
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
                        <button class="btn btn-primary" id="order-btn" style="width: 100%; margin-top: 32px; padding: 18px; font-size: 16px;" disabled>
                            Оставить заявку
                        </button>
                    </div>
                </div>
                
                <div class="card" id="order-form" style="display: none; margin-top: 24px; padding: 48px;">
                    <h3 style="font-size: 28px; font-weight: 700; margin-bottom: 32px;">Оформление заявки</h3>
                    <form id="request-form">
                        <div style="display: grid; gap: 24px;">
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 15px;">Ваше имя</label>
                                <input type="text" name="name" required 
                                    style="width: 100%; padding: 16px 18px; border: 2px solid rgba(0, 136, 204, 0.15); border-radius: 14px; font-size: 16px; transition: all 0.3s; background: rgba(255, 255, 255, 0.8);"
                                    onfocus="this.style.borderColor='var(--primary)'; this.style.background='white'"
                                    onblur="this.style.borderColor='rgba(0, 136, 204, 0.15)'; this.style.background='rgba(255, 255, 255, 0.8)'">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 15px;">Email</label>
                                <input type="email" name="email" required 
                                    style="width: 100%; padding: 16px 18px; border: 2px solid rgba(0, 136, 204, 0.15); border-radius: 14px; font-size: 16px; transition: all 0.3s; background: rgba(255, 255, 255, 0.8);"
                                    onfocus="this.style.borderColor='var(--primary)'; this.style.background='white'"
                                    onblur="this.style.borderColor='rgba(0, 136, 204, 0.15)'; this.style.background='rgba(255, 255, 255, 0.8)'">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 15px;">Telegram</label>
                                <input type="text" name="telegram" placeholder="@username" 
                                    style="width: 100%; padding: 16px 18px; border: 2px solid rgba(0, 136, 204, 0.15); border-radius: 14px; font-size: 16px; transition: all 0.3s; background: rgba(255, 255, 255, 0.8);"
                                    onfocus="this.style.borderColor='var(--primary)'; this.style.background='white'"
                                    onblur="this.style.borderColor='rgba(0, 136, 204, 0.15)'; this.style.background='rgba(255, 255, 255, 0.8)'">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 15px;">Телефон</label>
                                <input type="tel" name="phone" placeholder="+7" 
                                    style="width: 100%; padding: 16px 18px; border: 2px solid rgba(0, 136, 204, 0.15); border-radius: 14px; font-size: 16px; transition: all 0.3s; background: rgba(255, 255, 255, 0.8);"
                                    onfocus="this.style.borderColor='var(--primary)'; this.style.background='white'"
                                    onblur="this.style.borderColor='rgba(0, 136, 204, 0.15)'; this.style.background='rgba(255, 255, 255, 0.8)'">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 15px;">Комментарий</label>
                                <textarea name="description" rows="4" placeholder="Расскажите подробнее о вашем проекте..."
                                    style="width: 100%; padding: 16px 18px; border: 2px solid rgba(0, 136, 204, 0.15); border-radius: 14px; font-size: 16px; resize: vertical; transition: all 0.3s; background: rgba(255, 255, 255, 0.8);"
                                    onfocus="this.style.borderColor='var(--primary)'; this.style.background='white'"
                                    onblur="this.style.borderColor='rgba(0, 136, 204, 0.15)'; this.style.background='rgba(255, 255, 255, 0.8)'"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 18px; font-size: 17px;">
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
                    padding: 24px;
                    background: rgba(255, 255, 255, 0.6);
                    backdrop-filter: blur(10px);
                    border: 2px solid rgba(255, 255, 255, 0.5);
                    border-radius: 18px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .feature-option:hover {
                    border-color: rgba(0, 136, 204, 0.4);
                    background: rgba(255, 255, 255, 0.8);
                    transform: translateY(-2px);
                }
                
                .feature-checkbox {
                    display: none;
                }
                
                .feature-checkbox:checked + .feature-content {
                    border-left: 4px solid var(--primary);
                    padding-left: 20px;
                }
                
                .feature-option:has(.feature-checkbox:checked) {
                    border-color: var(--primary);
                    background: rgba(0, 136, 204, 0.08);
                    box-shadow: 0 8px 24px rgba(0, 136, 204, 0.15);
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
                    gap: 18px;
                    flex: 1;
                }
                
                .feature-icon-small {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    flex-shrink: 0;
                }
                
                .feature-icon-small .material-icons-round {
                    font-size: 24px;
                }
                
                .feature-info {
                    flex: 1;
                }
                
                .feature-title {
                    font-weight: 600;
                    font-size: 17px;
                    margin-bottom: 4px;
                    color: var(--text-primary);
                }
                
                .feature-description {
                    font-size: 14px;
                    color: var(--text-secondary);
                }
                
                .feature-price {
                    font-weight: 700;
                    font-size: 20px;
                    color: var(--primary);
                    flex-shrink: 0;
                }
                
                .calculator-summary {
                    padding: 32px;
                    background: rgba(0, 136, 204, 0.05);
                    backdrop-filter: blur(10px);
                    border-radius: 18px;
                    border: 1px solid rgba(0, 136, 204, 0.1);
                }
                
                .summary-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px 0;
                    border-bottom: 1px solid rgba(0, 136, 204, 0.1);
                }
                
                .summary-row:last-of-type {
                    border-bottom: none;
                }
                
                .summary-label {
                    font-size: 16px;
                    color: var(--text-secondary);
                }
                
                .summary-value {
                    font-weight: 600;
                    font-size: 17px;
                }
                
                .summary-total {
                    font-weight: 800;
                    font-size: 32px;
                    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
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
        
        grid.innerHTML = this.portfolio.map((project, index) => `
            <div class="card" style="padding: 0; overflow: hidden; animation-delay: ${index * 0.1}s">
                <div style="background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); padding: 60px 32px; text-align: center; position: relative;">
                    <span class="material-icons-round" style="font-size: 72px; color: white; margin-bottom: 20px; display: inline-block; opacity: 0.95;">
                        ${project.icon}
                    </span>
                    <div>
                        <span style="background: rgba(255,255,255,0.25); backdrop-filter: blur(10px); color: white; padding: 8px 16px; border-radius: 100px; font-size: 13px; font-weight: 600;">
                            ${project.category}
                        </span>
                    </div>
                </div>
                <div style="padding: 32px;">
                    <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 16px;">${project.title}</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 24px; font-size: 15px; line-height: 1.6;">${project.description}</p>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px;">
                        ${Object.entries(project.metrics).map(([key, value]) => `
                            <div style="text-align: center; padding: 16px 12px; background: rgba(0, 136, 204, 0.06); backdrop-filter: blur(10px); border-radius: 14px; border: 1px solid rgba(0, 136, 204, 0.1);">
                                <div style="font-weight: 700; color: var(--primary); font-size: 16px;">${value}</div>
                                <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; margin-top: 4px; font-weight: 500;">${key}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${project.features.map(feature => `
                            <span style="background: rgba(0, 136, 204, 0.08); padding: 8px 14px; border-radius: 10px; font-size: 13px; font-weight: 500; color: var(--text-primary);">
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
        
        document.getElementById('selected-count').textContent = selectedCount;
        document.getElementById('total-price').textContent = totalPrice.toLocaleString('ru') + ' ₽';
        
        let devTime = '7-10 дней';
        if (selectedCount >= 5) devTime = '14-21 день';
        else if (selectedCount >= 3) devTime = '10-14 дней';
        document.getElementById('development-time').textContent = devTime;
        
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
        messageEl.style.padding = '18px 24px';
        messageEl.style.borderRadius = '14px';
        messageEl.style.fontWeight = '600';
        messageEl.style.fontSize = '15px';
        
        if (type === 'success') {
            messageEl.style.background = 'rgba(76, 175, 80, 0.1)';
            messageEl.style.color = '#2E7D32';
            messageEl.style.border = '2px solid rgba(76, 175, 80, 0.3)';
        } else {
            messageEl.style.background = 'rgba(244, 67, 54, 0.1)';
            messageEl.style.color = '#C62828';
            messageEl.style.border = '2px solid rgba(244, 67, 54, 0.3)';
        }
        
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 5000);
    },
    
    initTelegramWebApp() {
        if (!tg) return;
        
        if (tg.initDataUnsafe?.user) {
            const user = tg.initDataUnsafe.user;
            this.state.userData = {
                telegram_id: user.id,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name
            };
            
            const nameInput = document.querySelector('input[name="name"]');
            const telegramInput = document.querySelector('input[name="telegram"]');
            
            if (nameInput && user.first_name) {
                nameInput.value = `${user.first_name}${user.last_name ? ' ' + user.last_name : ''}`;
            }
            
            if (telegramInput && user.username) {
                telegramInput.value = `@${user.username}`;
            }
        }
        
        if (tg.themeParams) {
            document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#ffffff');
            document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#000000');
            document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#0088cc');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
    console.log('NaexAgency App initialized');
});
