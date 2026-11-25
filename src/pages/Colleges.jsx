import React,{useEffect,useMemo,useState} from 'react';
import {Link,useSearchParams} from 'react-router-dom';
import {Search,FilterX,SlidersHorizontal,BookOpen,ArrowUpRight} from 'lucide-react';
import PageHeading from '../components/PageHeading.jsx';
import CollegeCard from '../components/CollegeCard.jsx';
import colleges from '../data/colleges.json';
import {streamOptions} from '../data/site.js';
import Reveal from '../components/Reveal.jsx';
import BrowseLocationSwitch from '../components/BrowseLocationSwitch.jsx';
const PAGE_SIZE=12;
export default function Colleges(){
 const [params,setParams]=useSearchParams();
 const [page,setPage]=useState(1);
 const q=params.get('q')||'',stream=params.get('stream')||'',city=params.get('city')||'',sort=params.get('sort')||'booklet';
 const put=(k,v)=>{const next=new URLSearchParams(params);v?next.set(k,v):next.delete(k);setParams(next)};
 useEffect(()=>{setPage(1)},[q,stream,city,sort]);
 const cities=[...new Set(colleges.map(c=>c.city).filter(c=>c!=='Tamil Nadu'))].sort();
 const filtered=useMemo(()=>{const term=q.toLowerCase().trim();let a=colleges.filter(c=>(!term||[c.name,c.city,...c.streams,...c.courses].some(x=>x.toLowerCase().includes(term)))&&(!stream||c.streams.includes(stream))&&(!city||c.city===city));if(sort==='name')a.sort((a,b)=>a.name.localeCompare(b.name));if(sort==='city')a.sort((a,b)=>a.city.localeCompare(b.city)||a.name.localeCompare(b.name));return a},[q,stream,city,sort]);
 const maxPage=Math.ceil(filtered.length/PAGE_SIZE);const current=Math.max(1,Math.min(page,maxPage||1));
 return <><PageHeading eyebrow="THE COLLEGE DIRECTORY" title="Find your future campus." crumb="Colleges" description="Explore 71 institutions in the SUN STAR college directory. Filter by location and stream, then view courses and admission guidance."/>
 <Reveal as="section" className="section directory-section"><div className="container"><BrowseLocationSwitch/><div className="directory-top"><div><h2>Explore Colleges <span className="result-pill">{filtered.length} found</span></h2><p>Browse colleges, study streams and available course information.</p></div><Link to="/enquiry" className="btn btn-outline">Get Admission Guidance <ArrowUpRight size={17}/></Link></div>
 <div className="directory-filters"><label className="filter-search"><Search size={19}/><input aria-label="Search colleges" type="search" placeholder="Search colleges, cities, courses..." value={q} onChange={e=>put('q',e.target.value)}/></label><label><span>Stream</span><select aria-label="Filter stream" value={stream} onChange={e=>put('stream',e.target.value)}><option value="">All Streams</option>{streamOptions.map(x=><option key={x}>{x}</option>)}</select></label><label><span>Location</span><select aria-label="Filter location" value={city} onChange={e=>put('city',e.target.value)}><option value="">All Locations</option>{cities.map(x=><option key={x}>{x}</option>)}</select></label><label><span>Sort by</span><select aria-label="Sort colleges" value={sort} onChange={e=>put('sort',e.target.value)}><option value="booklet">Booklet order</option><option value="name">Name A to Z</option><option value="city">City A to Z</option></select></label><button className="clear-filters" onClick={()=>{setParams({});setPage(1)}} title="Clear filters" aria-label="Clear filters"><FilterX size={19}/></button></div>
 {filtered.length>0?<><p className="showing-count">Showing {(current-1)*PAGE_SIZE+1}–{Math.min(current*PAGE_SIZE,filtered.length)} of {filtered.length} institutions</p><div className="college-grid">{filtered.slice((current-1)*PAGE_SIZE,current*PAGE_SIZE).map((c,i)=><CollegeCard key={c.id} college={c} index={i}/>)}</div>{maxPage>1&&<nav className="pagination" aria-label="College result pages"><button disabled={current===1} onClick={()=>{setPage(current-1);document.querySelector('.directory-top')?.scrollIntoView({behavior:'smooth'})}}>Previous</button><span>Page {current} of {maxPage}</span><button disabled={current===maxPage} onClick={()=>{setPage(current+1);document.querySelector('.directory-top')?.scrollIntoView({behavior:'smooth'})}}>Next</button></nav>}</>:<div className="empty-state"><SlidersHorizontal size={40}/><h3>No colleges match these filters</h3><p>Try another college name, district or stream.</p><button className="btn btn-primary" onClick={()=>setParams({})}>Clear all filters</button></div>}
 <div className="directory-disclaimer"><BookOpen size={21}/><p><strong>A note on accuracy:</strong> Course availability, eligibility and admission requirements can change. Confirm current information with the institution and SUN STAR team before making a decision.</p></div></div></Reveal></>
}
