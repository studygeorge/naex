// Telegram WebApp utilities
export const tg = window.Telegram?.WebApp || {
  ready: () => {},
  expand: () => {},
  HapticFeedback: {
    impactOccurred: () => {}
  },
  themeParams: {}
};

export const initTelegram = () => {
  tg.ready();
  tg.expand();
  
  // Apply Telegram theme colors
  const setThemeVar = (name, value, fallback) => {
    document.documentElement.style.setProperty(
      name,
      value || fallback
    );
  };
  
  setThemeVar('--tg-theme-bg-color', tg.themeParams.bg_color, '#f8fafc');
  setThemeVar('--tg-theme-text-color', tg.themeParams.text_color, '#1e293b');
  setThemeVar('--tg-theme-hint-color', tg.themeParams.hint_color, '#64748b');
  setThemeVar('--tg-theme-link-color', tg.themeParams.link_color, '#0088cc');
  setThemeVar('--tg-theme-button-color', tg.themeParams.button_color, '#0088cc');
  setThemeVar('--tg-theme-button-text-color', tg.themeParams.button_text_color, '#ffffff');
};

export const hapticFeedback = (type = 'light') => {
  if (tg.HapticFeedback) {
    tg.HapticFeedback.impactOccurred(type);
  }
};
