import { Task } from 'meilisearch'
import { ofetch } from 'ofetch'
import { checkEnv, isUsingMeilisearchCloud } from './utils'

type TaskResponse = {
  taskUid: Task['uid']
} & Pick<Task, 'indexUid' | 'status' | 'type' | 'enqueuedAt'>

checkEnv(['MEILISEARCH_HOST', 'MEILISEARCH_ADMIN_API_KEY', 'OPENAI_API_KEY'])

const MEILISEARCH_HOST = process.env.MEILISEARCH_HOST as string
const MEILISEARCH_ADMIN_API_KEY = process.env
  .MEILISEARCH_ADMIN_API_KEY as string
const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string

const DESCRIPTION_MAXIMUM_WORDS = 100

const indexesConfig = [
  {
    indexName: 'movies-en-US',
    documentTemplate: `A movie titled '{{doc.title}}' that released in {{ doc.release_date | date: '%Y' }}. The movie genres are: {{doc.genres}}. The storyline is about: {{doc.overview|truncatewords: ${DESCRIPTION_MAXIMUM_WORDS}}}`,
  },
  {
    indexName: 'movies-ja-JP',
    documentTemplate: `映画のタイトルは '{{doc.title}}' で、{{ doc.release_date | date: '%Y年' }}に公開され、ジャンルは: {{doc.genres}}。あらすじは: {{doc.overview|truncatewords: ${DESCRIPTION_MAXIMUM_WORDS}}}`,
  },
  {
    indexName: 'movies-th-TH',
    documentTemplate: `หนังชื่อ '{{doc.title}}' ฉายเมื่อ {{ doc.release_date | date: '%Y' }} ซึ่งเริ่มต้นด้วย {{doc.genres}}. เรื่องย่อเกี่ยวกับ: {{doc.overview|truncatewords: ${DESCRIPTION_MAXIMUM_WORDS}}}`,
  },
]

async function main() {
  console.log(`Connecting to: ${MEILISEARCH_HOST}`)

  const shouldEnableVectorStore = !isUsingMeilisearchCloud(MEILISEARCH_HOST)
  // On Meilisearch Cloud, feature needs to be enabled manually
  if (shouldEnableVectorStore) {
    console.log('Enabling vector store')
    await ofetch<TaskResponse>(`${MEILISEARCH_HOST}/experimental-features`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${MEILISEARCH_ADMIN_API_KEY}`,
      },
      body: {
        vectorStore: true,
      },
    })
  }

  for (const { indexName, documentTemplate } of indexesConfig) {
    const endpoint = `${MEILISEARCH_HOST}/indexes/${indexName}/settings`

    try {
      const task = await ofetch<TaskResponse>(endpoint, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${MEILISEARCH_ADMIN_API_KEY}`,
        },
        body: {
          embedders: {
            small: {
              source: 'openAi',
              apiKey: OPENAI_API_KEY,
              dimensions: 1024,
              model: 'text-embedding-3-small',
              documentTemplate: documentTemplate,
            },
            text_large: {
              source: 'openAi',
              apiKey: OPENAI_API_KEY,
              dimensions: 3072,
              model: 'text-embedding-3-large',
              documentTemplate: documentTemplate,
            },
          },
        },
      })
      console.log('Enqueued task: ', task)
    } catch (error) {
      console.error('Error: ', JSON.stringify(error))
    }
  }
  console.log(
    `All tasks enqueued! Check tasks status via: https://cloud.meilisearch.com/`
  )
}

main()
