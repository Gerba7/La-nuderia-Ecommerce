import styled from 'styled-components';
import { mobile } from '../responsive';



const Container = styled.div`
    height: 60vh;
    background-color: rgba(33, 110, 140, 0.048);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    ${mobile({ height: '100vh', padding: '0px ' })}
`

const Title = styled.h1`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    margin-bottom: 40px;
    ${mobile({ fontSize: '30px', margin: '0px 10px 40px 10px' })}
    text-align: center;
`

const Description = styled.p`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    text-align: center;
    line-height: 35px;
    ${mobile({ textAlign: 'center', fontSize: '20px', margin: '0px 10px' })}
`


const Row = () => {


  return (
    <Container>
        <Title>Cursos, diseños y productos deco en macramé contemporáneo!</Title>
        <Description>
          ¡Bienvenid@s al mundo de los nudos! Soy Cami y hago deco en macramé.<br/>
          En la tienda vas a encontrar productos 100% hechos a mano, que combinan el antiguo arte de 
          anudar con un toque moderno.<br/>
          Además, podés tener acceso a cursos, tutoriales y patrones. Quiero ensenarte los nudos y secretos del
          macramé para que puedas crear tus propios diseños.<br />
          ¡Vos también podés hacerlo!
        </Description>
    </Container>
  )
}

export default Row;