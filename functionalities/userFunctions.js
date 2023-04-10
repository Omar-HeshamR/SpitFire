// link it to profile and user_profiles.

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