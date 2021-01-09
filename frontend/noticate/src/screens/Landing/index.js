import React from 'react';
import { GoogleLogin } from 'react-google-login';

function Landing() {
  function loginSuccess(res) {
    console.log("Login successful");
    window.location.href = "./feed";
  }

  function loginFailure(res) {
    console.log("Login Failed");
    console.log(res);
  }

  return (
    <div>
      <p>Landing Page</p>
      <GoogleLogin
        clientId='1072009986202-bj557860kagjt30ti31vcfgf8heeoprg.apps.googleusercontent.com'
        buttonText="Log In"
        onSuccess={loginSuccess}
        onFailure={loginFailure}
        isSignedIn={true}
      />
    </div>
  );
}

export default Landing;
