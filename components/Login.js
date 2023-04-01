import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { useStateContext } from '../context/StateContext';
import { useRouter } from 'next/router'

const Login = ({ showModal, setShowModal }) => {

  const { login, currentUser } = useStateContext();
  const logInemailRef = useRef();
  const logInpasswordRef = useRef();
  const modalRef = useRef();  
  const router = useRouter();

  async function handleLogin(){
    try{
        await login(logInemailRef.current.value, logInpasswordRef.current.value);
        setShowModal(false)
    }catch(err){
      console.log(err)
    }
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
      <Background onClick={closeModal} ref={modalRef}>
          <ModalWrapper showModal={showModal}>
            <ModalContent>
              <MainTitle> LOG IN </MainTitle>
              <InputTitle> Enter Email Address:</InputTitle>
              <FieldInput type={"email"} ref={logInemailRef}/>
              <InputTitle> Enter Password:</InputTitle>
              <FieldInput type={"password"} ref={logInpasswordRef}/>
              <LogInButton onClick={handleLogin}>SIGN IN</LogInButton>
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
  width: 50%;
  height: 75%;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  @media (max-width: 480px){
    width: 60vw;
}
`;

const ModalContent = styled.div`
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

const MainTitle = styled.h1`
font-size: 2.75vw;
margin-top: 1vw;
@media (max-width: 480px){
  font-size: 4.75vw;
}
`
const InputTitle = styled.div`
font-size: 1.75vw;
width: 92%;
color: dark_grey;
display: flex;
margin-top: 1vw;
@media (max-width: 480px){
  font-size: 3.75vw;
}
`
const FieldInput = styled.input`
width: 90%;
height: 2vw;
font-size: 1vw;
font-weight: 600;
border: 2px solid #404040;
type: text;
`
const LogInButton = styled.button`
width: 90%;
display: inline-block;
cursor: pointer;
margin-top: 1.5vw;
background-color: black;
color: white;
font-weight: 600;
font-size: 1vw;
padding: 1vw 2vw;
transition: all 0.5s ease;
&:hover{
  transform: scale(0.7);
}
&::after{
  content: " ";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%) scale(0);
  border: 0.5vw solid black;
  width: 100%;
  height: 100%;
}
&:hover::after{
  transform: translate(-50%,-50%) scale(1);
  padding: 0.5vw;
}
`
const BlackLine = styled.div`
width: 90%;
margin: 1vw;
background-color: black;
height: 1%;
`
const EndItemsContainer = styled.div`
flex-direction: row;
display: flex;
justify-content: space-between;
width: 90%;
`
const EndItem = styled.div`
color: blue;
cursor: pointer;
margin-bottom: 1vw;
&:hover{
  text-decoration: underline;
}
@media (max-width: 1024px){
    font-size: 1.5vw;
}
@media (max-width: 480px){
  font-size: 2.75vw;
}
`
const ErrorContainer = styled.div`
background-color: coral;
color: black;
border-radius: 10px;
padding: 0.5vw 0.5vw;
font-size: 1.5vw;
`

export default Login