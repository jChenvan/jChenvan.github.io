import { useEffect, useRef } from 'react'
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
    },25);
  }, [canvas, setProgress])

  return (
    <div className='bg-[#171820] min-h-screen flex relative'>
      <div className='fixed z-0 w-screen h-screen bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.5)_100%)]'></div>
      <main className='flex-1 text-white flex flex-col relative z-10'>
        <div className='flex items-center justify-center gap-6 my-6'>
          <div className='self-center h-[300px] w-fit overflow-hidden rounded-full mt-6 drop-shadow-black drop-shadow-lg'><img src="/profilePic.jpg" alt="" width={300} height={300} className='-mt-[30px]'/></div>
          <div>
            <h1 className='self-center text-6xl my-6'>Justin Chenvanich</h1>
            <p className="self-center w-[50ch] mb-4 ml-4">It's a pleasure to meet you! I'm Justin, recent UWaterloo graduate and full stack web dev. Scroll down to get a glimpse of what I have to offer! </p>
        </div>
        </div>
        <Skills/>
        <Projects/>
        <Education/>
        <Contacts/>
        <footer className='text-center p-4'>
           © 2025 Justin Chenvanich
        </footer>
      </main>
      <div ref={containerRef} className='sticky top-0 h-screen flex flex-col z-10'>
        <div className='flex-1 flex items-center justify-center'>
          <div className='w-fit text-white bg-gray-800 rounded-lg p-4 shadow-md shadow-black'>
            <h1 className='text-3xl border-b-2 pb-1 mb-1'>Contents</h1>
            <ul className='pl-2'>
              <li><a href="#skills" className='hover:text-red-700 hover:ml-2 transition-all text-2xl'>Skills</a></li>
              <li><a href="#projects" className='hover:text-blue-800 hover:ml-2 transition-all text-2xl'>Projects</a></li>
              <li><a href="#education" className='hover:text-amber-600 hover:ml-2 transition-all text-2xl'>Education</a></li>
              <li><a href="#contacts" className='hover:text-green-700 hover:ml-2 transition-all text-2xl'>Contacts</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
