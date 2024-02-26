import React from 'react'
import { LANGUAGES } from 'data/constants'

type Language = (typeof LANGUAGES)[number]

const LanguageContext = React.createContext({
  selectedLanguage: null,
  setSelectedLanguage: (lang: Language) => {}, // eslint-disable-line no-unused-vars
})

export const LanguageProvider = LanguageContext.Provider

export default LanguageContext
