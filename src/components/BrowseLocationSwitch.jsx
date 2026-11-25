import React from 'react';
import {NavLink} from 'react-router-dom';
export default function BrowseLocationSwitch(){
 return <nav className="browse-location-switch" aria-label="College directory location">
  <NavLink to="/colleges" end className={({isActive})=>isActive?'is-selected':''}>Tamil Nadu Colleges</NavLink>
  <NavLink to="/bangalore-colleges" className={({isActive})=>isActive?'is-selected':''}>Bangalore Colleges</NavLink>
 </nav>
}
