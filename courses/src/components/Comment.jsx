import { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ReplyIcon from '@mui/icons-material/Reply';
import ReplyForm from '../components/ReplyForm';
import { mobile, tablet2 } from '../responsive';



const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: 1px solid lightgray;
  border-radius: 10px;
  width: 100%;
  position: relative;
  padding: 2vh 1vw;
  gap: 1vh;
  word-wrap: break-word; /* Add word-wrap to wrap long words */
  ${mobile({width: '90%', padding: '3vh 3vw'})}
  ${tablet2({width: '90%', padding: '3vh 3vw'})}
`

const CommentText = styled.p`
  display: flex;

`

const CommentTime = styled.p`
  position: absolute;
  top: 1vh;
  right: 1vh;
  color: darkgray;
  ${mobile({fontSize: '14px'})}
  
  ${tablet2({fontSize: '14px'})}
`

const ShowReplies = styled.div`
  position: absolute;
  bottom: 1vh;
  right: 50%;
  color: #216E8C;
  cursor: pointer;
  transform: translateX(50%);

  &:hover {
    text-decoration: underline;
  }
`

const ReplyButton = styled.button`
  display: flex;
  width: 12%;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: darkgray;

  &:hover {
    text-decoration: underline;
  }
`

const ReplyContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.5vh;
`

const Paragraph = styled.p`
  ${mobile({display: 'none'})}
  
  ${tablet2({display: 'none'})}
`






const Comment = ({comment, refreshComments}) => {

  const [replying, setReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  
    return (
        <>
        <CommentContainer key={comment?._id}>
            <CommentText><b>{comment?.user?.name}:</b></CommentText>
            <CommentText>{comment?.comment}</CommentText>
            <ReplyButton onClick={() => setReplying(!replying)}><ReplyIcon sx={{fontSize: '16px', marginRight: '2px'}} /> <Paragraph>Responder</Paragraph></ReplyButton>
            { comment?.replies?.length > 0 ? <ShowReplies onClick={() => setShowReplies(!showReplies)}>Mostrar respuestas</ShowReplies> : <></> }
            <CommentTime>{moment(comment?.createdAt).format('DD/MM/YYYY')}</CommentTime>
        </CommentContainer>
        <ReplyContainer>
            { showReplies ?
            <>
                {comment.replies.map(reply => (
                <CommentContainer style={{backgroundColor: 'rgba(33, 110, 140, 0.048)', width: '80%', alignSelf: 'flex-end', marginRight: '1vw'}} key={reply?._id}>
                    <CommentText><b>{reply?.user?.name}:</b></CommentText>
                    <CommentText>{reply?.comment}</CommentText>
                    <CommentTime>{moment(reply?.createdAt).format('DD/MM/YYYY')}</CommentTime>
                </CommentContainer>
                ))}
            </>
            :
            <></>
            }
            {replying && (
                <ReplyForm parentId={comment._id} refreshComments={refreshComments} />
            )}
        </ReplyContainer>
        </>
    )
}


export default Comment;