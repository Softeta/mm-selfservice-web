import { TConfigurations } from 'API/Types/configurations'
import { IProvider } from 'Contexts/IProvider'
import { useState } from 'react'
import {
  ConfigurationsContext,
  initConfigurations
} from './ConfigurationsContext'

export const ConfigurationsProvider = ({ children }: IProvider) => {
  const [configurations] = useState<TConfigurations>(initConfigurations)

  return (
    <ConfigurationsContext.Provider value={configurations}>
      {children}
    </ConfigurationsContext.Provider>
  )
}

export default ConfigurationsProvider
