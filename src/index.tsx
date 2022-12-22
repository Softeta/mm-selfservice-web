import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider
} from 'react-query'
import 'tailwindcss/tailwind.css'
import { Toaster } from 'react-hot-toast'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import EN from 'Translations/en.json'
import DA from 'Translations/da.json'
import SV from 'Translations/sv.json'
import './index.css'
import React from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import ClassificatorsProvider from 'Contexts/Classificators/ClassificatorsProvider'
import { defaultLanguage } from 'Contexts/UserSettings/UserSettingsContext'
import { Provider } from 'react-redux'
import store from 'Store'
import { ClientInterceptor } from 'API/ClientInterceptor/ClientInterceptor'
import { HttpClient } from 'Services/HttpClient'
import { RecoilRoot } from 'recoil'
import Snackbar from 'Components/Molecules/Snackbar'
import AppRoutes from 'Routes/AppRoutes'
import ConfigurationsProvider from 'Contexts/Configurations/ConfigurationsProvider'
import GlobalRoute from 'Routes/GlobalRoute'
import CountrySettingsProvider from 'Contexts/CountrySettings/CountrySettingsProvider'

i18n.use(initReactI18next).init({
  resources: {
    EN: {
      translation: EN
    },
    DA: {
      translation: DA
    },
    SV: {
      translation: SV
    }
  },
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false
  }
})

const notify = (error: string) => {
  console.error(error)
  //toast(`Ups, something went wrong... \n${error}`)
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false
    }
  },
  queryCache: new QueryCache({
    onError: (error) => notify((error as Error).message)
  }),
  mutationCache: new MutationCache({
    onError: (error) => notify((error as Error).message)
  })
})

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <Snackbar />
      <ClientInterceptor client={HttpClient} />
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ConfigurationsProvider>
            <ThemeProvider
              theme={createTheme({
                typography: { fontFamily: '"Open Sans", sans-serif' }
              })}
            >
              <QueryClientProvider client={queryClient}>
                <ClassificatorsProvider>
                  <CountrySettingsProvider>
                    <BrowserRouter>
                      <Toaster />
                      <GlobalRoute>
                        <AppRoutes />
                      </GlobalRoute>
                    </BrowserRouter>
                  </CountrySettingsProvider>
                </ClassificatorsProvider>
              </QueryClientProvider>
            </ThemeProvider>
          </ConfigurationsProvider>
        </LocalizationProvider>
      </Provider>
    </RecoilRoot>
  </React.StrictMode>
)
