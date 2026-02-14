import React from 'react';

const ServicesPage = () => {
  return (
    <div className="page" id="page-services">
      <section className="section">
        <h2 className="section-title">Наши услуги</h2>
        <p className="section-subtitle">Комплексные решения для вашего бизнеса</p>
        
        <div className="services-grid">
          <div className="service-card">
            <h3>Telegram боты</h3>
            <p>Разработка ботов для автоматизации бизнес-процессов</p>
          </div>
          <div className="service-card">
            <h3>Mini Apps</h3>
            <p>Мини-приложения в Telegram для вашего бизнеса</p>
          </div>
          <div className="service-card">
            <h3>Веб-разработка</h3>
            <p>Создание современных веб-сайтов и приложений</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
