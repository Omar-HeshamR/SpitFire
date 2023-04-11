import { ref, get, update, child } from "firebase/database";
import { database } from "../library/firebase"

// USER OBJECT

export function createUserObject(_email, _username, _full_name){
    const userObject = {
        email: `${_email}`,
        username: `${_username}`,
        full_name: `${_full_name}`,
        profile_image: "",
        following: [""],
        followers: [""],
        saved_posts: [""],
    
        // stats
        top_posted_rapper: "None",
        post_numbers: 0,
        total_upvotes: 0,
        total_downvotes: 0
    }
    return userObject;
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

// FOLLOW FUNCTIONALITIES

export async function getFollowers(username){
    const dbRef = ref(database, 'users/' + username );
    const userSnapshot = await get(dbRef);
    const followersObjectsArray = []
    if (userSnapshot.exists()) {
        const userObject = userSnapshot.val();
        for(let i = 1; i < userObject.followers.length; i++){
            const aFollowerObject = await getUserProfileInfo(userObject.followers[i])
            followersObjectsArray.push(aFollowerObject)
        }
   }
   return followersObjectsArray
}

export async function getFollowings(username){
    const dbRef = ref(database, 'users/' + username );
    const userSnapshot = await get(dbRef);
    const followingsObjectsArray = []
    if (userSnapshot.exists()) {
        const userObject = userSnapshot.val();
        for(let i = 1; i < userObject.following.length; i++){
            const aFollowingObject = await getUserProfileInfo(userObject.following[i])
            followingsObjectsArray.push(aFollowingObject)
        }
   }
   return followingsObjectsArray
}


export async function checkIfUserIsAfollower(username, theFollowerToCheck){
    const dbRef = ref(database, 'users/' + username );
    const userSnapshot = await get(dbRef);
    if (userSnapshot.exists()) {
        const userObject = userSnapshot.val();
        const followerIndex = userObject.following.indexOf(theFollowerToCheck);
        if (followerIndex <= -1) {
            return false
        }
        return true
    }
}

export async function removeFollower(username, followerToBeRemoved) {
    const dbRef = ref(database, 'users/' + username );
    const userSnapshot = await get(dbRef);

    if (userSnapshot.exists()) {
        const userObject = userSnapshot.val();
        const followerIndex = userObject.followers.indexOf(followerToBeRemoved);
        if (followerIndex > -1) {
            userObject.followers.splice(followerIndex, 1);
            update(dbRef, userObject);
        }
    }
}

export async function addFollower(username, newFollower) {
    const dbRef = ref(database, 'users/' + username );
    const userSnapshot = await get(dbRef);

    if (userSnapshot.exists()) {
        const userObject = userSnapshot.val();
        userObject.followers.push(newFollower);
        update(dbRef, userObject);
      }
}

export async function removeFollowing(username, followerToBeRemoved) {
    const dbRef = ref(database, 'users/' + username );
    const userSnapshot = await get(dbRef);

    if (userSnapshot.exists()) {
        const userObject = userSnapshot.val();
        const followerIndex = userObject.following.indexOf(followerToBeRemoved);
        if (followerIndex > -1) {
            userObject.following.splice(followerIndex, 1);
            update(dbRef, userObject);
        }
    }
}

export async function addFollowing(username, newFollower) {
    const dbRef = ref(database, 'users/' + username );
    const userSnapshot = await get(dbRef);

    if (userSnapshot.exists()) {
        const userObject = userSnapshot.val();
        userObject.following.push(newFollower);
        update(dbRef, userObject);
      }
}

/*
    Follow/Follower Object:
    {
        username: ``,
        profile_image: ``,
    }
*/ 