import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import Stepper from "../components/Stepper";
import { useEffect } from "react";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { createOrder, orderEmail } from "../redux/requests";
import { removeCart } from "../redux/cartRedux";
import { resetLoading } from "../redux/loadingSlice";


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
    border: 10px solid #ef6c00;
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


const PendingTitle = styled.h1`
    font-weight: 300;
    text-align: center;
    ${mobile({ fontSize: '24px', marginTop: '30px', marginBottom: '0px' })}
`





const Pending = () => {

    const cart = useSelector(state => state.cart);

    const dispatch = useDispatch();

    
    useEffect(() => {
            try{
                const handleRemoveCart = () => {
                    dispatch(removeCart())
                }
                handleRemoveCart()
                dispatch(resetLoading())
            } catch (err) {
                console.log(err)
            }
    }, [dispatch])


  return (
    <Container>
        <Navbar />
        <Wrapper>
            <Title>PAGO</Title>
            <Top>
                <Stepper stepNum={4} status={'pending'}/>
            </Top>
            <Bottom>
                <Circle>
                    <Icon>
                        <PriorityHighIcon style={{width: '100%', height: '100%', color: '#ef6c00'}} />
                    </Icon>
                </Circle>
                <PendingTitle style={{fontWeight: '600'}}>TU ORDEN SE ENCUENTRA PENDIENTE DE PAGO !</PendingTitle>
                <Subtitle>Si abonás por <b>transferencia</b> envianos tu comprobante de pago a nuestra dirección de email.</Subtitle>
                <Subtitle style={{textAlign: 'center', border: '1px dashed gray', backgroundColor: 'lightgray', padding: '5px', fontSize: '13px'}}>
                    <b>DATOS BANCARIOS:</b><br/>
                    <br/>
                    BANCO SANTANDER<br/>
                    CBU: 0720180288000002174718<br/>
                    CTA: C.A. SUC. 180 CTA. 021747/1<br/>
                    ALIAS: hilos.nudos<br/>
                    TITULAR: CAMILA SOL ALVAREZ<br/>
                    EMAIL: macrame@lanuderia.com
                </Subtitle>
                <Subtitle>Si abonaste por <b>rapipago o pago fácil</b>, acercate a la sucursal más cercana y aboná en efectivo.</Subtitle>
            </Bottom>
        </Wrapper>
        <Footer />
    </Container>
  )
}

export default Pending