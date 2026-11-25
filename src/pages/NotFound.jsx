import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowLeft} from 'lucide-react';
export default function NotFound(){return <section className="not-found"><span>404</span><h1>We couldn't find that page.</h1><p>But you can still find the right college.</p><Link className="btn btn-primary" to="/"><ArrowLeft size={18}/> Return to homepage</Link></section>}
