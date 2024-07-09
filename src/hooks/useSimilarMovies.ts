import { MovieData } from '~/types'
import { useMeilisearch } from './useMeilisearch'
import { useContext, useEffect, useState } from 'react'
import LanguageContext from '~/context/LanguageContext'

interface SimilarMoviesQuery {
  status: 'loading' | 'success' | 'error'
  hits: MovieData[]
}

const DEFAULT_EMBEDDER =
  process.env.NEXT_PUBLIC_MEILISEARCH_EMBEDDER ?? 'default'

export const useSimilarMovies = (movieId: string) => {
  const { client } = useMeilisearch()
  const { selectedLanguage } = useContext(LanguageContext)
  const [query, setQuery] = useState<SimilarMoviesQuery>({
    status: 'loading',
    hits: [],
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
        setQuery({ status: 'success', hits: results.hits })
      } catch (error) {
        setQuery({ status: 'error', hits: [] })
      }
    }
    fetchSimilarMovies()
  }, [movieId, client, selectedLanguage])

  return {
    status: query.status,
    data: query.hits,
  }
}
