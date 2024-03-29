import { Link } from "react-router-dom";
import styled from "styled-components";
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import GroupSharpIcon from '@mui/icons-material/GroupSharp';
import Inventory2SharpIcon from '@mui/icons-material/Inventory2Sharp';
import PaidSharpIcon from '@mui/icons-material/PaidSharp';
import ContactMailSharpIcon from '@mui/icons-material/ContactMailSharp';
import SettingsIcon from '@mui/icons-material/Settings';
import VideocamIcon from '@mui/icons-material/Videocam';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { mobile } from "../responsive";


const Container = styled.div`
  top: 6px;
  width: 20vw;
  background-color: #fff;
  height: 100%;
  position: sticky;
  box-shadow: 3px 0px 10px 0px rgba(161,161,161,0.61);
  -webkit-box-shadow: 3px 0px 10px 0px rgba(161,161,161,0.61);
  -moz-box-shadow: 3px 0px 10px 0px rgba(161,161,161,0.61);

  @media  screen and (max-width: 768px) {
        z-index: 10;
        position: fixed;
        display: flex;
        top: 10vh;
        height: 100%;
        width: 100vw;
        flex-direction: column;
        background-color: #216E8C;
        align-items: center;
        transition: 0.5s all ease;
        right: ${({displayMenu}) => (displayMenu ? '100%' : '40%')};
        box-shadow: none;
    }

`

const Wrapper = styled.div`
  padding: 40px;
  color: #555;
  ${mobile({marginRight: '-40%'})}

`
const Menu = styled.div`
`



const ItemsList = styled.ul`
  list-style: none;
  padding: 5px;
  ${mobile({marginTop: '0px'})}
`

const Item = styled.li`
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 10px;
  text-decoration: none;
  color: #636363;
  margin: 5px 0px;
  padding: 7px;
  flex-direction: column;
  margin-top: 20px;

  &:active {
    background-color: #216E8C;
    text-decoration: none;
    color: #fff;
  }

  &:hover {
    background-color: #216E8C;
    text-decoration: none;
    color: #fff;
  }

  ${mobile({color: '#fff'})}
`

const Icon =styled.div`
  color: #636363;
  margin-right: 10px;
  font-size: 40px;
  display: flex;
  align-items: center;
  margin-left: 10px;
  
  ${mobile({color: 'fff'})}
`

const ItemLink = styled(Link)`
  
`


const SideBar = ({displayMenu, setDisplayMenu}) => {


  return (
    <Container displayMenu={displayMenu}>
      <Wrapper>
        <Menu>
          <ItemsList>
            <ItemLink style={{textDecoration: 'none'}} to='/' onClick={() => setDisplayMenu(!displayMenu)}>
              <Item>
                <Icon style={{color: 'inherit'}}>
                  <GridViewSharpIcon style={{fontSize: '32px'}}/>
                </Icon>
                Dashboard
              </Item>
            </ItemLink>
            {/*<ItemLink style={{textDecoration: 'none'}} >
              <Item>
                <Icon style={{color: 'inherit'}}>
                  <TrendingUpSharpIcon style={{fontSize: '40px'}} />
                </Icon>
                Analitycs
              </Item>
            </ItemLink>*/}
            <ItemLink style={{textDecoration: 'none'}} to='/users' onClick={() => setDisplayMenu(!displayMenu)}>
              <Item>
                <Icon style={{color: 'inherit'}}>
                  <GroupSharpIcon  style={{fontSize: '32px'}}/>
                </Icon>
                Usuarios
              </Item>
            </ItemLink>
            <ItemLink style={{textDecoration: 'none'}} to='/products'onClick={() => setDisplayMenu(!displayMenu)}>
              <Item>
                <Icon style={{color: 'inherit'}}>
                  <Inventory2SharpIcon  style={{fontSize: '32px'}}/>
                </Icon>
                Productos
              </Item>
            </ItemLink>
            <ItemLink style={{textDecoration: 'none'}} to='/orders' onClick={() => setDisplayMenu(!displayMenu)}>
              <Item>
                <Icon style={{color: 'inherit'}}>
                  <PaidSharpIcon style={{fontSize: '32px'}}/>
                </Icon>
                Transacciones
              </Item>
            </ItemLink>
            <ItemLink style={{textDecoration: 'none'}} to='/courses' onClick={() => setDisplayMenu(!displayMenu)}>
              <Item>
                <Icon style={{color: 'inherit'}}>
                  <OndemandVideoIcon style={{fontSize: '32px'}}/>
                </Icon>
                Cursos
              </Item>
            </ItemLink>
            <ItemLink style={{textDecoration: 'none'}} to='/newsletter' onClick={() => setDisplayMenu(!displayMenu)}>
              <Item>
                <Icon style={{color: 'inherit'}}>
                  <ContactMailSharpIcon style={{fontSize: '32px'}}/>
                </Icon>
                Newsletter
              </Item>
            </ItemLink>
            <ItemLink style={{textDecoration: 'none'}} to='/preferences' onClick={() => setDisplayMenu(!displayMenu)}>
              <Item>
                <Icon style={{color: 'inherit'}}>
                  <SettingsIcon style={{fontSize: '32px'}}/>
                </Icon>
                Preferencias
              </Item>
            </ItemLink>
          </ItemsList>
        </Menu>
      </Wrapper>
    </Container>
  )
}

export default SideBar;