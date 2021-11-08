import React from 'react'
import styled from 'styled-components'
import Card from 'components/Card'

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
}

// Workaround for Next/Image not working in Storybook
const StyledCard = styled(Card)`
  img {
    object-fit: cover;
    width: 100%;
  }
`

const Template = args => <StyledCard {...args} />

export const Movie = Template.bind({})
Movie.args = {
  title: 'Batman, The Dark Knight',
  poster_path:
    'https://image.tmdb.org/t/p/w780/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  release_date: '2008-07-14',
  vote_average: 8.5,
  style: { width: 200 },
}
