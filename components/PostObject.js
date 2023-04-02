import React, { useState , useEffect } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import BetsModal from "./BetsModal"
import { findFileAndGetDownloadURL } from "../functionalities/getGif"
import { BsThreeDotsVertical } from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";
import { BiDownvote } from "react-icons/bi";
import { BiUpvote } from "react-icons/bi";
import { MdOutlineHowToVote } from "react-icons/md";
import { database } from "../library/firebase"
import { toast } from 'react-hot-toast'
import { ref, get, update } from "firebase/database";
import { useStateContext } from '../context/StateContext';
import CommentSlider from './sidebar/CommentSection'

const PostObject = ({PostObject}) => {

  const { currentUser } = useStateContext();
  const [ showBetsModal, setShowBetsModal ] = useState()
  const [ showComments, setShowComments] = useState()
  const [ Rapper1Gif, setRapper1Gif ] = useState()
  const [ Rapper2Gif, setRapper2Gif ] = useState()  

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
  
  function playBase64Mpegs(mpegs) {
    const audioPlayer = document.getElementById('audio-player');
    let currentIndex = 0;
  
    function playNextMpeg() {
      if (currentIndex >= mpegs.length) {
        // If we've played all the files, stop the audio player
        audioPlayer.pause();
        return;
      }
  
      const currentMpeg = mpegs[currentIndex];
      const blob = base64ToBlob(currentMpeg, 'audio/mpeg');
  
      audioPlayer.src = URL.createObjectURL(blob);
      audioPlayer.play();
  
      currentIndex++;
  
      audioPlayer.addEventListener('ended', playNextMpeg);
    }
  
    playNextMpeg();
  }
  
  function base64ToBlob(base64String, contentType) {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
  
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
  
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: contentType});
  
    return blob;
  }

  return (
    <>
    <Section>
      <Container>
        <Header>
          <RapperNameLeft>
            <Image src={PostObject.rapper1_image} alt="{PostObject.rapper1_name}" /> {PostObject.rapper1_name}
          </RapperNameLeft>
          VS
          <RapperNameRight>
            <Image src={PostObject.rapper2_image} alt="{PostObject.rapper2_name}" /> {PostObject.rapper2_name}
          </RapperNameRight>
        </Header>

          <audio id="audio-player"></audio>
          { PostObject.video_link ? <>
            <OneVideoDiv>
              <iframe width="100%" height="100%" src={PostObject.video_link} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </OneVideoDiv>
          </> : <>
          <VideoDiv>
            <iframe src={getGifLink(PostObject.rapper1_name)} width="300" height="200" loop controls={false} autoplay></iframe>
            <iframe src={getGifLink(PostObject.rapper2_name)} width="300" height="200" loop controls={false} autoplay></iframe>
          </VideoDiv>
          </>}

        <BottomBar>
          <BottomLeft>Creator: {PostObject.creator}</BottomLeft>

          {PostObject.audio_link && <PlayButton onClick={() => playBase64Mpegs(PostObject.audio_link)}>Play</PlayButton>}
          
          <VotingButton onClick={() => setShowBetsModal(true)}><VoteIcon/></VotingButton>
          <BottomRight>
            <Upvote onClick={handleUpVote}/>
            <VoteCount >{PostObject.upvotes}</VoteCount>
            <Downvote onClick={handleDownVote}/>
            <VoteCount >{PostObject.downvotes}</VoteCount>
            <Comment onClick={() => setShowComments(true)}/>
            <ThreeDots />
          </BottomRight>
        </BottomBar>

      </Container>
      {showComments && <CommentSlider showComments={showComments} setShowComments={setShowComments}/>}
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
  background-color: white;
  filter: opacity(0.9);
  color: #FE5F55;
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
  width: 3vw;
  height: 3vw;
  margin-right: 0.5vw;
  border-radius: 2vw;
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
  width: 3vw;
  height: 3vw;
  margin-right: 0.5vw;
  border-radius: 2vw;
}
`
const VideoDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  height: 20vw; /* change height to 50vw to evenly split the two sections */
  background-color: gainsboro;
`

const OneVideoDiv = styled.div`
height: 30vw;
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

const PlayButton = styled.button`
  height: 2vw;
  width: 15vw;
  background-color: #FE5F55;
  border: none;
  border-radius: 0.5vw;
  color: white;
  font-weight: 600;
  border-radius: 0.5vw;
  margin-left: 12vw;
  opacity: 0.9;
  box-shadow: 0.1vw 0.1vw 0.5vw gainsboro;
  &:hover{
    cursor: pointer;
    opacity: 1;
    box-shadow: none;
  }
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

