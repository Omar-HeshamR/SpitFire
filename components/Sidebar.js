import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import LatestNews from './LatestNews';


const Sidebar = () => {
  return (
    <Section>
      <Container>
        <CreateButton>
          <StyledAiOutlinePlusCircle/> Create
        </CreateButton>
        <LatestNews />

      </Container>
    </Section>
  )
}

const Section = styled.section`
display: flex;
width: 17.5vw;
height: 50vw;
// background-color: navajowhite;
border-left: 0.1vw solid gainsboro;

`
const Container = styled.div`
display: flex;
width: 100%;
height: 100%;
margin-top: 1vw;
// background-color: lightgreen;
flex-direction: column;
`
const CreateButton = styled.button`
  display: flex;
  width: 16.5vw;
  height: 6vw;
  margin-left: 1vw;
  background-color: white;
  border: 0.1vw solid #5B618A;
  border-radius: 0.5vw;
  justify-content: center;
  align-items: center;
  color: #5B618A;
  font-size: 3vw;
  font-weight: 900;
  &:hover{
    cursor: pointer;
    transform: scale(0.975);
  }
`

const StyledAiOutlinePlusCircle = styled(AiOutlinePlusCircle)`
  color: #FE5F55;
  font-size: 3vw;
  margin-right: 0.5vw;
`


export default Sidebar