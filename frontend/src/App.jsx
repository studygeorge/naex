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
        <div className={`page ${currentPage === 'home' ? 'active' : ''}`} id="page-home">
          <HomePage onOpenBrief={handleOpenBrief} onNavigate={handlePageChange} />
        </div>
        <div className={`page ${currentPage === 'services' ? 'active' : ''}`} id="page-services">
          <ServicesPage />
        </div>
        <div className={`page ${currentPage === 'portfolio' ? 'active' : ''}`} id="page-portfolio">
          <PortfolioPage />
        </div>
        <div className={`page ${currentPage === 'contacts' ? 'active' : ''}`} id="page-contacts">
          <ContactsPage />
        </div>
      </main>
      
      <BottomNav currentPage={currentPage} onPageChange={handlePageChange} />
      
      {/* Brief Modal */}
      {showBrief && (
        <div className="brief-modal active" onClick={handleCloseBrief}>
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
