import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import BgImg from '../images/background2.jpg';
import { mobile } from '../responsive';


const Resize = keyframes`
    0% {scale: 1.2; opacity: 0}
    100% {scale: 1; opacity: 1}
`


const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    background-color: teal;
    position: relative;
    overflow: hidden;
    z-index: -1;
    animation-name: ${Resize};
    animation-duration: 3s;
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
`

const BackgroundImg = styled.img`
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    background: #232a34;
`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
`

const Jumbotron = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    z-index: 1;
`

const ImgContainer = styled.div`
    display: flex;
    flex: 1;
    height: 80vh;
    justify-content: center;
    ${mobile({ display: 'none' })}
`

const Image = styled.img`
    height: 100%;
    border-radius: 5px;
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
    color: #fff;
    ${mobile({ textAlign: 'center' })}
`

const Title = styled.h1`
    font-size: 70px;
`

const Description = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`

const Button = styled(Link)`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
    color: #fff;
    border: 1px solid #fff;
    text-decoration: none;
`



const HomeSection = () => {
  return (
    <Container>
        <Background>
            <BackgroundImg src={BgImg} alt='Background'/>
        </Background>
            <Wrapper>
                <Jumbotron>
                    <ImgContainer>
                        <Image />
                    </ImgContainer>
                    <InfoContainer>
                        <Title>LA NUDERIA</Title>
                        <Description>DISEÑOS EN MACRAME</Description>
                        <Button to="/products">COMPRAR AHORA</Button>
                    </InfoContainer>
                </Jumbotron>
            </Wrapper>
    </Container>
  )
}

export default HomeSection;