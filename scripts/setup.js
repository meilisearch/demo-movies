const { MeiliSearch } = require('meilisearch')
const moviesEn = require('../assets/movies-en-US.json')
const moviesJp = require('../assets/movies-ja-JP')

const client = new MeiliSearch({
  host: 'http://0.0.0.0:7700',
})

const indexes = [
  {
    indexName: 'movies-en-US',
    documents: moviesEn,
  },
  {
    indexName: 'movies-ja-JP',
    documents: moviesJp,
  },
]

const setup = async () => {
  await Promise.all(
    indexes.map(async index => {
      const currentIndex = client.index(index.indexName)
      await currentIndex.addDocuments(index.documents)
      console.log(`Documents added to ${index.indexName} index`)
    })
  )
}

setup()
