import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { deleteEmail, getEmails , sendEmails } from '../redux/httpRequests';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import NonImage from '../Images/image.png';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import app from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EmailModal from '../components/EmailModal';
import { resetLoading, setLoading } from '../redux/loadingSlice';
import ConfirmationModal from '../components/ConfirmationModal';
import { mobile } from '../responsive';
import { setAlert } from '../redux/alertSlice';

const Container = styled.div`
    width: 80vw;
    height: 80vh;
    padding: 30px;
    
`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    column-gap: 30px;
    position: relative;
    ${mobile({width: '85vw', padding: '0px', marginLeft: '0px', height: '85vh', flexDirection: 'column', gap: '20px'})}
`

const Editor = styled.div`
    flex: 2;
    background-color: #d3d3d3c7;
    border: 1px dashed #000;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`

const Text = styled.h4`
    position: absolute;
    margin-top: 10px;
    font-weight: 300;
    color: #000;
    z-index: 5;
    bottom: 20%;
`

const ImgContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const MailsContainer = styled.div`
    flex: 1;
    height: 80vh;
    display: flex;
    flex-direction: column;
    gap: 25px;
    ${mobile({height: '100%'})}
    
`

const DeleteButton = styled.div`
  padding: 2px 5px;
  border-radius: 5px;
  color: crimson;
  cursor: pointer;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(220, 20, 60, 0.6);
    color: #fff;
  }
`


const ImgLabel = styled.label`
  position: relative;
  height: 100%;
  width: 100%;
`

const ImgInputF = styled.input`
  position: absolute;
  
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  background-color: transparent;
  object-fit: cover;
  position: relative;
  cursor: pointer;
`

const EmailInput = styled.input`
    width: 70%;
    border-radius: 10px;
    border: 1px solid lightgray;
    padding: 5px 10px;
`

const EmailForm = styled.form`
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    display: flex;
    flex-direction: column;
    ${mobile({gap: '15px'})}
`

const EmailLabel = styled.label`
    margin-right: 10px;
    color: #fff;
`

const Subject = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SendSection = styled.div`
    background-color: #216E8C;
    flex: 1;
    border-radius: 10px;
    border: 1px solid lightgray;
    padding: 15px;
    display: flex;
    ${mobile({marginBottom: '30px'})}
`

const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
`

const Button = styled.button`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const SendButton = styled.button`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const FirstButton = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const SecondButton = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Subtitle = styled.h4`
    margin-top: 10px;
    font-weight: 300;
    color: #fff;
