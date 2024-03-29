import { useState } from 'react';
import styled from 'styled-components';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { mobile } from '../responsive';
import { publicRequest } from '../api/axios';
import CircularProgress from '@mui/material/CircularProgress';
import { setAlert } from '../redux/alertSlice';
import { useDispatch } from 'react-redux';


const Container = styled.div`
    height: 60vh;
    background-color: rgba(33, 110, 140, 0.048);  //#fcf5f5
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;
    ${mobile({ fontSize: '40px', textAlign: 'center', marginBottom: '20px' })}
`

const Description = styled.p`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 40px;
    ${mobile({ textAlign: 'center', fontSize: '16px', margin: '0px 10px', marginBottom: '20px' })}
`

const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    ${mobile({ width: '80vw' })}
`

const Input = styled.input`
    border: none;
    flex: 8;
    padding-left: 20px;
    ${mobile({ width: '15vw' })}

    &:focus-visible {
        outline-color: #216E8C;
    }
`

const Button = styled.button`
    flex: 1;
    border: none;
    background-color: #216E8C;
    color: white;
    cursor: pointer;
`


const Newsletter = () => {

    const [email, setEmail] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);


    const dispatch = useDispatch();
    

    const handleClick = async (e) => {
        e.preventDefault();
        if(error === true) {return console.log('mail incorrecto')}
        setLoading(true)
        try {
            await publicRequest.post('/newsletter', {email: email})
            setLoading(false)
            setSuccess(true)
            setSuccessMsg('Te suscribiste al newsletter con exito! Pronto recibiras todas las novedades!')
        } catch (err) {
            console.log(err)
            setLoading(false)
            setError(true)
            setErrorMsg('La direccion electronica ya existe en nuestros registros!');
        }
        
    }

    
    const handleEmailChange = (e) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value) && e.target.value.length > 0) {
            setError(false)
            setErrorMsg('');
            setEmail(e.target.value)   
        } else {
            setError(true)
            setErrorMsg('La direccion electronica no es una direccion valida');
        }
    }


  return (
    <Container>
        <Title>Suscribite al newsletter</Title>
        <Description>Enterate de todas las novedades, nuevos productos y descuentos exclusivos de la tienda de nudos.</Description>
        <InputContainer>
            <Input placeholder="Tu E-mail" type="email" onChange={handleEmailChange}/>
            { loading ? 
            <Button disabled style={{background: 'gray', cursor: 'default'}}>
                <CircularProgress style={{color: '#fff'}} size='1.2rem' />
            </Button>
            : <Button onClick={handleClick}>
                <SendOutlinedIcon />
              </Button>}
        </InputContainer>
        {error ? <p style={{marginTop: '5px', color: 'red'}}>{errorMsg}</p> : ''}
        {success ? <p style={{marginTop: '5px', color: 'rgb(22 163 74)'}}>{successMsg}</p> : ''}
    </Container>
  )
}

export default Newsletter;