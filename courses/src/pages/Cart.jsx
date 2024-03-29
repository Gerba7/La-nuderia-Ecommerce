import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile, tablet, tablet2 } from "../responsive";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { removeCart, removeCourse } from "../redux/cartRedux";
import { Link } from "react-router-dom";
import Stepper from "../components/Stepper";
import axios from "axios";
import { useState } from "react";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { publicRequest } from "../api/axios";
import { useContext } from "react";
import { CurrencyContext } from "../context/CurrencyContext";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    ${mobile({ width: '100vw !important'})}
    ${tablet2({ width: '100vw'})}
` 

const Wrapper = styled.div`
    padding: 20px;
    margin: 15vh 5vw;
    ${mobile({ padding: '0px', margin: '0px'})}
    ${tablet2({ padding: '0px', margin: '10px'})}
`

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
    ${mobile({ fontSize: '26px', marginTop: '90px', marginBottom: '0px' })}
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 40px 0px;
    ${mobile({ flexDirection: 'column', margin: '20px 0px' })}
    ${tablet2({ flexDirection: 'column', margin: '20px 0px' })}
`

const TopButton = styled(Link)`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === "filled" ? '2px solid rgba(220, 20, 60, 0.6)' : '2px solid #206884'};
    background-color: ${props => props.type === "filled" ? 'transparent' : 'transparent'};
    color: ${props => props.type === "filled" ? 'rgba(220, 20, 60, 0.6)' : '#206884'};
    text-decoration: none;
    
    ${mobile({ margin: '20px 0px' })}

    ${tablet2({ margin: '40px 0px' })}
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: 'column' })}
    ${tablet2({ flexDirection: 'column' })}
`

const Info = styled.div`
    flex: 3;
`

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: 'column', position: 'relative' })}
    
    ${tablet2({ flexDirection: 'column', position: 'relative' })}
    margin: 10px 0px;
`

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
    ${mobile({ flexDirection: 'row' })}
    ${tablet2({ flexDirection: 'row' })}
`

const Image = styled.img`
    width: 200px;
    height: 200px;
    ${mobile({ width: '100px !important', height: '100px !important' })}
    ${tablet2({ width: '200px', height: '200px' })}
`

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    ${mobile({ position: 'absolute', left: '110px', padding: '0px'})}
`

const ProductName = styled.h1`
    font-weight: 500;
    font-size: 18px;
`

const ProductId = styled.span`
    font-size: 14px;
`

{/*const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0 5px;
    cursor: pointer; 
    border: 1px solid black;
`

const ProductSize = styled.span`
    
`*/}

const PriceDetail = styled.span`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: row;

    ${tablet2({ flexDirection: 'column' })}
    ${mobile({ flexDirection: 'column' })}
`

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    ${mobile({ margin: '0px', position: 'absolute', bottom: '5px', left: '110px' })}
    margin-right: 50px;
`

const ProductAmount = styled.div`
    font-size: 15px;
    margin: 5px;
    ${mobile({ margin: '5px 15px' })}
    width: 20px;
    height: 20px;
    border-radius: 10px;
    border: 1px solid #206884;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ position: 'absolute', bottom: '10px', right: "20px", fontWeight: '500', fontSize: '16px'})}
    ${tablet2({ position: 'absolute', bottom: '10px', right: "20px", fontWeight: '500', fontSize: '16px' })}
`

const RemoveProduct = styled.div`
    flex: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: crimson;
    ${mobile({ position: 'absolute', right: '10px' })}
    ${tablet2({ position: 'absolute', right: '10px' })}
`

const Hr = styled.hr`
    background-color: #c9c8c8;
    border: none;
    height: 1px;
    margin: 15px 30px 15px 0px;
    ${mobile({ margin: '15px 0px 15px 0px' })}
    
    ${tablet2({ margin: '10px 0px 15px 0px' })}
`

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 50vh;
    justify-content: center;
    
    ${mobile({ margin: '20px 0px' })}
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

const Button = styled(Link)`
    width: 80%;
    padding: 10px;
    background-color: #206884;
    color: white;
    font-weight: 600;
    font-size: 16px;
    border: none;
    cursor: pointer;
    border: 1px solid #fff;
    text-decoration: none;
    display: flex;
    justify-content: center;
    border-radius: 3px;

    &:hover {
        background-color: #fff;
        color: #216E8C;
        font-weight: 600;
        border: 1px solid #216E8C;
    }
    
    ${tablet2({ width: '60%' })}
