import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import RandomUser1 from '../../public/RandomUser1.jpg'
import RandomUser2 from '../../public/RandomUser2.jpg'
import RandomUser3 from '../../public/RandomUser3.jpg'
import RandomUser4 from '../../public/RandomUser4.jpg'
import { MdClose } from 'react-icons/md';

const FollowersModal = ({showFollowersModal, setShowFollowersModal}) => {

    const handleClose = () => {
        setShowFollowersModal(false);
    }
  return (
    <Background onClick={handleClose}>
            <ModalContent>
                    <Title>Followers <CloseIcon onClick={handleClose}/></Title>
                <Line></Line>
                <AccountsContainer>
                    <AccountDiv>
                        <ProfilePic><Image src={RandomUser1} alt="Random User 1" /></ProfilePic>
                        <SideColumn>
                            <TopRow>
                                <UserName>jonnyand_usa</UserName>
                                <FollowOption>Follow</FollowOption>
                            </TopRow>
                            <Name>Jonathan Anderson FSU 2025</Name>
                        </SideColumn>
                    </AccountDiv>
                    <AccountDiv>
                        <ProfilePic><Image src={RandomUser2} alt="Random User 2" /></ProfilePic>
                        <SideColumn>
                            <TopRow>
                                <UserName>Marie_smith1923.1</UserName>
                            </TopRow>
                            <Name>Marie Smith</Name>
                        </SideColumn>
                    </AccountDiv>
                    <AccountDiv>
                        <ProfilePic><Image src={RandomUser3} alt="Random User 3" /></ProfilePic>
                        <SideColumn>
                            <TopRow>
                                <UserName>Michael.Frederick</UserName>
                                <FollowOption>Follow</FollowOption>
                            </TopRow>
                            <Name>Michael George Frederick</Name>
                        </SideColumn>
                    </AccountDiv>
                    <AccountDiv>
                        <ProfilePic><Image src={RandomUser4} alt="Random User 4" /></ProfilePic>
                        <SideColumn>
                            <TopRow>
                                <UserName>Xavier Eduardo Lopez</UserName>
                            </TopRow>
                            <Name>Xavier Eduardo Lopez</Name>
                        </SideColumn>
                    </AccountDiv>
                    <AccountDiv>
                        <ProfilePic><Image src={RandomUser1} alt="Random User 1" /></ProfilePic>
                        <SideColumn>
                            <TopRow>
                                <UserName>jonnyand_usa</UserName>
                                <FollowOption>Follow</FollowOption>
                            </TopRow>
                            <Name>Jonathan Anderson FSU 2025</Name>
                        </SideColumn>
                    </AccountDiv>
                    <AccountDiv>
                        <ProfilePic><Image src={RandomUser2} alt="Random User 2" /></ProfilePic>
                        <SideColumn>
                            <TopRow>
                                <UserName>Marie_smith1923.1 </UserName>
                                <FollowOption>Follow</FollowOption>
                            </TopRow>
                            <Name>Marie Smith </Name>
                        </SideColumn>
                    </AccountDiv>
                    <AccountDiv>
                        <ProfilePic><Image src={RandomUser3} alt="Random User 3" /></ProfilePic>
                        <SideColumn>
                            <TopRow>
                                <UserName>Michael.Frederick</UserName>
                            </TopRow>
                            <Name>Michael George Frederick</Name>
                        </SideColumn>
                    </AccountDiv>
                    <AccountDiv>
                        <ProfilePic><Image src={RandomUser4} alt="Random User 4" /></ProfilePic>
                        <SideColumn>
                            <TopRow>
                                <UserName>Xavier Eduardo Lopez </UserName>
                            </TopRow>
                            <Name>Xavier Eduardo Lopez </Name>
                        </SideColumn>
                    </AccountDiv>               
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
  height: 22.5vw;
  overflow: auto;
`
const AccountDiv = styled.div`
display: flex;
padding: 0.625vw 1.25vw;
align-items: center;
&:hover{
    background-color: aliceblue;
    transform: scale(0.99);
    cursor: pointer;
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
    color: black;
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