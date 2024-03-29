import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import styled from 'styled-components';
import { activateCourse, addCategories, confirmationCourseEmail, sentMail, updateOrderSent, updateOrderStatus } from '../redux/httpRequests';
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

const PayButton = styled.div`
  padding: 2px 5px;
  border-radius: 5px;
  color: rgb(22 163 74);
  border: 1px solid rgb(22 163 74);
  cursor: pointer;

  &:hover {
    background-color: rgb(22 163 74);
    color: #fff;
  }
`



export default function PayCourseModal({order}) {


  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [path, setPath] = useState(null);
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

  const coursePdfs = [];

  for (const product of order.products) {
    const pdfsArray = product.pdfs;
    coursePdfs.push(...pdfsArray);
  }

  const courseIds = order.products.map(prod => prod._id)
  
  

  const handleUpdate = (id, status) => {
    dispatch(updateOrderStatus({id, status}))
  }

  const handleConfirmationCourseMail = (id, email, paths) => {
    dispatch(confirmationCourseEmail({id, email, paths}))
  }

  const handleActivateCourse = (courseIds, date, userId) => {
    dispatch(activateCourse({courseIds, date, userId}))
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


  


  const handleUpdatePaidCourse = (e, id, status, email, courseIds, date, userId) => {

    e.preventDefault()

    setLoading(true);

    coursePdfs.push(path);
    
    try {
      handleUpdate(id, status)
    } catch (err) {
      console.log(err)
      setLoading(false);
      setOpen(false)
    }

    try{
      handleActivateCourse(courseIds, date, userId)
      handleConfirmationCourseMail(id, email, coursePdfs)
      setPath(null)
      setLoading(false);
    } catch (err) {
      console.log('Error al enviar mail de confirmacion de curso')
      setLoading(false);
      setOpen(false)
    }
      
  }

  


  return (
    <div>
      <PayButton onClick={handleOpen}>Paga</PayButton>
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
          <p>Podés cargar tu factura: </p>
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
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <SentButton onClick={(e) => handleUpdatePaidCourse(e, order._id, 'paid', order.email, courseIds, order.createdAt, order.userId)}>ENVIAR Y ACTIVAR CURSO</SentButton>
          </div>
          <CloseButton onClick={handleClose}><CloseIcon /></CloseButton>
        </Box>
      </Modal>
    </div>
  );
}