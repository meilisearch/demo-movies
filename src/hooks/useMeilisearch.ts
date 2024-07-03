import { useMemo } from 'react'
import { Meilisearch } from 'meilisearch'

const MEILISEARCH_HOST = process.env.NEXT_PUBLIC_MEILISEARCH_HOST
const MEILISEARCH_API_KEY = process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY

export function useMeilisearch() {
  const client = useMemo(() => {
    const client = new Meilisearch({
      host: MEILISEARCH_HOST,
      apiKey: MEILISEARCH_API_KEY,
    })
    return client
  }, [])

  return { client }
}
