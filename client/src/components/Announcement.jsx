import styled from 'styled-components';

const Container = styled.div`
    height: 30px;
    background-color: #216E8C;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`

const Announcement = () => {
  return (
    <Container>
        Paga en hasta 6 cuotas y financia tu compra! <b>Aprovecha los descuentos exclusivos para vos!</b>
    </Container>
  )
}

export default Announcement;