import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, database, googleProvider, facebookProvider } from "../library/firebase"
import { toast } from "react-hot-toast"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  signOut, sendPasswordResetEmail, updateProfile, GoogleAuthProvider , 
  FacebookAuthProvider , signInWithPopup } from "firebase/auth";

const Context = createContext();

export const StateContext = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(undefined);

  // AUTH FUNCTIONALTIES
  async function register(name, email, password) {
    let WillLogIn = false;
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setCurrentUser(userCredential.user) 
      WillLogIn = true;
      set(ref(database, 'users/' + currentUser.uid + "/user-details/" + `type`), "unpaid");
    })
    .catch((error) => {
      toast.error(`Account Creation Failed`)
    });

    await updateProfile(auth.currentUser, {displayName: name})
    .then(() => {
      // console.log("UPDATED!")
    }).catch((error) => {
      // console.log(error)
    });
    if(WillLogIn){
      await login(email, password)
    }
  }

  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.localStorage.setItem("userToken", JSON.stringify(userCredential.user))
      setCurrentUser(JSON.parse(window.localStorage.getItem("userToken")));
      window.localStorage.setItem("isLoggedIn", true)
      RouteAfterAuth()
    })
    .catch((error) => {
      toast.error(`Invalid Credentials`)
      return(error.message)
    });
  
  }


return(
    <Context.Provider
    value={{
      
      // Auth functionalties
      currentUser, 
      setCurrentUser,
      register,
      login

    }}
    >
      {children}
    </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);