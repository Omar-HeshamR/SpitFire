import React from 'react'
import styled from 'styled-components';
import { useStateContext } from '../../context/StateContext';
import { AiOutlineLineChart } from "react-icons/ai";

const YourLiveVotePools = () => {

  const { currentUser, Posts } = useStateContext();

  const liveVotesDemo = [
    {first: "Elon Musk", seconed:"Hillary Clinton", creator:"Patrick Elissi", timeLeft: "1"},
    {first: "Mr.Krabs", seconed:"Morgan Freeman", creator:"Stephen Leshko", timeLeft: "2"},
    {first: "Cardi B", seconed:"Barak Obama", creator:"Stephen Leshko", timeLeft: "5"},
  ]

  return (
    <Section currentUser={currentUser}>
        <Container>

            <Header>
                <Group>
                <Chart />
                <VoteEarningsText>Your Live Vote Pools</VoteEarningsText>
                </Group>
                {currentUser && <ViewFullHistory> View Full History</ViewFullHistory>}
            </Header>

            {currentUser ? <>
              {liveVotesDemo.map((liveVote) => (
              <ALiveVote firstOption={liveVote.first} secondOption={liveVote.seconed} creator={liveVote.creator} remainingTime={liveVote.timeLeft} />
            ))}        
            </> :
            <NeedAuth>Log In or Sign up to start cashin !</NeedAuth>
            }



        </Container>
    </Section>
  )
}

const ALiveVote = ({ firstOption, secondOption, creator, remainingTime }) => {
  return (
    <>
      <FirstBar>
        <span>{firstOption}</span>
        VS
        <span>{secondOption}</span>
      </FirstBar>

      <SecondBar>
        <span>Creator: {creator}</span>
        Remaining time: {remainingTime} days
      </SecondBar>
    </>
  );
};

const Section = styled.section`
  display: flex;
  margin: 1vw 0;
  border-radius: 0.5vw;
  margin-left: 1vw;
  justify-content: center;
  border: 0.1vw solid #5B618A;
  color: #5B618A;
  opacity: ${props => props.currentUser ? '1' : '0.5'};
  cursor: ${props => props.currentUser ? 'defualt' : 'not-allowed'};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  margin: 1vw 0;
`
const Header = styled.div`
  display: flex;
  align-items: center;
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
  cursor: pointer;
`

const VoteEarningsText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5B618A;
  font-size: 1.25vw;
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
const NeedAuth = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: 0.5vw;
font-size: 1vw;
`

export default YourLiveVotePools