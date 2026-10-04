import { useState, type ReactNode } from "react";
import longText from "./long-text";

function Paragraphs({text, className}:{text:string, className?:string}) {
  const paragraphs = text.split("\n");
  const trimmedParagraphs = paragraphs.map(str=>str.trim()).filter(Boolean);

  return <>
    {trimmedParagraphs.map(str=><p className={className}>{str}</p>)}
  </>
}

interface NavItem {
  label: string;
  href: string;
}

interface NavProps {
  navItems:NavItem[];
}

function Nav({navItems}:NavProps) {
  return (<nav>
    {navItems.map(item=>(
      <div key={item.href}>
        <a href={item.href}>
          {item.label}
        </a>
      </div>
    ))}
  </nav>)
}

function Section({children, id}:{children?: ReactNode|ReactNode[], id:string}) {
  return (
    <section className="rounded-lg" id={id}>
      {children}
    </section>
  )
}

interface Contact {
  imageSrc:string;
  url:string;
  label?:string;
}

interface IntroProps {
  imageSrc:string;
  title:string;
  intro:string;
  contacts:Contact[];
  id:string;
}

function Intro({imageSrc,title,intro,contacts,id}:IntroProps) {
  return <Section id={id}>
    <div className="flex">
      <div className="p-2">
        <img src={imageSrc} alt={imageSrc} />
      </div>
      <div className="flex flex-1 p-2">
        <div className="mb-2">
          <h3>{title}</h3>
          <Paragraphs text={intro}/>
        </div>
        <div>
          {contacts.map(contact=>(
            <a key={contact.url} href={contact.url}>
              <img src={contact.imageSrc} alt={contact.label ?? contact.imageSrc}/>
            </a>
          ))}
        </div>
      </div>
    </div>
  </Section>
}

interface SkillsProps {
  title:string;
  desc:string;
  skills: {[category:string]: string[]};
  id:string;
}

function Skills({title,desc,skills,id}:SkillsProps) {
  return <Section id={id}>
    <h2>{title}</h2>
    <p>{desc}</p>
    <table>
      {Object.entries(skills).map(([category,skillList])=>(
        <tr>
          <td>{category}</td>
          <td>{skillList.join(', ')}</td>
        </tr>
      ))}
    </table>
  </Section>
}


interface Experience {
  company:string;
  position:string;
  date:string;
  desc:string;
  imageSrc:string;
}

interface ExperiencesProps {
  title:string;
  experiences: Experience[];
  id:string;
}

function Experiences({title,experiences,id}:ExperiencesProps) {
  const [index,setIndex] = useState(0);
  const {position,company,date,imageSrc,desc} = experiences[index];

  return <Section id={id}>
    <h2>{title}</h2>
    <div>
      <select onChange={e=>setIndex(Number(e.target.value))}>
        {experiences.map(({company,position}, index)=>(
          <option key={index} value={index}>{position} at {company}</option>
        ))}
      </select>
      <div className="flex">
        <div>
          <img src={imageSrc} alt={imageSrc} />
        </div>
        <div className="flex-1">
          <h3>{position} at {company}, ({date})</h3>
          <Paragraphs text={desc}/>
        </div>
      </div>
    </div>
  </Section>
}

interface EducationProps {
  imageSrc:string;
  title:string;
  school:string;
  major: string;
  minor: string;
  date: string;
  desc:string;
  id:string;
}

function Education({imageSrc,title,desc,school,major,minor,date,id}:EducationProps) {
  return <Section id={id}>
    <div className="flex">
      <div className="p-2">
        <img src={imageSrc} alt={imageSrc} />
      </div>
      <div className="flex flex-1 p-2">
        <h3>{title}</h3>
        <div>{school}, {major} major, {minor} minor, {date}</div>
        <Paragraphs text={desc}/>
      </div>
    </div>
  </Section>
}

function App() {

  const navItems:NavItem[] = [
    {
      label:'About Me',
      href:'#intro',
    },
    {
      label:'My Skills',
      href:'#skills',
    },
    {
      label:'Experience',
      href:'#experience',
    },
    {
      label:'Education',
      href:'#education',
    },
  ];

  const contacts:Contact[] = [
    {
      imageSrc:'/email.svg',
      url:'mailto:jchenvan@uwaterloo.ca',
    },
    {
      imageSrc:'/github.png',
      url:'https://github.com/jChenvan/'
    },
    {
      imageSrc:'/linkedin.png',
      url:'https://www.linkedin.com/in/jchenvan/',
    }
  ];

  const skills = {
    ['Programming Languages']: ['TypeScript', 'JavaScript', 'Python', 'C', 'R'],
    ['Backend']: ['NodeJs', 'ExpressJs', 'REST', 'Prisma ORM', 'Firebase'],
    ['Frontend']: ['HTML', 'CSS', 'React', 'TailwindCSS', 'ThreeJS'],
    ['Mobile']: ['Flutter'],
    ['Database']: ['PostgreSQL', 'MySQL'],
    ['Operating Systems']: ['Linux', 'Windows', 'MacOS'],
    ['Other']: ['Blender']
  }

  const experiences:Experience[] = [
    {
      position: 'temp1',
      company:'temp1',
      date:'Jan 2001 - Jan 2002',
      desc:'this is a placeholder,',
      imageSrc:'/email.svg',
    },     
    {
      position: 'temp1',
      company:'temp1',
      date:'Jan 2001 - Jan 2002',
      desc:'this is a placeholder,',
      imageSrc:'/email.svg',
    },
  ];

  return (
    <>
      <Nav navItems={navItems}/>
      <h1>Justin Chenvanich</h1>
      <main>
        <Intro
          id="intro"
          title="About Me"
          intro={longText.intro}
          imageSrc="/profile-pic.jpg"
          contacts={contacts}
        />
        <Skills
          id="skils"
          title="My Skills"
          desc={longText.skillsIntro}
          skills={skills}
        />
        <Experiences
          id="experience"
          title="Experience"
          experiences={experiences}
        />
        <Education
          id="education"
          title="Education"
          date="Sep 2019 - Aug 2024"
          desc={longText.educationDesc}
          imageSrc="/UWaterlooLogo.png"
          major="Applied Maths"
          minor="Computer Science"
          school="University of Waterloo"
        />
      </main>
      <footer></footer>
    </>
  )
}

export default App
