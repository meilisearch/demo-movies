import React from 'react'
import IconButton from 'components/IconButton'
import { Cross } from 'components/icons'

export default {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'padded',
  },
}

const Template = args => <IconButton {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <Cross width={15} />,
}

export const Rounded = Template.bind({})
Rounded.args = {
  rounded: true,
  children: <Cross width={15} />,
}
