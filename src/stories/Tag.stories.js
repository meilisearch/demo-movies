import React from 'react'
import Tag from 'components/Tag'

export default {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'padded',
  },
}

const Template = args => <Tag {...args} />

export const Default = Template.bind({})
Default.args = {
  tag: 'Thriller',
}
