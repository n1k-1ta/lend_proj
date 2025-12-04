import { useEffect, useRef } from 'react';
import styles from './ThemeSwitcher.module.css';

const THEME_KEY = 'theme';

/**
 * Checks for support of the CSS :has() selector
 * @returns {boolean} 'true' if supported, 'false' if not
 */
function supportsHasSelector() {
  try {
    return CSS.supports('selector(:has(*))');
  } catch (error) {
    return false;
  }
}

/**
 * Saves the current theme state to localStorage
 * @param {string} theme - 'dark' or 'light'
 */
function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.warn('Не удалось сохранить тему в localStorage:', error);
  }
}

/**
 * Loads the saved theme from localStorage
 * @returns {string|null} 'dark', 'light' or null
 */
function loadTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (error) {
    console.warn('Не удалось загрузить тему из localStorage:', error);
    return null;
  }
}

export default function ThemeSwitcher({ theme = 'light', onThemeChange }) {
  const checkboxRef = useRef(null);
  const hasSelectorSupported = useRef(supportsHasSelector());
  const isDark = theme === 'dark';

  // Подключение Font Awesome через CDN
  useEffect(() => {
    const linkId = 'font-awesome-cdn';
    
    // Проверяем, не подключен ли уже Font Awesome
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css';
      link.integrity = 'sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==';
      link.crossOrigin = 'anonymous';
      link.referrerPolicy = 'no-referrer';
      document.head.appendChild(link);
    }
  }, []);

  // Theme initialization on mount - синхронизация с localStorage
  useEffect(() => {
    const savedTheme = loadTheme();
    
    if (savedTheme && savedTheme !== theme && onThemeChange) {
      onThemeChange(savedTheme);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Theme change handler
  const handleChange = (event) => {
    const checked = event.target.checked;
    const newTheme = checked ? 'dark' : 'light';
    
    if (onThemeChange) {
      onThemeChange(newTheme);
    }
    saveTheme(newTheme);
  };

  // Keyboard navigation handler
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const newTheme = isDark ? 'light' : 'dark';
      
      if (onThemeChange) {
        onThemeChange(newTheme);
      }
      saveTheme(newTheme);
      
      if (checkboxRef.current) {
        checkboxRef.current.checked = !isDark;
      }
    }
  };

  return (
    <div className={styles.switchContainer}>
      <input
        ref={checkboxRef}
        type="checkbox"
        id="switch"
        role="switch"
        aria-checked={isDark}
        aria-label="Switch between light and dark theme"
        checked={isDark}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={styles.checkbox}
      />
      <label htmlFor="switch" className={styles.label}>
        <i className={`fas fa-moon ${styles.moon}`}></i>
        <i className={`fas fa-sun ${styles.sun}`}></i>
        <span className={styles.ball}></span>
      </label>
    </div>
  );
}