function getGifLink(rapperName){
  const rapperGifs = {
    "Donald Trump": "https://firebasestorage.googleapis.com/v0/b/spitfire-75326.appspot.com/o/Trump%20A%20Video.mp4?alt=media&token=ac06b9d0-c072-4e25-b191-b9c1170fe658",
    "Optimus Prime": "https://firebasestorage.googleapis.com/v0/b/spitfire-75326.appspot.com/o/Optimus%20Prime%20A%20Video.mp4?alt=media&token=998c6f23-297f-4408-a268-3111398236b9",
    "Joseph Biden": "https://firebasestorage.googleapis.com/v0/b/spitfire-75326.appspot.com/o/Joe%20Biden%20A%20Video.mp4?alt=media&token=fc3c0ba0-d4ec-4281-a997-6f03274ad5aa",
    "Barack Obama": "https://firebasestorage.googleapis.com/v0/b/spitfire-75326.appspot.com/o/Obama%20A%20Video.mp4?alt=media&token=35f18854-08cf-4589-b8c5-d1ae5bc30ff7",
    "Lebron James": "https://firebasestorage.googleapis.com/v0/b/spitfire-75326.appspot.com/o/LeBron%20James%20A%20Video.mp4?alt=media&token=df1f07c1-cba1-4f0b-9f60-315281942505",
    "Morgan Freeman": "https://firebasestorage.googleapis.com/v0/b/spitfire-75326.appspot.com/o/Morgan%20Freeman%20A%20Video.mp4?alt=media&token=45477fab-9f18-41b6-94e4-0f752cb3416e",
    "Andrew Tate": "https://firebasestorage.googleapis.com/v0/b/spitfire-75326.appspot.com/o/Andrew%20Tate%20A%20Video.mp4?alt=media&token=7698a284-f00b-4de5-bf53-01cafeae2f09",
    "Taylor Swift": "https://firebasestorage.googleapis.com/v0/b/spitfire-75326.appspot.com/o/Taylor%20Swift%20A%20Video.mp4?alt=media&token=2a3372ca-7110-4484-b55c-024ce2f689ef",
    "Kanye West": "https://firebasestorage.googleapis.com/v0/b/spitfire-75326.appspot.com/o/Kanye%20A%20Video.mp4?alt=media&token=61d1ce32-97b6-411f-8dd6-cd7bb67ed3f1",
    "Drake": "https://firebasestorage.googleapis.com/v0/b/spitfire-75326.appspot.com/o/Drake%20A%20Video.mp4?alt=media&token=f72ec38a-2675-4057-bcc0-bdd96b2f90a1",
    "Spongebob": "https://firebasestorage.googleapis.com/v0/b/spitfire-75326.appspot.com/o/Spongebob%20A%20Video.mp4?alt=media&token=b2a171da-4ca3-4b31-81ec-65986f78f652",
    "Squidward": "https://firebasestorage.googleapis.com/v0/b/spitfire-75326.appspot.com/o/Squidward%20A%20Video.mp4?alt=media&token=3136ca8c-8c25-4e68-a945-ef91cae05901",
    "Eminem": "https://firebasestorage.googleapis.com/v0/b/spitfire-75326.appspot.com/o/Eminem%20A%20Video.mp4?alt=media&token=d13d15df-43ac-449f-9cfb-a85ac0006785",
    "Mark Zuckerberg": "https://firebasestorage.googleapis.com/v0/b/spitfire-75326.appspot.com/o/Mark%20Zuccerberg%20A%20Video.mp4?alt=media&token=9e3faf8f-1df2-4dd5-8cc0-b15478453027",
    "Ben Shapiro": "https://firebasestorage.googleapis.com/v0/b/spitfire-75326.appspot.com/o/Ben%20Shapiro%20A%20Video.mp4?alt=media&token=4a5c4cc0-0357-4935-bf82-f6ca73b827d7",
    "Cardi B": "https://firebasestorage.googleapis.com/v0/b/spitfire-75326.appspot.com/o/Cardi%20B%20A%20Video.mp4?alt=media&token=d9269eb0-6ea6-431e-a70f-c44e92211373"
  };
  return rapperGifs[rapperName]
}
