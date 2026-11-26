import React, {useState,useEffect,useRef} from 'react';
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';
import {NavLink,Link,useLocation,useNavigate} from 'react-router-dom';
import {Phone,Search,Menu,X,ArrowUpRight,ArrowRight} from 'lucide-react';
import {SITE,phoneUrl} from '../data/site.js';
import ExploreCollegesNav from './ExploreCollegesNav.jsx';
const links=[['/','Home'],['/colleges','Explore Colleges'],['/courses','Courses'],['/services#mbbs-abroad','Study Abroad'],['/career','Career'],['/services','Our Services'],['/about','About Us']];
function navIsActive(href,routeActive,pathname,hash){
 if(href==='/services#mbbs-abroad')return pathname==='/services'&&hash==='#mbbs-abroad';
 if(href==='/services')return pathname==='/services'&&hash!=='#mbbs-abroad';
 return routeActive;
}
export default function Header(){
 const [open,setOpen]=useState(false);
 const [searchOpen,setSearchOpen]=useState(false);
 const [query,setQuery]=useState('');
 const searchRoot=useRef(null),searchButton=useRef(null),searchInput=useRef(null),menuButton=useRef(null);
 const navigate=useNavigate();
 const loc=useLocation();
 const reduceMotion=useReducedMotion();
 const tickerSequence=(duplicate=false)=><div className="top-ticker-sequence" aria-hidden={duplicate||undefined}><span className="top-ticker-copy">For Admission Enquiry from Tamil Nadu and Bangalore, Call</span><a className="top-ticker-phone" href={phoneUrl} aria-label="Call +91 9944204010" tabIndex={duplicate?-1:undefined}><Phone size={13} aria-hidden="true"/>+91 {SITE.phone}</a><a className="top-ticker-phone" href={`tel:+91${SITE.whatsapp}`} aria-label="Call +91 9042964616" tabIndex={duplicate?-1:undefined}><Phone size={13} aria-hidden="true"/>+91 {SITE.whatsapp}</a></div>;
 useEffect(()=>{setOpen(false);setSearchOpen(false)},[loc.key]);
 useEffect(()=>{
  if(!searchOpen)return;
  searchInput.current?.focus();
  const dismiss=e=>{if(!searchRoot.current?.contains(e.target))setSearchOpen(false)};
  const escape=e=>{if(e.key==='Escape'){setSearchOpen(false);searchButton.current?.focus()}};
  document.addEventListener('pointerdown',dismiss);
  document.addEventListener('keydown',escape);
  return()=>{document.removeEventListener('pointerdown',dismiss);document.removeEventListener('keydown',escape)};
 },[searchOpen]);
 useEffect(()=>{if(!open)return;const onKey=e=>{if(e.key==='Escape'){setOpen(false);menuButton.current?.focus()}};document.addEventListener('keydown',onKey);const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.removeEventListener('keydown',onKey);document.body.style.overflow=previous}},[open]);
 return <>
  <div className="top-strip"><div className="container top-inner top-inner-announcement"><div className={`top-ticker${reduceMotion?' is-static':''}`} role="region" aria-label="Admissions phone numbers"><div className="top-ticker-track">{tickerSequence()}</div></div></div></div>
  <header className={`site-header reference-navbar${loc.pathname==='/'?' home-navbar':''}`}><div className="container nav-inner">
   <Link to="/" className="brand" aria-label="Sun Star Educational Trust homepage"><img src="/assets/sunstar-logo.png" alt="SUN STAR Educational Trust"/><span className="brand-caption">EDUCATIONAL TRUST</span></Link>
   <nav className="desktop-nav" aria-label="Main navigation">{links.map(([href,label])=>href==='/colleges'?<ExploreCollegesNav key={href}/>:<NavLink key={href} end={href==='/'||href==='/services'} to={href} className={({isActive})=>navIsActive(href,isActive,loc.pathname,loc.hash)?'nav-active':''}>{({isActive})=>{const active=navIsActive(href,isActive,loc.pathname,loc.hash);return <>{label}{active&&<motion.span className="nav-indicator" layoutId="nav-indicator" transition={{type:'spring',stiffness:480,damping:34}}/>}</>}}</NavLink>)}</nav>
   <div className="nav-actions">
    <div className="nav-search" ref={searchRoot} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setSearchOpen(false)}}>
     <button ref={searchButton} type="button" className="nav-search-toggle" aria-label="Search colleges and courses" aria-expanded={searchOpen} aria-controls="navbar-search" onClick={()=>setSearchOpen(v=>!v)}>{searchOpen?<X size={20}/>:<Search size={21}/>}</button>
     {searchOpen&&<form id="navbar-search" className="nav-search-panel" role="search" onSubmit={e=>{e.preventDefault();navigate(`/colleges${query.trim()?`?q=${encodeURIComponent(query.trim())}`:''}`);setSearchOpen(false)}}>
      <label htmlFor="navbar-search-input">Find a college or course</label>
      <div className="nav-search-field"><input ref={searchInput} id="navbar-search-input" type="search" placeholder="College, city or course…" value={query} onChange={e=>setQuery(e.target.value)}/><button type="submit" aria-label="Search directory"><ArrowRight size={20}/></button></div>
     </form>}
    </div>
    <Link to="/enquiry" className="btn btn-primary nav-enquire">Enquire Now <ArrowRight size={17}/></Link><button type="button" ref={menuButton} className="mobile-toggle" onClick={()=>{setSearchOpen(false);setOpen(v=>!v)}} aria-expanded={open} aria-label={open?'Close navigation':'Open navigation'}>{open?<X/>:<Menu/>}</button>
   </div>
  </div></header>
  <AnimatePresence>{open&&<motion.div className="mobile-backdrop" onClick={()=>setOpen(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduceMotion?0:.18}}><motion.nav className="mobile-menu" onClick={e=>e.stopPropagation()} aria-label="Mobile navigation" initial={reduceMotion?false:{x:36,opacity:.7}} animate={{x:0,opacity:1}} exit={reduceMotion?undefined:{x:36,opacity:.7}} transition={{duration:reduceMotion?0:.22,ease:'easeOut'}}><div className="mobile-menu-title">Navigate <button onClick={()=>setOpen(false)} aria-label="Close"><X size={20}/></button></div>{links.map(([href,label])=>href==='/colleges'?<ExploreCollegesNav key={href} mobile onNavigate={()=>setOpen(false)}/>:<NavLink to={href} key={href} end={href==='/'||href==='/services'} onClick={()=>setOpen(false)} className={({isActive})=>navIsActive(href,isActive,loc.pathname,loc.hash)?'nav-active':''}>{label}<ArrowUpRight size={16}/></NavLink>)}<Link className="btn btn-yellow" to="/enquiry" onClick={()=>setOpen(false)}>Get Admission Guidance</Link></motion.nav></motion.div>}</AnimatePresence>
 </>
}
