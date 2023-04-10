import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, database, storage } from "../library/firebase"
import { toast } from "react-hot-toast"
import { createUserObject } from "../functionalities/userFunctions"
import { ref, set, get, child, onValue } from "firebase/database";
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

const Context = createContext();

export const StateContext = ({ children }) => {

  const [ currentUser, setCurrentUser ] = useState(undefined);
  const [ Posts, setPosts ] = useState([])
  const [ currentRapAudio, setCurrentRapAudio ]  = useState(null)
  const [ currentBeatAudio, setCurrentBeatAudio ]  = useState(null)
  const router = useRouter()

  useEffect(() => {
    getPosts()
  },[]);

  // AUTH FUNCTIONALTIES
  async function register(name, email, password, username) {
    let WillLogIn = false;
    let userCreds;
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      userCreds = userCredential;
      WillLogIn = true;
    })
    .catch((error) => {
      console.log(error)
      toast.error(`Account Creation Failed`)
    });

    await updateProfile(auth.currentUser, {displayName: username})
    .then(() => {
      console.log("UPDATED!")
    }).catch((error) => {
      // console.log(error)
    });

    await storeUser(email, username, name)

    if(WillLogIn){
      await login(email, password)
    }
  }

  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
    .then( async (userCredential) => {
      setCurrentUser(userCredential.user);
      router.push("/")
      // console.log("STATE CONTEXT", profileInfo)
    })
    .catch((error) => {
      toast.error(`Invalid Credentials`)
      console.log(error)
    });
  
  }

  async function storeUser(email, username, fullName){
    const userObject = createUserObject(email, username, fullName)
    set(ref(database, 'users/' + username), userObject);
  }

  async function getUserProfileInfo(username){
    const dbRef = ref(database);
    const response = await get(child(dbRef, `users/${username}`)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } 
    }).catch((error) => {
      console.error(error);
    });
    return response
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
        console.log(final)
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

  // AUDIO FUNCTIONS
  function stopCurrentRap(){
    if(currentRapAudio != null && currentBeatAudio != null){
      currentRapAudio.pause()
      currentBeatAudio.pause()
    }
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
      getPosts,
      getUserProfileInfo,

      // Audio functionalities
      stopCurrentRap,
      setCurrentBeatAudio,
      setCurrentRapAudio

    }}
    >
      {children}
    </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);