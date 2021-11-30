import React from 'react'
import Poster from 'components/Poster'

export default {
  title: 'Components/Poster',
  component: Poster,
  parameters: {
    layout: 'padded',
  },
}

const Template = args => <Poster {...args} />

export const Default = Template.bind({})
Default.args = {
  src: 'https://image.tmdb.org/t/p/w780/fECBtHlr0RB3foNHDiCBXeg9Bv9.jpg',
  alt: 'Harry Potter et la Coupe de Feu',
  style: { height: 600 },
}
