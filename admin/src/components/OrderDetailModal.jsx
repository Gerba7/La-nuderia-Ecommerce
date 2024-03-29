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
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';


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


const Li = styled.ul`
  list-style-type: none;
`


export default function OrderDetailModal({order, date, products}) {


  const [open, setOpen] = useState(false);


  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false); 
  }


  return (
    <div>
      <Button sx={{padding: '0', minWidth: '40px'}} onClick={handleOpen}><ReceiptLongIcon /></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Resumen de la Orden
          </Typography>
          <br></br>
          <h4>Fecha: </h4><p>{date}</p>
          <br></br>
          {order.course ? <h4>Cursos:</h4> : <h4>Productos:</h4>}

          {products.map(prod => (
            <Li key={prod._id}>{prod.quantity ? prod.quantity : 1} X {prod.title}</Li>
          ))}
          <br></br>
          <h4>Nombre y apellido:</h4> <p>{order.name} {order.surname}</p>
          <br></br>
          <h4>Direccion de envio:</h4> <p>{order.street} {order.adressNum}, {order.floor} {order.apartment}, {order.city}, {order.province}, CP: {order.postal}</p>
          <br></br>
          <h4>Telefono:</h4> <p>{order.phone}</p>
          <br></br>
          <h4>Email:</h4> <p>{order.email}</p>
          <CloseButton onClick={handleClose}><CloseIcon /></CloseButton>
        </Box>
      </Modal>
    </div>
  );
}