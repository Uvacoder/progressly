import { useEffect, useState, useContext, createContext } from "react";
import { firebase } from "./initFirebase";

const AuthContext = createContext({
  user: null,
  loading: true,
  signin: () => {},
  signout: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  };
  useEffect(() => {
    const cancelAuthListener = firebase.auth().onIdTokenChanged((u) => {
      setUser(u);
      setLoading(false);
    });

    return () => cancelAuthListener();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
