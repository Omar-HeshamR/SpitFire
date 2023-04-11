import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import RandomUser1 from '../../public/RandomUser1.jpg'
import RandomUser2 from '../../public/RandomUser2.jpg'
import RandomUser3 from '../../public/RandomUser3.jpg'
import RandomUser4 from '../../public/RandomUser4.jpg'
import { MdClose } from 'react-icons/md';

const FollowingModal = ({showFollowingModal, setShowFollowingModal}) => {

    const handleClose = () => {
        setShowFollowingModal(false);
    }

    const [ selectedTool, setSelectedTool ] = useState()

    function ToggleProfile(){
        setSelectedTool("Profile")
    }
    function ToggleButton(){
        setSelectedTool("Button")
    }
  return (
    <Background onClick={handleClose}> 
            <ModalContent>
                    <Title>Following <CloseIcon onClick={handleClose}/></Title>
                <Line></Line>
                <AccountsContainer>
                    <AccountDiv onMouseEnter={ToggleProfile} selectedTool={selectedTool}  onMouseLeave={() => setSelectedTool(false)}>
                        <ProfilePic><Image src={RandomUser1} alt="Random User 1" /></ProfilePic>
                        <SideColumn>
                            <TopRow>
                                <UserName>jonnyand_usa</UserName>
                            </TopRow>
                            <Name>Jonathan Anderson FSU 2025</Name>
                        </SideColumn>
                        <RemoveButton onMouseEnter={ToggleButton} selectedTool={selectedTool}  onMouseLeave={() => setSelectedTool("Profile")}>Unfollow</RemoveButton>
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
  max-height: 22.5vw;
  overflow: auto;
`
const AccountDiv = styled.div`
display: flex;
padding: 0.625vw 1.25vw;
align-items: center;
&:hover{
    cursor: pointer;
}
background-color: ${({selectedTool}) => 
selectedTool === 'Profile' ? 'aliceblue' : 'transparent' 
};
transform: ${({selectedTool}) => 
selectedTool === 'Profile' ? 'scale(0.99)' : 'scale(1)' 
};
cursor: ${({selectedTool}) => 
selectedTool === 'Profile' ? 'pointer' : 'auto' 
};
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
`
const SideColumn = styled.div`
margin-left: 0.625vw;
width: 16.25vw;
margin-right: 1.25vw;
overflow: hidden;
white-space: nowrap;
`
const UserName = styled.div`
`
const Name = styled.div`
display: flex;
color: dimgrey;
margin-right: auto;
`
const RemoveButton = styled.button`
padding: 0.625vw 0.625vw;
font-size: 1.25vw;
background-color: #FE5F55;
color: white;
border: none;
border-radius: 0.625vw;

&:hover{
    cursor: pointer;
}
filter: ${({selectedTool}) => 
selectedTool === 'Button' ? 'opacity(1)' : 'opacity(0.8)' 
};
transform: ${({selectedTool}) => 
selectedTool === 'Button' ? 'scale(0.95)' : 'scale(1)' 
};
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
export default FollowingModal