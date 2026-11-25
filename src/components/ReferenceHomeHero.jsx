import React from 'react';
import {useReducedMotion} from 'framer-motion';
import {Link,useNavigate} from 'react-router-dom';
import {ArrowRight,ArrowUpRight,BookOpen,Building2,Headphones,MapPin,Search} from 'lucide-react';
import {loadBangaloreTopColleges,loadTamilNaduTopColleges,preloadCollegePage} from '../collegeRouteLoaders.js';
import HeroSlides from './HeroSlides.jsx';


export default function ReferenceHomeHero(){
 const reduceMotion=useReducedMotion();
 const videoRef=React.useRef(null);
 React.useEffect(()=>{const video=videoRef.current;if(!video)return;if(reduceMotion)video.pause();else video.play().catch(()=>{});},[reduceMotion]);
 const [query,setQuery]=React.useState('');
 const navigate=useNavigate();
 const search=e=>{e.preventDefault();navigate(`/colleges${query.trim()?`?q=${encodeURIComponent(query.trim())}`:''}`)};
 return <>
 <section className="sun-ref-hero" aria-labelledby="sun-ref-title">
  <div className="sun-video-hero">
  <video ref={videoRef} className="sun-video-background" autoPlay={!reduceMotion} muted loop playsInline preload="metadata" poster="/videos/sunstar-poster.jpg" aria-hidden="true"><source src="/videos/viedo-sunstar.mp4" type="video/mp4"/></video>
  <div className="sun-video-shade" aria-hidden="true"/>
  <div className="container sun-ref-hero-grid">
   <HeroSlides/>
  </div>
  </div>
  <div className="container">
   <form onSubmit={search} role="search" className="sun-ref-search-glass"><Search size={22}/><label htmlFor="sun-ref-search" className="sr-only">Search colleges</label><input id="sun-ref-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search colleges, cities or courses…"/><button type="submit">Find a College <ArrowRight size={18}/></button></form>
   <div className="sun-ref-facts" aria-label="SUN STAR services and listed institutions">
    <div><span className="sun-ref-fact-icon"><Building2/></span><span><strong>100+</strong><small>Tamil Nadu colleges</small></span></div>
    <div><span className="sun-ref-fact-icon"><MapPin/></span><span><strong>10+</strong><small>Bangalore colleges</small></span></div>
    <div><span className="sun-ref-fact-icon"><BookOpen/></span><span><strong>UG &amp; PG</strong><small>Programs to explore</small></span></div>
    <div><span className="sun-ref-fact-icon"><Headphones/></span><span><strong>Personal guidance</strong><small>Talk to SUN STAR</small></span></div>
   </div>
  </div>
 </section>
 <section className="home-discovery-section section" aria-labelledby="home-discovery-title"><div className="container">
  <div className="home-discovery-heading"><span className="sun-ref-eyebrow"><i/> DISCOVER YOUR NEXT STEP</span><h2 id="home-discovery-title">Start with a place.<br/><span>Find your possibilities.</span></h2><p>Explore college communities across two destinations, with clear guidance to help you take the next step.</p></div>
  <div className="home-discovery-grid">
   <Link to="/colleges/tamil-nadu-top-universities" className="home-discovery-card home-discovery-tamil" onPointerEnter={()=>preloadCollegePage(loadTamilNaduTopColleges)} onFocus={()=>preloadCollegePage(loadTamilNaduTopColleges)} onTouchStart={()=>preloadCollegePage(loadTamilNaduTopColleges)}>
    <img src="/assets/colleges/hindustan-group-of-institutions.jpg" alt="Hindustan Group of Institutions campus in Tamil Nadu" loading="lazy"/>
    <span className="home-discovery-shade"/>
    <span className="home-discovery-content"><span className="home-discovery-kicker"><MapPin size={15}/> TAMIL NADU</span><strong>Find your path<br/>closer to home.</strong><span className="home-discovery-summary">Explore featured universities and the colleges listed in our booklet.</span><span className="home-discovery-meta"><span><Building2 size={16}/> 71 colleges</span><span className="home-discovery-action">Explore Tamil Nadu <ArrowUpRight size={18}/></span></span></span>
   </Link>
   <Link to="/colleges/bangalore-top-universities" className="home-discovery-card home-discovery-bangalore" onPointerEnter={()=>preloadCollegePage(loadBangaloreTopColleges)} onFocus={()=>preloadCollegePage(loadBangaloreTopColleges)} onTouchStart={()=>preloadCollegePage(loadBangaloreTopColleges)}>
    <img src="/assets/bangalore-colleges/east-point-campus.webp" alt="Students at East Point Group of Institutions in Bengaluru" loading="lazy"/>
    <span className="home-discovery-shade"/>
    <span className="home-discovery-content"><span className="home-discovery-kicker"><MapPin size={15}/> BENGALURU</span><strong>Discover a city<br/>full of opportunity.</strong><span className="home-discovery-summary">Compare universities and colleges across Bangalore's campus communities.</span><span className="home-discovery-meta"><span><Building2 size={16}/> 8 institutions</span><span className="home-discovery-action">Explore Bangalore <ArrowUpRight size={18}/></span></span></span>
   </Link>
  </div>
  <div className="home-discovery-note"><BookOpen size={18}/><span>Not sure where to begin? Browse the directories or talk with a SUN STAR counsellor.</span><Link to="/enquiry">Get guidance <ArrowRight size={16}/></Link></div>
 </div></section>
 </>;
}
