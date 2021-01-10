import React, { useEffect } from 'react';
import './index.css';
import { ReactComponent as AccountIcon } from '../../assets/AccountIcon.svg';
import { ReactComponent as HomeIcon } from '../../assets/HomeIcon.svg';
import { ReactComponent as UploadIcon } from '../../assets/UploadIcon.svg';
import SearchBarr from '../../assets/SearchBar.png';


function Feed() {

 const routeChange = () => {
  window.location.href = "./account"
 } 

  useEffect(() => {
    fetch("http://ec2-18-222-146-206.us-east-2.compute.amazonaws.com:9000/thelist", {
      method: 'GET'
    })
    .then(res => {
      console.log(res);
      console.log(typeof res);
    });
  }, []);

  return (
    <div id="content">
      <div className="navigation-row">
        <img src={SearchBarr} style = {{height: 30}} /> 
        <HomeIcon className="nav-icon" />
        <UploadIcon className="nav-icon" />
        <AccountIcon className="nav-icon" />
      </div>
      <div className="filter-options">
        <p className="filter">ALL</p>
        <p className="filter">FOLLOWING</p>
        <p className="filter">TAGS</p>
      </div>
      <button onClick={routeChange}> Redirect </button>
    </div>
  );
}

export default Feed;
