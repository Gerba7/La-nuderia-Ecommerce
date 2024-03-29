import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { mobile } from '../responsive';
import { publicRequest } from '../api/axios';



const SearchContainer = styled.div`
    border: ${props => props.active ? '2px solid lightgray' : 'none'};
    background-color: ${props => props.active ? '#fff' : 'transparent'};
    display: none;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    padding: 5px;
    width: ${props => props.active ? '80vw' : '0vw'};
    transition: 0.5s;
    
    ${mobile({ display: 'flex', width: '70vw' })}   // width: props => props.active ? '15vw' : '0vw'
`

const Input = styled.input`
    border: none;
    width: 100%;
    margin-left: 5px;
    display: ${props => props.active ? 'flex' : 'none'};
    text-decoration: none !important;

    &:focus {
        outline: none;
        text-decoration: none !important;
    }
    

`

const SearchResult = styled.div`
    position: absolute;
    background-color: #fff;
    z-index: 5;
    width: 95%;
    background-color: #fff;
    top: 32px;
    left: 10px;
    border: 1px solid lightgray;
    ${mobile({ top: '45px', width: '85%', left: '27px' })}
`

const ResultItem = styled(Link)`
    display: flex;
    align-items: center;
    padding: 4px 6px;
    margin: 5px;
    text-decoration: none !important;

    &:hover {
        background-color: #216E8C;
        color: #fff;
    }
`

const ItemImg = styled.img`
    width: 50px;
    height: 50px;
    object-fit: contain;
`

const ItemInfo = styled.h1`
    margin-left: 40px;
    text-align: left;
    font-size: 20px;
    font-weight: 300;
    color: #000;
`

const MenuItem = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    color: ${props => props.active ? 'gray' : '#fff'};
    font-size: ${props => props.active ? '18px' : '30px'};
`


const MobileSearchBar = () => {

    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [isActive, setIsActive] = useState(false);
 
    useEffect(() => {
        if (query.length > 0) {
        const getQueriedProducts = async () => {
            try {
                const res = await publicRequest.get(`/products?search=${query}`);
                setData(res.data);
            } catch (err) {
                console.log(err)
            }
        };
            getQueriedProducts();
        }
    }, [query])



    const toggleSearch = (e) => {
        e.preventDefault()
        setData([]);
        setQuery("");
        setIsActive(!isActive);
    };
    


  return (
    <SearchContainer active={isActive}>
        <Input active={isActive} type='text' placehoder="Buscar..." onChange={(e) => setQuery(e.target.value)} />
        <MenuItem active={isActive}>
            { isActive ? <CloseIcon style={{color: 'inherit', fontSize: 'inherit', marginRight: '2px', marginleft: '2px'}} onClick={toggleSearch}/>
            : <SearchIcon style={{color: 'inherit', fontSize: 'inherit', marginRight: '2px', marginleft: '2px'}} onClick={toggleSearch}/>}
        </MenuItem>
        {isActive && query.length > 0 && (
            <SearchResult >
                {data.map(prod => (
                    <ResultItem key={prod._id} to={`/product/${prod._id}`}>
                        <ItemImg src={prod.img} alt={prod.title} />
                        <ItemInfo>{prod.title}</ItemInfo>
                    </ResultItem>
                ))}
            </SearchResult>
        )}  
    </SearchContainer>
  )
}

export default MobileSearchBar