import React, {useEffect} from 'react';
import './index.css';
import { ReactComponent as AccountIcon } from '../../assets/AccountIcon.svg';
import { ReactComponent as HomeIcon } from '../../assets/HomeIcon.svg';
import { ReactComponent as UploadIcon } from '../../assets/UploadIcon.svg';
import { ReactComponent as SearchIcon } from '../../assets/SearchIcon.svg';

function Account() {

  var dumdum = [{author: "You", date: new Date(2021, 0, 9), title: "i love verilog"},
                {author: "You", date: new Date(2021, 0, 8), title: "i love javascript"},
                {author: "You", date: new Date(2021, 0, 7), title: "i love python"},
                {author: "You", date: new Date(2021, 0, 6), title: "i love backend"}];

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

  function addRow(arr, root) {
    var list = document.createElement('li');
    list.classList.add("noteEntry");

    arr.forEach(elem => {
      list.appendChild(elem);
    });
    root.appendChild(list);
  }

  function formatYourNotes() {
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
      date.textContent +=  dumdum[i].date; 

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

  const routeBack = () => {
    window.location.href = "./feed"
  }

  return (
    <div id="content">
    <div className="navigation-row">
      <form className="search-container">
        <input type="text" name="Search" className="search-input"/>
        <SearchIcon style={{width: 20, height: 20}} />
      </form>
      <HomeIcon className="nav-icon" onClick={() => window.location.href = './feed'}/>
      <UploadIcon className="nav-icon" />
      <AccountIcon className="nav-icon" />
    </div>
    <div className = 'accOpptions'>
        <p className="filter">YOUR NOTES</p>
        <p className="filter">FOLLOWING</p>
        <p className="filter">FOLLOWERS</p>
    </div>
    <ul id="all-notes">
        {/* starts empty, filled dynamically */}
      </ul>
  </div>

  );
}

export default Account;
