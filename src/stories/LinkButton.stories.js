import React from 'react'
import LinkButton from 'components/LinkButton'
import Typography from 'components/Typography'

export default {
  title: 'Components/LinkButton',
  component: LinkButton,
  parameters: {
    layout: 'padded',
  },
}

const Template = args => <LinkButton {...args} />

export const Default = Template.bind({})
Default.args = {
  href: '/',
  children: <Typography>I’m a LinkButton</Typography>,
}
