import colleges from './colleges.json';

const avinashilingamSlug = 'avinashilingam-institute-for-home-science-and-higher-education-for-women';

export const TAMIL_NADU_FEATURED_COLLEGES = [
  ...colleges.filter(college => college.slug === avinashilingamSlug),
  ...colleges.filter(college => college.slug !== avinashilingamSlug).slice(0, 9)
];
