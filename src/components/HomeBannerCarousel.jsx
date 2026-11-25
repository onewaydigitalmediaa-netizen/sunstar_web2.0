import React,{useCallback,useEffect,useRef,useState} from 'react';
import {useReducedMotion} from 'framer-motion';
import {ChevronLeft,ChevronRight} from 'lucide-react';

const slides=[
 {src:'/assets/home-banners/study-in-bangalore.webp',alt:'Study in Bangalore’s top universities banner'},
 {src:'/assets/home-banners/engineering-medical-entrance.webp',alt:'Engineering and medical entrance exam guidance banner'},
 {src:'/assets/home-banners/counselling-placement.webp',alt:'Student counselling and placement guidance banner'},
 {src:'/assets/home-banners/mbbs-abroad.webp',alt:'Study MBBS abroad opportunities banner'},
 {src:'/assets/home-banners/tamil-nadu-universities.webp',alt:'Top deemed universities and colleges in Tamil Nadu banner'},
 {src:'/assets/home-banners/veterinary-science.webp',alt:'Veterinary science colleges and animal care studies banner'}
];
const trackSlides=[{...slides[slides.length-1],clone:true},...slides.map(slide=>({...slide,clone:false})),{...slides[0],clone:true}];
const STEP_PERCENT=100/trackSlides.length;

export default function HomeBannerCarousel(){
 const [trackIndex,setTrackIndex]=useState(1);
 const [direction,setDirection]=useState(1);
 const [paused,setPaused]=useState(false);
 const [ready,setReady]=useState(false);
 const touchStart=useRef(null);
 const reduceMotion=useReducedMotion();
 const activeIndex=(trackIndex-1+slides.length)%slides.length;

 useEffect(()=>{setReady(true)},[]);
 const moveTo=useCallback((index,nextDirection)=>{
  setDirection(nextDirection);
  setTrackIndex(index+1);
 },[]);
 const showNext=useCallback(()=>{
  setDirection(1);
  setTrackIndex(index=>reduceMotion?(index>=slides.length?1:index+1):Math.min(index+1,slides.length+1));
 },[reduceMotion]);
 const showPrevious=useCallback(()=>{
  setDirection(-1);
  setTrackIndex(index=>reduceMotion?(index<=1?slides.length:index-1):Math.max(index-1,0));
 },[reduceMotion]);

 useEffect(()=>{
  if(paused||reduceMotion)return undefined;
  const timer=window.setInterval(showNext,3000);
  return ()=>window.clearInterval(timer);
 },[paused,reduceMotion,showNext]);

 useEffect(()=>{
  const upcomingIndex=(activeIndex+(direction>0?1:slides.length-1))%slides.length;
  const nextImage=new Image();
  nextImage.decoding='async';
  nextImage.src=slides[upcomingIndex].src;
 },[activeIndex,direction]);

 const handleTransitionEnd=event=>{
  if(event.target!==event.currentTarget||event.propertyName!=='transform')return;
  if(trackIndex===0||trackIndex===slides.length+1){
   const wrappedIndex=trackIndex===0?slides.length:1;
   setTrackIndex(wrappedIndex);
   setReady(false);
   window.requestAnimationFrame(()=>window.requestAnimationFrame(()=>setReady(true)));
  }
 };
 const handleTouchStart=event=>{touchStart.current=event.touches[0]?.clientX??null};
 const handleTouchEnd=event=>{
  if(touchStart.current===null)return;
  const distance=event.changedTouches[0].clientX-touchStart.current;
  if(Math.abs(distance)>48)distance<0?showNext():showPrevious();
  touchStart.current=null;
 };
 const handleDotClick=index=>{
  const forward=(index-activeIndex+slides.length)%slides.length;
  const backward=(activeIndex-index+slides.length)%slides.length;
  moveTo(index,forward<=backward?1:-1);
 };

 return <section className="home-banner-carousel" role="region" aria-roledescription="carousel" aria-label="SUN STAR education banners" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchCancel={()=>{touchStart.current=null}}>
  <div className="home-banner-viewport">
   <div className="home-banner-track" onTransitionEnd={handleTransitionEnd} style={{transform:`translate3d(-${trackIndex*STEP_PERCENT}%,0,0)`,transition:ready&&!reduceMotion?'transform 700ms cubic-bezier(.22,1,.36,1)':'none'}}>
    {trackSlides.map((slide,index)=>{const slideIndex=(index-1+slides.length)%slides.length;const hidden=slide.clone||slideIndex!==activeIndex;return <figure key={`${slide.src}-${index}`} className="home-banner-slide" style={{flexBasis:`${STEP_PERCENT}%`}} aria-hidden={hidden||undefined} aria-roledescription={slide.clone?undefined:'slide'} aria-label={slide.clone?undefined:`Slide ${slideIndex+1} of ${slides.length}`}>
     <img src={slide.src} alt={slide.clone?'':slide.alt} loading={index===1?'eager':'lazy'} decoding="async" draggable="false"/>
    </figure>})}
   </div>
  </div>
  <button type="button" className="home-banner-arrow home-banner-previous" onClick={showPrevious} aria-label="Show previous banner"><ChevronLeft size={25}/></button>
  <button type="button" className="home-banner-arrow home-banner-next" onClick={showNext} aria-label="Show next banner"><ChevronRight size={25}/></button>
  <div className="home-banner-pagination" role="group" aria-label="Choose a banner slide">
   {slides.map((slide,index)=><button key={slide.src} type="button" className={`home-banner-dot${index===activeIndex?' is-active':''}`} onClick={()=>handleDotClick(index)} aria-label={`Show slide ${index+1}`} aria-current={index===activeIndex?'true':undefined}/>) }
  </div>
 </section>;
}
