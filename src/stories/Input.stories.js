import React from 'react'

import Input from 'components/Input'

export default {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
}

export const Default = () => {
  const [value, setValue] = React.useState()

  return (
    <Input
      type="search"
      value={value}
      onChange={e => setValue(e.target.value)}
      clear={() => setValue('')}
      style={{ maxWidth: 300 }}
    />
  )
}
