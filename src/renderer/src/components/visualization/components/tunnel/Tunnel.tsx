import React, { useEffect, useRef } from 'react'
import { VideoSection } from '../../../../../store/reducers/videoReducer'
import { Canvas } from './style'

interface TunnelCanvasProps {
  sections: VideoSection[]
}

function calculateTunnelDimensions(sections: VideoSection[]): {
  minX: number
  minY: number
  maxX: number
  maxY: number
  width: number
  height: number
} {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  let currentX = 0 // Initialize current X coordinate
  let currentY = 0 // Initialize current Y coordinate

  sections.forEach((section) => {
    const angle = (section.angle || 0) * (Math.PI / 180)
    const length = section.count || 0

    // Calculate the endpoint of the section based on angle and length
    const endX = currentX + length * Math.cos(angle)
    const endY = currentY + length * Math.sin(angle)

    // Update minimum and maximum values for X and Y
    minX = Math.min(minX, Math.min(currentX, endX))
    minY = Math.min(minY, Math.min(currentY, endY))
    maxX = Math.max(maxX, Math.max(currentX, endX))
    maxY = Math.max(maxY, Math.max(currentY, endY))

    // Update current position for the next section
    currentX = endX
    currentY = endY
  })

  // Calculate width and height
  const width = maxX - minX
  const height = maxY - minY

  return { minX, minY, maxX, maxY, width, height }
}

const TunnelCanvas: React.FC<TunnelCanvasProps> = ({ sections }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const {
      width: tunnelWidth,
      height: tunnelHeight,
      minX,
      minY,
      maxX,
      maxY
    } = calculateTunnelDimensions(sections)

    // Calculate the aspect ratio of the tunnel
    const tunnelAspectRatio = tunnelWidth / tunnelHeight

    // Calculate the aspect ratio of the screen
    const screenAspectRatio = window.innerWidth / window.innerHeight

    // Calculate the canvas dimensions to maintain the final aspect ratio
    let canvasWidth = window.innerWidth
    let canvasHeight = window.innerHeight

    if (tunnelAspectRatio > screenAspectRatio) {
      canvasHeight = canvasWidth / tunnelAspectRatio
    } else {
      canvasWidth = canvasHeight * tunnelAspectRatio
    }

    canvas.width = canvasWidth
    canvas.height = canvasHeight

    // Calculate scaling factors to draw the tunnel within the canvas
    const scaleX = canvasWidth / tunnelWidth
    const scaleY = canvasHeight / tunnelHeight

    // Set visual properties of the tunnel
    ctx.lineWidth = 5
    ctx.strokeStyle = '#000000'
    ctx.font = '12px Tahoma'

    // Initialize starting coordinates
    let startX = canvasWidth / 2
    let startY = canvasHeight - 100

    // Draw each section
    sections.forEach((section, index) => {
      const angle = (section.angle || 0) * (Math.PI / 180) // Convert angle to radians
      const length = section.count || 0 // Length of the section (number of blocks)

      // Calculate the endpoint of the section based on angle and length
      const endX = startX + length * Math.cos(angle) * scaleX
      const endY = startY - length * Math.sin(angle) * scaleY

      ctx.beginPath()
      ctx.arc(startX, startY, 5, 0, 2 * Math.PI)
      ctx.fillStyle = '#FF0000'
      ctx.fill()

      ctx.beginPath()
      ctx.arc(endX, endY, 5, 0, 2 * Math.PI)
      ctx.fillStyle = '#FF0000'
      ctx.fill()

      // Draw the line representing the section
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(endX, endY)
      ctx.stroke()

      // Determine the midpoint of the line segment
      const midX = startX + (endX - startX) / 2
      const midY = startY - (startY - endY) / 2

      // Draw the section index label near the line with increased offset
      ctx.fillText(`Section ${index + 1}`, midX + 10, midY - 10) // Adjust label position as needed

      // Update the starting coordinates for the next section
      startX = endX
      startY = endY
    })
  }, [sections])

  return <Canvas ref={canvasRef} />
}

export default TunnelCanvas
