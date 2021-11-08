import React from 'react'
import styled from 'styled-components'
import Poster from 'components/Poster'

export default {
  title: 'Components/Poster',
  component: Poster,
  parameters: {
    layout: 'padded',
  },
}

// Workaround for Next/Image not working in Storybook
const StyledPoster = styled(Poster)`
  img {
    object-fit: cover;
    width: 100%;
  }
`

const Template = args => <StyledPoster {...args} />

export const Default = Template.bind({})
Default.args = {
  src: 'https://image.tmdb.org/t/p/w780/fECBtHlr0RB3foNHDiCBXeg9Bv9.jpg',
  alt: 'Harry Potter et la Coupe de Feu',
  style: { height: 600 },
}
