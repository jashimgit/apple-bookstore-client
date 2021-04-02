/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */

import firebase from "firebase/app";
import "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { firebaseConfig } from "./firebaseConfig";

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const authContext = createContext();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth()

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.

export const useAuth = () => useContext(authContext);

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signInWithPopup = () => {
      return firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(response => {
        setUser(response.user);
        return response.user;
      })
    }; 

    const signout = () => {
        return firebase
          .auth()
          .signOut()
          .then(() => {
            setUser(false);
            <Redirect to="/" />
          });
      };

    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(false);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Return the user object and auth methods
    return {
        user,
        signInWithPopup,signout
    };
}
