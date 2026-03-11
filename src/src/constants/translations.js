// Translation constants for specific UI elements that need multilingual support
// This maps language codes to translations for hardcoded strings

const TRANSLATIONS = {
  en: {
    portal: 'Portal',
    copyright: 'Copyright',
    myPortal: 'My Portal',
    settings: 'Settings', 
    communities: 'My Communities',
    certificates: 'Certificates'
  },
  es: {
    portal: 'Portal',
    copyright: 'Copyright',
    myPortal: 'Mi Portal',
    settings: 'Configuraciones',
    communities: 'Mis Comunidades', 
    certificates: 'Certificados'
  },
  fr: {
    portal: 'Portail',
    copyright: 'Copyright',
    myPortal: 'Mon Portail',
    settings: 'Paramètres',
    communities: 'Mes Communautés',
    certificates: 'Certificats'
  },
  de: {
    portal: 'Portal',
    copyright: 'Copyright',
    myPortal: 'Mein Portal',
    settings: 'Einstellungen',
    communities: 'Meine Gemeinschaften',
    certificates: 'Zertifikate'
  },
  pt: {
    portal: 'Portal',
    copyright: 'Copyright',
    myPortal: 'Meu Portal',
    settings: 'Configurações',
    communities: 'Minhas Comunidades',
    certificates: 'Certificados'
  },
  it: {
    portal: 'Portale',
    copyright: 'Copyright',
    myPortal: 'Il Mio Portale',
    settings: 'Impostazioni',
    communities: 'Le Mie Comunità',
    certificates: 'Certificati'
  },
  ru: {
    portal: 'Портал',
    copyright: 'Copyright',
    myPortal: 'Мой Портал',
    settings: 'Настройки',
    communities: 'Мои Сообщества',
    certificates: 'Сертификаты'
  },
  'zh-CN': {
    portal: '门户',
    copyright: 'Copyright',
    myPortal: '我的门户',
    settings: '设置',
    communities: '我的社区',
    certificates: '证书'
  },
  nl: {
    portal: 'Portaal',
    copyright: 'Copyright',
    myPortal: 'Mijn Portaal',
    settings: 'Instellingen',
    communities: 'Mijn Gemeenschappen',
    certificates: 'Certificaten'
  },
  pl: {
    portal: 'Portal',
    copyright: 'Copyright',
    myPortal: 'Mój Portal',
    settings: 'Ustawienia',
    communities: 'Moje Społeczności',
    certificates: 'Certyfikaty'
  },
  el: {
    portal: 'Πύλη',
    copyright: 'Copyright',
    myPortal: 'Η Πύλη μου',
    settings: 'Ρυθμίσεις',
    communities: 'Οι Κοινότητές μου',
    certificates: 'Πιστοποιητικά'
  },
  af: {
    portal: 'Portaal',
    copyright: 'Copyright',
    myPortal: 'My Portaal',
    settings: 'Instellings',
    communities: 'My Gemeenskappe',
    certificates: 'Sertifikate'
  },
  hy: {
    portal: 'Պորտալ',
    copyright: 'Copyright',
    myPortal: 'Իմ Պորտալը',
    settings: 'Կարգավորումներ',
    communities: 'Իմ Համայնքները',
    certificates: 'Վկայագրեր'
  }
};

// Helper function to get translation
export const getTranslation = (key, locale = 'en') => {
  const currentLocale = locale === 'zh-CN' ? 'zh-CN' : locale;
  return TRANSLATIONS[currentLocale]?.[key] || TRANSLATIONS.en[key] || key;
};

// Helper function to get current language from localStorage or context
export const getCurrentLanguage = () => {
  return localStorage.getItem('currentLanguage') || 'en';
};

export default TRANSLATIONS;