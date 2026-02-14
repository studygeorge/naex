import React from 'react';

const HomePage = ({ onOpenBrief, onNavigate }) => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Разрабатываем Telegram-ботов и мини-приложения</h1>
          <p>Запускаем проекты, которые работают на результат. Без лишних слов, только эффективные решения для вашего бизнеса.</p>
          
          <div className="cta-buttons">
            <button className="btn-primary" onClick={onOpenBrief}>
              Начать проект
            </button>
            <button className="btn-secondary" onClick={() => onNavigate('portfolio')}>
              Портфолио
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">4+</div>
              <div className="stat-label">года опыта</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">40+</div>
              <div className="stat-label">проектов</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">92%</div>
              <div className="stat-label">в срок</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* News Slider */}
      <div className="news-slider-wrapper">
        <div className="news-slider-track">
          <div className="news-slide active orange" onClick={onOpenBrief}>
            <div className="slide-content">
              <h3>Telegram Mini App за 14 дней</h3>
              <p>Быстрый запуск вашего мини-приложения</p>
            </div>
            <div className="slide-image">
              <img src="/images/slide1.png" alt="Mini App" onError={(e) => e.target.style.display = 'none'} />
            </div>
          </div>
          <div className="news-slide purple" onClick={onOpenBrief}>
            <div className="slide-content">
              <h3>Скидка 15% на разработку бота</h3>
              <p>Специальное предложение для новых клиентов</p>
            </div>
            <div className="slide-image">
              <img src="/images/slide2.png" alt="Bot" onError={(e) => e.target.style.display = 'none'} />
            </div>
          </div>
          <div className="news-slide blue" onClick={onOpenBrief}>
            <div className="slide-content">
              <h3>Автоматизация бизнес-процессов</h3>
              <p>Telegram-боты для вашего бизнеса</p>
            </div>
            <div className="slide-image">
              <img src="/images/slide3.png" alt="Automation" onError={(e) => e.target.style.display = 'none'} />
            </div>
          </div>
          <div className="news-slide green" onClick={onOpenBrief}>
            <div className="slide-content">
              <h3>Бесплатная консультация по проекту</h3>
              <p>Обсудим ваши задачи и предложим решение</p>
            </div>
            <div className="slide-image">
              <img src="/images/slide4.png" alt="Consultation" onError={(e) => e.target.style.display = 'none'} />
            </div>
          </div>
        </div>
        <div className="slider-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </>
  );
};

export default HomePage;
