import { useEffect, useRef, useState } from 'react'
import './App.css'
import useAnimation from './hooks/useAnimation'
import './index.css'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Contacts from './components/Contacts'
import throttle from './lib/throttle'

function betterModulo(a:number, b:number) {
  return ((a % b) + b) % b;
}

function App() {
  const { setProgress, canvas } = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollPos = useRef(window.scrollY);
  const animationProgress = useRef(0);

  useEffect(() => {
    if (containerRef.current && canvas) {
      containerRef.current.appendChild(canvas);
    }
    window.onscroll = throttle(()=>{
      const currentScrollPos = window.scrollY;
      const difference = (currentScrollPos - lastScrollPos.current)/window.innerHeight;
      animationProgress.current = betterModulo(animationProgress.current + difference,1);
      setProgress(animationProgress.current);

      lastScrollPos.current = currentScrollPos;
    },41);
  }, [canvas, setProgress])

  return (
    <div className='bg-[rgb(8,3,26)] min-h-screen flex'>
      <main className='flex-1 text-white flex flex-col'>
        <div className='self-center h-[300px] w-fit overflow-hidden rounded-full mt-6 drop-shadow-violet-700 drop-shadow-xl'><img src="/profilePic.jpg" alt="" width={300} height={300} className='-mt-[30px]'/></div>
        <h1 className='self-center text-6xl my-6'>Justin Chenvanich</h1>
        <p className="self-center w-[50ch] text-center mb-4">It's a pleasure to meet you! I'm Justin, recent UWaterloo graduate and full stack web dev. Scroll down to get a glimpse of what I have to offer! </p>
        <Skills/>
        <Projects/>
        <Education/>
        <Contacts/>
        <footer className='text-center p-4 rounded-tr-lg bg-blue-900'>
           © 2025 Justin Chenvanich
        </footer>
      </main>
      <div ref={containerRef} className='sticky top-0 h-screen flex items-end'>
      </div>
    </div>
  )
}

export default App
