import React from 'react';
import {motion,useReducedMotion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {ArrowUpRight,MapPin} from 'lucide-react';
import {COLLEGE_PHOTOS} from '../data/collegePhotos.js';
const tones=['blue','orange','violet','mint','navy'];
export default function CollegeCard({college,index=0}){
 const reduceMotion=useReducedMotion();
 const tone=tones[(college.id-1)%tones.length];
 const photo=college.photo||college.photoUrl||college.image||COLLEGE_PHOTOS[college.slug];
 return <motion.article className="college-card" initial={reduceMotion?false:{opacity:0,y:18}} whileInView={reduceMotion?undefined:{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:reduceMotion?0:.46,delay:reduceMotion?0:(index%6)*.055,ease:[.22,1,.36,1]}} whileHover={reduceMotion?undefined:{y:-5}} whileTap={reduceMotion?undefined:{scale:.99}}>
   <div className={`college-art college-art-${tone}${photo?' has-photo':''}`}>{photo&&<img className="college-art-photo" src={photo} alt={`${college.name} campus`} loading="lazy" decoding="async" onError={e=>{e.currentTarget.style.display='none'}}/>}<span className="college-art-label">SUN STAR COLLEGE DIRECTORY</span><div className="college-monogram">{college.name.split(/\s+/).filter(x=>x.length>2).slice(0,2).map(x=>x[0]).join('')}</div><span className="art-orbit art-orbit-one"/><span className="art-orbit art-orbit-two"/><span className="college-art-category">{college.type}</span>{photo&&<span className="college-art-glass"><MapPin size={13}/>{college.city==='Tamil Nadu'?'Tamil Nadu':college.city}</span>}</div>
   <div className="college-content"><div className="college-location"><MapPin size={14}/>{college.city==='Tamil Nadu'?'Tamil Nadu':`${college.city}, Tamil Nadu`}</div><h3><Link to={`/colleges/${college.slug}`}>{college.name}</Link></h3><div className="college-tags">{college.streams.slice(0,3).map(x=><span key={x}>{x}</span>)}{college.streams.length>3&&<span>+{college.streams.length-3}</span>}</div>
   <div className="college-bottom"><div className="college-fee"><span>College profile</span><strong>View courses and details</strong></div><Link to={`/colleges/${college.slug}`} className="card-arrow" aria-label={`View details for ${college.name}`}><span>Details</span><ArrowUpRight size={19}/></Link></div>
   <div className="college-card-actions"><Link to={`/enquiry?college=${encodeURIComponent(college.name)}`} className="college-enquire-link">Enquire now <ArrowUpRight size={15}/></Link></div>
   </div>
 </motion.article>
}
