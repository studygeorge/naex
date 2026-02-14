import React, { useState } from 'react';

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('tg');

  const portfolioTG = [
    {
      id: 1,
      category: 'Mini App',
      title: 'Онлайн-магазин косметики',
      metrics: [
        { value: '127%', label: 'Рост продаж' },
        { value: '8.4%', label: 'Конверсия' }
      ],
      description: 'Интеграция каталога товаров с возможностью оплаты через Telegram Payments и автоматическим уведомлением о заказах.'
    },
    {
      id: 2,
      category: 'Telegram Bot',
      title: 'CRM для стоматологии',
      metrics: [
        { value: '-40%', label: 'Время записи' },
        { value: '350+', label: 'Записей/мес' }
      ],
      description: 'Автоматизация записи пациентов, напоминания о приемах, интеграция с 1С и онлайн-оплата услуг.'
    },
    {
      id: 3,
      category: 'Mini App + Bot',
      title: 'Система для мероприятий',
      metrics: [
        { value: '2500+', label: 'Участников' },
        { value: '98%', label: 'Довольны' }
      ],
      description: 'Регистрация, нетворкинг, расписание, навигация по площадке и геймификация.'
    }
  ];

  const portfolioWEB = [
    {
      id: 1,
      category: 'Corporate',
      title: 'Сайт IT-компании',
      metrics: [
        { value: '250%', label: 'Рост трафика' },
        { value: '12%', label: 'Конверсия' }
      ],
      description: 'Современный корпоративный сайт с адаптивным дизайном и интеграцией CRM.'
    },
    {
      id: 2,
      category: 'E-commerce',
      title: 'Интернет-магазин электроники',
      metrics: [
        { value: '180%', label: 'Продажи' },
        { value: '15K+', label: 'Заказов' }
      ],
      description: 'Полнофункциональный магазин с системой оплаты, доставки и личным кабинетом.'
    },
    {
      id: 3,
      category: 'Web App',
      title: 'Сервис онлайн-бронирования',
      metrics: [
        { value: '5K+', label: 'Пользователей' },
        { value: '95%', label: 'Satisfaction' }
      ],
      description: 'Платформа для бронирования услуг с календарем, уведомлениями и платежами.'
    }
  ];

  const currentPortfolio = activeCategory === 'tg' ? portfolioTG : portfolioWEB;

  return (
    <div className="page" id="page-portfolio">
      <section className="section" id="portfolio">
        {/* Portfolio Switcher */}
        <div className="portfolio-switcher">
          <div className="switcher-container">
            <button 
              className={`switcher-btn ${activeCategory === 'tg' ? 'active' : ''}`}
              onClick={() => setActiveCategory('tg')}
            >
              TG
            </button>
            <button 
              className={`switcher-btn ${activeCategory === 'web' ? 'active' : ''}`}
              onClick={() => setActiveCategory('web')}
            >
              WEB
            </button>
          </div>
        </div>
        
        {/* Portfolio Content */}
        <div className="portfolio-category-section active">
          <p className="portfolio-description">
            {activeCategory === 'tg' 
              ? 'Telegram-боты и мини-приложения для автоматизации бизнеса и улучшения клиентского опыта'
              : 'Веб-сайты и приложения для бизнеса с современным дизайном и функционалом'
            }
          </p>
          
          <div className="portfolio-grid">
            {currentPortfolio.map(item => (
              <div key={item.id} className="portfolio-item">
                <div className="portfolio-image">
                  {item.category === 'Mini App' && '🛍️'}
                  {item.category === 'Telegram Bot' && '🦷'}
                  {item.category === 'Mini App + Bot' && '🎪'}
                  {item.category === 'Corporate' && '💼'}
                  {item.category === 'E-commerce' && '🛒'}
                  {item.category === 'Web App' && '📱'}
                </div>
                <div className="portfolio-content">
                  <div className="portfolio-header">
                    <div className="portfolio-category">{item.category}</div>
                    <h3>{item.title}</h3>
                  </div>
                  <div className="portfolio-body">
                    <div className="portfolio-metrics">
                      {item.metrics.map((metric, idx) => (
                        <div key={idx} className="metric">
                          <div className="metric-value">{metric.value}</div>
                          <div className="metric-label">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
