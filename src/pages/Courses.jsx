import React from 'react';
import PageHeading from '../components/PageHeading.jsx';
import CourseExplorer from '../components/CourseExplorer.jsx';

export default function Courses() {
  return (
    <>
      <PageHeading
        eyebrow="FIND WHAT FITS YOU"
        title="Explore study streams."
        crumb="Courses"
        description="Your interests are a great place to start. Browse the streams represented in SUN STAR's college directory."
      />
      <CourseExplorer />
    </>
  );
}
