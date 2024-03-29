import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { mobile } from '../responsive';



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
  height: 300,
  bgcolor: '#216E8C',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',

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




export default function ArtesanalModal() {


  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);



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
                    <Paragraph>
                        3 cuotas sin interés / 15% de descuento en efectivo y transferencia.
                        <br/>
                        <br/>
                        Todos los productos son de elaboración artesanal. El tiempo de entrega es de 15 a 20 días hábiles.
                    </Paragraph>
                </Wrapper>
            </BoxContainer>
            <CloseButton onClick={handleClose}><CloseIcon /></CloseButton>
        </Box>
      </Modal>
    </Container>
  );
}