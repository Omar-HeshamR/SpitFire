import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import LatestNews from './sidebar/LatestNews';
import CreateModal from "./sidebar/CreateModal"
import { useStateContext } from '../context/StateContext';

const Sidebar = () => {

  const { currentUser } = useStateContext();


  return (
    <Section>
      <Container>

        { currentUser ? // if the user is logged
              <CreateButton>
                <StyledAiOutlinePlusCircle/> <CreateText>Create</CreateText>
              </CreateButton>
        : // if the user is not logged
            <LockedCreateButton>
              <Row>
                <StyledAiOutlinePlusCircle/> <CreateText>Create</CreateText>
              </Row>
              <MustLogInText>must be logged in to create..</MustLogInText>
            </LockedCreateButton>
        }

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
  height: 5vw;
  margin-left: 1vw;
  background-color: white;
  border: 0.25vw solid #5B618A;
  border-radius: 0.5vw;
  justify-content: center;
  align-items: center;
  &:hover{
    cursor: pointer;
    transform: scale(0.975);
  }
`
const CreateText = styled.div`
  color: #FE5F55;
  font-size: 2vw;
  font-weight: 600;
  letter-spacing: 0.1vw;
`

const LockedCreateButton = styled.button`
  display: flex;
  flex-direction: column;
  width: 16.5vw;
  height: 5vw;
  margin-left: 1vw;
  background-color: white;
  border: 0.2vw solid #5B618A;
  border-radius: 0.5vw;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
  cursor: not-allowed;
`

const StyledAiOutlinePlusCircle = styled(AiOutlinePlusCircle)`
  color: #FE5F55;
  font-size: 3vw;
  margin-right: 0.5vw;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const MustLogInText = styled.div`
  color: red;
  font-size: 0.75vw;
`

export default Sidebar