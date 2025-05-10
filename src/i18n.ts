import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from './locales/zh_CN.json';
import en from './locales/en_US.json';
// 国际化配置
i18n.use(initReactI18next).init({
  resources: {
    zh: {
      translation: zh,
    },
    en: {
      translation: en,
    },
  },
  lng: 'en',
  fallbackLng: 'zh',
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
