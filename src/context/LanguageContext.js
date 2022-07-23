import React from 'react'

const LanguageContext = React.createContext({
  selectedLanguage: null,
  setSelectedLanguage: () => {},
})

export const LanguageProvider = LanguageContext.Provider

export default LanguageContext
