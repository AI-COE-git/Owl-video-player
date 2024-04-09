import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const URL = 'http://localhost:5000'

export const apiSlice = createApi({
  // unique API idetifier for redux store.
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/api'.
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL}/api` // ? currently first version of api - v1.
    // prepareHeaders: (headers) => {
    //   return headers
    // }
  }),
  // The "endpoints" represent operations and requests for this server
  endpoints: () => ({})
})
