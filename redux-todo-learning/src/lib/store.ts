
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import todoReducer from '../features/todoStorefunc'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { todoApi } from '../features/getFromApi'

const rootReducer = combineReducers({
  todo: todoReducer, // <-- keep this clean array reducer
  [todoApi.reducerPath]: todoApi.reducer
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
    }).concat(todoApi.middleware),
})

export const persistor = persistStore(store)
