import React from 'react'
import Searchbox from 'components/Searchbox'
import { InstantSearch } from 'react-instantsearch'

export default {
  title: 'Components/Searchbox',
  component: Searchbox,
  parameters: {
    layout: 'padded',
  },
}

export const Default = () => {
  return (
    <InstantSearch indexName="movies-en-US" searchClient={{}}>
      <Searchbox />
    </InstantSearch>
  )
}
