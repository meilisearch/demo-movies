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

export const H1 = Template.bind({})
H1.args = {
  children: 'I’m the h1 variant',
  variant: 'h1',
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

export const Typo2 = Template.bind({})
Typo2.args = {
  children: 'I’m the typo2 variant',
  variant: 'typo2',
}

export const Typo3 = Template.bind({})
Typo3.args = {
  children: 'I’m the typo3 variant',
  variant: 'typo3',
}

export const Typo4 = Template.bind({})
Typo4.args = {
  children: 'I’m the typo4 variant',
  variant: 'typo4',
}
