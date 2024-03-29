import styled from "styled-components";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { mobile } from "../responsive";
import logoimg from '../images/logo.png';
import { Link } from "react-router-dom";


const Container = styled.div`
    display: flex;
    background-color: #216E8C;
    color: #fff;
    padding: 30px;
    ${mobile({ flexDirection: 'column' })}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    ${mobile({ alignItems: 'center', marginBottom: '30px' })}
    justify-content: center;
    align-items: center;
`

const Logo = styled.img`
    width: 180px;
`

const Description = styled.p`
    margin: 20px 0px;
    color: #fff;
`

const SocialContainer = styled.div`
    display: flex;
    ${mobile({  gap: '30px' })}
`

const SocialIcon = styled.a`
    width: 40px;
    height: 40px;
    border-radius: 15px;
    color: #fff;
    background-color: ${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
    ${mobile({  width: '50px', height: '50px', marginRight: '0px' })}

    &:hover {
        background-color:#fff;
        color: ${props => props.color};
        cursor: pointer;
    }
`

const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ display: 'none' })}
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Title = styled.h3`
    margin-bottom: 30px;
`

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin-left: 55px;
`

const ListItem = styled(Link)`
    width: 50%;
    margin-bottom: 10px;
    text-decoration: none;
    color: #fff;
`

const Right = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 20px;
    justify-content: center;
    align-items: center;
`

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`

const Payment = styled.img`
    width: 50%;

`


const Footer = () => {
  return (
    <Container>
        <Left>
            <Link to="/" style={{margin: 0}}>
                <Logo src={logoimg} alt='logo'/>
            </Link>
            <Description></Description>
            <SocialContainer>
                <SocialIcon color="#3B5999" href="https://www.facebook.com/la.nuderia">
                    <FacebookIcon />
                </SocialIcon>
                <SocialIcon color="#55ACEE" >
                    <TwitterIcon />
                </SocialIcon>
                <SocialIcon color="#E4405F" href="https://www.instagram.com/la.nuderia/" >
                    <InstagramIcon />
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Links</Title>
            <List>
                <ListItem to='/'>Home</ListItem>
                <ListItem to='/cart'>Carrito</ListItem>
                <ListItem to='/products'>Tienda</ListItem>
                <ListItem to='/help'>Ayuda</ListItem>
            </List>
        </Center>
        <Right>
            <Title>Contacto</Title>
            <ContactItem>
                <LocationOnIcon style={{marginRight: '10px'}} />
                Ciudad Evita, Bs. As. Argentina
            </ContactItem>
            <ContactItem>
                <LocalPhoneIcon style={{marginRight: '10px'}} />
                +54 11 6177 5193
            </ContactItem>
            <ContactItem>
                <EmailIcon style={{marginRight: '10px'}} />
                macrame@lanuderia.com
            </ContactItem>
            <Payment src="" />
        </Right>
    </Container>
  )
}

export default Footer;