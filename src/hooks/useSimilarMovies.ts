import { MovieData, Query } from '~/types'
import { useMeilisearch } from './useMeilisearch'
import { useContext, useEffect, useState } from 'react'
import LanguageContext from '~/context/LanguageContext'

const DEFAULT_EMBEDDER =
  process.env.NEXT_PUBLIC_MEILISEARCH_EMBEDDER ?? 'default'

interface MoviesQuery extends Query<MovieData[]> {}

export const useSimilarMovies = (movieId: string) => {
  const { client } = useMeilisearch()
  const { selectedLanguage } = useContext(LanguageContext)
  const [query, setQuery] = useState<MoviesQuery>({
    status: 'loading',
    data: [],
    error: null,
  })

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const results = await client
          .index(selectedLanguage.indexName)
          .searchSimilarDocuments<MovieData>({
            id: movieId,
            limit: 7,
            embedder: DEFAULT_EMBEDDER,
          })
        setQuery({ status: 'success', data: results.hits, error: null })
      } catch (error) {
        setQuery({ status: 'error', data: [], error: error as Error })
      }
    }
    fetchSimilarMovies()
  }, [movieId, client, selectedLanguage])

  return {
    ...query,
  }
}
