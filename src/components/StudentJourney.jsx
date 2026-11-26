import React, {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight} from 'lucide-react';
import '../styles/student-journey.css';

const milestones = [
  {
    title: 'Explore options',
    text: 'Start with subjects you enjoy. Browse courses and note the study streams, locations and budget that work for you.',
    action: 'Explore courses',
    to: '/courses',
    // Kiran Pokuri Photography — https://www.pexels.com/photo/4622108/
    image: '/assets/student-journey/explore-options.webp',
    alt: 'Three students looking at a laptop and books together on campus'
  },
  {
    title: 'Compare colleges',
    text: 'Build a shortlist in Tamil Nadu or Bangalore. Compare listed courses, campus locations and published fees, then confirm the details with each college.',
    action: 'Find colleges by location',
    to: '/#home-colleges',
    image: '/assets/colleges/paavai-educational-institutions.webp',
    alt: 'The Paavai Engineering College campus building and lawn',
    caption: 'Paavai Engineering College, Namakkal'
  },
  {
    title: 'Talk to a counsellor',
    text: 'Share the colleges or courses you are considering and the questions you still have. You can review your enquiry in WhatsApp before sending it.',
    action: 'Talk to SUN STAR',
    to: '/enquiry',
    // Antoni Shkraba — https://www.pexels.com/photo/5306437/
    image: '/assets/student-journey/student-guidance.webp',
    alt: 'A student in a one-to-one conversation with a professor'
  },
  {
    title: 'Plan your application',
    text: 'Go through your shortlist, confirm eligibility and deadlines with the colleges, and gather the documents you will need.',
    action: 'See the admissions guide',
    to: '/admissions',
    // George Pak — https://www.pexels.com/photo/7972282/
    image: '/assets/student-journey/application-planning.webp',
    alt: 'A person reviewing paperwork beside a laptop and pen'
  }
];

function JourneyPhoto({milestone, className, active}) {
  return <figure className={className} data-active={active} aria-hidden={active === false || undefined}>
    <img src={milestone.image} alt={milestone.alt} loading="lazy" decoding="async"
      style={{objectPosition: milestone.position}}/>
    {milestone.caption && <figcaption>{milestone.caption}</figcaption>}
  </figure>;
}

export default function StudentJourney() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const steps = [...trackRef.current.children];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer;

    function connectObserver() {
      observer?.disconnect();
      if (reducedMotion.matches) return;

      const height = document.documentElement.clientHeight;
      const activationLine = Math.round(height * .46);
      observer = new IntersectionObserver(() => {
        let next = 0;
        for (const [index, step] of steps.entries()) {
          if (step.getBoundingClientRect().top <= activationLine) next = index;
        }
        setActive(next);
      }, {rootMargin: '-' + activationLine + 'px 0px -' + (height - activationLine - 2) + 'px 0px'});

      steps.forEach(step => observer.observe(step));
    }

    connectObserver();
    window.addEventListener('resize', connectObserver);
    reducedMotion.addEventListener('change', connectObserver);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', connectObserver);
      reducedMotion.removeEventListener('change', connectObserver);
    };
  }, []);

  return <section className="home-band student-journey" aria-labelledby="student-journey-title">
    <div className="container">
      <header className="home-section-heading student-journey-heading">
        <span className="home-kicker">The Student Journey</span>
        <h2 id="student-journey-title">Your next step, <em>made clearer</em></h2>
        <p>From a first idea to a shortlist and an application plan.</p>
      </header>
      <div className="student-journey-layout">
        <div className="student-journey-stage">
          {milestones.map((milestone, index) =>
            <JourneyPhoto key={milestone.title} className="student-journey-frame" milestone={milestone} active={active === index}/>
          )}
        </div>
        <ol className="student-journey-track" role="list" ref={trackRef}>
          {milestones.map((milestone, index) =>
            <li key={milestone.title} className="student-journey-step"
              data-active={active === index} data-complete={active > index}>
              <span className="student-journey-marker" aria-hidden="true">{index + 1}</span>
              <div className="student-journey-card">
                <JourneyPhoto className="student-journey-inline-photo" milestone={milestone}/>
                <div className="student-journey-copy">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.text}</p>
                  <Link to={milestone.to} className="home-link">
                    {milestone.action} <ArrowRight size={17} aria-hidden="true"/>
                  </Link>
                </div>
              </div>
            </li>
          )}
        </ol>
      </div>
    </div>
  </section>;
}
