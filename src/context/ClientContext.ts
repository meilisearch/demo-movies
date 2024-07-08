import { InstantMeiliSearchObject } from '@meilisearch/instant-meilisearch'
import React, { Dispatch, SetStateAction } from 'react'

interface ClientContextProps {
  client: InstantMeiliSearchObject | null
  setClient: Dispatch<SetStateAction<InstantMeiliSearchObject | null>>
}

const clientContextDefaultValue: ClientContextProps = {
  client: null,
  setClient: () => {},
}

const ClientContext = React.createContext<ClientContextProps>(
  clientContextDefaultValue
)

export const ClientProvider = ClientContext.Provider
export const ClientConsumer = ClientContext.Consumer

export default ClientContext
