import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from 'axios';
import { mobile } from "../responsive";
import { BASE_URL } from "../api/axios";

const Container = styled.div`
    margin: 5vh 10vw;
    display: flex;
    flex-wrap: wrap;
    gap: 40px 0px;
    justify-content: space-around;
    ${mobile({ flexDirection: 'column' })}
`

const Products = ({category, sort, page, setPageCount, fowardedCategory}) => {
  
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  
  useEffect(() => {
    const getProducts = async () => {
      try {
        if(fowardedCategory) {category = fowardedCategory}
        const res = await axios.get(category && category !== 'Categoria' ? `${BASE_URL}/products?category=${category}&&page=${page}&&sort=${sort}&&limit=4` : `${BASE_URL}/products?instock=${true}&&page=${page}&&sort=${sort}&&limit=4`);
        setProducts(res.data.products);
        setFilteredProducts(res.data.products)
        setPageCount(res.data.pagesNumber)
      } catch (err) {
        console.log(err);
      }
    }
    getProducts();
  }, [category, page, sort, setPageCount]);
  
  
  {/*useEffect(() => {
    if(filters) {
      setFilteredProducts(
        products.filter((item) => {
          return Object.entries(filters).every(([key, value]) => {
            return item[key][0] === (value)
          })
        })
      );
    }
  }, [products, category, filters]);*/}

  {/*useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts(prev => 
        [...prev].sort((a,b) => a.createdAt.localeCompare(b.createdAt))  
      );
    } else if (sort === "desc") {
      setFilteredProducts(prev => 
        [...prev].sort((a,b) => a.price - b.price)  
      );
    } else {
      setFilteredProducts(prev => 
        [...prev].sort((a,b) => b.price - a.price)  
      );
    };
  }, [sort]);*/}



  return (
    <Container>
        {filteredProducts.length !== 0 ? filteredProducts.map(item => (
            <Product item={item} key={item._id} />
        )) : products.slice(0,8).map(item => (
          <Product item={item} key={item._id} />
        ))
          }
    </Container>
  )

}

export default Products;