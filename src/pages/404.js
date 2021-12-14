import styled from 'styled-components'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import Container from 'components/Container'
import Typography from 'components/Typography'
import LinkButton from 'components/LinkButton'

const Grid = styled(Container)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 20px;
  height: 100vh;
  align-items: center;
`

const Content = styled.div`
  grid-column: 4 / 10;
  text-align: center;
  color: var(--text-404);
`

const Title = styled(Typography)`
  text-transform: uppercase;
`

const Description = styled(Typography)`
  margin-top: 4px;
  display: block;
`

const Cta = styled(LinkButton)`
  margin-top: 46px;
`

const Custom404 = () => {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('meta.description')} />
      </Head>
      <Grid>
        <Content>
          <Image
            src="/images/404.svg"
            alt="404"
            layout="responsive"
            width={933}
            height={448}
          />
          <Title variant="h1">{t('notFoundTitle')}</Title>
          <Description variant="typo1">{t('notFoundDescription')}</Description>
          <Cta href="/">
            <Typography>{t('notFoundCta')}</Typography>
          </Cta>
        </Content>
      </Grid>
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
