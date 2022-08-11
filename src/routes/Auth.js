import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbase";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  const onSocial = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "Google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "Git") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
    await authService.signInWithPopup(provider);
  }
  return (
    <div>
      <AuthForm />
      <div>
        <button name="Google" onClick={onSocial}>Continue with Google</button>
        <button name="Git" onClick={onSocial}>Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
