
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import todoReducer from '../features/todoStorefunc'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  todo: todoReducer, // <-- keep this clean array reducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['todo'], // only persist this key
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
