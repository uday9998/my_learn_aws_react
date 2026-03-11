import { useState, useEffect } from 'react';
import { getTranslation, getCurrentLanguage } from 'constants/translations';

// Hook specifically for UI element translations (not content)
// This works with the existing Google Translate system
const useUITranslation = () => {
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage());

  useEffect(() => {
    // Listen for language changes from localStorage
    const handleLanguageChange = () => {
      const newLang = getCurrentLanguage();
      setCurrentLang(newLang);
    };

    // Listen to the custom setItemEvent from MultiLang component
    window.addEventListener('setItemEvent', (e) => {
      if (e.key === 'currentLanguage') {
        setCurrentLang(e.newValue);
      }
    });

    window.addEventListener('storage', handleLanguageChange);

    return () => {
      window.removeEventListener('storage', handleLanguageChange);
    };
  }, []);

  // Translation function
  const t = (key) => {
    return getTranslation(key, currentLang);
  };

  return { t, currentLang };
};

export default useUITranslation;