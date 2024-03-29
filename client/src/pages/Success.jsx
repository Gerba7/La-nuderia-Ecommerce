import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import Stepper from "../components/Stepper";
import { useEffect } from "react";
import CheckIcon from '@mui/icons-material/Check';
import { createOrder, orderEmail, resetPassword } from "../redux/requests";
import { resetOrder, setOrderPaid } from "../redux/orderSlice";
import { removeCart } from "../redux/cartRedux";



const Container = styled.div`
    display: flex;
    flex-direction: column;
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
    border: 10px solid rgb(22 163 74);
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
`

const SuccessTitle = styled.h1`
    font-weight: 300;
    text-align: center;
    ${mobile({ fontSize: '24px', marginTop: '30px', marginBottom: '0px' })}
`






const Success = () => {

    const order = useSelector(state => state.order.orders);

    const dispatch = useDispatch();

    
    useEffect(() => {

            try {
                const finishOrder = () => {
                    const handleRemoveCart = () => {
                        dispatch(removeCart())
                    }
                    handleRemoveCart()
                }
                finishOrder()
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
                <Stepper stepNum={4} />
            </Top>
            <Bottom>
                <Circle>
                    <Icon>
                        <CheckIcon style={{width: '100%', height: '100%', color: 'rgb(22 163 74)'}} />
                    </Icon>
                </Circle>
                <SuccessTitle style={{fontWeight: '600'}}>TU ORDEN FINALIZO CON ÉXITO !</SuccessTitle>
                <Subtitle>Pronto recibirás un mail con las instrucciones...</Subtitle>
            </Bottom>
        </Wrapper>
        <Footer />
    </Container>
  )
}

export default Success