import React from 'react'
import styled from 'styled-components'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Image from 'next/image';
import CreateButton from '../CreateButton';
import RandomUser1 from '../../public/RandomUser1.jpg'
import RandomUser2 from '../../public/RandomUser2.jpg'
import RandomUser3 from '../../public/RandomUser3.jpg'
import RandomUser4 from '../../public/RandomUser4.jpg'

const ProfileSidebar = ({userProfileInfo}) => {
  return (
    <RightHandSide>

        <CreateButton />

            <StatsDiv>
                <StatColumn>
                    <MyStats>Profile Stats</MyStats>
                    <Divider/>
                    <StatsRow><StatLeft>Top Rapper</StatLeft><StatRight>{userProfileInfo.top_posted_rapper}</StatRight></StatsRow>
                    <StatsRow><StatLeft>Posts:</StatLeft><StatRight>{userProfileInfo.post_numbers}</StatRight></StatsRow>
                    <StatsRow><StatLeft>Total upvotes:</StatLeft><StatRight>{userProfileInfo.total_upvotes}</StatRight></StatsRow>
                    <StatsRow><StatLeft>Total downvotes:</StatLeft><StatRight>{userProfileInfo.total_downvotes}</StatRight></StatsRow>
                </StatColumn>
            </StatsDiv>

        <YouMightLikeBox>
            <YouMightLike>You Might Like</YouMightLike>
            <Divider/>
            <AccountColumn>
            <AccountDiv>
                        <ProfilePic><Image src={RandomUser1} alt="Random User 1" /></ProfilePic>
                        <SideColumn>
                            <TopRow>
                                <UserName>jonnyand_usa </UserName>
                            </TopRow>
                            <Name>Jonathan Anderson FSU 2025 </Name>
                        </SideColumn>
                        <FollowButton>Follow</FollowButton>
                    </AccountDiv>
                    <AccountDiv>
                        <ProfilePic><Image src={RandomUser2} alt="Random User 2" /></ProfilePic>
                        <SideColumn>
                            <TopRow>
                                <UserName>Marie_smith1923.1</UserName>
                            </TopRow>
                            <Name>Marie Smith</Name>
                        </SideColumn>
                        <FollowButton>Follow</FollowButton>
                    </AccountDiv>
                    <AccountDiv>
                        <ProfilePic><Image src={RandomUser3} alt="Random User 3" /></ProfilePic>
                        <SideColumn>
                            <TopRow>
                                <UserName>Michael.Frederick</UserName>
                            </TopRow>
                            <Name>Michael George Frederick</Name>
                        </SideColumn>
                        <FollowButton>Follow</FollowButton>
                    </AccountDiv>
                    <AccountDiv>
                        <ProfilePic><Image src={RandomUser4} alt="Random User 4" /></ProfilePic>
                        <SideColumn>
                            <TopRow>
                                <UserName>Xavier Eduardo Lopez</UserName>
                            </TopRow>
                            <Name>Xavier Eduardo Lopez</Name>
                        </SideColumn>
                        <FollowButton>Follow</FollowButton>
                    </AccountDiv>
                    <AccountDiv>
                        <ProfilePic><Image src={RandomUser1} alt="Random User 1" /></ProfilePic>
                        <SideColumn>
                            <TopRow>
                                <UserName>jonnyand_usa</UserName>
                            </TopRow>
                            <Name>Jonathan Anderson FSU 2025</Name>
                        </SideColumn>
                        <FollowButton>Follow</FollowButton>
                    </AccountDiv>
                    <AccountDiv>
                        <ProfilePic><Image src={RandomUser2} alt="Random User 2" /></ProfilePic>
                        <SideColumn>
                            <TopRow>
                                <UserName>Marie_smith1923.1</UserName>
                            </TopRow>
                            <Name>Marie Smith</Name>
                        </SideColumn>
                        <FollowButton>Follow</FollowButton>
                    </AccountDiv>
                    <AccountDiv>
                        <ProfilePic><Image src={RandomUser3} alt="Random User 3" /></ProfilePic>
                        <SideColumn>
                            <TopRow>
                                <UserName>Michael.Frederick</UserName>
                            </TopRow>
                            <Name>Michael George Frederick</Name>
                        </SideColumn>
                        <FollowButton>Follow</FollowButton>
                    </AccountDiv>
                    <AccountDiv>
                        <ProfilePic><Image src={RandomUser4} alt="Random User 4" /></ProfilePic>
                        <SideColumn>
                            <TopRow>
                                <UserName>Xavier Eduardo Lopez </UserName>
                            </TopRow>
                            <Name>Xavier Eduardo Lopez</Name>
                        </SideColumn>
                        <FollowButton>Follow</FollowButton>
                    </AccountDiv> 
                </AccountColumn>      
        </YouMightLikeBox>    

    </RightHandSide>
  )
}

const RightHandSide = styled.div`
left: 71vw;
position: fixed;
flex-direction: column;
padding-top: 2vw;
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
height: 13.5vw;
overflow: scroll;
`
const AccountDiv = styled.div`
display: flex;
padding: 0.5vw 0.5vw;
width: 100%;
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
`

export default ProfileSidebar