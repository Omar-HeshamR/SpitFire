import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { useStateContext } from '../../context/StateContext';
import SpitFireLogo from '../../public/SpitFireLogo.png'
import Image from 'next/image';
import { addPostsNumber } from '@/functionalities/userFunctions';
import RapperDropDown from "../../utilities/rapperDropDown"
import {getRapperImage} from '@/utilities/getRapperImage';
import { buildRapBattle } from "@/functionalities/buildRapVideo"
import {useRouter} from 'next/router';

const crypto = require('crypto');

const CreateModal = ({ showModal, setShowModal }) => {

  const { currentUser, createPost, getPosts } = useStateContext();
  const router = useRouter();

  const [ loading, setLoading ] = useState(false);

  const [rapper1, setRapper1] = useState("");
  const handleSelectRapper1 = (newValue) => {
    setRapper1(newValue);
  };  

  const [rapper2, setRapper2] = useState("");
  const handleSelectRapper2 = (newValue) => {
    setRapper2(newValue);
  };  
  
  const [topicRef, setTopicRef] = useState("");
  const handleTopicRefChange = (event) => {
    setTopicRef(event.target.value);
  };
  
  const [enableBetting, setEnableBetting ] = useState(false);
  const handleEnableBetting = (event) => {
    const isChecked = event.target.checked;
    setEnableBetting(isChecked);
  };

  const modalRef = useRef();  

  async function createRapBattle(){
    
    try{

    setShowModal(false)
    setLoading("Creating Battle...")
    const postID = hashString(currentUser.displayName);
    const makeAudio = buildRapBattle(postID, rapper1, rapper2, topicRef);
    const audio_link = await toast.promise(makeAudio, {
      loading: 'Creating Battle...',
      success: 'Rap Battle Created!',
      error: 'Failed to Create Battle',
      duration: 6000,
    });
    const PostObject = {
      postId: postID,
      creator: currentUser.displayName,
      rapper1_image: getRapperImage(rapper1),
      rapper1_name: rapper1,
      rapper2_image: getRapperImage(rapper2),
      rapper2_name: rapper2,
      audio_link: audio_link,
      video_link: "", // not integrated with the our python server edge API yet.
      topic: topicRef,
      isBettingEnabled: enableBetting,
      view_count: 0,
      upvotes: 0,
      downvotes: 0,
      comments: [],
      timeStamp: Math.floor(Date.now() / 1000),
    }

    createPost(postID, PostObject)
    addPostsNumber(currentUser.displayName)
    getPosts();
    setLoading(false)
  }
    catch(err){
      toast.error("Failed to Create Battle")
      setLoading(false)
      setShowModal(false) 
    }
  }

  function hashString(str) {
    // Generate a random number between 1 and 10 billion
    const randomNum = Math.floor(Math.random() * 10000000000) + 1;
    
    // Combine the string and random number
    const strWithNum = str + randomNum.toString();
    
    // Hash the combined string using sha256
    const hashedString = crypto.createHash('sha256').update(strWithNum).digest('hex');
    
    // Return the hashed string
    return hashedString;
  }
  

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };
  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  ); 
  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return (
    <>
    { showModal ? (
      <Background onClick={closeModal} ref={modalRef} >
          <ModalWrapper showModal={showModal}>

            <ModalContent>
              <MainTitle> 
                <Image src={SpitFireLogo} alt="SpitFire Logo"/>
                Create Rap Battle
                <Image src={SpitFireLogo} alt="SpitFire Logo"/>
              </MainTitle>

              <Row>
                <RapperDropDown onChange={handleSelectRapper1} />
                <Versus>VS</Versus>
                <RapperDropDown onChange={handleSelectRapper2} />
              </Row>

              <TopicText>Enter Rap Prompt:</TopicText>
              <TextArea
              placeholder="You can add short topics like Economy, Sports, and Homework, or you long description like 'Biden won't flush the toilet'"
              value={topicRef}
              onChange={handleTopicRefChange}
              />

              <Row style={{ justifyContent: 'space-between', width: '90%'}} >
                <EnableText>Enable voting pools: </EnableText>
                <Checkbox type="checkbox" checked={enableBetting} onChange={handleEnableBetting}/>
              </Row>

              {loading ? <>
                {loading}...
              </>:
              <>
              <CreatePostButton onClick={createRapBattle}>Create Rap Battle !</CreatePostButton>
              </>}

            </ModalContent>

            <CloseModalButton
              aria-label='Close modal'
              onClick={() => setShowModal(prev => !prev)}
            />
          </ModalWrapper>
      </Background>
    ) : <></>}
  </>
 )
}


const Background = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalWrapper = styled.div`
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  color: #000;
  display: flex;
  flex-direction: column;
  position: relative;
  // z-index: 100;
  border-radius: 10px;
  background: linear-gradient(to bottom, #FFFFFF, #B5B8CF);
  // z-index: 100;
  @media (max-width: 480px){
    width: 60vw;
  }
`;

const ModalContent = styled.div`
  margin: 4vw 2vw;
  width: 40vw;

  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  line-height: 1.25;
  color: #141414;
  p {
    margin-bottom: 0rem;
    font-size: ${props => props.theme.fontlg};
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 1vw;
  right: 1.5vw;
  width: 2vw;
  height: 2vw;
  padding: 0;
  z-index: 10;
`;

const MainTitle = styled.div` // edited
font-size: 2.75vw;
margin-top: 1vw;
margin-bottom: 2vw;
justify-content: space-between;
align-items: center;
width: 90%;
display: flex;
font-weight: 900;
@media (max-width: 480px){
  font-size: 4.75vw;
}
img{

  width: 2vw;
  height: 2vw;
}
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Versus = styled.div`
  color: #FE5F55;
  font-weight: 900;
  margin-left: 2vw;
  margin-right: 2vw;
  font-size: 1.5vw;
`

const TopicText = styled.div`
  display: flex;
  margin-top: 2vw;
  margin-bottom: 0.5vw;
  width: 90%;
  color: #0A0A0A;
  font-size: 1vw;
  font-weight: 600;
`

const TextArea = styled.textarea`
  border: none;
  outline: none;
  resize: none;
  width: 90%;
  padding: 10px;
  font-size: 1vw;
  font-family: Arial, Helvetica, sans-serif;
  ::placeholder {
    color: #999;
  }
`;

const EnableText = styled.div`
  display: flex;
  margin-top: 1vw;  
  color: #0A0A0A;
  font-size: 1vw;
  font-weight: 600;
`

const Checkbox = styled.input`
  margin-top: 1vw;  
  type: checkbox;
  border: none;
  transform: scale(1.2); 
`
const CreatePostButton = styled.button` //edited
width: 90%;
display: inline-block;
cursor: pointer;
margin-top: 1.5vw;
background-color: #FE5F55;
color: white;
font-weight: 600;
font-size: 2vw;
height: 4vw;
transition: all 0.5s ease;
border: 0;
border-radius: 0.5vw;
filter: opacity(0.8);
&:hover{
  filter: opacity(1);
  transform: scale(0.975);
  transition: ease 1s;
}
`

export default CreateModal