import { tg } from './telegram.js';

// Current page state
let currentPage = 'home';

// Navigation function - switch between pages
export function switchPage(pageName) {
    // Haptic feedback
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
    
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show target page and reset its scroll
    const targetPage = document.getElementById(`page-${pageName}`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageName;
        
        // Reset scroll of the page container
        targetPage.scrollTop = 0;
        
        setTimeout(() => {
            targetPage.scrollTop = 0;
        }, 0);
        
        setTimeout(() => {
            targetPage.scrollTop = 0;
        }, 100);
    }
    
    // Update navigation
    updateActiveNav(pageName);
}

// Update active navigation button
export function updateActiveNav(pageName) {
    const navItems = document.querySelectorAll('.nav-item');
    const activeBg = document.querySelector('.nav-active-bg');
    const bottomNav = document.querySelector('.bottom-nav');
    
    if (!activeBg || !bottomNav) return;
    
    navItems.forEach((item, index) => {
        const section = item.getAttribute('data-section');
        
        if (section === pageName) {
            item.classList.add('active');
            
            const containerRect = bottomNav.getBoundingClientRect();
            const itemRect = item.getBoundingClientRect();
            const leftOffset = itemRect.left - containerRect.left;
            const padding = 4;
            
            activeBg.style.left = `${leftOffset + padding}px`;
            activeBg.style.width = `${itemRect.width - (padding * 2)}px`;
        } else {
            item.classList.remove('active');
        }
    });
}

// Initialize navigation
export function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            switchPage(section);
        });
        
        item.addEventListener('touchstart', function(e) {
            this.style.opacity = '0.7';
        });
        
        item.addEventListener('touchend', function(e) {
            this.style.opacity = '1';
        });
    });
    
    const activeItem = document.querySelector('.nav-item.active');
    if (activeItem) {
        updateActiveNav('home');
    }
}

// Make functions available globally for inline handlers
window.switchPage = switchPage;
window.scrollToSection = switchPage; // Legacy function
