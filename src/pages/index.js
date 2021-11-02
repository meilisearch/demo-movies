import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Toggle from 'components/Toggle'
import get from 'utils/get'

const Test = styled.div`
  background: var(--bg-button);
`

const Wrapper = styled.div`
  padding: ${get('spacing.4')};
`

const Home = () => {
  const { t } = useTranslation('common')

  return (
    <>
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
    </>
  )
}

export const getStaticProps = async ({ locale }) => {
  try {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
      },
    }
  } catch (err) {
    console.log(err)
  }
}

export default Home
