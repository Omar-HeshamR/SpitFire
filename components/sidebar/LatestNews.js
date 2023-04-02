import React from 'react'
import { BiNews } from "react-icons/bi";
import styled from 'styled-components';
import { AiOutlineLineChart } from "react-icons/ai";

const LatestNews = () => {
  return (
    <Section>
        <Container>
            <Header>
                <StyledBiNews />
                <LatestNewsText>Latest News</LatestNewsText>
            </Header>
            <NewsParagraph><p>➤ Recently, Joe Biden versus Donald Trump has been highly trending, pulling over 17 Billion Views.</p></NewsParagraph>
            <NewsParagraph><p>➤ The best preforming rapper of the week has been awarded to Shrek, winning over 5 thousand rap battles.</p></NewsParagraph>
            <NewsParagraph><p>➤ The biggest earner of last week won 19,000 rap tokens, with majority of his votes for Saddam Hussien.</p></NewsParagraph>
            <NewsParagraph><p>➤ Barack Obama is the slow-rising MC! While not as popular, he has been gaining trackion due to recent victories.</p></NewsParagraph>

        </Container>
    </Section>
  )
}

const Section = styled.section`
  display: flex;
  margin: 1vw 0;
  border-radius: 0.5vw;
  margin-left: 1vw;
  justify-content: center;
  align-items: center;
  padding: 0.1vw;
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
  color: #5B618A;
  font-size: 1.5vw;
`

const StyledBiNews = styled(BiNews)`
  color: #5B618A;
  font-size: 2.25vw;
  margin-right: 0.5vw;
`

const NewsParagraph = styled.div`
  color: #5B618A;
  font-size: 0.9vw;
  // background-color: yellow;
  margin-top: 0.5vw;
  text-align: justify;
`

export default LatestNews