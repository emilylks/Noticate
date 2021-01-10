import React, {useEffect} from 'react';
import './index.css';
import { ReactComponent as AccountIcon } from '../../assets/AccountIcon.svg';
import { ReactComponent as HomeIcon } from '../../assets/HomeIcon.svg';
import { ReactComponent as UploadIcon } from '../../assets/UploadIcon.svg';
import SearchBarr from '../../assets/SearchBar.png';

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

  function formatYourNotes() {
    var accfeed = document.getElementById("all-notes");
    var list = document.createElement('li');
    list.classList.add("noteEntry");
    for(var i = 0; i< dumdum.length; i++) {
      var title = dumdum[i].title;
      var author = dumdum[i].author;
      var date = dumdum[i].date;
      if (i%3 == 0) {
        var div1 = document.createElement('div');
        div1.classList.add("noteLeft");
        list.appendChild(div1);
      }
      else if (i%3 == 1) {
        var div2 = document.createElement('div');
        div2.classList.add("noteMiddle");
        list.appendChild(div2);
      }
      else if (i%3 == 2) {
        var div3 = document.createElement('div');
        div3.classList.add("noteRight");
        list.appendChild(div3);
        accfeed.appendChild(list);
      }
      
    }
  }
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
    <ul id="all-notes">
        {/* starts empty, filled dynamically */}
      </ul>
    <button onClick={routeBack}> Redirect </button>
  </div>
    
    
     

     
  
  );
}

export default Account;
