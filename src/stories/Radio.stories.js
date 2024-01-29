import React from 'react'
import Radio from 'components/Radio'
import { useRadioState, RadioGroup } from 'reakit/Radio'
import { LANGUAGES } from 'constants.ts'

export default {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'padded',
  },
}

export const Default = () => {
  const radioState = useRadioState()

  return (
    <RadioGroup aria-label="fruits">
      <Radio radioState={radioState} title="orange" value="orange" />
      <Radio radioState={radioState} title="apple" value="apple" />
      <Radio radioState={radioState} title="banana" value="banana" />
    </RadioGroup>
  )
}

export const WithIcon = () => {
  const radioState = useRadioState()

  return (
    <RadioGroup aria-label="countries">
      {LANGUAGES.map(data => (
        <Radio
          key={data.code}
          radioState={radioState}
          title={data.countryName}
          value={data.countryName}
          icon={`/images/flags/${data.code}.png`}
        />
      ))}
    </RadioGroup>
  )
}
