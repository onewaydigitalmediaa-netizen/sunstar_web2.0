import React,{useEffect,useRef,useState} from 'react';
import {impactStats} from '../data/impactStats.js';
import '../styles/impact-stats.css';

function StatIcon({type}){
 const props={viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.8,strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':true,focusable:'false'};
 if(type==='graduates')return <svg {...props}><path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M6 11v4c3.5 2.5 8.5 2.5 12 0v-4M21 9v5"/></svg>;
 if(type==='institutes')return <svg {...props}><path d="M4 21V6l8-3 8 3v15M2 21h20"/><path d="M9 21v-4h6v4M8 9h.01M12 9h.01M16 9h.01M8 13h.01M12 13h.01M16 13h.01"/></svg>;
 if(type==='counselled')return <svg {...props}><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5c-1.2 0-2.4-.3-3.4-.8L4 20l1.8-4.3a7.5 7.5 0 1 1 14.2-4.2Z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/></svg>;
 return <svg {...props}><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/></svg>;
}

function AnimatedCount({value,active,reducedMotion,delay}){
 const [count,setCount]=useState(0);
 useEffect(()=>{
  if(reducedMotion){setCount(value);return undefined;}
  if(!active)return undefined;
  let frameId;
  const startsAt=performance.now()+delay;
  const step=now=>{
   const elapsed=now-startsAt;
   if(elapsed<0){frameId=requestAnimationFrame(step);return;}
   const progress=Math.min(elapsed/2500,1);
   const eased=1-Math.pow(1-progress,3);
   const next=progress===1?value:Math.floor(value*eased);
   setCount(current=>current===next?current:next);
   if(progress<1)frameId=requestAnimationFrame(step);
  };
  setCount(0);
  frameId=requestAnimationFrame(step);
  return()=>cancelAnimationFrame(frameId);
 },[active,delay,reducedMotion,value]);

 const formatted=count.toLocaleString('en-US');
 return <span className="impact-stat-value" data-target={value} aria-label={`${value.toLocaleString('en-US')} plus, demonstration value`}>{formatted}+</span>;
}

export default function ImpactStats(){
 const sectionRef=useRef(null);
 const [visible,setVisible]=useState(false);
 const [reducedMotion,setReducedMotion]=useState(false);

 useEffect(()=>{
  if(typeof window.matchMedia!=='function')return undefined;
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  const updatePreference=()=>setReducedMotion(media.matches);
  updatePreference();
  media.addEventListener?.('change',updatePreference);
  return()=>media.removeEventListener?.('change',updatePreference);
 },[]);

 useEffect(()=>{
  if(reducedMotion){setVisible(true);return undefined;}
  const section=sectionRef.current;
  if(!section||typeof IntersectionObserver==='undefined'){setVisible(true);return undefined;}
  const observer=new IntersectionObserver(entries=>{
   if(entries.some(entry=>entry.isIntersecting)){
    setVisible(true);
    observer.disconnect();
   }
  },{threshold:.2});
  observer.observe(section);
  return()=>observer.disconnect();
 },[reducedMotion]);

 return <section ref={sectionRef} className={`impact-stats${visible?' is-visible':''}`} aria-labelledby="impact-stats-title">
  <div className="container impact-stats-container">
   <div className="impact-stats-heading">
    <span className="eyebrow light">OUR IMPACT - DEMO PREVIEW</span>
    <h2 id="impact-stats-title">Guidance that moves <span>students forward.</span></h2>
    <p className="impact-demo-notice">DEMO DATA ONLY - These figures are for animation preview. Replace them with verified SUN STAR totals before publishing.</p>
   </div>
   <div className="impact-stats-grid">{impactStats.map((stat,index)=><article key={stat.id} className="impact-stat-card" style={{'--card-delay':`${index*150}ms`}} data-demo={stat.demo?'true':undefined}>
    <span className="impact-stat-icon"><StatIcon type={stat.id}/></span>
    <span className="impact-stat-accent" aria-hidden="true"/>
    <AnimatedCount value={stat.value} active={visible} reducedMotion={reducedMotion} delay={index*150}/>
    <h3>{stat.label}</h3>
    <small className="impact-stat-caption">Demo value - replace with verified total</small>
   </article>)}</div>
  </div>
 </section>;
}
