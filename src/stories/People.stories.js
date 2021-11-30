import React from 'react'
import styled from 'styled-components'
import People from 'components/People'

export default {
  title: 'Components/People',
  component: People,
  parameters: {
    layout: 'padded',
  },
}

const StyledPeople = styled(People)`
  img {
    width: 100%;
  }
`

const Template = args => (
  <div style={{ width: 100, height: 100 }}>
    <StyledPeople {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  people: {
    character: 'Jake Sully',
    name: 'Sam Worthington',
    profile_path: '/vM1WIfYQ1HUBtlVPwB9Hp9fLcn8.jpg',
    style: { width: 'auto' },
  },
}
