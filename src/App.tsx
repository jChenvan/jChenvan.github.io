import { useState, type ReactNode } from "react";
import longText from "./long-text";

function Paragraphs({ text, className }: { text: string; className?: string }) {
  const paragraphs = text.split("\n").map((str) => str.trim()).filter(Boolean);

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p className={className} key={`${index}-${paragraph}`}>
          {paragraph}
        </p>
      ))}
    </>
  );
}

interface NavItem {
  label: string;
  href: string;
}

interface NavProps {
  navItems: NavItem[];
}

function Nav({ navItems }: NavProps) {
  return (
    <nav aria-label="Main navigation" className="flex flex-wrap items-center justify-center gap-1 sm:justify-end">
      {navItems.map((item) => (
        <a
          className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          href={item.href}
          key={item.href}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

function Section({ children, id }: { children?: ReactNode | ReactNode[]; id: string }) {
  return (
    <section
      className="scroll-mt-28 rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-xl shadow-black/10 sm:p-8"
      id={id}
    >
      {children}
    </section>
  );
}

interface Contact {
  imageSrc: string;
  url: string;
  label?: string;
}

interface IntroProps {
  imageSrc: string;
  title: string;
  intro: string;
  contacts: Contact[];
  id: string;
}

function Intro({ imageSrc, title, intro, contacts, id }: IntroProps) {
  return (
    <Section id={id}>
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
        <img
          alt="Justin Chenvanich"
          className="h-52 w-52 shrink-0 rounded-2xl border border-slate-700 object-cover shadow-lg shadow-black/30 sm:h-60 sm:w-60"
          src={imageSrc}
        />
        <div className="min-w-0 flex-1 text-center md:text-left">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">A little about me</p>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
          <Paragraphs className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8" text={intro} />
          <div aria-label="Contact links" className="mt-7 flex items-center justify-center gap-3 md:justify-start">
            {contacts.map((contact) => (
              <a
                aria-label={contact.label ?? contact.url}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/80 transition hover:-translate-y-0.5 hover:border-cyan-400/60 hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                href={contact.url}
                key={contact.url}
                rel={contact.url.startsWith("http") ? "noreferrer" : undefined}
                target={contact.url.startsWith("http") ? "_blank" : undefined}
              >
                <img alt="" className="h-5 w-5 object-contain" src={contact.imageSrc} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

interface SkillsProps {
  title: string;
  desc: string;
  skills: { [category: string]: string[] };
  id: string;
}

function Skills({ title, desc, skills, id }: SkillsProps) {
  return (
    <Section id={id}>
      <div className="mb-7">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">What I work with</p>
        <h2 className="mb-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
        <p className="max-w-3xl leading-7 text-slate-400">{desc}</p>
      </div>
      <dl className="grid gap-3 sm:grid-cols-2">
        {Object.entries(skills).map(([category, skillList]) => (
          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4" key={category}>
            <dt className="mb-3 text-sm font-semibold text-slate-200">{category}</dt>
            <dd className="flex flex-wrap gap-2">
              {skillList.map((skill) => (
                <span
                  className="rounded-lg border border-slate-700/80 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-300"
                  key={skill}
                >
                  {skill}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

interface Experience {
  company: string;
  position: string;
  date: string;
  desc: string;
  imageSrc: string;
}

interface ExperiencesProps {
  title: string;
  experiences: Experience[];
  id: string;
}

function Experiences({ title, experiences, id }: ExperiencesProps) {
  const [index, setIndex] = useState(0);
  const { position, company, date, imageSrc, desc } = experiences[index];

  return (
    <Section id={id}>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Where I have worked</p>
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
        </div>
        <select
          aria-label="Select experience"
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 sm:max-w-xs"
          onChange={(event) => setIndex(Number(event.target.value))}
          value={index}
        >
          {experiences.map(({ company, position }, experienceIndex) => (
            <option key={experienceIndex} value={experienceIndex}>
              {position} at {company}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-5 rounded-2xl border border-slate-800 bg-slate-950/50 p-5 sm:flex-row sm:gap-6 sm:p-6">
        <img
          alt={`${company} logo`}
          className="h-16 w-16 shrink-0 rounded-xl border border-slate-800 object-contain p-2"
          src={imageSrc}
        />
        <div className="min-w-0">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-lg font-semibold text-white">{position} at {company}</h3>
            <span className="text-sm text-slate-400">{date}</span>
          </div>
          <Paragraphs className="leading-7 text-slate-300" text={desc} />
        </div>
      </div>
    </Section>
  );
}

interface EducationProps {
  imageSrc: string;
  title: string;
  school: string;
  major: string;
  minor: string;
  date: string;
  desc: string;
  id: string;
}

function Education({ imageSrc, title, desc, school, major, minor, date, id }: EducationProps) {
  return (
    <Section id={id}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <img
          alt="University of Waterloo logo"
          className="h-20 w-20 shrink-0 rounded-2xl border border-slate-800 object-contain p-2"
          src={imageSrc}
        />
        <div className="min-w-0">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Education</p>
          <h2 className="mb-2 text-2xl font-semibold tracking-tight text-white">{title}</h2>
          <p className="mb-4 text-sm leading-6 text-slate-400">
            {school} <span className="text-slate-600">·</span> {major} major, {minor} minor{" "}
            <span className="text-slate-600">·</span> {date}
          </p>
          <Paragraphs className="leading-7 text-slate-300" text={desc} />
        </div>
      </div>
    </Section>
  );
}

function App() {
  const navItems: NavItem[] = [
    { label: "About Me", href: "#intro" },
    { label: "My Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
  ];

  const contacts: Contact[] = [
    { imageSrc: "/email.svg", url: "mailto:jchenvan@uwaterloo.ca", label: "Email Justin" },
    { imageSrc: "/github.png", url: "https://github.com/jChenvan/", label: "GitHub profile" },
    { imageSrc: "/linkedin.png", url: "https://www.linkedin.com/in/jchenvan/", label: "LinkedIn profile" },
  ];

  const skills = {
    ["Programming Languages"]: ["TypeScript", "JavaScript", "Python", "C", "R"],
    ["Backend"]: ["NodeJs", "ExpressJs", "REST", "Prisma ORM", "Firebase"],
    ["Frontend"]: ["HTML", "CSS", "React", "TailwindCSS", "ThreeJS"],
    ["Mobile"]: ["Flutter"],
    ["Database"]: ["PostgreSQL", "MySQL"],
    ["Operating Systems"]: ["Linux", "Windows", "MacOS"],
    ["Other"]: ["Blender"],
  };

  const experiences: Experience[] = [
    {
      position: "temp1",
      company: "temp1",
      date: "Jan 2001 - Jan 2002",
      desc: "this is a placeholder,",
      imageSrc: "/email.svg",
    },
    {
      position: "temp1",
      company: "temp1",
      date: "Jan 2001 - Jan 2002",
      desc: "this is a placeholder,",
      imageSrc: "/email.svg",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 selection:bg-cyan-300/30">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 h-136 bg-[radial-gradient(ellipse_at_top,rgba(8,145,178,0.16),transparent_65%)]" />
      <header className="sticky top-0 z-10 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <a className="flex items-center justify-center gap-3 sm:justify-start" href="#top">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-sm font-bold text-cyan-300 ring-1 ring-inset ring-cyan-300/20">
              JC
            </span>
            <span className="text-sm font-semibold tracking-wide text-slate-200">Justin Chenvanich</span>
          </a>
          <Nav navItems={navItems} />
        </div>
      </header>
      <main className="relative mx-auto flex max-w-5xl flex-col gap-6 px-5 pb-16 pt-12 sm:gap-8 sm:px-8 sm:pt-16" id="top">
        <div className="mb-2">
          <p className="mb-3 flex items-center gap-2 text-sm font-medium text-cyan-300">
            <span aria-hidden="true" className="h-px w-8 bg-cyan-400" />
            Portfolio
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Justin Chenvanich<span className="text-cyan-300">.</span>
          </h1>
          <p className="mt-4 text-lg text-slate-400">Recent graduate · Full-stack web developer</p>
        </div>
        <Intro
          id="intro"
          title="About Me"
          intro={longText.intro}
          imageSrc="/profile-pic.jpg"
          contacts={contacts}
        />
        <Skills
          id="skills"
          title="My Skills"
          desc={longText.skillsIntro}
          skills={skills}
        />
        <Experiences id="experience" title="Experience" experiences={experiences} />
        <Education
          id="education"
          title="University of Waterloo"
          date="Sep 2019 - Aug 2024"
          desc={longText.educationDesc}
          imageSrc="/UWaterlooLogo.png"
          major="Applied Maths"
          minor="Computer Science"
          school="University of Waterloo"
        />
      </main>
      <footer className="border-t border-slate-800/80 px-5 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Justin Chenvanich
      </footer>
    </div>
  );
}

export default App;
