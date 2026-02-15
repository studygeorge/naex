import React from 'react';

// Импорт компонентов
import Iridescence from '../components/ui/Iridescence';
import ServicesHero from '../components/services/ServicesHero';
import StudioRotatingBanner from '../components/services/StudioRotatingBanner';
import ServicesStack from '../components/services/ServicesStack';
import WhatWeDo from '../components/services/WhatWeDo';
import CasesSection from '../components/services/CasesSection'; // ✅ НОВЫЙ РАЗДЕЛ

// Импорт стилей
import '../styles/services/services-page.css';

const ServicesPage = () => {
  return (
    <div className="services-page">
      {/* ✅ Единый фиксированный фон Iridescence */}
      <div className="services-page-background">
        <Iridescence
          color={[0.0, 0.5, 0.7]}
          speed={0.6}
          amplitude={0.2}
          mouseReact={true}
        />
      </div>

      {/* ✅ Контент поверх фона */}
      <div className="services-page-content">
        <ServicesHero />
        <StudioRotatingBanner />
        <ServicesStack />
        <WhatWeDo /> {/* 4-й раздел */}
        <CasesSection /> {/* ✅ 5-й раздел - КЕЙСЫ */}
      </div>
    </div>
  );
};

export default ServicesPage;
