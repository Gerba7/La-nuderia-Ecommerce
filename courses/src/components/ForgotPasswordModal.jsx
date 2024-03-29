import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { forgotPassword } from '../redux/requests';
import { mobile } from '../responsive';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';



const Container = styled.div`
${mobile({ display: 'flex', justifyContent: 'center' })}

`


const CloseButton = styled.button`
  display: flex;
  position: absolute;
  top: 5%;
  right: 2.5%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  ${mobile({ top: '5%', right: '5%' })}
`


const style = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',

  '@media (max-width: 768px)': { 
    width: '70%',
   
  }
};


const style2 = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',

  '@media (max-width: 768px)': { 
    width: '70%',
   
  }
};


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

const ContinueButton = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: #206884;
    color: #fff;
    cursor: pointer;
    margin: 20px 0px;

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
    
  ${mobile({ textAlign: 'center', margin: '10px 0px' })}
`

const Buttons = styled.div`
  
`

const Error = styled.p`
    color: red;
    font-size: 10px;
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



export default function ForgotPasswordModal({title, iconColor}) {


  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
      email: false,
  });
  const [errorMsg, setErrorMsg] = useState({
      email: '',
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();

  const navigate = useNavigate();

  const errorCheck = () => {
    let errors = Object.values(error);
    return errors.includes(true)
  }


  const handleForgotPassword = async (dispatch, email) => {
    
    
    try {
      const res = await dispatch(forgotPassword(email))
      setSuccess(true)
    } catch(err) {
      console.log(err)
    }

    
        
  }

    
  const handleClick = async (e) => {
    
    e.preventDefault();

    setLoading(true)

    if(!errorCheck()) {

    try {
      const res = await handleForgotPassword(dispatch, { email })
      setLoading(false)
    } catch(err) {
      console.log(err)
      setLoading(false)
      setError({...error, email: true})
      setErrorMsg({...errorMsg, email: 'El mail que seleccionó no se encuentra registrado. Cree una nueva cuenta!'})
    }

    }

  }


  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setSuccess(false)
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




  return (
    <Container>
      <Button style={{fontSize: '12px', padding: '0px', margin: '0px', color: '000', textDecoration: 'none'}} onClick={handleOpen}><u>No recuerdas la contraseña?</u></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {success ? 
        <Box sx={style2}>
          <Circle>
              <Icon>
                  <CheckIcon style={{width: '100%', height: '100%', color: 'rgb(22 163 74)'}} />
              </Icon>
          </Circle>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{margin: '30px 0px', textAlign: 'center'}}> 
            Se ha enviado un mail a tu casilla de correo electrónico con un link para restaurar tu password.
          </Typography>
          <CloseButton onClick={handleClose}><CloseIcon /></CloseButton>
        </Box>
        :
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{margin: '10px 0px', fontSize: '16px'}}> 
            Ingresá tu correo electrónico para recuperar tu contraseña.
          </Typography>
          <Form>
              <Input placeholder="Email" onChange={handleEmailChange} />
              {error.email ? <Error>{errorMsg.email}</Error> : ''}
              <Buttons>
                { loading ? 
              <Button style={{cursor: 'default', backgroundColor: 'lightgray'}} disabled><Stack sx={{ color: 'white', display: 'flex', justifyContent: 'center' }} spacing={0} direction="row"><CircularProgress size="1rem" color="inherit" /></Stack></Button>
              :<ContinueButton onClick={handleClick}>Siguiente</ContinueButton>
                }
              </Buttons>
          </Form>
          {loading ? <CloseButton><CloseIcon /></CloseButton>
          : <CloseButton onClick={handleClose}><CloseIcon /></CloseButton>
          }
        </Box>
        }
      </Modal>
    </Container>
  );
}