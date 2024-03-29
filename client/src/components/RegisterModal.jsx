import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { createUser } from '../redux/requests';
import { useNavigate } from 'react-router-dom';
import { mobile } from '../responsive';
import LoginModal from './LoginModal';
import CheckIcon from '@mui/icons-material/Check';




const ButtonNew = styled.button`
  width: 150px;
  padding: 10px;
  border: none;
  background-color: teal;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
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

const RegisterButton = styled.button`
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

    
  ${mobile({ width: '50%' })}
` 

const Link = styled.a`
    margin: 5px 0px;
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
`

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ModalButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${mobile({ flexDirection: 'column' })} 
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



export default function RegisterModal({title}) {


  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
      email: false,
      password: false,
      name: false,
      lastname: false,
  });
  const [errorMsg, setErrorMsg] = useState({
      email: '',
      password: '',
      name: '',
      lastname: '',
  });
  const [success, setSuccess] = useState(false)


  const dispatch = useDispatch();

  const navigate = useNavigate();


  const errorCheck = () => {
    let errors = Object.values(error);
    return errors.includes(true)
  }


  const handleRegister = async (dispatch, user) => {

    if(errorCheck()) return console.log('Hay errores en el formulario')

    if(!name || !lastname || !email || !password) return console.log('Falta un campo')
    
      try {
          await dispatch(createUser(user))
          setSuccess(true)
      } catch(err) {
          console.log(err)
      }
        
  }

    
  const handleClick = (e) => {
      e.preventDefault();
      handleRegister(dispatch, { name, lastname, email, password })
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
            ...errorMsg, email: 'La dirección electrónica no es una dirección válida.',
        });
    }
  }


  const handlePasswordChange = (e) => {
    if (e.target.value.length >= 8 && e.target.value.length <= 15 
      && e.target.value.search(/[0-9]/) > 0) {
        setError({
            ...error, password: false,
        })
        setErrorMsg({
            ...errorMsg, password: '',
        });
        setPassword(e.target.value)   
    } else {
        setError({
            ...error, password: true,
        })
        setErrorMsg({
            ...errorMsg, password: 'La constraseña debe contener de 8 a 15 caracteres en números y letras.',
        });
    }
  }
  

  const handleNameChange = (e) => {
    if (e.target.value.length > 20) {
      setError({
        ...error, name: true,
      })
      setErrorMsg({
        ...errorMsg, name: 'El largo del nombre no puede ser mayor a 20 caracteres',
      });
    } else {
      setError({
        ...error, name: false,
      })
      setErrorMsg({
        ...errorMsg, name: '',
      });
      setName(e.target.value)   
    }
}

const handleSurnameChange = (e) => {
    if (e.target.value.length > 20) {
      setError({
        ...error, lastname: true,
      })
      setErrorMsg({
        ...errorMsg, lastname: 'El largo del apellido no puede ser mayor a 20 caracteres',
      });
    } else {
      setError({
        ...error, lastname: false,
      })
      setErrorMsg({
        ...errorMsg, lastname: '',
      });
      setLastname(e.target.value)   
    }
}





  return (
    <div>
      <ModalButton>
        <p style={{marginRight: '5px', fontSize: '14px'}}>No tenes una cuenta? </p>
        <Button style={{fontSize: 'inherit', padding: '0px', margin: '0px'}} onClick={handleOpen}><u><b>CREAR UNA CUENTA!</b></u></Button>
      </ModalButton>
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
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom: '30px'}}> 
            Te registraste con ÉXITO!
          </Typography>
            INICIA SESIÓN 
            <LoginCircle>
              <LoginModal iconColor={'#216E8C'}/>
            </LoginCircle>
          <CloseButton onClick={handleClose}><CloseIcon /></CloseButton>
        </Box>
        :
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom: '30px'}}> 
            REGISTRARSE
          </Typography>
          <Form>
              <Input placeholder="Nombre" onChange={handleNameChange} />
              {error.name ? <Error>{errorMsg.name}</Error> : ''}
              <Input placeholder="Apellido" onChange={handleSurnameChange} />
              {error.lastname ? <Error>{errorMsg.lastname}</Error> : ''}
              <Input placeholder="*Email" onChange={handleEmailChange} />
              {error.email ? <Error>{errorMsg.email}</Error> : ''}
              <Input placeholder="*Password" type="password" onChange={handlePasswordChange} />
              {error.password ? <Error>{errorMsg.password}</Error> : ''}
              <p style={{fontSize: '12px', marginTop: '10px'}}>(*) Campo requerido</p>
              <Buttons>
                <RegisterButton onClick={handleClick}>REGISTRARSE</RegisterButton>
              </Buttons>
          </Form>
          <CloseButton onClick={handleClose}><CloseIcon /></CloseButton>
        </Box>
        }
      </Modal>
    </div>
  );
}