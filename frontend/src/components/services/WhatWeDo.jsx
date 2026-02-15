import React, { useState } from 'react';
import '../../styles/services/what-we-do.css';

const WhatWeDo = () => {
  const [activeTab, setActiveTab] = useState('bots');

  const services = {
    bots: {
      icon: '🤖',
      title: 'Telegram Боты',
      subtitle: 'Автоматизация бизнеса',
      features: [
        { icon: '⚡', title: 'Mini Apps', desc: 'Полноценные приложения внутри Telegram' },
        { icon: '💬', title: 'Чат-боты', desc: 'Умные помощники для клиентов' },
        { icon: '🎯', title: 'Интеграции', desc: 'Связь с CRM, платежами, API' },
        { icon: '📊', title: 'Аналитика', desc: 'Отслеживание метрик и конверсий' }
      ],
      color: '#0088cc'
    },
    sites: {
      icon: '🌐',
      title: 'Веб-приложения',
      subtitle: 'Цифровые решения',
      features: [
        { icon: '🎨', title: 'Лендинги', desc: 'Продающие одностраничники' },
        { icon: '🏢', title: 'Корпоративные сайты', desc: 'Презентация вашего бизнеса' },
        { icon: '🛒', title: 'Интернет-магазины', desc: 'E-commerce решения' },
        { icon: '⚙️', title: 'SaaS платформы', desc: 'Сложные веб-сервисы' }
      ],
      color: '#FF6B6B'
    }
  };

  const current = services[activeTab];

  return (
    <section className="what-we-do-section">
      <div className="what-we-do-container">
        {/* Заголовок */}
        <div className="section-intro fade-on-scroll">
          <h2 className="section-main-title">Что мы разрабатываем</h2>
          <p className="section-main-subtitle">
            Создаём цифровые продукты, которые решают бизнес-задачи
          </p>
        </div>

        {/* Переключатель */}
        <div className="service-switcher fade-on-scroll">
          <button
            className={`switcher-tab ${activeTab === 'bots' ? 'active' : ''}`}
            onClick={() => setActiveTab('bots')}
            style={{ '--accent-color': services.bots.color }}
          >
            <span className="tab-icon">{services.bots.icon}</span>
            <span className="tab-text">Telegram Боты</span>
          </button>
          <button
            className={`switcher-tab ${activeTab === 'sites' ? 'active' : ''}`}
            onClick={() => setActiveTab('sites')}
            style={{ '--accent-color': services.sites.color }}
          >
            <span className="tab-icon">{services.sites.icon}</span>
            <span className="tab-text">Веб-сайты</span>
          </button>
          <div 
            className="switcher-indicator"
            style={{
              transform: activeTab === 'bots' ? 'translateX(0)' : 'translateX(100%)',
              backgroundColor: current.color
            }}
          />
        </div>

        {/* Контент */}
        <div className="service-content" key={activeTab}>
          <div className="content-header fade-on-scroll">
            <div className="header-icon" style={{ backgroundColor: current.color }}>
              {current.icon}
            </div>
            <div className="header-text">
              <h3 className="content-title">{current.title}</h3>
              <p className="content-subtitle">{current.subtitle}</p>
            </div>
          </div>

          <div className="features-grid">
            {current.features.map((feature, index) => (
              <div 
                className="feature-card fade-on-scroll" 
                key={index}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  '--feature-color': current.color 
                }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h4 className="feature-title">{feature.title}</h4>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="cta-block fade-on-scroll">
            <button 
              className="cta-button"
              style={{ 
                background: `linear-gradient(135deg, ${current.color}, ${current.color}dd)` 
              }}
              onClick={() => {
                window.dispatchEvent(new CustomEvent('navigate', { detail: 'contacts' }));
              }}
            >
              <span>Обсудить проект</span>
              <span className="cta-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
