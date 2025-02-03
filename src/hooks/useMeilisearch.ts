import { useMemo } from 'react'
import { Meilisearch } from 'meilisearch'
import { MEILISEARCH_HOST, MEILISEARCH_API_KEY } from '~/constants'

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
