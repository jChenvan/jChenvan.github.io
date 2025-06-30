import { useEffect, useRef, useState } from 'react'
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
  const { setProgress, canvas, done } = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const profilePicRef = useRef<HTMLImageElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [profilePicLoaded, setProfilePicLoaded] = useState(false);
  const lastScrollPos = useRef(window.scrollY);
  const animationProgress = useRef(0);

  useEffect(()=>{
    if (done && profilePicLoaded && mainRef.current && divRef.current) {
      mainRef.current.classList.remove("opacity-0");
      divRef.current.classList.remove("opacity-0");
      mainRef.current.classList.add("fade-in");
      divRef.current.classList.add("fade-in");
    }
  },[done, profilePicLoaded]);

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
    <div className='min-h-screen flex relative bg-gradient-to-tr from-[#060027] to-[#2c0046]'>
      <main ref={mainRef} className='flex-1 text-white flex flex-col relative z-10 opacity-0'>
        <div className='flex items-center justify-center gap-6 my-6'>
          <div className='self-center h-[300px] w-[300px] overflow-hidden rounded-full mt-6 drop-shadow-black drop-shadow-lg'><img onLoad={() => setProfilePicLoaded(true)} ref={profilePicRef} src="/profilePic.jpg" alt="" width={300} height={300} className='-mt-[30px]'/></div>
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
      <div ref={divRef} className='sticky top-0 h-screen flex flex-col z-10 opacity-0'>
        <div className='flex-1 flex items-center justify-center'>
          <div className='w-fit text-white bg-gray-900 rounded-lg overflow-hidden shadow-md shadow-black'>
            <h1 className='text-3xl bg-purple-950 py-2 px-4 mb-1'>Contents</h1>
            <ul className='py-2 px-4'>
              <li><a href="#skills" className='hover:text-purple-700 hover:ml-2 hover:-mr-2 transition-all text-2xl'>Skills</a></li>
              <li><a href="#projects" className='hover:text-purple-700 hover:ml-2 hover:-mr-2 transition-all text-2xl'>Projects</a></li>
              <li><a href="#education" className='hover:text-purple-700 hover:ml-2 hover:-mr-2 transition-all text-2xl'>Education</a></li>
              <li><a href="#contacts" className='hover:text-purple-700 hover:ml-2 hover:-mr-2 transition-all text-2xl'>Contacts</a></li>
            </ul>
          </div>
        </div>
        <div ref={containerRef} className='drop-shadow-lg drop-shadow-violet-950'>

        </div>
      </div>
    </div>
  )
}

export default App
