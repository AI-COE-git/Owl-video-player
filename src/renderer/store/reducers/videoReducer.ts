import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getUniqueId } from '../../../utils/getUniqueId'

export interface VideoSection {
  id: string
  startFrame: number
  endFrame?: number
  countLeft?: number
  countRight?: number
  count?: number
  overrideCount?: number
  angle?: number
}

export interface VideoState {
  src: string
  name: string
  path: string
  duration?: number
  frames: number
  frameRate: number
  isPlaying: boolean
  isSectionRun: boolean
  showSectionDetails: boolean
  sections: VideoSection[]
}

const initialState: VideoState = {
  src: '',
  name: '',
  path: '',
  frames: 30,
  frameRate: 1,
  isPlaying: false,
  isSectionRun: true,
  showSectionDetails: false,
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
    setIsSectionRun: (state, action: PayloadAction<boolean>) => {
      state.isSectionRun = action.payload
    },
    setShowSectionDetails: (state, action: PayloadAction<boolean>) => {
      state.showSectionDetails = action.payload
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
        state.showSectionDetails = true
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
        sectionToUpdate.count = countLeft
      }
    },
    setOverrideCount: (state, action: PayloadAction<{ id: string; count: number }>) => {
      const { id, count } = action.payload
      const sectionToUpdate = state.sections.find((section) => section.id === id)
      if (sectionToUpdate) {
        sectionToUpdate.overrideCount = count
      }
    },
    setAngle: (state, action: PayloadAction<{ id: string; angle: number }>) => {
      const { id, angle } = action.payload
      const sectionToUpdate = state.sections.find((section) => section.id === id)
      if (sectionToUpdate) {
        sectionToUpdate.angle = angle
      }
    },
    setFrameRate: (state, action: PayloadAction<number>) => {
      state.frameRate = action.payload
    }
  }
})

export const {
  setNewFile,
  setIsPlaying,
  setIsSectionRun,
  setShowSectionDetails,
  startSection,
  endSection,
  setCount,
  setOverrideCount,
  setAngle,
  setFrameRate
} = videoSlice.actions

export default videoSlice.reducer
