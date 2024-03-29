import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { activateCourse, confirmationCourseEmail, confirmationEmail, getOrders, updateOrderStatus } from '../redux/httpRequests';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ConfirmationModal from '../components/ConfirmationModal';
import PaidSharpIcon from '@mui/icons-material/PaidSharp';
import ConfirmationModal2 from '../components/ConfirmationModal2';
import { mobile } from '../responsive';
import OrderDetailModal from '../components/OrderDetailModal';
import SendOrderModal from '../components/SendOrderModal';
import PayCourseModal from '../components/PayCourseModal';



const Container = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  height: 80vh;
  width: 75vw;
  justify-content: center;
  flex-direction: column;
  ${mobile({width: '95vw', padding: '0px', marginLeft: '0px', height: '85vh'})}
`

const Status = styled.div`
  width: 80px;
  text-align: center;
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

const CellAction = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const PayButton = styled.div`
  padding: 2px 5px;
  border-radius: 5px;
  color: rgb(22 163 74);
  border: 1px solid rgb(22 163 74);
  cursor: pointer;

  &:hover {
    background-color: rgb(22 163 74);
    color: #fff;
  }
`


const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
`

const Title = styled.h1`
  font-size: 24px;
`

const CancelButton = styled.div`
  padding: 2px 5px;
  border-radius: 5px;
  color: crimson;
  border: 1px solid rgba(220, 20, 60, 0.6);
  cursor: pointer;
  background-color: transparent;

  &:hover {
    background-color: rgba(220, 20, 60, 0.6);
    color: #fff;
  }
`

const Icon = styled.div`
  margin-right: 15px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Logo = styled.img`
  height: 60%;
  border-radius: 10px;
`

const SendButton = styled.div`
  padding: 2px 5px;
  border-radius: 5px;
  color: darkblue;
  border: 1px solid rgba(0, 0, 139, 0.596);
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 139, 0.596);
    color: #fff;
  }
`


