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

export const WithText = Template.bind({})
WithText.args = {
  rating: 4.2,
  withText: true,
}

export const Big = Template.bind({})
Big.storyName = 'Size = big (mobile only)'
Big.args = {
  rating: 4.2,
  withText: true,
  size: 'big',
}
