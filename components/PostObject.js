import React, { useState , useEffect } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import BetsModal from "./modals/BetsModal"
import { useRouter } from 'next/router'
import { BsBookmarks, BsShare, BsBookmarksFill } from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";
import { BiDownvote, BiUpvote} from "react-icons/bi";
import { ImArrowUp, ImArrowDown } from "react-icons/im"
import { MdOutlineHowToVote } from "react-icons/md";
import { toast } from 'react-hot-toast'
import { useStateContext } from '../context/StateContext';
import { upVote, downVote, removeUpVote, removeDownVote, hasUpvotedAPost, hasDownVotedAPost,
  savePost, checkIfPostIsSaved, unSavePost } from '@/functionalities/userFunctions'
import { getAudio, getDurations } from "../functionalities/storageInteractions"

const PostObject = ({PostObject, isPostPage}) => {

  const { currentUser, stopCurrentRap, setCurrentBeatAudio, setCurrentRapAudio } = useStateContext();
  const [ showBetsModal, setShowBetsModal ] = useState()
  const [ rapping, setRapping ] = useState(false)
  const [ toggle, setToggle ] = useState(true)
  const rotuer = useRouter()

  // down and up vote postings functionalitites
  const [ upVoteCounter, setUpVoteCounter ] = useState(PostObject.upvotes)
  const [ downVoteCounter, setDownVoteCounter ] = useState(PostObject.downvotes)
  const [ hasUpVotedAPostAlready, setHasUpVotedAPostAlready ] = useState()
  const [ hasDownVotedAPostAlready, setHasDownVotedAPostAlready ] = useState()
  const [ isPostSaved, setIsPostSaved ] = useState(false)

  useEffect(() => {
    if(currentUser){
        const asyncfunc = async () =>{
            // to get the status as soon as the user is logged in
            const status = await hasUpvotedAPost(currentUser.displayName, PostObject)
            setHasUpVotedAPostAlready(status)
            const status2 = await hasDownVotedAPost(currentUser.displayName, PostObject)
            setHasDownVotedAPostAlready(status2)
            const status3 = await checkIfPostIsSaved(currentUser.displayName, PostObject)
            setIsPostSaved(status3)
        }
        asyncfunc()
        setUpVoteCounter(PostObject.upvotes)
        setDownVoteCounter(PostObject.downvotes)
    }
    if(currentUser == undefined){
      // if signed out, reset all the user identified actions of a post
      setIsPostSaved(false)
      setHasUpVotedAPostAlready(false)
      setHasDownVotedAPostAlready(false)
    }
  }, [currentUser, PostObject])

  // UPVOTING AND DOWNVOTEING FUNCTIONALITIES
  async function handleUpVote(){
    if(currentUser == undefined){
      toast.error("Log in to Interact !")
      return;
    }
    await upVote(currentUser.displayName, PostObject)
    setUpVoteCounter(PostObject.upvotes + 1)
    setHasUpVotedAPostAlready(true)
  }

  async function handleDownVote(){
    if(currentUser == undefined){
      toast.error("Log in to Interact !")
      return;
    }
    await downVote(currentUser.displayName, PostObject)
    setDownVoteCounter(PostObject.downvotes + 1)
    setHasDownVotedAPostAlready(true)
  }

  async function handleRemoveUpVote(){
    if(currentUser == undefined){
      toast.error("Log in to Interact !")
      return;
    }
    await removeUpVote(currentUser.displayName, PostObject)
    setUpVoteCounter(upVoteCounter - 1)
    setHasUpVotedAPostAlready(false)
  }

  async function handleRemoveDownVote(){
    if(currentUser == undefined){
      toast.error("Log in to Interact !")
      return;
    }
    await removeDownVote(currentUser.displayName, PostObject)
    setDownVoteCounter(downVoteCounter - 1)
    setHasDownVotedAPostAlready(false)
  }
  
  // POST SAVING and SHARING FUNCTIONALITY
  async function handleSavePost(){
    if(currentUser == undefined){
      toast.error("Log in to Interact !")
      return;
    }
    await savePost(currentUser.displayName, PostObject)
    setIsPostSaved(true)
  }

  async function handleUnsavePost(){
    if(currentUser == undefined){
      toast.error("Log in to Interact !")
      return;
    }
    await unSavePost(currentUser.displayName, PostObject)
    setIsPostSaved(false)
  }

  function handleShareButton(){
    const link = `${window.location.origin}/posts/${PostObject.postId}`;
    navigator.clipboard.writeText(link);
    toast.success(`Copied Post Link!`, { 
      style: {
        background: 'aliceblue',
        fontSize: '1.15vw',
        color: '#006400',
      }
    });
  }

  function goToPostPage(){
    rotuer.push(`/posts/${PostObject.postId}`)
  }

  // AUDIO AND VIDEO FUNCTIONALITIES
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

  async function playAudio(filename){
    stopCurrentRap()
    const URL_to_be_played = await getAudio(filename)
    let durations = null
    try {
      durations = await getDurations(filename)
    } catch (error) {
      console.log('no durations found')
    }
    const audio = new Audio(URL_to_be_played);
    const beatURL = await getAudio('music1.mp3')
    const beat = new Audio(beatURL)
    beat.volume = 0.15
    setCurrentBeatAudio(beat)
    setCurrentRapAudio(audio)
    if(durations != null){
      setRapping(true)
      toggleRap(durations)
    }
    audio.play();
    beat.play();
    audio.addEventListener('ended', () => {
      beat.pause()
    });
  }
  
  function toggleRap(durations) {
    let index = 0;
    setToggle(false);
    const toggleFunction = () => {
      setToggle(toggle => !toggle);
      index++;
      if (index < durations.length) {
        setTimeout(toggleFunction, durations[index]);
      }else{
        setRapping(false)
      }
    };
    setTimeout(toggleFunction, durations[index]);
  }

  const truncateString = (str) => (str.length > 25 ? str.slice(0, 25) + "..." : str);

  return (
    <>
    <Section isPostPage={isPostPage} onClick={() => console.log(PostObject.postId)}>

        <Header>
          <RapperNameLeft>
            <Image src={PostObject.rapper1_image} alt={`${PostObject.rapper1_name}`} /> {PostObject.rapper1_name}
          </RapperNameLeft>
          VS
          <RapperNameRight>
            <Image src={PostObject.rapper2_image} alt={`${PostObject.rapper2_name}`} /> {PostObject.rapper2_name}
          </RapperNameRight>
        </Header>

        <PromptContainer>
          <PromptText>Prompt: </PromptText> {PostObject.topic ? PostObject.topic : "None"}
        </PromptContainer>

          <audio id="audio-player"></audio>
          { PostObject.video_link ? <>
            <OneVideoDiv>
              <iframe width="100%" height="100%" src={PostObject.video_link} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </OneVideoDiv>
          </> : <>
          <VideoDiv>
            <ImgContainer>
              <ImgLeft rapping={rapping} toggle={toggle}><Image src={PostObject.rapper1_image} alt={PostObject.rapper1_name} /></ImgLeft>
            </ImgContainer>
            <ImgContainer>
              <ImgRight rapping={rapping} toggle={toggle}><Image src={PostObject.rapper2_image} alt={PostObject.rapper2_name} /></ImgRight>
            </ImgContainer>
          </VideoDiv>
          </>}

        <BottomBar>
          <BottomLeft onClick={() => rotuer.push(`/profile/${PostObject.creator}`)}>Creator: @{truncateString(PostObject.creator)}</BottomLeft>

          {rapping ? <RappingText>Rapping...</RappingText> 
          : <PlayButton onClick={() => playAudio(PostObject.audio_link)}>Play</PlayButton>}
          
          {/* <VotingButton onClick={() => setShowBetsModal(true)}><VoteIcon/></VotingButton> */}

          <BottomRight>

            {hasUpVotedAPostAlready ? <Upvoted onClick={handleRemoveUpVote}/> : <Upvote onClick={handleUpVote}/> }
            <VoteCount >{upVoteCounter}</VoteCount>
            {hasDownVotedAPostAlready ? <Downvoted onClick={handleRemoveDownVote}/>: <Downvote onClick={handleDownVote}/> }
            <VoteCount >{downVoteCounter}</VoteCount>

            {isPostPage == false && <Comment onClick={goToPostPage}/>}

            <Seprator />
            <ShareIcon onClick={handleShareButton}/>
            {isPostSaved ? <BookmarkFilledIcon onClick={handleUnsavePost}/> : <BookmarkIcon onClick={handleSavePost}/> }

          </BottomRight>

        </BottomBar>

      {showBetsModal && <BetsModal showModal={showBetsModal} setShowModal={setShowBetsModal} PostObject={PostObject}/>}
    </Section>
  </>
  )

}

