/* eslint-disable @typescript-eslint/no-explicit-any */
import { FrameSection } from '@renderer/types/enums/frame-section'
import { apiSlice } from '../apiSlice'

const urlPrefix = ''

export const blockCountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    setBlockCountFrameSection: builder.mutation<any, { type: FrameSection; frameNumber?: number }>({
      query: ({ type, frameNumber }) => ({
        url: `${urlPrefix}/set-${type}`,
        method: 'POST',
        body: { frameNumber: frameNumber || 0 }
      })
    }),
    getCount: builder.mutation<{ countLeft: number; countRight: number }, any>({
      query: () => ({
        url: `${urlPrefix}/get-count`,
        method: 'GET'
      })
    })
  }),
  overrideExisting: false
})
export const { useSetBlockCountFrameSectionMutation, useGetCountMutation } = blockCountApiSlice
