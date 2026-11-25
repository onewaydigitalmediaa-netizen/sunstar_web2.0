import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,Phone,Mail,MapPin,MessageCircle,GraduationCap} from 'lucide-react';
import {SITE,whatsappUrl,phoneUrl,emailUrl} from '../data/site.js';
// Brand logo geometry from Simple Icons, whose source metadata links to each brand's official assets.
// https://github.com/simple-icons/simple-icons/blob/develop/data/simple-icons.json
// Instagram colour artwork: https://commons.wikimedia.org/wiki/File:Instagram_logo_2022.svg
const socialLinks=[
 {label:'Instagram',href:'https://www.instagram.com/sun_star_educational_trust?xtok=MWN0M2NiaG14MGdpbg==',image:'/assets/social/instagram.svg'},
 {label:'Facebook',colour:'#0866FF',href:'https://facebook.com/share/1ATAxxw5Cy/',path:'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z'},
 {label:'YouTube',colour:'#FF0000',href:'https://youtube.com/@SunStarEducationalT',path:'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'}
 ,{label:'WhatsApp',href:whatsappUrl(),colour:'#25D366',path:'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z'}
];
function SocialIcon({label,image,colour,path}){
 if(image)return <img src={image} width="20" height="20" alt="" aria-hidden="true"/>;
 return <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  {label==='Facebook'&&<circle cx="12" cy="12.044" r="12" fill="#fff"/>}
  {label==='YouTube'&&<path d="M9.545 15.568V8.432L15.818 12z" fill="#fff"/>}
  {label==='WhatsApp'&&<path d="M20.464 3.488A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill={colour}/>}
  <path d={path} fill={label==='WhatsApp'?'#fff':colour}/>
 </svg>
}
export default function Footer(){
 return <footer className="footer"><div className="container">
  <div className="footer-top"><div><span className="eyebrow light">LET'S PLAN YOUR FUTURE</span><h2>One conversation can change<br/>your next chapter.</h2></div><Link to="/enquiry" className="btn btn-yellow">Talk to an Admission Counsellor <ArrowUpRight size={18}/></Link></div>
  <div className="footer-grid">
   <div className="footer-brand"><div className="footer-logo"><img src="/assets/sunstar-logo.png" alt="SUN STAR Educational Trust"/></div><p>Guidance for education in Tamil Nadu and MBBS admissions abroad. Helping students navigate their options with clarity and care.</p><div className="footer-social">{socialLinks.map(social=><a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} title={social.label}><SocialIcon {...social}/></a>)}</div></div>
   <div><h3>Quick links</h3><Link to="/">Home</Link><Link to="/colleges">Find Colleges</Link><Link to="/courses">Explore Courses</Link><Link to="/admissions">Admission Process</Link><Link to="/about">About Us</Link></div>
   <div><h3>Explore streams</h3><Link to="/colleges?stream=Engineering">Engineering</Link><Link to="/colleges?stream=Nursing">Nursing</Link><Link to="/colleges?stream=Pharmacy">Pharmacy</Link><Link to="/colleges?stream=Arts%20%26%20Science">Arts & Science</Link><Link to="/services">MBBS Abroad</Link></div>
   <div className="footer-contact"><h3>Get in touch</h3><a href={phoneUrl}><Phone size={17}/> +91 {SITE.phone}</a><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><MessageCircle size={17}/> +91 {SITE.whatsapp}</a><a href={emailUrl}><Mail size={17}/> {SITE.email}</a><span><MapPin size={18}/> {SITE.address}</span></div>
  </div>
  <div className="footer-bottom"><span>© SUN STAR Educational Trust. All rights reserved.</span><span>College and course information is subject to institution confirmation.</span></div>
 </div></footer>
}
