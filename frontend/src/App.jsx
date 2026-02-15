import { useState, useEffect } from 'react';
import { initTelegram } from './utils/telegram';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactsPage from './pages/ContactsPage';

// Import all styles via main.css
import './styles/main.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showBrief, setShowBrief] = useState(false);

  useEffect(() => {
    initTelegram();
    
    // Слушаем кастомное событие навигации
    const handleNavigate = (e) => {
      setCurrentPage(e.detail);
    };
    
    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Сбрасываем скролл к началу
    window.scrollTo(0, 0);
  };

  const handleOpenBrief = () => {
    setShowBrief(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseBrief = () => {
    setShowBrief(false);
    document.body.style.overflow = '';
  };

  return (
    <div className="App">
      <Header onOpenBrief={handleOpenBrief} />
      
      <main className="main-content">
        {/* Рендерим только активную страницу */}
        {currentPage === 'home' && (
          <div className="page active" id="page-home">
            <HomePage onOpenBrief={handleOpenBrief} onNavigate={handlePageChange} />
          </div>
        )}
        {currentPage === 'services' && (
          <div className="page active" id="page-services">
            <ServicesPage />
          </div>
        )}
        {currentPage === 'portfolio' && (
          <div className="page active" id="page-portfolio">
            <PortfolioPage />
          </div>
        )}
        {currentPage === 'contacts' && (
          <div className="page active" id="page-contacts">
            <ContactsPage />
          </div>
        )}
      </main>
      
      <BottomNav currentPage={currentPage} onPageChange={handlePageChange} />
      
      {/* Brief Modal */}
      {showBrief && (
        <div className="brief-modal active" onClick={handleCloseBrief}>
          <div className="brief-content" onClick={(e) => e.stopPropagation()}>
            <button className="brief-close" onClick={handleCloseBrief}>
              <span className="material-icons-round">close</span>
            </button>
            <h2>Обсудить проект</h2>
            <form className="brief-form">
              <div className="form-group">
                <label>Ваше имя</label>
                <input type="text" placeholder="Иван Иванов" required />
              </div>
              <div className="form-group">
                <label>Telegram username</label>
                <input type="text" placeholder="@username" required />
              </div>
              <div className="form-group">
                <label>Тип проекта</label>
                <select required>
                  <option value="">Выберите тип</option>
                  <option value="telegram-bot">Telegram бот</option>
                  <option value="web-app">Веб-приложение</option>
                  <option value="landing">Лендинг</option>
                  <option value="crm">CRM система</option>
                </select>
              </div>
              <div className="form-group">
                <label>Описание задачи</label>
                <textarea rows="4" placeholder="Опишите ваш проект..." required></textarea>
              </div>
              <button type="submit" className="btn-primary">
                Отправить заявку
                <span className="material-icons-round">arrow_forward</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;