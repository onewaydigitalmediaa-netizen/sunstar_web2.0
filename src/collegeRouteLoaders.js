export const loadTamilNaduTopColleges = () => import('./pages/TamilNaduTopColleges.jsx');
export const loadBangaloreTopColleges = () => import('./pages/BangaloreTopColleges.jsx');

export function preloadCollegePage(loader) {
 loader().catch(error => {
  console.error('Failed to preload college destination.', error);
 });
}
