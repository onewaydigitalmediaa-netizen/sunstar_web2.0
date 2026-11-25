import React,{useEffect,useMemo,useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {ArrowUpRight,ShieldCheck,PhoneCall,Mail,MessageCircle,CheckCircle2} from 'lucide-react';
import {whatsappUrl,phoneUrl,emailUrl,streamOptions} from '../data/site.js';
import colleges from '../data/colleges.json';
import {COURSE_DIRECTORY} from '../data/courseDirectory.js';
const initial={name:'',phone:'',email:'',city:'',course:'',college:'',message:'',consent:false};
export default function EnquiryForm({compact=false,selectedCollege=''}){
 const [params]=useSearchParams();
 const [bangaloreColleges,setBangaloreColleges]=useState([]);
 useEffect(()=>{let current=true;import('../data/bangaloreColleges.js').then(({BANGALORE_COLLEGES})=>{if(current)setBangaloreColleges(BANGALORE_COLLEGES)});return()=>{current=false}},[]);
 const [form,setForm]=useState({...initial,college:selectedCollege||params.get('college')||'',course:params.get('course')||''});
 const [touched,setTouched]=useState({});const [errors,setErrors]=useState({});const [whatsappHref,setWhatsappHref]=useState('');
 const collegeOptions=useMemo(()=>[...colleges.map(college=>({name:college.name,city:college.city})),...bangaloreColleges.map(college=>({name:college.name,city:college.location}))].sort((a,b)=>a.name.localeCompare(b.name)),[bangaloreColleges]);
 const courseOptions=useMemo(()=>[...new Set([...streamOptions,...colleges.flatMap(college=>college.courses),...COURSE_DIRECTORY.map(course=>course.name),'MBBS Abroad','Other'])].sort((a,b)=>a.localeCompare(b)),[]);
 const validate=values=>{const next={};if(!values.name.trim())next.name='Please enter your name.';else if(values.name.trim().length<2)next.name='Please enter at least 2 characters.';const digits=values.phone.replace(/\D/g,'');if(!digits)next.phone='Please enter a phone number.';else if(digits.length<10||digits.length>13)next.phone='Enter a valid number with 10 to 13 digits.';if(values.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))next.email='Enter a valid email address.';if(!values.consent)next.consent='Please agree before opening WhatsApp.';return next;};
 const change=(key,value)=>{const nextValues={...form,[key]:value};setForm(nextValues);if(touched[key]){const nextErrors=validate(nextValues);setErrors(current=>({...current,[key]:nextErrors[key]||''}));}};
 const blur=key=>{setTouched(x=>({...x,[key]:true}));const next=validate(form);setErrors(x=>({...x,[key]:next[key]||''}));};
 const submit=e=>{e.preventDefault();const next=validate(form);setErrors(next);setTouched({name:true,phone:true,email:true,consent:true});if(Object.keys(next).length){const first=Object.keys(next)[0];document.querySelector(`[name="${first}"]`)?.focus();return;}const message=[`Hello SUN STAR Educational Trust, I would like admission guidance.`,`Name: ${form.name.trim()}`,`Phone: ${form.phone.trim()}`,form.email&&`Email: ${form.email}`,form.city&&`City: ${form.city}`,form.course&&`Interested course or stream: ${form.course}`,form.college&&`Preferred college: ${form.college}`,form.message&&`Message: ${form.message}`].filter(Boolean).join('\n');const href=whatsappUrl(message);setWhatsappHref(href);window.open(href,'_blank','noopener,noreferrer');};
 const fieldError=key=>(touched[key]||errors[key])&&errors[key]?<span className="field-error" id={`${key}-error`} role="alert">{errors[key]}</span>:null;
 return <form className={`enquiry-form ${compact?'enquiry-form-compact':''}`} onSubmit={submit} noValidate>
  <div className="form-grid">
   <label htmlFor="student-name">Full Name <span>*</span><input id="student-name" name="name" required autoComplete="name" value={form.name} onChange={e=>change('name',e.target.value)} onBlur={()=>blur('name')} placeholder="Your full name" maxLength={100} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name?'name-error':undefined}/>{fieldError('name')}</label>
   <label htmlFor="student-phone">Phone Number <span>*</span><input id="student-phone" name="phone" required autoComplete="tel" inputMode="tel" type="tel" value={form.phone} onChange={e=>change('phone',e.target.value)} onBlur={()=>blur('phone')} placeholder="98765 43210" maxLength={20} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone?'phone-error':undefined}/>{fieldError('phone')}</label>
   <label htmlFor="student-email">Email Address <small>(optional)</small><input id="student-email" name="email" autoComplete="email" type="email" value={form.email} onChange={e=>change('email',e.target.value)} onBlur={()=>blur('email')} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email?'email-error':undefined}/>{fieldError('email')}</label>
   <label htmlFor="student-city">Your City <small>(optional)</small><input id="student-city" name="city" autoComplete="address-level2" value={form.city} onChange={e=>change('city',e.target.value)} placeholder="City or district"/></label>
   <label htmlFor="student-course">Course or Stream <small>(optional)</small><select id="student-course" name="course" value={form.course} onChange={e=>change('course',e.target.value)}><option value="">Choose a course or stream</option>{courseOptions.map(course=><option key={course}>{course}</option>)}</select></label>
   <label htmlFor="student-college">Preferred College <small>(optional)</small><input id="student-college" name="college" list="sunstar-colleges" value={form.college} onChange={e=>change('college',e.target.value)} placeholder="Search or type a college name" autoComplete="off"/><datalist id="sunstar-colleges">{collegeOptions.map(college=><option key={`${college.name}-${college.city}`} value={college.name} label={`${college.name} · ${college.city}`}/>)}</datalist></label>
   <label className="form-wide" htmlFor="student-message">Your Question <small>(optional)</small><textarea id="student-message" name="message" rows={compact?2:4} value={form.message} onChange={e=>change('message',e.target.value)} placeholder="Tell us what guidance you're looking for..." maxLength={1000}/></label>
  </div>
  <div className="consent-wrap"><label className="consent-line"><input name="consent" type="checkbox" checked={form.consent} onChange={e=>change('consent',e.target.checked)} onBlur={()=>blur('consent')} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent?'consent-error':undefined}/> <span>I agree to share these details with SUN STAR through WhatsApp so the team can respond to my enquiry.</span></label>{fieldError('consent')}</div>
  <button className="btn btn-primary form-submit" type="submit"><MessageCircle size={19}/> Open WhatsApp Enquiry <ArrowUpRight size={17}/></button>
  {whatsappHref&&<p className="form-success" role="status"><CheckCircle2 size={17}/> Your message is ready. If WhatsApp didn't open, <a href={whatsappHref} target="_blank" rel="noopener noreferrer">tap here to continue</a>.</p>}
  <p className="form-note"><ShieldCheck size={15}/> Your details are placed into a WhatsApp message for review. SUN STAR only receives it after you send it in WhatsApp.</p>
  {!compact&&<div className="form-contact-row"><a href={phoneUrl}><PhoneCall size={16}/> Prefer a call?</a><a href={emailUrl}><Mail size={16}/> Email us instead</a></div>}
 </form>
}
