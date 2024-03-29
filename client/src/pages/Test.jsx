import styled, { keyframes } from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import SearchBar from "../components/SearchBar";


const Resize = keyframes`
    0% {scale: 1.2; opacity: 0}
    100% {scale: 1; opacity: 1}
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    
`


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    animation-name: ${Resize};
    animation-duration: 3s;
`




const Test = () => {


  return (
    <Container>
        <Navbar />
        <Wrapper>
            <SearchBar />
        </Wrapper>
        <Newsletter />
        <Footer />
    </Container>
  )
}

export default Test;