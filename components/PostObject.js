import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Trump from '../public/Trump.png'
import ElonMusk from '../public/ElonMusk.png'
import BetsModal from "./BetsModal"
import { BsThreeDotsVertical } from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";
import { BiDownvote } from "react-icons/bi";
import { BiUpvote } from "react-icons/bi";
import { MdOutlineHowToVote } from "react-icons/md";
import { database } from "../library/firebase"
import { toast } from 'react-hot-toast'
import { ref, get, update } from "firebase/database";
import { useStateContext } from '../context/StateContext';

const PostObject = ({PostObject}) => {

  const { currentUser } = useStateContext();
  const [ showBetsModal, setShowBetsModal ] = useState()

  async function handleUpVote(){
    if(currentUser == undefined){
      toast.error("Log in to Interact !")
      return;
    }
    const postRef = ref(database, 'posts/' + PostObject.postId);
    console.log("postRef", postRef)
    const postSnapshot = await get(postRef);
    console.log("postSnapshot", postSnapshot)
    if (postSnapshot.exists()) {
      const post = postSnapshot.val();
      console.log("post", post)
      const updatedPost = { ...post, upvotes: post.upvotes + 1 };
      update(postRef, updatedPost); // pass only the updated properties
    }
  }

  async function handleDownVote(){
    if(currentUser == undefined){
      toast.error("Log in to Interact !")
      return;
    }
    const postRef = ref(database, 'posts/' + PostObject.postId );
    const postSnapshot = await get(postRef);
    if (postSnapshot.exists()) {
      const post = postSnapshot.val();
      const updatedPost = { ...post, downvotes: post.downvotes + 1 };
      update(postRef, updatedPost);
    }
  }

  return (
    <>
    <Section>
      <Container>
        <Header>
          <RapperNameLeft>
            <Image src={Trump} alt="Donald Trump" /> {PostObject.rapper1_name}
          </RapperNameLeft>
          VS
          <RapperNameRight>
            <Image src={ElonMusk} alt="Elon Musk" /> {PostObject.rapper2_name}
          </RapperNameRight>
        </Header>

        <VideoDiv>
          <iframe width="100%" height="100%" src={PostObject.video_link} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </VideoDiv>

        <BottomBar>
          <BottomLeft>Creator: {PostObject.creator}</BottomLeft>
          <VotingButton onClick={() => setShowBetsModal(true)}><VoteIcon/></VotingButton>
          <BottomRight>
            <Upvote onClick={handleUpVote}/>
            <VoteCount >{PostObject.upvotes}</VoteCount>
            <Downvote onClick={handleDownVote}/>
            <VoteCount >{PostObject.downvotes}</VoteCount>
            <Comment />
            <ThreeDots />
          </BottomRight>
        </BottomBar>

      </Container>

      {showBetsModal && <BetsModal showModal={showBetsModal} setShowModal={setShowBetsModal} PostObject={PostObject}/>}
    </Section>
  </>
  )

}

const Section = styled.section`
margin: 1vw 0;
width: 100%;
border-radius: 1vw;
border: 0.1vw solid gainsboro;
box-shadow: 0.2vw 0.2vw 0.2vw gainsboro;
&:hover{
  box-shadow: 0.1vw 0.1vw 0.1vw gainsboro;
}
`
const Container = styled.div`
`
const Header =  styled.div`
display: flex;
border-radius: 1vw 1vw 0vw 0vw;
height: 4vw;
align-items: center;
justify-content: space-between;
font-size: 3vw;
font-weight: 900;
background-color: #FE5F55;
filter: opacity(0.9);
color: white;
&:hover{
  filter: opacity(1);
  transition: ease 1s;
}
`
const RapperNameLeft = styled.div`
display: flex;
margin-left: 1vw;
width: 45%;
align-items: center;
font-size: 2vw;
font-weight: 900;
img{
  width: 2vw;
  height: 2vw;
  margin-right: 0.5vw;
}
`
const RapperNameRight = styled.div`
display: flex;
width: 45%;
height: 2vw;
justify-content: right;
margin-right: 1vw;
align-items: center;
font-size: 2vw;
font-weight: 900;
img{
  width: 2vw;
  height: 2vw;
  margin-right: 0.5vw;
}
`
const VideoDiv = styled.div`
height: 34vw;
`
const BottomBar = styled.div`
display: flex;
height: 4vw;
align-items: center;
justify-content: space-between;
`
const BottomLeft = styled.div`
display: flex;
margin-left: 1vw;
justify-content: center;
align-items: center;
font-size: 1vw;
background-color: #EBEBEB;
height: 2.5vw;
padding-left: 1vw;
padding-right: 1vw;
border-radius: 0.5vw;
&:hover{
  cursor: pointer;
  color: white;
  font-weight: 900;
  background-color: #ABABAB;
}
`
const BottomRight = styled.div`
display: flex;
height: 2.5vw;
background-color: #EBEBEB;
margin-right: 1vw;
border-radius: 0.5vw;
align-items: center;
`
const ThreeDots = styled(BsThreeDotsVertical)`
  font-size: 1.5vw;
  margin-left: 2vw;
  margin-right: 0.5vw;
  &:hover{
    cursor: pointer;
    transform: scale(1.15);
    animation: spin 0.1s linear;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(180deg);
    }
  }
`
const Comment = styled(TfiCommentAlt)`
font-size: 1.5vw;
margin-left: 2vw;

&:hover{
  color: #5B618A;
  cursor: pointer;
}
`
const Downvote = styled(BiDownvote)`
font-size: 1.5vw;
margin-left: 2vw;

&:hover{
  transform: scale(1.01);
  color: firebrick;
  cursor: pointer;

}
`
const Upvote = styled(BiUpvote)`
font-size: 1.5vw;
margin-left: 1vw;

&:hover{
  transform: scale(1.01);
  color: green;
  cursor: pointer;
}
`
const VoteCount = styled.div`
font-size: 1vw;
margin-left: 0.25vw;
`
const VotingButton = styled.div`
background-color: #EBEBEB;
display: flex;
height: 2.5vw;
width: 2.5vw;
font-size: 1.5vw;
justify-content: center;
align-items: center;
margin-left: auto;
margin-right: 0.5vw;
border-radius: 0.5vw;
filter: opacity(0.9);
cursor: pointer;
&:hover{
  font-size: 1.75vw;
  filter: opacity(1);
  border: 0.25vw double #5B618A;
}
`
const VoteIcon = styled(MdOutlineHowToVote)`
  color: #FE5F55;
`

export default PostObject

/* 
const PostObject = {
   postId = "",
   creator = "",
   rapper1_image = "",
   rapper1_name = "",
   rapper2_image = "",
   rapper2_name = "",
   video_link = "",
   view_count = "",
   upvotes = "",
   downvotes = "",
   comments = "",
}
*/