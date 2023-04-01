import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { useStateContext } from '../context/StateContext';
import { useRouter } from 'next/router'

const Signup = ({ showModal, setShowModal }) => {

  const { register, currentUser } = useStateContext();
  const emailRef = useRef();
  const passwordRef = useRef()
  const nameRef = useRef()
  const modalRef = useRef();  
  const router = useRouter();

  async function handleRegister(){
    try{
        await register(nameRef.current.value, emailRef.current.value, passwordRef.current.value)
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
              <MainTitle> SIGN UP </MainTitle>
              <InputTitle> Enter Your Full Name:</InputTitle>
              <FieldInput type={"text"} ref={nameRef}/>
              <InputTitle> Enter Email Address:</InputTitle>
              <FieldInput type={"email"} ref={emailRef}/>
              <InputTitle> Enter Password:</InputTitle>
              <FieldInput type={"password"} ref={passwordRef}/>
              <LogInButton onClick={handleRegister}>SIGN Up</LogInButton>
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

export default Signup