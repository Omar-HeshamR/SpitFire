import React, { useState } from 'react'
import Navbar from '@/components/Navbar';
import styled from 'styled-components'
import { RxExit } from 'react-icons/rx'
import { useRouter } from 'next/router';
import { BsPersonSlash } from 'react-icons/bs';
import { database } from "../../library/firebase"
import { ref, get, child } from "firebase/database";
import { useStateContext } from '@/context/StateContext';
import PostObjectComponent from '@/components/PostObject';
import CommentObject from '@/components/CommentObject';
import { commentOnPost } from '@/functionalities/userFunctions';
import { toast } from 'react-hot-toast';

const PostPage = ({ PostObject }) => {

    const { currentUser } = useStateContext()

  const router = useRouter();
  const [ commentContent, setCommentContent] = useState('');
  const [ loading, setLoading ] = useState(false)
  const [ currentComments, setCurrentComments ] = useState(PostObject.comments);

  const handleCommentContentChange = (e) => {
    setCommentContent(e.target.value);
  };

  async function handleComment(){
    setLoading(true)
    if(currentUser == undefined){
        toast.error(`Must be logged in to comment!`)
        setLoading(false)
        return;
    }
    if(commentContent.length < 3){
        toast.error(`Comment must be at least 3 charctars`)
        setLoading(false)
        return;
    }
    if(commentContent.length >= 300){
        toast.error(`Comment cannot be more than 300 charctars`)
        setLoading(false)
        return;
    }
    const comment = {
        commenter: `${currentUser.displayName}`, 
        content: `${commentContent}`
    }
    try{
    await commentOnPost(PostObject, comment)
    const tempCommentsArray = []
    console.log("CURRENT COMMENTS: ", currentComments)
    if(currentComments){
        console.log("ENTERED")
        for(let i = 0; i < currentComments.length; i++){
            tempCommentsArray.push(currentComments[i])
        }
        console.log("HERE")
    }
    tempCommentsArray.push(comment)
    setCurrentComments(tempCommentsArray)
    toast.success("Commented !")
    setCommentContent('')
    setLoading(false)
    }catch(err){
        setLoading(false)
        toast.error(`Failed to comment !`)
    }
  }

  function goToHomeFeed(){
    router.push("/")
  }

  return (
    <>
        <Navbar />
    
        <Section>
            
            <TopSection>
                <BackToFeedButton onClick={goToHomeFeed}>
                    <ExitIcon />
                     Back to Feed
                </BackToFeedButton>
                <CommentText>
                    Comments
                </CommentText>
            </TopSection>

            <Row>
                <PostContainer>
                    <PostObjectComponent PostObject={PostObject} isPostPage={true}/>
                </PostContainer>

                <Column>
                    <CommentSectionContainer>
                        {currentComments ? currentComments.map((comment) => (
                            <CommentObject comment={comment}/>
                        )) : <NoCommentsContainer>
                            <div>
                                No Comments Yet
                            </div>
                            <PersonIcon />
                        </NoCommentsContainer>}
                    </CommentSectionContainer>
                    <CommentContentInput
                        placeholder='Type Comment here...'
                        value={commentContent}
                        onChange={handleCommentContentChange}
                    />    

                {loading ? <LoadingText>loading...</LoadingText>: 
                <AddCommentButton onClick={handleComment}>Add Comment</AddCommentButton>}
                
                </Column>
            </Row>

        </Section>
    </>
  )
}

async function getPostDetails(id){
    const dbRef = ref(database);
    const response = await get(child(dbRef, `posts/${id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } 
    }).catch((error) => {
      console.error(error);
    });
    return response
}

export async function getServerSideProps(context) {
    const { index } = context.query;
    const PostObject = await getPostDetails(index);
  
    return {
      props: {
        PostObject
      }
    }
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  box-shadow: inset 0 0 10px #5B618A;
  width: 100%;
  height: calc(100vh - 5vw);
  position: fixed;
`
const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 5vw;
  align-items: center;
`

const BackToFeedButton = styled.button`
  display: flex;
  border: 0.25vw groove gainsboro;
  border-radius: 1vw;
  background: none;
  justify-content: space-between;
  align-items: center;
  width: 10vw;
  padding: 0.5vw 1vw;
  margin-left: 2vw;
  font-size: 1vw;
  cursor: pointer;
  &:hover{
    background-color: aliceblue;
    border: 0.25vw solid gainsboro;
    font-weight: 600;
  }
`

const ExitIcon = styled(RxExit)`
  transform: rotateY(180deg);
`

const CommentText = styled.div`
    color: grey;
    letter-spacing: 0.05vw;
    margin-right: 12vw;
    font-size: 1.75vw;
    font-weight: 600;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`
const Column = styled.div`
    display: flex;
    flex-direction: column;
`

const PostContainer = styled.div`
    display: flex;
    padding-left: 2vw;
    padding-right: 2vw;
    height: 34vw;
    width: 70vw;
`

const CommentSectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 1vw;
    width: 28vw;
    height: 25vw;
    overflow-y: auto;
    padding-top: 0.5vw;
    padding-bottom: 1.5vw;
    padding-left: 1.5vw;
    padding-right: 1.5vw;
    background-color: gainsboro;
`

const NoCommentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    font-size: 2vw;
    cursor: not-allowed;
`

const PersonIcon = styled(BsPersonSlash)`
  font-size: 4vw;
  margin-top: 2vw;
`

const CommentContentInput = styled.textarea`
  margin-top: 1vw;
  width: 28vw;
  height: 4vw;
  padding: 0.5vw;
  border-radius: 0.5vw;
  border: 0.15vw solid gainsboro;
  font-size: 1vw;
  resize: none;

  &::placeholder {
    color: #aaa;
    font-style: italic;
  }
  &:focus {
    outline: none;
  }
`;

const AddCommentButton = styled.button`
    display: flex;
    width: 100%;
    margin-top: 0.5vw;
    border: none;
    border-radius: 0.5vw;
    color: white;
    font-size: 1.5vw;
    font-weight: 900;
    filter: opacity(0.9);
    background-color: #FE5F55;
    justify-content: center;
    align-items: center;
    height: 3.5vw;
    &:hover{
        filter: opacity(1);
        transition: ease 1s;
        cursor: pointer;
        transform: scale(0.975);
    }
`

const LoadingText = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 3.5vw;
    font-size: 1.5vw;
` 

export default PostPage