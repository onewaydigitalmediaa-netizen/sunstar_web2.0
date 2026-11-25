import React,{useEffect,useMemo,useState} from 'react';
import {Link} from 'react-router-dom';
import {COURSE_CATEGORY_LABELS,COURSE_DIRECTORY,COURSE_GROUPS} from '../data/courseDirectory.js';
import tamilNaduColleges from '../data/colleges.json';
import '../styles/course-explorer.css';

const confirmation='To be confirmed from the supplied course directory.';
const normalize=value=>String(value||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/&/g,' and ').replace(/[().,/-]/g,' ').replace(/\s+/g,' ').trim();
const courseKey=(level,category,subcategory,name)=>`${level}|${category}|${subcategory||''}|${name}`;
const COURSE_GLASS_THEMES={
 MEDICAL:{rgb:'26,157,184',accent:'#087d96'},
 ENGINEERING:{rgb:'112,91,205',accent:'#5b43ba'},
 'ARTS & SCIENCE':{rgb:'224,145,42',accent:'#b96b0a'},
 MANAGEMENT:{rgb:'37,164,111',accent:'#168257'},
 'ALLIED HEALTH SCIENCES':{rgb:'224,91,132',accent:'#b52f63'},
 NURSING:{rgb:'54,124,207',accent:'#1d65b5'}
};
const courseGlassTheme=category=>COURSE_GLASS_THEMES[String(category||'').toUpperCase()]||{rgb:'26,157,184',accent:'#087d96'};

function courseDuration(course,offers){
 if(course.duration)return course.duration;
 const values=[...new Set(offers.map(offer=>offer.duration).filter(Boolean))];
 return values.length===1?values[0]:values.length>1?'Varies by institution':null;
}

