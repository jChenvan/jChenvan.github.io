import React from "react"
import skills from "../site data/skills"



export default function Skills () {
    return <section className='flex flex-col items-center shadow-lg shadow-black rounded-lg overflow-hidden pb-4 m-6 bg-gray-900 text-white' id="skills">
          <h2 className='text-4xl self-stretch text-center p-4 bg-purple-950'>My Skills</h2>
          <p className='text-center my-4'>Through my time in University, as well as online coding resources like The <a href="https://www.theodinproject.com/">Odin Project</a>, I have become proficient in the many facets of web development. </p>
          <div style={{gridTemplateColumns: 'auto 20ch'}} className='grid items-center gap-y-4 gap-x-10 bg-black p-6 rounded-md'>
            {Object.entries(skills).map(([area,skills],index)=><React.Fragment key={index}>
              <div className="justify-self-center text-lg ">
                {area}
              </div>
              <div>
                {skills.join(', ')}
              </div>
            </React.Fragment>)}
          </div>
        </section>
}