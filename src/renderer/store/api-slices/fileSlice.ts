/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from '../apiSlice'

interface OpenFileResponse {
  file_path: string
}

interface OpenFileRequest {
  path: string
}

const urlPrefix = ''

export const fileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    openFile: builder.mutation<OpenFileResponse, OpenFileRequest>({
      query: ({ path }) => ({
        url: `${urlPrefix}open-file`,
        method: 'POST',
        body: { file_path: path }
      })
    })
  }),
  overrideExisting: false
})

export const { useOpenFileMutation } = fileApiSlice
