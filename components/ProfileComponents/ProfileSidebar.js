import React, {useEffect, useState, useRef} from 'react'
import styled, { keyframes } from 'styled-components'
import MiniProfileOnSidebar from './MiniProfileOnSidebar';
import CreateButton from '../CreateButton';

const ProfileSidebar = ({userProfileInfo, isCurrentUser, selectedTool, setSelectedTool}) => {

    const [ Ylocation, setYlocation ] = useState(0)

    useEffect(() => {
      function handleScroll() {
        setYlocation(window.scrollY)
      }
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <RightHandSide>
        <Container>
        {Ylocation >= 100 && 
        <>
            <MiniProfileOnSidebar  userProfileInfo={userProfileInfo} isCurrentUser={isCurrentUser}
            selectedTool={selectedTool} setSelectedTool={setSelectedTool} /> 
        </>
        }
        
        <CreateButton />

            <StatsDiv>
                <StatColumn>
                    <MyStats>Profile Stats</MyStats>
                    <Divider/>
                    {/* <StatsRow><StatLeft>Top Rapper</StatLeft><StatRight>{userProfileInfo.top_posted_rapper}</StatRight></StatsRow> */}
                    <StatsRow><StatLeft>Posts:</StatLeft><StatRight>{userProfileInfo.post_numbers}</StatRight></StatsRow>
                    <StatsRow><StatLeft>Total upvotes:</StatLeft><StatRight>{userProfileInfo.total_upvotes}</StatRight></StatsRow>
                    <StatsRow><StatLeft>Total downvotes:</StatLeft><StatRight>{userProfileInfo.total_downvotes}</StatRight></StatsRow>
                </StatColumn>
            </StatsDiv>

        {/* <YouMightLikeBox>
            <YouMightLike>You Might Like</YouMightLike>
            <Divider/>
            <AccountColumn>
            <AccountDiv onMouseEnter={ToggleProfile} selectedTool={selectedTool}  onMouseLeave={() => setSelectedTool(false)}>
                        <ProfilePic><Image src={RandomUser1} alt="Random User 1" /></ProfilePic>
                        <SideColumn>
                            <TopRow>
                                <UserName>jonnyand_usa </UserName>
                            </TopRow>
                            <Name>Jonathan Anderson FSU 2025 </Name>
                        </SideColumn>
                        <FollowButton onMouseEnter={ToggleButton} selectedTool={selectedTool}  onMouseLeave={() => setSelectedTool("Profile")}>Follow</FollowButton>
                    </AccountDiv>
                </AccountColumn>      
        </YouMightLikeBox>     */}
        </Container>
    </RightHandSide>
  )
}

const RightHandSide = styled.div`
    left: 71vw;
    width: 29vw;
    position: fixed;
    height: 100%;
    flex-direction: column;
    padding-top: 2vw;
    border-left: 0.2vw ridge gainsboro;
    background-color: #FAFAFA;
`
const Container = styled.div`
  margin-left: 1vw;
  width: 86%;
`

const StatsDiv = styled.div`
margin: 1vw 0;
`
const MyStats = styled.div`
display: flex;
justify-content: center;
font-size: 1.5vw;
font-weight: 900;
color: #5B618A;
`
const StatColumn = styled.div`
padding: 1vw 1vw;
border: 0.1vw solid #5B618A;
border-radius: 0.5vw;
`
const StatsRow = styled.div`
display: flex;
justify-content: space-between;
`
const StatLeft = styled.text`
font-size: 1vw;
color: #5B618A;
`
const StatRight = styled.text`
font-size: 1vw;
font-weight: 900;
color: #FE5F55;
`
const YouMightLikeBox = styled.div`
padding: 1vw 1vw;
border: 0.1vw solid #5B618A;
border-radius: 0.5vw;
`
const YouMightLike = styled.div`
display: flex;
justify-content: center;
font-size: 1.5vw;
font-weight: 900;
color: #5B618A;
`
const Divider = styled.div`
display: flex;
background-color: gainsboro;
width: 100%;
margin: 1vw 0;
height: 0.1vw;
`

const AccountColumn = styled.div`
flex-direction: column;
max-height: 13.5vw;
overflow: scroll;
`
const AccountDiv = styled.div`
display: flex;
padding: 0.5vw 0.5vw;
width: 100%;
align-items: center;

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
    width: 3.5vw;
    height: 3.5vw;
    border-radius: 100%;
}
`
const TopRow = styled.div`
display: flex;
font-weight: 900;
`
const SideColumn = styled.div`
margin-left: 0.5vw;
width: 14vw;
margin-right: 1vw;
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
const FollowButton = styled.button`
padding: 0.5vw 0.5vw;
margin-left: auto;
font-size: 1vw;
background-color: #5B618A;
color: white;
border: none;
border-radius: 0.5vw;

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

export default ProfileSidebar