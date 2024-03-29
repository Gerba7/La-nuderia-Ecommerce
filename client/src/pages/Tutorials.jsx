import styled, { keyframes } from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import BgImg from "../images/background3.jpg";
import { mobile } from "../responsive";
import { useDispatch } from "react-redux";
import { orderEmail } from "../redux/requests";



const Resize = keyframes`
    0% {scale: 1.2; opacity: 0}
    100% {scale: 1; opacity: 1}
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    
`

const Background = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
    opacity: 0.3;
    
`

const BackgroundImg = styled.img`
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    background: #232a34;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    animation-name: ${Resize};
    animation-duration: 3s;

    
    ${mobile({ width: '90%' })}
`

const Title = styled.h1`
    font-size: 60px;
    margin: 20px;
    text-align: center;
    margin-bottom: 40px;
    ${mobile({ fontSize: '40px' })}
`

const Subtitle = styled.p`
    font-size: 35px;
    margin-bottom: 40px;
    text-align: center;
    ${mobile({ fontSize: '20px' })}
`

const Description = styled.p`
    font-size: 20px;
    text-align: center;
    ${mobile({ fontSize: '16px' })}
`

const Button = styled.button`
    display: flex;
`


const Tutorials = () => {



  return (
    <Container>
        <Navbar />
        <Wrapper>
            <Background>
                <BackgroundImg src={BgImg} alt='tutorials'/>
            </Background>
            <Content>
                <Title>PROXIMAMENTE</Title>
                <Subtitle>Vas a poder hacer modelos propios desde tu casa con los tutoriales gratuitos.</Subtitle>
                <Description>Anotate en nuestro newsletter y recibí novedades!!!</Description>
            </Content>
        </Wrapper>
        <Newsletter />
        <Footer />
    </Container>
  )
}

export default Tutorials;