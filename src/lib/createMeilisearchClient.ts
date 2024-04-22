import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

export const createMeilisearchClient = (host: string, apiKey: string) => {
  return instantMeiliSearch(host, apiKey, {
    primaryKey: 'id',
    finitePagination: true,
    meiliSearchParams: {
      // ⬇️ Hybrid search configuration
      hybrid: {
        embedder: 'default',
        semanticRatio: 0.5,
      },
    },
  })
}
