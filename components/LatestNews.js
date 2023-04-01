import React from 'react'
import { BiNews } from "react-icons/bi";
import styled from 'styled-components';
import { TbPointFilled } from "react-icons/tb";



const LatestNews = () => {
  return (
    <Section>
        <Container>
            <Header>
                <StyledBiNews />
                <LatestNewsText>Latest News</LatestNewsText>
            </Header>
            <NewsParagraph><p>➤ Omar Omar Omar Omar Omar Omar Omar Omar Omar Omar Omar Omar Omar Omar Omar Omar Omar Omar </p></NewsParagraph>
            <NewsParagraph><p>➤ Omar Omar Omar Omar Omar Omar Omar Omar Omar Omar Omar Omar Omar Omar Omar Omar Omar Omar </p></NewsParagraph>


        </Container>
    </Section>
  )
}

const Section = styled.section`
display: flex;
margin: 1vw 0;
// width: 100%;
border-radius: 0.5vw;
margin-left: 1vw;
// height: 14vw;
// background-color: dodgerblue;
justify-content: center;
align-items: center;
border: 0.1vw solid #5B618A;

`
const Container = styled.div`
display: flex;
flex-direction: column;
// background-color: navajowhite;
width: 95%;
// height: 85%;    
margin: 1vw 0;
`
const Header = styled.div`
display: flex;
justify-content: left;
align-items: center;
width: 100%;
height: 2vw;
// background-color: orange;
`
const LatestNewsText = styled.div`
display: flex;
justify-content: center;
align-items: center;
color: #0A0A0A;
font-size: 1.75vw;
font-weight: 900;
`

const StyledBiNews = styled(BiNews)`
  color: #0A0A0A;
  font-size: 2vw;
  margin-right: 0.5vw;
`

const NewsParagraph = styled.div`
color: #0A0A0A;
font-size: 0.9vw;
// background-color: yellow;
margin-top: 0.5vw;
text-align: justify;
`

const StyledTbPointFilled = styled(TbPointFilled)`
  color: #0A0A0A;
  font-size: 2vw;
  margin-right: 0.5vw;
`

export default LatestNews