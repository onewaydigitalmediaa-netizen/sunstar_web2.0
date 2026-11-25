import React,{useCallback,useEffect,useRef,useState} from 'react';
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
 const initialPath=useRef(location.pathname);
 const locationRef=useRef(location);
 const timerRef=useRef(null),retryRef=useRef(null),waitingRef=useRef(false);
 const cancelledRef=useRef(readShown());
 const [open,setOpen]=useState(false);
 const dialogRef=useRef(null),previousFocusRef=useRef(null);
 locationRef.current=location;
 const cancelAutomatic=useCallback(()=>{cancelledRef.current=true;waitingRef.current=false;window.clearTimeout(timerRef.current);window.clearTimeout(retryRef.current);markShown()},[]);
 const showAutomatic=useCallback(()=>{if(cancelledRef.current||readShown())return;const current=locationRef.current;if(current.pathname==='/enquiry'||current.hash==='#enquiry'){cancelAutomatic();return}if(isEditing()){waitingRef.current=true;return}waitingRef.current=false;cancelledRef.current=true;markShown();previousFocusRef.current=document.activeElement;setOpen(true)},[cancelAutomatic]);
 useEffect(()=>{if(initialPath.current!=='/'||cancelledRef.current||readShown())return;timerRef.current=window.setTimeout(showAutomatic,10000);return()=>window.clearTimeout(timerRef.current)},[showAutomatic]);
 useEffect(()=>{
  const stopAutomatic=()=>cancelAutomatic();
  document.addEventListener('pointerdown',stopAutomatic,{once:true});
  document.addEventListener('pointermove',stopAutomatic,{once:true,passive:true});
  document.addEventListener('keydown',stopAutomatic,{once:true});
  document.addEventListener('wheel',stopAutomatic,{once:true,passive:true});
  document.addEventListener('touchstart',stopAutomatic,{once:true,passive:true});
  return()=>{
   document.removeEventListener('pointerdown',stopAutomatic);
   document.removeEventListener('pointermove',stopAutomatic);
   document.removeEventListener('keydown',stopAutomatic);
   document.removeEventListener('wheel',stopAutomatic);
   document.removeEventListener('touchstart',stopAutomatic);
  };
 },[cancelAutomatic]);
 useEffect(()=>{if(location.pathname==='/enquiry'||location.hash==='#enquiry')cancelAutomatic()},[location.pathname,location.hash,cancelAutomatic]);
 useEffect(()=>{const onFocusIn=event=>{if(event.target.closest?.('.enquiry-form'))cancelAutomatic()};const onFocusOut=()=>{if(!waitingRef.current)return;window.clearTimeout(retryRef.current);retryRef.current=window.setTimeout(showAutomatic,0)};document.addEventListener('focusin',onFocusIn);document.addEventListener('focusout',onFocusOut);return()=>{document.removeEventListener('focusin',onFocusIn);document.removeEventListener('focusout',onFocusOut);window.clearTimeout(retryRef.current)}},[cancelAutomatic,showAutomatic]);
 useEffect(()=>{if(!open)return;const root=document.getElementById('root'),oldOverflow=document.body.style.overflow,oldInert=root?.inert;document.body.style.overflow='hidden';if(root)root.inert=true;dialogRef.current?.querySelector(focusables)?.focus();const onKeyDown=event=>{if(event.key==='Escape'){event.preventDefault();setOpen(false);return}if(event.key!=='Tab'||!dialogRef.current)return;const items=[...dialogRef.current.querySelectorAll(focusables)];if(!items.length)return;const first=items[0],last=items[items.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}};document.addEventListener('keydown',onKeyDown);return()=>{document.removeEventListener('keydown',onKeyDown);document.body.style.overflow=oldOverflow;if(root)root.inert=oldInert;previousFocusRef.current?.focus?.()}},[open]);
 if(!open)return null;
 return createPortal(<div className="enquiry-popup-overlay" onMouseDown={event=>{if(event.target===event.currentTarget)setOpen(false)}}><section ref={dialogRef} className="enquiry-popup" role="dialog" aria-modal="true" aria-labelledby="enquiry-popup-title" aria-describedby="enquiry-popup-description"><div className="enquiry-popup-header"><div><span className="enquiry-popup-eyebrow">SUN STAR EDUCATIONAL TRUST</span><h2 id="enquiry-popup-title">Let's Find Your Right College</h2><p id="enquiry-popup-description">Tell us what you're looking for. Our admission team will help you explore your options.</p></div><button className="enquiry-popup-close" type="button" aria-label="Close enquiry form" onClick={()=>setOpen(false)}><X size={22}/></button></div><div className="enquiry-popup-body"><EnquiryForm compact/></div></section></div>,document.body);
}
