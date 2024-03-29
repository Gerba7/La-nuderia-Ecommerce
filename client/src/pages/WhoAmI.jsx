import styled, { keyframes } from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Cami from "../images/macrame_cami.jpg";
import { mobile, tablet, tablet2 } from "../responsive";



const Resize = keyframes`
    0% {scale: 1.2; opacity: 0}
    100% {scale: 1; opacity: 1}
`

const Opaque = keyframes`
    0% { opacity: 0}
    100% { opacity: 1}
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    
`

const ImgContainer = styled.div`
    display: flex;
    width: 40vw;
    animation-name: ${Opaque};
    animation-duration: 3s;
    ${mobile({ width: '100vw !important', marginBottom: '20px' })}
    ${tablet2({ width: '60vw'})}
`

const Img = styled.img`
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    background: #232a34;
`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5vh 0vw;
    width: auto;
    height: 100vh;
    padding-left: 2vw;
    ${mobile({ height: '100%', flexDirection: 'column', padding: '0vw', margin: '5vh 0vh'})}
    ${tablet2({ flexDirection: 'column', height: '160vh', margin: '15vh 0vw' })}
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40vw;
    animation-name: ${Opaque};
    animation-duration: 3s;
    ${tablet({ width: '50vw'})}
    ${tablet2({ width: '70vw' })}
    ${mobile({ width: '90vw', marginBottom: '40px' })}
`

const Title = styled.h1`
    font-size: 30px;
    margin: 20px;
    width: 80%;
    text-align: justify;
    margin-bottom: 40px;
    ${mobile({ fontSize: '40px', width: '100%', textAlign: 'center' })}
`

const Description = styled.p`
    width: 80%;
    font-size: 20px;
    text-align: center;
    text-align: justify;
    letter-spacing: 1px;
    line-height: 24px;
    ${mobile({ fontSize: '16px', width: '90%' })}
`



const WhoAmI = () => {
    

  return (
    <Container>
        <Navbar />
        <Wrapper>
            <ImgContainer>
                <Img src={Cami} alt='cami'/>
            </ImgContainer>
            <Content>
                <Title>Hola a tod@s! Soy Cami y hago Deco en macramé. </Title>
                <Description>
                Mi abuela me dejó el trabajo artesanal como bandera: hoy me atrevo a decir que debe sentirse muy orgullosa de lo que hago. 
                <br />
                <br />
                Psicóloga como formación de base y macramera en los tiempos libres. Posiblemente estés pensando lo mismo que yo cuando arranqué en éste mundo: "¿Qué tiene que ver una cosa con la otra?". Con el tiempo, confirmé eso que tanto escuchaba: el ARTE SANA. Es que si me pongo a macramear, no puedo pensar en otra cosa que no sea en lo que tengo enfrente. El tiempo presente que parece ir más rápido y las preocupaciones se pausan.
                El macramé te obliga a aprender de los errores, a perseverar y siempre ir por más.
                <br />
                <br /> 
                Lo que más disfruto es enseñar y me entusiasma poder acompañarte en el camino del arte de anudar.
                Si llegaste hasta acá, es porque estás en los detalles y valoras el trabajo artesanal. Gracias por elegir La Nuderia para convertir tu casa, en un HOGAR.
                </Description>
            </Content>
        </Wrapper>
        <Newsletter />
        <Footer />
    </Container>
  )
}

export default WhoAmI;