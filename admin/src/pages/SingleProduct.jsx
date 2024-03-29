import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { publicRequest } from '../api/axios';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, updateProduct } from '../redux/httpRequests';
import NonImage from '../Images/image.png';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import app from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { resetLoading, setLoading } from '../redux/loadingSlice';
import TextField from '@mui/material/TextField';
import BasicModal from '../components/Modal';
import ColorPicker from '../components/ColorPicker';
import ConfirmationModal from '../components/ConfirmationModal';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { mobile } from '../responsive';



const Container = styled.div`
  width: 80vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  ${mobile({width: '100vw', height: '100vh'})}
`


const SingleContainer = styled.div`
  display: flex;
  height: 90%;
  ${mobile({flexDirection: 'column'})}
`

const Top = styled.div`
  padding: 20px;
  display: flex;
  box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
  -webkit-box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
  -moz-box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`

const Left = styled.div`
  flex: 1;
  height: 90%;
  margin-top: 20px;
  ${mobile({margin: '20px', height: '100%'})}
`

const ImgContainer = styled.div`
  box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
  -webkit-box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
  -moz-box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
  border-radius: 10px;
  height: 100%;
  padding: 40px;
  margin-right: 20px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  ${mobile({boxShadow: 'none', padding: '0px', marginRight: '0px', width: '90%'})}
`

const EditButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  font-size: 12px;
  color: #7451f8;
  background-color: #7551f818;
  cursor: pointer;
  border-radius: 0px 0px 0px 5px;
`

const Item = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`


const ItemDetail = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`


const Form = styled.form`
  box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
  -webkit-box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
  -moz-box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
  border-radius: 10px;
  height: 100%;
  padding: 40px;
  margin-right: 20px;
  margin-top: 20px;
  width: 40vw;
  display: flex;
  justify-content: center;
  ${mobile({boxShadow: 'none', width: '90vw', marginRight: '0px', padding: '0px', marginBottom: '50px'})}
`


const Right = styled.div`
  flex: 2;
  height: 90%;
  margin-top: 20px;
  ${mobile({display: 'flex', flex: '1', justifyContent: 'center', height: '100%', marginTop: '0px'})}
`

const Bottom = styled.div`
  box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
  -webkit-box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
  -moz-box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
`

const ConfirmButtom = styled.button`
  margin-top: 30px;
  width: 150px;
  padding: 10px;
  border: none;
  background-color: teal;
  color: white;
  font-weight: bold;
  cursor: pointer;
  ${mobile({marginBottom: '30px'})}

`


const Img = styled.img`
  width: 400px;
  height: 400px;
  border-radius: 10px;
  object-fit: cover;
  position: relative;
  cursor: pointer;
  

  &:hover {
        box-shadow: 0px 0px 10px 2px rgba(33,110,140,0.65);
        -webkit-box-shadow: 0px 0px 10px 2px rgba(33,110,140,0.65);
        -moz-box-shadow: 0px 0px 10px 2px rgba(33,110,140,0.65);
        //border: 4px rgb(33,110,140) solid;
    }
`


const ImgInput = styled.div`
  height: 100%;
  
`

const ImgForm = styled.div`
  width: 400px;
  height: 400px;
  margin-left: 7.5px;
  display: flex;
  position: relative;
  
`

const ImgLabel = styled.label`
  position: relative;
`

const ImgInputF = styled.input`
  position: absolute;
