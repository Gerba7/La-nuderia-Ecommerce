import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { login } from "../redux/httpRequests";



const Container = styled.div`
    width: 100vw;
    height: 90vh;
    background: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("https://images.pexels.com/photos/9657060/pexels-photo-9657060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1") center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
`

const Wrapper = styled.div`
    padding: 20px;
    width: 20%;
    background-color: #fff;
    
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 500;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;
    padding: 10px;
`

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: #206884;
    color: #fff;
    cursor: pointer;
    margin: 10px 0px;

    &:disabled {
        background-color: gray;
        cursor: not-allowed;
    }
` 

const Link = styled.a`
    margin: 5px 0px;
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
`

const Error = styled.span`
    color: red;
`


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();


    const handleLogin = async (dispatch, user) => {
    
        try {
            await dispatch(login(user))
        } catch(err) {
            console.log(err)
        }

        navigate('/', { replace: true })
        
    }

    
    const handleClick = (e) => {
        e.preventDefault();
        handleLogin(dispatch, { email, password })
    }


  return (
    <Container>
        <Wrapper>
            <Title>Ingresar</Title>
            <Form>
                <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleClick}>LOG IN</Button>
                <Link>No recuerdas la contraseña?</Link>
                {/*<Link to="/register">Crear nueva cuenta</Link>*/}
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login