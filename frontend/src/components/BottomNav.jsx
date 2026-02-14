import React, { useEffect, useRef } from 'react';
import { hapticFeedback } from '../utils/telegram';

const BottomNav = ({ currentPage, onPageChange }) => {
  const activeBgRef = useRef(null);
  const navRef = useRef(null);

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'home' },
    { id: 'services', label: 'Услуги', icon: 'business_center' },
    { id: 'portfolio', label: 'Портфолио', icon: 'folder' },
    { id: 'contacts', label: 'Контакты', icon: 'mail' }
  ];

  useEffect(() => {
    updateActiveBackground();
  }, [currentPage]);

  const updateActiveBackground = () => {
    const activeBg = activeBgRef.current;
    const bottomNav = navRef.current;
    
    if (!activeBg || !bottomNav) return;

    const activeItem = bottomNav.querySelector(`[data-section="${currentPage}"]`);
    if (!activeItem) return;

    const containerRect = bottomNav.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const leftOffset = itemRect.left - containerRect.left;
    const padding = 4;

    activeBg.style.left = `${leftOffset + padding}px`;
    activeBg.style.width = `${itemRect.width - (padding * 2)}px`;
  };

  const handleClick = (pageId) => {
    hapticFeedback('light');
    onPageChange(pageId);
  };

  return (
    <nav className="bottom-nav" ref={navRef}>
      <div className="nav-active-bg" ref={activeBgRef}></div>
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
          data-section={item.id}
          onClick={() => handleClick(item.id)}
        >
          <span className="material-icons-round">{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </nav>
  );
};

export default BottomNav;
