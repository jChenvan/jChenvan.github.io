export default function Education() {
    return <section className='flex flex-col shadow-lg shadow-black rounded-lg overflow-hidden m-6 items-center pb-4 bg-gray-900 text-white' id="education">
          <h2 className='text-4xl text-center self-stretch p-4 bg-purple-950'>Education</h2>
          <img src="/UWaterlooLogo.png" alt="" width={400} className='my-4'/>
          <p className='max-w-[50ch] text-center mb-4 mx-2'> My time at UWaterloo is an experience I treasure dearly. It was there where I learned valueable skills such as python, javascript, SQL and creating/working with relational databases. More than that, I learned skills than can be applied in any situation; algorithm design, critical thinking, problem solving, communication and quick/efficient learning. </p>
          <div style={{gridTemplateColumns:"auto auto"}} className='grid gap-2 bg-black p-2 rounded-md'>
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