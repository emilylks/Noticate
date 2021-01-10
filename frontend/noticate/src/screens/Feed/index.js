import React, { useEffect } from 'react';
import './index.css';
import { ReactComponent as AccountIcon } from '../../assets/AccountIcon.svg';
import { ReactComponent as HomeIcon } from '../../assets/HomeIcon.svg';
import { ReactComponent as UploadIcon } from '../../assets/UploadIcon.svg';
import { ReactComponent as SearchIcon } from '../../assets/SearchIcon.svg';
import { ReactComponent as FollowIcon } from '../../assets/FollowIcon.svg';


function Feed() {
  var dummies = [{author: "Veronica", date: new Date(2021, 0, 9), school: "The Unversity of British Columbia",
                  title: "i love verilog", tags: ["#math", "#school", "#study"]},
                 {author: "Emily", date: new Date(2021, 0, 8), school: "The Unversity of British Columbia",
                  title: "i love javascript", tags: ["#math", "#school", "#engineer"]},
                 {author: "Francis", date: new Date(2021, 0, 7), school: "Simon Fraser University",
                  title: "i love python", tags: ["#cpen", "#school", "#study"]},
                 {author: "Brielle", date: new Date(2021, 0, 6), school: "The Unversity of British Columbia",
                  title: "i love backend", tags: ["#math", "#code", "#study"]}];
  var tags = ["#study", "#code"];
  var following = ["Emily", "Veronica"];
  const monthArray = ["January", "February", "March", "April", "May",
                      "June", "July", "August", "September", "October",
                      "November", "December"];

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

  function emptyDOM(elem) {
  	while (elem.firstChild) elem.removeChild(elem.firstChild);
  }

  // Creates a DOM element from the given HTML string
  function createDOM(htmlString) {
  	let template = document.createElement('template');
  	template.innerHTML = htmlString.trim();
  	return template.content.firstChild;
  }

  function extractDate(date) {
    var year = date.getFullYear();
    var month = monthArray[date.getMonth()];
    var day = date.getDate();

    return month + " " + day + ", " + year;
  }

  function appendNode(node, elem) {
    var li = document.createElement('li');
    var div1 = document.createElement('div');
    var div2 = document.createElement('div');
    li.classList.add("note-entry");
    div1.classList.add("note-left");
    div2.classList.add("note-right");

    var title = document.createElement('p');
    var preview = document.createElement('div');
    title.textContent += elem.title;
    title.classList.add("note-title");
    preview.classList.add("note-preview");

    var author = document.createElement('p');
    var date = document.createElement('p');
    author.textContent += elem.author;
    date.textContent += extractDate(elem.date);



    div1.appendChild(title);
    div1.appendChild(preview);
    li.appendChild(div1);
    li.appendChild(div2);
    node.appendChild(li);
  }

  function formatNotes() {
    emptyDOM(document.getElementById("notes-feed"));
    var feed = document.getElementById("notes-feed");
    dummies.forEach(elem => {
      appendNode(feed, elem);
    });
  }

  function formatTags() {
    emptyDOM(document.getElementById("notes-feed"));

    var copy = [...dummies];
    var displayed = [];
    copy.forEach(elem => {
      if (tags.some(r => elem.tags.includes(r)))
        displayed.push(elem);
    });

    var feed = document.getElementById("notes-feed");
    displayed.forEach(elem => {
      appendNode(feed, elem);
    });
  }

  function formatFollowing() {
    emptyDOM(document.getElementById("notes-feed"));
    var feed = document.getElementById("notes-feed");
    dummies.forEach(elem => {
      if (following.includes(elem.author))
        appendNode(feed, elem);
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
        <AccountIcon className="nav-icon" onClick={() => window.location.href = "./account"}/>
      </div>
      <div className="filter-options">
        <p className="filter" onClick={() => formatNotes()}>ALL</p>
        <p className="filter" onClick={() => formatFollowing()}>FOLLOWING</p>
        <p className="filter" onClick={() => formatTags()}>TAGS</p>
      </div>
      <ul id="notes-feed">
        {/* starts empty, filled dynamically */}
      </ul>
      <button onClick={routeChange}> Redirect </button>
    </div>
  );
}

export default Feed;
