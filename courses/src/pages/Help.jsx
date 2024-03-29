import styled from "styled-components";
import { mobile } from "../responsive";
import Navbar from "../components/Navbar";
import SimpleAccordion from "../components/Accordion";
import Footer from "../components/Footer";



const Container = styled.div`
    display: flex;
    flex-direction: column;

`

const Wrapper = styled.div`
    padding: 50px;
    margin: 5vh 25vw;
    display: flex;
    width: auto;
    ${mobile({ padding: '10px', flexDirection: 'column', margin: '15vh 5vw 5vh 5vw' })}
    margin-top: 120px;
    flex-direction: column;
    gap: 20px;
    min-height: 60vh;
`

const Title = styled.h1`

`

const Subtitle = styled.h3`

`

const AccordionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`



const Help = () => {

    return (
        <Container>
            <Navbar />
            <Wrapper>
                <Title>Compra de cursos</Title>
                <Subtitle>Dentro de esta categoría de preguntas responderé dudas frecuentes por favor leer detenidamente.</Subtitle>
                <AccordionContainer>
                    <SimpleAccordion 
                    title={'¿Cómo pago?'}
                    content={'Abonas a través de Mercado pago (tarjeta de débito, crédito, rapipago o pagofacil (imprimiendo un cupón de pago) o transferencia automática con la app de Mercado Pago) o Transferencia Bancaria (al seleccionar esta opción en el checkout aparecen los datos para realizarla) debés enviar comprobante de transferencia a macrame@lanuderia.com y aguardar que comprobemos dicho pago.'}
                    />
                    <SimpleAccordion 
                    title={'¿Qué medios de pago acepta La Nudería?'}
                    content={'Mercado pago (tarjeta de débito, crédito, rapipago o pagofacil o transferencia automática con la app de Mercado Pago) o Transferencia Bancaria (al seleccionar esta opción en el checkout aparecen los datos para realizarla) una vez realizada la transferencia enviar comprobante a macrame@lanuderia.com con datos correspondientes a la compra.'}
                    />
                    <SimpleAccordion 
                    title={'Pagué por transferencia bancaria y mi pedido sigue pendiente'}
                    content={'Si pagaste por transferencia bancaria debes enviar comprobante de pago junto con tus datos completos a nuestro email macrame@lanuderia.com NO ENVIAR POR MENSAJE DIRECTO DE INSTAGRAM.'}
                    />
                    <SimpleAccordion 
                    title={'¿Hay que registrarse para comprar?'}
                    content={'Para comprar en nuestra tienda no es necesario registrarse. Podes ingresar los datos necesarios para la compra mas adelante luego de seleccionar todos los modelos que quieras en el carrito.'}
                    />
                    <SimpleAccordion 
                    title={'¿Cuál es el tiempo de entrega?'}
                    content={'El tiempo de entrega es de 15 a 20 días de produccion artesanal mas 2 a 5 dias hábiles segun origen y destino desde su dia de imposición por Correo Argentino.'}
                    />
                </AccordionContainer>
            </Wrapper>
        </Container>
    )

}


export default Help;