`

const FormContainer = styled.div`
  width: 30vw;
  ${mobile({width: '90vw', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'})}
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

const Label = styled.label`
  display: flex;
  align-items: center;
  font-weight: 700;
`

const RadioInput = styled.input`
  
`

const RadioLabel = styled.label`
  
`

const Select = styled.select`
  font-size: 15px;
`

const Option = styled.option`

`

const Images = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

const Img1 = styled.img`
    flex: 1;
    max-height: 110px;
    max-width: 110px;
    margin: 0px 15px 15px 15px;
    border-radius: 10px;
    object-fit: cover;

    
`

const EditIcon = styled.div`
  display: flex;
  position: absolute;
  z-index: 3;
  background-color: lightgray;
  justify-content: center;
  align-items: center;
  right: 0;
  border-radius: 10px;
  padding: 20px;
  opacity: 0.6;
`




const SingleProduct = () => {

    const dispatch = useDispatch();

    const categories = useSelector((state) => state.category.categories);


    useEffect(() => {
      dispatch(getCategories());
    }, [dispatch])



    const [product, setProduct] = useState({});
    const [files, setFiles] = useState([]);
    const [sizeArray, setSizeArray] = useState({ sizes: ['']});
    const [pics, setPics] = useState([]);
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
    const [open, setOpen] = useState(false);
    const [formValidationError, setFormValidationError] = useState({
      set: false,
      message: ''
    });

    useEffect(() => {
        setFormValidationError({...formValidationError, set: false, message: ''})
    }, [product])

    
    
    const handleOpen = (e) => {
      e.preventDefault()
      setOpen(true);
    }
    
    const handleClose = (e) => {
      e.preventDefault()
      setOpen(false);
    }




    const loading = useSelector((state) => state.loading.isLoading)

    const location = useLocation();

    const id = location.pathname.split("/")[2];

    const navigate = useNavigate();






    useEffect(() => {
      // alert
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/products/" + id)
                setProduct(res.data);
                setPics(res.data.img);
                setColor(res.data.color);
                setSizeArray({
                  sizes: res.data.size
                });
            } catch (err) {
                console.log(err)
            }
        }
        getProduct();
    }, [id])


    const errorCheck = () => {
        let errors = Object.values(error);
        console.log(errors)
        return errors.includes(true)
    }
    
    const valueCheck = () => {
        let values = Object.values(product);
        console.log(values)
        return values.includes(undefined)
    }



    const handleUpdate = (e, id, product) => {

      e.preventDefault()


      if(errorCheck()) {
          return setFormValidationError({...formValidationError, set: true, message: 'Hay errores en tu formulario'}), setOpen(false)
      } else {
          setFormValidationError({...formValidationError, set: false, message: ''})
      }

      
      if(valueCheck()) {
          return setFormValidationError({...formValidationError, set: true, message: 'Faltan campos requeridos en tu formulario'}), setOpen(false)
      } else {
          setFormValidationError({...formValidationError, set: false, message: ''})
      }



      dispatch(setLoading())
      setOpen(false)

      if (files.length > 0) {

        let oldImages = pics;

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
          dispatch(updateProduct({id, product:{...product, img: result, color: color, size: sizeArray.sizes}}))
          dispatch(resetLoading())
          
            
        }
        
        try {
          
          uploadFiles()


          try {           // new delete old images

            if (oldImages) {
      
              const storage = getStorage();
      
              const deleteFiles = async () => {
      
                let result = await Promise.all(
      
                  oldImages.map((im) => {
                    return new Promise((resolve, reject) => {
                    const desertRef = ref(storage, im);
      
                    deleteObject(desertRef).then(() => {
                      console.log('Images deleted succesfully')
                      resolve()
                    }).catch((error) => {
                      console.log(error)
                      reject()
                    });
      
                    })
                  })
                )
              }
      
              deleteFiles()
            }
  
          } catch (err) {
            console.log(err)
            console.log('Could not delete old Images')
          }


        } catch (err) {
          console.log(err)
        }

        
        

        

      } else {
        console.log('no hay file')
        dispatch(updateProduct({id, product:{...product, color: color, size: sizeArray.sizes}}))
        dispatch(resetLoading())
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


    const includedSize = (size) => {
      return sizeArray.sizes.includes(size)
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
        setProduct({
          ...product, title: e.target.value
        })   
      }
    }

    const handleAddFile = (e) => {

      setFiles([])

      for (let i = 0; i < e.target.files.length; i++ ) {
        const newImage = e.target.files[i];
        newImage['id'] = i;
        setFiles((prevState) => [...prevState, newImage])
      }

    }


    const handleCategoriesChange = (e) => {
      setProduct({
        ...product, categories: e.target.value
      })
    }

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


    const validateValue = (name, value) => {

      console.log(name)
      console.log(value)
    }
    
    const handleTargetChange = (e) => {

      if(e.target.value.length > 30) {
        setError({
          ...error, [e.target.name]: true,
        });
        setErrorText({
          ...errorText, [e.target.name]: "conditions[0].errorTextValue",
        });
      } else {
        setError({
          ...error, [e.target.name]: false,
        });
        setErrorText({
          ...errorText, [e.target.name]: '',
        });
        setProduct({
          ...product, [e.target.name]: e.target.value
        });
      }
    }

    const handleWeightChange = (e) => {
      if (e.target.value < 0 || isNaN(e.target.value) || e.target.value > 100) {
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
        setProduct({
          ...product, weight: e.target.value
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
        setProduct({
          ...product, price: e.target.value
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
        setProduct({
          ...product, description: e.target.value
        })   
      }
    }


  return (
    <Container>
      <BackButton onClick={(e) => navigate('/products')}>
        <ChevronLeftIcon style={{fontSize: '30px'}}/>
      </BackButton>
      <SingleContainer>
          <Left>
            <ImgContainer>
              {/*<Img src={product?.img} alt="avatar" />*/}
              <ImgForm>
                <ImgInput>
                  <ImgLabel htmlFor='file'>
                    {product?.img ? <Img src={files[0] ? URL.createObjectURL(files[0]) : product?.img[0]} alt="Agregar Imagen"/> :
                    <Img src={files[0] ? URL.createObjectURL(files[0]) : NonImage} alt="user"/>
                    }
                  </ImgLabel>
                  <ImgInputF type="file" id="file" multiple onChange={handleAddFile} style={{ display: "none" }}/>
                </ImgInput>
                <EditIcon>
                  <ModeEditIcon />
                </EditIcon>
              </ImgForm>
              <Images>
                <div style={{display: 'flex', flexDirection: 'row'}} >
                  {files[0] ? <Img1 src={files[1] ? URL.createObjectURL(files[1]) : NonImage} /> : <Img1 src={pics[1] ? pics[1] : NonImage} />}
                  {files[0] ? <Img1 src={files[2] ? URL.createObjectURL(files[2]) : NonImage} /> : <Img1 src={pics[2] ? pics[2] : NonImage} />}
                  {files[0] ? <Img1 src={files[3] ? URL.createObjectURL(files[3]) : NonImage} /> : <Img1 src={pics[3] ? pics[3] : NonImage} />}
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                  {files[0] ? <Img1 src={files[4] ? URL.createObjectURL(files[4]) : NonImage} /> : <Img1 src={pics[4] ? pics[4] : NonImage} />}
                  {files[0] ? <Img1 src={files[5] ? URL.createObjectURL(files[5]) : NonImage} /> : <Img1 src={pics[5] ? pics[5] : NonImage} />}
                </div >
              </Images>
            </ImgContainer>
          </Left>
          <Right>
            <Form>
              <FormContainer>
                  <EditButton>Editar</EditButton>
                  <Item>
                    <Details>
                      <ItemDetail>
                        <TextField 
                          required 
                          id="outlined-required" 
                          name='title' 
                          label='Nombre' 
                          value={`${product?.title}`} 
                          onChange={handleTitleChange}
                          error={error.title}
                          helperText={errorText.title}
                          />
                      </ItemDetail>
                      <ItemDetail>
                          <Label>Categoria</Label>
                            <div style={{display: 'flex', flexDirection: 'row', marginTop: '10px'}} >
                              <Select name="categories" onChange={handleCategoriesChange} style={{marginRight: '20px', color: '#5e5e5e', fontSize: '15px'}} value={`${product?.categories}`}>
                              <Option key={1} style={{fontSize: '10px', color: 'lightgray'}} disabled >
                                  Categorias...
                              </Option>
                                {categories.map((cat) => {
                                  return(
                                    <Option key={cat._id} value={cat.name}>{cat.name}</Option>
                                  )
                                })}
                              </Select>
                              <BasicModal name={"+ Agregar categoria"} title={"Categoria"} cats={categories}/>
                            </div>
                      </ItemDetail>
                      {/*<ItemDetail>
                        <Label>Tamano</Label>
                        <div style={{display: 'flex', flexDirection: 'row', marginTop: '10px'}} >
                        {sizesDefault.map((size) => {
                          return(
                            <div key={size._id} style={{display: 'flex', flexDirection: 'column'}}>
                              <div style={{display: 'flex', flexDirection: 'row'}}>
                              <RadioLabel style={{fontWeight: '400',  marginRight: '10px'}}>{size.name}</RadioLabel>
                              { includedSize(size.name) ?
                                <RadioInput checked style={{fontSize: '10px', height: '20px', width: '20px', marginRight: '20px'}} type="checkbox" name={size.name} value={size.name} key={size._id} onChange={handleCheckboxChange} /> :
                                <RadioInput style={{fontSize: '10px', height: '20px', width: '20px', marginRight: '20px'}} type="checkbox" name={size.name} value={size.name} key={size._id} onChange={handleCheckboxChange} />
                              }
                              
                              </div>
                            </div>
                          )
                        })}
                        </div>
                      </ItemDetail>
                      <ItemDetail>
                        <Label style={{marginBottom: '10px'}} >Color</Label>
                        <ColorPicker setColor={setColor} color={color}>
                        </ColorPicker>
                      </ItemDetail>*/}
                      <ItemDetail style={{flexDirection: 'row', gap: '10px'}}>
                        <TextField 
                        required 
                        id="outlined-required" 
                        name='weight' 
                        label='Peso' 
                        value={`${product?.weight}`} 
                        onChange={handleWeightChange}
                        error={error.weight}
                        helperText={errorText.weight} 
                        />
                      </ItemDetail>
                      <ItemDetail>
                        <TextField 
                        required 
                        id="outlined-required" 
                        name='price' 
                        label='Precio' 
                        value={`${product?.price}`} 
                        onChange={handlePriceChange}
                        error={error.price}
                        helperText={errorText.price} 
                        />
                      </ItemDetail>
                      <ItemDetail>
                        <TextField 
                        required 
                        id="outlined-required" 
                        name='description' 
                        label='Descripcion' 
                        value={`${product?.description}`} 
                        onChange={handleDescriptionChange}
                        error={error.description}
                        helperText={errorText.description}
                        multiline
                        rows={5}
                        />
                      </ItemDetail>
                      {formValidationError.set ? <p style={{color: 'red', textAlign: 'center', fontSize: '14px'}}>{formValidationError.message}</p>
                         : <></>}
                    </Details>
                    
                  </Item>
                  {loading ? <ConfirmButtom style={{cursor: 'default', backgroundColor: 'lightgray'}} disabled><Stack sx={{ color: 'white', display: 'flex', justifyContent: 'center' }} spacing={0} direction="row"><CircularProgress size="1rem" color="inherit" /></Stack></ConfirmButtom> :
                        <ConfirmationModal
                        open={open} 
                        close={handleClose} 
                        children={<ConfirmButtom onClick={handleOpen}>Actualizar</ConfirmButtom>}
                        title='Modificar'
                        text='Estas seguro que deseas modificar este producto?'
                        fn={(e) => handleUpdate(e, id, product)}
                      />}
              </FormContainer>
            </Form>
          </Right>
      </SingleContainer>
    </Container>
  )
}

export default SingleProduct;