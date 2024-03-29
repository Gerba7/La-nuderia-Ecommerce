import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { mobile } from '../responsive';
import BLogo from '../images/Borealis_developers_1.png'
import { useState } from 'react';
import { useEffect } from 'react';
import { publicRequest } from '../api/axios';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';



const Container = styled.div`
`


const CloseButton = styled.button`
  display: flex;
  position: absolute;
  top: 2.5%;
  right: 2.5%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #fff;
  ${mobile({ top: '5%', right: '5%' })}
`


const style = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 600,
  bgcolor: '#212121',
  boxShadow: 24,
  p: 6,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  color: '#fff',

  '@media (max-width: 768px)': { 
    width: '70%',
   
  }
};


const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
    width: 100%;
`

const Logo = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`

const Img = styled.img`
    height: 5vh;
`

const Text = styled.h2`
    text-align: center;
    color: #fff;
`

const Paragraph = styled.h3`
    text-align: center;
    color: #fff;
`

const BoxContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Title = styled.h3`

`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`

const FormItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
`

const Label = styled.label`

`

const Input = styled.input`
    width: 100%;
    height: 20px;
    padding: 5px;
    border: none;
    border-bottom: 1px solid gray;
    background-color: transparent;
    color: #fff;
    
    &:focus {
    outline: none;
    border-bottom: 2px solid #43ba8c;
    color: #fff;
    }
`

const TextArea = styled.textarea`
    height: 50px;
    border: none;
    border-bottom: 1px solid gray;
    background-color: transparent;
    color: #fff;

    &:focus {
    outline: none;
    border-bottom: 2px solid #43ba8c;
    color: #fff;
    }
`

const Button = styled.button`
    padding: 15px;
    border: none;
    background-color: #8858a4;
    cursor: pointer;

    &:hover {
        background-color: #43ba8c;
    }
`



export default function BorealisModal({open, handleClose}) {

    const [form, setForm] = useState([]);
    const [error, setError] = useState({      
        name: false,
        email: false,
        phonenumber: false,
        comments: false,
    });
    const [errorText, setErrorText] = useState({      
        name: '',
        email: '',
        phonenumber: '',
        comments: '',
    });
    const [formValidationError, setFormValidationError] = useState({
        set: false,
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState({
        set: false,
        message: 'Tu consulta se envio con éxito'
    });


    const handleSetClose = () => {
        handleClose()
        setError({      
            name: false,
            email: false,
            phonenumber: false,
            comments: false,
        })
        setErrorText({
            name: '',
            email: '',
            phonenumber: '',
            comments: '',
        })
    }
    


    useEffect(() => {
        setFormValidationError({...formValidationError, set: false, message: ''})
    }, [form])
    

    const handleNameChange = (e) => {
        if (e.target.value.length > 30) {
        setError({
            ...error, name: true,
        })
        setErrorText({
            ...errorText, name: 'El largo del nombre no puede ser mayor a 20 caracteres',
        });
        } else {
        setError({
            ...error, name: false,
        })
        setErrorText({
            ...errorText, name: '',
        });
        setForm({
            ...form, name: e.target.value
        })   
        }
    }

    const handleEmailChange = (e) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
            setError({
                ...error, email: false,
            })
            setErrorText({
                ...errorText, email: '',
            });
            setForm({
                ...form, email: e.target.value
            })   
        } else {
            setError({
                ...error, email: true,
            })
            setErrorText({
                ...errorText, email: 'La direccion electronica no es una direccion valida',
            });
        }
    }

    const handlePhoneChange = (e) => {
        if (e.target.value.length === 10) {
            setError({
                ...error, phonenumber: false,
            })
            setErrorText({
                ...errorText, phonenumber: '',
            });
            setForm({
                ...form, phonenumber: e.target.value
            })       
        } else {
            setError({
                ...error, phonenumber: true,
            })
            setErrorText({
                ...errorText, phonenumber: 'El numero de telefono debe contener diez numeros y comenzar con 11 o 15',
            });
         
        }
    }

    const handleRequireChange = (e) => {
        if (e.target.value.length > 500) {
        setError({
            ...error, comments: true,
        })
        setErrorText({
            ...errorText, comments: 'El largo de la consulta no puede ser mayor a 500 caracteres',
        });
        } else {
        setError({
            ...error, comments: false,
        })
        setErrorText({
            ...errorText, comments: '',
        });
        setForm({
            ...form, comments: e.target.value
        })   
        }
    }



    const errorCheck = () => {
        let errors = Object.values(error);
        return errors.includes(true)
    }
    
    const valueCheck = () => {
        let values = Object.values(form);
        return values.includes(undefined)
    }




    const handleSendForm = async () => {

        if(errorCheck()) {
            return setFormValidationError({...formValidationError, set: true, message: 'Hay errores en tu formulario'})
        } else {
            setFormValidationError({...formValidationError, set: false, message: ''})
        }

        
        if(valueCheck()) {
            return setFormValidationError({...formValidationError, set: true, message: 'Faltan campos requeridos en tu formulario'})
        } else {
            setFormValidationError({...formValidationError, set: false, message: ''})
        }

        
        setLoading(true)

        try {
            const res = publicRequest.post('/newsletter/borealis', form);
            setLoading(false)
            return setSuccess({...success, set: true})
        } catch (err) {
            setLoading(false)
            console.log(err)
            return setFormValidationError({...formValidationError, set: true, message: 'Tu consulta no pudo enviarse!'})
        }


    }




  return (
    <Container>
      <Modal
        sx={{border: 'none'}}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <BoxContainer>
                <Wrapper>
                    <Logo>
                        <Img src={BLogo} alt='BorealisLogo' />
                    </Logo>
                    <Title>CONTACTO</Title>
                    <Form>
                        <FormItem>
                            <Label>Nombre y Apellido</Label>
                            <Input type='text' name='name' onChange={handleNameChange} />
                            { error.name ? <p style={{color: '#43ba8c'}}>{errorText.name}</p> : <></>}
                        </FormItem>
                        <FormItem>
                            <Label>Mail</Label>
                            <Input type='email' name='email'onChange={handleEmailChange} />
                            { error.email ? <p style={{color: '#43ba8c'}}>{errorText.email}</p> : <></>}
                        </FormItem>
                        <FormItem>
                            <Label>Telefono</Label>
                            <Input type='number' name='phonenumber' onChange={handlePhoneChange} />
                            { error.phonenumber ? <p style={{color: '#43ba8c'}}>{errorText.phonenumber}</p> : <></>}
                        </FormItem>
                        <FormItem>
                            <Label>Consulta</Label>
                            <TextArea type='text' name='comments' onChange={handleRequireChange} />
                            { error.comments ? <p style={{color: '#43ba8c'}}>{errorText.comments}</p> : <></>}
                        </FormItem>
                    </Form>
                    {loading ? <Button style={{cursor: 'default', backgroundColor: 'lightgray'}} disabled><Stack sx={{ color: '#43ba8c', display: 'flex', justifyContent: 'center' }} spacing={0} direction="row"><CircularProgress size="1rem" color="inherit" /></Stack></Button> :
                        <Button onClick={handleSendForm}>ENVIAR</Button>}
                    {formValidationError.set ? <p style={{color: '#8858a4', textAlign: 'center'}}>{formValidationError.message}</p>
                        : <></>}
                    {success.set ? <p style={{color: '#8858a4', textAlign: 'center'}}>{success.message}</p>
                        : <></>}
                </Wrapper>
            </BoxContainer>
            <CloseButton onClick={handleSetClose}><CloseIcon /></CloseButton>
        </Box>
      </Modal>
    </Container>
  );
}