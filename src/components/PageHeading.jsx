import React from 'react';
import {Link} from 'react-router-dom';
import {ChevronRight} from 'lucide-react';
import Reveal from './Reveal.jsx';
export default function PageHeading({eyebrow,title,description,crumb}){return <Reveal as="section" className="page-banner" amount={.1}><div className="container"><div className="crumb"><Link to="/">Home</Link><ChevronRight size={14}/><span>{crumb||title}</span></div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{description&&<p>{description}</p>}</div><span className="page-glow one"/><span className="page-glow two"/></Reveal>}
