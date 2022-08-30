import React from 'react'
import styled from 'styled-components'
import get from 'utils/get'
import LanguageContext from 'context/LanguageContext'
import { LANGUAGES } from 'data/constants'
import Radio from 'components/Radio'
import { useRadioState, RadioGroup } from 'reakit/Radio'

const Container = styled.div`
  display: block;
  @media (min-width: ${get('breakpoints.desktop')}) {
    display: none;
  }
`

const Group = styled(RadioGroup)`
  label + label {
    margin-top: 20px;
  }
`

const MobileSwitcher = () => {
  const { selectedLanguage, setSelectedLanguage } =
    React.useContext(LanguageContext)
  const radioState = useRadioState({ state: selectedLanguage.code })

  const handleLanguageSelection = newSelectedLanguage => {
    setSelectedLanguage(newSelectedLanguage)
  }

  return (
    <Container>
      <Group aria-label="countries">
        {LANGUAGES.map(data => (
          <Radio
            key={data.code}
            radioState={radioState}
            title={data.countryName}
            value={data.code}
            icon={`/images/flags/${data.code}.png`}
            onClick={() => handleLanguageSelection(data)}
          />
        ))}
      </Group>
    </Container>
  )
}

export default MobileSwitcher
