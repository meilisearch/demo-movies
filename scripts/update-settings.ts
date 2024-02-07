import { Task } from 'meilisearch';
import { ofetch } from 'ofetch'
import { checkEnv } from './utils';

type TaskResponse = {
  taskUid: Task['uid']
} & Pick<Task, | 'indexUid' | 'status' | 'type' | 'enqueuedAt'>

checkEnv([
  'MEILISEARCH_HOST',
  'MEILISEARCH_ADMIN_API_KEY',
  'OPENAI_API_KEY'
]);

const MEILISEARCH_HOST = process.env.MEILISEARCH_HOST as string;
const MEILISEARCH_ADMIN_API_KEY = process.env.MEILISEARCH_ADMIN_API_KEY as string;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;

console.log(`Connecting to host: ${MEILISEARCH_HOST}`);

const indexesConfig = [
  {
    indexName: 'movies-en-US',
    documentTemplate: `A movie titled '{{doc.title}}' whose description starts with {{doc.overview|truncatewords: 20}}`
  },
  {
    indexName: 'movies-ja-JP',
    documentTemplate: `タイトルが '{{doc.title}}' で、概要が {{doc.overview|truncatewords: 20}} で始まる映画`
  },
  {
    indexName: 'movies-th-TH',
    documentTemplate: `ภาพยนตร์ชื่อ '{{doc.title}}' ซึ่งมีคำอธิบายขึ้นต้นด้วย {{doc.overview|truncatewords: 20}}`
  }
]

async function main() {
  for (const { indexName, documentTemplate } of indexesConfig) {
    const endpoint = `${MEILISEARCH_HOST}/indexes/${indexName}/settings`

    const task = await ofetch<TaskResponse>(endpoint, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${MEILISEARCH_ADMIN_API_KEY}`,
      },
      body: {
        embedders: {
          default: {
            source:  'openAi',
            apiKey: OPENAI_API_KEY,
            model: 'text-embedding-ada-002',
            documentTemplate: documentTemplate
          }
        }
      }
    })

    console.log('Enqueued task: ', task)
  }
  console.log('All tasks enqueued successfully! Check tasks status via: https://cloud.meilisearch.com/')
}

main()
