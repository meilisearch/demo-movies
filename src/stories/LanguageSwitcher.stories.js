import React from 'react'
import LanguageSwitcher from 'components/LanguageSwitcher'
import Typography from 'components/Typography'
import { LanguageProvider } from 'context/LanguageContext'
import { LANGUAGES } from 'data/constants'

export default {
  title: 'Components/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    layout: 'padded',
  },
}

const Template = args => {
  const [selectedLanguage, setSelectedLanguage] = React.useState(
    LANGUAGES.find(e => e.code === 'en-US')
  )
  return (
    <LanguageProvider value={{ selectedLanguage, setSelectedLanguage }}>
      <LanguageSwitcher {...args} />
    </LanguageProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  href: '/',
  children: <Typography>I’m a LanguageSwitcher</Typography>,
}
