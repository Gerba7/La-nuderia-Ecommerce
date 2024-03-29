import { Link } from "react-router-dom";
import styled from "styled-components";
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import TrendingUpSharpIcon from '@mui/icons-material/TrendingUpSharp';
import GroupSharpIcon from '@mui/icons-material/GroupSharp';
import Inventory2SharpIcon from '@mui/icons-material/Inventory2Sharp';
import PaidSharpIcon from '@mui/icons-material/PaidSharp';
import AssessmentSharpIcon from '@mui/icons-material/AssessmentSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import ContactMailSharpIcon from '@mui/icons-material/ContactMailSharp';
import SettingsIcon from '@mui/icons-material/Settings';


const Container = styled.div`
  top: 6px;
  width: 20vw;
  background-color: #fff;
  height: 90vh;
  position: sticky;
  box-shadow: 3px 0px 10px 0px rgba(161,161,161,0.61);
  -webkit-box-shadow: 3px 0px 10px 0px rgba(161,161,161,0.61);
  -moz-box-shadow: 3px 0px 10px 0px rgba(161,161,161,0.61);
`

const Wrapper = styled.div`
  padding: 40px;
  color: #555;
`
const Menu = styled.div`
`

const Title = styled.h3`
  font-size: 14px;
  color: rgb(165, 164, 164);
  margin-top: 20px;
`

const ItemsList = styled.ul`
  list-style: none;
  padding: 5px;
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
`

const Icon =styled.div`
  color: #636363;
  margin-right: 10px;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-left: 10px;
`

const ItemLink = styled(Link)`
  
`


const SideBar = () => {
  return (
    <Container>
      <Wrapper>
        <Menu>
          <Title>Panel de Administracion</Title>
          <ItemsList>
            <ItemLink style={{textDecoration: 'none'}} to='/' >
              <Item>
                <Icon>
                  <GridViewSharpIcon style={{fontSize: 'inherit'}}/>
                </Icon>
                Dashboard
              </Item>
            </ItemLink>
            <ItemLink style={{textDecoration: 'none'}} >
              <Item>
                <Icon>
                  <TrendingUpSharpIcon style={{fontSize: 'inherit'}}/>
                </Icon>
                Analitycs
              </Item>
            </ItemLink>
          </ItemsList>
          <Title>Menu</Title>
          <ItemsList>
            <ItemLink style={{textDecoration: 'none'}} to='/users'>
              <Item>
                <Icon>
                  <GroupSharpIcon style={{fontSize: 'inherit'}}/>
                </Icon>
                Usuarios
              </Item>
            </ItemLink>
            <ItemLink style={{textDecoration: 'none'}} to='/products'>
              <Item>
                <Icon>
                  <Inventory2SharpIcon style={{fontSize: 'inherit'}}/>
                </Icon>
                Productos
              </Item>
            </ItemLink>
            <ItemLink style={{textDecoration: 'none'}} to='/orders'>
              <Item>
                <Icon>
                  <PaidSharpIcon style={{fontSize: 'inherit'}}/>
                </Icon>
                Transacciones
              </Item>
            </ItemLink>
          </ItemsList>
          <Title>Notificaciones</Title>
          <ItemsList>
            <ItemLink style={{textDecoration: 'none'}}>
              <Item>
                <Icon>
                  <EmailSharpIcon style={{fontSize: 'inherit'}}/>
                </Icon>
                Mails
              </Item>
            </ItemLink>
            <ItemLink style={{textDecoration: 'none'}}>
              <Item>
                <Icon>
                  <ContactMailSharpIcon style={{fontSize: 'inherit'}}/>
                </Icon>
                Newsletter
              </Item>
            </ItemLink>
          </ItemsList>
          <Title>Configuracion</Title>
          <ItemsList>
            <ItemLink style={{textDecoration: 'none'}}>
              <Item>
                <Icon>
                  <SettingsIcon style={{fontSize: 'inherit'}}/>
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