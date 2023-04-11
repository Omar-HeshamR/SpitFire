import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { useStateContext } from '@/context/StateContext'
import { getFollowers, getFollowings, addFollower, removeFollower, 
    checkIfUserIsAfollower, removeFollowing, addFollowing } from '@/functionalities/userFunctions'
import FollowersModal from '@/components/ProfileComponents/FollowersModal'
import FollowingModal from '@/components/ProfileComponents/FollowingModal'
import TestProfilePic from '../../public/defualt_profile_image.png'

const ProfileSection = ({userProfileInfo, isCurrentUser}) => {

    const { currentUser } = useStateContext()
    const [ selectedTool, setSelectedTool ] = useState("My Posts")
    const [ showFollowersModal, setShowFollowersModal] = useState()
    const [ showFollowingModal, setShowFollowingModal] = useState()
    const [ followerCount, setFollowerCount ] = useState(userProfileInfo.followers.length - 1)
    const [ followersOfProtofolio, setFollowersOfPortofolio ] = useState()
    const [ followingsOfProtofolio, setFollowingsOfPortofolio ] = useState()
    const [ isFollower, setIsFollower] = useState(false);

    useEffect(() => {
        if(currentUser){
            const asyncfunc = async () =>{
                const status = await checkIfUserIsAfollower(currentUser.displayName, userProfileInfo.username)
                setIsFollower(status)
            }
            asyncfunc()
        }
    }, [currentUser, userProfileInfo])

    useEffect(() => {
        setFollowerCount(userProfileInfo.followers.length - 1)
    }, [userProfileInfo])

    useEffect(() => {
        const asyncfunc = async () =>{
            const status1 = await getFollowers(userProfileInfo.username)
            const status2 = await getFollowings(userProfileInfo.username)
            setFollowersOfPortofolio(status1)
            setFollowingsOfPortofolio(status2)
        }
        asyncfunc()

    }, [showFollowersModal, userProfileInfo])


    function ToggleMyPosts(){
        setSelectedTool("My Posts")
    }
    function ToggleSaved(){
        setSelectedTool("Saved")
    }

    const handleFollowClick = async () => {
        await addFollower(userProfileInfo.username, currentUser.displayName);
        await addFollowing(currentUser.displayName, userProfileInfo.username);
        setFollowerCount( followerCount + 1)
        setIsFollower(true);
      };
    
      const handleUnfollowClick = async () => {
        await removeFollower(userProfileInfo.username, currentUser.displayName);
        await removeFollowing(currentUser.displayName, userProfileInfo.username);
        setFollowerCount( followerCount - 1)
        setIsFollower(false);
      };

  return (
    <>
        <LeftHandSide>
            { userProfileInfo &&
        <MainProfileDiv>
            <ProfileIcon><Image src={TestProfilePic} alt={`${userProfileInfo.username}`} /></ProfileIcon>
            <ProfileVitals>
                <UserName>@{userProfileInfo.username}</UserName>
                <Name>{userProfileInfo.full_name}</Name>
                <FollowersRow>
                <Count onClick={() => setShowFollowersModal(!showFollowersModal)} >{followerCount}  Followers</Count>
                <Count onClick={() => setShowFollowingModal(!showFollowingModal)}>{userProfileInfo.following.length- 1} Following</Count>
                </FollowersRow>
            </ProfileVitals>
                {isCurrentUser ?
                    <>
                        <ButtonText1 onClick={ToggleMyPosts} selectedTool={selectedTool}>My Posts</ButtonText1>
                        <ButtonText2 onClick={ToggleSaved} selectedTool={selectedTool}>Saved</ButtonText2>    
                    </>
                    :
                    <>
                        <SelectedButton>@{userProfileInfo.username} Posts</SelectedButton>
                        {currentUser && 
                        <>
                         { isFollower ? 
                        <FollowOrUnFollowButton 
                        style={{ backgroundColor: '#5B618A' }}
                        onClick={handleUnfollowClick}>
                            Unfollow
                        </FollowOrUnFollowButton> 
                         :
                         <FollowOrUnFollowButton onClick={handleFollowClick}>
                            Follow
                        </FollowOrUnFollowButton> 
                         }
                        </>
                        }
                    </>
                }
            
        </MainProfileDiv>
            }
        <Line></Line>        
    </LeftHandSide>

    {showFollowersModal && <FollowersModal followers={followersOfProtofolio} showFollowersModal={showFollowersModal} setShowFollowersModal={setShowFollowersModal}/>}
    {showFollowingModal && <FollowingModal followings={followingsOfProtofolio} showFollowingModal={showFollowingModal} setShowFollowingModal={setShowFollowingModal}/>}
    </>
  )
}

const LeftHandSide = styled.div`
display: flex;
padding-top: 2vw;
top: 5vw;
flex-direction: column;
// z-index: 1;
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
background-color: #F8F8F8;
border: 0.1vw solid gainsboro;
border-radius: 100%;
justify-content: center;
align-items: center;
display: flex;
img{
    width: 4vw;
    height: 4vw;
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
const SelectedButton = styled.text`
margin-right: 2vw;
font-size: 1vw;
text-decoration: underline;
text-underline-offset: 0.5vw;
text-decoration-thickness: 0.05vw;
text-decoration-color: dodgerblue;
text-decoration-thickness: 0.05vw;
font-weight: 600;
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

const FollowOrUnFollowButton = styled.button`
padding: 0.625vw 0.625vw;
font-size: 1.25vw;
background-color: #FE5F55;
color: white;
border: none;
border-radius: 0.625vw;

&:hover{
    transform: scale(1.02);
    cursor: pointer;
}
`

export default ProfileSection