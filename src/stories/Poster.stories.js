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

export const Movie = Template.bind({})
Movie.args = {
  src: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hBak1pn5pbI4ycAbrgMMn1YI7P1.jpg',
  alt: 'Harry Potter et la Coupe de Feu',
}

export const MovieBig = Template.bind({})
MovieBig.args = {
  $size: 'big',
  src: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hBak1pn5pbI4ycAbrgMMn1YI7P1.jpg',
  alt: 'Harry Potter et la Coupe de Feu',
}
