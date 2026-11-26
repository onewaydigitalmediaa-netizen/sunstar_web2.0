import React,{lazy,Suspense,useEffect} from 'react';
import {Routes,Route,useLocation,Navigate} from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import FloatingActions from './components/FloatingActions.jsx';
import CounsellorWidget from './components/CounsellorWidget.jsx';
import EnquiryPopup from './components/EnquiryPopup.jsx';
import {loadBangaloreTopColleges,loadTamilNaduTopColleges} from './collegeRouteLoaders.js';
const Home=lazy(()=>import('./pages/Home.jsx'));
const Colleges=lazy(()=>import('./pages/Colleges.jsx'));
const CollegeDetail=lazy(()=>import('./pages/CollegeDetail.jsx'));
const Courses=lazy(()=>import('./pages/Courses.jsx'));
const Admissions=lazy(()=>import('./pages/Admissions.jsx'));
const Services=lazy(()=>import('./pages/Services.jsx'));
const About=lazy(()=>import('./pages/About.jsx'));
const Career=lazy(()=>import('./pages/Career.jsx'));
const Contact=lazy(()=>import('./pages/Contact.jsx'));
const Enquiry=lazy(()=>import('./pages/Enquiry.jsx'));
const NotFound=lazy(()=>import('./pages/NotFound.jsx'));
const TamilNaduTopColleges=lazy(loadTamilNaduTopColleges);
const BangaloreTopColleges=lazy(loadBangaloreTopColleges);
const BangaloreColleges=lazy(()=>import('./pages/BangaloreColleges.jsx'));
const BangaloreCollegeDetail=lazy(()=>import('./pages/BangaloreCollegeDetail.jsx'));
function ScrollToTop() {
 const {pathname,hash}=useLocation();
 useEffect(()=>{
  if(!hash){
   window.scrollTo({top:0,behavior:'instant'});
   return;
  }

  let id=hash.slice(1);
  try{id=decodeURIComponent(id)}catch{/* A malformed URL can still contain a literal ID. */}
  const main=document.getElementById('main-content');
  function scrollToTarget(){
   const target=document.getElementById(id);
   if(!target)return false;
   target.scrollIntoView({behavior:'instant',block:'start'});
   return true;
  }

  if(scrollToTarget()||!main)return;
  const observer=new MutationObserver(()=>{if(scrollToTarget())observer.disconnect()});
  observer.observe(main,{childList:true,subtree:true});
  return()=>observer.disconnect();
 },[pathname,hash]);
 return null;
}
function AnimatedRoutes(){
 const location=useLocation();
 return <Suspense fallback={<div className="container section"><p>Loading page…</p></div>}><Routes location={location}><Route path="/" element={<Home/>}/><Route path="/colleges" element={<Colleges/>}/><Route path="/colleges/tamil-nadu-top-universities" element={<TamilNaduTopColleges/>}/><Route path="/colleges/bangalore-top-universities" element={<BangaloreTopColleges/>}/><Route path="/bangalore-colleges" element={<BangaloreColleges/>}/><Route path="/bangalore-colleges/:slug" element={<BangaloreCollegeDetail/>}/><Route path="/sun-star-med-abroad" element={<Navigate to="/services#mbbs-abroad" replace/>}/><Route path="/colleges/:slug" element={<CollegeDetail/>}/><Route path="/courses" element={<Courses/>}/><Route path="/admissions" element={<Admissions/>}/><Route path="/services" element={<Services/>}/><Route path="/career" element={<Career/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="/enquiry" element={<Enquiry/>}/><Route path="*" element={<NotFound/>}/></Routes></Suspense>
}
export default function App(){return <><a className="skip-to-content" href="#main-content">Skip to main content</a><ScrollToTop/><Header/><main id="main-content" tabIndex={-1}><AnimatedRoutes/></main><Footer/><FloatingActions/><CounsellorWidget/><EnquiryPopup/></>}
