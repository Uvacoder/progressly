import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function AuthGate() {
  const isSignIn = true;
  return <div>{isSignIn ? <SignIn /> : <SignUp />}</div>;
}
