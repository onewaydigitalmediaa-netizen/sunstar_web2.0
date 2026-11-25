import React,{useEffect,useState} from 'react';
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {ArrowRight,ArrowUpRight} from 'lucide-react';

const slides=[
 {eyebrow:'SUN STAR EDUCATIONAL TRUST',main:'YOUR NEXT CHAPTER',highlight:'STARTS HERE.',description:'Explore college options and take your next step with guidance that makes sense.',primary:'Explore Colleges',primaryTo:'/colleges',secondary:'Enquire Now',secondaryTo:'/enquiry'},
 {eyebrow:'FIND YOUR PLACE',main:'FIND A COLLEGE',highlight:'THAT FITS YOU.',description:'Discover universities and colleges across Tamil Nadu and Bangalore.',primary:'Find Colleges',primaryTo:'/colleges',secondary:'Enquire Now',secondaryTo:'/enquiry'},
 {eyebrow:'EXPLORE YOUR OPTIONS',main:'CHOOSE YOUR COURSE',highlight:'WITH CONFIDENCE.',description:'Understand your options before making an important decision.',primary:'Explore Courses',primaryTo:'/courses',secondary:'Enquire Now',secondaryTo:'/enquiry'},
 {eyebrow:'STRAIGHTFORWARD ADMISSION GUIDANCE',main:'FROM QUESTIONS',highlight:'TO CLEAR CHOICES.',description:'Get straightforward guidance on colleges, courses and admissions.',primary:'Get Guidance',primaryTo:'/enquiry',secondary:'Enquire Now',secondaryTo:'/enquiry'},
 {eyebrow:'YOUR JOURNEY WITH SUN STAR',main:'YOUR COLLEGE JOURNEY,',highlight:'MADE SIMPLER.',description:'From your first enquiry to your next step, SUN STAR is here to guide you.',primary:'Enquire Now',primaryTo:'/enquiry',secondary:'Explore Colleges',secondaryTo:'/colleges'}
];
const entry={x:44,opacity:0};
const exit={x:-44,opacity:0};

export default function HeroSlides(){
 const reduceMotion=useReducedMotion();
 const [index,setIndex]=useState(0);
 const [interacting,setInteracting]=useState(false);
 const [paused,setPaused]=useState(false);
 const [visible,setVisible]=useState(()=>!document.hidden);
 useEffect(()=>{const change=()=>setVisible(!document.hidden);document.addEventListener('visibilitychange',change);return()=>document.removeEventListener('visibilitychange',change)},[]);
 useEffect(()=>{if(reduceMotion||!visible||interacting||paused)return;const timer=window.setInterval(()=>setIndex(i=>(i+1)%slides.length),3000);return()=>window.clearInterval(timer)},[reduceMotion,visible,interacting,paused]);
 const slide=slides[index];
 return <div className="cinematic-slides" onMouseEnter={()=>setInteracting(true)} onMouseLeave={()=>setInteracting(false)} onFocusCapture={()=>setInteracting(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setInteracting(false)}}>
  <AnimatePresence mode="wait">
   <motion.div key={index} className={`cinematic-slide cinematic-slide-${index+1}`} initial={reduceMotion?false:entry} animate={{x:0,opacity:1}} exit={reduceMotion?undefined:exit} transition={{duration:.4,ease:[.22,1,.36,1]}}>
    <span className="cinematic-eyebrow">{slide.eyebrow}</span>
    <h1 id="sun-ref-title"><span className="cinematic-line">{slide.main}</span><span className="cinematic-line cinematic-highlight">{slide.highlight}</span></h1>
    <p>{slide.description}</p>
    <div className="cinematic-actions"><Link to={slide.primaryTo} className="cinematic-button cinematic-primary">{slide.primary}<ArrowRight size={18}/></Link><Link to={slide.secondaryTo} className="cinematic-button cinematic-secondary">{slide.secondary}<ArrowUpRight size={17}/></Link></div>
   </motion.div>
  </AnimatePresence>
  <div className="cinematic-progress"><div className="cinematic-progress-bars" aria-hidden="true">{slides.map((_,i)=><span key={i} className={i===index?'is-active':''}/>)}</div>{!reduceMotion&&<button type="button" className="cinematic-pause" onClick={()=>setPaused(value=>!value)} aria-label={paused?'Play hero slides':'Pause hero slides'}>{paused?'Play':'Pause'}</button>}</div>
 </div>;
}
