import React from 'react';
import {ExternalLink,MapPin,Star} from 'lucide-react';
import Reveal from './Reveal.jsx';
import '../styles/student-reviews.css';

const reviewGroups=[
 {region:'Bangalore',location:'Bengaluru, Karnataka',college:'Alliance University',href:'https://collegedunia.com/university/25591-alliance-university-bangalore/reviews',reviews:[
  {student:'Thathampilly Anandhu Dayanand',course:'MBA · General',rating:'4.0',date:'April',summary:'Liked the green campus, friendly peer connections and faculty with industry experience. Suggested stronger placement and interview preparation.'},
  {student:'Maanav',course:'MBA · General',rating:'3.5',date:'April',summary:'Described MBA placement opportunities as average to good and shared his perspective on placement timing and outcomes for his batch.'},
  {student:'Ritika Raj',course:'BBA (Hons.) · General',rating:'4.2',date:'January',summary:'Reported positive experiences with faculty, academics and campus life, while noting the commute, food options and class timings as drawbacks.'}
 ]},
 {region:'Tamil Nadu',location:'Namakkal, Tamil Nadu',college:'Paavai Engineering College',href:'https://collegedunia.com/college/24320-paavai-engineering-college-autonomous-namakkal/reviews',reviews:[
  {student:'Aril',course:'B.E. · Computer Science and Engineering',rating:'3.7',date:'September 2025',summary:'Valued the green setting, useful teaching and auditorium facilities; suggested improvements to labs and noted canteen pricing.'},
  {student:'Yukeshkumar',course:'B.E. · Computer Science and Engineering',rating:'4.7',date:'February 2025',summary:'Enjoyed college life and viewed the faculty as qualified, while identifying hostel food as an area needing improvement.'},
  {student:'Surya R',course:'B.E. · Computer Science and Engineering',rating:'4.0',date:'February 2025',summary:'Appreciated maintained classrooms, career events and bus routes, and felt some campus rules and cultural events could improve.'}
 ]}
];

function ReviewCard({review,source}){
 return <article className="student-review-card">
  <div className="student-review-meta"><span className="student-review-rating"><Star size={15} fill="currentColor"/> {review.rating}<small>/ 5</small></span><time>{review.date}</time></div>
  <p className="student-review-summary">{review.summary}</p>
  <div className="student-review-footer"><span className="student-review-avatar" aria-hidden="true">{review.student.split(/\s+/).slice(0,2).map(part=>part[0]).join('')}</span><span className="student-review-author"><strong>{review.student}</strong><small>{review.course}</small></span><a className="student-review-source" href={source} target="_blank" rel="noreferrer" aria-label={`Read ${review.student}'s review on Collegedunia`}><ExternalLink size={16}/></a></div>
 </article>;
}

export default function StudentReviews(){
 return <Reveal as="section" className="section student-reviews" amount={0.1} aria-labelledby="student-reviews-title">
  <div className="container">
   <div className="section-heading student-reviews-heading"><div><span className="eyebrow">STUDENT EXPERIENCES</span><h2 id="student-reviews-title">Student perspectives on campus life</h2><p>Perspectives from students at Bangalore and Tamil Nadu colleges.</p></div><span className="student-reviews-count"><Star size={16} fill="currentColor"/> 6 student reviews</span></div>
   <p className="student-reviews-note">Paraphrased from public student reviews on Collegedunia. Ratings and experiences are individual opinions.</p>
   <div className="student-review-groups">{reviewGroups.map(group=><section className="student-review-group" key={group.region} aria-label={`${group.region} student reviews`}>
    <div className="student-review-group-heading"><div><span>{group.region}</span><h3>{group.college}</h3><small><MapPin size={13}/>{group.location}</small></div><a href={group.href} target="_blank" rel="noreferrer">Read all reviews <ExternalLink size={14}/></a></div>
    <div className="student-review-grid">{group.reviews.map(review=><ReviewCard key={review.student} review={review} source={group.href}/>)}</div>
   </section>)}</div>
  </div>
 </Reveal>;
}
