import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import SpitFireLogo from '../public/SpitFireLogo.png'
import { useStateContext } from '../context/StateContext'
import Login from './Login'
import Signup from './Signup'
import { useRouter } from 'next/router'
import { VscAccount } from "react-icons/vsc";
import { CgFeed } from "react-icons/cg";
import { SlSettings, SlLogout } from "react-icons/sl";

const Navbar = () => {

  const { currentUser, setCurrentUser, userProfileInfo, logOut } = useStateContext();
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

  // Routing
  function goToFeed(){
    router.push("/")
  }

  const truncateString = (str) => (str.length > 25 ? str.slice(0, 25) + "..." : str);

  return (
    <Section >
      <Container>
        <LogoContainer onClick={() => router.push("/")}>
          <Logo><Image src={SpitFireLogo} alt="Logo"/></Logo>
          <LogoText>SpitFire</LogoText>
        </LogoContainer>

        {currentUser ? 
        <ProfileItemsContainer>
          <NameAndProfile onClick={() => router.push(`/profile/${currentUser.displayName}`)}>
            <ProfileIcon />
            <NameDisplay>@{truncateString(currentUser.displayName)}</NameDisplay> 
          </NameAndProfile>
          <FeedIcon onClick={goToFeed}/>
          <SettingsIcon />
          <LogOutIcon onClick={logOut}/>
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
  z-index: 1;
  background: linear-gradient(to bottom, #FFFFFF, #F8F8F8);
`
const Container = styled.div`
display: flex;
width: 95%;
height: 90%;
justify-content: space-between;
`
const LogoContainer = styled.div`
display: flex;
&:hover{
  cursor: pointer;
  transform: scale(1.05);
}
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
  background-color: gainsboro;
  border: 0.1vw solid #f5f5f5;
  border-radius: 1vw;
  padding: 0.35vw 1vw;
  cursor: pointer;
  color: #5B618A;

  &:hover{
    border: 0.1vw solid #5B618A;
    color: #FE5F55;
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
  margin-right: 2.1vw;
  font-size: 2vw;
  cursor: pointer;
  color: #5B618A;
  &:hover{
    color: #FE5F55;
  }
`

const LogOutIcon = styled(SlLogout)`
  font-size: 2vw;
  transform: rotate(-180deg);
  cursor: pointer;
  color: #5B618A;
  &:hover{
    color: #FE5F55;
  }
`
const FeedIcon = styled(CgFeed)`
  font-size: 2.25vw;
  cursor: pointer;
  color: #5B618A;
  margin-right: 2.1vw;
  &:hover{
    color: #FE5F55;
  }
`

export default Navbar