import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, database, storage } from "../library/firebase"
import { toast } from "react-hot-toast"
import { ref, set, get, child, onValue } from "firebase/database";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

const Context = createContext();

export const StateContext = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(undefined);
  const [ Posts, setPosts ] = useState([])

  useEffect(() => {
    getPosts()
  },[]);

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

  // MAKE_POST
  async function createPost(postID, postObject){
    set(ref(database, 'posts/' + postID), postObject);
  }

  // GET POSTS
  async function getPosts(){
    const dbRef = ref(database);
    const response = await get(child(dbRef, `posts`)).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        const final = sortPosts(snapshot.val());
        setPosts(final)
        return final;
      } else {
        return undefined
        // console.log("No data available");
      }
    }).catch((error) => {
      // console.error(error);
    });
    return response
  }

  function sortPosts(obj) {
    const arr = Object.values(obj);
    arr.sort((a, b) => b.upvotes - a.upvotes);
    console.log("FINAL ARRAY", arr)
    return arr;
  }
  

return(
    <Context.Provider
    value={{
      
      // Auth functionalties
      currentUser, 
      setCurrentUser,
      register,
      login,
      createPost, 
      Posts,

    }}
    >
      {children}
    </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);