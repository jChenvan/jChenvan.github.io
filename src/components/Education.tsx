export default function Education() {
    return <section className='flex flex-col shadow-lg shadow-black rounded-lg p-4 m-6 items-center bg-amber-600 text-white' id="education">
          <h2 className='text-4xl text-center self-stretch pb-4 border-b-2'>Education</h2>
          <img src="/UWaterlooLogo.png" alt="" width={400} className='my-4'/>
          <p className='w-[50ch] text-center mb-4'> My time at UWaterloo is an experience I treasure dearly. It was there where I learned valueable skills such as python, javascript, SQL and creating/working with relational databases. More than that, I learned skills than can be applied in any situation; algorithm design, critical thinking, problem solving, communication and quick/efficient learning. </p>
          <div style={{gridTemplateColumns:"auto auto"}} className='grid gap-2 bg-amber-900 p-2 rounded-md'>
            <div>School</div>
            <div>University of Waterloo</div>
            <div>Major</div>
            <div>Applied Mathematics</div>
            <div>Minor</div>
            <div>Computing</div>
            <div>Date</div>
            <div>Sep 2019 - Aug 2024</div>
          </div>
        </section>;
}