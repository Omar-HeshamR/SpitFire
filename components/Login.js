import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { useStateContext } from '../context/StateContext';
import { useRouter } from 'next/router'
import Image from 'next/image';
import SpitFireLogo from '../public/SpitFireLogo.png'
import { toast } from 'react-hot-toast';

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
      toast.error(`Invalid Credentials`)
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
              <MainTitle> 
                <Image src={SpitFireLogo} alt="SpitFire Logo"/>
                Continue spitting fire
                <Image src={SpitFireLogo} alt="SpitFire Logo"/>
              </MainTitle>
              <InputTitle> Enter your email address:</InputTitle>
              <FieldInput type="email" name="email" ref={logInemailRef} />
              <InputTitle> Enter your password:</InputTitle>
              <FieldInput type={"password"} ref={logInpasswordRef} />
              <LogInButton onClick={handleLogin}>Login</LogInButton>
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

const ModalWrapper = styled.div` //edited
  // width: 100%;
  // height: 75%;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  // background: #fff;
  background: linear-gradient(to bottom, #FFFFFF, #B5B8CF);
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
const InputTitle = styled.div` // edited
font-size: 1vw;
margin-left: 0.5vw;
width: 90%;
color: #0A0A0A;
display: flex;
margin-top: 1vw;
margin-bottom: 0.25vw;
@media (max-width: 480px){
  font-size: 3.75vw;
}
`
const FieldInput = styled.input` // edited
width: 90%;
height: 2.5vw;
font-size: 1vw;
font-weight: 100;
border: 0;
type: text;
border-radius: 0.5vw;
color: #0A0A0A;
text-indent: 0.5vw;

&:focus,
&:active {
  outline: none;
}
&::placeholder {
  color: grey;
}
`
const LogInButton = styled.button` //edited
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

export default Login