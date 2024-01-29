import React from 'react'
import styled from 'styled-components'
import LanguageContext from 'context/LanguageContext'
import { LANGUAGES } from 'constants.ts'
import Radio from 'components/Radio'
import { useRadioState, RadioGroup } from 'reakit/Radio'

const Container = styled.div`
  margin-right: 21px;
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
    <Container data-cy="country-switcher-mobile">
      <Group aria-label="countries">
        {LANGUAGES.map(data => (
          <Radio
            key={data.code}
            radioState={radioState}
            title={data.countryName}
            value={data.code}
            icon={`/images/flags/${data.code}.png`}
            onChange={() => handleLanguageSelection(data)}
          />
        ))}
      </Group>
    </Container>
  )
}

export default MobileSwitcher
