import React, { useEffect, useState } from 'react';
import './index.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { ReactComponent as AccountIcon } from '../../assets/AccountIcon.svg';
import { ReactComponent as HomeIcon } from '../../assets/HomeIcon.svg';
import { ReactComponent as UploadIcon } from '../../assets/UploadIcon.svg';
import { ReactComponent as SearchIcon } from '../../assets/SearchIcon.svg';
import { ReactComponent as AddFileIcon } from '../../assets/AddFileIcon.svg';

function Account() {

  const [open, setOpen] = useState(false);
  var dumdum = [{author: "You", date: new Date(2021, 0 ,10), title: "i love verilog"},
                {author: "You", date: new Date(2021, 0, 8), title: "i love javascript"},
                {author: "You", date: new Date(2021, 0, 7), title: "i love python"},
                {author: "You", date: new Date(2021, 0, 6), title: "i love backend"}];
  
  const monthArray = ["January", "February", "March", "April", "May",
  "June", "July", "August", "September", "October",
  "November", "December"];
  var friendList = ["Emily", "Veronica", "Francis", "Brielle", "Bob", "Joe"];
  var tagsList = ["math", "science", "history", "programming","calculus", "chemistry", "english", "spanish","coop", "midterms", "C/C++", "java"];

  useEffect(() => {
    fetch("http://ec2-18-222-146-206.us-east-2.compute.amazonaws.com:9000/thelist", {
    method: 'GET'
    })
    .then(res => {
      console.log(res);
      console.log(typeof res);
    });

    formatYourNotes();
  }, []);

  function extractDate(date) {
    var year = date.getFullYear();
    var month = monthArray[date.getMonth()];
    var day = date.getDate();

    return month + " " + day + ", " + year;
  }

  function emptyDOM(elem) {
  	while (elem.firstChild) elem.removeChild(elem.firstChild);
  }

  function addRow(arr, root) {
    var list = document.createElement('li');
    list.classList.add("noteEntry");
  
    arr.forEach(elem => {
      list.appendChild(elem);
    });
    root.appendChild(list);
  }

  function formatYourNotes() {
    emptyDOM(document.getElementById("all-notes"));
    var feed = document.getElementById("all-notes");
    var list = document.createElement('li');
    var rowSoFar = [];
    list.classList.add("noteEntry");

    for (var i = 0; i < dumdum.length; i++) {
      var title = document.createElement('p');
      title.textContent += dumdum[i].title;
      var author = document.createElement('p');
      author.textContent += "By: " + dumdum[i].author;
      var date = document.createElement('p');
      date.textContent += extractDate(dumdum[i].date);

      if (i % 3 == 0) {
        var div1 = document.createElement('div');
        div1.classList.add("noteLeft");
        title.classList.add("noteTitleLeft");
        author.classList.add("noteAuthorLeft");
        date.classList.add("noteDateLeft");
        div1.appendChild(title);
        div1.appendChild(author);
        div1.appendChild(date);
        rowSoFar.push(div1);
      } else if (i % 3 == 1) {
        var div1 = document.createElement('div');
        div1.classList.add("noteMiddle");
        title.classList.add("noteTitleMiddle");
        author.classList.add("noteAuthorMiddle");
        date.classList.add("noteDateMiddle");
        div1.appendChild(title);
        div1.appendChild(author);
        div1.appendChild(date);
        rowSoFar.push(div1);
      } else if (i % 3 == 2) {
        var div1 = document.createElement('div');
        div1.classList.add("noteRight");
        title.classList.add("noteTitleRight");
        author.classList.add("noteAuthorRight");
        date.classList.add("noteDateRight");
        div1.appendChild(title);
        div1.appendChild(author);
        div1.appendChild(date);
        rowSoFar.push(div1);
        addRow(rowSoFar, feed);
        rowSoFar = [];
      }
    }
    if (rowSoFar.length > 0)
      addRow(rowSoFar, feed);
  }
  
  function addRow2(arr, root) {
    var list = document.createElement('li');
    list.classList.add("friendEntry");
  
    arr.forEach(elem => {
      list.appendChild(elem);
    });
    root.appendChild(list);
  }
 
 function formatFollowing() {
    emptyDOM(document.getElementById("all-notes"));
    var feed2 = document.getElementById("all-notes");
    var list2 = document.createElement('li');
    var rowSoFar2 = [];
    list2.classList.add("friendEntry");

    for (var i = 0; i < friendList.length; i++) {
      var title2 = document.createElement('p');
      title2.textContent += friendList[i];

      if (i % 3 == 0) {
        var div2 = document.createElement('div');
        div2.classList.add("noteLeft");
        
       /*var pic = document.createElement('img');
        pic.src = '../../assets/SearcIcon.svg';
        pic.setAttribute("height", "768");
        pic.setAttribute("width", "768");
        pic.setAttribute("alt", "pfp");
        pic.classList.add("picStyle");
        div2.appendChild(pic); */
        
        title2.classList.add("noteTitleLeft");
        div2.appendChild(title2);
        rowSoFar2.push(div2);
      } else if (i % 3 == 1) {
        var div2 = document.createElement('div');
        div2.classList.add("noteMiddle");
        title2.classList.add("noteTitleMiddle");
        div2.appendChild(title2);
        rowSoFar2.push(div2);
      } else if (i % 3 == 2) {
        var div2 = document.createElement('div');
        div2.classList.add("noteRight");
        title2.classList.add("noteTitleRight");
        div2.appendChild(title2);
        rowSoFar2.push(div2);
        addRow2(rowSoFar2, feed2);
        rowSoFar2 = [];
      }
      if (rowSoFar2.length > 0)
      addRow2(rowSoFar2, feed2);
    }
  }

  function formatYourTags() {
    emptyDOM(document.getElementById("all-notes"));
    var feed3 = document.getElementById("all-notes");
    var list3 = document.createElement('li');

    tagsList.forEach(elem => {
      var tdiv = document.createElement('div');
      var tag = document.createElement('p');
      tag.classList.add("tagText");
      tdiv.classList.add("tagElement");
      tag.textContent += "#"+elem;
      tdiv.appendChild(tag);
      list3.appendChild(tdiv);
      feed3.appendChild(list3);
    }); 
  }

  function addFriends() {
    emptyDOM(document.getElementById("all-notes"));
    var feed = document.getElementById("all-notes");
    var div = document.createElement('div');
    var form = document.createElement('form');
    var searchInput = document.createElement('input');
    var submit = document.createElement('button');

    div.classList.add("search-friends");
    searchInput.classList.add("find-friendsbar");
    searchInput.type = "text";
    searchInput.placeholder = "Search by Email...";
    submit.classList.add("search-button");
    submit.onClick = findFriends(searchInput.textContent);
    submit.textContent += "Submit";

    form.appendChild(searchInput);
    div.appendChild(form);
    div.appendChild(submit);
    feed.appendChild(div);
  }

  function findFriends(id) {
    // fetch request here
  }

  function submitForm() {
    console.log("inside submit function");
    var file = document.getElementById('avatar');
    var id = document.getElementById('userId').value;
    var tags = document.getElementById('tags').value;

    console.log(tags);
    fetch("http://ec2-18-189-16-11.us-east-2.compute.amazonaws.com:9000/upload", {
      method: 'POST',
      enctype: 'multipart/form-data'
    });
  }

  return (
    <div id="content">
    <div className="navigation-row">
      <form className="search-container">
        <input type="text" name="Search" className="search-input"/>
        <SearchIcon style={{width: 20, height: 20}} />
      </form>
      <HomeIcon className="nav-icon" onClick={() => window.location.href = './feed'}/>
      <UploadIcon className="nav-icon" onClick={() => setOpen(o => !o)}/>
      <AccountIcon className="nav-icon" />
    </div>
    <div className = 'accOpptions'>
        <p className="filter" onClick={() => formatYourNotes()}>YOUR NOTES</p>
        <p className="filter" onClick={() => formatFollowing()}>FRIENDS</p>
        <p className="filter" onClick={() => formatYourTags()}>MY TAGS</p>
        <p className="filter" onClick={() => addFriends()}>ADD FRIENDS</p>
    </div>
    <ul id="all-notes">
        {/* starts empty, filled dynamically */}
    </ul>
    <Popup open={open}
           position="center center"
           arrow={false}
           on='click'
           onCloseDocumentClick>
      <div className="popup-contents">
        <form>
          <input type="text" placeholder="Name" className="name-upload"/>
        </form>
        <div className="popup-rowcontent">
          <AddFileIcon style={{color: '#3968CA'}}/>
          <form action="http://ec2-18-189-16-11.us-east-2.compute.amazonaws.com:9000/upload" method="POST" enctype="multipart/form-data">
            <input type="file" name="avatar"></input>
            <input type="hidden" name="userId" value="testUserId1" />
            <input type="hidden" name="tags" value={["#math", "#cpen", "#work"]} />
            <button>Submit</button>
          </form>
          <div className="popup-inputs">
          </div>
        </div>
      </div>
    </Popup>
  </div>
  );
}

export default Account;
