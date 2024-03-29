import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { publicRequest } from '../requestMethods';
import SearchIcon from '@mui/icons-material/Search';


const SearchContainer = styled.div`
    border: 2px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    border-radius: 25px;
    width: 20vw;
    position: relative;
`

const Input = styled.input`
    border: none;
    width: 100%;
    margin-left: 5px;

    &:focus {
        outline: none;
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
    display: ${props => props.display ? 'block' : 'none'};
`

const ResultItem = styled.div`
    display: flex;
    align-items: center;
    padding: 4px 6px;
    margin: 5px;

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
`


const SearchBar = () => {

    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [display, setDisplay] = useState(false);
 
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


    const toggleSearch = () => {
        setIsActive(!isActive);
    };

    const handleDisplay = () => {
        setDisplay(!display)
    } 


  return (
    <SearchContainer>
        <Input type='search' placehoder="Buscar..." onChange={(e) => setQuery(e.target.value)} onFocus={toggleSearch} />
        <SearchIcon style={{color: 'gray', fontSize: 16, marginRight: '2px', marginleft: '2px'}} />
        {isActive && query.length > 0 && (
            <SearchResult display={handleDisplay} >
                {data.map(prod => (
                    <ResultItem key={prod._id}>
                        <ItemImg src={prod.img} alt={prod.title} />
                        <ItemInfo>{prod.title}</ItemInfo>
                    </ResultItem>
                ))}
            </SearchResult>
        )}  
    </SearchContainer>
  )
}

export default SearchBar