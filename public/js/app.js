// Main application entry point
import { tg } from './modules/telegram.js';
import { initNavigation, switchPage } from './modules/navigation.js';

// Export tg for use in other modules
window.tg = tg;

// Initialize app on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    console.log('Naex Agency app initialized');
});

// Note: Brief forms, portfolio switcher, and slider code
// will be added as separate modules in the future
