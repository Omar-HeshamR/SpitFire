import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, database, googleProvider } from "../library/firebase"
import { toast } from "react-hot-toast"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  updateProfile, GoogleAuthProvider , signInWithPopup } from "firebase/auth";

const Context = createContext();

export const StateContext = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(undefined);

  // AUTH FUNCTIONALTIES
  async function register(name, email, password) {
    let WillLogIn = false;
    let userCreds;
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      WillLogIn = true;
    })
    .catch((error) => {
      console.log(error)
      toast.error(`Account Creation Failed`)
    });

    await updateProfile(auth.currentUser, {displayName: name})
    .then(() => {
      console.log("UPDATED!")
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
      setCurrentUser(userCredential.user);
    })
    .catch((error) => {
      toast.error(`Invalid Credentials`)
      console.log(error)
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