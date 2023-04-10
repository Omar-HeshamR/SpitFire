import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router';
import FollowersModal from '@/components/ProfileComponents/FollowersModal'
import FollowingModal from '@/components/ProfileComponents/FollowingModal'
import { useStateContext } from '../../context/StateContext';
import TestProfilePic from '../../public/TestProfilePic.png'

const ProfileSection = ({userProfileInfo, isCurrentUser}) => {

    const [ selectedTool, setSelectedTool ] = useState("My Posts")
    const [ showFollowersModal, setShowFollowersModal] = useState()
    const [ showFollowingModal, setShowFollowingModal] = useState()

    function ToggleMyPosts(){
        setSelectedTool("My Posts")
    }
    function ToggleSaved(){
        setSelectedTool("Saved")
    }


  return (
    <LeftHandSide onClick={() => console.log(userProfileInfo)}>
            { userProfileInfo &&
        <MainProfileDiv>
            <ProfileIcon><Image src={TestProfilePic} alt="TestProfilePic"/></ProfileIcon>
            <ProfileVitals>
                <UserName>@{userProfileInfo.username}</UserName>
                <Name>{userProfileInfo.full_name}</Name>
                <FollowersRow>
                <Count onClick={() => setShowFollowersModal(!showFollowersModal)} >{userProfileInfo.followers.length- 1}  Followers</Count>
                {showFollowersModal && <FollowersModal showFollowersModal={showFollowersModal} setShowFollowersModal={setShowFollowersModal}/>}
                <Count onClick={() => setShowFollowingModal(!showFollowingModal)}>{userProfileInfo.following.length- 1} Following</Count>
                {showFollowingModal && <FollowingModal showFollowingModal={showFollowingModal} setShowFollowingModal={setShowFollowingModal}/>}
                </FollowersRow>
            </ProfileVitals>
                {isCurrentUser &&
                    <>
                        <ButtonText1 onClick={ToggleMyPosts} selectedTool={selectedTool}>My Posts</ButtonText1>
                        <ButtonText2 onClick={ToggleSaved} selectedTool={selectedTool}>Saved</ButtonText2>    
                    </>
                }
            
        </MainProfileDiv>
            }
        <Line></Line>        
    </LeftHandSide>
  )
}

const LeftHandSide = styled.div`
display: flex;
position: sticky;
padding-top: 2vw;
top: 5vw;
flex-direction: column;
z-index: 1;
background-color: white;
border-top: 0.1vw solid gainsboro;
box-shadow: inset 0 0.1vw 0.1vw -0.1vw gainsboro,
`
const MainProfileDiv = styled.div`
display: flex;
height: 5vw;
align-items: center;
background-color: white;
padding-left: 2.5vw;
width: 70vw;
`
const ProfileIcon = styled.div`
width: 5vw;
height: 100%;
background-color: gainsboro;
border-radius: 100%;
justify-content: center;
align-items: center;
display: flex;
img{
    width: 3vw;
    height: 3.94vw;
}
`
const ProfileVitals = styled.div`
display: flex;
margin-left: 1vw;
margin-right: auto;
flex-direction: column;
`
const UserName = styled.text`
font-size: 1.5vw;
margin-bottom: 0.25vw;
`
const Name = styled.text`
font-size: 1vw;
margin-bottom: 0.25vw;
color: dimgrey;
`
const FollowersRow = styled.div`
display: flex;
font-size: 1vw;
`
const Count = styled.div`
margin-right: 1vw;
&:hover{
    cursor: pointer;
    font-weight: 900;
}
`
const ButtonText1 = styled.text`
font-size: 1vw;
text-decoration: underline;
text-underline-offset: 0.5vw;
text-decoration-thickness: 0.05vw;
text-decoration-color: ${({selectedTool}) => 
selectedTool === 'My Posts' ? 'dodgerblue' : 'gainsboro' 
};
text-decoration-thickness: ${({selectedTool}) => 
selectedTool === 'My Posts' ? '0.1vw' : '0.05vw' 
};
font-weight: ${({selectedTool}) => 
selectedTool === 'My Posts' ? '900' : '100' 
};
&:hover{
    cursor: pointer;
}
`
const ButtonText2 = styled.text`
margin-left: 2vw;
font-size: 1vw;
text-decoration: underline;
text-underline-offset: 0.5vw;
text-decoration-thickness: 0.05vw;
margin-right: 4vw;
text-decoration-color: ${({selectedTool}) => 
selectedTool === 'Saved' ? 'dodgerblue' : 'gainsboro' 
};
text-decoration-thickness: ${({selectedTool}) => 
selectedTool === 'Saved' ? '0.1vw' : '0.05vw' 
};
font-weight: ${({selectedTool}) => 
selectedTool === 'Saved' ? '900' : '100' 
};
&:hover{
    cursor: pointer;
}
`
const Line = styled.div`
height: 0.05vw;
background-color: gainsboro;
margin-top: 1vw;
margin-bottom: 1vw;
margin-left: 2.5vw;
margin-right: 1vw;
`
export default ProfileSection