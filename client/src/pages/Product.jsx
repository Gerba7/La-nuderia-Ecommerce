import styled, { keyframes } from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { mobile, tablet2 } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { addProduct, updateQuantity } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import BasicTabs from "../components/Tabs";
import WhatsappIcon from "../components/Icons/WhatsappIcon";
import HelpIcon from "../components/Icons/HelpIcon";
import { WhatsappLink } from "../components/WhatsappLink";
import WLogo from '../images/WAppLogo.png';
import { publicRequest } from "../api/axios";
import { Alert } from '@mui/material';




const Resize = keyframes`
    0% {scale: 1.2; opacity: 0}
    100% {scale: 1; opacity: 1}
`


const Container = styled.div`
    display: flex;
    flex-direction: column;

`

const Wrapper = styled.div`
    padding: 50px;
    margin: 5vh 10vw;
    display: flex;
    width: auto;
    ${mobile({ padding: '10px', flexDirection: 'column', margin: '15vh 5vw 0vh 5vw' })}
    ${tablet2({ padding: '10px', flexDirection: 'column', margin: '15vh 20vw 15vh 20vw' })}
    margin-top: 120px;
`

const ImgContainer = styled.div`
    flex: 1.5;
    height: 70vh;
    display: flex;
    padding: 0px 40px 80px 0px;
    width: 100%;
    
    ${mobile({ padding: '0px', marginBottom: '30px', flexDirection: 'column' })}
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    display: flex;
    flex-direction: column;
    width: 100%;
    ${mobile({ padding: '0px', marginBottom: '30px' })}

`

const ImageWrapper = styled.div`
    flex: 4;
    display: flex;
`

const Image = styled.img`
    width: 100%;
    max-width: 720px;
    max-height: 720px;
    object-fit: cover;
    animation-name: ${Resize};
    animation-duration: 1s;
    border-radius: 10px;
    ${mobile({ height: '40vh' })}
`

const Title = styled.div`
    font-weight: 800;
    font-size: 35px;
    margin-bottom: 30px;
`

const Description = styled.p`
    margin-bottom: 70px;
    
`

const Price = styled.h1`
    font-size: 20px;
    font-weight: 300;
    text-decoration: ${props => props.cross === true ? 'line-through' : 'none'};
`

const DiscountPrice = styled.div`
    font-size: 25px;
    font-weight: 500;
    color: darkgreen;
    display: ${props => props.discount === true ? 'contents' : 'none'};
`
    

{/*const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: '100%' })}
`

const Filter = styled.div`
    display: flex;
    align-items: center;
`

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0 5px;
    cursor: pointer; 
    border: 1px solid black;
`

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;    
`

const FilterSizeOption = styled.option`

`*/}

const AddContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 50px;
    ${mobile({ width: '100%' })}
    ${tablet2({ justifyContent: 'center' })}
`

const AmountContainer = styled.div`
    display: flex;
    font-weight: 700;
    align-items: center;
    margin-right: 20px;
`

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid #206884;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 10px;
`

const Button = styled.button`
    padding: 15px;
    border: 2px solid #000;
    background-color: #216E8C;
    cursor: pointer;
    font-weight: 500;
    width: 50%;
    color: #fff;
    border-radius: 10px;

    &:hover {
        background-color: #fff;
        color: #216E8C;
        font-weight: 500;
    }
`


const Images = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

const Img1 = styled.img`
    flex: 1;
    max-height: 110px;
    margin: 0px 15px 15px 15px;
    border-radius: 10px;
    object-fit: cover;
    cursor: pointer;

    &:hover {
        box-shadow: 0px 0px 10px 2px rgba(33,110,140,0.65);
        -webkit-box-shadow: 0px 0px 10px 2px rgba(33,110,140,0.65);
        -moz-box-shadow: 0px 0px 10px 2px rgba(33,110,140,0.65);
        scale: 1.1;
        //border: 4px rgb(33,110,140) solid;
    }
`

const Line = styled.hr`
    margin: 0;
    padding: 0;
    color: #216E8C; 
    margin-bottom: 30px;
    width: 100%;
    margin-top: 20px;
`

const TabContainer = styled.div`

`

const Help = styled.div`
    
`

const HelpLine = styled.div`
    margin-top: 30px;
    line-height: 25px;
`






