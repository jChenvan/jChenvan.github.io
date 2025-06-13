import skills from "../site data/skills.json"

export default function Skills () {
    return <section className='flex flex-col items-center box-glow rounded-lg p-4 m-6'>
          <h2 className='text-4xl'>My Skills</h2>
          <p className='text-center my-4'>Through my time in University, as well as online coding resources like The <a href="https://www.theodinproject.com/">Odin Project</a>, I have become proficient in the many facets of web development. </p>
          <div className='flex flex-wrap gap-6'>
            {Object.entries(skills).map(([area, skills]) => <div key={area}>
              <h3 className='mb-2 w-[10ch]'>{area}</h3>
              <ul>
                {skills.map((skill,index) => <li key={index} className="before:content-['>'] before:mr-1">{skill}</li>)}
              </ul>
            </div>)}
          </div>
        </section>
}