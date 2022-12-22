import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './Slices/rootReducer'
import createSagaMiddleare from 'redux-saga'
import { rootSaga } from './Sagas/rootSaga'

const sagaMiddleware = createSagaMiddleare()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)

export default store
