import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import SearchIcon from '../public/SearchIcon.png'
import PostObject from './PostObject'
import { useStateContext } from '../context/StateContext';

const Feed = () => {

  const { currentUser, Posts } = useStateContext();

  return (
    <Section>
      <Container>
        <FeedHeader>
          <SearchBar>
            <Input placeholder= "Search a particular rap battle..."/>
            <SearchButton><Image src={SearchIcon} alt="Search Icon"/></SearchButton>
          </SearchBar>
        </FeedHeader>

        {Posts ? <>
          {Posts.map((post) => (
           <PostObject key={post.id} PostObject={post}/>
        ))}
        </>: 
        <>
        loading...
        </>
        }

      </Container>
    </Section>
  )
}

const Section = styled.section`
width: 67.5vw;
height: 100%;
// background-color: khaki;
display: flex;
justfiy-content: center;
align-items: center;
`
const Container = styled.div`
width: 100%;
height: 100%;
margin-right: 1vw;
// background-color: deepskyblue;
display: flex;
flex-direction: column;
justfiy-content: center;
align-items: center;
`
const FeedHeader = styled.div`
width: 100%;
height: 2.5vw;
// background-color: orange;
display: flex;
justify-content: center;
align-items: center;
margin-top: 1vw;
`


const SearchBar = styled.div`
height: 2.5vw;
width: 100%;
// background-color: aliceblue;
display: flex;
border: 0.1vw solid gainsboro;
border-radius: 2.5vw;
// box-sizing: border-box;

`
const Input = styled.input`
font-size: red;
// background-color: lightcyan;
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
height: 100%;
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



export default Feed