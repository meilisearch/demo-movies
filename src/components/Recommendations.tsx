import React from 'react'
import { useInstantSearch } from 'react-instantsearch'
import { MovieData } from '~/types'
import { useEffect, useMemo, useState, useContext } from 'react'
import debounce from 'lodash.debounce'
import { useKeywordsMovies } from '~/hooks/useKeywordsMovies'
import Card from './Card'
import get from '~/utils/get'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import Typography from './Typography'
import { DialogDisclosure } from '~/components/Dialog'
import { MovieContext } from '~/context/MovieContext'

const DEBOUNCE_DELAY_MS = 250

const List = styled.ol`
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 11px;
  @media (min-width: ${get('breakpoints.desktop')}) {
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 20px;
  }
`

const ListItem = styled.li`
  list-style-type: none;
`

const Disclosure = styled(DialogDisclosure as any)`
  transform: scale(1);
  &:hover,
  &:focus {
    transform: scale(1.05);
  }
  transition: transform 300ms;
`

export default function Recommendations() {
  const { t } = useTranslation('common')
  const instantSearch = useInstantSearch()
  const [topKeywords, setTopKeywords] = useState<string[]>([])
  const { setCurrentMovie, dialog } = useContext(MovieContext)
  const cardsRef = React.useRef([])

  const keywordsOccurrences = useMemo(() => {
    const movies = instantSearch.results?.hits as MovieData[]
    return (
      movies?.reduce((occurrences: Record<string, number>, movie) => {
        movie.keywords?.forEach(keyword => {
          occurrences[keyword] = (occurrences[keyword] || 0) + 1
        })
        return occurrences
      }, {}) || {}
    )
  }, [instantSearch.results])

  const debouncedUpdate = useMemo(
    () =>
      debounce(() => {
        const topKeywords = Object.entries(keywordsOccurrences)
          .sort(
            ([, occurrencesA], [, occurrencesB]) => occurrencesB - occurrencesA
          )
          .filter(([, occurrences], index) => occurrences > 1 && index < 3)
          .map(([keyword]) => keyword)
        setTopKeywords(topKeywords)
      }, DEBOUNCE_DELAY_MS),
    [keywordsOccurrences]
  )

  useEffect(() => {
    debouncedUpdate()
    return () => {
      debouncedUpdate.cancel()
    }
  }, [debouncedUpdate])

  const { status, data, error } = useKeywordsMovies(topKeywords)

  if (instantSearch.results?.hits.length === 0) {
    return null
  }

  return (
    <div>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'error' && <div>{JSON.stringify(error)}</div>}
      {status === 'success' && (
        <div>
          {Object.entries(data).map(([keyword, movies]) => (
            <div key={keyword} className="mb-8">
              <Typography variant="h3" className="text-[var(--h3)] mb-8">
                {t('results.keywordRecommendations', { keyword })}
              </Typography>
              <List>
                {movies.map(movie => (
                  <ListItem key={movie.id}>
                    <Disclosure
                      ref={ref => (cardsRef.current[movie.id] = ref)}
                      {...dialog}
                      onClick={() => {
                        setCurrentMovie(movie)
                      }}
                    >
                      <Card {...movie} />
                    </Disclosure>
                  </ListItem>
                ))}
              </List>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
