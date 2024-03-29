import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import Home from './pages/Home';
import styled from 'styled-components';
import ProductList from './pages/ProductList';
import SingleProduct from './pages/SingleProduct';
import New from './pages/New';
import OrderList from './pages/OrderList';
import UserList from './pages/UsersList';
import NewsLetter from './pages/NewsLetter';
import Loading from './components/Loading';
import Alert from './components/Alert';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import RequireAuth from './components/RequireAuth';
import { useState } from 'react';
import Configuration from './pages/Configuration';
import { mobile } from './responsive';
import SendOrderModal from './components/SendOrderModal';
import Courses from './pages/Courses';



const Container = styled.div`
  display: flex;
  position: relative;
`


function App() {

  
  const loading = useSelector((state) => state.loading.isLoading)
  
  const modal = useSelector((state) => state.modal.isOpen)

  const [displayMenu, setDisplayMenu] = useState(true);

  return (
      <>
      {loading && <Loading />}
      <Alert />
      <TopBar displayMenu={displayMenu} setDisplayMenu={setDisplayMenu} />
      <Container>
        <SideBar displayMenu={displayMenu} setDisplayMenu={setDisplayMenu}/>
        <Routes>

          <Route element={<RequireAuth />} >

              <Route path='/' element={<Home />} />
              <Route path='/products' >
                <Route index path='/products' element={<ProductList />} />
                <Route path=":productId" element={<SingleProduct />} />
                <Route path="new" element={<New />} />
              </Route>
              <Route path='/orders' >
                <Route index path='/orders' element={<OrderList />} />
              </Route>
              <Route path='/users' >    
                <Route index path='/users' element={<UserList />} />
              </Route>
              <Route path='/courses' >
                <Route index path='/courses' element={<Courses />} />
              </Route>
              <Route path='/newsletter' >
                <Route index path='/newsletter' element={<NewsLetter />} />
              </Route>
              <Route path='/preferences' >
                <Route index path='/preferences' element={<Configuration />} />
              </Route>

          </Route>

          <Route path='/login' >
            <Route index path='/login' element={<Login />} />
          </Route>
          
        </Routes>
      </Container>
      </>
  );
}

export default App;
