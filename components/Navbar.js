import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import SpitFireLogo from '../public/SpitFireLogo.png'
import { useStateContext } from '../context/StateContext'

const Navbar = () => {

  const { currentUser } = useStateContext();

  return (
    <Section>
      <Container>
        <LogoContainer>
          <Logo><Image src={SpitFireLogo} alt="Logo"/></Logo>
          <LogoText>SpitFire</LogoText>
        </LogoContainer>
        <ButtonContainer>
          <Button1>Log In</Button1>
          <Button2>Sign Up</Button2>
        </ButtonContainer>

      </Container>

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
const Button1 = styled.button`
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
const Button2 = styled.button`
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

export default Navbar