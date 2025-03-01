import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Tài nguyên ngôn ngữ
const resources = {
  en: {
    translation: {
      welcome: 'Welcome',
      changeLanguage: 'Change Language',
      english: 'English',
      vietnamese: 'Vietnamese',
    },
  },
  vi: {
    translation: {
      welcome: 'Chào mừng',
      changeLanguage: 'Thay đổi ngôn ngữ',
      english: 'Tiếng Anh',
      vietnamese: 'Tiếng Việt',
    },
  },
};

i18n
  .use(LanguageDetector) // Tự động phát hiện ngôn ngữ
  .use(initReactI18next) // Khởi tạo i18next cho React
  .init({
    resources,
    fallbackLng: 'en', // Ngôn ngữ mặc định
    interpolation: {
      escapeValue: false, // Không cần escape HTML
    },
  });

export default i18n;