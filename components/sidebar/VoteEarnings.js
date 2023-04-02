import React from 'react'
import { BiNews } from "react-icons/bi";
import styled from 'styled-components';
import { AiOutlineLineChart } from "react-icons/ai";

const VoteEarnings = () => {
  return (
    <Section>
        <Container>
            <Header>
                <Group>
                <Chart />
                <VoteEarningsText>Vote Earnings</VoteEarningsText>
                </Group>

                <ViewFullHistory> View Full History</ViewFullHistory>
            
            </Header>

            <FirstBar>
                <span>Donald Trump</span>
                VS
                <span>Elon Musk</span>
            </FirstBar>

            <SecondBar>
                <span>Creator: Ryan Hokimi</span>
                <Green>+500.00</Green>
            </SecondBar>

            <FirstBar>
                <span>Squidward</span>
                VS
                <span>Cardi B</span>
            </FirstBar>

            <SecondBar>
                <span>Creator: Stephen Leshko</span>
                <Red>-120.00</Red>
            </SecondBar>
          
            <FirstBar>
                <span>Barack Obama</span>
                VS
                <span>Taylor Swift</span>
            </FirstBar>

            <SecondBar>
                <span>Creator: John Smith</span>
                <Green>+270.00</Green>
            </SecondBar>


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
  border: 0.1vw solid #5B618A;
  color: #5B618A;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  margin: 1vw 0;
`
const Header = styled.div`
  display: flex;
//   align-items: center;
  height: 2vw;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 0.9vw;
  
`
const Group = styled.div`
  display: flex;
`
const ViewFullHistory = styled.div`
  display: flex;
  border-bottom: 0.05vw solid #5B618A;
`

const VoteEarningsText = styled.div`
  color: #5B618A;
  font-size: 1.5vw;
`

const Chart = styled(AiOutlineLineChart)`
  color: #5B618A;
  font-size: 2.25vw;
  margin-right: 0.5vw;
`

const FirstBar = styled.div`
display: flex;
// background-color: orange;
justify-content: space-between;
align-items: center;
// height: 2vw;
margin-top: 1vw;
font-weight: 900;
`
const SecondBar = styled.div`
display: flex;
// background-color: khaki;
justify-content: space-between;
align-items: center;
// height: 2vw;
font-size: 1vw;
`
const Green = styled.div`
color: green;
font-weight: 900;
`
const Red = styled.div`
color: firebrick;
font-weight: 900;
`


export default VoteEarnings