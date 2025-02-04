import { MovieData, Query } from '~/types'
import { useMeilisearch } from './useMeilisearch'
import { useContext, useEffect, useState } from 'react'
import LanguageContext from '~/context/LanguageContext'
import { makeStringSafeForFilters } from '~/utils'

interface MoviesMultiQuery extends Query<Record<string, MovieData[]>> {}

export function useKeywordsMovies(keywords: string[]) {
  const { client } = useMeilisearch()
  const { selectedLanguage } = useContext(LanguageContext)
  const [query, setQuery] = useState<MoviesMultiQuery>({
    error: null,
    status: 'loading',
    data: {},
  })

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const results = await client.multiSearch<MovieData>({
          queries: keywords.map(keyword => ({
            indexUid: selectedLanguage.indexName,
            filter: [`keywords = '${makeStringSafeForFilters(keyword)}'`],
            limit: 8,
          })),
        })
        setQuery({
          status: 'success',
          data: results.results.reduce((acc, result, currentIndex) => {
            acc[keywords[currentIndex]] = result.hits
            return acc
          }, {} as Record<string, MovieData[]>),
          error: null,
        })
      } catch (error) {
        setQuery({ status: 'error', error: error as Error, data: {} })
      }
    }
    fetchSimilarMovies()
  }, [keywords, client, selectedLanguage])

  return {
    ...query,
  }
}
