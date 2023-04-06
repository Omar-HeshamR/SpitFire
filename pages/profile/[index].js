import React, {useState} from 'react'
import styled from 'styled-components'
import ProfileNavbar from '../../components/ProfileComponents/ProfileNavbar'
import SearchIcon from '../../public/SearchIcon.png'
import Image from 'next/image'
import PostObject from '../../components/PostObject'
import { useStateContext } from '../../context/StateContext';
import ProfileSection from '../../components/ProfileComponents/ProfileSection'
import ProfileSidebar from '../../components/ProfileComponents/ProfileSidebar'

const UserProfile = () => {

    const { currentUser, Posts } = useStateContext();
    const [ selectedTool, setSelectedTool ] = useState("My Posts");

    function ToggleMyPosts(){
        setSelectedTool("My Posts")
    }
    function ToggleSaved(){
        setSelectedTool("Saved")
    }
    function ToggleFollowers(){
        setSelectedTool("Followers")
        setShowFollowersModal(true)
    }
    function ToggleFollowing(){
        setSelectedTool("Following")
        setShowFollowingModal(true)
    }
    const [ showFollowersModal, setShowFollowersModal] = useState()
    const [ showFollowingModal, setShowFollowingModal] = useState()
  return (
    <>
    <ProfileNavbar />
    <Section>
        <LeftColumn>
            <ProfileSection />
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
        <ProfileSidebar/>
    </Section>
    </>
  )
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