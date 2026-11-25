import React,{useState} from 'react';
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';
import {ChevronDown} from 'lucide-react';
import Reveal from './Reveal.jsx';

const questions=[
 ['Where does the college information come from?','The directory is based on information collected by SUN STAR. Confirm current courses, eligibility and availability with the institution before applying.'],
 ['How do I confirm current admission information?','Send an enquiry with your preferred college and course. The SUN STAR team can guide you on the questions to ask the institution.'],
 ['How do I ask about a particular course or college?','Open the Enquiry page, choose a course or stream and add a preferred college. Your details are placed into a WhatsApp message for you to review and send to SUN STAR.'],
 ['Can SUN STAR help with MBBS abroad options?','Yes. The site includes MBBS abroad guidance for Georgia, Vietnam, Uzbekistan and Russia. Contact the team to discuss eligibility, universities and estimated costs.']
];

export default function FAQSection(){
 const [open,setOpen]=useState(0);const reduceMotion=useReducedMotion();
 return <Reveal as="section" className="section faq-section"><div className="container faq-layout"><div className="faq-heading"><span className="eyebrow">GOOD TO KNOW</span><h2>Questions, <span>answered.</span></h2><p>Clear information helps students and families make confident choices.</p></div><div className="faq-list">{questions.map(([question,answer],i)=><article className={`faq-item${open===i?' is-open':''}`} key={question}><h3><button type="button" aria-expanded={open===i} aria-controls={`faq-answer-${i}`} onClick={()=>setOpen(open===i?-1:i)}>{question}<motion.span animate={{rotate:open===i?180:0}} transition={{duration:reduceMotion?0:.2}}><ChevronDown size={19}/></motion.span></button></h3><AnimatePresence initial={false}>{open===i&&<motion.div id={`faq-answer-${i}`} className="faq-answer" initial={reduceMotion?false:{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={reduceMotion?undefined:{height:0,opacity:0}} transition={{duration:reduceMotion?0:.24,ease:'easeInOut'}}><p>{answer}</p></motion.div>}</AnimatePresence></article>)}</div></div></Reveal>
}
