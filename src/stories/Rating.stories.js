import React from 'react'
import Rating from 'components/Rating'

export default {
  title: 'Components/Rating',
  component: Rating,
  parameters: {
    layout: 'padded',
  },
}

const Template = args => <Rating {...args} />

export const Default = Template.bind({})
Default.args = {
  rating: 4.2,
}
