export const SITE = {
  name: 'SUN STAR Educational Trust',
  tagline: 'Your future starts here.',
  phone: '9944204010',
  whatsapp: '9042964616',
  email: 'sunstarmedabroad@gmail.com',
  address: 'Salem Main Road, 4 Road, Opposite Supreme Mobiles, Dharmapuri, Tamil Nadu 636701',
  brochure: '/assets/sunstar-brochure.jpg',
  feesPdf: '/documents/SUN-STAR-FEES-2026-27.pdf'
};
export const whatsappUrl = (message = 'Hello SUN STAR Educational Trust, I would like admission guidance.') =>
  `https://wa.me/91${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
export const phoneUrl = `tel:+91${SITE.phone}`;
export const emailUrl = `mailto:${SITE.email}`;
export const formatINR = value => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(value);
export const streamOptions = ['Engineering','Arts & Science','Nursing','Pharmacy','Healthcare','Polytechnic','Education'];
export const feeBookletHref = page => page ? `${SITE.feesPdf}#page=${page}` : SITE.feesPdf;
