import { configureStore } from '@reduxjs/toolkit'
import videoReducer from './reducers/videoReducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { apiSlice } from './apiSlice'

export const store = configureStore({
  reducer: {
    video: videoReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use this instead of plain useSelector / useDispatch for store types.
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
