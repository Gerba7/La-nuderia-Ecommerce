import Carousel from 'react-material-ui-carousel';
import BgImg from '../images/background2.jpg';
import styled, { keyframes } from 'styled-components';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';



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


const CarouselComponent = (props) => {

    const items = [
        {
            name: "#1",
            description: "DISEÑOS EN MACRAME",
            img: 'https://firebasestorage.googleapis.com/v0/b/la-nuderia.appspot.com/o/background2.jpg?alt=media&token=0dbfc87e-1620-493a-8d31-e5c9b44247d6',
            title: 'LA NUDERIA',
            button: 'COMPRAR AHORA',
            link: '/products'
        },
        {
            name: "#2",
            description: "Aprende a disenar tus propios modelos",
            img: 'https://firebasestorage.googleapis.com/v0/b/la-nuderia.appspot.com/o/1675915520620bolso.jpg?alt=media&token=c86daa4f-324d-4933-bbc2-a81fb66ed11e',
            title: 'CURSOS',
            button: 'APRENDER AHORA',
            link: ''
        }
    ]

    return (
        <Carousel 
            autoPlay 
            indicatorContainerProps={{ style: { background: 'transparent', marginTop: "0px", display: 'flex', position: 'absolute', bottom: '30px', zIndex: 3, justifyContent: 'center' } }}
            indicatorIconButtonProps={{ style: { margin: '0px 10px', color: '#fff', border: '1px solid black' } }}
            activeIndicatorIconButtonProps={{ style: { color: 'blue' } }}
        >
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}


const Item = (props) => {

    return (
        <Container>
            <Background>
                <BackgroundImg src={props.item.img} />
            </Background>
            <Wrapper>
                <Jumbotron>
                    <ImgContainer>
                        <Image alt='caousel'/>
                    </ImgContainer>
                    <InfoContainer>
                        <Title>{props.item.title}</Title>
                        <Description>{props.item.description}</Description>
                        <Button to={props.item.link}>{props.item.button}</Button>
                    </InfoContainer>
                </Jumbotron>
            </Wrapper>
        </Container>
    )

}

export default CarouselComponent;