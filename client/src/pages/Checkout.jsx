import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile, tablet2 } from "../responsive";
import { Link } from "react-router-dom";
import Stepper from "../components/Stepper";
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import PaymentTabs from "../components/PaymentTabs";
import { BASE_URL, publicRequest } from "../api/axios";
import axios from "axios";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { resetOrder, setOrderState } from "../redux/orderSlice";
import { removeCart } from "../redux/cartRedux";
import { createOrder, orderEmail } from "../redux/requests";

const Container = styled.div`
    display: flex;
    flex-direction: column;
` 

const Wrapper = styled.div`
    padding: 20px;
    margin: 10vh 5vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    ${mobile({ padding: '10px', margin: '10vh 10vw'})}
    ${tablet2({ padding: '10px', margin: '20vh 10vw'})}
`

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
    ${mobile({  fontSize: '26px', marginTop: '90px', marginBottom: '0px'})}

    
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4vw;
    padding: 20px;
    margin: 40px 0px;
    ${mobile({ flexDirection: 'column', margin: '20px 0px' })}
    ${tablet2({ flexDirection: 'column', margin: '20px 0px' })}
`

const TopButton = styled(Link)`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === "filled" ? 'none' : '2px solid #206884'};
    background-color: ${props => props.type === "filled" ? '#206884' : 'transparent'};
    color: ${props => props.type === "filled" ? 'white' : '#206884'};
    text-decoration: none;
    ${mobile({ margin: '20px 0px' })}
    ${tablet2({ margin: '40px 0px' })}
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 5vh 5vw;
    gap: 30px;
    ${mobile({ flexDirection: 'column', margin: '10px 0px' })}
    ${tablet2({ flexDirection: 'column', margin: '10px 0px' })}
`

const Summary = styled.div`
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid gray;
    border-radius: 10px;
    
`

const SummaryTitle = styled.h1`
    font-weight: 200;
    margin-bottom: 50px;
    text-align: center;

`

const SummaryItem = styled.span`
    margin: 20px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24px"};
`

const SummaryItemText = styled.span`

`

const Left = styled.div`
    flex: 2;
    border: 1px solid gray;
    border-radius: 10px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    ${mobile({ padding: '20px' })}
`

const Right = styled.div`
    flex: 1;
    ${mobile({ maxHeight: '80vh' })}
`

const DataContainer = styled.div`
    width: 100%;
`

const FormTitle = styled.h3`
    margin-bottom: 40px;
`

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`

const FinishButton = styled.button`
  cursor: pointer;
  text-decoration: none;
  margin: 40px 0px 10px 0px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #216E8C;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  border-radius: 10px;
  border: none;

  &:hover {
    background-color: #fff;
    border: 1px solid #216E8C;
    color: #216E8C;
  }
`

const Logo = styled.img`
    height: 80%;
    margin-left: 20px;
    border-radius: 10px;
`

const FormDiv = styled.div`
    display: flex;
    flex-direction: row; 
    width: 100%;
    gap: 15px;
    
    ${mobile({ flexDirection: 'column' })}
`



