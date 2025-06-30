import { useEffect, useRef, useState } from "react";
import projects from "../site data/projects"

export default function Projects() {
    const [currentProject, setCurrentProject] = useState(Object.keys(projects)[0]);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(()=>{
      const vid = videoRef.current;
      if (vid) vid.load();
    }, [currentProject]);

    return <section className='shadow-lg shadow-black rounded-lg overflow-hidden m-6 bg-gray-900 text-white' id="projects">
          <div className='relative'>
            <h2 className='text-4xl text-center p-4 bg-purple-950'>My Projects</h2>
            <select id="project" value={currentProject} onChange={e=>setCurrentProject(e.target.value)} className='absolute top-2 right-2 bg-black p-2 rounded-md'>
              {Object.keys(projects).map((title, index)=><option key={index} value={title}>{title}</option>)}
            </select>
          </div>
          <div>
            <div className="w-fit h-[500px] mx-auto my-6 border-black bg-black rounded-lg border-8 box-content">
              <video ref={videoRef} autoPlay muted loop className="h-[500px]">
                <source src={`/previews/${projects[currentProject as keyof typeof projects].preview}`} type="video/mp4"/>
              </video>
            </div>
            <div className='flex flex-col items-center flex-1 px-2'>
              <h3 className='text-2xl'>{currentProject}</h3>
              <p>
                {projects[currentProject as keyof typeof projects].description}
              </p>
            </div>
            <div>
              <ul className="w-fit my-4 mx-auto">
                {Object.entries(projects[currentProject as keyof typeof projects].links).map(([text, url])=><li key={url as string} className='bg-black text-center mt-2 p-2 rounded-md rounded-br-none hover:bg-gray-700 transition-all'><a href={url}>{text}</a></li>)}
              </ul>
            </div>
          </div>
        </section>;
}