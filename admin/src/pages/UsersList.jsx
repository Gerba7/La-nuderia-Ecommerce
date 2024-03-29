import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { deleteUser, getUsers, updateUserAccess } from '../redux/httpRequests';
import { useDispatch, useSelector } from 'react-redux';
import SwitchToggle from '../components/SwitchToggle';
import ConfirmationModal from '../components/ConfirmationModal';
import { useState } from 'react';
import GroupSharpIcon from '@mui/icons-material/GroupSharp';
import { mobile } from '../responsive';



const Container = styled.div`
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
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
  padding: 5px;
  border-radius: 5px;
  color: ${({status}) => (status ? 'green' : 'crimson')};
  background-color: ${({status}) => (status ? 'rgba(0, 128, 0, 0.151)' : 'rgba(255, 0, 0, 0.05)')}; 
`

const CellAction = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`


const Top = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  
`

const Title = styled.h1`
  font-size: 24px;
`

const DeleteButton = styled.div`
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






const UserList = () => {

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const dispatch = useDispatch()
  const users = useSelector((state) => state.user.users);

  
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])


  const handleUpdate = (id, bool) => {
    dispatch(updateUserAccess({id, bool}))
  }

  const handleDelete = (e,id) => {
    
    e.preventDefault()

    
    try {
      console.log(id)
      dispatch(deleteUser(id))
      dispatch(getUsers())
      handleClose()
    } catch (err) {
      console.log(err)
      handleClose()
    }
  }

  const handleUpdateCourse = (id, bool) => {

    handleUpdate(id, bool)
      
  }


  const usersColumns = [
    { field: 'username', headerName: 'Usuario', width: 180 },
    { field: 'email', headerName: 'Mail', width: 250},
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'lastName', headerName: 'Apellido', width: 200 },
    { field: 'adress', headerName: 'Direccion', width: 300 },
    { field: 'courseAccess', headerName: 'Curso', width: 170, sortable: true, renderCell: (params) => {
      return (
        <>
          <SwitchToggle inStock={params.row.courseAccess} id={params.row._id} fn={handleUpdateCourse}/>
          <Status style={{marginLeft: '10px'}} status={params.row.courseAccess}>{params.row.courseAccess ? 'Activado' : 'Desactivado'}</Status>
        </>
        
      )
    } },
    { field: 'action', headerName: 'Accion', width: 100, sortable: false, renderCell: (params) => {
      return (
        <CellAction>
          {/*<ConfirmationModal 
            open={open} 
            close={handleClose} 
            children={<DeleteButton onClick={handleOpen}>Eliminar</DeleteButton>}
            title='Eliminar'
            text='Estas seguro que deseas eliminar usuario?'
            rowid={params.row._id}
            fn={handleDelete}
          />*/}
          <DeleteButton onClick={(e) => handleDelete(e, params.row._id)}>Eliminar</DeleteButton>
        </CellAction>
      )
      }
    }
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
            <GroupSharpIcon style={{width: '30px', height: '30px', color: '#03a9f4'}} />
          </Icon>
          <Title>Usuarios</Title>
        </Top>
        <DataGrid
          rows={users}
          columns={usersColumns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          getRowId={(row) => row._id}
          sx={{
            marginLeft: '20px',
            borderRadius: '10px',
            '& .MuiDataGrid-columnHeaderTitleContainer': {
              justifyContent: 'center',
              alignItems: 'center'
            }
          }}
          localeText={localizedTextsMap}
        />
      </Wrapper>
    </Container>
  )
}

export default UserList