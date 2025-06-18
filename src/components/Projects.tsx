import { useEffect, useRef, useState } from "react";
import useJson from "../hooks/useJson";

export default function Projects() {
    const {json:projects} = useJson('projects.json');
    const [currentProject, setCurrentProject] = useState<string>();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(()=>{
      if (projects) setCurrentProject(Object.keys(projects)[0]);
    },[projects]);

    useEffect(()=>{
      const vid = videoRef.current;
      if (vid) vid.load();
    }, [currentProject]);

    return projects && currentProject && projects[currentProject] ? <section className='shadow-lg shadow-black rounded-lg p-4 m-6 bg-blue-800 text-white' id="projects">
          <div className='relative'>
            <h2 className='text-4xl text-center pb-4 border-b-2'>My Projects</h2>
            <select id="project" value={currentProject} onChange={e=>setCurrentProject(e.target.value)} className='absolute top-0 right-0 bg-black p-2 rounded-md'>
              {Object.keys(projects).map((title, index)=><option key={index} value={title}>{title}</option>)}
            </select>
          </div>
          <div>
            <div className="w-fit h-[500px] mx-auto my-6 border-blue-950 bg-black rounded-lg border-8 box-content">
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
                {Object.entries(projects[currentProject as keyof typeof projects].links).map(([text, url])=><li key={url as string} className='bg-blue-950 text-center mt-2 p-2 rounded-md rounded-br-none hover:bg-blue-500 transition-all'><a href={url as string}>{text}</a></li>)}
              </ul>
            </div>
          </div>
        </section> : <></>;
}