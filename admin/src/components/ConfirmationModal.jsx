import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';




const ConfirmButton = styled.button`
  width: 100px;
  padding: 10px;
  border: none;
  background-color: #00c853;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 10px;

  &:hover{
    background-color: #69f0ae;
  }
`

const CancelButton = styled.button`
  width: 100px;
  padding: 10px;
  border: none;
  background-color: #d50000;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 10px;

  &:hover{
    background-color: #e57373;
  }
`

const ButtonsContainer = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 20px;
`

const CloseButton = styled.button`
  display: flex;
  position: absolute;
  top: 10%;
  right: 2.5%;
  background-color: transparent;
  border: none;
  cursor: pointer;
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
    width: '70vw'
  }
};

export default function ConfirmationModal({children, title, text, fn, close, open, value}) {



  return (
    <div>
      {children}
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {text}
          </Typography>
          <ButtonsContainer>
            <CancelButton onClick={close}>Cancelar</CancelButton>
            <ConfirmButton onClick={fn}>Aceptar</ConfirmButton>
          </ButtonsContainer>
          <CloseButton onClick={close}><CloseIcon /></CloseButton>
        </Box>
      </Modal>
    </div>
  );
}