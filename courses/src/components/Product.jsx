import styled, { keyframes } from "styled-components";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link } from "react-router-dom";
import { mobile } from "../responsive";

const Resize = keyframes`
    0% {scale: 1.2; opacity: 0}
    100% {scale: 1; opacity: 1}
`

const Options = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5 ease;
    cursor: pointer;
`


const Container = styled.div`
    flex: 1 0 20%;
    max-width: 20%;
    margin: 5px;
    height: 550px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfb;
    position: relative;
    animation-name: ${Resize};
    animation-duration: 1s;
    flex-direction: column;
    box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.5);
    -webkit-box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.5);
    -moz-box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.5);

    &:hover ${Options} {
        opacity: 1;
    }

    ${mobile({ flex: 1, height: '550px', width: '100%', maxWidth: '100%' })}
`

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    z-index: 2;
    object-position: center;
    object-fit: cover;
`


const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;

    &:hover {
        background-color: #e9f5f5;
        transform: scale(1.5)
    }

    &:visited {
        text-decoration: none;
    }
`

const InfoContainer = styled.div`
    display: flex;
    position: relative;
    width: 80%;
    flex-direction: column;
    margin: 15px 0px;
    padding: 0px 10px;
    align-items: center;
    justify-content: center;
`

const Title = styled.h1`
    font-size: 20px;
    font-weight: 400;
`

const Price = styled.h1`
    font-size: 20px;
    font-weight: 300;
    text-decoration: ${props => props.cross === true ? 'line-through' : 'none'};
`

const DiscountPrice = styled.div`
    font-size: 20px;
    font-weight: 300;
    color: darkgreen;
    display: ${props => props.discount === true ? 'contents' : 'none'};
`

const Discount = styled.div`
    position: absolute;
    z-index: 3;
    top: 5px;
    right: 10px;
    display: ${props => props.disc !== 'active' && 'none'};
    background-color: #216E8C;
    color: #fff;
    font-weight: 500;
    padding: 5px;
`



const Product = ({item}) => {

    // Display discount fc


  return (
    <Container>
        <Circle />
        <Image src={item.img[0]} alt={item.title} />
        <Link to={`/product/${item._id}`} style={{color: "black"}}>
        <Options>
            {/*<Icon>
                <ShoppingCartOutlinedIcon />
            </Icon>*/}
            <Icon>
                <SearchIcon />
            </Icon>
            {/*<Icon>
                <FavoriteBorderOutlinedIcon />
            </Icon>*/}
        </Options>
        </Link>
        <InfoContainer>
            <Title>{item.title.toUpperCase()}</Title>
            <Price cross={item.discountAmount && item.discount? true : false}>ARS $ {new Intl.NumberFormat('de-DE').format(item.price)}</Price>
            <DiscountPrice discount={item.discountAmount && item.discount? true : false}>ARS $ {item.discountAmount ? new Intl.NumberFormat('de-DE').format(item.price - (item.price * item.discountAmount / 100)) : ''}</DiscountPrice>
        </InfoContainer>
        <Discount disc={item.discount && 'active'}>DTO. - {item.discountAmount} %</Discount>
    </Container>
  )
}

export default Product;