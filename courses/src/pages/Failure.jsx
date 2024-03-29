import styled, { keyframes } from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import Stepper from "../components/Stepper";
import CloseIcon from '@mui/icons-material/Close';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
` 

const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: '10px', margin: '10px'})}
    margin: 120px;
`

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
    ${mobile({ fontSize: '26px', marginTop: '90px', marginBottom: '0px' })}
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    margin: 40px 0px;
    ${mobile({ margin: '20px 0px 0px 0px'})}
`

const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10vh 10vw;
    gap: 30px;
    ${mobile({ flexDirection: 'column' })}
`

const Circle = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 10px solid #d50000;
`

const Resize = keyframes`
    0% {scale: 0; opacity: 0}
    100% {scale: 1; opacity: 1}
`

const Icon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    z-index: 2;
    animation: ${Resize} 1s;
    transition: ease 1000ms;
` 

const Subtitle = styled.h4`
    font-weight: 400;
    text-align: center;
`

const FailureTitle = styled.h1`
    font-weight: 300;
    text-align: center;
    ${mobile({ fontSize: '24px', marginTop: '30px', marginBottom: '0px' })}
`





const Failure = () => {


  return (
    <Container>
        <Navbar />
        <Wrapper>
            <Title>PAGO</Title>
            <Top>
                <Stepper stepNum={4} status={'failure'} />
            </Top>
            <Bottom>
                <Circle>
                    <Icon>
                        <CloseIcon style={{width: '100%', height: '100%', color: '#d50000'}} />
                    </Icon>
                </Circle>
                <FailureTitle style={{fontWeight: '600'}}>TU ORDEN NO PUDO SER ABONADA !</FailureTitle>
                <Subtitle>Proba nuevamente o con otro medio de pago...</Subtitle>
            </Bottom>
        </Wrapper>
        <Footer />
    </Container>
  )
}

export default Failure