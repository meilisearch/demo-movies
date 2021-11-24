import React from 'react'
import styled from 'styled-components'
import { Hits as ISHits } from 'react-instantsearch-dom'
import { useTranslation } from 'next-i18next'
import get from 'utils/get'
import Container from 'components/Container'
import Infos from './Infos'
import MovieCard from './MovieCard'
import { useDialogState } from 'reakit/Dialog'
import MovieModalContent from './MovieModalContent'

const Hits = styled(ISHits)`
  ul {
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 11px;
    @media (min-width: ${get('breakpoints.desktop')}) {
      grid-template-columns: repeat(8, 1fr);
      grid-gap: 20px;
    }
  }
  li {
    list-style-type: none;
  }
`

const Wrapper = styled(Container)`
  background-color: var(--results-bg);
  transition: background-color 300ms;
  box-shadow: 0px 0px 64px rgba(0, 0, 0, 0.06);
  margin: ${get('spacing.4')} -${get('spacing[2.5]')} 0;
  padding: 18px ${get('spacing[2.5]')};
  @media (min-width: ${get('breakpoints.desktop')}) {
    border-radius: 12px;
    padding: 40px 80px;
    margin: 0 auto;
  }
`

const MoviesList = () => {
  const { t } = useTranslation('common')
  const [currentMovie, setCurrentMovie] = React.useState()
  const dialog = useDialogState({ animated: true })

  return (
    <Wrapper>
      <Infos title={t('movies')} />
      <Hits
        hitComponent={({ hit }) => (
          <MovieCard
            hit={hit}
            setCurrentMovie={setCurrentMovie}
            dialog={dialog}
          />
        )}
      />
      <MovieModalContent hit={currentMovie} dialog={dialog} />
    </Wrapper>
  )
}

export default MoviesList
