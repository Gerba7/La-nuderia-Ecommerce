import styled from 'styled-components';
import logo from '../Images/logo.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import DropdownButton from './DropdownButton';
import { mobile } from '../responsive';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';


const Container = styled.div`
    display: 'flex';
    width: 100%;
    height: 10vh;
    position: sticky;
    top: 0;
    z-index: 7;
    ${mobile({maxWidth: '100vw', overflowX: 'hidden'})}
`

const Wrapper = styled.div`
    display: flex;
    height: 100%;
`

const Left = styled.div`
    display: flex;
    flex: 1;
    background-color: #216E8C;
    align-items: center;
    justify-content: center;
    ${mobile({flex: 1, gap: '20px'})}
`

const Logo = styled.img`
    height: 75%;
`

const Center = styled.div`
    display: flex;
    flex: 3;
    background-color: #216E8C;
    align-items: center;
    justify-content: center;
    ${mobile({display: 'none'})}
`

const Right = styled.div`
    display: flex;
    flex: 1;
    background-color: #216E8C;
    align-items: center;
    justify-content: center;
    ${mobile({flex: 1, justifyContent: 'flex-end'})}
`

const TopBarIcon = styled.div`
    font-size: 24px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 15px;
    opacity: 0.5;
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


const TopBar = ({displayMenu, setDisplayMenu}) => {

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


  return (
    <Container>
        <Wrapper>
            <Left>
                { isLoggedIn ?
                <Burger onClick={() => setDisplayMenu(!displayMenu)} >
                    <MenuItem>
                        { displayMenu ? <MenuIcon color="#fff" style={{fontSize: 'inherit'}} /> :
                            <CloseIcon color="#fff" style={{fontSize: 'inherit'}} /> }
                    </MenuItem>
                </Burger>
                : <></>}
                <Logo src={logo} alt="Logo" />
            </Left>
            <Center>
            </Center>
            <Right>
                {isLoggedIn ? 
                <>
                    <TopBarIcon>
                        <NotificationsIcon style={{fontSize: 'inherit', color: 'inherit'}} />
                    </TopBarIcon>
                    {/*<TopBarIcon>
                        <SettingsIcon color="white" style={{fontSize: 'inherit'}} />
                    </TopBarIcon>*/}
                    <DropdownButton />
                </>
                : <></>}
            </Right>
        </Wrapper>
    </Container>
  )
}

export default TopBar;