import React from 'react'
import { useInstantSearch, useSearchBox } from 'react-instantsearch'
import { MovieData } from '~/types'
import { useEffect, useMemo, useState } from 'react'
import debounce from 'lodash.debounce'
import { useKeywordMovies } from '~/hooks/useKeywordMovies'

const DEBOUNCE_DELAY_MS = 250

export default function Recommendations() {
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
      <h2>More {topKeyword} movies</h2>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'error' && <div>Error</div>}
      {status === 'success' && (
        <div>
          {data.map(movie => (
            <div key={movie.id}>{movie.title}</div>
          ))}
        </div>
      )}
    </div>
  )
}
