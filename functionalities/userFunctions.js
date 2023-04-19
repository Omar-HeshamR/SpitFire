import { ref, get, update, child } from "firebase/database";
import { database } from "../library/firebase"

// USER OBJECT

export function createUserObject(_email, _username, _full_name){
    const userObject = {

        // Acount Identifiers
        email: `${_email}`,
        username: `${_username}`,
        full_name: `${_full_name}`,
        profile_image: "",

        /* The premium timestamp will determine for how long the user will have his/her premium subscribtion */
        premium_time_stamp: 0,

        // Account Logistics
        following: [""],
        followers: [""],
        saved_posts: [""],
        up_voted_posts: [""],
        down_voted_posts: [""],

        // Account Stats
        top_posted_rapper: "None",
        post_numbers: 0,
        total_upvotes: 0,
        total_downvotes: 0
    }
    return userObject;
}

// Premium Account Functionalities
export async function upgradeUserToPremium(username){
    const dbRef = ref(database, 'users/' + username );
    const userSnapshot = await get(dbRef);

    if (userSnapshot.exists()) {

        const userObject = userSnapshot.val();

        let currentTimeInSeconds = Math.floor(Date.now() / 1000);
        let OneMonthInSeconeds = 2629746;
        userObject.premium_time_stamp = currentTimeInSeconds + OneMonthInSeconeds;

        update(dbRef, userObject);

      }
}

export async function checkIfUserIsPremium(username){
    const dbRef = ref(database, 'users/' + username );
    const userSnapshot = await get(dbRef);

    if (userSnapshot.exists()) {

        const userObject = userSnapshot.val();
        let currentTimeInSeconds = Math.floor(Date.now() / 1000);
            if(userObject.premium_time_stamp > currentTimeInSeconds){
                return true
            }
        }
        
    return false;
}


