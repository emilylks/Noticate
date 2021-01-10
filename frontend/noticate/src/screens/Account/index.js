import React, {useEffect} from 'react';
import './index.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { ReactComponent as AccountIcon } from '../../assets/AccountIcon.svg';
import { ReactComponent as HomeIcon } from '../../assets/HomeIcon.svg';
import { ReactComponent as UploadIcon } from '../../assets/UploadIcon.svg';
import { ReactComponent as SearchIcon } from '../../assets/SearchIcon.svg';

function Account() {

  var dumdum = [{author: "You", date: Date.now(), title: "i love verilog"},
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
      var title = dumdum[i].title;
      var author = dumdum[i].author;
      var date = dumdum[i].date;
      if (i % 3 == 0) {
        var div1 = document.createElement('div');
        div1.classList.add("noteLeft");
        rowSoFar.push(div1);
      } else if (i % 3 == 1) {
        var div1 = document.createElement('div');
        div1.classList.add("noteMiddle");
        rowSoFar.push(div1);
      } else if (i % 3 == 2) {
        var div1 = document.createElement('div');
        div1.classList.add("noteRight");
        rowSoFar.push(div1);
        addRow(rowSoFar, feed);
        rowSoFar = [];
      }
    }

    if (rowSoFar.length > 0)
      addRow(rowSoFar, feed);
  }

  function uploadMenu() {
    return (
      <Popup trigger={<UploadIcon />} position="center">
        <p>Popup content here !!</p>
      </Popup>
    );
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
        <p className="filter">FRIENDS</p>
    </div>
    <ul id="all-notes">
        {/* starts empty, filled dynamically */}
    </ul>
    <Popup trigger={<UploadIcon />} position="center">
      <div>
        <p>Popup content here !!</p>
      </div>
    </Popup>
  </div>

  );
}

export default Account;
