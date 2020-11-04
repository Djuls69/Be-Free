import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'befree',
  storage
}

const persistedReducer = persistReducer(persistConfig, () => {})

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
export const persistor = persistStore(store)
