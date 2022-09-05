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
import MoviesList from 'blocks/MoviesList/index'
import { LANGUAGES } from 'data/constants'
import { LanguageProvider } from 'context/LanguageContext'
import useLocalStorage from 'hooks/useLocalStorage'

const Wrapper = styled.div`
  @media (min-width: ${get('breakpoints.desktop')}) {
    padding: 0 50px 50px;
  }
`

const Home = ({ host, apiKey }) => {
  const [localStorageCountry, setLocalStorageCountry] =
    useLocalStorage('country-preference')

  const { t } = useTranslation('common')
  const [client, setClient] = React.useState(null)
  const [selectedLanguage, setSelectedLanguage] = React.useState(
    LANGUAGES.find(e => e.code === localStorageCountry || e.code === 'en-US')
  )

  const setSelectedCountry = React.useCallback(
    country => {
      setSelectedLanguage(country)
      setLocalStorageCountry(country.code)
    },
    [setLocalStorageCountry]
  )

  React.useEffect(() => {
    setSelectedLanguage(LANGUAGES.find(e => e.code === localStorageCountry))
  }, [localStorageCountry])

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
      <LanguageProvider
        value={{ selectedLanguage, setSelectedLanguage: setSelectedCountry }}
      >
        <Head>
          <title>{t('title')}</title>
          <meta name="description" content={t('meta.description')} />
        </Head>
        {client && (
          <InstantSearch
            indexName={selectedLanguage.indexName}
            searchClient={client}
          >
            <Configure hitsPerPage={24} attributesToHighlight={['title']} />
            <Wrapper>
              <Header />
              <Filters />
              <MoviesList />
            </Wrapper>
          </InstantSearch>
        )}
      </LanguageProvider>
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
