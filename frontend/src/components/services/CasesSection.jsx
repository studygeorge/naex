import React, { useState } from 'react';
import '../../styles/services/cases-section.css';

const CasesSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const cases = [
    {
      id: 1,
      category: 'telegram',
      title: 'Telegram Mini App для e-commerce',
      description: 'Полнофункциональный магазин внутри Telegram с интеграцией платежей',
      image: '🛒',
      metrics: [
        { label: 'Конверсия', value: '+340%' },
        { label: 'Пользователей', value: '50K+' },
        { label: 'Время разработки', value: '6 недель' }
      ],
      color: '#0088cc'
    },
    {
      id: 2,
      category: 'web',
      title: 'SaaS платформа для бизнеса',
      description: 'Облачный сервис автоматизации бизнес-процессов с AI',
      image: '💼',
      metrics: [
        { label: 'Экономия времени', value: '-70%' },
        { label: 'ROI', value: '280%' },
        { label: 'Пользователей', value: '1200+' }
      ],
      color: '#FF6B6B'
    },
    {
      id: 3,
      category: 'telegram',
      title: 'CRM-бот для автоматизации продаж',
      description: 'Умный бот для управления клиентами и сделками',
      image: '📊',
      metrics: [
        { label: 'Автоматизация', value: '95%' },
        { label: 'Сделок/день', value: '500+' },
        { label: 'Окупаемость', value: '3 мес' }
      ],
      color: '#00D4FF'
    },
    {
      id: 4,
      category: 'web',
      title: 'Корпоративный портал',
      description: 'Внутренний портал для компании с 2000+ сотрудников',
      image: '🏢',
      metrics: [
        { label: 'Сотрудников', value: '2000+' },
        { label: 'Время внедрения', value: '8 недель' },
        { label: 'Удовлетворённость', value: '98%' }
      ],
      color: '#8B5CF6'
    }
  ];

  const filters = [
    { id: 'all', label: 'Все проекты', icon: '🎯' },
    { id: 'telegram', label: 'Telegram', icon: '🤖' },
    { id: 'web', label: 'Web', icon: '🌐' }
  ];

  const filteredCases = activeFilter === 'all' 
    ? cases 
    : cases.filter(c => c.category === activeFilter);

  return (
    <section className="cases-section">
      <div className="cases-container">
        {/* Заголовок */}
        <div className="cases-intro">
          <h2 className="cases-main-title">Наши кейсы</h2>
          <p className="cases-main-subtitle">
            Реальные проекты с измеримыми результатами
          </p>
        </div>

        {/* Фильтры */}
        <div className="cases-filters">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              <span className="filter-icon">{filter.icon}</span>
              <span className="filter-label">{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Сетка кейсов */}
        <div className="cases-grid">
          {filteredCases.map((caseItem, index) => (
            <div 
              className="case-card"
              key={caseItem.id}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                '--case-color': caseItem.color 
              }}
            >
              <div className="case-image" style={{ backgroundColor: caseItem.color }}>
                <span className="case-emoji">{caseItem.image}</span>
              </div>
              
              <div className="case-content">
                <h3 className="case-title">{caseItem.title}</h3>
                <p className="case-description">{caseItem.description}</p>
                
                <div className="case-metrics">
                  {caseItem.metrics.map((metric, idx) => (
                    <div className="metric-item" key={idx}>
                      <div className="metric-value">{metric.value}</div>
                      <div className="metric-label">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                className="case-cta"
                style={{ backgroundColor: caseItem.color }}
              >
                Подробнее →
              </button>
            </div>
          ))}
        </div>

        {/* CTA блок */}
        <div className="cases-cta-block">
          <h3 className="cta-title">Готовы создать свой успешный проект?</h3>
          <button 
            className="cases-main-cta"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('navigate', { detail: 'contacts' }));
            }}
          >
            <span>Начать проект</span>
            <span className="cta-icon">🚀</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
