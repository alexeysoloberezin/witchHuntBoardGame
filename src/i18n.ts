import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'

const i18n = createI18n({
    locale: 'ja', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages: en, // set locale messages
})

export default i18n;