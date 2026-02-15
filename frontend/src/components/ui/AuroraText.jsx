import React from 'react';
import './AuroraText.css';

export function AuroraText({ 
  children, 
  className = '', 
  colors = ['#ffffffff', '#ff8800ff', '#f2ff00ff', '#84ff00ff'],
  speed = 1 
}) {
  const animationDuration = `${6 / speed}s`;
  
  const gradientColors = colors.join(', ');
  
  return (
    <span 
      className={`aurora-text ${className}`}
      style={{
        '--aurora-colors': gradientColors,
        '--aurora-duration': animationDuration
      }}
    >
      {children}
    </span>
  );
}
