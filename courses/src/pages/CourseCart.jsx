import styled, { keyframes } from "styled-components";
import Navbar from "../components/Navbar";
import { mobile, tablet } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { addCourse } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import BasicTabs from "../components/Tabs";
import WhatsappIcon from "../components/Icons/WhatsappIcon";
import HelpIcon from "../components/Icons/HelpIcon";
import { WhatsappLink } from "../components/WhatsappLink";
import WLogo from '../images/WAppLogo.png';
import { publicRequest } from "../api/axios";
import { Alert } from '@mui/material';




const Resize = keyframes`
    0% {scale: 1.2; opacity: 0}
    100% {scale: 1; opacity: 1}
`


const Container = styled.div`
    display: flex;
    flex-direction: column;
    ${mobile({ width: '100vw' })}
    ${tablet({ width: '100vw' })}

`

const Wrapper = styled.div`
    padding: 50px;
    margin: 5vh 15vw;
    display: flex;
    width: auto;
    ${mobile({ padding: '10px', flexDirection: 'column', margin: '15vh 0vw 0vh 0vw', justifyContent: 'center' })}
    ${tablet({ padding: '10px', flexDirection: 'column', margin: '15vh 0vw 0vh 0vw', alignItems: 'center' })}
    margin-top: 120px;
`

const ImgContainer = styled.div`
    flex: 1.5;
    height: 70vh;
    display: flex;
    padding: 0px 40px 80px 0px;
    width: 100%;
    
    ${tablet({ padding: '0px', marginBottom: '30px', flexDirection: 'column' })}
    ${mobile({ padding: '0px', marginBottom: '30px', flexDirection: 'column' })}
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    ${mobile({ padding: '0px', marginBottom: '30px', width: '90vw !important' })}
    ${tablet({ padding: '0px', marginBottom: '30px', justifyContent: 'center', width: '50vw' })}
    

`

const ImageWrapper = styled.div`
    flex: 4;
    display: flex;
    ${tablet({  justifyContent: 'center' })}
    ${mobile({ width: '100%' })}
`

const Image = styled.img`
    width: 100%;
    object-fit: cover;
    animation-name: ${Resize};
    animation-duration: 1s;
    border-radius: 10px;
    ${mobile({ height: '40vh', width: '90vw !important' })}
    ${tablet({ height: '50vh', width: '50vw' })}
`

const Title = styled.div`
    font-weight: 800;
    font-size: 35px;
    margin-bottom: 30px;
`

const Description = styled.p`
    margin-bottom: 70px;
    
`

const Price = styled.span`
    font-weight: 500;
    font-size: 25px;
    margin-bottom: 40px;
`

const Button = styled.button`
    padding: 15px;
    border: 1px solid transparent;
    background-color: #216E8C;
    cursor: pointer;
    font-weight: 500;
    width: max-content;
    color: #fff;
    border-radius: 10px;
    margin-bottom: 20px;

    &:hover {
        background-color: #fff;
        border: 1px solid #216E8C;
        color: #216E8C;
        font-weight: 500;
    }
`

const Line = styled.hr`
    margin: 0;
    padding: 0;
    color: #216E8C; 
    margin-bottom: 30px;
    width: 100%;
`

const TabContainer = styled.div`
    width: 100%;
`

const Help = styled.div`
    
`

const HelpLine = styled.div`
    margin-top: 30px;
    line-height: 25px;
`

const Bottom = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 5vh 0vh 10vh 0vh;

`

const Paragarph = styled.p`
    width: 60%;
    font-size: 18px;
    font-weight: 400;
    line-height: 30px;