const Section = styled.section`
margin: ${props => props.isPostPage ? '0' : '1.75vw 0'};
height: ${props => props.isPostPage && 'calc(100%)'};
margin-bottom: ${props => props.isPostPage && '2vw'};
width: 100%;
border-radius: 0.5vw;
border: 0.5vw outset #F8F8F8;
box-shadow: ${props => props.isPostPage ? '0' : '0px 0px 5px #5B618A'};
&:hover{
  // border: 0.1vw dashed #F8F8F8;
  // box-shadow: 0.1vw 0.1vw 0.1vw gainsboro;
}
`

const ImgContainer = styled.div`
position: relative;

  img{
    width: 18vw;
    height: 18vw; 
    border-radius: 1vw;
  }
`

const ImgLeft = styled.div`
  filter: ${({ rapping, toggle }) => ((rapping && toggle) ? 'grayscale(100%)' : 'none')};
`
const ImgRight = styled.div`
  filter: ${({ rapping, toggle }) => ((rapping && !toggle) ? 'grayscale(100%)' : 'none')};
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
  box-shadow: inset 0px -4px 4px -4px #5B618A;
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
const PromptContainer = styled.div`
  display: flex;
  padding: 1vw;
`
const PromptText = styled.div`
  font-weight: 600;
  margin-right: 1vw;
