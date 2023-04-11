import React, { useState } from 'react'
import styled from 'styled-components'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import LatestNews from './sidebar/LatestNews';
import YourLiveVotePools from './sidebar/YourLiveVotePools';
import CreateModal from "./sidebar/CreateModal"
import CreateButton from './CreateButton';
import { useStateContext } from '../context/StateContext';

const Sidebar = () => {

  const { currentUser } = useStateContext();

    //CREATE 
    const [showCreateModal, setShowCreateModal] = useState(false);
    const openCreateModal = () => {
      setShowCreateModal(prev => !prev)
    }

  return (
    <Section>
      <Container>

        <ButtonContainer>
          <CreateButton />
        </ButtonContainer>

        <LatestNews />
        <YourLiveVotePools />

        <CreateModal showModal={showCreateModal} setShowModal={setShowCreateModal} />

      </Container>
    </Section>
  )

}

const Section = styled.section`
display: flex;
width: 27.5vw;
height: 50vw;
// background-color: navajowhite;
border-left: 0.2vw ridge gainsboro;
position: fixed;
left: 70vw;
`

const Container = styled.div`
display: flex;
width: 100%;
height: 100%;
margin-top: 1vw;
// background-color: lightgreen;
flex-direction: column;
`

const ButtonContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-left: 1vw;
width: 26.5vw;
`

export default Sidebar