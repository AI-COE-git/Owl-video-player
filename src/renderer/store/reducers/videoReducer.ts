import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface VideoSection {
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
  sections: VideoSection[]
}

const initialState: VideoState = {
  src: '',
  path: '',
  frames: 30,
  sections: [
    {
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
    startSection: (state, action: PayloadAction<{ frameNumber: number }>) => {
      state.sections.push({
        startFrame: action.payload.frameNumber
      })
    },
    endSection: (state, action: PayloadAction<{ frameNumber: number }>) => {
      state.sections[state.sections.length - 1].endFrame = action.payload.frameNumber
    },
    setCount: (
      state,
      action: PayloadAction<{ index: number; countLeft: number; countRight: number }>
    ) => {
      state.sections[action.payload.index] = {
        ...state.sections[action.payload.index],
        ...action.payload
      }
    },
    setAngle: (state, action: PayloadAction<{ index: number; angle: number }>) => {
      state.sections[action.payload.index] = {
        ...state.sections[action.payload.index],
        ...action.payload
      }
    }
  }
})

export const { setNewFile, startSection, endSection, setCount, setAngle } = videoSlice.actions

export default videoSlice.reducer
