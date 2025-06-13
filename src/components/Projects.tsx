import { useState } from "react";
import projects from "../site data/projects.json"

export default function Projects() {
    const [currentProject, setCurrentProject] = useState(Object.keys(projects)[0]);

    return <section className='box-glow rounded-lg p-4 m-6'>
          <div className='relative'>
            <h2 className='text-4xl text-center'>My Projects</h2>
            <select id="project" value={currentProject} onChange={e=>setCurrentProject(e.target.value)} className='absolute top-0 right-0 bg-black p-2 rounded-md'>
              {Object.keys(projects).map((title, index)=><option key={index} value={title}>{title}</option>)}
            </select>
          </div>
          <div className='flex my-4'>
            <div className='flex flex-col items-center flex-1 px-2'>
              <h3 className='text-2xl'>{currentProject}</h3>
              <p>
                {projects[currentProject].description}
              </p>
            </div>
            <div>
              <ul>
                {Object.entries(projects[currentProject].links).map(([text, url])=><li key={url} className='bg-blue-900 mt-2 p-2 rounded-md rounded-br-none hover:bg-violet-400 transition-all'><a href={url}>{text}</a></li>)}
              </ul>
            </div>
          </div>
        </section>;
}