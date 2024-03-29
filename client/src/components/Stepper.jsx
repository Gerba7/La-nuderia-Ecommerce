import { useState } from 'react';
import styled from 'styled-components';
import DoneIcon from '@mui/icons-material/Done';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CloseIcon from '@mui/icons-material/Close';
import { mobile, tablet2 } from "../responsive";


const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 60%;
    ${mobile({width: '100vw'})}
`

const StepContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25rem;
    color: #fff;
    background-color: '#fff';


    &:not(:first-child):before {
        content: '';
        background-color: ${props => props.active || props.complete === true ? 'rgb(22 163 74)' : 'rgb(226 232 240)'};
        position: absolute;
        width: 100%;
        height: 3px;
        right: 50%;
        top: 33.333333%;
        transform: translateY(50%);

    }
`

const Step = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    position: relative;
    background-color: ${props => props.active === true ? '#216E8C' 
                        : props.complete === true ? (
                            props.stat ==='failure' && props.stepStat === true ? '#d50000'
                            : props.stat ==='pending' && props.stepStat === true ? '#ef6c00'
                            : 'rgb(22 163 74)')
                        : 'gray'} ;
    border-radius: 50%;
    font-weight: 600;
    color: #fff;
`

const StepText = styled.p`
    color: ${props => props.complete === true ? '#fff' : 'gray'};
    font-weight: 500;
    text-align: center;
    margin-top: 10px;
    
    ${mobile({fontSize: '12px', marginTop: '5px'})}
`



const Stepper = ({stepNum, status}) => {

    const steps = ['Elegi tus Productos', 'Informacion de envio', 'Pago']

    const currentStep = stepNum;
    const [complete, setComplete] = useState(false); 


  return (
    <>
    <Container>
    {steps?.map((step, i) => (
        <StepContainer key={i} complete={i + 1 < currentStep ? true : false} active={currentStep === i + 1 ? true: false} >
            <Step active={currentStep === i + 1 ? true: false} complete={i + 1 < currentStep ? true : false} stat={status} stepStat={i === 2 ? true : false}>
                {i + 1 < currentStep ? 
                (status === 'failure' && i === 2 ? <CloseIcon size={24} />
                : status === 'pending' && i === 2 ? <PriorityHighIcon size={24} />  
                : <DoneIcon size={24} /> )
                : i+1}
            </Step>
            <StepText>{step}</StepText>
        </StepContainer>
    ))}
    </Container>
    </>
  )
}

export default Stepper