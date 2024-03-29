import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useEffect } from 'react';
import privateRequest, { publicRequest } from '../api/axios';
import { useDispatch } from 'react-redux';
import { updatePostFees } from '../redux/httpRequests';
import { resetLoading, setLoading } from '../redux/loadingSlice';
import { setAlert } from '../redux/alertSlice';

const Container = styled.div`
    width: 80vw;
    height: 82vh;
    padding: 30px;
    ${mobile({marginTop: '90px'})}
`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    column-gap: 30px;
    position: relative;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    ${mobile({width: '85vw', padding: '0px', marginLeft: '0px', height: '85vh', flexDirection: 'column', gap: '20px'})}
`

const Row = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 20px;
  ${mobile({flexDirection: 'column'})}
`

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
  -webkit-box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
  -moz-box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
  border-radius: 10px;
  padding: 30px;
  gap: 20px;
`

const Title = styled.h1`
  font-weight: 500;
  font-size: 20px;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Headers = styled.div`
  display: flex;
  flex-direction: row;
`

const Header = styled.h5`
  flex: 1;
`

const ItemDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const InputWeight = styled.h5`
  flex: 1;
`

const Button = styled.button`
  height: 4vh;
  width: 50%;
  align-self: flex-end;
`


const Configuration = () => {

  const dispatch = useDispatch();


  const [postalFees, setPostalFees] = useState({
    zoneA1: 0,
    zoneA2: 0,
    zoneA3: 0,
    zoneA5: 0,
    zoneA10: 0,
    zoneA15: 0,
    zoneB1: 0,
    zoneB2: 0,
    zoneB3: 0,
    zoneB5: 0,
    zoneB10: 0,
    zoneB15: 0,
    zoneC1: 0,
    zoneC2: 0,
    zoneC3: 0,
    zoneC5: 0,
    zoneC10: 0,
    zoneC15: 0,
    zoneD1: 0,
    zoneD2: 0,
    zoneD3: 0,
    zoneD5: 0,
    zoneD10: 0,
    zoneD15: 0,
  });
  const [coupon, setCoupon] = useState({
    discount: 0,
    expiry: 0,
  })
  
  useEffect(() => {
    const getPostFees = async () => {
      try {
          const res = await publicRequest.get('/postal')
          console.log(res.data)
          setPostalFees({
            ...postalFees, 
            zoneA1: res.data[0].zoneA,
            zoneB1: res.data[0].zoneB,
            zoneC1: res.data[0].zoneC,
            zoneD1: res.data[0].zoneD,
            zoneA2: res.data[1].zoneA,
            zoneB2: res.data[1].zoneB,
            zoneC2: res.data[1].zoneC,
            zoneD2: res.data[1].zoneD,
            zoneA3: res.data[2].zoneA,
            zoneB3: res.data[2].zoneB,
            zoneC3: res.data[2].zoneC,
            zoneD3: res.data[2].zoneD,
            zoneA5: res.data[3].zoneA,
            zoneB5: res.data[3].zoneB,
            zoneC5: res.data[3].zoneC,
            zoneD5: res.data[3].zoneD,
            zoneA10: res.data[4].zoneA,
            zoneB10: res.data[4].zoneB,
            zoneC10: res.data[4].zoneC,
            zoneD10: res.data[4].zoneD,
            zoneA15: res.data[5].zoneA,
            zoneB15: res.data[5].zoneB,
            zoneC15: res.data[5].zoneC,
            zoneD15: res.data[5].zoneD,
          })
      } catch (err) {
          console.log(err)
      }
    }
    getPostFees();
  }, [])


  const updatePostFee = async (e) => {

    e.preventDefault()

      dispatch(setLoading())
    
      try {
          console.log(postalFees)
          const res = await privateRequest.put('/postal', postalFees);
          dispatch(resetLoading())
          dispatch(setAlert({message: 'Se actualizaron precios de envio con exito!', type: 'success'}))
          return res.data;
      } catch (err) {
          console.log(err)
          dispatch(resetLoading())
          dispatch(setAlert({message: 'No se pudieron actulizar los precios', type: 'error'}))
      }

      console.log('ok')
      
    
        
  }


  const handleChange = (e, fee) => {
      e.preventDefault()
      if (e.target.value < 0 || isNaN(e.target.value)) {
        console.log('err')
    } else {
      let numValue = Number(e.target.value)
      setPostalFees(prev => {
        return { ...prev, [fee]: numValue}
    });
    }
  }


  const handleChangeCoupon = (e, item) => {
      e.preventDefault()
      if (e.target.value < 0 || isNaN(e.target.value)) {
        console.log('err')
    } else {
      let numValue = Number(e.target.value)
      setCoupon(prev => {
        return { ...prev, [item]: numValue}
    });
    }
  }






  return (
    <Container>
        <Wrapper>
          <Row style={{flex: '1.5'}}>
            <Column>
              <Title>PRECIO DE ENVIOS</Title>
              <InputContainer>
                <Headers>
                  <Header>Producto</Header>
                  <Header style={{textAlign: 'center'}}>Zona 1</Header>
                  <Header style={{textAlign: 'center'}}>Zona 2</Header>
                  <Header style={{textAlign: 'center'}}>Zona 3</Header>
                  <Header style={{textAlign: 'center'}}>Zona 4</Header>
                </Headers>
                <ItemDetail>
                  <InputWeight>Hasta 1kg</InputWeight>
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneA1 : 0} 
                    onChange={(e) => handleChange(e, 'zoneA1')}
                    sx={{flex: '1'}}
                  />
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneB1 : 0} 
                    onChange={(e) => handleChange(e, 'zoneB1')}
                    sx={{flex: '1'}} 
                  />
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneC1 : 0} 
                    onChange={(e) => handleChange(e, 'zoneC1')}
                    sx={{flex: '1'}} 
                  />
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneD1 : 0} 
                    onChange={(e) => handleChange(e, 'zoneD1')}
                    sx={{flex: '1'}} 
                  />
                </ItemDetail>
                <ItemDetail>
                  <InputWeight>Hasta 2kg</InputWeight>
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneA2 : 0} 
                    onChange={(e) => handleChange(e, 'zoneA2')}
                    sx={{flex: '1'}}
                  />
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneB2 : 0} 
                    onChange={(e) => handleChange(e, 'zoneB2')}
                    sx={{flex: '1'}} 
                  />
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneC2 : 0} 
                    onChange={(e) => handleChange(e, 'zoneC2')}
                    sx={{flex: '1'}} 
                  />
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneD2 : 0} 
                    onChange={(e) => handleChange(e, 'zoneD2')}
                    sx={{flex: '1'}} 
                  />
                </ItemDetail>
                <ItemDetail>
                  <InputWeight>Hasta 3kg</InputWeight>
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneA3 : 0} 
                    onChange={(e) => handleChange(e, 'zoneA3')}
                    sx={{flex: '1'}}
                  />
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneB3 : 0} 
                    onChange={(e) => handleChange(e, 'zoneB3')}
                    sx={{flex: '1'}} 
                  />
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneC3 : 0} 
                    onChange={(e) => handleChange(e, 'zoneC3')}
                    sx={{flex: '1'}} 
                  />
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneD3 : 0} 
                    onChange={(e) => handleChange(e, 'zoneD3')}
                    sx={{flex: '1'}} 
                  />
                </ItemDetail>
                <ItemDetail>
                  <InputWeight>Hasta 5kg</InputWeight>
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneA5 : 0} 
                    onChange={(e) => handleChange(e, 'zoneA5')}
                    sx={{flex: '1'}}
                  />
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneB5 : 0} 
                    onChange={(e) => handleChange(e, 'zoneB5')}
                    sx={{flex: '1'}} 
                  />
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneC5 : 0} 
                    onChange={(e) => handleChange(e, 'zoneC5')}
                    sx={{flex: '1'}} 
                  />
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneD5 : 0} 
                    onChange={(e) => handleChange(e, 'zoneD5')}
                    sx={{flex: '1'}} 
                  />
                </ItemDetail>
                <ItemDetail>
                  <InputWeight>Hasta 10kg</InputWeight>
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneA10 : 0} 
                    onChange={(e) => handleChange(e, 'zoneA10')}
                    sx={{flex: '1'}}
                  />
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneB10 : 0} 
                    onChange={(e) => handleChange(e, 'zoneB10')}
                    sx={{flex: '1'}} 
                  />
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneC10 : 0} 
                    onChange={(e) => handleChange(e, 'zoneC10')}
                    sx={{flex: '1'}} 
                  />
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneD10 : 0} 
                    onChange={(e) => handleChange(e, 'zoneD10')}
                    sx={{flex: '1'}} 
                  />
                </ItemDetail>
                <ItemDetail>
                  <InputWeight>Hasta 15kg</InputWeight>
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneA15 : 0} 
                    onChange={(e) => handleChange(e, 'zoneA15')}
                    sx={{flex: '1'}}
                  />
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneB15 : 0} 
                    onChange={(e) => handleChange(e, 'zoneB15')}
                    sx={{flex: '1'}} 
                  />
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneC15 : 0} 
                    onChange={(e) => handleChange(e, 'zoneC15')}
                    sx={{flex: '1'}} 
                  />
                  <TextField 
                    required 
                    id="outlined-required" 
                    name='price' 
                    label='Precio' 
                    value={postalFees ? postalFees.zoneD15 : 0} 
                    onChange={(e) => handleChange(e, 'zoneD15')}
                    sx={{flex: '1'}} 
                  />
                </ItemDetail>
              </InputContainer>
              <Button onClick={e => updatePostFee(e)} >Confirmar cambios</Button>
            </Column>
            <Column>
              <Title>EMITIR DESCUENTO</Title>
                <InputContainer>
                  <ItemDetail>
                    <InputWeight>Descuento %</InputWeight>
                    <TextField 
                      required 
                      id="outlined-required" 
                      name='discount' 
                      label='Descuento' 
                      value={coupon.discount} 
                      onChange={(e) => handleChangeCoupon(e, 'discount')}
                      sx={{flex: '1'}}
                    />
                  </ItemDetail>
                  <ItemDetail>
                    <InputWeight>Validez (dias)</InputWeight>
                    <TextField 
                      required 
                      id="outlined-required" 
                      name='expiry' 
                      label='Validez' 
                      value={coupon.expiry} 
                      onChange={(e) => handleChangeCoupon(e, 'expiry')}
                      sx={{flex: '1'}}
                    />
                  </ItemDetail>
                  <Button disabled>Emitir</Button>
                </InputContainer>
            </Column>
          </Row>
        </Wrapper>
    </Container>
  )
}

export default Configuration;