import styled from 'styled-components';
import AustralisLogo from '../images/Australis_Mark.png'


const Container = styled.div`
    width: 100%;
    height: 5vh;
    background-color: #212121; //#616161;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ImgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

const Img = styled.img`
    height: 3vh;
    cursor: pointer;
`

const Text = styled.h6`
    font-size: 10px;
    color: #fff;
`


const Banner = () => {
    
    const redirectToExternalWebsite = () => {
        window.open('https://www.australisdevs.com', '_blank');
      };


  return (
    <Container>
        <ImgContainer>
            <Text>Desarrollado por:</Text>
            <Img src={AustralisLogo} alt='AustralisLogo' onClick={redirectToExternalWebsite} />
        </ImgContainer>
    </Container>
  )
}

export default Banner;