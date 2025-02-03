import { MovieData, MoviesQuery } from '~/types'
import { useMeilisearch } from './useMeilisearch'
import { useContext, useEffect, useState } from 'react'
import LanguageContext from '~/context/LanguageContext'

export function useKeywordMovies(keyword: string) {
  const { client } = useMeilisearch()
  const { selectedLanguage } = useContext(LanguageContext)
  const [query, setQuery] = useState<MoviesQuery>({
    status: 'loading',
    hits: [],
  })

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const results = await client
          .index(selectedLanguage.indexName)
          .search<MovieData>('', {
            filter: [`keywords = '${keyword}'`],
          })
        setQuery({ status: 'success', hits: results.hits })
      } catch (error) {
        setQuery({ status: 'error', hits: [] })
      }
    }
    fetchSimilarMovies()
  }, [keyword, client, selectedLanguage])

  return {
    status: query.status,
    data: query.hits,
  }
}
