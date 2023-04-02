import { auth, database, storage } from "../library/firebase"
import { ref, set, get, child, onValue } from "firebase/database";

export async function downVote(postID){
    const postRef = ref(database, 'posts/' + postID);
    const postSnapshot = await get(postnVRef);
    if (postSnapshot.exists()) {
      const post = postSnapshot.val();
      const updatedPost = { ...post, upvotes: post.upvotes - 1 };
      update(postRef, updatedPost);
    }
}

export async function upVote(postID){
    const postRef = ref(database, 'posts/' + postID);
    const postSnapshot = await get(postRef);
    if (postSnapshot.exists()) {
      const post = postSnapshot.val();
      const updatedPost = { ...post, upvotes: post.upvotes + 1 };
      update(postRef, updatedPost);
    }
}