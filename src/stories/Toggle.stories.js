import React from 'react'
import Toggle from 'components/Toggle'

export default {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'padded',
  },
}

export const Default = () => {
  const [currentTheme, setCurrentTheme] = React.useState(
    localStorage.getItem('theme') || 'dark'
  )

  const toggleFunction = async newTheme => {
    document.body.classList.remove(currentTheme)
    localStorage.setItem('theme', newTheme)
    setCurrentTheme(newTheme)
    document.body.classList.add(newTheme)
  }

  return <Toggle onChange={toggleFunction} />
}
