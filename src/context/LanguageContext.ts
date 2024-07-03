import React, { Dispatch, SetStateAction } from 'react'
import { LANGUAGES } from '~/lib/constants'

type Language = (typeof LANGUAGES)[number]

interface LanguageContextProps {
  selectedLanguage: Language | null
  setSelectedLanguage: Dispatch<SetStateAction<Language | null>>
}

const languageContextDefaultValue: LanguageContextProps = {
  selectedLanguage: null,
  setSelectedLanguage: () => {},
}

const LanguageContext = React.createContext<LanguageContextProps>(
  languageContextDefaultValue
)

export const LanguageProvider = LanguageContext.Provider

export default LanguageContext
