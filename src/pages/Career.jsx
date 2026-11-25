import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,Briefcase,Building2,CheckCircle2,GraduationCap,MessageCircle,ShieldCheck} from 'lucide-react';
import PageHeading from '../components/PageHeading.jsx';
import Reveal from '../components/Reveal.jsx';

const placementSteps=[
 {icon:GraduationCap,title:'Build your readiness',text:'Students can prepare by developing communication, role-related skills, interview confidence and a clear resume.'},
 {icon:Building2,title:'Learn about campus support',text:'College placement cells may coordinate career guidance, employer sessions, internships and recruitment activities. Services differ by institution.'},
 {icon:Briefcase,title:'Explore suitable opportunities',text:'Eligibility, selection and outcomes depend on the employer, role, institution and each student. No placement outcome is guaranteed.'}
];

export default function Career(){
 return <>
  <PageHeading eyebrow="CAREER GUIDANCE" title="Prepare for the opportunities ahead." crumb="Career" description="A clear overview of college placement support and practical ways to prepare for your next step."/>
  <Reveal as="section" className="section career-intro"><div className="container career-intro-grid"><div><span className="eyebrow">CAREER & PLACEMENT</span><h2>Make your next step <span>informed.</span></h2><p>College placement services are usually coordinated by each institution’s placement or career cell. SUN STAR helps students and families explore colleges and understand what questions to ask about career support.</p><p>Placement services and opportunities vary by college and field of study. Ask the institution for its current, course-specific information before making a decision.</p><Link to="/about#enquiry" className="btn btn-primary">Talk to SUN STAR <MessageCircle size={17}/></Link></div><aside className="career-promise-card"><ShieldCheck size={28}/><strong>Clear, practical guidance</strong><span>Explore options with context. Verify opportunities and outcomes directly with the college.</span></aside></div></Reveal>
  <Reveal as="section" className="section section-soft"><div className="container"><div className="section-heading centered"><span className="eyebrow">PLACEMENT BASICS</span><h2>What to expect</h2><p>Placement support is not the same at every institution. These are common parts of the process to ask about.</p></div><div className="career-guidance-grid">{placementSteps.map(({icon:Icon,title,text})=><article className="career-guidance-card" key={title}><span className="career-guidance-icon"><Icon size={24}/></span><h3>{title}</h3><p>{text}</p></article>)}</div></div></Reveal>
  <Reveal as="section" className="section"><div className="container career-checklist"><div><span className="eyebrow">QUESTIONS TO ASK</span><h2>Get the details that matter.</h2><p>When comparing colleges, ask how career services work for your chosen campus and area of study.</p></div><ul><li><CheckCircle2 size={18}/> Which placement and career services are available?</li><li><CheckCircle2 size={18}/> How are internships and recruitment opportunities shared?</li><li><CheckCircle2 size={18}/> What preparation or eligibility is expected from students?</li></ul></div></Reveal>
 </>;
}
