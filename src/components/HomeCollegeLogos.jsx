import React, {useState} from 'react';
import {TAMIL_NADU_LOGO_COLLEGES} from '../data/tamilFeaturedColleges.js';
import '../styles/college-logo-carousel.css';

import {BANGALORE_COLLEGES} from '../data/bangaloreColleges.js';

function CollegeLogoCarousel({id, title, location, colleges}) {
  const [failed, setFailed] = useState([]);
  const logos = colleges.filter(({logo}) => logo && !failed.includes(logo));

  if (!logos.length) return null;

  return <section className="college-logo-section" aria-labelledby={id}>
    <div className="college-logo-heading">
      <h2 id={id}>{title} <span>{location}</span></h2>
    </div>
    <div className="college-logo-viewport">
      <div className="college-logo-track"
        style={{'--logo-duration': (logos.length * 3.5) + 's'}}>
        {[false, true].map(copy => <ul className="college-logo-list" aria-hidden={copy || undefined} key={String(copy)}>
          {logos.map(({logo, name}) => <li className="college-logo-card" key={logo}>
            <img src={logo} alt={copy ? '' : name} decoding="async"
              onError={() => setFailed(paths => paths.includes(logo) ? paths : [...paths, logo])}/>
          </li>)}
        </ul>)}
      </div>
    </div>
  </section>;
}

export default function HomeCollegeLogos() {
  return <>
    <CollegeLogoCarousel id="tamil-nadu-college-logos" title="Top 25 Colleges in" location="Tamil Nadu" colleges={TAMIL_NADU_LOGO_COLLEGES}/>
    <CollegeLogoCarousel id="bangalore-college-logos" title="Top 10 Colleges in" location="Bangalore" colleges={BANGALORE_COLLEGES}/>
  </>;
}