`

const VideoDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  height: 20vw; /* change height to 50vw to evenly split the two sections */
  box-shadow: inset 0px -4px 4px -4px #5B618A;
  // background-color: gainsboro;
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

const Downvoted = styled(ImArrowDown)`
font-size: 1.25vw;
margin-left: 2vw;
color: firebrick;

&:hover{
  transform: scale(1.01);
  color: black;
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
const Upvoted = styled(ImArrowUp)`
  font-size: 1.25vw;
  margin-left: 1vw;
  color: green;
  &:hover{
    transform: scale(1.01);
    color: black;
    cursor: pointer;
  }
`

const VoteCount = styled.div`
  font-size: 1vw;
  margin-left: 0.25vw;
`

const BookmarkIcon = styled(BsBookmarks)`
  font-size: 1.25vw;
  margin-left: 1vw;
  margin-right: 0.5vw;
  &:hover{
    transform: scale(1.01);
    color: #504A02;
    cursor: pointer;
  }
`

const BookmarkFilledIcon = styled(BsBookmarksFill)`
  font-size: 1.25vw;
  margin-left: 1vw;
  margin-right: 0.5vw;
  color: #504A02;
  &:hover{
    transform: scale(1.01);
    color: #691A02;
    cursor: pointer;
  }
`

const ShareIcon = styled(BsShare)`
  font-size: 1.25vw;
  margin-left: 0.95vw;
  &:hover{
    transform: scale(1.25);
    color: #024C69;
    cursor: pointer;
  }
`

const Seprator = styled.div`
  height: 100%;
  width: 0.1vw;
  margin-left: 0.95vw;
  background-color: gainsboro;
`

const VotingButton = styled.div`
display: flex;
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
  // margin-left: 12vw;
  opacity: 0.9;
  box-shadow: 0.1vw 0.1vw 0.5vw gainsboro;
  &:hover{
    cursor: pointer;
    opacity: 1;
    box-shadow: none;
  }
`

const RappingText = styled.div`
  font-size: 1.5vw;
  font-weight: 900;
  color: #5B618A;
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
    "Drake": "../Gifs/Drake-A-Video.gif",
    "Spongebob": "https://firebasestorage.googleapis.com/v0/b/spitfire-75326.appspot.com/o/Spongebob%20A%20Video.mp4?alt=media&token=b2a171da-4ca3-4b31-81ec-65986f78f652",
    "Squidward": "https://firebasestorage.googleapis.com/v0/b/spitfire-75326.appspot.com/o/Squidward%20A%20Video.mp4?alt=media&token=3136ca8c-8c25-4e68-a945-ef91cae05901",
    "Eminem": "https://firebasestorage.googleapis.com/v0/b/spitfire-75326.appspot.com/o/Eminem%20A%20Video.mp4?alt=media&token=d13d15df-43ac-449f-9cfb-a85ac0006785",
    "Mark Zuckerberg": "https://firebasestorage.googleapis.com/v0/b/spitfire-75326.appspot.com/o/Mark%20Zuccerberg%20A%20Video.mp4?alt=media&token=9e3faf8f-1df2-4dd5-8cc0-b15478453027",
    "Ben Shapiro": "https://firebasestorage.googleapis.com/v0/b/spitfire-75326.appspot.com/o/Ben%20Shapiro%20A%20Video.mp4?alt=media&token=4a5c4cc0-0357-4935-bf82-f6ca73b827d7",
    "Cardi B": "https://firebasestorage.googleapis.com/v0/b/spitfire-75326.appspot.com/o/Cardi%20B%20A%20Video.mp4?alt=media&token=d9269eb0-6ea6-431e-a70f-c44e92211373"
  };
  return rapperGifs[rapperName]
}
