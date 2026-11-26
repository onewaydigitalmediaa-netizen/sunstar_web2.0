import colleges from './colleges.json';

const avinashilingamSlug = 'avinashilingam-institute-for-home-science-and-higher-education-for-women';

export const TAMIL_NADU_FEATURED_COLLEGES = [
  ...colleges.filter(college => college.slug === avinashilingamSlug),
  ...colleges.filter(college => college.slug !== avinashilingamSlug).slice(0, 9)
];

export const tamilLogos={
 'avinashilingam-institute-for-home-science-and-higher-education-for-women':'avinashilingam.jpg',
 'paavai-educational-institutions':'paavai.svg',
 'mahendra-educational-institutions':'mahendra.png',
 'excel-group-institutions':'excel.png',
 'the-kavery-educational-institutions':'kavery.png',
 'karpagam-group-of-institutions':'karpagam.png',
 'hindustan-group-of-institutions':'hindustan.svg',
 'erode-sengunthar-engineering-college':'erode-sengunthar.png',
 'shree-venkateshwara-group-of-institutions':'venkateshwara.png',
 'sengunthar-group-of-institution-tiruchengode':'sengunthar.png'
};

const featuredSlugs = new Set(TAMIL_NADU_FEATURED_COLLEGES.map(({slug}) => slug));

export const TAMIL_NADU_LOGO_COLLEGES = [
  ...TAMIL_NADU_FEATURED_COLLEGES,
  ...colleges.filter(({slug}) => !featuredSlugs.has(slug))
].slice(0, 25).map(({slug, name}) => ({
  name,
  logo: tamilLogos[slug] ? `/assets/college-logos/${tamilLogos[slug]}` : undefined
}));
