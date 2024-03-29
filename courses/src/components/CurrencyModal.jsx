import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { mobile } from '../responsive';
import USFlag from '../images/us.svg';
import ARFlag from '../images/ar.svg';
import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import { CurrencyContext } from '../context/CurrencyContext';



const Container = styled.div`
`


const CloseButton = styled.button`
  display: flex;
  position: absolute;
  top: 2.5%;
  right: 2.5%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #fff;
  border-radius: 5px;
  ${mobile({ top: '5%', right: '5%' })}
`


const style = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 300,
  bgcolor: '#216E8C',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',

  '@media (max-width: 768px)': { 
    width: '70%',
   
  }
};



const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
`

const Text = styled.h2`
    text-align: center;
    color: #fff;
`

const Paragraph = styled.h3`
    text-align: center;
    color: #fff;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 3vh;
    font-size: 18px;
    font-weight: 400;
`

const BoxContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Currency = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 18px;
    align-items: center;
    justify-content: center;
    gap: 1vw;
    cursor: pointer;
`

const Flag = styled.img`
`




export default function CurrencyModal({openModal, toggleModal}) {

  const { dispatch } = useContext(CurrencyContext);

  const handleChangeCurrencyUSA = (e) => {
    e.preventDefault();
    dispatch({type: 'CHANGE_CURRENCY_START'});
      try {
        dispatch({type: 'CHANGE_CURRENCY_SUCCESS', payload: 'usa'})
        toggleModal()
      } catch (err) {
        dispatch({type: 'CHANGE_CURRENCY_ERROR'})
      }
  }

  const handleChangeCurrencyAR = (e) => {
    e.preventDefault();
    dispatch({type: 'CHANGE_CURRENCY_START'});
      try {
        dispatch({type: 'RESET_CURRENCY'})
        toggleModal()
      } catch (err) {
        dispatch({type: 'CHANGE_CURRENCY_ERROR'})
      }
  }


  
  return (
    <Container>
      <Modal
        sx={{border: 'none'}}
        open={openModal}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <BoxContainer>
                <Wrapper>
                    <Paragraph>
                        Seleccione su moneda - Select your currency
                        <br/>
                        <Currency onClick={handleChangeCurrencyAR}>
                            <Flag src={ARFlag} alt='flag' width={25} height={25} style={{borderRadius: '50%', cursor: 'pointer'}} />
                            <p style={{marginTop: '4px', fontSize: '16px', fontWeight: 400, color: '#fff'}}>ARS</p>
                        </Currency>
                        <Currency onClick={handleChangeCurrencyUSA}>
                            <Flag src={USFlag} alt='flag' width={25} height={25} style={{borderRadius: '50%', cursor: 'pointer'}} />
                            <p style={{marginTop: '4px', fontSize: '18px', fontWeight: 400, color: '#fff'}}>USD</p>
                        </Currency>
                        <br/>
                        Los pedidos se procesarán en ARS y en USD en Paypal.
                    </Paragraph>
                </Wrapper>
            </BoxContainer>
            <CloseButton onClick={toggleModal}><CloseIcon /></CloseButton>
        </Box>
      </Modal>
    </Container>
  );
}