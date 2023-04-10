import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Navbar from '../../components/Navbar'
import SearchIcon from '../../public/SearchIcon.png'
import Image from 'next/image'
import Feed from "../../components/Feed"
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

              <PostColumn>
                <Feed />
              </PostColumn>

        </LeftColumn>   

        <ProfileSidebar userProfileInfo={userProfileInfo}/>
        
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
// background-color: orange;
`
const PostColumn = styled.div`
margin-left: 2.5vw;
margin-right: 1vw;
width: 66.5vw;
`

export default UserProfile