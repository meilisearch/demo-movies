import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
} from 'react-instantsearch-dom'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Toggle from 'components/Toggle'
import get from 'utils/get'
import { ClientProvider } from 'context/ClientContext'

const Test = styled.div`
  background: var(--bg-button);
`

const Wrapper = styled.div`
  padding: ${get('spacing.4')};
`

function Hit(props) {
  return <Highlight attribute="title" hit={props.hit} />
}

const Home = ({ host, apiKey }) => {
  const { t } = useTranslation('common')
  const [client, setClient] = React.useState(null)

  React.useEffect(() => {
    if (host && apiKey)
      setClient(instantMeiliSearch(host, apiKey, { primaryKey: 'id' }))
  }, [host, apiKey])

  if (!host || !apiKey) return <div>Connection to MeiliSearch failed</div>

  return (
    <ClientProvider value={{ client, setClient }}>
      {' '}
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('meta.description')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <div>{t('title')}</div>
        <Test>test</Test>
        <Toggle />
      </Wrapper>
      {client && (
        <InstantSearch indexName="movies" searchClient={client}>
          <SearchBox />
          <Hits hitComponent={Hit} />
        </InstantSearch>
      )}
    </ClientProvider>
  )
}

export const getStaticProps = async ({ locale }) => {
  try {
    return {
      props: {
        host: process.env.HOST,
        apiKey: process.env.API_KEY,
        ...(await serverSideTranslations(locale, ['common'])),
      },
    }
  } catch (err) {
    console.log(err)
  }
}

export default Home
