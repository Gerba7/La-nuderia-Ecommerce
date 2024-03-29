import styled from "styled-components";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';


const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    position: fixed; //////
    z-index: 14;
    background-color: rgba(255, 255, 255, 0.7);
    color: black;
    justify-content: center;
    align-items: center;
`



const Loading = () => {
  return (
    <Container>
        <Stack sx={{ color: '#216E8C', display: 'flex', justifyContent: 'center' }} spacing={2} direction="row">
            <CircularProgress color="inherit" />
        </Stack>
    </Container>
  )
}

export default Loading;