export async function getUserProfileInfo(username){
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

// USER STATS
export async function addPostsNumber(username) {
    const dbRef = ref(database, 'users/' + username );
    const userSnapshot = await get(dbRef);

    if (userSnapshot.exists()) {
        const userObject = userSnapshot.val();
        userObject.post_numbers += 1;
        update(dbRef, userObject);
      }
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

// Post Interactions

export async function upVote(username, PostObject){

    // add post to upvoted post of a user
    const dbRef2 = ref(database, 'users/' + username );
    const userSnapshot2 = await get(dbRef2);
    if (userSnapshot2.exists()) {
        const userObject = userSnapshot2.val();
        // check if already upvoted
        for(let i = 1; i < userObject.up_voted_posts.length; i++){
            if(userObject.up_voted_posts[i] == PostObject.postId){
                console.log("Already Upvoted")
                return ;
            }
        }

        userObject.up_voted_posts.push(PostObject.postId);
        update(dbRef2, userObject);
      }

    // add 1 upvote to the post
    const postRef = ref(database, 'posts/' + PostObject.postId);
    const postSnapshot = await get(postRef);
    if (postSnapshot.exists()) {
        const post = postSnapshot.val();
        const updatedPost = { ...post, upvotes: post.upvotes + 1 };
        update(postRef, updatedPost); 
    }

    // increase the count of upvotes of a user by 1
    const dbRef = ref(database, 'users/' + PostObject.creator );
    const userSnapshot = await get(dbRef);
    if (userSnapshot.exists()) {
        const userObject = userSnapshot.val();
        userObject.total_upvotes += 1;
        update(dbRef, userObject);
      }

}

export async function downVote(username, PostObject){

    // add post to downvotes post of a user
    const dbRef2 = ref(database, 'users/' + username );
    const userSnapshot2 = await get(dbRef2);
    if (userSnapshot2.exists()) {
        const userObject = userSnapshot2.val();

        // check if already downvoted
        for(let i = 1; i < userObject.down_voted_posts.length; i++){
            if(userObject.down_voted_posts[i] == PostObject.postId){
                console.log("Already downVoted")
                return ;
            }
        }

        userObject.down_voted_posts.push(PostObject.postId);
        update(dbRef2, userObject);
    }

    // add 1 downvote to the post
    const postRef = ref(database, 'posts/' + PostObject.postId);
    const postSnapshot = await get(postRef);
    if (postSnapshot.exists()) {
        const post = postSnapshot.val();
        const updatedPost = { ...post, downvotes: post.downvotes + 1 };
        update(postRef, updatedPost); 
    }

    // increase the count of downvotes of a user by 1
    const dbRef = ref(database, 'users/' + PostObject.creator );
    const userSnapshot = await get(dbRef);
    if (userSnapshot.exists()) {
        const userObject = userSnapshot.val();
        userObject.total_downvotes += 1;
        update(dbRef, userObject);
      }
}

export async function hasUpvotedAPost(username, PostObject){

    const dbRef = ref(database, 'users/' + username );
    const userSnapshot = await get(dbRef);
    // console.log("TRY ----------------------------")
    if (userSnapshot.exists()) {
        const userObject = userSnapshot.val();
        for(let i = 1; i < userObject.up_voted_posts.length; i++){
            // console.log(userObject.up_voted_posts[i])
            // console.log(PostObject.postId)
            // console.log(userObject.up_voted_posts[i] == PostObject.postId)
            if(userObject.up_voted_posts[i] == PostObject.postId){
                return true;
            }
        }
        return false;
      }

}

export async function hasDownVotedAPost(username, PostObject){

    const dbRef = ref(database, 'users/' + username );
    const userSnapshot = await get(dbRef);

    if (userSnapshot.exists()) {
        const userObject = userSnapshot.val();
        for(let i = 1; i < userObject.down_voted_posts.length; i++){
            if(userObject.down_voted_posts[i] == PostObject.postId){
                return true;
            }
        }
        return false;
      }

}

export async function removeUpVote(username, PostObject){

    // remove post to upvoted post of a user
    const dbRef2 = ref(database, 'users/' + username );
    const userSnapshot2 = await get(dbRef2);
    if (userSnapshot2.exists()) {
        const userObject = userSnapshot2.val();        
        const exists = userObject.up_voted_posts.includes(PostObject.postId);
        if(exists == false){
            return; // it is not upvoted in the first place
        }
        userObject.up_voted_posts = userObject.up_voted_posts.filter(postId => postId !== PostObject.postId);
        update(dbRef2, userObject);
      }

    // remove 1 upvote to the post
    const postRef = ref(database, 'posts/' + PostObject.postId);
    const postSnapshot = await get(postRef);
    if (postSnapshot.exists()) {
        const post = postSnapshot.val();
        const updatedPost = { ...post, upvotes: post.upvotes - 1 };
        update(postRef, updatedPost); 
    }

    // decrease the count of upvotes of a user by 1
    const dbRef = ref(database, 'users/' + PostObject.creator );
    const userSnapshot = await get(dbRef);
    if (userSnapshot.exists()) {
        const userObject = userSnapshot.val();
        userObject.total_upvotes -= 1;
        update(dbRef, userObject);
      }

}

export async function removeDownVote(username, PostObject){
    console.log("HERE")
    // remove post to downvoted post of a user
    const dbRef2 = ref(database, 'users/' + username );
    const userSnapshot2 = await get(dbRef2);
    if (userSnapshot2.exists()) {
        const userObject = userSnapshot2.val();        
        const exists = userObject.down_voted_posts.includes(PostObject.postId);
        if(exists == false){
            return; // it is not upvoted in the first place
        }
        userObject.down_voted_posts = userObject.down_voted_posts.filter(postId => postId !== PostObject.postId);
        console.log(userObject.down_voted_posts)
        update(dbRef2, userObject);
      }

    // remove 1 downvote to the post
    const postRef = ref(database, 'posts/' + PostObject.postId);
    const postSnapshot = await get(postRef);
    if (postSnapshot.exists()) {
        const post = postSnapshot.val();
        const updatedPost = { ...post, downvotes: post.downvotes - 1 };
        update(postRef, updatedPost); 
    }

    // decrease the count of downvotes of a user by 1
    const dbRef = ref(database, 'users/' + PostObject.creator );
    const userSnapshot = await get(dbRef);
    if (userSnapshot.exists()) {
        const userObject = userSnapshot.val();
        userObject.total_downvotes -= 1;
        update(dbRef, userObject);
      }

}

// Saving Functionalities
export async function savePost(username, PostObject){

    const dbRef = ref(database, 'users/' + username );
        const userSnapshot = await get(dbRef);
        if (userSnapshot.exists()) {
            const userObject = userSnapshot.val();

            for(let i = 1; i < userObject.saved_posts.length; i++){
                if(userObject.saved_posts[i] == PostObject.postId){
                    console.log("Already saved Post")
                    return ;
                }
            }

            userObject.saved_posts.push(PostObject.postId);
            update(dbRef, userObject);
          }

}

export async function unSavePost(username, PostObject){
    const dbRef = ref(database, 'users/' + username );
    const userSnapshot = await get(dbRef);
    if (userSnapshot.exists()) {
        const userObject = userSnapshot.val();        
        const exists = userObject.saved_posts.includes(PostObject.postId);
        if(exists == false){
            return; // it is not saved in the first place
        }
        userObject.saved_posts = userObject.saved_posts.filter(postId => postId !== PostObject.postId);
        update(dbRef, userObject);
      }
}

export async function checkIfPostIsSaved(username, PostObject){

    const dbRef = ref(database, 'users/' + username );
    const userSnapshot = await get(dbRef);
    if (userSnapshot.exists()) {
        const userObject = userSnapshot.val();

        for(let i = 1; i < userObject.saved_posts.length; i++){
            if(userObject.saved_posts[i] == PostObject.postId){
                return true;
            }
        }     
        return false
      }

}

// Commenting Functionalities

export async function commentOnPost(PostObject, comment){
    const dbRef = ref(database, 'posts/' + PostObject.postId );
    const postSnapshot = await get(dbRef);
    if (postSnapshot.exists()) {
        const SnapshotPostObject = postSnapshot.val();    
        if (!SnapshotPostObject.comments) {
            SnapshotPostObject.comments = [];
          }    
        SnapshotPostObject.comments.push(comment)
        update(dbRef, SnapshotPostObject);
      }
}

// USERNAME CHECK

export async function checkUniqueUsername(username){
    const dbRef = ref(database, 'users/' + username );
    const userSnapshot = await get(dbRef);
    if (userSnapshot.exists()) {
        return false
      }
      return true
}

// TESTING FUNCTINOALITIES --> NOT USED IN PROGRAM

// let currentTimeInSeconds = Math.floor(Date.now() / 1000);
// let OneMonthInSeconeds = 2629746;
// console.log(currentTimeInSeconds);

// const currentDate = new Date();
// const day = currentDate.getDate();
// const month = currentDate.getMonth() + 1;
// const year = currentDate.getFullYear();
// const formattedDate = `${day}/${month}/${year}`;
// console.log(formattedDate);

// console.log( formatDateFromSeconds(currentTimeInSeconds + OneMonthInSeconeds) )

// function formatDateFromSeconds(seconds) {
//   const date = new Date(seconds * 1000); // convert seconds to milliseconds
//   const day = date.getDate();
//   const month = date.getMonth() + 1; // add 1 since month is zero-indexed
//   const year = date.getFullYear();
//   return `${day}/${month}/${year}`;
// }