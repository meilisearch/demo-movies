/* eslint-disable no-console */
const { MeiliSearch } = require('meilisearch')

const { MEILISEARCH_API_KEY, MEILISEARCH_HOST } = Cypress.env()

function createClient() {
  return new MeiliSearch({
    host: MEILISEARCH_HOST,
    apiKey: MEILISEARCH_API_KEY,
  })
}

Cypress.Commands.add('enableVectorSearch', () => {
  try {
    // TODO: Implement
  } catch (error) {
    console.log({ error })
  }
})

Cypress.Commands.add('deleteAllIndexes', async () => {
  try {
    const client = createClient()
    const indexes = await client.getIndexes()
    indexes?.results?.forEach(async index => {
      await client.deleteIndex(index.uid)
    })
  } catch (e) {
    console.log({ e })
  }
})

Cypress.Commands.add('addDocuments', async (uid, documents) => {
  console.log('Adding documents to index', uid)
  try {
    const client = createClient()
    const index = client.index(uid)
    const { updateId } = await index.addDocuments(documents)
    await index.waitForPendingUpdate(updateId)
    console.log('Documents added to index', uid)
  } catch (e) {
    console.log({ e })
  }
})