const Checkout = () => {

    const cart = useSelector(state => state.cart);

    const dispatch = useDispatch();
    
    const [loading, setLoading] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [order, setOrder] = useState([]);
    const [error, setError] = useState({
        email: false,
        repeatEmail: false,
        name: false,
        surname: false,
        personalId: false,
        phone: false,
        street: false,
        adressNum: false,
        postal: false,
        city: false,
        province: false,
        postFee: false,
    });
    const [errorText, setErrorText] = useState({
        email: '',
        repeatEmail: '',
        name: '',
        surname: '',
        personalId: '',
        phone: '',
        street: '',
        adressNum: '',
        postal: '',
        city: '',
        province: '',
        postFee: '',
    });
    const [tabNumber, setTabNumber] = useState(0);
    const [formValidationError, setFormValidationError] = useState({
        set: false,
        message: ''
    });
    const [postFee, setPostFee] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [apartmentLetter, setApartmentLetter] = useState(undefined);
    const [floorNum, setFloorNum] = useState(undefined);

    
    {/*const [cities, setCities] = useState([])*/}
    {/*const [selectedCity, setSelectedCity] = useState('');*/}

    useEffect(() => {
        setFormValidationError({...formValidationError, set: false, message: ''})
    }, [order])

    
    
    useEffect(() => {
        const getProvinces = async () => {
            try {
                const res = await axios.get("https://apis.datos.gob.ar/georef/api/provincias")
                setProvinces(res.data.provincias.sort((a,b) => a.nombre.localeCompare(b.nombre)));
            } catch (err) {
                console.log(err)
            }
        }
        getProvinces();
    }, [])

    
    {/*useEffect(() => {
        if (selectedProvince) {
            const getCities = async () => {
                try {
                    const res = await axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${selectedProvince}&max=1000`)
                    setCities(res.data.localidades);
                } catch (err) {
                    console.log(err)
                }
            }
            getCities();
        }
    }, [selectedProvince])*/}


    useEffect(() => {
        const setCartdata = async () => {
            setOrder({
                ...order, paymentMethod: 'mercadopago', amount: cart.total, products: cart.products,
                email: undefined,
                repeatEmail: undefined,
                name: undefined,
                surname: undefined,
                personalId: undefined,
                phone: undefined,
                street: undefined,
                adressNum: undefined,
                postal: undefined,
                city: undefined,
                province: undefined,    
            })   
        }
        setCartdata()
    }, [])

    useEffect (() => {
        const setDiscountAmount = async () => {
            setOrder({
                ...order, amount: cart.total - discount
            })
        }
        if(discount) {
            setDiscountAmount()
        } 
    }, [discount])


    //useEffect(() => {
    //    if (tabNumber === 1) {
    //        setOrder({...order, amount: cart.total - discount})
    //    } else {
    //        setDiscount(0)
    //        setOrder({...order, amount: cart.total})
    //    }
    //}, [tabNumber === 1])




    const handleChangeProvince = (e) => {
        setSelectedProvince(e.target.value);
        setOrder({
            ...order, province: e.target.value
        }) 
    };


    {/*const handleChangeCity = (e) => {
        setSelectedCity(e.target.value);
        setOrder({
            ...order, city: e.target.value
        }) 
    };*/}



    const handleTabChange = (tab) => {
        setTabNumber(tab)
        if (tab === 0) { 
            setOrder({...order, paymentMethod: 'mercadopago', amount: cart.total})
            setDiscount(0) 
        } else if (tab === 1) { 
            setOrder({...order, paymentMethod: 'transference'}) 
            setDiscount(order?.amount * 0.15) 
        } else { setOrder({...order, paymentMethod: 'paypal'})}
    }


    const errorCheck = () => {
        let errors = Object.values(error);
        console.log(errors)
        return errors.includes(true)
    }
    
    const valueCheck = () => {
        let values = Object.values(order);
        console.log(values)
        return values.includes(undefined)
    }


    const getPostFee = async (e, postal) => {

        e.preventDefault()

        if(postal.length < 4) {
            return
        }

        try {

        const res = await publicRequest.get('/postal');

        const resZone = await publicRequest.post('postal/zone', {postal: postal})
        
        const zone = resZone.data.postalZone; 
         
        const weightCategory = res.data.find(obj => obj.weight > cart.weight)

        if (zone === 'zoneA') {
            setPostFee(weightCategory.zoneA)
        } else if (zone === 'zoneB') {
            setPostFee(weightCategory.zoneB)
        } else if (zone === 'zoneC') {
            setPostFee(weightCategory.zoneC)
        } else if (zone === 'zoneD') {
            setPostFee(weightCategory.zoneD)
        } else {
            setError({...error, postFee: true})
            setErrorText({...errorText, postFee: 'No se pudo cargar el precio de envío'})
        }

        } catch (err) {

            setError({...error, postFee: true})
            setErrorText({...errorText, postFee: 'No se pudo cargar el precio de envío'})
        }

        

    }
    


    const handleEmailChange = (e) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
            setError({
                ...error, email: false,
            })
            setErrorText({
                ...errorText, email: '',
            });
            setOrder({
                ...order, email: e.target.value
            })   
        } else {
            setError({
                ...error, email: true,
            })
            setErrorText({
                ...errorText, email: 'La direccón electrónica no es una dirección válida',
            });
        }
    }

    const handleRepeatEmailChange = (e) => {
        if (order.email === e.target.value) {
            setError({
                ...error, repeatEmail: false,
            })
            setErrorText({
                ...errorText, repeatEmail: '',
            });
        } else {
            setError({
                ...error, repeatEmail: true,
            })
            setErrorText({
                ...errorText, repeatEmail: 'La dirección electrónica es diferente a la ingresada previamente',
            });
            setOrder({
                ...order, repeatEmail: 'ok'
            })   
        }
    }

    const handleNameChange = (e) => {
        if (e.target.value.length > 20) {
          setError({
            ...error, name: true,
          })
          setErrorText({
            ...errorText, name: 'El largo del nombre no puede ser mayor a 20 caracteres',
          });
        } else {
          setError({
            ...error, name: false,
          })
          setErrorText({
            ...errorText, name: '',
          });
          setOrder({
            ...order, name: e.target.value
          })   
        }
    }

    const handleSurnameChange = (e) => {
        if (e.target.value.length > 30) {
          setError({
            ...error, surname: true,
          })
          setErrorText({
            ...errorText, surname: 'El largo del apellido no puede ser mayor a 20 caracteres',
          });
        } else {
          setError({
            ...error, surname: false,
          })
          setErrorText({
            ...errorText, surname: '',
          });
          setOrder({
            ...order, surname: e.target.value
          })   
        }
    }

    const handlePersonalIdChange = (e) => {
        if (e.target.value.length === 8) {
            setError({
                ...error, personalId: false,
            })
            setErrorText({
                ...errorText, personalId: '',
            });
            setOrder({
                ...order, personalId: e.target.value
            })   
        } else {
            setError({
                ...error, personalId: true,
            })
            setErrorText({
                ...errorText, personalId: 'El número de DNI debe contener ocho números',
            });
        }
    }

    const handlePhoneChange = (e) => {
        if (e.target.value.length === 10) {
            setError({
                ...error, phone: false,
            })
            setErrorText({
                ...errorText, phone: '',
            });
            setOrder({
                ...order, phone: e.target.value
            })       
        } else {
            setError({
                ...error, phone: true,
            })
            setErrorText({
                ...errorText, phone: 'El número de teléfono debe contener diez números y comenzar con 11 o 15',
            });
         
        }
    }

    const handleStreetChange = (e) => {
        if (e.target.value.length < 30) {
            setError({
                ...error, street: false,
            })
            setErrorText({
                ...errorText, street: '',
            });
            setOrder({
                ...order, street: e.target.value
            })       
        } else {
            setError({
                ...error, street: true,
            })
            setErrorText({
                ...errorText, street: 'El largo de la calle no puede ser mayor a 20 caracteres',
            });
         
        }
    }

    const handleAdressNumChange = (e) => {
        if (e.target.value >= 1) {
            setError({
                ...error, adressNum: false,
            })
            setErrorText({
                ...errorText, adressNum: '',
            });
            setOrder({
                ...order, adressNum: e.target.value
            })       
        } else {
            setError({
                ...error, adressNum: true,
            })
            setErrorText({
                ...errorText, adressNum: 'La altura debe ser mayor o igual a 1',
            });
         
        }
    }

    const handleFloorNumChange = (e) => {
        setFloorNum(e.target.value) 
    }

    const handleApartmentChange = (e) => {
        setApartmentLetter(e.target.value)
    }

    const handlePostalChange = (e) => {
        if (e.target.value > 1000 && e.target.value < 9432) {
            setError({
                ...error, postal: false,
            })
            setErrorText({
                ...errorText, postal: '',
            });
            setOrder({
                ...order, postal: e.target.value
            })
            getPostFee(e, e.target.value)       
        } else {
            setError({
                ...error, postal: true,
            })
            setErrorText({
                ...errorText, postal: 'No existe ese código postal',
            });
         
        }
    }


    const handleCityChange = (e) => {
        if (e.target.value.length > 25) {
          setError({
            ...error, city: true,
          })
          setErrorText({
            ...errorText, city: 'El largo de la ciudad no puede ser mayor a 25 caracteres',
          });
        } else {
          setError({
            ...error, city: false,
          })
          setErrorText({
            ...errorText, city: '',
          });
          setOrder({
            ...order, city: e.target.value
          })   
        }
    }






    const handleMercadoPago = async () => {

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

        if (floorNum) {
            order['floor'] = floorNum;
        }

        if (apartmentLetter) {
            order['apartment'] = apartmentLetter;
        }

        
        order.amount = order.amount + postFee;

        console.log('ok')

        setLoading(true)



        //dispatch(setOrderState(order))

        try{
            const saveOrder = () => dispatch(createOrder(order))
            await saveOrder().unwrap().then((resData) => dispatch(orderEmail(resData)))
        } catch (err) {
            console.log(err)
            return console.log('El pedido no pudo ser realizado')
        }

        //const orderData = cart

        await publicRequest.post(`${BASE_URL}/payments/checkout`, order)
            .then((res) => window.location.href = res.data.init_point)

    }

    
    const handleTransference = async () => {
        
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

        if (floorNum) {
            order['floor'] = floorNum;
        }

        if (apartmentLetter) {
            order['apartment'] = apartmentLetter;
        }

        order.amount = order.amount + postFee;
        
        console.log('ok')

        setLoading(true)
        
        try{
            const saveOrder = () => dispatch(createOrder(order))
            await saveOrder().unwrap().then((resData) => dispatch(orderEmail(resData)))
        } catch (err) {
            console.log(err)
            return console.log('El pedido no pudo ser realizado')
        }

        window.location.href = 'https://lanuderia.com/pending';

    }


    const handlePaypal = async () => {

        setLoading(true)

        dispatch(setOrderState(order))

        const orderData = cart

        if (discount) {
            orderData.total = cart.total - discount;

            await publicRequest.post(`${BASE_URL}/payments/paypal/create-order`, orderData)
            .then((res) => window.location.href = res.data.links[1].href)

        } else {
            await publicRequest.post(`${BASE_URL}/payments/paypal/create-order`, orderData)
            .then((res) => window.location.href = res.data.links[1].href)
        }


    }


  return (
    <Container>
        <Navbar />
        <Wrapper>
            <Title>TU CARRITO</Title>
            <Top>
                <TopButton to='/cart'>Volver al carrito</TopButton>
                    <Stepper stepNum={2} />
                <TopButton type="filled" to='/products'>Continuar Viendo</TopButton>
            </Top>
            <Bottom>
                <Left>
                    <DataContainer>
                        <FormTitle style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>DATOS PERSONALES <p style={{marginLeft: '5px', fontSize: '12px', fontWeight: '300'}}>(*) Campos requeridos</p></FormTitle>
                        <Form>
                            <FormDiv>
                            <TextField 
                                required 
                                id="outlined-required" 
                                name='email' 
                                label='Correo electronico' 
                                onChange={handleEmailChange}
                                error={error.email}
                                helperText={errorText.email}
                                style={{flex: '1'}}
                            />
                            <TextField 
                            required 
                            id="outlined-required" 
                            name='emailRepeat' 
                            label='Repetir Correo electronico' 
                            onChange={handleRepeatEmailChange}
                            error={error.repeatEmail}
                            helperText={errorText.repeatEmail}
                            style={{flex: '1'}}
                            />
                            </FormDiv>
                            <FormDiv >
                            <TextField 
                                required 
                                id="outlined-required" 
                                name='name' 
                                label='Nombre(s)' 
                                onChange={handleNameChange}
                                error={error.name}
                                helperText={errorText.name}
                                style={{flex: '1'}}
                            />
                            <TextField 
                                required 
                                id="outlined-required" 
                                name='surname' 
                                label='Apellido(s)' 
                                onChange={handleSurnameChange}
                                error={error.surname}
                                helperText={errorText.surname}
                                style={{flex: '1'}}
                            />
                            </FormDiv>
                            <FormDiv>
                            <TextField 
                                required 
                                id="outlined-required" 
                                name='personalId' 
                                label='DNI' 
                                onChange={handlePersonalIdChange}
                                error={error.personalId}
                                helperText={errorText.personalId}
                                style={{flex: '1'}}
                                type='number'
                            />
                            <TextField 
                                required 
                                id="outlined-required" 
                                name='phone' 
                                label='Telefono' 
                                onChange={handlePhoneChange}
                                error={error.phone}
                                helperText={errorText.phone}
                                style={{flex: '1'}}
                                type='number'
                            />
                            </FormDiv>
                        </Form>
                    </DataContainer>
                    <DataContainer>
                        <FormTitle style={{marginTop: '30px'}}>DATOS DE ENVÍO</FormTitle>
                        <Form>
                            <FormDiv >
                                <TextField 
                                    required 
                                    id="outlined-required" 
                                    name='street' 
                                    label='Calle' 
                                    onChange={handleStreetChange}
                                    error={error.street}
                                    helperText={errorText.street}
                                    style={{flex: '2'}}
                                />
                                <TextField 
                                    required 
                                    id="outlined-required" 
                                    name='adressNum' 
                                    label='Altura' 
                                    onChange={handleAdressNumChange}
                                    error={error.adressNum}
                                    helperText={errorText.adressNum}
                                    style={{flex: '1'}}
                                    type='number'
                                />
                                <TextField 
                                    id="outlined" 
                                    name='floor' 
                                    label='Piso' 
                                    onChange={handleFloorNumChange}
                                    style={{flex: '1'}}
                                    type='number'
                                />
                                <TextField 
                                    id="outlined" 
                                    name='apartment' 
                                    label='Departamento' 
                                    onChange={handleApartmentChange}
                                    style={{flex: '1'}}
                                    type='text'
                                />
                                <TextField 
                                    required 
                                    id="outlined-required" 
                                    name='postal' 
                                    label='Codigo Postal' 
                                    onChange={handlePostalChange}
                                    error={error.postal}
                                    helperText={errorText.postal}
                                    style={{flex: '1'}}
                                    type='number'
                                />
                            </FormDiv>
                            <FormDiv>
                                <FormControl style={{flex: '1'}}>
                                    <InputLabel id="demo-simple-select-label">Provincia *</InputLabel>
                                    <Select
                                    required
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedProvince}
                                    label="Age"
                                    onChange={handleChangeProvince}
                                    >
                                        {provinces?.map((prov) => {
                                            return (
                                                <MenuItem key={prov.nombre} value={prov.nombre}>{prov.nombre}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                <TextField 
                                    required 
                                    id="outlined-required" 
                                    name='city' 
                                    label='Localidad' 
                                    onChange={handleCityChange}
                                    error={error.city}
                                    helperText={errorText.city}
                                    style={{flex: '1'}}
                                />
                                {/*<FormControl style={{flex: '1'}}>
                                    <InputLabel id="demo-simple-select-label">Ciudad *</InputLabel>
                                    <Select
                                    required
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedCity || ''}
                                    label="Ciudad"
                                    onChange={handleChangeCity}
                                    >
                                        {cities?.map((city) => {
                                            return (
                                                <MenuItem key={city.nombre} value={city.nombre}>{city.nombre}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                    </FormControl>*/}
                            </FormDiv>
                        </Form>
                    </DataContainer>
                    <DataContainer>
                      <FormTitle style={{marginTop: '30px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>MEDIO DE PAGO <p style={{marginLeft: '10px', fontSize: '12px', fontWeight: '300'}}>Seleccione su medio de pago</p></FormTitle>
                      <PaymentTabs fn={handleTabChange}/>
                    </DataContainer>
                </Left>
                <Right>
                    <Summary>
                        <SummaryTitle>Resumen de Orden</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemText>$ {new Intl.NumberFormat('de-DE').format(cart.total)}</SummaryItemText>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Costo de envío estimado</SummaryItemText>
                            <SummaryItemText>$ {postFee ? new Intl.NumberFormat('de-DE').format(postFee) : 0 }</SummaryItemText>
                        </SummaryItem>
                        {error.postFee ? <p style={{color: 'red', fontSize: '10px'}}>{errorText.postFee}</p> : <></>}
                        <SummaryItem>
                            <SummaryItemText style={{display: 'flex', flexDirection: 'row'}}>Descuento {discount ? <p style={{marginLeft: '10px', color: 'rgb(22 163 74)'}}> -{discount * 100 / cart?.total}%</p> : <></>}</SummaryItemText>
                            <SummaryItemText>$ {new Intl.NumberFormat('de-DE').format(discount)}</SummaryItemText>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemText>$ {new Intl.NumberFormat('de-DE').format(order?.amount + postFee)}</SummaryItemText>
                        </SummaryItem>
                        { loading ? <FinishButton disabled type="filled" style={{backgroundColor: 'gray', cursor: 'default'}}><Stack sx={{ color: 'white', display: 'flex', justifyContent: 'center' }} spacing={0} direction="row"><CircularProgress size="1.5rem" color="inherit" /></Stack></FinishButton>
                        : (tabNumber === 0 ? <FinishButton type="filled" onClick={handleMercadoPago}>PAGAR CON <Logo src='https://firebasestorage.googleapis.com/v0/b/la-nuderia.appspot.com/o/mercadopagoButton.png?alt=media&token=85836135-4828-48fd-a90c-b0ec56c78169' alt='MercadoPago' /></FinishButton>
                        : tabNumber === 1 ? <FinishButton type="filled" onClick={handleTransference}>PAGAR CON TRANSFERENCIA</FinishButton>
                        : tabNumber === 2 ? <FinishButton type="filled">PAGAR CON DÉBITO/CRÉDITO</FinishButton>
                        : <FinishButton type="filled" onClick={handlePaypal}>PAGAR CON <Logo src='https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/Online_Primary_Acceptance_Mark_RGB_V2_small.jpg' alt='PayPal' /></FinishButton>)
                        }
                        {formValidationError.set ? <p style={{color: 'red', textAlign: 'center'}}>{formValidationError.message}</p>
                         : <></>}
                    </Summary>
                </Right>
            </Bottom>
        </Wrapper>
        <Footer />
    </Container>
  )
}


export default Checkout