import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight,ArrowUpRight,GraduationCap} from 'lucide-react';
import {COLLEGE_PHOTOS} from '../data/collegePhotos.js';

const tamilLogos={
 'avinashilingam-institute-for-home-science-and-higher-education-for-women':'avinashilingam.jpg',
 'paavai-educational-institutions':'paavai.svg',
 'mahendra-educational-institutions':'mahendra.png',
 'excel-group-institutions':'excel.png',
 'the-kavery-educational-institutions':'kavery.png',
 'karpagam-group-of-institutions':'karpagam.png',
 'hindustan-group-of-institutions':'hindustan.svg',
 'erode-sengunthar-engineering-college':'erode-sengunthar.png',
 'shree-venkateshwara-group-of-institutions':'venkateshwara.png',
 'sengunthar-group-of-institution-tiruchengode':'sengunthar.png'
};

const enquiryLink=name=>`/enquiry?college=${encodeURIComponent(name)}`;

function CollegeLogo({src,name}){
 const [failed,setFailed]=React.useState(false);
 return <span className="featured-logo">{src&&!failed?<img src={src} alt={`${name} logo`} loading="lazy" onError={()=>setFailed(true)}/>:<GraduationCap aria-label="University icon" size={25}/>}</span>;
}

export default function FeaturedCollegeCards({items,bangalore=false}){
 return <div className={`sun-ref-featured-grid${bangalore?' bangalore-featured-grid':''}`}>{items.map(college=>{
  const detail=`/${bangalore?'bangalore-colleges':'colleges'}/${college.slug}`;
  const courses=(college.courses||[]).slice(0,3).map(course=>typeof course==='string'?course:course.name);
  const logo=bangalore?college.logo:tamilLogos[college.slug]&&`/assets/college-logos/${tamilLogos[college.slug]}`;
  return <article key={college.slug} className="sun-ref-college-card">
   <Link to={detail} className="sun-ref-college-photo">
    <img className="featured-campus-image" src={bangalore?college.campusImage:COLLEGE_PHOTOS[college.slug]} loading="lazy" alt={bangalore?college.campusImageAlt:`${college.name} campus`}/>
    <CollegeLogo src={logo} name={college.name}/>
    <span className="featured-location">{bangalore?college.location:`${college.city}, Tamil Nadu`}</span>
   </Link>
   <div className="sun-ref-college-content">
    <p className="featured-type">{bangalore?college.institutionType:college.type}</p>
    <h3>{college.name}</h3>
    <p className="featured-courses"><strong>Courses</strong> {courses.join(' · ')||'See college details'}</p>
    <div className="featured-card-actions"><Link to={detail}>View Details <ArrowUpRight size={17}/></Link><Link to={enquiryLink(college.name)}>Enquire Now <ArrowRight size={17}/></Link></div>
   </div>
  </article>;
 })}</div>;
}
