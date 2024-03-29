import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import { login } from '../redux/requests';
import RegisterModal from './RegisterModal';
import { mobile } from '../responsive';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordModal from './ForgotPasswordModal';



const Container = styled.div`
`


const CloseButton = styled.button`
  display: flex;
  position: absolute;
  top: 10%;
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

const LoginButton = styled.button`
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






export default function LoginModal({title, iconColor}) {


  const [open, setOpen] = useState(false);
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
        handleClose()
        navigate(0)
      } else {
        throw error
      }
    } catch(err) {
      console.log(err)
      setError({...error, password: true})
      setErrorMsg({...errorMsg, password: 'El usuario o contraseña son incorrectos. Intentá nuevamente.'})
    }

    }

  }


  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);


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
    <Container>
      <Button style={{fontSize: 'inherit'}} onClick={handleOpen}><PersonIcon style={{fontSize: '32px', color: iconColor}}/></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom: '10px'}}> 
            {title}
          </Typography>
          <Form>
              <Input placeholder="Email" onChange={handleEmailChange} />
              {error.email ? <Error>{errorMsg.email}</Error> : ''}
              <Input placeholder="Password" type="password" onChange={handlePasswordChange} />
              {error.password ? <Error>{errorMsg.password}</Error> : ''}
              <Buttons>
                <LoginButton onClick={handleClick}>LOG IN</LoginButton>

              </Buttons>
              <RegisterModal />
              <ForgotPasswordModal />
          </Form>
          <CloseButton onClick={handleClose}><CloseIcon /></CloseButton>
        </Box>
      </Modal>
    </Container>
  );
}