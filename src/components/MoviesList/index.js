/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styled from 'styled-components'
import { Hits as ISHits } from 'react-instantsearch'
import { useTranslation } from 'next-i18next'
import get from 'utils/get'
import Container from 'components/Container'
import Infos from './Infos'
import { useDialogState } from 'reakit/Dialog'
import MovieModalContent from './MovieModalContent'
import Card from 'components/Card'
import { DialogDisclosure } from 'components/Dialog'
import { MovieContext, MovieContextProvider } from '~/context/MovieContext'
import Typography from '~/components/Typography'

const Hits = styled(ISHits)`
  ol {
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
  margin: 16px -10px 0;
  padding: 18px 10px;
  @media (min-width: ${get('breakpoints.desktop')}) {
    border-radius: 12px;
    padding: 40px 80px;
    margin: 0 auto;
  }
`

const Disclosure = styled(DialogDisclosure)`
  transform: scale(1);
  &:hover,
  &:focus {
    transform: scale(1.05);
  }
  transition: transform 300ms;
`

const MoviesList = () => {
  const { t } = useTranslation('common')
  const [movie, setMovie] = React.useState(null)
  const { currentMovie } = React.useContext(MovieContext)
  const dialog = useDialogState()
  const cardsRef = React.useRef([])

  React.useEffect(() => {
    if (currentMovie && !dialog.visible) {
      const timer = setTimeout(() => {
        cardsRef.current[currentMovie.objectID].focus()
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [dialog.visible])

  return (
    <MovieContextProvider
      value={{ currentMovie: movie, setCurrentMovie: setMovie }}
    >
      <Wrapper as="section">
        <Infos title={t('movies')} />
        <Hits
          hitComponent={({ hit }) => (
            <Disclosure
              ref={ref => (cardsRef.current[hit.objectID] = ref)}
              {...dialog}
              onClick={() => {
                setMovie(hit)
              }}
            >
              <Card {...hit} />
            </Disclosure>
          )}
        />
        <div className="flex mt-8 justify-center">
          <Typography
            variant="typo4"
            style={{ color: 'var(--text-color-secondary)' }}
          >
            Only showing the first 20 results.
          </Typography>
        </div>
        <MovieModalContent hit={movie} dialog={dialog} />
      </Wrapper>
    </MovieContextProvider>
  )
}

export default MoviesList
