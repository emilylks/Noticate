import React from 'react';
import './index.css';
import { ReactComponent as AccountIcon } from '../../assets/AccountIcon.svg';
import { ReactComponent as HomeIcon } from '../../assets/HomeIcon.svg';
import { ReactComponent as UploadIcon } from '../../assets/UploadIcon.svg';
import SearchBarr from '../../assets/SearchBar.png';

function Account() {  

  const routeBack = () => {
    window.location.href = "./feed"
   } 

  return (
    <div id="content">
    <div className="navigation-row">
      <img src={SearchBarr} style = {{height: 30}} /> 
      <HomeIcon className="nav-icon" />
      <UploadIcon className="nav-icon" />
      <AccountIcon className="nav-icon" />
    </div>
    <div className = 'accOpptions'>
        <p className="filter">YOUR NOTES</p>
        <p className="filter">FOLLOWING</p>
        <p className="filter">FOLLERS</p>
    </div>
    <button onClick={routeBack}> Redirect </button>
  </div>
    
    
     

     
  
  );
}

export default Account;
