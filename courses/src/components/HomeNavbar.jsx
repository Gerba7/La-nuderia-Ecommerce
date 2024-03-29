import { useState } from 'react';
import styled from 'styled-components';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate} from 'react-router-dom';
import logoimg from '../images/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import { mobile } from '../responsive';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../redux/requests';
import LoginModal from './LoginModal';
import SearchBar from './SearchBar';
import MobileSearchBar from './MobileSearchBar';



const Container = styled.div`
    height: ${props => props.navHeight ? '80px' : '120px'};
    background: ${props => props.bgColor ? '#216E8C' : 'linear-gradient(180deg, rgba(0,19,25,0.7035189075630253) 0%, rgba(0,0,0,0.5410539215686274) 56%, rgba(224,244,252,0) 100%)'};
    display: flex;
    position: fixed;
    width: 100vw;
    z-index: 12;
`

const Wrapper = styled.div`
    padding: 0px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    ${mobile({ position: 'relative', padding: '0px'})}
`

const Left = styled.div`
    flex: 1;
    text-align: center;
    ${mobile({ display: 'flex', flexDirection: 'row', justifyContent: 'center'})}
`

const Logo = styled.h1`
    display: none;
`

const LogoImg = styled.img`
    height: 60px;
    padding: 0;
    border-radius: 5px;
    margin-top: 5px;
    ${mobile({ marginTop: '-15px', marginLeft: '20px'})}
`

const Center = styled.div`
    flex: 2;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    @media  screen and (max-width: 768px) {
        position: absolute;
        display: flex;
        top: ${({menuPosition}) => (menuPosition ? '80px' : '120px')};
        height: 100vh;
        width: 100vw;
        flex-direction: column;
        background-color: #000;
        opacity: 0.9;
        align-items: center;
        transition: 0.5s all ease;
        right: ${({displayMenu}) => (displayMenu ? '100%' : '0')};
    }
`

const NavMenu = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style: none;
    text-align: center;
    width: 100%;
    justify-content: space-around;
    ${mobile({ flexDirection: 'column', marginTop: '-150px'  })}

`


const NavItem = styled.li`
    height: 80px;
    ${mobile({ margin: '15px', height: '60px' })}
    
`

const NavLinks = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    font-weight: 500;
    font-size: 18px;
    ${mobile({ fontSize: '18px' })}

    &:hover {
        scale: 1.25;
    }

`


const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 20px;
    ${mobile({ justifyContent: 'space-around' })}
`

const MenuItem = styled.div`
    font-size: 28px;
    cursor: pointer;
    margin: 0px 25px;
    color: #fff;
    display: flex;
    ${mobile({ margin: '0px' })}

    &:hover {
        scale: 1.25;
    }
`

const Burger = styled(Link)`
    display: none;
    ${mobile({ display: 'flex' })}
`


const Navbar = () => {

    const dispatch = useDispatch();

    const parseCookie = str =>
    str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
                acc[decodeURIComponent(v[0]?.trim())] = decodeURIComponent(v[1]?.trim());
                return acc;
            }, {}
    );

    const isLoggedIn = parseCookie(document.cookie).loggedIn

    const quantity = useSelector(state => state.cart.quantity);

    const [bgColor, setBgColor] = useState(false);
    const [navHeight, setNavHeight] = useState(false);

    const [displayMenu, setDisplayMenu] = useState(true);
    const [menuPosition, setMenuPosition] = useState(false);


    const navigate = useNavigate()


    const changeColor = () => {
        if (window.scrollY >= 80) {
            setBgColor(true);
            setNavHeight(true);
            setMenuPosition(true);
        } else {
            setBgColor(false);
            setNavHeight(false);
            setMenuPosition(false);
        }
    };

    window.addEventListener('scroll', changeColor);

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(logout())
        navigate(0)
    }
    


  return (
    <Container bgColor={bgColor} navHeight={navHeight} >
        <Wrapper>
            <Left>
                <Burger onClick={() => setDisplayMenu(!displayMenu)} >
                    <MenuItem>
                        { displayMenu ? <MenuIcon color="#fff" style={{fontSize: 'inherit'}} /> :
                            <CloseIcon color="#fff" style={{fontSize: 'inherit'}} /> }
                    </MenuItem>
                </Burger>
                <Link to="/" style={{height: 0}}>
                    <LogoImg src={logoimg} alt="Logo" />
                    <Logo>la nuderia</Logo>
                </Link>
            </Left>
            <Center displayMenu={displayMenu} menuPosition={menuPosition}>
                <NavMenu>
                    <NavItem>
                        <NavLinks>
                            <MobileSearchBar />
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="/whoami">
                            SOY CAMI
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="/products">
                            TIENDA
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="/classes">
                            CURSOS
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="/tutorials">
                            TUTORIALES GRATUITOS
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="/help">
                            AYUDA
                        </NavLinks>
                    </NavItem>
                </NavMenu>
            </Center>
            <Right>
                <Link>
                    <MenuItem>
                        {/*<SearchIcon color="#fff" style={{fontSize: 'inherit'}} />*/}
                        <SearchBar />
                    </MenuItem>
                </Link>
                <Link>
                    {isLoggedIn ? 
                        <MenuItem onClick={handleClick}>
                            <LogoutIcon color="#fff" style={{fontSize: 'inherit'}} />
                        </MenuItem> :
                        <MenuItem>
                            <LoginModal title={'INGRESAR'} iconColor={'#fff'} />
                        </MenuItem>
                    }   
                </Link>
                <Link to='/cart'>
                    <MenuItem>
                        <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartOutlinedIcon color="white" style={{fontSize: 'inherit'}} />
                        </Badge>
                    </MenuItem>
                </Link>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar;