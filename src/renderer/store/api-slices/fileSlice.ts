/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from '../apiSlice'

interface OpenFileResponse {
  file_path: string
}

interface OpenFileRequest {
  path: string
}

interface GenerateCsvRequest {
  video_name: string
  csv_data: string
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
    }),
    generateCsv: builder.mutation<any, GenerateCsvRequest>({
      query: (body) => ({
        url: `${urlPrefix}generate-csv`,
        method: 'POST',
        body
      })
    })
  }),
  overrideExisting: false
})

export const { useOpenFileMutation, useGenerateCsvMutation } = fileApiSlice
