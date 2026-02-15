import React from 'react';
import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack';
import '../../styles/services/services-stack.css';

const ServicesStack = () => (
  <div className="services-stack-wrapper">
    <ScrollStack 
      useWindowScroll={true}  // ✅ Используем общий скролл страницы
      itemDistance={150}
      itemStackDistance={40}
      stackPosition="20%"
      itemScale={0.03}
      baseScale={0.85}
    >
      <ScrollStackItem>
        <h2 className="stack-card-title">Telegram Mini Apps</h2>
        <p className="stack-card-text">
          Создаём интерактивные приложения внутри Telegram с полным функционалом веб-сервисов
        </p>
      </ScrollStackItem>
      
      <ScrollStackItem>
        <h2 className="stack-card-title">Веб-приложения</h2>
        <p className="stack-card-text">
          Разрабатываем современные веб-сервисы с адаптивным дизайном и высокой производительностью
        </p>
      </ScrollStackItem>
      
      <ScrollStackItem>
        <h2 className="stack-card-title">CRM системы</h2>
        <p className="stack-card-text">
          Автоматизируем бизнес-процессы и управление клиентской базой
        </p>
      </ScrollStackItem>
      
      <ScrollStackItem>
        <h2 className="stack-card-title">API интеграции</h2>
        <p className="stack-card-text">
          Связываем различные сервисы и системы для бесшовной работы вашего бизнеса
        </p>
      </ScrollStackItem>
    </ScrollStack>
  </div>
);

export default ServicesStack;
