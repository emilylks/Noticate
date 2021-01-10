import React from 'react';
import Logo from '../../assets/LandingBooks.png';
import { ReactComponent as LeftBlob } from '../../assets/LeftBlob.svg';
import { ReactComponent as BottomBlob } from '../../assets/BottomBlob.svg';
import { ReactComponent as TopBlob } from '../../assets/TopBlob.svg';
import { ReactComponent as LandingBooks } from '../../assets/LandingBooks.svg';
import { GoogleLogin } from 'react-google-login';
import './index.css';

function Landing() {

  function loginSuccess(res) {
    console.log("Login successful");
    console.log(res);
    var data = { Id: res.profileObj.email, friends: [], files: [] };
    fetch("http://ec2-18-189-16-11.us-east-2.compute.amazonaws.com:9000/users", {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(() => {
      window.location.href = "./feed";
    });
  }

  function loginFailure(res) {
    console.log("Login Failed");
    console.log(res);
  }

  return (
    <div>
      <LeftBlob style={{ position: 'absolute', zIndex: -1, marginLeft: '-10%' }}/>
      <BottomBlob style={{ position: 'absolute', left: '50%', marginTop: '38.5%', marginBottom: 0, zIndex: -1 }}/>
      <TopBlob style={{ position: 'absolute', marginTop: '-15%', right: '0%', zIndex: -1 }} />

      <div className="content" >
        <LandingBooks />
        <h1 className="noticate-text">Noticate</h1>
        <GoogleLogin
          clientId='1072009986202-bj557860kagjt30ti31vcfgf8heeoprg.apps.googleusercontent.com'
          buttonText="Log In"
          onSuccess={loginSuccess}
          onFailure={loginFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      </div>
    </div>
  );
}

export default Landing;
