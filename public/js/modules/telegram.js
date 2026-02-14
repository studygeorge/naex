// Telegram WebApp initialization
export const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Apply Telegram theme colors
document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#f8fafc');
document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#1e293b');
document.documentElement.style.setProperty('--tg-theme-hint-color', tg.themeParams.hint_color || '#64748b');
document.documentElement.style.setProperty('--tg-theme-link-color', tg.themeParams.link_color || '#0088cc');
document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#0088cc');
document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color || '#ffffff');
