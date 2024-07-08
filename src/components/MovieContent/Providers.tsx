/* eslint-disable @next/next/no-img-element */
import Typography from 'components/Typography'
import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { Buy, Rent, Stream } from 'components/icons'
import get from 'utils/get'
import SectionHeading from './Mobile/SectionHeading'

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

const ListTitleText = styled(Typography)`
  text-transform: uppercase;
  margin-left: 16px;
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

const NoProviderMessage = styled(Typography)`
  margin: 34px 0;
  text-align: center;
  display: block;
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

const List = ({ title, icon, providers, ...props }) => (
  <div {...props}>
    <Typography variant="h3" className="flex items-center space-x-4">
      {icon}
      <ListTitleText variant="typo4">{title}</ListTitleText>
    </Typography>
    <ProviderList>
      {providers?.map(provider => (
        <Provider
          key={provider.name}
          provider={provider}
          data-provider={provider.name}
        />
      ))}
    </ProviderList>
  </div>
)

const providerTypeConfig = {
  buy: {
    icon: <Buy height={20} />,
    titleTranslationKey: 'buy',
  },
  rent: {
    icon: <Rent height={20} />,
    titleTranslationKey: 'rent',
  },
  flatrate: {
    icon: <Stream height={20} />,
    titleTranslationKey: 'stream',
  },
}

const Providers = ({
  providers,
  ...props
}: {
  providers: { buy: any[]; rent: any[]; flatrate: any[] }
}) => {
  const { t } = useTranslation('common')
  const hasProvider =
    providers.buy.length > 0 ||
    providers.rent.length > 0 ||
    providers.flatrate.length > 0

  return (
    <div {...props}>
      <div>
        {!hasProvider && (
          <NoProviderMessage variant="typo1">
            {t('noProviderFound')}
          </NoProviderMessage>
        )}

        {hasProvider && (
          <div className="space-y-8">
            {Object.entries(providerTypeConfig).map(
              ([providerType, config]) =>
                providers[providerType]?.length > 0 && (
                  <List
                    key={providerType}
                    title={t(config.titleTranslationKey)}
                    icon={config.icon}
                    providers={providers[providerType]}
                  />
                )
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Providers
