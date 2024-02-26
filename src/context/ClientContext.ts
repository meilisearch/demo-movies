import { InstantMeiliSearchObject } from '@meilisearch/instant-meilisearch'
import React from 'react'

const ClientContext = React.createContext({
  client: {},
  setClient: (meilisearch: InstantMeiliSearchObject) => {}, // eslint-disable-line no-unused-vars
})

export const ClientProvider = ClientContext.Provider
export const ClientConsumer = ClientContext.Consumer

export default ClientContext
