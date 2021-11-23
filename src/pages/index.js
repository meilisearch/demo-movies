import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { InstantSearch, Configure } from 'react-instantsearch-dom'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ClientProvider } from 'context/ClientContext'
import get from 'utils/get'
import Header from 'blocks/Header'
import Filters from 'blocks/Filters'
import Results from 'blocks/Results/index'

const Wrapper = styled.div`
  @media (min-width: ${get('breakpoints.desktop')}) {
    padding: 0 50px 50px;
  }
`

const Home = ({ host, apiKey }) => {
  const { t } = useTranslation('common')
  const [client, setClient] = React.useState(null)

  React.useEffect(() => {
    if (host && apiKey)
      setClient(
        instantMeiliSearch(host, apiKey, {
          primaryKey: 'id',
          paginationTotalHits: 24,
        })
      )
  }, [host, apiKey])

  if (!host || !apiKey) return <div>{t('connexionFailed')}</div>

  return (
    <ClientProvider value={{ client, setClient }}>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('meta.description')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {client && (
        <InstantSearch indexName="movies" searchClient={client}>
          <Configure hitsPerPage={24} />
          <Wrapper>
            <Header />
            <Filters />
            <Results />
          </Wrapper>
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