`



const NewsLetter = () => {


    const [file, setFile] = useState("");
    const [emailContent, setEmailContent] = useState({});
    const [open, setOpen] = useState(false);

  
    const handleOpen = (e) => {
      e.preventDefault()
      setOpen(true);
    }
    
    const handleClose = () => {
      setOpen(false);
    }



    const dispatch = useDispatch()
    const emails = useSelector((state) => state.email.emails);
    
    
    const navigate = useNavigate();

    useEffect(() => {
        try {
            dispatch(getEmails())
        } catch (err) {
            console.log(err)
        }
      }, [dispatch])


    const handleDelete = (id) => {
        dispatch(deleteEmail(id))
        dispatch(getEmails())
    }
    

    const handleUploadFile = (e) => {

        e.preventDefault()
        dispatch(setLoading())

        if (file) {

        
            const fileName = new Date().getTime() + file.name;
            const storage = getStorage(app);
            const storageRef = ref(storage, fileName);
    
            const uploadTask = uploadBytesResumable(storageRef, file);
    
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
              (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused');
                    break;
                  case 'running':
                    console.log('Upload is running');
                    break;
                  default: 
                    console.log('Uploader')
                }
              }, 
              (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                  case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                  case 'storage/canceled':
                    // User canceled the upload
                    break;
    
                  // ...
    
                  case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;

                  default: 
                    console.log('error')
                }
                dispatch(resetLoading())
              }, 
              () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setEmailContent(prev => {
                        return {...prev, img: downloadURL, }
                    })
                    dispatch(resetLoading())
                    console.log('Uploaded')
                });
              }
            );
    
        } else {
            console.log('err')
            dispatch(resetLoading())
        }

    };

    
    const deleteImgFromDb = async () => {

        if (emailContent.img) {

        dispatch(setLoading())

        try {

            const oldImg = emailContent.img

            const storage = getStorage();
      
            const deleteFiles = async () => {
      
            let result = await new Promise((resolve, reject) => {
                const desertRef = ref(storage, oldImg);
      
                deleteObject(desertRef).then(() => {
                    console.log('Images deleted succesfully')
                    resolve()
                }).catch((error) => {
                    console.log(error)
                    reject()
                });
      
                })
            }
      
            deleteFiles()
            dispatch(resetLoading())
            
        } catch (err) {
            dispatch(resetLoading())
            console.log(err)
            console.log('Could not delete old Images')
        }

        } else {
            console.log('No hay file')
        }



    }


    const handleMail = async (e) => {
        e.preventDefault()

        try {
            handleClose()
            await dispatch(sendEmails(emailContent))
            navigate(0)
            dispatch(setAlert({message: 'Se envio newsletter con exito!', type: 'success'}))
        } catch (err) {
            console.log(err)
            handleClose()
            dispatch(setAlert({message: 'El newsletter no pudo entregarse', type: 'warning'}))
        }
        
        
        
    };


    const handleChange = (e) => {
        e.preventDefault()
        setEmailContent(prev => {
            return { ...prev, [e.target.name]: e.target.value}
        });
    };
    


    const emailColumns = [
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'action', headerName: 'Borrar', width: 70, sortable: false, renderCell: (params) => {
            return (
                <DeleteButton onClick={() => handleDelete(params.row._id)}><HighlightOffRoundedIcon /></DeleteButton>
            )
            }
        },
    ];
    

    const localizedTextsMap = {
        columnMenuUnsort: "Desclasificar",
        columnMenuSortAsc: "Ordenar ascendentemente",
        columnMenuSortDesc: "Ordenar decrecientemente",
        columnMenuFilter: "Buscar",
        columnMenuHideColumn: "Ocultar",
        columnMenuShowColumns: "Mostrar columnas"
      };

    


  return (
    <Container>
        <Wrapper>
            <Editor>
                {file ? <></> : <Text>1. Elegí tu archivo</Text>}
                <ImgContainer>
                        <ImgLabel htmlFor='file'>
                            <Img src={file ? URL.createObjectURL(file) : NonImage} alt="user" />
                        </ImgLabel>
                        <ImgInputF type="file" id="file" onChange={e=>setFile(e.target.files[0])} style={{ display: "none" }}/>
                </ImgContainer>
            </Editor>
            <MailsContainer>
                <div style={{ height: '80vh', width: '100%', flex: 3, display: 'flex', position: 'relative'}}>
                    <EmailModal title={"Agregar Email"}/>
                    <DataGrid
                        rows={emails}
                        columns={emailColumns}
                        pageSize={8}
                        rowsPerPageOptions={[8]}
                        getRowId={(row) => row._id}
                        checkboxSelection
                        sx={{
                        borderRadius: '10px',
                        '@media (max-width: 768px)': {height: '80vh'}
                        }}
                        localeText={localizedTextsMap}
                        onSelectionModelChange={(id) => {
                            const emailsSelection = emails.filter((mail) => id.includes(mail._id)).map(key => key.email)
                            setEmailContent(prev => {
                                return {...prev, email: emailsSelection, }
                            })
                        }}
                    />
                </div>
                <SendSection>
                    <EmailForm>
                        <Subject>
                            <EmailLabel>2. Asunto:</EmailLabel>
                            <EmailInput type='text' placeholder='Asunto' name='subject' onChange={handleChange} />
                        </Subject>
                        <ButtonsWrapper>
                            <FirstButton>
                                {file ? <Button onClick={(e) => handleUploadFile(e)}><CloudUploadIcon style={{fontSize: '30px', color: '#216E8C'}} /></Button>
                                : <Button style={{cursor: 'default'}} disabled><CloudUploadIcon style={{fontSize: '30px', color: '#9e9e9e'}} /></Button>}
                                <Subtitle>3. Cargar Archivo</Subtitle>
                            </FirstButton>
                            <SecondButton>
                                {emailContent.img && emailContent.subject ? 
                                    <ConfirmationModal 
                                        open={open} 
                                        close={handleClose} 
                                        children={<SendButton onClick={handleOpen}><SendIcon style={{fontSize: '30px', color: '#216E8C'}}/></SendButton>}
                                        title='Enviar Newsletter'
                                        text='Desea enviar newsletter a los mails seleccionados?'
                                        fn={(e) => handleMail(e)}
                                    />
                                : <SendButton style={{cursor: 'default'}} disabled ><SendIcon style={{fontSize: '30px', color: '#9e9e9e'}} /></SendButton>}
                                <Subtitle>4. Enviar</Subtitle>
                            </SecondButton>
                        </ButtonsWrapper>
                    </EmailForm>
                </SendSection>
            </MailsContainer>
        </Wrapper>
    </Container>
    
  )
}

export default NewsLetter