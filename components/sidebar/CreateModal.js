import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { useStateContext } from '../../context/StateContext';
import SpitFireLogo from '../../public/SpitFireLogo.png'
import Image from 'next/image';
import RapperDropDown from "../../utilities/rapperDropDown"

const CreateModal = ({ showModal, setShowModal }) => {

  const { currentUser } = useStateContext();

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

  async function createRapBattle(){/*To Be Compeleted*/}

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
      <Background onClick={closeModal} ref={modalRef}>
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

              <TopicText>Enter Rap Topics (optional)</TopicText>
              <TextArea
              placeholder="You can add short topics like Economy, Sports, and Homework, or you long description like 'Biden won't flush the toilet'"
              value={topicRef}
              onChange={handleTopicRefChange}
              />

              <Row style={{ justifyContent: 'space-between', width: '90%'}} >
                <EnableText>Enable voting pools: </EnableText>
                <Checkbox type="checkbox" checked={enableBetting} onChange={handleEnableBetting}/>
              </Row>

              <CreatePostButton>Create Rap Battle !</CreatePostButton>

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
  z-index:10;
`;

const ModalWrapper = styled.div`
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  color: #000;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  background: linear-gradient(to bottom, #FFFFFF, #B5B8CF);
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