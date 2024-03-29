import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import styled from 'styled-components';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getCategories, getProducts } from '../redux/httpRequests';
import ConfirmationModal from './ConfirmationModal';
import { useEffect, useState } from 'react';
import { resetLoading, setLoading } from '../redux/loadingSlice';


const DeleteButton = styled.div`
  padding: 2px 5px;
  border-radius: 5px;
  color: crimson;
  cursor: pointer;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;

  &:hover {
    background-color: rgba(220, 20, 60, 0.6);
    color: #fff;
  }
`


export default function CategoriesList({cats, setError}) {


    const dispatch = useDispatch();

    const products = useSelector((state) => state.product.products);
  
    useEffect(() => {
      try {
        dispatch(getProducts())
      } catch (err) {
        console.log(err)
      }
    }, [dispatch])

    useEffect(() => {
      dispatch(getCategories());
    }, [dispatch, cats])

    
    const [open, setOpen] = useState(false);

        
    const handleOpen = () => {
      setOpen(true);
    }

    const handleClose = () => {
      setOpen(false);
    }
    

    const handleDelete = (id, name) => {

      setError(false)

      dispatch(setLoading())

      let existProduct = products.some(prod => prod.categories === name)

      
      if(!existProduct) { 

        try {
            dispatch(deleteCategory(id))
            dispatch(resetLoading())
            handleClose()
        } catch (err) {
            console.log(err)
            dispatch(resetLoading())
            handleClose()
        }
      
      } else {
        handleClose()
        dispatch(resetLoading())
        setError(true)
      }
    }


  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 400,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 150,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
            {cats?.map((cat) => (
              <ListItem key={cat._id}>
                <ListItemText primary={cat.name} />
                <DeleteButton onClick={() => handleDelete(cat._id, cat.name)}><HighlightOffRoundedIcon /></DeleteButton>
                {/*<ConfirmationModal
                    open={open} 
                    close={handleClose} 
                    children={<DeleteButton onClick={handleOpen}><HighlightOffRoundedIcon /></DeleteButton>}
                    title='Eliminar'
                    text='Estas seguro que deseas eliminar la categoria?'
                    fn={() => handleDelete(cat._id, cat.name)}
            />*/}
              </ListItem>
            ))}
            
    </List>
  );
}