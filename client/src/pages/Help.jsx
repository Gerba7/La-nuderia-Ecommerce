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
                <Title>Compra de productos</Title>
                <Subtitle>Dentro de esta categoría de preguntas responderé dudas frecuentes por favor leer detenidamente.</Subtitle>
                <AccordionContainer>
                    <SimpleAccordion 
                    title={'¿Cómo puedo pagar los productos de la tienda?'}
                    content={<>Podés abonar los productos de la tienda con los siguientes métodos de pago: <br/>- Mercado Pago (tarjeta de débito, crédito, Rapipago o Pagofacil, transferencia automática con la app de Mercado Pago) <br/>-Transferencia bancaria (al seleccionar ésta opción, al momento de finalizar la compra, aparecen los datos para realizarla). <br/>Una vez configurado el pago, enviar comprobante de transferencia al e-mail macrame@lanuderia.com y aguardar la confirmación del mismo.</>}
                    />
                    <SimpleAccordion 
                    title={'¿Hay cuotas?'}
                    content={'Con tarjeta de crédito tenés 3 CUOTAS SIN INTERÉS.'}
                    />
                    <SimpleAccordion 
                    title={'¿Cómo puedo acceder al beneficio del 10% descuento?'}
                    content={'Tenés un 10% OFF en el total de tu compra, abonando por transferencia bancaria o envío de dinero por MercadoPago, fuera de la web.'}
                    />
                    <SimpleAccordion 
                    title={'Pagué por transferencia bancaria y mi pedido sigue pendiente.'}
                    content={'Si pagaste vía transferencia bancaria, por favor enviar comprobante de pago y datos al email macrame@lanuderia.com o a nuestro WhatsApp. NO ENVIAR POR MENSAJE DIRECTO DE INSTAGRAM.'}
                    />
                    <SimpleAccordion 
                    title={'¿Es necesario registrarse para comprar?'}
                    content={'No, no es necesario registrarse. Seguí el paso a paso en la web para finalizar tu compra.'}
                    />
                    <SimpleAccordion 
                    title={'¿Cuánto es el tiempo de entrega?'}
                    content={'Todos los productos de la tienda están confeccionados a mano. Por esa razón, el tiempo de demora en producción es de 15 a 20 días hábiles + tiempo de envío correspondiente desde el día de imposición por Correo Argentino (5 a 7 días hábiles)'}
                    />
                    <SimpleAccordion 
                    title={'¿Cómo puedo comprar los cursos online?'}
                    content={'Muy pronto vas a poder acceder a los cursos online desde donde estés.'}
                    />
                </AccordionContainer>
            </Wrapper>
            <Footer />
        </Container>
    )

}


export default Help;