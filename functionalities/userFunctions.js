import { ref, get, update } from "firebase/database";
import { database } from "../library/firebase"

export async function checkIfUserIsAfollower(username, theFollowerToCheck){
    const dbRef = ref(database, 'users/' + username );
    const userSnapshot = await get(dbRef);
    if (userSnapshot.exists()) {
        const userObject = userSnapshot.val();
        const followerIndex = userObject.followers.indexOf(theFollowerToCheck);
        if (followerIndex > -1) {
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

/*
const user = {
    uid: "",
    username: "",
    full_name: "",
    profile_image: "",
    following: [],
    followers: [],
    saved_posts: [],

    // stats
    top_posted_rapper: "",
    post_numbers: "",
    total_upvotes: "",
    total_downvotes:""
}
*/