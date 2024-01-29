import { Meilisearch } from 'meilisearch'
import { checkEnv } from "./utils";
import moviesEn from '../assets/movies-en-US.json'
import moviesJp from '../assets/movies-ja-JP.json'
import moviesTh from '../assets/movies-th-TH.json'

checkEnv([
  'MEILISEARCH_HOST',
  'MEILISEARCH_ADMIN_API_KEY'
]);

const MEILISEARCH_HOST = process.env.MEILISEARCH_HOST as string;
const MEILISEARCH_ADMIN_API_KEY = process.env.MEILISEARCH_ADMIN_API_KEY as string;

const client = new Meilisearch({
  host: MEILISEARCH_HOST,
  apiKey: MEILISEARCH_ADMIN_API_KEY
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
  {
    indexName: 'movies-th-TH',
    documents: moviesTh,
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
