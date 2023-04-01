import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import SpitFireLogo from '../public/SpitFireLogo.png'
import { useStateContext } from '../context/StateContext'
import Login from './Login'
import Signup from './Signup'
import { VscAccount } from "react-icons/vsc";
import { SlSettings, SlLogout } from "react-icons/sl";

const Navbar = () => {

  const { currentUser, setCurrentUser } = useStateContext();

  //LOG IN
  const [showLogInModal, setShowLogInModal] = useState(false);
  const openLogInModal = () => {
    setShowLogInModal(prev => !prev)
  }

  //SIGN UP
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const openSignUpModal = () => {
    setShowSignUpModal(prev => !prev)
  }

  const truncateString = (str) => (str.length > 25 ? str.slice(0, 25) + "..." : str);

  return (
    <Section>
      <Container>
        <LogoContainer>
          <Logo><Image src={SpitFireLogo} alt="Logo"/></Logo>
          <LogoText>SpitFire</LogoText>
        </LogoContainer>

        {currentUser ? 
        <ProfileItemsContainer>
          <NameAndProfile>
            <ProfileIcon />
            <NameDisplay>{truncateString(currentUser.displayName)}</NameDisplay>
          </NameAndProfile>
          <SettingsIcon />
          <LogOutIcon onClick={() => setCurrentUser(undefined)}/>
        </ProfileItemsContainer>
        : 
        <ButtonContainer>
        <LogInButton onClick={openLogInModal}>Log In</LogInButton>
        <SignUpButton onClick={openSignUpModal}>Sign Up</SignUpButton>
        </ButtonContainer>
        }
      </Container>

      <Login showModal={showLogInModal} setShowModal={setShowLogInModal}/>
      <Signup showModal={showSignUpModal} setShowModal={setShowSignUpModal}/>

    </Section>
  )
}

const Section = styled.section`
display: flex;
height: 5vw;
justify-content: center;
align-items: center;
box-shadow: 0vw 0.1vw 0.1vw gainsboro;
`
const Container = styled.div`
display: flex;
width: 95%;
height: 90%;
justify-content: space-between;
`
const LogoContainer = styled.div`
display: flex;
`
const Logo = styled.div`
display: flex;
align-items: center;
img{
 height: 2.5vw; 
 width: 2.5vw;
}
`
const LogoText = styled.text`
align-items: center;
display: flex;
font-size: 1.75vw;
font-weight: 700;
margin-left: 0.5vw;
letter-spacing: 0.1vw;
`
const ButtonContainer = styled.div`
display: flex;
align-items: center;
`
const LogInButton = styled.button`
height: 3vw;
width: 8vw;
background-color: #FE5F55;
border: none;
border-radius: 0;
color: white;
font-weight: 600;
border-radius: 0.1vw;
opacity: 0.9;
box-shadow: 0.1vw 0.1vw 0.5vw gainsboro;
&:hover{
  cursor: pointer;
  opacity: 1;
  box-shadow: none;
}
`
const SignUpButton = styled.button`
height: 3vw;
width: 8vw;
background-color: #5B618A;
border: none;
border-radius: 0;
color: white;
font-weight: 600;
border-radius: 0.1vw;
margin-left: 0.5vw;
opacity: 0.9;
box-shadow: 0.1vw 0.1vw 0.5vw gainsboro;
&:hover{
  cursor: pointer;
  opacity: 1;
  box-shadow: none;
}
`
const ProfileItemsContainer = styled.div`
  display: flex;
  align-items: center;
`
const NameAndProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 2vw;
  background-color: gainsboro;
  border: 0.1vw solid gainsboro;
  border-radius: 1vw;
  padding: 0.35vw 1vw;
  cursor: pointer;
  &:hover{
    border: 0.1vw solid black;
    background-color: white;
  }
`

const NameDisplay = styled.div`
  font-size: 1.25vw;
`

const ProfileIcon = styled(VscAccount)`
  margin-right: 0.75vw;
  font-size: 2vw;
`

const SettingsIcon = styled(SlSettings)`
  margin-right: 2vw;
  font-size: 2vw;
  cursor: pointer;
`

const LogOutIcon = styled(SlLogout)`
  font-size: 2vw;
  transform: rotate(-180deg);
  cursor: pointer;
`

export default Navbar