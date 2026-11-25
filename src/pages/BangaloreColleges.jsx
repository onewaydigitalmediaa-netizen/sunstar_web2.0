import React,{useMemo} from 'react';
import {Link,useSearchParams} from 'react-router-dom';
import {motion,useReducedMotion} from 'framer-motion';
import {ArrowRight,ArrowUpRight,Briefcase,Building2,FilterX,MapPin,Search} from 'lucide-react';
import PageHeading from '../components/PageHeading.jsx';
import BrowseLocationSwitch from '../components/BrowseLocationSwitch.jsx';
import Reveal from '../components/Reveal.jsx';
import {BANGALORE_COLLEGES} from '../data/bangaloreColleges.js';
import {BANGALORE_COLLEGE_PROFILES} from '../data/bangaloreCollegeProfiles.js';

export default function BangaloreColleges(){
 const [params,setParams]=useSearchParams();
 const reduceMotion=useReducedMotion();
 const query=params.get('q')||'',type=params.get('type')||'',location=params.get('location')||'',sort=params.get('sort')||'name';
 const update=(key,value)=>{const next=new URLSearchParams(params);value?next.set(key,value):next.delete(key);setParams(next)};
 const locations=[...new Set(BANGALORE_COLLEGES.map(college=>college.location))].sort();
 const types=[...new Set(BANGALORE_COLLEGES.map(college=>college.institutionType))].sort();
 const filtered=useMemo(()=>{
  const term=query.trim().toLocaleLowerCase();
  const matches=BANGALORE_COLLEGES.filter(college=>{
   const profile=BANGALORE_COLLEGE_PROFILES[college.id];
   const searchable=[college.name,college.location,college.address,college.institutionType,profile?.cardSummary,...(profile?.highlights||[]),profile?.placementSummary].join(' ').toLocaleLowerCase();
   return (!term||searchable.includes(term))&&(!type||college.institutionType===type)&&(!location||college.location===location);
  });
  return matches.sort((a,b)=>sort==='location'?a.location.localeCompare(b.location)||a.name.localeCompare(b.name):a.name.localeCompare(b.name));
 },[query,type,location,sort]);
 return <>
  <PageHeading eyebrow="BENGALURU CAMPUS DIRECTORY" title="Top Universities & Colleges in Bangalore" crumb="Bangalore Colleges" description="Explore campus photos, distinctive college profiles and concise placement support information."/>
  <Reveal as="section" className="section bangalore-directory-section"><div className="container">
   <BrowseLocationSwitch/>
   <div className="directory-top"><div><h2>Bangalore Colleges <span className="result-pill">{filtered.length} found</span></h2><p>Search eight institutions by name, campus location, college profile or career support.</p></div></div>
   <div className="directory-filters bangalore-filters">
    <label className="filter-search"><Search size={19}/><input aria-label="Search Bangalore colleges" type="search" placeholder="Search college, campus or placement support..." value={query} onChange={e=>update('q',e.target.value)}/></label>
    <label><span>Institution type</span><select aria-label="Filter institution type" value={type} onChange={e=>update('type',e.target.value)}><option value="">All institution types</option>{types.map(value=><option key={value}>{value}</option>)}</select></label>
    <label><span>Location</span><select aria-label="Filter Bangalore location" value={location} onChange={e=>update('location',e.target.value)}><option value="">All locations</option>{locations.map(value=><option key={value}>{value}</option>)}</select></label>
    <label><span>Sort by</span><select aria-label="Sort Bangalore colleges" value={sort} onChange={e=>update('sort',e.target.value)}><option value="name">Name A to Z</option><option value="location">Location</option></select></label>
    <button className="clear-filters" onClick={()=>setParams({})} title="Clear filters" aria-label="Clear Bangalore college filters"><FilterX size={19}/></button>
   </div>
   <p className="showing-count">Showing {filtered.length} of {BANGALORE_COLLEGES.length} institutions</p>
   {filtered.length?<div className="college-grid bangalore-college-grid">{filtered.map((college,index)=>{
    const profile=BANGALORE_COLLEGE_PROFILES[college.id];
    return <motion.article className="college-card bangalore-college-card" key={college.id} initial={reduceMotion?false:{opacity:0,y:16}} whileInView={reduceMotion?undefined:{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:reduceMotion?0:.35,delay:reduceMotion?0:index*.035}} whileHover={reduceMotion?undefined:{y:-5}}>
     <div className="bangalore-campus-photo-frame"><img className="bangalore-campus-photo" src={college.campusImage} alt={college.campusImageAlt} loading="lazy" decoding="async" style={{objectPosition:college.imagePosition||'center'}} onError={e=>{e.currentTarget.style.display='none'}}/><span className="bangalore-campus-photo-shade"/><span className="college-art-label">SUN STAR BANGALORE DIRECTORY</span><span className="campus-photo-caption">Campus photo</span><span className="campus-placeholder-location"><MapPin size={13}/>{college.location}</span><span className="institution-logo-frame"><img src={college.logo} alt={college.logoAlt} decoding="async" onError={e=>{e.currentTarget.style.visibility='hidden'}}/></span></div>
     <div className="college-content"><div className="college-location"><MapPin size={14}/>{college.location}</div><h3><Link to={`/bangalore-colleges/${college.slug}`}>{college.name}</Link></h3><span className="bangalore-institution-type">{college.institutionType}</span><p className="bangalore-card-summary">{profile.cardSummary}</p><div className="bangalore-placement-summary"><Briefcase size={16}/><span><strong>Placement overview</strong><small>{profile.placementSummary}</small></span></div>
      <div className="college-card-actions bangalore-card-actions"><Link to={`/bangalore-colleges/${college.slug}`} className="btn btn-outline">View Details <ArrowRight size={16}/></Link><Link to={`/enquiry?college=${encodeURIComponent(college.name)}`} className="btn btn-primary">Enquire Now <ArrowUpRight size={16}/></Link></div>
     </div>
    </motion.article>
   })}</div>:<div className="empty-state"><Search size={40}/><h3>No Bangalore institutions match these filters</h3><p>Try a different search or clear the filters.</p><button className="btn btn-primary" onClick={()=>setParams({})}>Clear filters</button></div>}
   <aside className="bangalore-image-note"><Building2 size={20}/><p><strong>Campus and learning-space photos:</strong> Images are sourced from each institution’s published campus or student-life material. Placement activities vary by institution and are not a job guarantee.</p></aside>
  </div></Reveal>
 </>;
}
