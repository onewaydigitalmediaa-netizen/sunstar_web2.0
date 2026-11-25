import React,{useEffect,useRef,useState} from 'react';
import {motion} from 'framer-motion';
import {NavLink,useLocation} from 'react-router-dom';
import {ChevronDown} from 'lucide-react';
import {loadBangaloreTopColleges,loadTamilNaduTopColleges,preloadCollegePage} from '../collegeRouteLoaders.js';

const collegeLinks=[
 ['/colleges/tamil-nadu-top-universities','Tamil Nadu Top Universities & Colleges',loadTamilNaduTopColleges],
 ['/colleges/bangalore-top-universities','Bangalore Top Universities & Colleges',loadBangaloreTopColleges]
];

export default function ExploreCollegesNav({mobile=false,onNavigate}){
 const [openedBy,setOpenedBy]=useState(null);
 const root=useRef(null),trigger=useRef(null);
 const location=useLocation();
 const expanded=openedBy!==null;
 const active=location.pathname==='/colleges'||location.pathname.startsWith('/colleges/')||location.pathname.startsWith('/bangalore-colleges');
 const menuId=mobile?'mobile-college-links':'desktop-college-links';
 useEffect(()=>{setOpenedBy(null)},[location.key]);
 useEffect(()=>{
  if(!expanded)return;
  const dismiss=e=>{if(!root.current?.contains(e.target))setOpenedBy(null)};
  const escape=e=>{if(e.key==='Escape')setOpenedBy(null)};
  document.addEventListener('pointerdown',dismiss);
  document.addEventListener('keydown',escape);
  return()=>{document.removeEventListener('pointerdown',dismiss);document.removeEventListener('keydown',escape)};
 },[expanded]);
 return <div ref={root} className={`college-nav${mobile?' college-nav-mobile':''}`}
  onPointerEnter={e=>{if(!mobile&&e.pointerType==='mouse')setOpenedBy(value=>value||'hover')}}
  onPointerLeave={()=>{if(!root.current?.contains(document.activeElement))setOpenedBy(value=>value==='hover'?null:value)}}
  onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOpenedBy(null)}}
  onKeyDown={e=>{if(e.key==='Escape'&&expanded){e.preventDefault();e.stopPropagation();setOpenedBy(null);trigger.current?.focus()}}}>
  <button ref={trigger} type="button" className={`college-nav-toggle${active?' nav-active':''}`} aria-expanded={expanded} aria-controls={menuId}
   onClick={()=>setOpenedBy(value=>value==='click'?null:'click')}>
   Explore Colleges <ChevronDown size={14} aria-hidden="true"/>
   {!mobile&&active&&<motion.span className="nav-indicator" layoutId="nav-indicator" transition={{type:'spring',stiffness:480,damping:34}}/>}
  </button>
  <div id={menuId} className="college-nav-links" hidden={!expanded}>
   {collegeLinks.map(([href,label,loader])=><NavLink key={href} to={href} end className={({isActive})=>isActive?'nav-active':''} onPointerEnter={()=>preloadCollegePage(loader)} onFocus={()=>preloadCollegePage(loader)} onTouchStart={()=>preloadCollegePage(loader)} onClick={()=>{setOpenedBy(null);onNavigate?.()}}>{label}</NavLink>)}
  </div>
 </div>
}
