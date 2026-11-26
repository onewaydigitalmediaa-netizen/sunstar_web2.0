import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight, ArrowUpRight, BookOpen, Building2, FileText, FlaskConical, Globe2, GraduationCap, HeartPulse, Landmark, Phone, Stethoscope} from 'lucide-react';
import {SITE, phoneUrl} from '../data/site.js';
import ReferenceHomeHero from '../components/ReferenceHomeHero.jsx';
import Reveal from '../components/Reveal.jsx';
import FAQSection from '../components/FAQSection.jsx';
import StudentReviews from '../components/StudentReviews.jsx';
import '../styles/homepage.css';

const categories = [
  {name: 'Engineering', description: 'B.E., B.Tech and technology', icon: GraduationCap},
  {name: 'Nursing', description: 'Nursing and patient care', icon: HeartPulse},
  {name: 'Pharmacy', description: 'Pharmaceutical studies', icon: FlaskConical},
  {name: 'Arts & Science', description: 'Arts, commerce and science', icon: BookOpen},
  {name: 'Healthcare', description: 'Allied health and paramedical', icon: Stethoscope},
  {name: 'Polytechnic', description: 'Diploma and technical courses', icon: Building2},
  {name: 'Education', description: 'Teaching and education', icon: Landmark}
];

export default function Home() {
  return <div className="sunstar-home">
    <ReferenceHomeHero/>
    <section className="home-band home-courses" aria-labelledby="home-courses-title">
      <div className="container">
        <Reveal className="home-section-heading home-heading-with-link">
          <div><h2 id="home-courses-title">Explore courses by interest</h2><p>Choose a stream to see matching colleges in the Tamil Nadu directory.</p></div>
          <Link className="home-link" to="/courses">Browse all courses <ArrowRight size={18} aria-hidden="true"/></Link>
        </Reveal>
        <div className="home-course-grid">
          {categories.map(({name, description, icon: Icon}, index) => <Reveal key={name} delay={(index % 3) * .06}>
            <Link className="home-course-card" to={'/colleges?stream=' + encodeURIComponent(name)}>
              <span className="home-icon"><Icon size={22} aria-hidden="true"/></span>
              <span><strong>{name}</strong><small>{description}</small></span>
              <ArrowUpRight className="home-course-arrow" size={16} aria-hidden="true"/>
            </Link>
          </Reveal>)}
        </div>
      </div>
    </section>
    <section className="home-band home-guidance" aria-labelledby="home-guidance-title">
      <div className="container">
        <Reveal className="home-section-heading home-heading-with-link">
          <div><h2 id="home-guidance-title">How SUN STAR can help</h2><p>Get support choosing a college, understanding published fees and preparing for admission.</p></div>
          <Link className="home-link" to="/services">View counselling services <ArrowRight size={18} aria-hidden="true"/></Link>
        </Reveal>
        <Reveal className="home-fees">
          <span className="home-icon"><FileText size={23} aria-hidden="true"/></span>
          <div><h3>Check the original fee booklet</h3><p>Use published fees as a starting point and confirm current charges with the college.</p></div>
          <div className="home-fees-actions">
            <a className="home-link" href={SITE.feesPdf} target="_blank" rel="noopener noreferrer" aria-label="Open the fee booklet (opens in a new tab)">Open fee booklet <ArrowUpRight size={17} aria-hidden="true"/></a>
            <Link className="home-link home-link-muted" to="/about">About SUN STAR <ArrowRight size={17} aria-hidden="true"/></Link>
          </div>
        </Reveal>
      </div>
    </section>
    <section className="home-band home-abroad" aria-labelledby="home-abroad-title">
      <div className="container">
        <Reveal className="home-abroad-panel">
          <span className="home-icon"><Globe2 size={29} aria-hidden="true"/></span>
          <div><h2 id="home-abroad-title">Considering MBBS abroad?</h2>
            <p>Discuss eligibility, universities and estimated costs with SUN STAR.</p>
            <ul>{['Georgia', 'Vietnam', 'Uzbekistan', 'Russia'].map(country => <li key={country}>{country}</li>)}</ul>
          </div>
          <Link className="home-button home-button-secondary" to="/services#mbbs-abroad">Explore MBBS abroad <ArrowUpRight size={17} aria-hidden="true"/></Link>
        </Reveal>
      </div>
    </section>
    <StudentReviews/>
    <FAQSection/>
    <section className="home-band home-contact" aria-labelledby="home-contact-title">
      <div className="container">
        <Reveal className="home-contact-panel">
          <div><h2 id="home-contact-title">Talk through your college options</h2><p>Share your preferred course, location or budget. You can review your message before sending it on WhatsApp.</p></div>
          <div className="home-actions">
            <Link className="home-button home-button-primary" to="/enquiry">Start an enquiry <ArrowRight size={18} aria-hidden="true"/></Link>
            <a className="home-button home-button-on-dark" href={phoneUrl}><Phone size={17} aria-hidden="true"/> Call our team</a>
          </div>
        </Reveal>
      </div>
    </section>
  </div>;
}
