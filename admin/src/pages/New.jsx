import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addProduct, getCategories } from '../redux/httpRequests';
import NonImage from '../Images/image.png';
import ColorPicker from '../components/ColorPicker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../services/firebase';
import BasicModal from '../components/Modal';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { resetLoading, setLoading } from '../redux/loadingSlice';
import { mobile } from '../responsive';


const Container = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  ${mobile({width: '100vw'})}
`

const Title = styled.h1`
  color: #000;
  font-size: 50px;
  display: flex;
  position: absolute;
  top: 50px;
`

const Bottom = styled.div`
  box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
  -webkit-box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
  -moz-box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
  padding: 10px;
  margin: 20px;
  display: flex;
  width: 80%;
  border-radius: 10px;
  padding: 40px;
  height: 70vh;
  display: flex;
  ${mobile({flexDirection: 'column', boxShadow: 'none', width: '90%', gap: '40px'})}
`

const Left = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`

const Img = styled.img`
  width: 400px;
  height: 400px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid black;
  position: relative;
  cursor: pointer;
`

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  width: 100%;
  ${mobile({marginTop: '20px'})}
`

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const FormInput = styled.div`
  width: 70%;
  ${mobile({width: '90%'})}
`

const ImgInput = styled.div`
  height: 100%;
  
`

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  font-weight: 700;
`

const Input = styled.input`
  width: 100%;
  padding: 5px;
  border: none;
  border-bottom: 1px solid gray;
  margin-top: 10px;

  &:focus {
    outline: none;
    border-bottom: 2px solid lightblue;
  }

  &:active {
  }
`

const Select = styled.select`
  font-size: 15px;
`

const Option = styled.option`
`

const Button = styled.button`
  width: 150px;
  padding: 10px;
  border: none;
  background-color: teal;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  ${mobile({marginBottom: '50px'})}
`

const ImgForm = styled.form`
  width: 400px;
  height: 400px;
`

const ImgLabel = styled.label`
  position: relative;
  background-color: #eeeeee;
  border-radius: 10px;
  ${mobile({backgroundColor: 'transparent'})}
`

const ImgInputF = styled.input`
  position: absolute;
`


const TextArea = styled.textarea`
  width: 100%;
  height: 150px;

  &:focus {
    outline: none;
  }
`

const RadioInput = styled.input`
  
`

const RadioLabel = styled.label`
  
`

const BackButton = styled.button`
  display: flex;
  justify-content: flex-start;
  background-color: transparent;
  border: none;
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
`

const ImgContainer = styled.div`
    height: 70vh;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    ${mobile({flexDirection: 'column', gap: '20px', marginTop: '60px'})}
`

const ImageWrapper = styled.div`
    flex: 4;
    display: flex;
    justify-content: center;
`

const Image = styled.img`
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
    cursor: pointer;
    max-height: 60vh;
    max-width: 30vw;
    border-radius: 10px;
    border: 1px solid darkgray;
    ${mobile({maxWidth: '90vw'})}
`

const Images = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    ${mobile({flexDirection: 'column'})}
`

const TinyImg = styled.div`
    flex: 1;
    height: 100px;//
    width: 100px;//
    margin: 0px 15px 15px 15px;
    background-color: transparent;
    ${mobile({maxWidth: '100px', maxHeight: '100px'})}
`

const Error = styled.span`
  font-size: 10px;
  color: red;
`

const Mobile = styled.div`
  ${mobile({display: 'flex', flexDirection: 'row'})}
