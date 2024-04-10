import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Star } from './icons'
import get from '../utils/get'
import { FavoritesContext } from '../context/FavoritesContext'

const StarBlock = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 2rem;
`

const FavoriteIcon = styled(Star)`
  position: relative;
  width: 40px;
  opacity: 100%;
  color: var(--koromiko);

  & path {
    fill: ${p => (p.$favorite ? 'currentColor' : 'gray')};
  }

  @media (min-width: ${get('breakpoints.desktop')}) {
    width: 1.8em;
  }

  transition: transform 0.2s ease; // Smooth transition for the transform property

  // Hover effect: Scale the image
  &:hover {
    transform: scale(1.1); // Adjust scale value as needed
    cursor: pointer;
  }

  // Click effect: Further scale the image
  &.active {
    transform: scale(1.2); // Adjust scale value as needed
  }
`

const Favorite = ({ hit, type = 'movies' }) => {
  const { markFavorite, isFavorited } = useContext(FavoritesContext)
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    setIsFav(!!isFavorited(type, hit.id))
  }, [hit])

  return (
    <StarBlock>
      <FavoriteIcon
        $favorite={isFav}
        onClick={() => {
          setIsFav(!isFav)
          markFavorite(type, hit)
        }}
      />
    </StarBlock>
  )
}

export default Favorite
