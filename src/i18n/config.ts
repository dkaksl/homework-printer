import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources } from './translation'

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false // not needed for react as it escapes by default
  },
  resources
})
