import styled from "styled-components";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { mobile } from "../responsive";


const InformationContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 50px 0px;
    ${mobile({ flexDirection: 'column' })}
`

const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    ${mobile({ marginBottom: '50px' })}
`

const Icon = styled.div`
    margin-bottom: 15px;
`

const InfoTitle = styled.h3`
    font-size: 18px;
    font-weight: 400;
    color: #4c4f56;
`

const InfoSubtitle = styled.h4`
    font-size: 14px;
    font-weight: 300;
    color: #4c4f56;
    text-align: center;
`




const Information = () => {



  return (

        <InformationContainer>
            <IconContainer>
                <Icon>
                    <LocalShippingIcon style={{ fontSize: '45px', color: '#4c4f56'}} />
                </Icon>
                <InfoTitle>ENVIOS A TODO EL PAIS</InfoTitle>
                <InfoSubtitle>Consulta precios de envio.</InfoSubtitle>
            </IconContainer>
            <IconContainer>
                <Icon>
                    <ChangeCircleIcon style={{ fontSize: '45px', color: '#4c4f56'}} />
                </Icon>
                <InfoTitle>PRODUCCION ARTESANAL</InfoTitle>
                <InfoSubtitle>Producto listo para enviar en 15 a 20 días</InfoSubtitle>
            </IconContainer>
            <IconContainer>
                <Icon>
                    <CreditCardIcon style={{ fontSize: '45px', color: '#4c4f56'}} />
                </Icon>
                <InfoTitle>COMPRA EN CUOTAS</InfoTitle>
                <InfoSubtitle>Financia tu compra a través<br/> de MercadoPago.</InfoSubtitle>
            </IconContainer>
            <IconContainer>
                <Icon>
                    <HelpOutlineIcon style={{ fontSize: '45px', color: '#4c4f56'}} />
                </Icon>
                <InfoTitle>NECESITO AYUDA</InfoTitle>
                <InfoSubtitle>Preguntas frecuentes.</InfoSubtitle>
            </IconContainer>
        </InformationContainer>
    )
}

export default Information