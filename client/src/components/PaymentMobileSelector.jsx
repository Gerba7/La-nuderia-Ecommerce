import { useState } from "react";
import styled from "styled-components";
import { mobile } from '../responsive';



const Container = styled.div`
    display: none;
    width: 100%;
    padding: 5px;
    height: 30vh;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    border-radius: 10px;
    padding: 20px 0px;
    gap: 30px;
    ${mobile({  display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' })}
`

const Label = styled.label`
    width: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
`

const Input = styled.input`
    height: 3vh;
`

const Paragraph = styled.p`
    height: 3vh;
    display: flex;
    align-items: center;
`

const Top = styled.div`
    display: flex;
    flex-direction: row;
    gap: 30px;
    margin-bottom: 10px;
`

const Bottom = styled.div`
    display: flex;
    flex-direction: row;
    gap: 30px;
`

const Logo = styled.img`
    height: 40px;
`



const PaymentMobileSelector = ({fn}) => {

    const [value, setValue] = useState(0);


    const handleChange = (e) => {
        setValue(e.target.value);
        //fn(newValue)
    };
    
  return (
    
    <Container>
        <Top>
          <Label id="mercadopago">
            <Paragraph>
                <Logo src='https://firebasestorage.googleapis.com/v0/b/la-nuderia.appspot.com/o/mercadopagoButton.png?alt=media&token=85836135-4828-48fd-a90c-b0ec56c78169' alt='MercadoPago' />
            </Paragraph>
            <Input type="radio" name="location" id="mercadopago" value={0} checked={value === 0} onChange={handleChange}/>
          </Label>

          <Label id="debitocredito">
            <Paragraph>Debito/Credito</Paragraph>
            <Input type="radio" name="location" id="debitcredit" value={1} checked={value === 1} onChange={handleChange}/>
          </Label>
        </Top>
        <Bottom>
          <Label id="tokyo">
            <Paragraph>Transferencia</Paragraph>
            <Input type="radio" name="location" id="transference" value="transference" />
          </Label>

          <Label id="paypal">
            <Paragraph><Logo src='https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/Online_Primary_Acceptance_Mark_RGB_V2_small.jpg' alt='Paypal' /></Paragraph>
            <Input type="radio" name="location" id="paypal" value="paypal" />
          </Label>
        </Bottom>
    </Container>

  )
}

export default PaymentMobileSelector