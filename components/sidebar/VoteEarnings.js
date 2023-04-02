import React from 'react'
import { BiNews } from "react-icons/bi";
import styled from 'styled-components';
import { AiOutlineLineChart } from "react-icons/ai";

const VoteEarnings = () => {
  return (
    <Section>
        <Container>
            <Header>
                <Chart />
                <LatestNewsText>Vote Earnings</LatestNewsText>
            </Header>

          


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
`
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
`
const LatestNewsText = styled.div`
  color: #5B618A;
  font-size: 1.5vw;
`

const Chart = styled(AiOutlineLineChart)`
  color: #5B618A;
  font-size: 2.25vw;
  margin-right: 0.5vw;
`

export default VoteEarnings