import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight} from 'lucide-react';
import CollegeCard from '../components/CollegeCard.jsx';
import FeaturedCollegeCards from '../components/FeaturedCollegeCards.jsx';
import PageHeading from '../components/PageHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import colleges from '../data/colleges.json';
import {TAMIL_NADU_FEATURED_COLLEGES} from '../data/tamilFeaturedColleges.js';

const PAGE_SIZE=12;

export default function TamilNaduTopColleges(){
 const [page,setPage]=useState(1);
 const pageCount=Math.ceil(colleges.length/PAGE_SIZE);
 const firstIndex=(page-1)*PAGE_SIZE;
 const pageColleges=colleges.slice(firstIndex,firstIndex+PAGE_SIZE);
 return <>
  <PageHeading eyebrow="EXPLORE TAMIL NADU" title="Top Deemed Universities and Colleges in Tamil Nadu" crumb="Tamil Nadu Colleges" description="Explore featured institutions, courses and admission guidance from our Tamil Nadu college directory."/>
  <Reveal as="section" className="section sun-ref-featured"><div className="container">
   <div className="sun-ref-section-top"><div><span className="sun-ref-eyebrow"><i/> DISCOVER YOUR NEXT STEP</span><h2>Featured Tamil Nadu <span>institutions</span></h2><p>Browse our selected colleges and universities, then open a profile for more information.</p></div><Link className="sun-ref-textlink" to="/colleges">View full directory <ArrowUpRight size={17}/></Link></div>
   <FeaturedCollegeCards items={TAMIL_NADU_FEATURED_COLLEGES}/>
   <div className="sun-ref-section-top featured-region-heading"><div><span className="sun-ref-eyebrow"><i/> 2026 BOOKLET DIRECTORY</span><h2>All colleges in the <span>booklet</span></h2><p>Browse all {colleges.length} institutions listed in the SUN STAR booklet.</p></div><Link className="sun-ref-textlink" to="/colleges">Search and filter colleges <ArrowUpRight size={17}/></Link></div>
   <p className="showing-count" aria-live="polite">Showing {firstIndex+1}–{Math.min(firstIndex+PAGE_SIZE,colleges.length)} of {colleges.length} colleges</p>
   <div className="college-grid">{pageColleges.map((college,index)=><CollegeCard key={college.id} college={college} index={index}/>)}</div>
   {pageCount>1&&<nav className="pagination" aria-label="Booklet college pages"><button type="button" disabled={page===1} onClick={()=>setPage(current=>current-1)}>Previous</button><span>Page {page} of {pageCount}</span><button type="button" disabled={page===pageCount} onClick={()=>setPage(current=>current+1)}>Next</button></nav>}
  </div></Reveal>
 </>;
}
