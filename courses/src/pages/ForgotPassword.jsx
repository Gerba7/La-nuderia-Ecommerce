import { useState } from "react";
import { useDispatch} from "react-redux";
import styled, { keyframes } from "styled-components";
import { mobile } from "../responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../redux/requests";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';


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

const LoginCircle = styled.div`
    margin-top: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #216E8C;
    margin-bottom: 15px;
`

const Circle = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 5px solid rgb(22 163 74);
    margin-bottom: 15px;
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


const ForgotPassword = () => {

    
    const [password, setPassword] = useState("");
    const [error, setError] = useState({
        password: false,
        repeatEmail: false
    });
    const [errorMsg, setErrorMsg] = useState({
        password: '',
        repeatEmail: ''
    });
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);


    const location = useLocation();

    const token = location.pathname.split("/")[2];
    
    const dispatch = useDispatch();

    const navigate = useNavigate();


    const errorCheck = () => {
        let errors = Object.values(error);
        console.log(errors)
        return errors.includes(true)
    }
    

    const handleResetPassword = async (dispatch, data) => {
    
        try {
            const res = await dispatch(resetPassword(data))
            return res
        } catch(err) {
            console.log(err)
        }
          
    }
  
      
    const handleClick = async (e) => {

        e.preventDefault();

        setLoading(true)

        if(!errorCheck()) {

            try {
                const res = await handleResetPassword(dispatch, { token, password })
                setLoading(false)
                setSuccess(true)
            } catch (err) {
                console.log(err)
                setLoading(false)
            }

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


    const handleRepeatPasswordChange = (e) => {
        if (password === e.target.value) {
            setError({
                ...error, repeatEmail: false,
            })
            setErrorMsg({
                ...errorMsg, repeatEmail: '',
            });
        } else {
            setError({
                ...error, repeatEmail: true,
            })
            setErrorMsg({
                ...errorMsg, repeatEmail: 'La contraseña es diferente a la ingresada previamente',
            });
        }
    }
    
    
  return (
    <TopContainer>
        <Navbar />
        <Container>
            <Wrapper>
                { success ? 
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
                <Circle>
                    <Icon>
                        <CheckIcon style={{width: '100%', height: '100%', color: 'rgb(22 163 74)'}} />
                    </Icon>
                </Circle>
                <Title style={{textAlign: 'center'}}>Cambiaste tu contraseña exitosamente!</Title>
                <p style={{textAlign: 'center'}}>Presioná el botón de abajo para ingrsar a tu cuenta</p>
                <LoginCircle>
                    <LoginModal iconColor={'#216E8C'}/>
                </LoginCircle>
                </div>
                :
                <>
                <Title>Ingresar nueva contraseña</Title>
                <Form>
                    <Input placeholder="Contraseña" type="password" onChange={handlePasswordChange} />
                    {error.password ? <Error>{errorMsg.password}</Error> : ''}
                    <Input placeholder="Repetir Contraseña" type="password" onChange={handleRepeatPasswordChange} />
                    {error.repeatPassword ? <Error>{errorMsg.repeatPassword}</Error> : ''}
                    { loading ?
                    <Button style={{cursor: 'default', backgroundColor: 'lightgray'}} disabled><Stack sx={{ color: 'white', display: 'flex', justifyContent: 'center' }} spacing={0} direction="row"><CircularProgress size="1rem" color="inherit" /></Stack></Button>
                    : <Button onClick={handleClick}>Reestableber contraseña</Button>
                    }   
                </Form>
                </>
                }
            </Wrapper>
        </Container>
    </TopContainer>
  )
}

export default ForgotPassword