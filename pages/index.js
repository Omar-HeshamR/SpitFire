import React, { useEffect } from "react"
import { useStateContext } from '../context/StateContext';
import Navbar from "@/components/Navbar"
import Feed from "@/components/Feed"
import Sidebar from "@/components/Sidebar"
import styled from "styled-components"

export default function Home() {

  const { getPosts } = useStateContext();

  useEffect(() => {
    getPosts()
  },[]);

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
  // box-shadow: inset 0px 0px 10px #5B618A;
  // background-color: coral;
`

