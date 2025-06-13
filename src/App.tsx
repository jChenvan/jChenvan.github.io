import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useAnimation from './hooks/useAnimation'

function App() {
  const animation = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && animation.canvas) {
      containerRef.current.appendChild(animation.canvas);
    }
  }, [animation.canvas])

  return (
    <div ref={containerRef}>
    </div>
  )
}

export default App
