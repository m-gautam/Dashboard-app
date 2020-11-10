import React from "react";
import { signInWithGoogle } from "./components/firebase";
import SignInImg from "./assets/signIn.png";
import "./App.css";
import logo from "./assets/logo.svg";

const SignIn = () => {
  return (
    <div className="sign-in">
      <img src={logo} className="App-logo" alt="logo" />
      <button className="sign-in-btn">
        <img src={SignInImg} alt="sign in" onClick={() => signInWithGoogle()} />
      </button>
    </div>
  );
};

export default SignIn;
