import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useEffect } from 'react';
import privateRequest, { publicRequest } from '../api/axios';
import { useDispatch } from 'react-redux';
import { activateCourse, updatePostFees } from '../redux/httpRequests';
import { resetLoading, setLoading } from '../redux/loadingSlice';
import { setAlert } from '../redux/alertSlice';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import app from '../services/firebase';
import NonImage from '../Images/image.png';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CheckIcon from '@mui/icons-material/Check';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import axios from 'axios';



const Container = styled.div`
    width: 80vw;
    height: 82vh;
    padding: 30px;
    display: flex;
    flex-direction: row;
    gap: 2vw;
    ${mobile({marginTop: '90px'})}
`

const Wrapper = styled.div`
    height: 100%;
    width: 55vw;
    display: flex;
    column-gap: 30px;
    position: relative;
    flex-direction: row;
    gap: 2vw;
    box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
    -webkit-box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
    -moz-box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
    border-radius: 10px;
    ${mobile({width: '85vw', padding: '0px', marginLeft: '0px', height: '85vh', flexDirection: 'column', gap: '20px'})}
`

const Wrapper2 = styled.div`
    height: 100%;
    width: 20vw;
    display: flex;
    column-gap: 30px;
    position: relative;
    flex-direction: row;
    gap: 2vw;
    box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
    -webkit-box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
    -moz-box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
    border-radius: 10px;
    ${mobile({width: '85vw', padding: '0px', marginLeft: '0px', height: '85vh', flexDirection: 'column', gap: '20px'})}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 8vh 0vw 8vh 2vw;
    gap: 2vh;
`

const Top = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    gap: 5vw;
`

const CourseData = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 2vh;
`

const Bottom = styled.div`
    flex: 1;
`

const Right = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 8vh 2vw 8vh 0vw;
    gap: 3vh;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const Input = styled.input`
    border: none;
    border-bottom: 1px solid gray;
    text-align: center;
    width: 80%;
    padding: 5px;
    
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &:focus {
        outline: none;
        border-bottom: 2px solid #216E8C;
    }

    &:active {
    }

`

const ThumbContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 100%;
`

const Thumbnail = styled.img`
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    cursor: pointer;
    max-height: 36vh;
    max-width: 30vw;
    border: 1px solid #216E8C;
    border-radius: 5px;
    ${mobile({maxWidth: '90vw'})}
`

const ThumbnailLabel = styled.label`
    height: 100%;
    cursor: pointer;
`

const ThumbnailInput = styled.input`
    width: 80%;
    position: absolute;
    display: none;
`

const VideoInputContainer = styled.div`
    display: flex;
    background-color: rgba(33, 110, 140, 0.048);
    border: 1px solid lightgray;
    border-bottom: none;
    width: 100%;
    height: 6vh;
    cursor: pointer;
    position: relative;

    &:hover {
        background-color: rgba(33, 110, 140, 0.6);
        color: #fff;
    }
`

const VideoInput = styled.input`
    width: 100%;
    position: absolute;
    display: none;
`

const Label = styled.label`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

const AddVideoButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1vw;
    padding: 1vh 2vw;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`

const UploadVideoButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1vw;
    padding: 1vh 2vw;
    border: none;
    border-radius: 5px;
    background-color: #216E8C;
    color: #fff;
    font-weight: 600;
    cursor: pointer;

    &:hover { 
        background-color: transparent;
        color: #216E8C;
        border: 1px solid #216E8C;
    }
`

const Content = styled.div`
    display: flex;
    justify-content: center;
    margin: 8vh 2vw 8vh 2vw;
    width: 100%;
    position: relative;
`

const Title = styled.h1`
    position: absolute;
    top: -6.5vh;
    font-weight: 500;
`

const CoursesContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1vh;
    overflow-y: scroll;
    overflow-x: hidden;
`

const Course = styled.div`
    display: flex;  
    flex-direction: row;
    height: 10vh;
    min-height: 10vh;
    position: relative;
    border: 1px solid lightgray;
    border-radius: 5px;
    box-shadow: rgba(19, 15, 235, 0.1) 1px 2px 20px;
`


const CourseThumbnailContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: flex-end;
    padding: 1vh;
`

const CourseThumbnail = styled.img`
    width: 100%;
    height: 100%;

`

