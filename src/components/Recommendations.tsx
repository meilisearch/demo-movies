import React from 'react'
import { useInstantSearch } from 'react-instantsearch'
import { MovieData } from '~/types'
import { useEffect, useMemo, useState } from 'react'
import debounce from 'lodash.debounce'
import { useKeywordMovies } from '~/hooks/useKeywordMovies'
import Card from './Card'
import get from '~/utils/get'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import Typography from './Typography'

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

export default function Recommendations() {
  const { t } = useTranslation('common')
  const instantSearch = useInstantSearch()
  const [topKeyword, setTopKeyword] = useState<string>(null)

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
        if (Object.keys(keywordsOccurrences).length > 0) {
          setTopKeyword(
            Object.entries(keywordsOccurrences)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 1)[0][0]
          )
        }
      }, DEBOUNCE_DELAY_MS),
    [keywordsOccurrences]
  )

  useEffect(() => {
    debouncedUpdate()
    return () => {
      debouncedUpdate.cancel()
    }
  }, [debouncedUpdate])

  const { status, data } = useKeywordMovies(topKeyword)

  return (
    <div>
      <Typography variant="h3" className="text-[var(--h3)] mb-8">
        {t('results.keywordRecommendations', { keyword: topKeyword })}
      </Typography>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'error' && <div>Error</div>}
      {status === 'success' && (
        <List>
          {data.map(movie => (
            <ListItem key={movie.id}>
              <Card {...movie} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  )
}
