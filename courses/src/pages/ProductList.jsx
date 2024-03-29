import { useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import { mobile } from "../responsive";
import { getCategories } from "../redux/requests";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import PaginationC from "../components/Pagination";
import Information from "../components/Information";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { PaginationG } from "../components/PaginationG";
import Banner from "../components/Banner";


const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const Wrapper = styled.div`
    margin-top: 120px;
    display: flex;
    flex-direction: column;
`

const Title = styled.h1`
    font-size: 40px;
    margin: 20px;
    text-align: center;
    margin-bottom: 40px;
    
    ${mobile({ fontSize: '26px', marginBottom: '30px', marginTop: '0px' })}
`

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 20px;
`

const Filter = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    ${mobile({ margin: '0px 20px', display: 'flex', flexDirection: 'column' })}
`

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ marginRight: '0px', fontSize: '14px' })}
`
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({ margin: '10px 0px' })}
`

const Option = styled.option`
    
`

const ResetFilters = styled.h3`
    display: flex;
    align-items: center;
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
`





const ProductList = () => {



    const dispatch = useDispatch();
    
    const categories = useSelector((state) => state.category.categories);

    const location = useLocation();

    const navigate = useNavigate();

    const fowardedCategory = location.pathname.split("/")[2];

    const [sort, setSort] = useState("newest");
    const [category, setCategory] = useState('Categoria');
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    
    useEffect(() => {
        dispatch(getCategories());
        if(fowardedCategory) {setCategory(fowardedCategory)}
    }, [dispatch])


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page])

    

    const removeFilters = () => {
        
        setSort("newest");
        setCategory('Categoria')
        if(fowardedCategory) { 
            navigate('/products') 
            navigate(0)
        }
    }

    const handleCategory = (e) => {
        navigate('/products')
        setCategory(e.target.value)
    }

    function toTitleCase(text) {
        return text.toLowerCase().replace(/(^|\s)\w/g, function(char) {
          return char.toUpperCase();
        });
      }


  return (
    <Container>
        <Navbar />
        <Wrapper>
            <Title>{"PRODUCTOS"}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filtrar Productos:</FilterText>
                    <Select name="categories" onChange={handleCategory} value={category}>
                        <Option>
                            Categoría   
                        </Option>
                        {categories.map((cat) => {
                            return(
                            <Option value={cat.name} key={cat._id}>{toTitleCase(cat.name)}</Option>
                            )
                        })}
                    </Select>
                    {/*<Select name="color" onChange={handleFilters} defaultValue={"Color"}>
                        <Option disabled>
                            Color
                        </Option>
                        <Option>Blanco</Option>
                        <Option>Negro</Option>
                        <Option>Gris</Option>
                    </Select>
                    <Select name="size" onChange={handleFilters} defaultValue={"Tamaño"}>
                        <Option disabled>
                            Tamaño
                        </Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                    </Select>*/}
                </Filter>
                <Filter>
                    <FilterText>Ordenar por:</FilterText>
                    <Select onChange={e => setSort(e.target.value)} value={sort}>
                        <Option value="newest">
                            Más Nuevos
                        </Option>
                        <Option value="desc">Mayor Precio</Option>
                        <Option value="asc">Menor Precio</Option>
                    </Select>
                    <ResetFilters onClick={() => removeFilters()}>
                        x Borrar filtros
                    </ResetFilters>
                </Filter>
            </FilterContainer>
            <Products category={category} sort={sort} page={page} setPageCount={setPageCount} fowardedCategory={fowardedCategory} /> {/*filters={filters} */}
            <div style={{display: 'flex', justifyContent: 'center', margin: '5vh 0vw'}}>
                <PaginationG setCurrentPage={setPage} pageCount={pageCount} currentPage={page} />
            </div>
        </Wrapper>
        <Information />
        <Newsletter />
        <Footer />
        <Banner />
    </Container>
  )
}

export default ProductList;