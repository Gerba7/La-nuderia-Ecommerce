import styled from "styled-components";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { mobile } from "../responsive";


const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    z-index: 20;
    background-color: rgba(255, 255, 255, 0.7);
    position: absolute;
    color: black;
    justify-content: center;
    align-items: center;
    ${mobile({position: 'fixed', overflowX: 'hidden'})}
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