`





const CourseCart = () => {

    const [course, setCourse] = useState({});
    const [alert, setAlert] = useState(false);

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);

    const location = useLocation();

    const id = location.pathname.split("/")[2];

    const existsCourse = cart.courses?.find(item => item._id === course[0]?._id);

    useEffect(() => {
        const getCourse = async () => {
            try {
                const res = await publicRequest.get("/courses/course/" + id)
                setCourse(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        getCourse();
    }, [id])

    
    const alertTime = 4000;

    const resetAlert = () => {
        setTimeout(() => {
        setAlert(false)
    }, alertTime)
    }


    
    const handleClick = () => {


        if (existsCourse && existsCourse.length !== 0) {
            setAlert(true);
            resetAlert()
        } else {
            dispatch(
                addCourse(course[0])  
            )
            setAlert(true);
            resetAlert()
        }
 
    }


    



  return (
    <Container>
        <Navbar />
        <Wrapper>
            <ImgContainer>
                <ImageWrapper>
                    <Image src={course[0]?.thumbnail} alt={course?.title}/>
                </ImageWrapper>
            </ImgContainer>
            <InfoContainer>
                <Title>{course[0]?.title}</Title>
                <Price>$ {new Intl.NumberFormat('de-DE').format(course[0]?.price)}</Price>
                <Line />
                <Price>USD {new Intl.NumberFormat('de-DE').format(course[0]?.dolarPrice)}</Price>
                <Line />
                <Description>{course[0]?.description}</Description>
                <Button onClick={handleClick}>AGREGAR AL CARRITO</Button>
                <Line />
                <TabContainer>
                    <BasicTabs />
                </TabContainer>
                <Help>
                    <HelpLine>
                        <WhatsappIcon size={20} color={'green'} style={{marginRight: '5px'}} /> ¿Dudas sobre los cursos? <b>Hacé click en el botón de Messenger en el rincón inferior derecho.</b>
                    </HelpLine>
                    <HelpLine>
                        <HelpIcon size={20} color={'darkblue'}/> ¿Alguna otra duda? Clickea <a href='/help'><b>acá</b></a> para ver las preguntas más frecuentes.
                    </HelpLine>
                </Help>
            </InfoContainer>
        </Wrapper>
        <Bottom>
            <Paragarph>
            Soy Cami y hago deco en macramé! <br/><br/>
            <b>TE DEJO MÁS INFORMACIÓN SOBRE LOS CURSOS:</b> <br/>
            <br/>
            <b>REQUISITOS PARA ACCEDER A LOS CURSOS/PATRONES ONLINE</b><br/>
            - Crearte un usuario en la web www.cursos.lanuderia.com (registro con email/contraseña). Si ya tenés un usuario, no es necesario que lo vuelvas a hacer. <br/>
            - Si comprás desde Argentina, tu pago será en ARS y será procesado por MercadoPago.<br/>
            - Si compras desde otro país, tu pago será en USD y será procesado por PayPal.<br/>
            <br/>
            <b>GENERALIDADES DE LOS CURSOS/PATRONES ONLINE:</b><br/>
            - Curso/patrón 100% online y a tu ritmo. <br/>
            - Tendrás acceso a el curso/patrón de por vida. <b>NO TIENEN FECHA DE CADUCIDAD.</b><br/>
            - Videos grabados en tiempo real (on demand). <b>NO SON CURSOS EN VIVO</b>. Se podrá acceder a los mismos desde la plataforma de la web.<br/>
            - Material (PDF) soporte descargable.<br/>
            - Cada curso/patrón contiene un FORO en común (entre tod@s l@s alumn@s del club) para consultas y comentarios. Es un espacio abierto para dejar dudas dónde podré responder a cada una de ellas. <br/>
            <br/>
            <b>¿CÓMO INGRESO AL CURSO/PATRÓN? </b><br/>
            Luego de abonar el curso/patrón, tu pagó será confirmado dentro de las 24hs. Una vez confirmado, inicia sesión en la web www.cursos.lanuderia.com y dirigite a la solapa "Mis Cursos" para ver el contenido. <br/>
            <br/>
            <b>¿EN QUÉ SE DIFERENCIA UN CURSO DE UN PATRÓN?</b><br/>
            - Los cursos y patrones se diferencian por el formato, intensidad y variabilidad del contenido. <br/>
            - Los <b>CURSOS</b> incluyen videos en tiempo real que podrás ver desde la plataforma de la web + material soporte (PDF) descargable. Se incluye una introducción al macramé como generalidades de la técnica, nudos básicos, cálculo de cuerdas, materiales y el paso a paso de cada proyecto a realizar. <br/>
            - Los <b>PATRONES</b> incluyen material soporte + videos en tiempo real que podrás ver desde un QR (no desde la web). Solo incluye el paso a paso del proyecto a realizar. Si no tenés conocimientos previos, te sugiero realizar el Curso de Macramé para Principiantes: Tapíz y espejo donde podrás adquirir los conocimientos previos necesarios para realizar todo tipo de patrones.<br/>
            </Paragarph>
        </Bottom>
        <WhatsappLink href="https://api.whatsapp.com/send?phone=5491161775193">
          <img src={WLogo} alt="Whatsapp" style={{height: '3rem', width: '3rem'}}/>
        </WhatsappLink>
        { alert &&
        <Alert 
          severity='success' 
          sx={{
          position: 'fixed',
          bottom: '80px',
          right: '30px',
          zIndex: 15,
          minWidth: '250px'
          }}
          variant='filled'
        >
            El producto se agrego al carrito de compras!
        </Alert> 
        }
    </Container>
  )
}

export default CourseCart;