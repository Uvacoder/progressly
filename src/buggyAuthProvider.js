import { useEffect, useState, useContext, createContext } from "react";
import { firebase } from "./initFirebase";
import "firebase/auth";

const authContext = createContext();
// {
//   user: null,
//   loading: true,
//   logout: () => {},
// }

export function ProvideAuth({ children }) {
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const cancelAuthListener = firebase.auth().onIdTokenChanged((u) => {
  //     setUser(u);
  //     setLoading(false);
  //   });
  //   return () => cancelAuthListener();
  // }, []);
  const auth = useProvideAuth();
  console.log("PROVIDER RENDER");
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  console.log("user in USEPROVIDEAUTH:", user);

  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log("setting user to...", response.user);
        setUser(response.user);
        return response.user;
      });
  };

  const signup = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  };

  // const sendPasswordResetEmail = (email) => {
  //   return firebase
  //     .auth()
  //     .sendPasswordResetEmail(email)
  //     .then(() => {
  //       return true;
  //     });
  // };

  // const confirmPasswordReset = (password, code) => {
  // 		const resetCode = code || getFromQueryString('oobCode');

  // 		return firebase
  // 				.auth()
  // 				.confirmPasswordReset(resetCode, password)
  // 				.then(() => {
  // 						return true;
  // 				});
  // };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((u) => {
      console.log("u:", u);
      if (u) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    userId: user && user.uid,
    user,
    signin,
    signup,
    signout,
    // sendPasswordResetEmail,
    // confirmPasswordReset
  };
}

// export { AuthProvider, useAuth };
