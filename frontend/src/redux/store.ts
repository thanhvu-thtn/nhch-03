import { combineReducers, configureStore } from '@reduxjs/toolkit'
import currentUserReducer from './slince/CurrentUserSlice'
import monHocListReducer from "./slince/MonHocListSlice"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['currentUser'],
}

const reducer = combineReducers({
  currentUser: currentUserReducer,
  monhHocList: monHocListReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
})

export default store

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
