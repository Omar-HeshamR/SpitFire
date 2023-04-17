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
      const userProfile = await getUserProfileInfo(currentUser.displayName)
      const localPostsSorted = user_reccomendation_algorithm(Posts, userProfile)
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
  function user_reccomendation_algorithm(obj, userInfo) {
    if(userInfo == undefined){
      return no_user_reccomendation_algorithm(obj)
    }
    const arr = Object.values(obj);
    if (arr[0] == undefined) return;
    const orgScoreValues = []
    let mostRecent = arr[0].timeStamp
    for(let i=0; i < arr.length; i++){
      const likeDislikeRatio = getLikeDislikeRatio(arr[i])
      const followFolloweeScore = determineFollowFolloweeScore(arr[i], userInfo)
      const seenScore = determineSeenScore(arr[i], userInfo)
      const timeScore = arr[i].timeStamp
      if(arr[i].timeStamp > mostRecent){
        mostRecent = arr[i].timeStamp
      }
      orgScoreValues.push({timeScore: timeScore, likeDislikeRatio: likeDislikeRatio, seenScore: seenScore, followFolloweeScore: followFolloweeScore})
    }
    const scoreValues = determineTimeScores(orgScoreValues, mostRecent)

    const finalScores = computeTotalScore(scoreValues, true)
    const sortedPosts = sortByTotalScore(arr, finalScores)

    return sortedPosts;
  } 

  // RECCOMENDATION ALGORTHIM OF NON-SIGNED IN FEED
  function no_user_reccomendation_algorithm(obj) {
    const arr = Object.values(obj);
    if (arr[0] == undefined) return;
    const orgScoreValues = []
    let mostRecent = arr[0].timeStamp
    for(let i=0; i < arr.length; i++){
      const likeDislikeRatio = getLikeDislikeRatio(arr[i])
      const timeScore = arr[i].timeStamp
      if(arr[i].timeStamp > mostRecent){
        mostRecent = arr[i].timeStamp
      }
      orgScoreValues.push({timeScore: timeScore, likeDislikeRatio: likeDislikeRatio})
    }
    const scoreValues = determineTimeScores(orgScoreValues, mostRecent)
    const finalScores = computeTotalScore(scoreValues, false)
    const sortedPosts = sortByTotalScore(arr, finalScores)
    return sortedPosts;
  }

  function sortByTotalScore(arr, scoreValues){
    const tuples = arr.map((value, index) => [value, scoreValues[index].totalScore]);
    tuples.sort((a, b) => b[1] - a[1]);
    return tuples.map((tuple) => tuple[0]);
  }

  function computeTotalScore(scoreValues, userStatus){
    const likeDislikeWeight = 1;
    const timeWeight = 1;
    const seenAlreadyWeight = 1;
    const followFolloweeWeight = 1;
    
    if(userStatus){
      for(let i=0; i<scoreValues.length; i++){
        const totalScore = scoreValues[i].timeScore * timeWeight + scoreValues[i].likeDislikeRatio * 
          likeDislikeWeight + scoreValues[i].followFolloweeScore * followFolloweeWeight + scoreValues[i].seenScore * seenAlreadyWeight;
          scoreValues[i].totalScore = totalScore;
      } 
      return scoreValues
    }else{
      for(let i=0; i<scoreValues.length; i++){
        const totalScore = scoreValues[i].timeScore * timeWeight 
        + scoreValues[i].likeDislikeRatio * likeDislikeWeight;
        scoreValues[i].totalScore = totalScore;
      }
      return scoreValues
    }
  }

  function determineTimeScores(scoreValues, mostRecent){
    for(let i=0; i<scoreValues.length; i++){
      const newScore = 10 * (1 - scoreValues[i].timeScore / mostRecent)
      scoreValues[i].timeScore = newScore
    }
    return scoreValues
  }

  function getLikeDislikeRatio(post){
    return (post.upvotes + 1) / (post.downvotes + 1)
  }

  function determineFollowFolloweeScore(post, userInfo){
    if(userInfo.following.includes(post.creator)){
      return 4
    }else if(userInfo.followers.includes(post.creator)){
      return 2
    }else{
      return 1
    }
  }

  function determineSeenScore(post, userInfo){
    let visibleScore = 5
    if(userInfo.down_voted_posts.includes(post.postId)){
      visibleScore -= 1
    } else if(userInfo.up_voted_posts.includes(post.postId)){
      visibleScore -=2
    } else if(userInfo.saved_posts.includes(post.postId)){
      visibleScore -=3
    }
    return visibleScore
  }

  return (
    <Section >
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
            <PostObject key={post.id} PostObject={post} isPostPage={false}/>
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