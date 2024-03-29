import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import styled from 'styled-components';
import { addCategories } from '../redux/httpRequests';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import CategoriesList from './CategoriesList';


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
  position: 'relative'
};

export default function BasicModal({name, title, data, fn, cats}) {


  const [open, setOpen] = useState(false);
  const [item, setItem] = useState();
  const [error, setError] = useState(false);

  const dispatch = useDispatch();


  const handleOpen = () => {
    setOpen(true);
    setError(false);
  }

  const handleClose = () => {
    setOpen(false); 
    setError(false);
  }

  const handleChange = (e) => {
    e.preventDefault()
    setItem(prev => {
        return { ...prev, [e.target.name]: e.target.value.toLowerCase()}
    });
   }

   const handleAddCategory = (e) => {
    e.preventDefault()
    dispatch(addCategories(item))
    handleClose()
  }


  return (
    <div>
      <Button onClick={handleOpen}>{name}</Button>
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
            <Input type='text' placeholder='Categoria...' name='name' onChange={handleChange} />
          </Typography>
          <ButtonNew onClick={handleAddCategory}>Crear</ButtonNew>
          <CloseButton onClick={handleClose}><CloseIcon /></CloseButton>
          <div style={{border: '1px solid #000', marginTop: '20px'}}>
            <CategoriesList cats={cats} setError={setError} />
          </div>
          
          {error ? <p style={{color: 'red', marginTop: '5px'}}>Error: Esta categoria pertenece a un producto activo, borra todos los productos de la misma.</p> : ''}
        </Box>
      </Modal>
    </div>
  );
}