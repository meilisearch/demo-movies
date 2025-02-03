import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { DEFAULT_EMBEDDER } from '~/constants'

export const createMeilisearchClient = (host: string, apiKey: string) => {
  return instantMeiliSearch(host, apiKey, {
    primaryKey: 'id',
    finitePagination: false,
    meiliSearchParams: {
      // ⬇️ Hybrid search configuration
      hybrid: {
        embedder: DEFAULT_EMBEDDER,
        semanticRatio: 0.5,
      },
    },
  })
}
