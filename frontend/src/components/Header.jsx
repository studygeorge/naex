import React from 'react';

const Header = ({ onOpenBrief }) => {
  return (
    <header className="header">
      <div className="logo">Naex</div>
      <button className="header-cta" onClick={onOpenBrief}>
        Обсудить проект
      </button>
    </header>
  );
};

export default Header;
