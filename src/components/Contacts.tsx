export default function Contacts() {
    return <section className='flex flex-col shadow-lg shadow-black bg-green-700 text-white rounded-lg p-4 m-6 items-center' id="contacts">
          <h2 className='text-4xl text-center self-stretch pb-4 border-b-2'>Contacts</h2>
          <div className='flex gap-10 my-4'>
            <a href="mailto:jchenvan@uwaterloo.ca" className='hover:opacity-70 transition-all'>
              <img src="/email.svg" alt="" className='h-[100px]'/>
            </a>
            <a href="https://www.linkedin.com/in/jchenvan/" className='hover:opacity-70 transition-all'>
            <img src="/linkedin.png" alt="" className='h-[100px]'/>
            </a>
            <a href="https://github.com/jChenvan" className='hover:opacity-70 transition-all'>
            <img src="/github.png" alt="" className='h-[100px]'/></a>
          </div>
        </section>;
}