const OrderList = () => {

  const dispatch = useDispatch()
  const orders = useSelector((state) => state.order.orders);

  const [open, setOpen] = useState(false);
  const [openPay, setOpenPay] = useState(false);
  
  console.log(orders)
    const handleOpen = (e) => {
      e.preventDefault()
      setOpen(true);
    }
    
    const handleClose = (e) => {
      e.preventDefault()
      setOpen(false);
    }

    const handleOpenPay = (e) => {
      e.preventDefault()
      setOpenPay(true);
    }

    const handleClosePay = (e) => {
      e.preventDefault()
      setOpenPay(false);
    }

    
    



  
  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])
  

  const handleUpdate = (id, status) => {
    dispatch(updateOrderStatus({id, status}))
  }

  const handleConfirmationMail = (id, email) => {
    dispatch(confirmationEmail({id, email}))
  }



  const handleConfirmation = (e, id, email) => {

    e.preventDefault()
    
    handleConfirmationMail(id, email)
      
  }


  const handleUpdatePaid = (e, id, status, email) => {

    e.preventDefault()

    setOpen(false)
    setOpenPay(false)
    
    handleUpdate(id, status)

    if (status === 'paid') {
      try{
        handleConfirmationMail(id, email)
      } catch (err) {
        console.log('Error al enviar mail de confirmacion de pedido')
      }
    }
      
  }





  const ordersColumns = [
    { field: 'createdAt', headerName: 'Fecha', width: 120, renderCell : (params) => {
      return (
        <>
          {moment(params.row.createdAt).format('DD/MM/YYYY')}
        </>
      )
    } },
    { field: 'username', headerName: 'Cliente', width: 230, renderCell : (params) => {
      return (
        <>
          {params.row.name} {params.row.surname}
        </>
      )
    } },
    { field: 'adress', headerName: 'Direccion Entrega', width: 280, renderCell : (params) => {
      return (
        <>
          {params.row.street} {params.row.adressNum}, CP {params.row.postal}, {params.row.province}
        </>
      )
    } },
    { field: 'amount', headerName: 'Total', width: 150, renderCell : (params) => {
      return (
        <>
          {params.row.paymentMethod === 'paypal' ? `USD ${new Intl.NumberFormat().format(params.row.amount)}`: `
          $ ${new Intl.NumberFormat().format(params.row.amount)}`}
        </>
      )
    } },
    { field: 'paymentMethod', headerName: 'Medio de Pago', width: 180, renderCell : (params) => {
      return (
        <>
          {params.row.paymentMethod === 'transference' ? <><AccountBalanceIcon  style={{marginRight: '5px', color: '#0048ba'}} /> Transferencia</>
            : params.row.paymentMethod === 'debit' ? <><AccountBalanceIcon  style={{marginRight: '5px', color: '#0048ba'}} /> Debito/Transferencia</>
            : params.row.paymentMethod === 'credit' ? <><CreditCardIcon  style={{marginRight: '5px', color: '#ff5722'}} /> Credito</>
            : params.row.paymentMethod === 'mercadopago' ? <><Logo src='https://firebasestorage.googleapis.com/v0/b/la-nuderia.appspot.com/o/mercadopagoButton.png?alt=media&token=85836135-4828-48fd-a90c-b0ec56c78169' alt='MercadoPago' /></>
            : params.row.paymentMethod === 'paypal' ? <><Logo src='https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/Online_Primary_Acceptance_Mark_RGB_V2_small.jpg' alt='PayPal' /></>
            : 'medio de pago'} 
        </>
      )
    } },
    { field: 'status', headerName: 'Status', width: 130, sortable: true, renderCell: (params) => {
      return (
        <Status status={params.row.status}>{params.row.status === 'paid' ? 'Pagado' 
          : params.row.status === 'canceled' ? 'Cancelado'
          : params.row.status === 'pending' ? 'Pendiente'
          : params.row.status === 'sent' ? 'Enviado'
          : 'status'}</Status>
      )
    } },
    { field: 'action', headerName: 'Action', width: 170, sortable: false, renderCell: (params) => {
      return (
        <CellAction>
          {params.row.status === 'pending' && params.row.sent === false ?
          <>{params.row.course === true ?
            <div key={params.row._id} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <PayCourseModal key={params.row._id} order={params.row} />
            </div>
            //<PayButton onClick={(e) => handleUpdatePaidCourse(e, params.row._id, 'paid', params.row.email, params.row.products, params.row.createdAt, params.row.userId)} style={{marginRight: '5px'}}>Paga</PayButton>
            : <PayButton onClick={(e) => handleUpdatePaid(e, params.row._id, 'paid', params.row.email)} style={{marginRight: '5px'}}>Paga</PayButton>}
            <CancelButton onClick={(e) => handleUpdatePaid(e, params.row._id, 'canceled', params.row.email)}>Cancelar</CancelButton>
            {/*<ConfirmationModal2
              id={params.row._id}
              status={'paid'}
              open={openPay} 
              close={handleClosePay} 
              children={<PayButton onClick={handleOpenPay} style={{marginRight: '10px'}}>Paga</PayButton>}
              title='Modificar'
              text='Estas seguro que deseas modificar este producto?'
              fn={handleUpdatePaid}
            />
            <ConfirmationModal2
              id={params.row._id}
              status={'canceled'}
              open={open} 
              close={handleClose} 
              children={<CancelButton onClick={handleOpen}>Cancelar</CancelButton>}
              title='Cancelar'
              text='Estas seguro que deseas cancelar esta compra?'
              fn={handleUpdatePaid}
            />*/}
          </>
          : params.row.status === 'paid' && params.row.sent === false ?
          <>
            {params.row.course === true ? 
            <></>
            :
            <>
              <CancelButton onClick={(e) => handleUpdatePaid(e, params.row._id, 'canceled', params.row.email)}>Cancelar</CancelButton>
              <div key={params.row._id} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <SendOrderModal key={params.row._id} order={params.row} date={moment(params.row.createdAt).format('DD/MM/YYYY')} products={params.row.products} />
              </div>
            </>
            }
            {/*<SendButton onClick={(e) => handleConfirmation(e, params.row._id, 'gmlongobardi@hotmail.com')}>Enviado</SendButton>
            <ConfirmationModal2
                id={params.row._id}
                status={'canceled'}
                open={open} 
                close={handleClose} 
                children={<CancelButton onClick={handleOpen}>Cancelar</CancelButton>}
                title='Cancelar'
                text='Estas seguro que deseas cancelar esta compra?'
                fn={handleUpdatePaid}
            />*/}
          </>
          : params.row.status === 'sent' ? 
          <></>
          : params.row.status === 'paid' && params.row.course === true ?
          <></>
          :
          <></>
          }
        </CellAction>
        
      )
    }
    },
    { field: 'products', headerName: 'Detalle y N°', width: 130, sortable: true, renderCell: (params) => {
      return (
        <div key={params.row._id} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <OrderDetailModal key={params.row._id} order={params.row} date={moment(params.row.createdAt).format('DD/MM/YYYY')} products={params.row.products} />
          <p>{params.row._id.slice(params.row._id.length - 7)}</p>
        </div>
      )
    } },
];


  const localizedTextsMap = {
    columnMenuUnsort: "Desclasificar",
    columnMenuSortAsc: "Ordenar ascendentemente",
    columnMenuSortDesc: "Ordenar decrecientemente",
    columnMenuFilter: "Filtro",
    columnMenuHideColumn: "Ocultar",
    columnMenuShowColumns: "Mostrar columnas"
  };


  return (
    <Container>
      <Wrapper>
        <Top>
          <Icon>
            <PaidSharpIcon style={{width: '30px', height: '30px', color: '#1aa791ab'}} />
          </Icon>
          <Title>Transacciones</Title>
        </Top>
        <DataGrid
          rows={orders}
          columns={ordersColumns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row._id}
          sx={{
            borderRadius: '10px',
            marginLeft: '20px',
          }}
          localeText={localizedTextsMap}
        />
      </Wrapper>
    </Container>
  )
}

export default OrderList