import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState, useEffect } from 'react';
import Cover1 from '../images/la_nuderia_tapices_portada.jpg';
import Cover2 from '../images/la_nuderia_portada1.jpg';
import Cover3 from '../images/la_nuderia_cortinas_portada.jpg';
import { SliderItems } from '../data';
import styled, { keyframes } from 'styled-components';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';



const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: ${props => props.direction === 'left' && '40px'};
    right: ${props => props.direction === 'right' && '40px'};
    cursor: pointer;
    opacity: 0.3;
    z-index: 4;
    ${mobile({ display: 'none' })}

    &:hover {
        opacity: 1;
    }
`

const Resize = keyframes`
    0% {scale: 1.2; opacity: 0}
    100% {scale: 1; opacity: 1}
`

const Slide = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    z-index: 2;
    animation-name: ${props => props.res === 'resize' ? Resize : 'none'};
    animation-duration: 3s;
    transition: ease 1000ms;
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
    //background: rgb(0,19,25);
    //background: radial-gradient(circle, rgba(0,19,25,0.7035189075630253) 0%, rgba(0,0,0,0.5410539215686274) 56%, rgba(224,244,252,0) 100%);
    background: rgb(0,19,25);
    background: linear-gradient(90deg, rgba(0,19,25,0.7035189075630253) 0%, rgba(0,0,0,0.5410539215686274) 56%, rgba(224,244,252,0) 100%);
    ${mobile({ textAlign: 'center' })}
`

const Title = styled.h1`
    font-size: 70px;
    ${mobile({ fontSize: '50px' })}
`

const Description = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
    ${mobile({ fontSize: '15px' })}
`

const ButtonLink = styled(Link)`
    padding: 15px 10px 10px 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
    color: #fff;
    border: 1px solid #fff;
    text-decoration: none;

    &:hover {
        background-color: #fff;
        color: #000;
    }

    ${mobile({ fontSize: '16px' })}
`

const DotsContainer = styled.div`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    bottom: 20px;
    height: 40px;
    z-index: 8;
    background-color: 'transparent';
    width: 100%;
`

const Dot = styled.div`
    display: inline-block;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    cursor: pointer;
    margin: 0px 15px;
    background-color: ${props => props.active === true ? 'darkgray' : '#fff'};

`




const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0);

    

    const handleClick = (direction) => {

        if(direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : items.length - 1)
        } else {
            setSlideIndex(slideIndex < items.length - 1 ? slideIndex + 1 : 0)
        }

    }

    const carouselScroll = () => {

        if (slideIndex === items.length - 1) {
            return setSlideIndex(0)
        }
        
        return setSlideIndex(slideIndex + 1)
    }


    useEffect(() => {
        
        const interval = setInterval(() => {carouselScroll()}, 5000)

        return () => clearInterval(interval)

    }, [slideIndex])
    


    const items = [
        {
            id: 1,
            description: "Diseños en macramé",
            img: Cover1, //'https://firebasestorage.googleapis.com/v0/b/la-nuderia.appspot.com/o/Home%20F%202.jpg?alt=media&token=5d1f8046-c337-48cd-ba34-e1df2f94c609',
            title: 'TAPICES',
            button: 'COMPRAR AHORA',
            link: '/products/tapices'
        },
        {
            id: 2,
            description: "Aprende a diseñar tus propios modelos",
            img: Cover2,//'https://firebasestorage.googleapis.com/v0/b/la-nuderia.appspot.com/o/Home%20F%201.JPG?alt=media&token=95a797b6-601a-4e91-b98d-91223e4dae3b',
            title: 'CURSOS',
            button: 'APRENDER AHORA',
            link: '/classes'
        },
        {
            id: 3,
            description: "Diseños en macramé",
            img: Cover3, //'https://firebasestorage.googleapis.com/v0/b/la-nuderia.appspot.com/o/Tapices.jpg?alt=media&token=515273f1-1ae8-4185-af89-4237b82aeb7e',
            title: 'CORTINAS',
            button: 'COMPRAR AHORA',
            link: '/products/cortinas'
        }
    ]
    
  return (
    <Container>
        <Arrow direction="left" onClick={() => handleClick("left")}>
            <KeyboardArrowLeftIcon />
        </Arrow>
        <Wrapper >
            {items.map((item, index) => (
                <Slide key={index} style={{ transform: `translate(-${slideIndex * 100}%)`}} res={index === 0 ? 'resize' : 'none'}>
                    <Background>
                        {item.img ? <BackgroundImg src={item.img} res={index === 0 ? 'resize' : 'none'} alt={item.alt} /> : <Skeleton variant="rectangular" width='100%' height='100%' />}
                    </Background>
                    <Wrapper>
                        <Jumbotron>
                            <ImgContainer>
                            </ImgContainer>
                            <InfoContainer>
                                <Title>{item.title}</Title>
                                <Description>{item.description}</Description>
                                <ButtonLink to={item.link}>{item.button}</ButtonLink>
                            </InfoContainer>
                        </Jumbotron>
                    </Wrapper>
                </Slide>
            ))}
        </Wrapper>
        <Arrow direction="right" onClick={() => handleClick("right")}>
            <KeyboardArrowRightIcon />
        </Arrow>
        <DotsContainer>
            {items.map((_, idx) => (
                <Dot key={idx} onClick={() => setSlideIndex(idx)} active={slideIndex === idx ? true : false}/>
            ))}
        </DotsContainer>
    </Container>
  )
}

export default Slider;