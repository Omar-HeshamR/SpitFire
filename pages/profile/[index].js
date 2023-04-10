import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Navbar from '../../components/Navbar'
import SearchIcon from '../../public/SearchIcon.png'
import Image from 'next/image'
import PostObject from '../../components/PostObject'
import { useRouter } from 'next/router'
import { database } from "../../library/firebase"
import { ref, set, get, child, onValue } from "firebase/database";
import { useStateContext } from '../../context/StateContext';
import ProfileSection from '../../components/ProfileComponents/ProfileSection'
import ProfileSidebar from '../../components/ProfileComponents/ProfileSidebar'

const UserProfile = ({ userProfileInfo }) => {

    const { currentUser, Posts } = useStateContext();
    const isCurrentUser = Boolean(currentUser && (currentUser.displayName == userProfileInfo.username) );
    const router = useRouter();

  return (
    <>
    <Navbar />
    <Section>
        <LeftColumn>
            <ProfileSection userProfileInfo={userProfileInfo} isCurrentUser={isCurrentUser}/>
                <SearchBar>
                    <Input placeholder= "Search a particular rap battle..."/>
                    <SearchButton><Image src={SearchIcon} alt="Search Icon"/></SearchButton>
                </SearchBar>
            <PostColumn>
                {Posts ? <>
                {Posts.map((post) => (
                <PostObject key={post.id} PostObject={post}/>
                ))}
                </>: 
                <>
                loading...
                </>
                }
            </PostColumn>
        </LeftColumn>          
        <ProfileSidebar />
    </Section>
    </>
  )
}

async function getUserProfileInfo(username){
  const dbRef = ref(database);
  const response = await get(child(dbRef, `users/${username}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } 
  }).catch((error) => {
    console.error(error);
  });
  return response
}

export async function getServerSideProps(context) {
  const { index } = context.query;
  const userProfileInfo = await getUserProfileInfo(index);

  return {
    props: {
      userProfileInfo
    }
  }
}


const Section = styled.section`
display: flex;
`
const LeftColumn = styled.div`
`
const PostColumn = styled.div`
margin-left: 2.5vw;
margin-right: 1vw;
width: 66.5vw;
`
const SearchBar = styled.div`
height: 2.5vw;
width: 66.5vw;
display: flex;
border: 0.1vw solid gainsboro;
border-radius: 2.5vw;
margin-left: 2.5vw;
`
const Input = styled.input`
width: 100%;
margin-left: 1.25vw;
font-size: 1vw;
border: none;
color: black;
&:focus,
&:active {
  outline: none;
}
&::placeholder {
  color: grey;
}
`
const SearchButton = styled.div`
width: 4vw;
background-color: grey;
display: flex;
justify-content: center;
align-items: center;
opacity: 0.9;
border-radius: 0vw 1.5vw 1.5vw 0vw;
&:hover{
  cursor: pointer;
  opacity: 1;
}
img{
  filter: invert(1);
  width: 1.3vw;
  height: 1.3vw;
}
`
export default UserProfile