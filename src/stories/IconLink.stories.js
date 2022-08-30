import React from 'react'
import IconLink from 'components/IconLink'
import { Imdb } from 'components/icons'

export default {
  title: 'Components/IconLink',
  component: IconLink,
  parameters: {
    layout: 'padded',
  },
}

const Template = args => <IconLink {...args} />

export const Default = Template.bind({})
Default.args = {
  link: 'https://www.meilisearch.com/',
  children: <Imdb width={48} height={48} />,
}
