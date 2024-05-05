import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getUniqueId } from '../../../utils/getUniqueId'

export interface VideoSection {
  id: string
  startFrame: number
  endFrame?: number
  countLeft?: number
  countRight?: number
  angle?: number
}

export interface VideoState {
  src: string
  path: string
  duration?: number
  frames: number
  isPlaying: boolean
  sections: VideoSection[]
}

const initialState: VideoState = {
  src: '',
  path: '',
  frames: 30,
  isPlaying: false,
  sections: [
    {
      id: getUniqueId(),
      startFrame: 0
    }
  ]
}

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setNewFile: (_, action: PayloadAction<Partial<VideoState>>) => {
      return { ...initialState, ...action.payload }
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload
    },
    startSection: (state, action: PayloadAction<{ frameNumber: number }>) => {
      state.sections.push({
        id: getUniqueId(),
        startFrame: action.payload.frameNumber
      })
    },
    endSection: (state, action: PayloadAction<{ id: string; frameNumber: number }>) => {
      const { id, frameNumber } = action.payload
      const sectionToUpdate = state.sections.find((section) => section.id === id)
      if (sectionToUpdate) {
        sectionToUpdate.endFrame = frameNumber
      }
    },
    setCount: (
      state,
      action: PayloadAction<{ id: string; countLeft: number; countRight: number }>
    ) => {
      const { id, countLeft, countRight } = action.payload
      const sectionToUpdate = state.sections.find((section) => section.id === id)
      if (sectionToUpdate) {
        sectionToUpdate.countLeft = countLeft
        sectionToUpdate.countRight = countRight
      }
    },
    setAngle: (state, action: PayloadAction<{ id: string; angle: number }>) => {
      const { id, angle } = action.payload
      const sectionToUpdate = state.sections.find((section) => section.id === id)
      if (sectionToUpdate) {
        sectionToUpdate.angle = angle
      }
    }
  }
})

export const { setNewFile, setIsPlaying, startSection, endSection, setCount, setAngle } =
  videoSlice.actions

export default videoSlice.reducer
