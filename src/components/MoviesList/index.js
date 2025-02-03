/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styled from 'styled-components'
import { Configure, Hits as ISHits } from 'react-instantsearch'
import { useTranslation } from 'next-i18next'
import get from 'utils/get'
import Infos from './Infos'
import Card from 'components/Card'
import { DialogDisclosure } from 'components/Dialog'
import { MovieContext } from '~/context/MovieContext'

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
  const { setCurrentMovie, dialog } = React.useContext(MovieContext)
  const cardsRef = React.useRef([])

  return (
    <>
      <Infos title={t('results.label')} />
      <Configure hitsPerPage={8} />
      <Hits
        className="mb-8"
        hitComponent={({ hit }) => (
          <Disclosure
            ref={ref => (cardsRef.current[hit.objectID] = ref)}
            {...dialog}
            onClick={() => {
              setCurrentMovie(hit)
            }}
          >
            <Card {...hit} />
          </Disclosure>
        )}
      />
    </>
  )
}

export default MoviesList
