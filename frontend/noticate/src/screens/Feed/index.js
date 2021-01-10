import React, { useEffect } from 'react';
import './index.css';
import { ReactComponent as AccountIcon } from '../../assets/AccountIcon.svg';
import { ReactComponent as HomeIcon } from '../../assets/HomeIcon.svg';
import { ReactComponent as UploadIcon } from '../../assets/UploadIcon.svg';
import { ReactComponent as SearchIcon } from '../../assets/SearchIcon.svg';


function Feed() {
  var dummies = [{author: "Veronica", date: Date.now(), school: "The Unversity of British Columbia",
                  title: "i love verilog", tags: ["#math", "#school", "#study"]},
                 {author: "Emily", date: new Date(2021, 0, 8), school: "The Unversity of British Columbia",
                  title: "i love javascript", tags: ["#math", "#school", "#engineer"]},
                 {author: "Francis", date: Date.now(2021, 0, 7), school: "Simon Fraser University",
                  title: "i love python", tags: ["#cpen", "#school", "#study"]},
                 {author: "Brielle", date: Date.now(2021, 0, 6), school: "The Unversity of British Columbia",
                  title: "i love backend", tags: ["#math", "#code", "#study"]}];

  useEffect(() => {
    fetch("http://ec2-18-222-146-206.us-east-2.compute.amazonaws.com:9000/thelist", {
      method: 'GET'
    })
    .then(res => {
      console.log(res);
      console.log(typeof res);
    });

    formatNotes();
  }, []);

  const routeChange = () => {
   window.location.href = "./account"
  }

  function formatNotes() {
    var feed = document.getElementById("notes-feed");
    dummies.forEach(elem => {
      var li = document.createElement('li');
      var div1 = document.createElement('div');
      var div2 = document.createElement('div');
      li.classList.add("note-entry");
      div1.classList.add("note-left");
      div2.classList.add("note-right");

      li.appendChild(div1);
      li.appendChild(div2);
      feed.appendChild(li);
    });
  }

  return (
    <div id="content">
      <div className="navigation-row">
        <form className="search-container">
          <input type="text" name="Search" className="search-input"/>
          <SearchIcon style={{width: 20, height: 20}} />
        </form>
        <HomeIcon className="nav-icon" />
        <UploadIcon className="nav-icon" />
        <AccountIcon className="nav-icon" />
      </div>
      <div className="filter-options">
        <p className="filter">ALL</p>
        <p className="filter">FOLLOWING</p>
        <p className="filter">TAGS</p>
      </div>
      <ul id="notes-feed">
        {/* starts empty, filled dynamically */}
      </ul>
      <button onClick={routeChange}> Redirect </button>
    </div>
  );
}

export default Feed;
