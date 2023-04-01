import Navbar from "@/components/Navbar"
import Feed from "@/components/Feed"
import Sidebar from "@/components/Sidebar"
import styled from "styled-components"

export default function Home() {
  return (
    <>
      <Navbar />
      <Container>
        <Feed/>
        <Sidebar/>
      </Container>
      
    </>
  )
}

const Container = styled.section`
margin: auto auto;
display: flex;
width: 95%;
height: 100%;
// background-color: coral;
`

