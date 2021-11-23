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
  variant: 'cardTitle',
}

export const Subtitle = Template.bind({})
Subtitle.args = {
  children: 'I’m the subtitle variant',
  variant: 'subtitle',
}

export const H2 = Template.bind({})
H2.args = {
  children: 'I’m the h2 variant',
  variant: 'h2',
}

export const H3 = Template.bind({})
H3.args = {
  children: 'I’m the h3 variant',
  variant: 'h3',
}

export const Typo1 = Template.bind({})
Typo1.args = {
  children: 'I’m the typo1 variant',
  variant: 'typo1',
}
