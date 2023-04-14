import React from 'react'
import styled from 'styled-components'

const CommentObject = ({comment}) => {
  return (
    <Section>
        {comment.content}
        <CreatorRow>
            - @{comment.commenter}
        </CreatorRow>
    </Section>
  )
}

const Section = styled.section`
    display: flex;
    flex-direction: column;
    margin-bottom: 1vw;
    padding: 1vw;
    background-color: #FAFAFA;
    box-shadow: 0 0.1vw 0.2vw rgba(0, 0, 0, 0.2);
`

const CreatorRow = styled.div`
    display: flex;
    width: 100%;
    height: 1vw;
    align-items: center;
    color: #5B618A;
    justify-content: flex-end;
`

export default CommentObject