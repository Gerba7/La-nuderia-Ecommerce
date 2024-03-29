import { useState } from 'react';
import privateRequest from '../api/axios';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';


const Container = styled.div`
  display: flex;
  width: 85%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  gap: 5vh;
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
  padding: 0vh 1vw;
  width: 6vw;
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
`



const ReplyForm = ({ refreshComments, parentId }) => {

  const [reply, setReply] = useState('');
  const [loading,setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true)

    const commentData = {
        parentComment: parentId,
        reply: reply,
    }

    try {
      const res = await privateRequest.post(`/comments/reply/${parentId}`, commentData);
      setReply('');
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
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
        { loading ? 
        <Button disabled><Stack sx={{ color: 'white', display: 'flex', justifyContent: 'center' }} spacing={0} direction="row"><CircularProgress size="1.5rem" color="inherit" /></Stack></Button>
        : <Button type="submit">Responder</Button> }
      </Form>
    </Container>
  );
};

export default ReplyForm;