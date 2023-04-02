import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Trump from '../public/Trump.png'
import ElonMusk from '../public/ElonMusk.png'
import { FaPlay } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";
import { BiDownvote } from "react-icons/bi";
import { BiUpvote } from "react-icons/bi";

const PostObject = ({PostObject}) => {
  return (
    <>
    <Section>
      <Container>
        <Header>
          <RapperNameLeft>
            <Image src={Trump} alt="Donald J. Trump" /> {PostObject.rapper1_name}
          </RapperNameLeft>
          VS
          <RapperNameRight>
            <Image src={ElonMusk} alt="Elon Musk" /> {PostObject.rapper2_name}
          </RapperNameRight>
        </Header>

        <VideoDiv>
          <iframe width="100%" height="100%" src={PostObject.video_link} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </VideoDiv>

        <BottomBar>
          <BottomLeft>Creator: {PostObject.creator}</BottomLeft>
          <BottomRight>
            <Upvote />
            <VoteCount>{PostObject.upvotes}</VoteCount>
            <Downvote />
            <VoteCount>{PostObject.downvotes}</VoteCount>
            <Comment />
            <ThreeDots />
          </BottomRight>
        </BottomBar>

      </Container>
    </Section>
  </>
  )

}

const Section = styled.section`
margin: 1vw 0;
display: flex;
justify-content: center;
align-items: center;
width: 100%;
// height: 30vw;
// background-color: skyblue;
border-radius: 1vw;
border: 0.1vw solid gainsboro;
box-shadow: 0.2vw 0.2vw 0.2vw gainsboro;
// background: linear-gradient(to bottom, #f5f5f5, white);


&:hover{
  box-shadow: 0.1vw 0.1vw 0.1vw gainsboro;
}
`
const Container = styled.div`
display: flex;
// background-color: moccasin;
// width: 74.5vw;
width: 100%;
// height: 28vw;
// margin: 1vw 0;
flex-direction: column;
`
const Header =  styled.div`
display: flex;
// width: 100%;
border-radius: 1vw 1vw 0vw 0vw;
height: 4vw;

align-items: center;
justify-content: space-between;
// background-color: orange;
font-size: 3vw;
font-weight: 900;
// border-bottom: 0.1vw solid gainsboro;
// background: linear-gradient(to right, #FE5F55, #5B618A);
background-color: #FE5F55;
filter: opacity(0.9);
color: white;
&:hover{
  filter: opacity(1);
  transition: ease 1s;
}

`


const RapperNameLeft = styled.div`
display: flex;
width: 25%;
height: 2vw;
color: white;
// height: 100%;
justify-content: center;
align-items: center;
font-size: 2vw;
font-weight: 900;
img{
  width: 2vw;
  height: 2vw;
  margin-right: 0.5vw;
  // border: 0.2vw solid #5B618A;
  border-radius: 100%;
}
`
const RapperNameRight = styled.div`
display: flex;
width: 25%;
height: 2vw;
color: white;
// height: 100%;

justify-content: center;
align-items: center;
font-size: 2vw;
font-weight: 900;
img{
  width: 2vw;
  height: 2vw;
  margin-right: 0.5vw;
  // border: 0.2vw solid #5B618A;
  border-radius: 100%;
}
`

const VideoDiv = styled.div`
display: flex;
width: 100%;
height: 34vw;
margin: auto auto;
background-color: black;
justify-content: center;
align-items: center;
// margin: 1vw 0;
`
const StyledFaPlay = styled(FaPlay)`
  color: white;
  font-size: 8vw;
`
const BottomBar = styled.div`
display: flex;
width: 100%;
height: 4vw;
align-items: center;
justify-content: space-between;
// background-color: orange;
// border-top: 0.1vw solid gainsboro;
`
const BottomLeft = styled.div`
display: flex;
// width: 50%;
height: 100%;
// background-color: greenyellow;
margin-left: 1vw;
justify-content: center;
align-items: center;
font-size: 1vw;
background-color: #EBEBEB;
height: 2.5vw;
width: 12vw;
border-radius: 0.5vw;
// border: 0.1vw solid gainsboro;
// box-shadow: 0.1vw 0.1vw 0.5vw gainsboro;
color: black;
`
const BottomRight = styled.div`
display: flex;
// width: 50%;
height: 2.5vw;
background-color: #EBEBEB;
// border-radius: 2vw 0vw 0vw 2vw;
margin-right: 1vw;
justify-content: center;
border-radius: 0.5vw;
align-items: center;
// border: 0.1vw solid gainsboro;
// box-shadow: 0.1vw 0.1vw 0.5vw gainsboro;
`
const ThreeDots = styled(BsThreeDotsVertical)`
  color: black;
  font-size: 1.5vw;
  margin-left: 2vw;
  margin-right: 0.5vw;

  &:hover{
    transform: scale(1.01);
    cursor: pointer;
  }
`
const Comment = styled(TfiCommentAlt)`
color: black;
font-size: 1.5vw;
margin-left: 2vw;

&:hover{
  transform: scale(1.01);
  cursor: pointer;
}
`
const Downvote = styled(BiDownvote)`
color: black;
font-size: 1.5vw;
margin-left: 2vw;


&:hover{
  transform: scale(1.01);
  color: firebrick;
  cursor: pointer;

}
`
const Upvote = styled(BiUpvote)`
color: black;
font-size: 1.5vw;
margin-left: 1vw;

&:hover{
  transform: scale(1.01);
  color: green;
  cursor: pointer;
}
`
const VoteCount = styled.div`
display: flex;
font-size: 1vw;
// font-weight: 900;
margin-left: 0.25vw;
`
export default PostObject

/* 
const PostObject = {
   postId = "",
   creator = "",
   rapper1_image = "",
   rapper1_name = "",
   rapper2_image = "",
   rapper2_name = "",
   video_link = "",
   view_count = "",
   upvotes = "",
   downvotes = "",
   comments = "",
}
*/