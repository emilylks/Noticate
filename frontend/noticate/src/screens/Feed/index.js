import React from 'react';
import './index.css';

function Feed() {  
  
 const routeChange = () => {
  window.location.href = "./account"
 }

  return (
    <div>
      <p>Feed Page</p>
      <button onClick={routeChange}> Redirect </button>
    </div>
  );
}

export default Feed;
