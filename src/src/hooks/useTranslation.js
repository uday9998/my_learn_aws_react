import { useState, useEffect } from 'react';
import translations from '../translations';

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('currentLanguage') || 'en';
  });

  useEffect(() => {
    const handleLanguageChange = () => {
      const savedLanguage = localStorage.getItem('currentLanguage') || 'en';
      setCurrentLanguage(savedLanguage);
    };

    // Listen for language changes
    window.addEventListener('languageChanged', handleLanguageChange);

    // Listen for storage changes (in case language is changed in another tab)
    window.addEventListener('storage', (e) => {
      if (e.key === 'currentLanguage') {
        setCurrentLanguage(e.newValue || 'en');
      }
    });

    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
      window.removeEventListener('storage', handleLanguageChange);
    };
  }, []);

  const t = (key) => {
    const lang = currentLanguage === 'zh-CN' ? 'zh-CN' : currentLanguage;
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  return { t, currentLanguage };
};