import React, {useEffect, useState, useRef} from 'react'
import styled from 'styled-components'
import Navbar from '../../components/Navbar'
import Feed from "../../components/Feed"
import { useRouter } from 'next/router'
import { database } from "../../library/firebase"
import { ref, get, child } from "firebase/database";
import { useStateContext } from '../../context/StateContext';
import ProfileSection from '../../components/ProfileComponents/ProfileSection'
import ProfileSidebar from '../../components/ProfileComponents/ProfileSidebar'

const UserProfile = ({ userProfileInfo }) => {

    const { currentUser, Posts, getPosts } = useStateContext();
    const isCurrentUser = Boolean(currentUser && (currentUser.displayName == userProfileInfo.username) );
    const [ FeedFilter, setFeedFilter ] = useState(undefined)
    const [ selectedTool, setSelectedTool ] = useState("My Posts")
    const router = useRouter();

    useEffect(() => {
      getPosts()
    },[]);
    
    useEffect(() => {
      getWhichFeedTypeToDisplay()
    }, [currentUser, userProfileInfo, FeedFilter, selectedTool])

    function getWhichFeedTypeToDisplay(){
      if(isCurrentUser && selectedTool == "Saved"){
        setFeedFilter("Saved")
      }else{
        setFeedFilter(userProfileInfo.username)
      }
    }

  return (
    <>
    <Navbar />
    <Section>

        <LeftColumn>

            <ProfileSection userProfileInfo={userProfileInfo} isCurrentUser={isCurrentUser}
            selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>

              <PostColumn > 
                <Feed FeedFilter={FeedFilter} />
              </PostColumn>

        </LeftColumn>   

        <ProfileSidebar userProfileInfo={userProfileInfo} isCurrentUser={isCurrentUser}
            selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
        
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