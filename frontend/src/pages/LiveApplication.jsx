import React from 'react'
import { DrawingBoard } from '../components/DrawingBoard'
import SpeechNotepad from '../components/SpeechNotepad'
import Calculator from '../components/Calculator'
import URLShortener from '../components/URLShortener'
import WeatherDashboard from '../components/WeatherDashboard'

const LiveApplication = () => {
  return (
     <div className="flex flex-col items-center justify-center gap-4">
  <div className="w-full max-w-md">
    <DrawingBoard />
  </div>
  <div className="w-full max-w-md">
    <SpeechNotepad />
  </div>
  <div className="w-full max-w-md">
    <Calculator />
  </div>
  <div className="w-full max-w-md">
    <URLShortener />
  </div>
  <div className="w-full max-w-md">
    <WeatherDashboard />
  </div>
</div>
  )
}

export default LiveApplication
