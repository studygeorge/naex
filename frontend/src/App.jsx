import { useState, useEffect } from 'react';
import { initTelegram } from './utils/telegram';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactsPage from './pages/ContactsPage';

// Import styles
import './styles/variables.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/sections.css';
import './styles/responsive.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showBrief, setShowBrief] = useState(false);

  useEffect(() => {
    initTelegram();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Reset scroll of the new page
    const pageElement = document.getElementById(`page-${page}`);
    if (pageElement) {
      pageElement.scrollTop = 0;
    }
  };

  const handleOpenBrief = () => {
    setShowBrief(true);
  };

  const handleCloseBrief = () => {
    setShowBrief(false);
  };

  return (
    <div className="App">
      <Header onOpenBrief={handleOpenBrief} />
      
      <main className="main-content">
        <div className={`page ${currentPage === 'home' ? 'active' : ''}`}>
          <HomePage onOpenBrief={handleOpenBrief} onNavigate={handlePageChange} />
        </div>
        <div className={`page ${currentPage === 'services' ? 'active' : ''}`}>
          <ServicesPage />
        </div>
        <div className={`page ${currentPage === 'portfolio' ? 'active' : ''}`}>
          <PortfolioPage />
        </div>
        <div className={`page ${currentPage === 'contacts' ? 'active' : ''}`}>
          <ContactsPage />
        </div>
      </main>
      
      <BottomNav currentPage={currentPage} onPageChange={handlePageChange} />
      
      {/* Brief Modal - TODO */}
      {showBrief && (
        <div className="brief-modal" onClick={handleCloseBrief}>
          <div className="brief-content" onClick={(e) => e.stopPropagation()}>
            <button className="brief-close" onClick={handleCloseBrief}>×</button>
            <h2>Обсудить проект</h2>
            <p>Форма брифа будет добавлена позже</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
