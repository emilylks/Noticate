import React, { useEffect, useState } from 'react';
import './index.css';
import { ReactComponent as AccountIcon } from '../../assets/AccountIcon.svg';
import { ReactComponent as HomeIcon } from '../../assets/HomeIcon.svg';
import { ReactComponent as UploadIcon } from '../../assets/UploadIcon.svg';
import { ReactComponent as SearchIcon } from '../../assets/SearchIcon.svg';
import { ReactComponent as FollowingIcon } from '../../assets/FollowingIcon.svg';

/*
http://ec2-18-189-16-11.us-east-2.compute.amazonaws.com:9000/users
/friends
*/
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
    fetch(`http://ec2-18-189-16-11.us-east-2.compute.amazonaws.com:9000/thelist`, {
      mode: 'cors',
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("Response from server is", responseJson);
    })
    .catch((error) => {
         console.error(error);
    });

    formatNotes();
  }, []);

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

    var rightContent = document.createElement('div');
    var author = document.createElement('p');
    var date = document.createElement('p');
    var school = document.createElement('p');
    var following = createDOM(`<FollowingIcon />`);
    var tagTitle = document.createElement('p');
    var div3 = document.createElement('div');
    var tagContent = document.createElement('div');
    var tags = [];
    elem.tags.forEach(elem => {
      var tdiv = document.createElement('div');
      var tagText = document.createElement('p');
      tagText.classList.add("tag-text");
      tdiv.classList.add("tag-element");
      tagText.textContent += elem;

      tdiv.appendChild(tagText);
      tags.push(tdiv);
    });

    rightContent.classList.add("right-note-content");
    div3.classList.add("row-label");
    author.classList.add("note-author");
    date.classList.add("note-date");
    school.classList.add("note-school");
    tagTitle.classList.add("note-tagtitle");
    tagContent.classList.add("tag-content");

    author.textContent += elem.author;
    date.textContent += extractDate(elem.date);
    school.textContent += elem.school;
    tagTitle.textContent += "tags: "

    div3.appendChild(author);
    div3.appendChild(following);
    rightContent.appendChild(div3);
    rightContent.appendChild(date);
    rightContent.appendChild(school);
    rightContent.appendChild(tagTitle);

    tags.forEach(elem => {
      tagContent.appendChild(elem);
    })

    rightContent.appendChild(tagContent);
    div2.appendChild(rightContent);
    div1.appendChild(title);
    div1.appendChild(preview);

    li.appendChild(div1);
    li.appendChild(div2);
    node.appendChild(li);
  }

  function formatNotes() {
    var links = document.getElementsByClassName("filter");
    for (let i = 0; i < links.length; i++) {
      if (links[i].textContent == "ALL")
        links[i].style.color = "#48536A";
      else
        links[i].style.color = "#6B7A99";
    }

    emptyDOM(document.getElementById("notes-feed"));
    var feed = document.getElementById("notes-feed");
    dummies.forEach(elem => {
      appendNode(feed, elem);
    });
  }

  function formatTags() {
    emptyDOM(document.getElementById("notes-feed"));
    var links = document.getElementsByClassName("filter");
    for (let i = 0; i < links.length; i++) {
      if (links[i].textContent == "TAGS")
        links[i].style.color = "#48536A";
      else
        links[i].style.color = "#6B7A99";
    }

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
    var links = document.getElementsByClassName("filter");
    for (let i = 0; i < links.length; i++) {
      if (links[i].textContent == "FRIENDS")
        links[i].style.color = "#48536A";
      else
        links[i].style.color = "#6B7A99";
    }

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
        <p className="filter" onClick={() => formatFollowing()}>FRIENDS</p>
        <p className="filter" onClick={() => formatTags()}>TAGS</p>
      </div>
      <ul id="notes-feed">
        {/* starts empty, filled dynamically */}
      </ul>
    </div>
  );
}

export default Feed;
