import React from 'react'
import styled from 'styled-components'
import Card from 'components/Card'
import { DialogDisclosure } from 'components/Dialog'

const Disclosure = styled(DialogDisclosure)`
  transform: scale(1);
  &:hover,
  &:focus {
    transform: scale(1.05);
  }
  transition: transform 300ms;
`

const MovieCard = ({ hit, setCurrentMovie, dialog, ...props }) => {
  return (
    <Disclosure
      {...dialog}
      onClick={() => {
        setCurrentMovie(hit)
      }}
      {...props}
    >
      <Card {...hit} />
    </Disclosure>
  )
}

export default MovieCard
