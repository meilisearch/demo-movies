import React from 'react'
import DesktopCountrySwitcher from 'components/CountrySwitcher/DesktopCountrySwitcher'
import Typography from 'components/Typography'
import { LanguageProvider } from 'context/LanguageContext.ts'
import { LANGUAGES } from 'data/constants'

export default {
  title: 'Components/CountrySwitcher',
  component: DesktopCountrySwitcher,
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
      <DesktopCountrySwitcher {...args} />
    </LanguageProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  href: '/',
  children: <Typography>I’m a CountrySwitcher</Typography>,
}
