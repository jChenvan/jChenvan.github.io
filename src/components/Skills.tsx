import React from "react"
import skills from "../site data/skills"



export default function Skills () {
    return <section className='flex flex-col items-center shadow-lg shadow-black rounded-lg p-4 m-6 bg-red-700 text-white' id="skills">
          <h2 className='text-4xl self-stretch border-b-2 text-center pb-4'>My Skills</h2>
          <p className='text-center my-4'>Through my time in University, as well as online coding resources like The <a href="https://www.theodinproject.com/">Odin Project</a>, I have become proficient in the many facets of web development. </p>
          <div style={{gridTemplateColumns: 'auto auto'}} className='grid gap-y-2 gap-x-3 bg-red-950 p-2 rounded-md'>
            {Object.entries(skills).map(([area,skills],index)=><React.Fragment key={index}>
              <div>
                {area}
              </div>
              <div>
                {skills.join(', ')}
              </div>
            </React.Fragment>)}
          </div>
        </section>
}