`


const New = () => {

    const [inputRef, setInputRef] = useState({});
    const [files, setFiles] = useState([]);
    const [sizeArray, setSizeArray] = useState({ sizes: []});
    const [color, setColor] = useState([{
      hex:'#000',
    }]);
    const [error, setError] = useState({
      title: false,
      category: false,
      price: false,
      description: false,
      weight: false,
    });
    const [errorText, setErrorText] = useState({
      title: '',
      category: '',
      price: '',
      description: '',
      weight: '',
    });
    const [formValidationError, setFormValidationError] = useState({
      set: false,
      message: ''
    });
    console.log(files)
    const loading = useSelector((state) => state.loading.isLoading)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);
    
    useEffect(() => {
      dispatch(getCategories());
    }, [dispatch])

    useEffect(() => {
        setFormValidationError({...formValidationError, set: false, message: ''})
    }, [inputRef])

    useEffect(() => {
      const setinputRefdata = async () => {
          setInputRef({
              title: undefined,
              price: undefined,
              weight: undefined,
              description: undefined
          })   
      }
      setinputRefdata()
  }, [])


    const handleAddFile = (e) => {

      for (let i = 0; i < e.target.files.length; i++ ) {
        const newImage = e.target.files[i];
        newImage['id'] = i;
        setFiles((prevState) => [...prevState, newImage])
      }

    }

    const handleChange = (e) => {
        e.preventDefault()
        setInputRef(prev => {
            return { ...prev, [e.target.name]: e.target.value}
        });
    }


    const errorCheck = () => {
        let errors = Object.values(error);
        console.log(errors)
        return errors.includes(true)
    }
    
    const valueCheck = () => {
        let values = Object.values(inputRef);
        console.log(values)
        return values.includes(undefined)
    }


    
    

    const handleTitleChange = (e) => {
      if (e.target.value.length > 30) {
        setError({
          ...error, title: true,
        })
        setErrorText({
          ...errorText, title: 'El largo del titulo no puede ser mayor a 20 caracteres',
        });
      } else {
        setError({
          ...error, title: false,
        })
        setErrorText({
          ...errorText, title: '',
        });
        setInputRef({
          ...inputRef, title: e.target.value
        })   
      }
    }


    const handleWeightChange = (e) => {
      if (e.target.value < 0 || isNaN(e.target.value) || e.target.value > 40) {
        setError({
          ...error, weight: true,
        });
        setErrorText({
          ...errorText, weight: 'El peso debe ser un numero mayor a 0 y menor a 100',
        });
      } else {
        setError({
          ...error, weight: false,
        });
        setErrorText({
          ...errorText, weight: '',
        });
        setInputRef({
          ...inputRef, weight: e.target.value
        });
      }
    }


    const handlePriceChange = (e) => {
      if (e.target.value < 0 || isNaN(e.target.value)) {
        setError({
          ...error, price: true,
        });
        setErrorText({
          ...errorText, price: 'El precio debe ser un numero mayor a 0',
        });
      } else {
        setError({
          ...error, price: false,
        });
        setErrorText({
          ...errorText, price: '',
        });
        setInputRef({
          ...inputRef, price: e.target.value
        });
      }
    }


    const handleDescriptionChange = (e) => {
      if (e.target.value.length > 2280) {
        setError({
          ...error, description: true,
        })
        setErrorText({
          ...errorText, description: 'El largo de la descripcion no puede ser mayor a 280 caracteres',
        });
      } else {
        setError({
          ...error, description: false,
        })
        setErrorText({
          ...errorText, description: '',
        });
        setInputRef({
          ...inputRef, description: e.target.value
        })   
      }
    }



console.log(inputRef)

    const handleCheckboxChange = (e) => {
      const { value, checked } = e.target;
      const { sizes } = sizeArray;


      if (checked) {
        setSizeArray({
          sizes: [...sizes, value]
        });
      } else {
        setSizeArray({
          sizes: sizes.filter((e) => e !== value)
        })
      }
        
    }

    const handleClick = (e) => {

      
      e.preventDefault();


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


      dispatch(setLoading())

      if (files) {

        
        const storage = getStorage(app);
        
        const uploadFiles = async () => {

          let result = await Promise.all(
            files.map((file) => {

              return new Promise((resolve, reject) => {

                const fileName = new Date().getTime() + file.name;
                const storageRef = ref(storage, fileName);
        
                const uploadTask = uploadBytesResumable(storageRef, file);
        
        
        
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
                    }
                    dispatch(resetLoading())
                  }, 
                  () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                      resolve(downloadURL)
                    });
                  }
                );
  

              })
              

            })
          )
          dispatch(addProduct({...inputRef, img: result, color: color, size: sizeArray.sizes, price: parseInt(inputRef.price)}))
          dispatch(resetLoading())
          navigate('/products')
          
            
        }
        
        uploadFiles()
        
        

      } else {

        const newProduct = ({...inputRef, color: color, size: sizeArray.sizes, price: parseInt(inputRef.price)})
        dispatch(addProduct(newProduct))
        dispatch(resetLoading())
        navigate('/products')
      }
        
      

    }


    const sizesDefault = [
      {
        id: 0,
        name: 'XXS'
      },
      {
        id: 1,
        name: 'XS'
      },
      {
        id: 2,
        name: 'S'
      },
      {
        id: 3,
        name: 'M'
      },
      {
        id: 4,
        name: 'L'
      },
      {
        id: 5,
        name: 'XL'
      },
      {
        id: 6,
        name: 'XXL'
      },
    ]
    
console.log(files)
  return (
        <Container>
            <BackButton onClick={(e) => navigate('/products')}>
              <ChevronLeftIcon style={{fontSize: '30px'}}/>
            </BackButton>
            <Bottom>
                <Left>
                  {/*}
                    <Title>{inputRef?.name}</Title>
                    <ImgForm>
                      <ImgInput>
                        <ImgLabel htmlFor='file'>
                          <Img src={files ? URL.createObjectURL(files[0]) : NonImage} alt="user" /> 
                        </ImgLabel>
                        <ImgInputF type="file" id="file" multiple onChange={handleAddFiles} style={{ display: "none" }}/>
                      </ImgInput>
                    </ImgForm>
                  */}
                  <ImgContainer>
                      <ImageWrapper>
                          <ImgLabel htmlFor='file'>
                            <Image src={files[0] ? URL.createObjectURL(files[0]) :  NonImage} alt="user" /> 
                          </ImgLabel>
                          <ImgInputF type="file" id="file" multiple onChange={handleAddFile} style={{ display: "none" }}/>
                      </ImageWrapper>
                      <Images>
                          <Mobile>
                          <TinyImg>
                              <Image style={{width: '100%', height: '100%', borderRadius: '10px', border: '1px solid darkgray'}} src={files[1] ? URL.createObjectURL(files[1]) :  NonImage} alt="user" />  
                          </TinyImg>
                          <TinyImg>
                              <Image style={{width: '100%', height: '100%', borderRadius: '10px', border: '1px solid darkgray'}} src={files[2] ? URL.createObjectURL(files[2]) :  NonImage} alt="user" />  
                          </TinyImg>
                          <TinyImg>
                              <Image style={{width: '100%', height: '100%', borderRadius: '10px', border: '1px solid darkgray'}} src={files[3] ? URL.createObjectURL(files[3]) :  NonImage} alt="user" />  
                          </TinyImg>
                          </Mobile>
                          <Mobile>
                          <TinyImg>
                              <Image style={{width: '100%', height: '100%', borderRadius: '10px', border: '1px solid darkgray'}} src={files[4] ? URL.createObjectURL(files[4]) :  NonImage} alt="user" />  
                          </TinyImg>
                          <TinyImg>
                              <Image style={{width: '100%', height: '100%', borderRadius: '10px', border: '1px solid darkgray'}} src={files[5] ? URL.createObjectURL(files[5]) :  NonImage} alt="user" />  
                          </TinyImg>
                          </Mobile>
                      </Images>
                  </ImgContainer>
                </Left>
                <Right>
                    <Form>
                        
                        <FormInput>
                            <Label>Nombre</Label>
                            <Input type='text' placeholder='Producto...' name='title' onChange={handleTitleChange} />
                            <Error>{error.title ? errorText.title : <></>}</Error>
                            <Label>Categoria</Label>
                            <div style={{display: 'flex', flexDirection: 'row', marginTop: '10px'}} >
                              <Select name="categories" onChange={handleChange} style={{marginRight: '20px', color: '#5e5e5e', fontSize: '15px'}} defaultValue='Categorias...'>
                              <Option style={{fontSize: '10px', color: 'lightgray'}} disabled >
                                  Categorias...
                              </Option>
                                {categories.map((cat) => {
                                  return(
                                    <Option value={cat.name} key={cat._id}>{cat.name}</Option>
                                  )
                                })}
                              </Select>
                              <BasicModal name={"+ Agregar categoria"} title={"Categoria"} cats={categories} />
                            </div>
                            {/*<Label>Tamano</Label>
                                <div style={{display: 'flex', flexDirection: 'row', marginTop: '10px'}} >
                                {sizesDefault.map((size) => {
                                  return(
                                    <div key={size._id} style={{display: 'flex', flexDirection: 'column'}}>
                                      <div style={{display: 'flex', flexDirection: 'row'}}>
                                      <RadioLabel style={{fontWeight: '400',  marginRight: '10px'}}>{size.name}</RadioLabel>
                                      <RadioInput style={{fontSize: '10px', height: '20px', width: '20px', marginRight: '20px'}} type="checkbox" name={size.name} value={size.name} key={size._id} onChange={handleCheckboxChange} />
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>*/}
                            <Label>Peso aproximado<p style={{fontWeight: '300', fontSize: '14px'}}>(en Kg. con (.) para decimales)</p></Label>
                            <div>
                              <Input style={{width: '25%', marginRight: '10px'}} type='number' placeholder='0.7' name='weight' onChange={handleWeightChange} />
                              
                            </div>
                            <Error>{error.weight ? errorText.weight : <></>}</Error>
                            {/*<Label style={{marginBottom: '10px'}} >Color</Label>
                            <ColorPicker setColor={setColor} color={color}>
                            </ColorPicker>*/}
                            <Label>Precio</Label>
                            <Input type='number' placeholder='120' name='price' onChange={handlePriceChange} />
                            <Error>{error.price ? errorText.price : <></>}</Error>
                            <Label>Descripcion</Label>
                            <TextArea style={{marginTop: '10px'}} type='text' placeholder='Descripcion...' name='description' onChange={handleDescriptionChange} />
                            <Error>{error.description ? errorText.description : <></>}</Error>
                            {formValidationError.set ? <p style={{color: 'red', textAlign: 'center', fontSize: '14px'}}>{formValidationError.message}</p>
                              : <></>}
                        </FormInput>


                            {/*<FormInput key={selector.id}>
                                <Label>Categoria</Label>
                                <Select name={selector.name}  onChange={handleChange}>
                                    {categories.map((option) => (
                                        <Option value={option.name} key={option._id}>{option.name}</Option>
                                    ))} 
                                </Select>
                                    </FormInput>*/}
                        {loading ? <Button style={{cursor: 'default', backgroundColor: 'lightgray'}} disabled><Stack sx={{ color: 'white', display: 'flex', justifyContent: 'center' }} spacing={0} direction="row"><CircularProgress size="1rem" color="inherit" /></Stack></Button> :
                        <Button onClick={handleClick}>Add</Button>}
                        
                    </Form>
                </Right>
            </Bottom>
        </Container>

  )
}

export default New;