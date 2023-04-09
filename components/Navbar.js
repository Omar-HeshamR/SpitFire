import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import SpitFireLogo from '../public/SpitFireLogo.png'
import { useStateContext } from '../context/StateContext'
import Login from './Login'
import Signup from './Signup'
import { useRouter } from 'next/router'
import { VscAccount } from "react-icons/vsc";
import { SlSettings, SlLogout } from "react-icons/sl";
import { IoWalletOutline } from "react-icons/io5";


const Navbar = () => {

  const { currentUser, setCurrentUser, userProfileInfo } = useStateContext();
  const router = useRouter()

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
    <Section >
      <Container>
        <LogoContainer>
          <Logo><Image src={SpitFireLogo} alt="Logo"/></Logo>
          <LogoText>SpitFire</LogoText>
        </LogoContainer>

        {currentUser ? 
        <ProfileItemsContainer>
          <NameAndProfile onClick={() => router.push(`/profile/${userProfileInfo.username}`)}>
            <ProfileIcon />
            {userProfileInfo &&
            <NameDisplay>{truncateString(userProfileInfo.username)}</NameDisplay> }
          </NameAndProfile>
          <BettingHistoryIcon />
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
position: sticky;
  top: 0;
background-color: white;
z-index: 100;
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
width: 13vw;
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
width: 13vw;
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
  background-color: #f5f5f5;
  border: 0.1vw solid #f5f5f5;
  border-radius: 1vw;
  padding: 0.35vw 1vw;
  cursor: pointer;
  color: #5B618A;

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
  color: #5B618A;

`

const SettingsIcon = styled(SlSettings)`
  margin-right: 2.1vw;
  font-size: 2vw;
  cursor: pointer;
  color: #5B618A;
`

const LogOutIcon = styled(SlLogout)`
  font-size: 2vw;
  transform: rotate(-180deg);
  cursor: pointer;
  color: #5B618A;
`
const BettingHistoryIcon = styled(IoWalletOutline)`
  font-size: 2.25vw;
  cursor: pointer;
  color: #5B618A;
  margin-right: 2.1vw;
`

export default Navbar