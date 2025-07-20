import React from 'react'
import { DrawingBoard } from '../components/DrawingBoard'
import SpeechNotepad from '../components/SpeechNotepad'
import Calculator from '../components/Calculator'
import URLShortener from '../components/URLShortener'
import WeatherDashboard from '../components/WeatherDashboard'
import ColorRevealGame from '../components/ColorRevealGame'

const LiveApplication = () => {
  return (
   <div className="flex flex-col items-center justify-center gap-2 px-4 sm:px-6 lg:px-8">

  {/* Message for phone users */}
  <div className="block sm:hidden text-center text-red-500 font-medium text-sm  mt-30">
    For a better experience, please use a laptop or desktop device.
  </div>

  {/* Responsive Tools Container */}
  <div className="w-full ">
    <DrawingBoard />
  </div>
  <div className="w-full ">
    <SpeechNotepad />
  </div>
  <div className="w-full ">
    <Calculator />
  </div>
  <div className="w-full ">
    <URLShortener />
  </div>
  <div className="w-full ">
    <WeatherDashboard />
  </div>
  <div className="w-full ">
    <ColorRevealGame />
  </div>
  
</div>
  )
}

export default LiveApplication
