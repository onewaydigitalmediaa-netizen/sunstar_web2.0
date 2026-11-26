import React,{useEffect,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import {useLocation} from 'react-router-dom';
import {X} from 'lucide-react';
import EnquiryForm from './EnquiryForm.jsx';
import './enquiry-popup.css';

const SESSION_KEY='sunstar-enquiry-popup-shown';
const readShown=()=>{try{return sessionStorage.getItem(SESSION_KEY)==='1'}catch{return false}};
const markShown=()=>{try{sessionStorage.setItem(SESSION_KEY,'1')}catch{/* Storage can be unavailable. */}};
const isEditing=()=>Boolean(document.activeElement?.closest?.('input, textarea, select, [contenteditable="true"]'));
const focusables='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function EnquiryPopup(){
 const location=useLocation();
 const locationRef=useRef(location);
 const shownOrSkipped=useRef(readShown());
 const [open,setOpen]=useState(false);
 const dialogRef=useRef(null),previousFocusRef=useRef(null);
 locationRef.current=location;

 useEffect(()=>{
  if(location.pathname==='/enquiry'||location.hash==='#enquiry'){
   shownOrSkipped.current=true;
   markShown();
  }
 },[location.pathname,location.hash]);

 useEffect(()=>{
  if(shownOrSkipped.current)return;

  let delayElapsed=false;
  let retryId;
  function showWhenAvailable(){
   if(!delayElapsed||shownOrSkipped.current||readShown()||document.hidden||isEditing())return;
   const current=locationRef.current;
   if(current.pathname==='/enquiry'||current.hash==='#enquiry')return;
   shownOrSkipped.current=true;
   markShown();
   previousFocusRef.current=document.activeElement;
   setOpen(true);
  }

  const timerId=window.setTimeout(()=>{
   delayElapsed=true;
   showWhenAvailable();
  },10000);

  function afterEditing(){
   if(!delayElapsed||shownOrSkipped.current)return;
   window.clearTimeout(retryId);
   retryId=window.setTimeout(showWhenAvailable,0);
  }

  document.addEventListener('focusout',afterEditing);
  document.addEventListener('visibilitychange',showWhenAvailable);
  return()=>{
   window.clearTimeout(timerId);
   window.clearTimeout(retryId);
   document.removeEventListener('focusout',afterEditing);
   document.removeEventListener('visibilitychange',showWhenAvailable);
  };
 },[]);
 useEffect(()=>{if(!open)return;const root=document.getElementById('root'),oldOverflow=document.body.style.overflow,oldInert=root?.inert;document.body.style.overflow='hidden';if(root)root.inert=true;dialogRef.current?.querySelector(focusables)?.focus();const onKeyDown=event=>{if(event.key==='Escape'){event.preventDefault();setOpen(false);return}if(event.key!=='Tab'||!dialogRef.current)return;const items=[...dialogRef.current.querySelectorAll(focusables)];if(!items.length)return;const first=items[0],last=items[items.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}};document.addEventListener('keydown',onKeyDown);return()=>{document.removeEventListener('keydown',onKeyDown);document.body.style.overflow=oldOverflow;if(root)root.inert=oldInert;previousFocusRef.current?.focus?.()}},[open]);
 if(!open)return null;
 return createPortal(<div className="enquiry-popup-overlay" onMouseDown={event=>{if(event.target===event.currentTarget)setOpen(false)}}><section ref={dialogRef} className="enquiry-popup" role="dialog" aria-modal="true" aria-labelledby="enquiry-popup-title" aria-describedby="enquiry-popup-description"><div className="enquiry-popup-header"><div><span className="enquiry-popup-eyebrow">SUN STAR EDUCATIONAL TRUST</span><h2 id="enquiry-popup-title">Let's Find Your Right College</h2><p id="enquiry-popup-description">Tell us what you're looking for. Our admission team will help you explore your options.</p></div><button className="enquiry-popup-close" type="button" aria-label="Close enquiry form" onClick={()=>setOpen(false)}><X size={22}/></button></div><div className="enquiry-popup-body"><EnquiryForm compact/></div></section></div>,document.body);
}
