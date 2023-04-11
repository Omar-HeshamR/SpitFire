import React, {useState} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import TestProfilePic from '../../public/defualt_profile_image.png'
import { useRouter } from 'next/router';
import { MdClose } from 'react-icons/md';

const FollowersModal = ({followers, setShowFollowersModal}) => {

    const router = useRouter()

    const handleClose = () => {
        setShowFollowersModal(false);
    }

    function goToProfile(username){
        router.push(`/profile/${username}`)
    }

  return (
    <Background onClick={handleClose}>
            <ModalContent>
                    <Title>Followers <CloseIcon onClick={handleClose}/></Title>
                <Line></Line>
                <AccountsContainer>

                    { followers.length > 0 ? 
                    <>
                     {followers.map((follower, id) => (
                        <AccountDiv 
                        key={id} 
                        onClick={() => goToProfile(follower.username)} >
                        <ProfilePic><Image src={TestProfilePic} alt={`${follower.username}`}  /></ProfilePic>
                        <SideColumn>
                            <TopRow>
                                <UserName>@{follower.username}</UserName>
                                {/* <FollowOption>Follow</FollowOption> */}
                            </TopRow>
                            <Name>{follower.full_name}</Name>
                        </SideColumn>
                        </AccountDiv>
                        ))}
                    </>
                    : <>None...</>}
                           
                </AccountsContainer>         
            </ModalContent>
      </Background>
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
`
const ModalContent = styled.div`
  padding: 0.625vw 0vw;
  background-color: white;
  border-radius: 0.625vw;
`
const Title = styled.text`
display: flex;
align-items: center;
font-size: 1.875vw;
font-weight: 900;
padding: 0 0.625vw;
color: grey;
`
const Line = styled.div`
display: flex;
background-color: gainsboro;
width: 100%;
height: 0.125vw;
margin-top: 0.3125vw;
`
const AccountsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 22.5vw;
  overflow: auto;
`
const AccountDiv = styled.div`
display: flex;
padding: 0.625vw 1.25vw;
align-items: center;
cursor: pointer;
&:hover{
    background-color: aliceblue;
}
`
const ProfilePic = styled.div`
display: flex;
img{
    width: 4.375vw;
    height: 4.375vw;
    border-radius: 100%;
}
`
const TopRow = styled.div`
display: flex;
font-weight: 900;
max-width: 20vw;
`
const SideColumn = styled.div`
display: flex;
flex-direction: column;
margin-left: 0.625vw;
width: 20vw;
overflow: hidden;
white-space: nowrap;
word-wrap: break-word;
`
const UserName = styled.text`
display: flex;
max-width: 20vw;
overflow: hidden;
white-space: nowrap;
word-wrap: break-word;
`
const Name = styled.div`
display: flex;
color: dimgrey;
margin-right: auto;
max-width: 20vw;
`
const FollowOption = styled.div`
color:  blue;
margin-left: 0.625vw;
&:hover{
    cursor: pointer;
}
`
const CloseIcon = styled(MdClose)`
margin-left: auto;
font-size: 2.5vw;
&:hover{
    color: red;
    transform: scale(0.95);
    cursor: pointer;
}
`
export default FollowersModal