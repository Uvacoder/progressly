import { useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { firebase } from "../src/initFirebase";
const firebaseAuthConfig = {
  signInFlow: "popup",
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true,
    },
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    },
  ],
  signInSuccessUrl: "/my-profile",
};

const FirebaseAuth = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div>
      {show && (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </div>
  );
};

export default FirebaseAuth;
