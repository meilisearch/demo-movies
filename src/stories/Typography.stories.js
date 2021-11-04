import React from 'react'
import Typography from 'components/Typography'

export default {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
}

const Template = args => <Typography {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'I’m the default variant',
}

export const CardTitle = Template.bind({})
CardTitle.args = {
  children: 'I’m the cardTitle variant',
}

export const Subtitle = Template.bind({})
Subtitle.args = {
  children: 'I’m the subtitle variant',
}
