import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import styled from 'styled-components';
import { addEmail } from '../redux/httpRequests';
import { useDispatch } from 'react-redux';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { mobile } from '../responsive';



const Input = styled.input`
  width: 100%;
  padding: 5px;
  border: none;
  border-bottom: 1px solid gray;

  &:focus {
    outline: none;
    border-bottom: 2px solid lightblue;
  }

  &:active {
  }
`


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
`


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const AddButton = styled.div`
  padding: 2px 5px;
  border-radius: 5px;
  color: #15b815;
  cursor: pointer;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 5;
  right: 4%;
  top: 2.5%;
  ${mobile({top: '5px'})}

  &:hover {
    background-color: rgba(20, 220, 47, 0.6);
    color: #fff;
  }
`

export default function BasicModal({name, title, data, fn}) {


  const [open, setOpen] = useState(false);
  const [item, setItem] = useState();

  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    e.preventDefault()
    setItem(prev => {
        return { ...prev, [e.target.name]: e.target.value}
    });
   }
   
   const handleAddEmail = (e) => {
    e.preventDefault()
    dispatch(addEmail(item))
    handleClose()
  }


  return (
    <div style={{display: 'flex', position: 'absolute', top: '2.5%', right: '4%'}}>
      <AddButton onClick={handleOpen}><AddCircleOutlineIcon /></AddButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Input type='text' placeholder='Email...' name='email' onChange={handleChange} />
          </Typography>
          <ButtonNew onClick={handleAddEmail}>Crear</ButtonNew>
          <CloseButton onClick={handleClose}><CloseIcon /></CloseButton>
        </Box>
      </Modal>
    </div>
  );
}