import React,{useRef,useState} from 'react';
import {motion,useReducedMotion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {ArrowUpRight,CheckCircle2,Eye,FileText,GraduationCap,HeartHandshake,Mail,MapPin,MessageCircle,Phone,ShieldCheck,Target} from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm.jsx';
import Reveal from '../components/Reveal.jsx';
import {SITE,emailUrl,phoneUrl,whatsappUrl} from '../data/site.js';

const infoTabs=[
 {id:'vision',label:'Vision',icon:Eye,title:'Our Vision',paragraphs:['To help students find the right college and move toward a brighter future with confidence.','We want every student and family to have clearer information, thoughtful guidance and the confidence to explore the education path that fits them.'],image:'/assets/bangalore-colleges/acharya-campuslife.webp',imageAlt:'Students sharing notes and discussing their studies together on a college campus',imageLabel:'STUDENT COMMUNITY'},
 {id:'mission',label:'Our Mission',icon:Target,title:'Our Mission',paragraphs:['To make college discovery and admission guidance easier to understand and navigate.','SUN STAR aims to provide approachable support, useful information and clear next steps for students exploring colleges in Tamil Nadu and Bangalore, as well as study abroad options.'],image:'/assets/bangalore-colleges/spurthy-college-library.jpg',imageAlt:'Students working and learning together in a college computer lab',imageLabel:'PRACTICAL LEARNING'},
 {id:'why-sunstar',label:'Why Choose SUN STAR',icon:HeartHandshake,title:'Guidance built around your next step',paragraphs:['Choosing a college is a personal decision. SUN STAR helps students and families explore their options and prepare the questions that matter.'],points:['Explore Tamil Nadu and Bangalore college information in one place.','Speak with a team about admissions and the details you need to verify.','Get clear next-step guidance without pressure or promises of admission.'],image:'/assets/bangalore-colleges/isbr-engineering-campus.jpg',imageAlt:'College students studying together around books in a library',imageLabel:'LEARN TOGETHER'}
];

const values=[
 {icon:GraduationCap,title:'Education first',text:'Help students and families compare options and take their next education step with clarity.'},
 {icon:HeartHandshake,title:'Personal guidance',text:'Make it easy to ask questions and speak with the SUN STAR team.'},
 {icon:ShieldCheck,title:'Clear information',text:'Keep college and fee guidance connected to information supplied by institutions and the SUN STAR booklet.'}
];

export default function About(){
 const [activeTab,setActiveTab]=useState(infoTabs[0].id);
 const tabRefs=useRef([]);
 const reduceMotion=useReducedMotion();
 const selected=infoTabs.find(tab=>tab.id===activeTab)||infoTabs[0];
 const selectTab=(index)=>setActiveTab(infoTabs[index].id);
 const handleTabKeyDown=(event,index)=>{
  let nextIndex=null;
  if(event.key==='ArrowDown'||event.key==='ArrowRight')nextIndex=(index+1)%infoTabs.length;
  if(event.key==='ArrowUp'||event.key==='ArrowLeft')nextIndex=(index-1+infoTabs.length)%infoTabs.length;
  if(event.key==='Home')nextIndex=0;
  if(event.key==='End')nextIndex=infoTabs.length-1;
  if(nextIndex!==null){event.preventDefault();selectTab(nextIndex);tabRefs.current[nextIndex]?.focus()}
 };
 return <>
  <section className="about-info-section" id="about">
   <div className="container">
    <header className="about-info-heading"><span>OUR INFO</span><h1>About Values and Mission</h1><p>Clear information. Personal guidance. A brighter next step.</p></header>
    <div className="about-info-layout">
     <div className="about-info-tabs" role="tablist" aria-label="About SUN STAR" aria-orientation="vertical">
      {infoTabs.map(({id,label,icon:Icon},index)=><button ref={element=>{tabRefs.current[index]=element}} key={id} id={`about-tab-${id}`} className={`about-info-tab${activeTab===id?' is-active':''}`} type="button" role="tab" aria-selected={activeTab===id} aria-controls="about-info-panel" tabIndex={activeTab===id?0:-1} onClick={()=>selectTab(index)} onKeyDown={event=>handleTabKeyDown(event,index)}><Icon size={20}/><span>{label}</span><ArrowUpRight className="about-tab-arrow" size={16}/></button>)}
     </div>
     <div className="about-info-panel-shell" id="about-info-panel" role="tabpanel" aria-labelledby={`about-tab-${selected.id}`}>
       <motion.article key={selected.id} className="about-info-panel" initial={reduceMotion?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:reduceMotion?0:.28,ease:'easeOut'}}>
        <div className="about-info-copy"><span className="eyebrow">SUN STAR EDUCATIONAL TRUST</span><h2>{selected.title}</h2>{selected.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}{selected.points&&<ul className="about-info-points">{selected.points.map(point=><li key={point}><CheckCircle2 size={18}/><span>{point}</span></li>)}</ul>}<Link to="/about#enquiry" className="btn btn-primary">Talk to SUN STAR <ArrowUpRight size={17}/></Link></div>
        <figure className="about-info-image"><img src={selected.image} alt={selected.imageAlt} loading="eager"/><figcaption><span>{selected.imageLabel}</span><strong>Explore. Learn. Move forward.</strong></figcaption></figure>
       </motion.article>
     </div>
    </div>
    <div className="about-info-values"><span className="eyebrow">WHAT MATTERS TO US</span><div className="about-value-grid">{values.map(({icon:Icon,title,text})=><article key={title}><Icon size={27}/><h3>{title}</h3><p>{text}</p></article>)}</div></div>
   </div>
  </section>
  <Reveal as="section" className="section section-soft about-anchor" id="contact"><div className="container"><div className="section-heading"><div><span className="eyebrow">CONTACT SUN STAR</span><h2>We’re here to help.</h2><p>Choose the easiest way to reach our team.</p></div><Link to="/about#enquiry" className="btn btn-outline">Send an Enquiry <ArrowUpRight size={16}/></Link></div><div className="about-contact-grid"><a className="about-contact-card" href={phoneUrl}><span><Phone size={22}/></span><small>CALL US</small><strong>+91 {SITE.phone}</strong><em>Speak with the team</em></a><a className="about-contact-card" href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><span><MessageCircle size={22}/></span><small>WHATSAPP</small><strong>+91 {SITE.whatsapp}</strong><em>Send your question</em></a><a className="about-contact-card" href={emailUrl}><span><Mail size={22}/></span><small>EMAIL</small><strong>{SITE.email}</strong><em>Admissions and general enquiries</em></a><article className="about-address-card"><MapPin size={22}/><div><small>VISIT OUR OFFICE</small><strong>SUN STAR Educational Trust</strong><p>{SITE.address}</p><span><CheckCircle2 size={15}/> Please call ahead to confirm office hours.</span></div></article></div></div></Reveal>
  <Reveal as="section" className="section about-anchor" id="enquiry"><div className="container"><div className="section-heading"><div><span className="eyebrow">STUDENT ENQUIRY</span><h2>Let’s find your <span>next step.</span></h2><p>Share a few details and prepare an enquiry for the SUN STAR team on WhatsApp.</p></div></div><div className="about-enquiry-layout"><div className="enquiry-panel"><div className="form-panel-heading"><span className="eyebrow">ADMISSION GUIDANCE</span><h2>How can we help?</h2><p>Fields marked with * are required. Review your message in WhatsApp before sending.</p></div><EnquiryForm compact/></div><aside className="about-enquiry-aside"><span className="about-purpose-icon"><HeartHandshake size={25}/></span><span className="eyebrow light">HERE TO HELP</span><h3>A conversation can make the next step clearer.</h3><p>Ask about college options, admissions information or study abroad guidance.</p><div><CheckCircle2 size={17}/> Personal guidance from SUN STAR</div><div><CheckCircle2 size={17}/> College and booklet information</div><div><CheckCircle2 size={17}/> Clear next steps for your enquiry</div></aside></div></div></Reveal>
 </>;
}
