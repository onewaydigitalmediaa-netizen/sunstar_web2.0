import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,Search,GraduationCap,Building2,BookOpen,Stethoscope,HeartPulse,FlaskConical,Landmark,CheckCircle2,FileText,PhoneCall,ChevronRight,MessageCircle,MapPinned} from 'lucide-react';
import {phoneUrl} from '../data/site.js';
import ReferenceHomeHero from '../components/ReferenceHomeHero.jsx';
import Reveal from '../components/Reveal.jsx';
import FAQSection from '../components/FAQSection.jsx';
import StudentReviews from '../components/StudentReviews.jsx';
import ImpactStats from '../components/ImpactStats.jsx';
const categories=[
 {name:'Engineering',desc:'B.E., B.Tech & technology',icon:GraduationCap,tone:'aqua'},
 {name:'Nursing',desc:'Nursing & patient care',icon:HeartPulse,tone:'pink'},
 {name:'Pharmacy',desc:'Pharmaceutical studies',icon:FlaskConical,tone:'peach'},
 {name:'Arts & Science',desc:'Arts, commerce & science',icon:BookOpen,tone:'lavender'},
 {name:'Healthcare',desc:'Allied health & paramedical',icon:Stethoscope,tone:'mint'},
 {name:'Polytechnic',desc:'Diploma & technical courses',icon:Building2,tone:'sky'}
];
export default function Home(){
 return <>
  <ReferenceHomeHero/>
  <ImpactStats/>
  <Reveal as="section" className="section" id="streams"><div className="container"><div className="section-heading"><div><span className="eyebrow">DISCOVER YOUR PATH</span><h2>Choose a field that <span>inspires you.</span></h2><p>From engineering to health sciences, find your ideal next step.</p></div><Link to="/courses" className="text-link">View all streams <ArrowUpRight size={17}/></Link></div><div className="category-grid">{categories.map(({name,desc,icon:Icon,tone})=><Link className={`category-card category-${tone}`} to={`/colleges?stream=${encodeURIComponent(name)}`} key={name}><span className="category-symbol"><Icon size={27} strokeWidth={1.7}/></span><strong>{name}</strong><small>{desc}</small><span className="category-arrow"><ArrowUpRight size={19}/></span></Link>)}</div></div></Reveal>
  <Reveal as="section" className="section"><div className="container why-grid"><div className="why-visual"><div className="why-image"><img src="/assets/sunstar-brochure.jpg" alt="SUN STAR brochure showing education support and MBBS abroad guidance"/></div><div className="why-badge"><span><FileText size={24}/></span><strong>Booklet-backed details</strong><small>Original fee pages available</small></div></div><div className="why-copy"><span className="eyebrow">WHY SUN STAR?</span><h2>A simpler way to make a <span>big decision.</span></h2><p>Choosing a college means balancing your interests, budget and long-term goals. We help you take that decision one clear step at a time.</p><div className="why-list"><div><CheckCircle2 size={22}/><span><strong>Discover suitable colleges</strong><small>Browse institutions and course streams in Tamil Nadu.</small></span></div><div><CheckCircle2 size={22}/><span><strong>Understand published fees</strong><small>See representative quotes and original fee-booklet pages.</small></span></div><div><CheckCircle2 size={22}/><span><strong>Talk to a real counsellor</strong><small>Get help with admissions, requirements and next steps.</small></span></div></div><Link to="/about" className="btn btn-primary">Get to know SUN STAR <ArrowUpRight size={18}/></Link></div></div></Reveal>
  <Reveal as="section" className="section abroad-section"><div className="container abroad-layout"><div><span className="eyebrow light">EXPLORE BEYOND BORDERS</span><h2>Dreaming of studying<br/><span>medicine abroad?</span></h2><p>Our SUN STAR Med Abroad guidance covers MBBS study options including Georgia, Vietnam, Uzbekistan and Russia. Speak with the team about eligibility, universities and estimated costs.</p><div className="abroad-countries"><span>ðŸ‡¬ðŸ‡ª Georgia</span><span>ðŸ‡»ðŸ‡³ Vietnam</span><span>ðŸ‡ºðŸ‡¿ Uzbekistan</span><span>ðŸ‡·ðŸ‡º Russia</span></div><Link to="/services#mbbs-abroad" className="btn btn-yellow">Explore MBBS Abroad <ArrowUpRight size={18}/></Link></div><div className="abroad-mark"><span>GLOBAL<br/>OPPORTUNITIES</span><GraduationCap size={95} strokeWidth={1.1}/></div></div></Reveal>
  <Reveal as="section" className="section"><div className="container"><div className="section-heading centered"><span className="eyebrow">SIMPLE & SUPPORTIVE</span><h2>Your admission journey, <span>made easier.</span></h2><p>Three practical steps to begin your next chapter.</p></div><div className="steps-grid">{[{n:'01',icon:Search,title:'Discover',text:'Explore courses, colleges and fee guide information.'},{n:'02',icon:MessageCircle,title:'Connect',text:'Tell us your interests and questions through our enquiry form or WhatsApp.'},{n:'03',icon:GraduationCap,title:'Plan',text:'Discuss eligibility, fee categories and admission next steps with the counsellor.'}].map(({n,icon:Icon,title,text})=><div className="step-card" key={n}><span className="step-number">{n}</span><span className="step-icon"><Icon size={25}/></span><h3>{title}</h3><p>{text}</p></div>)}</div></div></Reveal>
  <FAQSection/>
  <Reveal as="section" className="section section-bottom-cta"><div className="container"><div className="bottom-cta"><div><span className="eyebrow light">NEED HELP DECIDING?</span><h2>Let's find your next step together.</h2><p>Reach the SUN STAR team for admissions and college information.</p></div><div className="cta-buttons"><Link to="/enquiry" className="btn btn-yellow">Enquire Now <ArrowUpRight size={18}/></Link><a href={phoneUrl} className="btn btn-white-outline"><PhoneCall size={17}/> Call Our Team</a></div></div></div></Reveal>
  <StudentReviews/>
 </>
}
