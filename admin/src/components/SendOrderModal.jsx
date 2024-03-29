import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import styled from 'styled-components';
import { addCategories, sentMail, updateOrderSent, updateOrderStatus } from '../redux/httpRequests';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import CategoriesList from './CategoriesList';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import privateRequest from '../api/axios';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';


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

const Label = styled.label`
  
`

const FileInput = styled.input`
  display: none;
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
  top: 2%.5%;
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
  gap: '20px',
};


const Li = styled.ul`
  list-style-type: none;
`

const SendButton = styled.div`
  padding: 2px 5px;
  border-radius: 5px;
  color: darkblue;
  border: 1px solid rgba(0, 0, 139, 0.596);
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 139, 0.596);
    color: #fff;
  }
`


const CustomButton = styled.button`
  
`

const Square = styled.div`
  
`

const SentButton = styled.button`
  width: 40%;
  padding: 10px;
  border: none;
  background-color: #216E8C;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #216E8C;
    border: 1px solid #216E8C;
  }
`

const Item = styled.div`
  
`

const FileLabel = styled.label`
`




export default function SendOrderModal({order, date, products}) {


  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [path, setPath] = useState(null);
  const [trackingId, setTrackingId] = useState('S/N');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();



  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false); 
    setFile(null);
    setPath(null);
  }

  

  const handleTrackingChange = (e) => {
    setTrackingId(e.target.value);
  }

  const handleUpdate = (id, status) => {
    dispatch(updateOrderStatus({id, status}))
  }

  const handleDeleteFile = () => {
    setFile(null)
  }
  

  const handleFileUpload = async () => {
    
    if (file) {
      
      setLoading(true)

      const formData = new FormData();
      formData.append('pdfFile', file);
      
      try {
        const res = await privateRequest.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(res)
        if (res.status === 200) {
          const data = await res.data;
          setPath(data.filePath)
          setLoading(false)
        } else {
          console.log('File upload failed')
          setLoading(false)
        }
        
      } catch (err) {
        console.log(err)
        setLoading(false)
      }

    }

  }


  const handleFileChange = async (e) => {

    const selectedFile = e.target.files[0];
    setFile(selectedFile);

  }


  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file])


  const handleSentMail = (email, filePath, tracking) => {
    dispatch(sentMail({email, filePath, tracking}))
  }

  const handleSentOrder = (e, id, email, path, tracking) => {

    e.preventDefault();

    setLoading(true);


    
    try{
      handleUpdate(id, 'sent')
    } catch (err) {
      console.log(err)
      setLoading(false);
    }

    
    try {
      handleSentMail(email, path, tracking)
      setLoading(false);
    } catch (err) {
      console.log('Error al enviar mail de envio de pedido')
      setLoading(false);
    }

  }

  


  return (
    <div>
      <SendButton onClick={handleOpen}>Enviar</SendButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 style={{marginBottom: '15px'}}>Envío</h2>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <h4 style={{marginRight: '10px'}}>Email:</h4> 
            <p>{order.email}</p>
          </div>
          <p>Podés cargar tu factura y número de seguimiento para enviar: </p>
          <Item style={{border: '2px solid #216E8C', padding: '25px', width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', flexDirection: 'column', position: 'relative'}}>
            <FileInput id='file' type='file' accept='.pdf' name='pdfFile' onChange={handleFileChange} />
            {loading ? 

              <>
                <Stack sx={{ color: '#216E8C', display: 'flex', justifyContent: 'center' }} spacing={2} direction="row">
                  <CircularProgress color="inherit" />
                </Stack>  
              </>

            :

            <>
              { file ? 
                <><FileLabel htmlFor='file'><PictureAsPdfIcon style={{color: '#e72020'}}/></FileLabel>
                <p style={{color: '#000', fontWeight: '500', fontSize: '14px'}}>Factura.pdf</p>
                <div onClick={handleDeleteFile} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#e72020', borderRadius: '50%', position: 'absolute', top: '-13px', right: '-13px', padding: '3px', cursor: 'pointer'}}><CloseIcon sx={{color: '#fff'}}/></div>
                </>
              : 
                <>
                <FileLabel htmlFor='file'><FileUploadIcon style={{color: '#216E8C'}}/></FileLabel>
                <p style={{color: '#216E8C', fontWeight: '600'}}>PDF</p></> 
              }
            </>

            }
          </Item>
          <Item>
            <Input type='text' name='trackingid' id='trackingid' onChange={handleTrackingChange} placeholder='N° de seguimiento'/>
          </Item>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <SentButton onClick={(e) => handleSentOrder(e, order._id, order.email, path, trackingId)}>ENVIAR</SentButton>
          </div>
          <CloseButton onClick={handleClose}><CloseIcon /></CloseButton>
        </Box>
      </Modal>
    </div>
  );
}