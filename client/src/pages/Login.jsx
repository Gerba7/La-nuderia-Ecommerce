import { useState } from "react";
import { useDispatch} from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/requests";
import Navbar from "../components/Navbar";


const TopContainer = styled.div`
    display: flex;
`

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("https://images.pexels.com/photos/9657060/pexels-photo-9657060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1") center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    padding: 20px;
    width: 20%;
    background-color: #fff;
    ${mobile({ width: '75%' })}
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
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
    margin-bottom: 10px;

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

const Error = styled.p`
    color: red;
    font-size: 10px;
`


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({
        email: false,
        password: false
    });
    const [errorMsg, setErrorMsg] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const errorCheck = () => {
        let errors = Object.values(error);
        return errors.includes(true)
    }
    

    const handleLogin = async (dispatch, user) => {
    
        try {
            const res = await dispatch(login(user))
            return res
        } catch(err) {
            console.log(err)
        }
          
    }
  
      
    const handleClick = async (e) => {
        e.preventDefault();

        setError({error, password: false})
        setErrorMsg({...errorMsg, password: ''})

        if(!errorCheck()) {

            try {
                const res = await handleLogin(dispatch, { email, password })
                if(!res.error) {
                navigate('/classes')
                } else {
                throw error
                }
            } catch (err) {
                console.log(err)
                setError({...error, password: true})
                setErrorMsg({...errorMsg, password: 'El usuario o contraseña son incorrectos. Intentá nuevamente.'})
            }

        }
    }


    const handleEmailChange = (e) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
            setError({
                ...error, email: false,
            })
            setErrorMsg({
                ...errorMsg, email: '',
            });
            setEmail(e.target.value)   
        } else {
            setError({
                ...error, email: true,
            })
            setErrorMsg({
                ...errorMsg, email: 'La dirección electrónica no es una dirección válida',
            });
        }
    }

    const handlePasswordChange = (e) => {
        setError({
          ...error, password: false,
        })
        setErrorMsg({
            ...errorMsg, password: '',
        });
    
        setPassword(e.target.value)
    }
    
    
  return (
    <TopContainer>
        <Navbar />
        <Container>
            <Wrapper>
                <Title>Ingresar</Title>
                <Form>
                    <Input placeholder="Email" type="email" onChange={handleEmailChange} />
                    {error.email ? <Error>{errorMsg.email}</Error> : ''}
                    <Input placeholder="Password" type="password" onChange={handlePasswordChange} />
                    {error.password ? <Error>{errorMsg.password}</Error> : ''}
                    <Button onClick={handleClick}>LOG IN</Button>
                    <Link>No recordás la contraseña?</Link>
                    <Link to="/register">Crear nueva cuenta</Link>
                </Form>
            </Wrapper>
        </Container>
    </TopContainer>
  )
}

export default Login