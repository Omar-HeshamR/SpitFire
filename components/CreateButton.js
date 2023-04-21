import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { checkIfUserIsPremium, getUserProfileInfo } from '@/functionalities/userFunctions';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import CreateModal from "./sidebar/CreateModal"

const CreateButton = () => {


    const [ userAllowedToPost, setUserAllowedToPost ] = useState(true)
    const { currentUser } = useStateContext();

    //LOG IN
    const [showCreateModal, setShowCreateModal] = useState(false);
    const openCreateModal = () => {
      setShowCreateModal(prev => !prev)
    }

    // useEffect(() =>{

    //   if(currentUser && userAllowedToPost == undefined){

    //     const asyncfunc = async () =>{
    //         const UserObject = await getUserProfileInfo(currentUser.displayName);
    //         let isPremium = false;
    //         let currentTimeInSeconds = Math.floor(Date.now() / 1000);
    //         // console.log(UserObject)
    //         if(UserObject != undefined){
    //           if( UserObject.premium_time_stamp > currentTimeInSeconds ){
    //             isPremium = true;
    //             setUserAllowedToPost(true)
    //           }
    //           if(isPremium == false && UserObject.post_numbers > 2){
    //             setUserAllowedToPost(false)
    //           }
    //           if(isPremium == false && UserObject.post_numbers < 2){
    //             setUserAllowedToPost(true)
    //           }
    //       }
    //     }
    //     asyncfunc()

    //   }

    // }, [currentUser])


  return (
    <> 
        { currentUser ? // if the user is logged
        <>
          { userAllowedToPost ? // user is premium or still didnt post twice
              <MainButton onClick={openCreateModal}>
              <StyledAiOutlinePlusCircle/> <CreateText>Create</CreateText>
              </MainButton>
            :
            <LockedCreateButton >
            <Row>
            <StyledAiOutlinePlusCircle/><CreateText>Create</CreateText>
            </Row>
            <MustLogInText>2 free post limit achieved. Upgrade to post more...</MustLogInText>
            </LockedCreateButton>
          }
        </>

    : // if the user is not logged
        <LockedCreateButton >
            <Row>
            <StyledAiOutlinePlusCircle/> <CreateText>Create</CreateText>
            </Row>
            <MustLogInText>must be logged in to create..</MustLogInText>
        </LockedCreateButton>
        }
        
        {/* The Create Modal to Show when clicked create */}
        <CreateModal showModal={showCreateModal} setShowModal={setShowCreateModal} />

    </>
  )
}


const MainButton = styled.button`
  display: flex;
  width: 100%;
  height: 5vw;
  background-color: #FAFAFA;
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
  width: 100%;
  height: 5vw;
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

export default CreateButton