const Product = () => {

    const [product, setProduct] = useState({});
    const [pics, setPics] = useState([])
    const [picNumbrer, setPicNumber] = useState(0);
    const [quantity, setQuantity] = useState(1);
    //const [color, setColor] = useState("");
    //const [size, setSize] = useState("");
    const [alert, setAlert] = useState(false);

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);

    const location = useLocation();

    const id = location.pathname.split("/")[2];

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/products/" + id)
                setProduct(res.data);
                setPics(res.data.img)
            } catch (err) {
                console.log(err)
            }
        }
        getProduct();
    }, [id])

    const handleQuantity = (type) => {
        if (type === 'decrease') {
            quantity > 1 && setQuantity(quantity - 1)
        } else {
            quantity < 10 && setQuantity(quantity + 1)
        }
    }

    const alertTime = 4000;

    const resetAlert = setTimeout(() => {
        setAlert(false)
    }, alertTime)


    const handleClick = () => {

        let discountPrice;

        if (product?.discountAmount) {
            discountPrice = product?.price - (product?.price * product?.discountAmount / 100)
        } else {
            discountPrice = product?.price
        }

        const existsProduct = cart.products.find(item => item._id === product._id);

        if (existsProduct && existsProduct.length !== 0) {
            const newQuantity = existsProduct.quantity + quantity;
            dispatch(
                updateQuantity({quantity: newQuantity, _id: product._id, price: discountPrice, sumQuantity: quantity, weight: product.weight})
            )
            setAlert(true);
            resetAlert()
        } else {
            dispatch(
                addProduct({ ...product, quantity, price: discountPrice})  //, color, size 
            )
            setAlert(true);
            resetAlert()
        }
 
    }


    



  return (
    <Container>
        <Navbar />
        <Wrapper>
            <ImgContainer>
                {pics[1] ? 
                <Images>
                {pics[0] ? <Img1 src={pics[0]} onClick={() => setPicNumber(0)} alt='img'/> :  <Img1 style={{display: 'none'}} src={''} alt='img'/>}
                {pics[1] ? <Img1 src={pics[1]} onClick={() => setPicNumber(1)} alt='img'/> :  <Img1 style={{display: 'none'}} src={''} alt='img'/>}
                {pics[2] ? <Img1 src={pics[2]} onClick={() => setPicNumber(2)} alt='img'/> :  <Img1 style={{display: 'none'}} src={''} alt='img'/>}
                {pics[3] ? <Img1 src={pics[3]} onClick={() => setPicNumber(3)} alt='img'/> :  <Img1 style={{display: 'none'}} src={''} alt='img'/>}
                {pics[4] ? <Img1 src={pics[4]} onClick={() => setPicNumber(4)} alt='img'/> :  <Img1 style={{display: 'none'}} src={''} alt='img'/>}
                {pics[5] ? <Img1 src={pics[5]} onClick={() => setPicNumber(5)} alt='img'/> :  <Img1 style={{display: 'none'}} src={''} alt='img'/>}
                </Images>
                : <></>
                }   
                
                <ImageWrapper>
                    <Image src={pics[0] ? pics[picNumbrer] : product.img} alt='img'/>
                </ImageWrapper>
            </ImgContainer>
            <InfoContainer>
                <Title>{product?.title}</Title>
                <Price cross={product?.discountAmount && product?.discount? true : false}>ARS $ {new Intl.NumberFormat('de-DE').format(product?.price)}</Price>
                <DiscountPrice discount={product?.discountAmount && product?.discount? true : false}>ARS $ {product?.discountAmount ? new Intl.NumberFormat('de-DE').format(product?.price - (product?.price * product?.discountAmount / 100)) : ''}</DiscountPrice>
                <Line />
                <Description>{product?.description}</Description>
                {/*<FilterContainer>
                        <Filter>
                            <FilterTitle>Color:</FilterTitle>
                            {product.color.map(col => (
                                <FilterColor color={col} key={col} onClick={() => setColor(col)} />
                            ))}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size:</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)} >
                                {product.size?.map(si => (
                                    <FilterSizeOption key={si}>{si}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>*/}
                <AddContainer>
                    <AmountContainer>
                        <RemoveIcon onClick={() => handleQuantity('decrease')} style={{border: '2px solid #216E8C', borderRadius: '50%', cursor: 'pointer'}} />
                        <Amount>{quantity}</Amount>
                        <AddIcon onClick={() => handleQuantity('increase')} style={{border: '2px solid #216E8C', borderRadius: '50%', cursor: 'pointer'}} />
                    </AmountContainer>
                    <Button onClick={handleClick}>AGREGAR AL CARRITO</Button>
                </AddContainer>
                <Line />
                <TabContainer>
                    <BasicTabs />
                </TabContainer>
                <Help>
                    <HelpLine>
                        <WhatsappIcon size={20} color={'green'} style={{marginRight: '5px'}} /> ¿Dudas sobre los modelos? <b>Hacé click en el botón de Messenger en el rincón inferior derecho.</b>
                    </HelpLine>
                    <HelpLine>
                        <HelpIcon size={20} color={'darkblue'}/> ¿Alguna otra duda? Clickea <a href='/help'><b>acá</b></a> para ver las preguntas más frecuentes.
                    </HelpLine>
                </Help>
            </InfoContainer>
        </Wrapper>
        <Newsletter />
        <Footer />
        <WhatsappLink href="https://api.whatsapp.com/send?phone=5491161775193">
          <img src={WLogo} alt="Whatsapp" style={{height: '3rem', width: '3rem'}}/>
        </WhatsappLink>
        { alert ? 
        <Alert 
          severity='success' 
          sx={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 15,
          minWidth: '250px'
          }}
          variant='filled'
        >
        El producto se agrego al carrito de compras!
        </Alert> 
        : <></> }
    </Container>
  )
}

export default Product