import React from 'react';
import {Link} from 'react-router-dom';
import {MessageCircle,Phone,ClipboardPenLine} from 'lucide-react';
import {phoneUrl,whatsappUrl} from '../data/site.js';
export default function FloatingActions(){return <aside className="floating-actions" aria-label="Quick contact actions">
  <Link to="/enquiry" aria-label="Open enquiry form" title="Admission enquiry" className="float-enquiry"><ClipboardPenLine size={21}/><span>Enquire</span></Link>
  <a href={phoneUrl} title="Call SUN STAR" aria-label="Call SUN STAR" className="float-call"><Phone size={21}/><span>Call us</span></a>
  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp" aria-label="Chat on WhatsApp" className="float-whatsapp"><MessageCircle size={23}/><span>WhatsApp</span></a>
 </aside>}
