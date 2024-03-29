import styled from "styled-components";
import { mobile } from "../responsive";


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("https://images.pexels.com/photos/9657060/pexels-photo-9657060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1") center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    padding: 20px;
    width: 40%;
    background-color: #fff;
    ${mobile({ width: '75%' })}
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: #206884;
    color: #fff;
    cursor: pointer;
` 

const Register = () => {
  return (
    <Container>
        <Wrapper>
            <Title>Crear una cuenta</Title>
            <Form>
                <Input placeholder="Nombre" />
                <Input placeholder="Apellido" />
                <Input placeholder="Email" />
                <Input placeholder="Usuario" />
                <Input placeholder="Password" />
                <Input placeholder="Confirmar Password" />
                <Agreement>
                    Acepto las condiciones
                </Agreement>
                <Button>CREAR</Button>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Register