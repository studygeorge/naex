import React from 'react';
import RotatingText from '../ui/RotatingText';
import '../../styles/services/rotating-banner.css';

const StudioRotatingBanner = () => {
  const rotatingWords = [
    'продукты',
    'Mini Apps',
    'веб-сервисы',
    'CRM-системы',
    'приложения',
    'боты'
  ];

  return (
    <div className="studio-rotating-banner">
      <div className="rotating-banner-container">
        <h2 className="rotating-banner-heading">
          <span className="fixed-word">Создаём</span>
          <span className="rotating-word-box">
            <RotatingText
              texts={rotatingWords}
              mainClassName="rotating-banner-text"
              splitLevelClassName="rotating-banner-word"
              elementLevelClassName="rotating-banner-char"
              staggerFrom="last"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-120%' }}
              staggerDuration={0.025}
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              rotationInterval={2500}
            />
          </span>
        </h2>
      </div>
    </div>
  );
};

export default StudioRotatingBanner;