const CourseTitle = styled.h3`
    display: flex;
    flex: 2;
    font-weight: 500;
    font-size: 16px;
    margin: 1vh;
    text-align: center;
    align-items: center;

`

const DeleteButton = styled.button`
    position: absolute;
    top: 1vh;
    right: 0.5vw;
    padding: 2px 5px;
    border-radius: 5px;
    color: crimson;
    cursor: pointer;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;

    &:hover {
        background-color: rgba(220, 20, 60, 0.6);
        color: #fff;
    }
`

const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 1vw;
    top: 1vh;
`

const PdfsLabel = styled.label`
    display: flex;
    justify-content: center;
    font-size: 14px;
    align-items: center;
    gap: 1vw;
    padding: 1vh 2vw;
    border: 1px solid #e72020;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #e72020;
        color: #fff;
    }
`

const AddPdfsButton = styled.input`
    width: 100%;
    position: absolute;
    display: none;
`







const Courses = () => {

    const [files, setFiles] = useState([]);
    const [cover, setCover] = useState(null);
    const [courses, setCourses] = useState([]);
    const [courseData, setCourseData] = useState({
        title: undefined,
        description: undefined,
        duration: undefined,
        price: undefined,
        dolarPrice: undefined
    });
    const [pdfFiles, setPdfFiles] = useState([]);
    const [formValidationError, setFormValidationError] = useState({
        set: false,
        message: ''
    });


    const videoRequest = axios.create({
        baseURL: 'https://api.lanuderia.com:5000/v1',
        headers: { 
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });


console.log(courses)
    const dispatch = useDispatch();

    const getCourses = async () => {
        try {
            const res = await privateRequest.get("/courses/courses-admin");
            setCourses(res.data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCourses();
    }, [])

    useEffect(() => {
        setFormValidationError({...formValidationError, set: false, message: ''})
    }, [courseData, cover, pdfFiles, files])


    const handleChange = (e, index) => {
        const selectedFile = e.target.files[0];
        const newFiles = [...files];
        newFiles[index] = selectedFile;
        setFiles(newFiles);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };


    const handlePdfsChange = (e) => {
        setPdfFiles(Array.from(e.target.files));
    };

    const handleActivateCourse = (courseIds, date, userId) => {
        dispatch(activateCourse({courseIds, date, userId}))
      }


    const handleChangeCover = (e) => {
        setCover(e.target.files[0])
    }



    const addInput = () => {
        if (files.length < 20) {
            setFiles([...files, null]);
        }
    }


    const handleDeleteVideos = async (urls) => {

        try {
            const res = await privateRequest.post('/courses/delete-videos', urls);
        } catch (err) {
            console.log(err)
            return err
        }

    }

    

    const handleDeleteCourse = async (e, id, urls, thumbnail) => {

        e.preventDefault();

        dispatch(setLoading());

        try {

            if(thumbnail) {

                const storage = getStorage();
                
                new Promise((resolve, reject) => {
                    const desertRef = ref(storage, thumbnail);
      
                    deleteObject(desertRef).then(() => {
                      console.log('Images deleted succesfully')
                      resolve()
                    }).catch((error) => {
                      console.log(error)
                      reject()
                    });
      
                })
            }

            try {
                
                await handleDeleteVideos(urls);

            } catch (err) {
                console.log(err)
                dispatch(resetLoading());
            }
            
            const res = await privateRequest.delete(`/courses/delete/${id}`);

            dispatch(resetLoading());

            getCourses()
            
            return res;

        } catch (err) {
            console.log(err)
            dispatch(resetLoading());
        }
        

    } 
    

    const handleUploadThumbnail = async () => {

        // if (cover.length === 0) {                AWS
        //     return
        // }

        // try{

        //     const formData = new FormData();

        //     formData.append('thumbnail', cover);
            
        //     console.log(formData)
        //     const res = await privateRequest.post('/courses/thumbnail', formData, {
        //         headers: {
        //         'Content-Type': 'multipart/form-data',
        //         },
        //     });
            
        //     const thumbnailKey = res.data;

        //     console.log('File uploaded succesfully', thumbnailKey)

        //     //setCourseData({...courseData, urls: videoKeys})

        //     return thumbnailKey;


        // } catch (err) {
        //     console.log(err)
        //     dispatch(resetLoading());
        //     return
        // }

        if (cover.length === 0) {               // FIREBASE
            return
        }

        const storage = getStorage(app);               
        


                const fileName = new Date().getTime() + cover.name;
                const storageRef = ref(storage, fileName);
        
                const uploadTask = uploadBytesResumable(storageRef, cover);
        
    
                const downloadURL = await new Promise((resolve, reject) => {
                    uploadTask.on('state_changed',
                  (snapshot) => {
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
                    switch (error.code) {
                      case 'storage/unauthorized':
                        break;
                      case 'storage/canceled':
                        break;
        
                      case 'storage/unknown':
                        break;
        
                      default: 
                      console.log('error')
                      dispatch(resetLoading());
                    }
                  }, 
                  () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    });
                  }
                );

                })

                return downloadURL


        // if (cover.length === 0) {               SERVER
        //     return
        // }

        // const formData = new FormData();

        // formData.append('thumb', cover)

        // try {
        //     const res = await privateRequest.post('/upload/thumb', formData, {
        //       headers: {
        //         'Content-Type': 'multipart/form-data',
        //       },
        //     });
        //     console.log(res)
        //     if (res.status === 200) {
        //       const data = await res.data.thumbPath;
              
        //       console.log('Thumbnail uploaded succesfully', data)
        //       return data;
        //     } else {
        //       console.log('Thumbnail upload failed')
        //     }
            
        //   } catch (err) {
        //     console.log(err)
        //   }
      
    }



    const handlePdfsUpload = async () => {
    
        if (pdfFiles) {
            
          const formData = new FormData();
          pdfFiles.forEach((file) => {
            formData.append('pdfs', file)
          });
          console.log(formData)
          
          try {
            const res = await privateRequest.post('/upload/pdfs', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log(res)
            if (res.status === 200) {
              const data = await res.data.uploadedPdfsPath;
              
              console.log('PDFs uploaded succesfully', data)
              return data;
            } else {
              console.log('File upload failed')
            }
            
          } catch (err) {
            console.log(err)
          }
    
        }
    
      }



    const handleUploadVideo = async () => {
        
console.log(files.length === 0)
        if (files.length === 0) {
            return
        }

        try{

            const formData = new FormData();

            for (let i = 0; i < files.length; i++) {
                formData.append('videoFiles', files[i]);
            }
            console.log(formData)
            
            const res = await privateRequest.post('/courses/tutorial', formData, {          ////////////////////////////////////////////////
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res.data)
            const videoKeys = res.data;

            console.log('File uploaded succesfully', videoKeys)

            setCourseData({...courseData, urls: videoKeys})

            return videoKeys;


        } catch (err) {
            console.log(err)
            dispatch(resetLoading());
        }
        
    }


    const saveVideoInfo = async (videoInfo) => {
        try {
            const response = await privateRequest.post('/courses/saveInfo', videoInfo);
            console.log('Video info saved:', response.data);
            return response.data.savedCourse;
        } catch (err) {
            console.log(err);
            dispatch(resetLoading());
        }
    };


    const valueCheck = () => {
        let values = Object.values(courseData);
        return values.includes(undefined)
    }
    
    

    const handleCreateCourse = async (e, dispatch) => {
        
        e.preventDefault();

        if(valueCheck()) {
            return setFormValidationError({...formValidationError, set: true, message: 'Faltan campos requeridos en tu formulario'})
        } else {
            setFormValidationError({...formValidationError, set: false, message: ''})
        }

        if(cover === null || files.length === 0 || pdfFiles.length === 0) {
            return setFormValidationError({...formValidationError, set: true, message: 'Faltan campos requeridos en tu formulario'})
        }
        
        dispatch(setLoading());

        try { 

            let thumbnail = await handleUploadThumbnail()

            let pdfs = await handlePdfsUpload()

            let urls = await handleUploadVideo()
            
            await setCourseData({...courseData, urls: urls, thumbnail: thumbnail, pdfs: pdfs})
            const data = {...courseData, urls: urls, thumbnail: thumbnail, pdfs: pdfs}
            
            if (urls?.length > 0 && thumbnail) {
                
                const savedCourseArray = [];

                const savedCourse = await saveVideoInfo(data).catch(err => {
                    console.error("Error saving video info:", err);
                    throw err;
                });
                
                savedCourseArray.push(savedCourse._id)
                
                handleActivateCourse(savedCourseArray, savedCourse.createdAt, '64cff3b67645a377b4f86dab');        //64af0b0509abffd390d6f6e7(test)   64cff3b67645a377b4f86dab

                dispatch(resetLoading());

                getCourses();

            }


        } catch (err) {
            console.log(err)
            dispatch(resetLoading());
        }



        
    }






  return (
    <Container>
        <Wrapper>
            <Left>
                <Top>
                    <ThumbContainer>
                        <ThumbnailLabel htmlFor='thumbnailfile'>
                            <Thumbnail src={cover ? URL.createObjectURL(cover) : NonImage} alt='thumbnail' />
                        </ThumbnailLabel>
                        <ThumbnailInput type='file' id='thumbnailfile' onChange={(e) => handleChangeCover(e)} />
                    </ThumbContainer>
                </Top>
                <Bottom>
                    <CourseData>
                        <InputContainer>
                            <Label>Título</Label>
                            <Input type='text' name='title' onChange={handleInputChange} />
                        </InputContainer>
                        <InputContainer>
                            <Label>Descripción</Label>
                            <Input type='text' name='description' onChange={handleInputChange} />
                        </InputContainer> 
                        <InputContainer>   
                            <Label>Duración Total (min.)</Label>
                            <Input type='number' name='duration' onChange={handleInputChange} />
                        </InputContainer>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                        <InputContainer>
                            <Label>Precio ($)</Label>
                            <Input type='number' name='price' onChange={handleInputChange} placeholder='$' />
                        </InputContainer>
                        <InputContainer>
                            <Label>Precio Dolares (USD)</Label>
                            <Input type='number' name='dolarPrice' onChange={handleInputChange} placeholder='u$s' />
                        </InputContainer>
                        </div>
                    </CourseData>
                {/*<input type='file' multiple name='videoFile' accept='.mov, .avi, .mp4' onChange={handleChange}></input>
                <input type='file' multiple name='videoFile' accept='.mov, .avi, .mp4' onChange={handleChange}></input>*/}
                </Bottom>
            </Left>
            <Right>
                {pdfFiles.length > 0 ? 
                    <PdfsLabel htmlFor='pdffiles' style={{backgroundColor: '#e72020', color: '#fff'}}><PictureAsPdfIcon />Agregar PDFs<CheckIcon style={{color: '#fff'}} /></PdfsLabel>
                :
                    <PdfsLabel htmlFor='pdffiles' ><PictureAsPdfIcon />Agregar PDFs</PdfsLabel>
                }
                <AddPdfsButton id='pdffiles' type='file' name='pdfs' onChange={handlePdfsChange} multiple />
                {files.length < 15 ? (
                    <AddVideoButton onClick={addInput}><VideoCallIcon />Agregar Video</AddVideoButton>
                ) : <AddVideoButton disabled><VideoCallIcon />Agregar Video</AddVideoButton>}
                <div style={{maxHeight: '70vh', overflowY: 'scroll', overflowX: 'hidden', width: '100%'}}>
                {files.map((file, index) => (
                    <VideoInputContainer key={index}>
                        <Label htmlFor={`file${index}`} >Seleccionar Video {index + 1}</Label>
                        <VideoInput type='file' id={`file${index}`} accept='.mov, .avi, .mp4' onChange={(e) => handleChange(e, index)} />
                        {files[index] ? 
                        <IconContainer><CheckIcon style={{color: 'green'}} /></IconContainer>
                        :
                        <></>
                        }
                    </VideoInputContainer>
                ))}
                </div>
                <UploadVideoButton onClick={(e) => handleCreateCourse(e, dispatch)}>CREAR CURSO</UploadVideoButton>
                {formValidationError.set ? <p style={{color: 'red', textAlign: 'center'}}>{formValidationError.message}</p>
                : <></>}
            </Right>
        </Wrapper>
        <Wrapper2>
            <Content>
                <Title>Cursos</Title>
                <CoursesContainer>
                {courses?.map((course) => {
                    return (
                        <Course key={course._id}>
                            <CourseThumbnailContainer>
                                <CourseThumbnail src={course.thumbnail} alt={course.title} />
                            </CourseThumbnailContainer>
                            <CourseTitle>{course.title}</CourseTitle>
                            <DeleteButton onClick={(e) => handleDeleteCourse(e, course._id, course.urls, course.thumbnail)}><HighlightOffRoundedIcon /></DeleteButton>
                        </Course>
                    )
                })}
                </CoursesContainer>
            </Content>
        </Wrapper2>
    </Container>
  )

}

export default Courses;