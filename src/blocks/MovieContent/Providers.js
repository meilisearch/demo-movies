/* eslint-disable @next/next/no-img-element */
import Typography from 'components/Typography'
import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { Buy, Rent, Stream } from 'components/icons'
import get from 'utils/get'

const providersList = {
  'Apple iTunes': 'https://tv.apple.com',
  'Google Play Movies': 'https://play.google.com/store/movies',
  'Amazon Video': 'https://www.primevideo.com',
  'YouTube': 'https://www.youtube.com/movies',
  'Vudu': 'https://www.vudu.com',
  'Microsoft Store': 'https://www.microsoft.com/movies-and-tv',
  'DIRECTV': 'https://www.directv.com/movies',
  'Spectrum On Demand': 'https://ondemand.spectrum.net/movies/',
  'AMC on Demand': 'https://www.amc.com/movies',
  'Redbox': 'https://www.redbox.com/',
  'Netflix': 'https://www.netflix.com/',
  'fuboTV': 'https://www.fubo.tv/',
  'AMC Plus': 'https://www.amcplus.com/',
  'AMC+ Roku Premium Channel': 'https://therokuchannel.roku.com',
  'Disney Plus': 'https://www.disneyplus.com',
  'Alamo on Demand': 'https://ondemand.drafthouse.com/',
  'FXNow': 'https://fxnow.fxnetworks.com/',
  'Sling TV': 'https://www.sling.com/',
  'Funimation Now': 'https://www.funimation.com/',
  'Hulu': 'https://www.hulu.com/hub/movies',
  'HBO Max': 'https://www.hbomax.com/',
  'Peacock Premium': 'https://www.peacocktv.com/',
  'FlixFling': 'https://www.flixfling.com/',
  'Epix': 'https://www.epix.com/',
}

const Wrapper = styled.div`
  grid-column: 1 / 3;
  padding: 56px 28px;
`

const ListTitleText = styled(Typography)`
  text-transform: uppercase;
  margin-left: 16px;
`

const TitleWrapper = styled.div`
  display: flex;
`

const ListWrapper = styled.div`
  margin-top: 56px;
`

const ProviderList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 18px;
  flex-wrap: wrap;
  margin-top: 18px;
  @media (min-width: ${get('breakpoints.desktop')}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const ProviderImage = styled.img`
  width: 100%;
  border-radius: 11px;
`

const Provider = ({ provider }) => {
  const externalLink = providersList[provider.name]
  const ProviderTag = externalLink ? 'a' : 'div'

  return (
    <ProviderTag
      href={externalLink || null}
      target={externalLink ? '_blank' : null}
    >
      <ProviderImage
        src={`https://image.tmdb.org/t/p/w185/${provider.logo}`}
        alt={provider.name}
        title={provider.name}
      />
    </ProviderTag>
  )
}

const List = ({ title, icon, providers }) => (
  <ListWrapper>
    <TitleWrapper>
      {icon}
      <ListTitleText variant="h5">{title}</ListTitleText>
    </TitleWrapper>
    <ProviderList>
      {providers?.map(provider => (
        <Provider key={provider.name} provider={provider} />
      ))}
    </ProviderList>
  </ListWrapper>
)

const Providers = ({ providers, ...props }) => {
  const { t } = useTranslation('common')
  const { buy = [], rent = [], flatrate: stream = [] } = providers
  return (
    <Wrapper {...props}>
      <Typography
        variant="h2"
        style={{ textAlign: 'center', display: 'inline-block' }}
      >
        {t('title')}
      </Typography>
      <div>
        {stream.length > 0 && (
          <List
            title={t('stream')}
            icon={<Stream height={20} />}
            providers={stream}
          />
        )}
        {rent.length > 0 && (
          <List
            title={t('rent')}
            icon={<Rent height={20} />}
            providers={rent}
          />
        )}
        {buy.length > 0 && (
          <List title={t('buy')} icon={<Buy height={20} />} providers={buy} />
        )}
      </div>
    </Wrapper>
  )
}

export default Providers
