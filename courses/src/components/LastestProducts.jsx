import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from 'axios';
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { BASE_URL } from "../api/axios";

const Container = styled.div`
    margin: 5vh 10vw;
    display: flex;
    flex-wrap: wrap;
    gap: 40px 0px;
    justify-content: space-around;
`

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  ${mobile({ flexDirection: 'column', justifyContent: 'center', width: '100%' })}
`


const Button = styled(Link)`
  padding: 20px;
  background-color: #216E8C;
  color: #fff;
  margin: 20px 0px;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  border: 2px solid transparent;

  &:hover {
    background-color: #fff;
    border: 2px solid #216E8C;
    color: #216E8C;
  }
`

const LastestProducts = ({}) => {
  
  
  const [products, setProducts] = useState([]);

  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/products?new=${true}`);
        setProducts(res.data.products);
      } catch (err) {
        console.log(err);
      }
    }
    getProducts();
  }, []);




  return (
    <Container>
      <ProductsContainer>
        {products.length !== 0 ? products.map(item => (
            <Product item={item} key={item._id} />
          )) : products.slice(0,8).map(item => (
          <Product item={item} key={item._id} />
          ))
        }
      </ProductsContainer>
      <Button to='/products' >VER MAS</Button>
    </Container>
  )

}

export default LastestProducts;