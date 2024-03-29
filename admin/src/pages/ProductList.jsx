import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { deleteProduct, getProducts, updateProduct } from '../redux/httpRequests';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SwitchToggle from '../components/SwitchToggle';
import NonImage from '../Images/image.png';
import { resetLoading } from '../redux/loadingSlice';
import ConfirmationModal from '../components/ConfirmationModal';
import { useState } from 'react';
import Inventory2SharpIcon from '@mui/icons-material/Inventory2Sharp';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { mobile } from '../responsive';
import { useNavigate } from 'react-router-dom';


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

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
`

const Image = styled.img`
  height: 45px;
  width: 45px;
  border-radius: 50%;
  margin-right: 10px;
`

const CellAction = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const ViewButton = styled.div`
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

const ApplyButton = styled.div`
  padding: 2px 5px;
  border-radius: 5px;
  color: darkgreen;
  border: 1px solid rgba(0, 139, 53, 0.596);
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 139, 53, 0.596);
    color: #fff;
  }
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

const Top = styled.div`
  display: flex;
  justify-content: flex-end;
  
`

const NewButton = styled(Link)`
  padding: 2px 5px;
  border-radius: 5px;
  color: #fff;
  border: 1px solid transparent;
  cursor: pointer;
  background-color: rgba(57, 179, 85, 0.595);
  text-decoration: none;
  margin-bottom: 30px;
  padding: 10px;
  font-weight: 800;
  ${mobile({marginBottom: '10px'})}

  &:hover {
    background-color: #fff;
    color: rgba(57, 179, 85, 0.595);
    text-decoration: none;
    border: 1px solid rgba(57, 179, 85, 0.595);
  }
`

const Input = styled.input`
  width: 40px;
  height: 20px;
  margin-left: 15px;
  margin-bottom: 3px;
  border-radius: 5px;
  padding: 3px;
  padding-left: 5px;
  border: 1px solid black;

  &:focus {
    outline: none;
    border: 1px solid cyan;
  }

  &:active {
  }
`

const Icon = styled.div`
    margin-right: 15px;
    margin-left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`






const ProductList = () => {


  const [open, setOpen] = useState(false);
  const [openDisc, setOpenDisc] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleOpenDisc = () => setOpenDisc(true);

  const handleCloseDisc = () => setOpenDisc(false);



  const dispatch = useDispatch()
  const products = useSelector((state) => state.product.products);
  const navigate = useNavigate();

  useEffect(() => {
      dispatch(getProducts())
  }, [dispatch])


  const handleDelete = async (e, id, img) => {

    e.preventDefault()
    
    try {

      if (img) {

        const storage = getStorage();

        const deleteFiles = async () => {

          let result = await Promise.all(

            img.map((im) => {
              return new Promise((resolve, reject) => {
              const desertRef = ref(storage, im);

              deleteObject(desertRef).then(() => {
                console.log('Images deleted succesfully')
                resolve()
              }).catch((error) => {
                console.log(error)
                reject()
              });

              })
            })
          )
        }

        await deleteFiles()
      }

      await dispatch(deleteProduct(id))            //// arreglarrrr!!!!!!!!!!!!!!!!!!! no se actuliza el estado del deleteado por eso actualizo pagina
      handleClose()
      
      navigate(0)

    } catch (err) {
      console.log(err)
      handleClose()
    }
  }


  const handleUpdate = (id, product) => {
    dispatch(updateProduct({id, product}))
  }

  const handleChange = (id, bool) => {

    const updateProduct = products.find((prod) => prod._id === id)

    const stockProduct = {...updateProduct, inStock: bool}

    handleUpdate(stockProduct._id, stockProduct)

  }


  const handleDiscount = (id, bool) => {

    const updateProduct = products.find((prod) => prod._id === id)

    const discountProduct = {...updateProduct, discount: bool}

    handleUpdate(discountProduct._id, discountProduct)
      
  }

  const handleDiscountAmount = (e, id, disc) => {

    e.preventDefault()

    setOpenDisc(false)

    const updateProduct = products.find((prod) => prod._id === id)

    const discountProduct = {...updateProduct, discountAmount: parseInt(disc)}

    handleUpdate(discountProduct._id, discountProduct)
      
  }



  const productsColumns = [
    { field: '_id', headerName: 'ID', width: 250 },
    { field: 'title', headerName: 'Nombre', width: 300, renderCell: (params) => {
        return (
          <>
            {params.row.img ?
            <ImgContainer>
                <Image className="cellImg" src={params.row.img[0]} alt="Img" />
                {params.row.title}
            </ImgContainer> :
            <ImgContainer>
                <Image className="cellImg" src={NonImage} alt="Product" />
                {params.row.title}
            </ImgContainer>
          }
          </>
        ) }},
    { field: 'categories', headerName: 'Categoria', width: 130 },
    { field: 'size', headerName: 'Tamano', width: 90, sortable: true },
    { field: 'price', headerName: 'Precio', width: 90, sortable: true, renderCell : (params) => {
      return (
        <>
          $ {new Intl.NumberFormat().format(params.row.price)}
        </>
      )
    }  },
    { field: 'inStock', headerName: 'Stock', width: 90, sortable: true, renderCell: (params) => 
            <SwitchToggle inStock={params.row.inStock} id={params.row._id} fn={handleChange}/> 
        //onChange={(e) => handleChange(e, params.row._id, false, updateProduct)}
        },
    { field: 'action', headerName: 'Action', width: 200, sortable: false, renderCell: (params) => {
      return (
        <CellAction>
          <Link to={`${params.row._id}`} style={{textDecoration: 'none'}}>
            <ViewButton>Editar</ViewButton>
          </Link>
          <DeleteButton onClick={(e) => handleDelete(e, params.row._id, params.row.img)}>Eliminar</DeleteButton>
          {/*<ConfirmationModal 
            open={open} 
            close={handleClose} 
            children={<DeleteButton onClick={handleOpen}>Eliminar</DeleteButton>}
            title='Eliminar'
            text='Estas seguro que deseas eliminar producto?'
            fn={() => handleDelete(params.row._id, params.row.img)}
          />*/}
        </CellAction>
      )
      }
    },
    { field: 'discount', headerName: 'Descuento (%)', width: 200, sortable: true, renderCell: (params) =>
      <> 
        <SwitchToggle style={{marginRight: '20px'}} inStock={params.row.discount} id={params.row._id} fn={handleDiscount}/>
        {params.row.discount === false ? 
          <><Input style={{marginRight: '20px', border: '1px solid #bebebe'}} type="number" placeholder='' name='discount' disabled /> 
          <ApplyButton style={{marginBottom: '3px', border: '1px solid #bebebe', color: '#bebebe', cursor: 'default'}} disabled>Aplicar</ApplyButton></> :
          <><Input style={{marginRight: '20px'}} id="discount" type="number" placeholder={params.row.discountAmount} name='discount' max='99' min='1' maxlength='2' pattern='[0,9]*' /> 
          <ConfirmationModal 
            open={openDisc} 
            close={handleCloseDisc} 
            children={<ApplyButton style={{marginBottom: '3px'}} onClick={handleOpenDisc}>Aplicar</ApplyButton>}
            title='Aplicar Descuento'
            text='Desea aplicar descuento a este producto?'
            fn={(e) => handleDiscountAmount(e, params.row._id, document.getElementById("discount").value)}
          />
          </>
        }
        
      </>   
    },

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
          <NewButton to='/products/new'>+ Nuevo Producto</NewButton>
        </Top>
        <DataGrid
          rows={products}
          columns={productsColumns}
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

export default ProductList