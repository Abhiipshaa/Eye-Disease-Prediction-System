import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en.json'
import hi from './hi.json'
import hg from './hin.json'
import or from './or.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en:  { translation: en },
      hi:  { translation: hi },
      hin: { translation: hg },
      or:  { translation: or },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n