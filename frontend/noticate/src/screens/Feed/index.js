import React, { useEffect } from 'react';
import './index.css';
import { ReactComponent as AccountIcon } from '../../assets/AccountIcon.svg';
import { ReactComponent as HomeIcon } from '../../assets/HomeIcon.svg';
import { ReactComponent as UploadIcon } from '../../assets/UploadIcon.svg';

function Feed() {

  useEffect(() => {
    fetch('ec2-18-222-146-206.us-east-2.compute.amazonaws.com/thelist', {
      method: 'GET'
    })
    .then((response) => console.log(response))
  }, []);

  return (
    <div id="content">
      <div className="navigation-row">
        <AccountIcon className="nav-icon" />
        <HomeIcon className="nav-icon" />
        <UploadIcon className="nav-icon" />
      </div>
      <div className="filter-options">
        <p className="filter">ALL</p>
        <p className="filter">FOLLOWING</p>
        <p className="filter">TAGS</p>
      </div>
    </div>
  );
}

export default Feed;
