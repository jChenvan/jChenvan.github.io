export default function Education() {
    return <section className='flex flex-col box-glow rounded-lg p-4 m-6 items-center'>
          <h2 className='text-4xl text-center'>Education</h2>
          <img src="/UWaterlooLogo.png" alt="" width={400} className='my-4'/>
          <p className='w-[50ch] text-center mb-4'> My time at UWaterloo is an experience I treasure dearly. It was there where I learned valueable skills such as python, javascript, SQL and creating/working with relational databases. More than that, I learned skills than can be applied in any situation; algorithm design, critical thinking, problem solving, communication and quick/efficient learning. </p>
          <div style={{gridTemplateColumns:"auto 1fr"}} className='grid gap-2 bg-black border-blue-900 border-2 p-2 rounded-md'>
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