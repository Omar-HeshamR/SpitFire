import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import SearchIcon from '../public/SearchIcon.png'
import PostObject from './PostObject'
import { useStateContext } from '../context/StateContext';

const Feed = ({ FeedFilter }) => {

  const { currentUser, Posts, getUserProfileInfo } = useStateContext();
  const [ localFeedPosts, setLocalFeedPosts ] = useState()
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    FilterFeed()
  }, [Posts, currentUser, FeedFilter])

  async function FilterFeed(){

    // no algorithms - special case feeds
    if(FeedFilter != undefined){
      if(FeedFilter == "Saved"){
        // get user's saved posts
        const localPostsSorted = await get_current_user_Saved_feed(Posts)
        setLocalFeedPosts(localPostsSorted)
      }else{ 
        // we are showing a specifc user feed
        const localPostsSorted = get_posts_of_a_user(Posts)
        setLocalFeedPosts(localPostsSorted)
      }
    }

    // A signed in users' feed
    if(FeedFilter == undefined && currentUser){
      const localPostsSorted = user_reccomendation_algorithm(Posts)
      setLocalFeedPosts(localPostsSorted)
    }

    // if someone is veiwing the feed without logging in
    if(FeedFilter == undefined && currentUser == undefined){
      const localPostsSorted = no_user_reccomendation_algorithm(Posts)
      setLocalFeedPosts(localPostsSorted)
    }

  }

  // Special Feeds Filtering methods [ SHOULD STILL BE SORTED BASED ON HOW RECENT - NOT DONE YET FOR BOTH ]
  function get_posts_of_a_user(obj){
    const arr = Object.values(obj);
    const final = []
    for(let i = 0; i < arr.length; i++){
      if(arr[i].creator == FeedFilter){
        final.push(arr[i])
      }
    }
    return final
  }

  async function get_current_user_Saved_feed(obj){
    const userProfile = await getUserProfileInfo(currentUser.displayName)
    const saved_posts = []
    const Posts_Array = Object.values(obj);
    console.log(Posts_Array)
    const saved_posts_id_list = userProfile.saved_posts.slice(1);
    for(let i = 0; i < saved_posts_id_list.length; i++ ){
      for (let j = 0; j < Posts_Array.length; j++) {
        if (Posts_Array[j].postId === saved_posts_id_list[i]) {
        saved_posts.push(Posts_Array[j]);
        break;
        }
        }
    }
    return saved_posts
  }

  // [CLASSIFIED] HIGHLY EXCLUSIVE AND SECERTIVE RECCOMENDATION ALGORITHMS - Estimated worth: $91,800,236,150

   // RECCOMENDATION ALGORTHIM OF A SIGNED IN FEED
  function user_reccomendation_algorithm(obj) {
    const arr = Object.values(obj);
    arr.sort((a, b) => b.upvotes - a.upvotes);
    console.log("FINAL ARRAY", arr)
    return arr;
  } 

  // RECCOMENDATION ALGORTHIM OF NON-SIGNED IN FEED
  function no_user_reccomendation_algorithm(obj) {
    const arr = Object.values(obj);
    arr.sort((a, b) => b.upvotes - a.upvotes);
    console.log("FINAL ARRAY", arr)
    return arr;
  }


  return (
    <Section onClick={() => console.log(localFeedPosts)}>
      <Container>
        <FeedHeader>
          <SearchBar>
            <Input
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue} 
            placeholder= "Search a particular rap battle by prompt..."/>
            <SearchButton><Image src={SearchIcon} alt="Search Icon"/></SearchButton>
          </SearchBar>
        </FeedHeader>

        { localFeedPosts ? <>{localFeedPosts.length > 0 ? <>
            {localFeedPosts.filter((post) => post.topic.includes(searchValue)).map((post) => (
            <PostObject key={post.id} PostObject={post}/>
          ))}
          </>: 
          <IdentifierText>
            {/* NO POSTS AVALIBLE */}
          </IdentifierText>
          }
          </> :
          <IdentifierText>
            Loading...
          </IdentifierText>
        }

      </Container>
    </Section>
  )
}

const Section = styled.section`
width: 67.5vw;
height: 100%;
// background-color: #ECECEC;
display: flex;
justfiy-content: center;
align-items: center;
`

const Container = styled.div`
width: 100%;
height: 100%;
margin-right: 1vw;
// background-color: deepskyblue;
display: flex;
flex-direction: column;
justfiy-content: center;
align-items: center;
`
const FeedHeader = styled.div`
width: 100%;
height: 2.5vw;
// background-color: orange;
display: flex;
justify-content: center;
align-items: center;
margin-top: 1vw;
`


const SearchBar = styled.div`
height: 2.5vw;
width: 100%;
// background-color: aliceblue;
display: flex;
border: 0.1vw solid gainsboro;
border-radius: 2.5vw;
// box-sizing: border-box;

`
const Input = styled.input`
font-size: red;
// background-color: lightcyan;
width: 100%;
margin-left: 1.25vw;
font-size: 1vw;
border: none;
color: black;
&:focus,
&:active {
  outline: none;
}
&::placeholder {
  color: grey;
}
`
const SearchButton = styled.div`
height: 100%;
width: 4vw;
background-color: grey;
display: flex;
justify-content: center;
align-items: center;
opacity: 0.9;
border-radius: 0vw 1.5vw 1.5vw 0vw;
&:hover{
  cursor: pointer;
  opacity: 1;
}

img{
  filter: invert(1);
  width: 1.3vw;
  height: 1.3vw;

}

`

const IdentifierText = styled.div`
  display: flex;
  margin-top: 2vw;
  font-size: 2vw;
`


export default Feed