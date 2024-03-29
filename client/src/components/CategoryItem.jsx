import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";


const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;
    background-color: #000;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.7;
    ${mobile({ height: '50vh'})}
`

const Info = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Title = styled.h1`
    color: #fff;
    margin-bottom: 20px;
    font-size: 36px;
`

const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: #fff;
    color: gray;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;

    &:hover {
        scale: 1.2;
    }
`

const CategoryItem = ({item}) => {

  return (
    <Container>
        <Link to={`${item.category}`}>
            <Image src={item.img} alt={item.title}/>
            <Info>
                <Title>{item.title}</Title>
                <Button>{item.button}</Button>
            </Info>
        </Link>
    </Container>
  )
}

export default CategoryItem;