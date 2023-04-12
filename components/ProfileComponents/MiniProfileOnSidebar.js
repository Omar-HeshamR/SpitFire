import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Image from 'next/image'
import { useStateContext } from '@/context/StateContext'
import { getFollowers, getFollowings, addFollower, removeFollower, 
    checkIfUserIsAfollower, removeFollowing, addFollowing } from '@/functionalities/userFunctions'
import FollowersModal from '@/components/ProfileComponents/FollowersModal'
import FollowingModal from '@/components/ProfileComponents/FollowingModal'
import TestProfilePic from '../../public/defualt_profile_image.png'

const MiniProfileOnSidebar = ({userProfileInfo, isCurrentUser, selectedTool, setSelectedTool}) => {

    const { currentUser } = useStateContext()
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

      const truncateString = (str) => (str.length > 15 ? str.slice(0, 25) + "..." : str);

  return (
    <>
    <Container>
                    { userProfileInfo &&
        <>
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
                    <ButtonsContainer>
                        <ButtonText1 onClick={ToggleMyPosts} selectedTool={selectedTool}>My Posts</ButtonText1>
                        <ButtonText2 onClick={ToggleSaved} selectedTool={selectedTool}>Saved</ButtonText2>    
                    </ButtonsContainer>
                    :
                    <>
                        <SelectedButton>user posts</SelectedButton>
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
            
        </>
            }

    </Container>

        <Line></Line>        
            {showFollowersModal && <FollowersModal followers={followersOfProtofolio} showFollowersModal={showFollowersModal} setShowFollowersModal={setShowFollowersModal}/>}
            {showFollowingModal && <FollowingModal followings={followingsOfProtofolio} showFollowingModal={showFollowingModal} setShowFollowingModal={setShowFollowingModal}/>}
    
    </>
  )
}

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 5vw;
    align-items: center;
    // background-color: red;
`

const ProfileIcon = styled.div`
    width: 5.5vw;
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
    margin-left: 0.75vw;
    flex-direction: column;
`
const UserName = styled.text`
    font-size: 1.25vw;
    margin-bottom: 0.15vw;
`
const Name = styled.text`
    font-size: 0.75vw;
    margin-bottom: 0.15vw;
    color: dimgrey;
`
const FollowersRow = styled.div`
    display: flex;
    width: 7vw;
    justify-content: space-between;
    font-size: 0.65vw;
`
const Count = styled.div`
&:hover{
    cursor: pointer;
    font-weight: 900;
}
`
const ButtonText1 = styled.text`
    font-size: 0.75vw;
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
    // margin-left: 1vw;
    font-size: 0.75vw;
    text-decoration: underline;
    text-underline-offset: 0.5vw;
    text-decoration-thickness: 0.05vw;
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
const ButtonsContainer = styled.div`
    display: flex;
    width: 6vw;
    justify-content: space-between;
    margin-left: auto;
`

const SelectedButton = styled.text`
    display: flex;
    margin-left: auto;
    font-size: 0.75vw;
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
    height: 0.15vw;
    background-color: gainsboro;
    margin-top: 1vw;
    margin-bottom: 1vw;
`

const FollowOrUnFollowButton = styled.button`
padding: 0.25vw 0.25vw;
font-size: 0.75vw;
background-color: #FE5F55;
margin-left: 1vw;
color: white;
border: none;
border-radius: 0.325vw;
cursor: pointer;
opacity: 0.8;

&:hover{
    opacity: 1;
}

`
const Column = styled.div`
    display: flex;
    flex-direction: column;
    background-color: red;
    height: 100%;
    justify-content: center;
    align-items: center;
`


export default MiniProfileOnSidebar