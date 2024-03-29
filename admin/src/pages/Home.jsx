import styled from 'styled-components';
import Chart from '../components/Chart';
import LastSales from '../components/LastSales';
import PanelStats from '../components/PanelStats';
import { mobile } from '../responsive';


const Container = styled.div`
  width: 80vw;
  height: 80vh;
  ${mobile({width: '80vw', height: '80vh'})}
`

const Wrapper = styled.div`
  height: 100%; 
  padding: 30px;
  ${mobile({width: '80vw', padding: '20px 30px', height: '100%'})}
`

const Bottom = styled.div`
  display: flex;
  ${mobile({flexDirection: 'column'})}
`


const Home = () => {
  
  return (
    <Container>
      <Wrapper>
        <PanelStats />
        <Bottom>
          <Chart />
          <LastSales /> 
        </Bottom>
      </Wrapper>
    </Container>
    
  )
}

export default Home;