export default function CourseExplorer(){
 const [level,setLevel]=useState('UG');
 const [search,setSearch]=useState('');
 const [categoryFilter,setCategoryFilter]=useState('');
 const [durationFilter,setDurationFilter]=useState('');
 const [eligibilityQuery,setEligibilityQuery]=useState('');
 const [examFilter,setExamFilter]=useState('');
 const [locationFilter,setLocationFilter]=useState('');
 const [collegeFilter,setCollegeFilter]=useState('');
 const [minimumFee,setMinimumFee]=useState('');
 const [maximumFee,setMaximumFee]=useState('');
 const [expanded,setExpanded]=useState(()=>new Set(['UG|MEDICAL']));
 const [selectedCourse,setSelectedCourse]=useState(null);
 const [bangaloreColleges,setBangaloreColleges]=useState([]);

 useEffect(()=>{let mounted=true;import('../data/bangaloreColleges.js').then(module=>{if(mounted)setBangaloreColleges(module.BANGALORE_COLLEGES)});return()=>{mounted=false}},[]);
 useEffect(()=>{if(!selectedCourse)return undefined;const closeOnEscape=event=>{if(event.key==='Escape')setSelectedCourse(null)};window.addEventListener('keydown',closeOnEscape);return()=>window.removeEventListener('keydown',closeOnEscape)},[selectedCourse]);
 useEffect(()=>{if(!selectedCourse)return undefined;const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous}},[selectedCourse]);

 const offerings=useMemo(()=>[
  ...tamilNaduColleges.flatMap(college=>(college.courses||[]).map(programName=>({collegeId:`tn-${college.id}`,collegeName:college.name,programName,location:`${college.city==='Tamil Nadu'?'':`${college.city}, `}${college.state||'Tamil Nadu'}`.replace(/^, /,''),href:`/colleges/${college.slug}`,source:'SUN STAR college directory',duration:null,eligibility:null,fees:null}))),
  ...bangaloreColleges.flatMap(college=>(college.courses||[]).map(program=>({collegeId:college.id,collegeName:college.name,programName:program.name,location:college.location,href:`/bangalore-colleges/${college.slug}`,source:program.source||'',duration:program.duration||null,eligibility:program.eligibility||null,fees:null})))
 ],[bangaloreColleges]);

 const offeringsByCourse=useMemo(()=>new Map(COURSE_DIRECTORY.map(course=>[
  course.id,offerings.filter(offer=>normalize(offer.programName)===normalize(course.name))
 ])),[offerings]);

 const coursesByKey=useMemo(()=>new Map(COURSE_DIRECTORY.map(course=>[
  courseKey(course.level,course.category,course.subcategory,course.name),course
 ])),[]);

 const currentLevelCourses=COURSE_DIRECTORY.filter(course=>course.level===level);
 const availableOffers=currentLevelCourses.flatMap(course=>offeringsByCourse.get(course.id)||[]);
 const locations=[...new Set(availableOffers.map(offer=>offer.location).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
 const colleges=[...new Map(availableOffers.map(offer=>[offer.collegeId,{id:offer.collegeId,name:offer.collegeName}])).values()].sort((a,b)=>a.name.localeCompare(b.name));
 const durations=[...new Set(currentLevelCourses.flatMap(course=>[course.duration,...(offeringsByCourse.get(course.id)||[]).map(offer=>offer.duration)]).filter(Boolean))].sort();
 const entranceExams=[...new Set(currentLevelCourses.map(course=>course.eligibility?.entranceExamination).filter(Boolean))].sort();
 const hasEligibilityData=currentLevelCourses.some(course=>course.eligibility?.qualification||course.eligibility?.subjects?.length||(offeringsByCourse.get(course.id)||[]).some(offer=>offer.eligibility));
 const fees=currentLevelCourses.map(course=>course.fees).filter(value=>Number.isFinite(value));
 const hasFeeData=fees.length>0;

 const categories=COURSE_GROUPS.filter(category=>category.level===level);
 const visibleCategories=categories.map(category=>{
  if(categoryFilter&&category.name!==categoryFilter)return null;
  const groups=category.groups.map(group=>{
   const items=group.courses.map(name=>coursesByKey.get(courseKey(level,category.name,group.name||null,name))).filter(Boolean).filter(course=>{
    const term=search.trim().toLowerCase();
    const matches=offeringsByCourse.get(course.id)||[];
    const searchContent=`${course.name} ${course.categoryLabel} ${course.subcategory||''} ${matches.map(offer=>`${offer.collegeName} ${offer.location}`).join(' ')}`.toLowerCase();
    if(term&&!searchContent.includes(term))return false;
    if(locationFilter&&!matches.some(offer=>offer.location===locationFilter))return false;
    if(collegeFilter&&!matches.some(offer=>offer.collegeId===collegeFilter))return false;
    const duration=courseDuration(course,matches);
    if(durationFilter&&duration!==durationFilter)return false;
    const eligibilityText=[course.eligibility?.qualification,...(course.eligibility?.subjects||[]),...matches.map(offer=>offer.eligibility)].filter(Boolean).join(' ').toLowerCase();
    if(eligibilityQuery&&!eligibilityText.includes(eligibilityQuery.trim().toLowerCase()))return false;
    if(examFilter&&course.eligibility?.entranceExamination!==examFilter)return false;
    const fee=course.fees;
    if(minimumFee&&(!Number.isFinite(fee)||fee<Number(minimumFee)))return false;
    if(maximumFee&&(!Number.isFinite(fee)||fee>Number(maximumFee)))return false;
    return true;
   });
   return {...group,items};
  }).filter(group=>group.items.length);
  return groups.length?{...category,groups}:null;
 }).filter(Boolean);
 const resultCount=visibleCategories.reduce((sum,category)=>sum+category.groups.reduce((groupSum,group)=>groupSum+group.items.length,0),0);
 const hasFilters=Boolean(search||categoryFilter||durationFilter||eligibilityQuery||examFilter||locationFilter||collegeFilter||minimumFee||maximumFee);

 const clearFilters=()=>{setSearch('');setCategoryFilter('');setDurationFilter('');setEligibilityQuery('');setExamFilter('');setLocationFilter('');setCollegeFilter('');setMinimumFee('');setMaximumFee('')};
 const toggleCategory=id=>setExpanded(current=>{const next=new Set(current);next.has(id)?next.delete(id):next.add(id);return next});
 const selectedOffers=selectedCourse?(offeringsByCourse.get(selectedCourse.id)||[]):[];
 const selectedDuration=selectedCourse?courseDuration(selectedCourse,selectedOffers):null;

 return <section className="section course-explorer-section" aria-labelledby="course-explorer-title">
  <div className="container">
   <header className="course-explorer-heading">
    <div><span className="eyebrow">COMPLETE COURSE DIRECTORY</span><h2 id="course-explorer-title">Explore every <span>UG &amp; PG programme.</span></h2><p>Search the supplied course list by name, study level, category, or verified college availability.</p></div>
    <div className="course-level-switch" role="tablist" aria-label="Programme level">
     {['UG','PG'].map(option=><button key={option} type="button" role="tab" aria-selected={level===option} className={level===option?'is-active':''} onClick={()=>{setLevel(option);setCategoryFilter('');setDurationFilter('');setEligibilityQuery('');setExamFilter('');setLocationFilter('');setCollegeFilter('');setMinimumFee('');setMaximumFee('')}}>{option}<span>{COURSE_DIRECTORY.filter(course=>course.level===option).length}</span></button>)}
    </div>
   </header>

   <div className="course-explorer-filters">
    <label className="course-search"><span className="course-search-icon" aria-hidden="true"/><span className="sr-only">Search courses</span><input type="search" value={search} onChange={event=>setSearch(event.target.value)} placeholder="Search a course, subject, or specialisation..."/></label>
    <label className="course-select"><span>Category</span><select value={categoryFilter} onChange={event=>setCategoryFilter(event.target.value)}><option value="">All categories</option>{categories.map(category=><option value={category.name} key={category.name}>{COURSE_CATEGORY_LABELS[category.name]||category.name}</option>)}</select></label>
    {durations.length>0&&<label className="course-select"><span>Duration</span><select value={durationFilter} onChange={event=>setDurationFilter(event.target.value)}><option value="">Any duration</option>{durations.map(duration=><option key={duration}>{duration}</option>)}</select></label>}
    {hasEligibilityData&&<label className="course-select"><span>Qualification / eligibility</span><input type="search" value={eligibilityQuery} onChange={event=>setEligibilityQuery(event.target.value)} placeholder="e.g. 10+2, Physics..." aria-label="Filter by qualification or eligibility"/> </label>}
    {entranceExams.length>0&&<label className="course-select"><span>Entrance exam</span><select value={examFilter} onChange={event=>setExamFilter(event.target.value)}><option value="">Any entrance exam</option>{entranceExams.map(item=><option key={item}>{item}</option>)}</select></label>}
    {locations.length>0&&<label className="course-select"><span>State / City</span><select value={locationFilter} onChange={event=>setLocationFilter(event.target.value)}><option value="">All locations</option>{locations.map(item=><option key={item}>{item}</option>)}</select></label>}
    {colleges.length>0&&<label className="course-select"><span>College</span><select value={collegeFilter} onChange={event=>setCollegeFilter(event.target.value)}><option value="">All colleges</option>{colleges.map(college=><option value={college.id} key={college.id}>{college.name}</option>)}</select></label>}
    {hasFeeData&&<div className="course-fee-filter"><span>Verified course fee</span><input type="number" min="0" value={minimumFee} onChange={event=>setMinimumFee(event.target.value)} placeholder="Min" aria-label="Minimum course fee"/><input type="number" min="0" value={maximumFee} onChange={event=>setMaximumFee(event.target.value)} placeholder="Max" aria-label="Maximum course fee"/></div>}
    <button className="course-clear-filters" type="button" disabled={!hasFilters} onClick={clearFilters} aria-label="Clear course filters">Clear filters</button>
   </div>

   <div className="course-results-note" aria-live="polite"><strong>{resultCount}</strong> {level} programmes{search?<> matching <strong>&quot;{search}&quot;</strong></>:null}</div>
   {visibleCategories.length? <div className="course-category-list">{visibleCategories.map(category=>{
    const categoryId=`${level}|${category.name}`;
    const isOpen=expanded.has(categoryId)||Boolean(search)||Boolean(categoryFilter);
    const categoryCount=category.groups.reduce((sum,group)=>sum+group.items.length,0);
    const theme=courseGlassTheme(category.name);
    return <section className={`course-category${isOpen?' is-open':''}`} key={categoryId} style={{'--course-rgb':theme.rgb,'--course-accent':theme.accent}}>
     <button className="course-category-toggle" type="button" aria-expanded={isOpen} onClick={()=>toggleCategory(categoryId)}><span><small>{level} CATEGORY</small><strong>{COURSE_CATEGORY_LABELS[category.name]||category.name}</strong></span><span className="course-category-count">{categoryCount} courses <i aria-hidden="true"/></span></button>
     <div className="course-category-body" aria-hidden={!isOpen}>
      {category.groups.map(group=><div className="course-subcategory" key={`${categoryId}|${group.name||'main'}`}>
       {group.name&&<h4>{group.name}</h4>}
       <div className="course-programme-grid">{group.items.map((course,index)=>{
        const matches=offeringsByCourse.get(course.id)||[];
        const duration=courseDuration(course,matches);
        const eligibility=course.eligibility?.qualification||matches.find(offer=>offer.eligibility)?.eligibility||null;
        return <article className="course-programme-card" key={course.id} style={{'--course-delay':`${Math.min(index,12)*25}ms`,'--course-rgb':theme.rgb,'--course-accent':theme.accent}}>
         <span className="course-level-tag">{course.level}</span>
         <button className="course-programme-title" type="button" onClick={()=>setSelectedCourse(course)}>{course.name}</button>
         <span className="course-programme-duration">Duration: {duration||'To be confirmed'}</span>
         <span className="course-programme-eligibility">Eligibility: {eligibility||'To be confirmed'}</span>
         <div className="course-programme-actions"><button type="button" onClick={()=>setSelectedCourse(course)}>View details</button><Link to={`/colleges?q=${encodeURIComponent(course.name)}`}>Explore colleges</Link></div>
        </article>;
       })}</div>
      </div>)}
     </div>
    </section>;
   })}</div>:<div className="course-empty-state"><h3>No courses match these filters</h3><p>Try a different search or clear the category and availability filters.</p><button type="button" onClick={clearFilters}>Clear filters</button></div>}

   <p className="course-source-note">Course names are transcribed from the supplied directory. Durations, eligibility, entrance requirements, fees, and college offerings appear only when verified source data is available.</p>
  </div>

  {selectedCourse&&<div className="course-detail-backdrop" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)setSelectedCourse(null)}}>
   <aside className="course-detail-panel" role="dialog" aria-modal="true" aria-labelledby="course-detail-title" style={{'--course-rgb':courseGlassTheme(selectedCourse.category).rgb,'--course-accent':courseGlassTheme(selectedCourse.category).accent}}>
    <button className="course-detail-close" type="button" aria-label="Close course details" onClick={()=>setSelectedCourse(null)}>&times;</button>
    <span className="eyebrow">{selectedCourse.level} · {selectedCourse.categoryLabel}</span>
    <h2 id="course-detail-title">{selectedCourse.name}</h2>
    <div className="course-detail-facts">
     <div><small>Course level</small><strong>{selectedCourse.level==='UG'?'Undergraduate':'Postgraduate'}</strong></div>
     <div><small>Duration</small><strong>{selectedDuration||confirmation}</strong></div>
     <div><small>Required qualification</small><strong>{selectedCourse.eligibility?.qualification|| (selectedOffers.some(offer=>offer.eligibility)?'Institution-specific; see verified college entries below.':confirmation)}</strong></div>
     <div><small>Required subjects</small><strong>{selectedCourse.eligibility?.subjects?.length?selectedCourse.eligibility.subjects.join(', '):(selectedOffers.some(offer=>offer.eligibility)?'Institution-specific; see verified college entries below.':confirmation)}</strong></div>
     <div><small>Minimum marks</small><strong>{selectedCourse.eligibility?.minimumMarks||confirmation}</strong></div>
     <div><small>Entrance examination</small><strong>{selectedCourse.eligibility?.entranceExamination||confirmation}</strong></div>
    </div>
    <section className="course-college-offerings"><h3>Colleges offering this course</h3>
     {selectedOffers.length?<ul>{selectedOffers.map((offer,index)=><li key={`${offer.collegeId}-${index}`}><Link to={offer.href}>{offer.collegeName}</Link><small>{offer.location} - Listed as &quot;{offer.programName}&quot;</small>{offer.duration&&<small>Published duration: {offer.duration}</small>}{offer.eligibility&&<small>Published eligibility: {offer.eligibility}</small>}{offer.source?.startsWith('http')&&<a href={offer.source} target="_blank" rel="noreferrer">Course source</a>}</li>)}</ul>:<p>College information will be updated soon.</p>}
    </section>
    <div className="course-detail-actions"><Link className="btn btn-primary" to={`/enquiry?course=${encodeURIComponent(selectedCourse.name)}`}>Enquire now</Link><Link className="btn btn-outline" to={`/colleges?q=${encodeURIComponent(selectedCourse.name)}`}>Explore colleges</Link></div>
   </aside>
  </div>}
 </section>;
}
