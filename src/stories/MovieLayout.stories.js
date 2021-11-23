import React from 'react'
import { DesktopLayout, MobileLayout } from 'blocks/MovieLayout'

export default {
  title: 'Blocks/MovieLayout',
}

const hit = {
  title: 'No Time to Die',
  id: 370172,
  overview:
    'Bond has left active service and is enjoying a tranquil life in Jamaica. His peace is short-lived when his old friend Felix Leiter from the CIA turns up asking for help. The mission to rescue a kidnapped scientist turns out to be far more treacherous than expected, leading Bond onto the trail of a mysterious villain armed with dangerous new technology.',
  popularity: 3491.344,
  release_date: '2021-09-29',
  runtime: 163,
  vote_average: 7.6,
  external_ids: {
    imdb_id: 'tt2382320',
    facebook_id: 'JamesBond007',
    instagram_id: '007',
    twitter_id: '007',
  },
  poster_path:
    'https://image.tmdb.org/t/p/w780/iUgygt3fscRoKWCV1d0C7FbM9TP.jpg',
  backdrop_path: '/u5Fp9GBy9W8fqkuGfLBuuoJf57Z.jpg',
  keywords: ['spy', 'british secret service', 'nanobots', '007'],
  providers: {
    buy: [
      {
        name: 'Google Play Movies',
        logo: '/p3Z12gKq2qvJaUOMeKNU2mzKVI9.jpg',
      },
      {
        name: 'YouTube',
        logo: '/vDCcryHD32b0yMeSCgBhuYavsmx.jpg',
      },
    ],
    rent: [
      {
        name: 'Apple iTunes',
        logo: '/q6tl6Ib6X5FT80RMlcDbexIo4St.jpg',
      },
      {
        name: 'Google Play Movies',
        logo: '/p3Z12gKq2qvJaUOMeKNU2mzKVI9.jpg',
      },
      {
        name: 'Amazon Video',
        logo: '/sVBEF7q7LqjHAWSnKwDbzmr2EMY.jpg',
      },
      {
        name: 'YouTube',
        logo: '/vDCcryHD32b0yMeSCgBhuYavsmx.jpg',
      },
      {
        name: 'Vudu',
        logo: '/hBdCQamqj7J2VPZNbqf0wiLBous.jpg',
      },
      {
        name: 'Microsoft Store',
        logo: '/paq2o2dIfQnxcERsVoq7Ys8KYz8.jpg',
      },
      {
        name: 'DIRECTV',
        logo: '/qZdEeINwQotbr1Rq15dL5G2BaAh.jpg',
      },
      {
        name: 'Spectrum On Demand',
        logo: '/xiUQmGI2bi8Rn6C5u2bArB4YHMp.jpg',
      },
    ],
  },
  provider_names: [
    'Google Play Movies',
    'YouTube',
    'Apple iTunes',
    'Amazon Video',
    'Vudu',
    'Microsoft Store',
    'DIRECTV',
    'Spectrum On Demand',
  ],
  genres: ['Adventure', 'Action', 'Thriller'],
  crew: [
    {
      name: 'Barbara Broccoli',
      job: 'Producer',
    },
    {
      name: 'Michael G. Wilson',
      job: 'Producer',
    },
    {
      name: 'Cary Joji Fukunaga',
      job: 'Director',
    },
  ],
  cast: [
    {
      character: 'James Bond',
      name: 'Daniel Craig',
    },
    {
      character: 'Lyutsifer Safin',
      name: 'Rami Malek',
    },
    {
      character: 'Dr. Madeleine Swann',
      name: 'Léa Seydoux',
    },
    {
      character: 'M',
      name: 'Ralph Fiennes',
    },
    {
      character: 'Q',
      name: 'Ben Whishaw',
    },
    {
      character: 'Nomi',
      name: 'Lashana Lynch',
    },
    {
      character: 'Eve Moneypenny',
      name: 'Naomie Harris',
    },
    {
      character: 'Felix Leiter',
      name: 'Jeffrey Wright',
    },
  ],
}

export const Mobile = () => <MobileLayout hit={hit} />
export const Desktop = () => <DesktopLayout hit={hit} />
