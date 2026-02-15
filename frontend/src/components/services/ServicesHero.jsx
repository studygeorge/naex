import React from 'react';
import { AuroraText } from '../ui/AuroraText';
import '../../styles/services/services-hero.css';

const ServicesHero = () => {
  return (
    <section className="services-hero">
      {/* Контент поверх фона */}
      <div className="services-hero-content">
        <h1 className="services-hero-title">
          Создаём{' '}
          <AuroraText 
            colors={['#00c8ffff', '#fefefeff', '#e5ff00ff', '#ff00eaff']}
            speed={1.2}
          >
            цифровые продукты
          </AuroraText>
          ,<br />
          которые работают
        </h1>

        <p className="services-hero-description">
          Разработка Telegram Mini Apps и веб-приложений с гарантией результата
        </p>

        <div className="services-hero-buttons">
          <button 
            className="btn-primary-hero"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('navigate', { detail: 'contacts' }));
            }}
          >
            <span className="btn-text">Обсудить проект</span>
            <span className="btn-icon">→</span>
          </button>

          <button 
            className="btn-secondary-hero"
            onClick={() => {
              document.querySelector('.studio-rotating-banner')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            <span className="btn-text">Наши услуги</span>
            <span className="btn-icon">↓</span>
          </button>
        </div>
      </div>

      {/* Декоративные элементы */}
      <div className="hero-decorations">
        <div className="decoration-circle decoration-1"></div>
        <div className="decoration-circle decoration-2"></div>
        <div className="decoration-circle decoration-3"></div>
      </div>
    </section>
  );
};

export default ServicesHero;