`

const Center = styled.div`
    display: flex;
    margin: 20px 0px 10px 0px;
    ${mobile({ display: 'none' })}
`

const Headings = styled.div`
    flex: 3;
    display: flex;
    flex-direction: row;
`

const ProductHeading = styled.div`
    flex: 3;
`

const PriceHeading = styled.div`
    flex: 0.93;
`

const TotalHeading = styled.div`
    flex: 0.7;   
`

const PriceD = styled.div`
    flex: 0.6;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ display: 'none' })}
    ${tablet2({ display: 'none' })}
`

const Space = styled.div`
    flex: 1;
`

const Input = styled.input`
    width: 25%;
    height: 30px;
    padding: 5px;

`

const PostButton = styled.button`
    padding: 10px;

`



const Cart = () => {

    const parseCookie = str =>
    str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
                acc[decodeURIComponent(v[0]?.trim())] = decodeURIComponent(v[1]?.trim());
                return acc;
            }, {}
    );

    const isLoggedIn = parseCookie(document.cookie).loggedIn;
    
    const [error, setError] = useState(false);

    const cart = useSelector(state => state.cart);

    const { currency } = useContext(CurrencyContext);
    
    const dispatch = useDispatch();


    {/*const handleQuantity = (type, _id, price, quantity) => {
        if (type === 'decrease') {
            quantity > 1 &&
            dispatch(
                removeQuantity({_id, price})
            )  
        } else {
            quantity < 10 &&
            dispatch(
                addQuantity({_id, price})
            )
        }
    }*/}

    const handleRemoveItem = (_id, price, quantity) => {
        dispatch(
            removeCourse({_id, price, quantity})
        )
    }

    const handleRemoveCart = () => {
        dispatch(removeCart())
    }



  return (
    <Container>
        <Navbar />
        <Wrapper>
            <Title>TU CARRITO</Title>
            <Top>
                <TopButton to='/products'>Seguir Comprando</TopButton>
                    <Stepper stepNum={1} />
                <TopButton style={{display: 'flex', alignItems: 'center', gap:'5px',}} type="filled" onClick={handleRemoveCart}><RemoveShoppingCartIcon />Vaciar Carrito</TopButton>
            </Top>
            <Center>
                <Headings>
                    <ProductHeading>PRODUCTO</ProductHeading>
                    <PriceHeading>PRECIO</PriceHeading>
                </Headings>
                <Space />
            </Center>
            
            <Bottom>
            
                <Info>
                    <Hr />
                    {cart.courses?.map(course => (
                        <div key={course?._id}>
                        <Product key={course?._id}>
                            <ProductDetail>
                                <Image src={course?.thumbnail} alt={course?.title}/>
                                <Details>
                                    <ProductName>{course?.title}</ProductName>
                                    <ProductId>{course?.description}</ProductId>
                                    {/*<ProductColor color={prod.color} />
                                    <ProductSize><b>Size:</b> {prod.size}</ProductSize>*/}
                                </Details>
                            </ProductDetail>
                            <PriceD>
                                {currency === 'pesos' ? `$ ${(new Intl.NumberFormat('de-DE').format(course?.price))}` : `USD ${(new Intl.NumberFormat('de-DE').format(course?.dolarPrice))}`}
                            </PriceD>
                            <RemoveProduct>
                                <HighlightOffIcon color='inherit' onClick={() => handleRemoveItem(course?._id, course?.price, course?.quantity)}/>
                            </RemoveProduct>
                        </Product>
                        <Hr />
                        </div>
                    ))}
                    
                </Info>
                <Summary>
                    <SummaryTitle>Resumen de Orden</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemText>{currency === 'pesos' ? `$ ${(new Intl.NumberFormat('de-DE').format(cart?.total))}` : `USD ${(new Intl.NumberFormat('de-DE').format(cart?.dolarTotal))}`}</SummaryItemText>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Descuento</SummaryItemText>
                        <SummaryItemText>$ 0</SummaryItemText>
                    </SummaryItem>
                    <SummaryItem type="total">
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemText>{currency === 'pesos' ? `$ ${(new Intl.NumberFormat('de-DE').format(cart?.total))}` : `USD ${(new Intl.NumberFormat('de-DE').format(cart?.dolarTotal))}`}</SummaryItemText>
                    </SummaryItem>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                        <Button to={cart.courses?.length > 0 ? '/cart/checkout' : '/'}>PAGAR</Button>             
                    </div>
                </Summary>
            </Bottom>
        </Wrapper>
    </Container>
  )
}

export default Cart