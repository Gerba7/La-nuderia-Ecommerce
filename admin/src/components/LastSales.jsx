import { useEffect } from "react";
import styled from "styled-components";
import moment from 'moment';
import privateRequest, { publicRequest } from "../api/axios";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { resetLoading, setLoading } from "../redux/loadingSlice";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { mobile } from "../responsive";


const Container = styled.div`
    flex: 1;
    box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
    -webkit-box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
    -moz-box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
    margin: 10px 10px 0px 20px;
    border-radius: 10px;
    background-color: #fff;
    max-height: max-content;
    
    ${mobile({width: '85vw', margin: '0px', maxHeight: '100%', display: 'none'})}
`

const Wrapper = styled.div`
    color: #636363;
    padding: 10px;
`

const WidgetTitle = styled.h3`
    font-size: 22px;
    font-weight: 600;
    text-align: center;
    margin: 5px 0;
`

const WidgetTable = styled.table`
    width: 100%;
    border-spacing: 12px;
`

const Table = styled.tbody`
`

const WidgetTableRow = styled.tr`
    text-align: center;
`

const WidgetTableCol = styled.th`
    font-weight: 300;
`

const Status = styled.div`
  padding: 5px;
  border-radius: 5px;
  color: ${({status}) => 
    status === 'paid' ? '#fff'
     : status === 'canceled' ? '#fff'
     : status === 'pending' ? '#000'
     : status === 'sent' ? '#fff'
     : 'gray'};
  background-color: ${({status}) => 
    status === 'paid' ? 'rgba(26, 167, 145, 0.671)'
     : status === 'canceled' ? 'rgba(220, 20, 60, 0.6)'
     : status === 'pending' ? '#ffee58'
     : status === 'sent' ? '#216E8C'
     : 'gray'}; 
`

const Logo = styled.img`
  height: 30px;
  border-radius: 10px;
`


const LastSales = () => {

    const [lastSales, setLastSales] = useState([]);

    const dispatch = useDispatch();
  
    useEffect(() => {
        const getIncome = async () => {
            try {
                dispatch(setLoading())
                const res = await privateRequest.get("/orders?new=ok")
                console.log(res.data)
                setLastSales(res.data)
                dispatch(resetLoading())
            } catch (err) {
                console.log(err)
                dispatch(resetLoading())
            }
        }
        getIncome()
    }, [dispatch])


  return (
    <Container>
        <Wrapper>
            <WidgetTitle>Últimas Ventas</WidgetTitle>
            <WidgetTable>
                <Table>
                <WidgetTableRow>
                    <WidgetTableCol style={{fontWeight: '500'}}>Fecha</WidgetTableCol>
                    <WidgetTableCol style={{fontWeight: '500'}}>Medio de Pago</WidgetTableCol>
                    <WidgetTableCol style={{fontWeight: '500'}}>Monto</WidgetTableCol>
                    <WidgetTableCol style={{fontWeight: '500'}}>Status</WidgetTableCol>
                </WidgetTableRow>
                
                {lastSales.map((sale) => {
                    return(
                    <WidgetTableRow key={sale._id}>
                        <WidgetTableCol>{moment(sale.createdAt).format('DD/MM/YYYY')}</WidgetTableCol>
                        <WidgetTableCol>
                            {sale.paymentMethod === 'transference' ? <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><AccountBalanceIcon  style={{marginRight: '5px', color: '#0048ba'}} /> Transferencia</div>
                            : sale.paymentMethod === 'debit' ? <><AccountBalanceIcon  style={{marginRight: '5px', color: '#0048ba'}} /> Debito/Transferencia</>
                            : sale.paymentMethod === 'credit' ? <><CreditCardIcon  style={{marginRight: '5px', color: '#ff5722'}} /> Credito</>
                            : sale.paymentMethod === 'mercadopago' ? <><Logo src='https://firebasestorage.googleapis.com/v0/b/la-nuderia.appspot.com/o/mercadopagoButton.png?alt=media&token=85836135-4828-48fd-a90c-b0ec56c78169' alt='MercadoPago' /></>
                            : sale.paymentMethod === 'paypal' ? <><Logo src='https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/Online_Primary_Acceptance_Mark_RGB_V2_small.jpg' alt='PayPal' /></>
                            : 'medio de pago'}
                        </WidgetTableCol>
                        <WidgetTableCol>$ {new Intl.NumberFormat().format(sale.amount)}</WidgetTableCol>
                        <WidgetTableCol>
                            <Status status={sale.status}>{sale.status === 'paid' ? 'Pagado' 
                                : sale.status === 'canceled' ? 'Cancelado'
                                : sale.status === 'pending' ? 'Pendiente'
                                : sale.status === 'sent' ? 'Enviado'
                                : 'status'}</Status>    
                        </WidgetTableCol>
                    </WidgetTableRow>
                    )
                })}

                </Table>
            </WidgetTable>
        </Wrapper>
    </Container>
  )
}

export default LastSales