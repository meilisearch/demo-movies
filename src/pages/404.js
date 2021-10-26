import styled from 'styled-components'
import Head from 'next/head'
import get from 'utils/get'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Content = styled.div`
  padding: ${get('spacing.12')};
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Custom404 = () => {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('meta.description')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content>
        <div>404</div>
        <div>{t('title')}</div>
      </Content>
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

export default Custom404
