import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight} from 'lucide-react';
import FeaturedCollegeCards from '../components/FeaturedCollegeCards.jsx';
import PageHeading from '../components/PageHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import {BANGALORE_COLLEGES} from '../data/bangaloreColleges.js';

export default function BangaloreTopColleges(){
 return <>
  <PageHeading eyebrow="EXPLORE BANGALORE" title="Top Deemed Universities and Colleges in Bangalore" crumb="Bangalore Top Colleges" description="Explore featured universities and colleges, their courses and admission guidance in our Bangalore directory."/>
  <Reveal as="section" className="section sun-ref-featured"><div className="container">
   <div className="sun-ref-section-top"><div><span className="sun-ref-eyebrow"><i/> EXPLORE BANGALORE</span><h2>Featured Bangalore <span>institutions</span></h2><p>Browse universities and colleges, then open a profile for more information.</p></div><Link className="sun-ref-textlink" to="/bangalore-colleges">View full directory <ArrowUpRight size={17}/></Link></div>
   <FeaturedCollegeCards items={BANGALORE_COLLEGES} bangalore/>
  </div></Reveal>
 </>;
}
