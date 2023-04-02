import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { AiTwotoneHeart, AiOutlineClose } from 'react-icons/ai'


const CommentSlider = ({showComments, setShowComments}) => {

   const ModalRef = useRef();

    const handleClose = () => {
        setShowComments(false);
    }


  return (

    <CartWrapper ref={ModalRef}  >

      <Background onClick={() => setShowComments(false)}/>
        <CartContainer>
  
         

            <CommentContainer>
           
          

                <CommentDiv>
                    <Poster>Ryan Joi Hokimi</Poster>
                    <Comment>That was an insane freestyle, I can&apos;t believe he just came up with that on the spot!</Comment>
                    <BottomRow>2 hours ago<HeartIcon/></BottomRow>
                </CommentDiv>

                <CommentDiv>
                    <Poster>Ryan Joi Hokimi</Poster>
                    <Comment>It was clear from the moment they stepped on stage that these two rappers were at the top of their game, each one confident in their ability to dominate the other. The crowd was hyped up, eagerly anticipating the verbal sparring that was about to take place. As the beats dropped and the rhymes started flowing, it was like watching a masterclass in the art of hip-hop, each line more clever and cutting than the last. In the end, there could only be one winner, but both rappers left it all on the stage, proving once again that the battle rap scene is alive and well.</Comment>
                    <BottomRow>1 day ago<HeartIcon/></BottomRow>
                </CommentDiv>

                <CommentDiv>
                    <Poster>Ryan Joi Hokimi</Poster>
                    <Comment>The energy in the room was electric as the two rappers faced off, their rhymes and insults hitting like punches. The crowd cheered and jeered, egging on their favorite MC, while the judges scribbled down notes and deliberated. In the end, it was a close call, but one rapper emerged victorious, leaving the defeated opponent to lick their wounds and plot their comeback.</Comment>
                    <BottomRow>3 days ago<HeartIcon/></BottomRow>
                </CommentDiv>

               

            </CommentContainer> 

            
            <AddComment>Add a comment</AddComment>
                <CommentInput />
                <AddCommentButton>Add Comment</AddCommentButton>
                <Close onClick={handleClose}>Close</Close>

        </CartContainer>

    </CartWrapper>

  )
}

const OpenUp = keyframes`
 0%{
  transform: translatex(30vw)
}
100%{
  transform: translatex(0vw)
}
`

const Background = styled.div`
  width: 66.5vw;
  top: 0;
  left: 0;
  right: 33.5vw;
  bottom: 0;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CartWrapper = styled.div`
    width: 100vw;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    right: 0;
    top: 0;
    z-index: 10;
    transition: all 1s ease-in-out;
`
const CartContainer = styled.div`
    height: 100vh;
    width: 30vw;
    background-color: white;
    float: right;
    padding: 3vw 1.25vw;
    overflow: auto;
    position: relative;
    animation: ${OpenUp} 1.25s ease;
    z-index: 11;
`
const CommentContainer = styled.div`
display: flex;
// width: 100%;
margin-top: 5vw;
height: 21vw;
overflow: scroll;
// margin: auto auto;
justify-content: top;
align-items: center;
// background-color: khaki;
flex-direction: column;
`
const CommentDiv = styled.div`
display: flex;
width: 100%;
// height: 10vw;
// background-color: orange;   
flex-direction: column;
margin-bottom: 2vw;
padding-bottom: 1vw;
border-bottom: 0.1vw solid gainsboro;
`
const Poster = styled.div`
display: flex;
justify-content: center;
align-items: center;
border-radius: 0.25vw;
height: 1.5vw;
font-size: 0.8vw;
padding-left: 0.5vw;
padding-right: 0.5vw;
background-color: #EBEBEB;
margin-right: auto;
color: dimgrey;
`
const Comment = styled.div`
display: flex;
text-align: justify;
// background-color: khaki;
margin-top: 0.25vw;
font-size: 0.9vw;
`
const BottomRow = styled.div`
display: flex;
justify-content: space-between;
font-size: 0.8vw;
// background-color: navajowhite;
margin-top: 0.5vw;
color: dimgrey;
`

const HeartIcon = styled(AiTwotoneHeart)`
height: 100%;

&:hover{
    color: #FE5F55;
    transform: scale(1.1);
}
`
const AddComment = styled.div`
margin-right: auto;
display: flex;
font-size: 0.8vw;
margin-top: 1vw;
margin-bottom: 0.5vw;
`
const CommentInput = styled.textarea`
display: flex;
width: 100%;
height: 8vw;
padding: 0.5vw 0.5vw;
border: 0.1vw solid dimgrey;

&:focus {
    outline: none;
  }
`
const AddCommentButton = styled.button`
display: flex;
width: 100%;
margin-top: 0.5vw;
border: none;
border-radius: 0.5vw;
color: white;
font-size: 2vw;
font-weight: 900;
font-size: 900;
filter: opacity(0.9);
background-color: #FE5F55;
justify-content: center;
align-items: center;
height: 4vw;
&:hover{
    filter: opacity(1);
    transition: ease 1s;
    cursor: pointer;
    transform: scale(0.975);
}

`
const Close = styled.div`
font-size: 1vw;
color: firebrick;
margin-right: auto;
margin-top: 0.25vw;

&:hover{
    cursor: pointer;
}
`

export default CommentSlider