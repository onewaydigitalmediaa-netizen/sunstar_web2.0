import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {ArrowRight, ArrowUpRight, BookOpen, FileText, MapPin, MessageCircle, Play, Search, X} from 'lucide-react';
import {loadBangaloreTopColleges, loadTamilNaduTopColleges, preloadCollegePage} from '../collegeRouteLoaders.js';
import {SITE} from '../data/site.js';
import HomeCollegeLogos from './HomeCollegeLogos.jsx';
import StudentJourney from './StudentJourney.jsx';
import Reveal from './Reveal.jsx';

const regions = [
  {
    name: 'Tamil Nadu',
    featured: '/colleges/tamil-nadu-top-universities',
    directory: '/colleges',
    image: '/assets/colleges/paavai-educational-institutions.webp',
    caption: 'Paavai Engineering College, Namakkal',
    width: 750,
    height: 500,
    description: 'Browse the SUN STAR fee-booklet directory by study stream, location or college name.',
    load: loadTamilNaduTopColleges
  },
  {
    name: 'Bangalore',
    featured: '/colleges/bangalore-top-universities',
    directory: '/bangalore-colleges',
    image: '/assets/bangalore-colleges/east-point-campus.webp',
    imageSources: '/assets/bangalore-colleges/east-point-campus-800.webp 800w, /assets/bangalore-colleges/east-point-campus.webp 1600w',
    caption: 'East Point Group of Institutions, Bengaluru',
    width: 1600,
    height: 553,
    description: 'Explore college profiles, courses, campus locations and career support in Bengaluru.',
    load: loadBangaloreTopColleges
  }
];

function CollegeSearch() {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState(regions[0].directory);
  const navigate = useNavigate();

  function search(event) {
    event.preventDefault();
    const term = query.trim();
    navigate(term ? region + '?q=' + encodeURIComponent(term) : region);
  }

  return <form className="home-college-search" onSubmit={search} role="search" aria-label="College directory search">
    <div>
      <label htmlFor="sun-ref-search">Find a college</label>
      <input id="sun-ref-search" type="search" placeholder="College or city" value={query}
        onChange={event => setQuery(event.target.value)}/>
    </div>
    <div>
      <label htmlFor="home-search-region">Location</label>
      <select id="home-search-region" value={region} onChange={event => setRegion(event.target.value)}>
        {regions.map(item => <option key={item.name} value={item.directory}>{item.name}</option>)}
      </select>
    </div>
    <button type="submit" className="home-search-submit"><Search size={19} aria-hidden="true"/> Search</button>
  </form>;
}

function HomeIntroMedia() {
  const [showVideo, setShowVideo] = useState(false);
  return <div className="home-intro-media">
    {showVideo ? <video controls autoPlay playsInline preload="metadata" poster="/videos/sunstar-poster.jpg"
      src="/videos/viedo-sunstar.mp4" aria-label="SUN STAR introduction"/> :
        <img src="/assets/student-journey/isbr-students-1280.webp"
          srcSet="/assets/student-journey/isbr-students-640.webp 640w, /assets/student-journey/isbr-students-1280.webp 1280w"
          sizes="(max-width: 760px) 94vw, (max-width: 1200px) 46vw, 600px"
          width="1280" height="776" alt="Students gathered around books in a library" fetchPriority="high"/>}
    <button type="button" className="home-video-control" onClick={() => setShowVideo(value => !value)}>
      {showVideo ? <X size={17} aria-hidden="true"/> : <Play size={17} aria-hidden="true"/>}
      {showVideo ? 'Close video' : 'Play introduction'}
    </button>
  </div>;
}

export default function ReferenceHomeHero() {
  return <>
    <section className="home-intro" aria-labelledby="sun-ref-title">
      <div className="container home-intro-grid">
        <div className="home-intro-copy">
          <span className="home-kicker">College admissions guidance</span>
          <h1 id="sun-ref-title"><span className="home-intro-line">Find your</span> <em className="home-intro-line">path.</em></h1>
          <p>Explore colleges in Tamil Nadu and Bangalore, compare courses and published fees, or talk through your options with a SUN STAR counsellor.</p>
          <div className="home-actions">
            <Link to="/enquiry" className="home-button home-button-primary">Talk to a counsellor <ArrowRight size={18} aria-hidden="true"/></Link>
            <Link to="/courses" className="home-button home-button-secondary">Explore courses <ArrowUpRight size={17} aria-hidden="true"/></Link>
          </div>
          <CollegeSearch/>
        </div>
        <HomeIntroMedia/>
      </div>
      <div className="container home-resources">
        <Link to="/about"><MapPin size={19} aria-hidden="true"/> Based in Dharmapuri, Tamil Nadu</Link>
        <a href={SITE.feesPdf} target="_blank" rel="noopener noreferrer" aria-label="View the SUN STAR fee booklet (opens in a new tab)"><FileText size={19} aria-hidden="true"/> View the SUN STAR fee booklet <ArrowUpRight size={15} aria-hidden="true"/></a>
        <Link to="/admissions"><BookOpen size={19} aria-hidden="true"/> What to prepare for admissions</Link>
      </div>
    </section>
    <StudentJourney/>
    <section id="home-colleges" className="home-band home-regions" aria-labelledby="home-discovery-title">
      <div className="container">
        <Reveal className="home-section-heading">
          <h2 id="home-discovery-title">Explore colleges by location</h2>
          <p>Start with a region, then browse the colleges and courses that suit you.</p>
        </Reveal>
        <div className="home-region-grid">
          {regions.map(({name, featured, directory, image, imageSources, caption, width, height, description, load}, index) =>
            <Reveal as="article" className="home-region-card" key={name} delay={index * .07}>
              <figure>
                <img src={image} srcSet={imageSources} sizes={imageSources ? "(max-width: 760px) 94vw, (max-width: 1200px) 46vw, 610px" : undefined} width={width} height={height} alt="" loading="lazy" decoding="async"/>
                <figcaption>{caption}</figcaption>
              </figure>
              <div className="home-region-copy">
                <h3>{name}</h3>
                <p>{description}</p>
                <div className="home-region-actions">
                  <Link className="home-link" to={directory}>Browse {name} colleges <ArrowRight size={17} aria-hidden="true"/></Link>
                  <Link className="home-link home-link-muted" to={featured} onPointerEnter={() => preloadCollegePage(load)} onFocus={() => preloadCollegePage(load)}>
                    Featured institutions <ArrowUpRight size={16} aria-hidden="true"/>
                  </Link>
                </div>
              </div>
            </Reveal>
          )}
        </div>
        <Reveal className="home-guidance-note home-discovery-note">
          <MessageCircle size={22} aria-hidden="true"/>
          <span>Not sure where to begin? Browse the directories or talk with a SUN STAR counsellor.</span>
          <Link to="/enquiry">Get guidance <ArrowRight size={17} aria-hidden="true"/></Link>
        </Reveal>
        <HomeCollegeLogos/>
      </div>
    </section>
  </>;
}
