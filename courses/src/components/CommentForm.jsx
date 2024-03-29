import { useState } from 'react';
import privateRequest from '../api/axios';
import styled from 'styled-components';
import { mobile } from '../responsive';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';


const Container = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5vh;
  margin-bottom: 3vh;
  ${mobile({width: '90%'})}
`


const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
`

const TextArea = styled.textarea`
  width: 100%;
  height: 2vh;
  padding: 2vh 1vw;
  font-size: 16px;
  border: 1px solid lightgray;
`

const Button = styled.button`
  width: 10vw;
  padding: 0vh 1vw;
  background-color: #216E8C;
  border-radius: 0px 3px 3px 0px;
  border: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: transparent;
    border: 1px solid #216E8C;
    color: #216E8C;
  }
  
  ${mobile({width: '20vw'})}
`



const CommentForm = ({ courseId, refreshComments }) => {

  const [comment,setComment] = useState('');
  const [loading,setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true)

    const commentData = {
        course: courseId,
        comment: comment,
    }

    try {
      const res = await privateRequest.post('/comments/new-comment', commentData);
      setComment('');
      refreshComments(res.data);
      setLoading(false)
    } catch (error) {
      console.error('Error posting comment:', error);
      setLoading(false)
    }

  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <TextArea
          rows="4"
          cols="50"
          placeholder="Escribí tu consulta"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        { loading ? 
        <Button disabled><Stack sx={{ color: 'white', display: 'flex', justifyContent: 'center' }} spacing={0} direction="row"><CircularProgress size="1.5rem" color="inherit" /></Stack></Button>
        : <Button type="submit">Consultar</Button>
        }
      </Form>
    </Container>
  );
};

export default CommentForm;