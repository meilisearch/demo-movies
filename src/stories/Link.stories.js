import React from 'react'
import Link from 'components/Link'

export default {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'padded',
  },
}

const Template = args => <Link {...args} />

export const Defaut = Template.bind({})
Defaut.args = {
  children: 'I am a link',
  href: 'https://www.meilisearch.com/',
}
