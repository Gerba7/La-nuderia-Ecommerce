import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Failure from "./pages/Failure";
import Pending from "./pages/Pending";
import Loading from "./components/Loading";
import RequireAuth from "./components/RequireAuth";
import AlertPopup from "./components/Alert";
import ForgotPassword from "./pages/ForgotPassword";
import styled from "styled-components";
import TopBar from './components/TopBar';
import Alert from './components/Alert';
import Navbar from "./components/Navbar";
import WhoAmI from "./pages/WhoAmI";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import Help from "./pages/Help";
import MyCourses from "./pages/MyCourses";
import CourseCart from "./pages/CourseCart";
import ItemCart from "./pages/CourseCart";
import Course from "./pages/Course";
import LoginForPurchase from "./pages/LoginForPurchase ";
import RequireAuth2 from "./components/RequireAuth2";
import { mobile, tablet } from "./responsive";


const Container = styled.div`
  display: flex;
  position: relative;
`



function App() {

  const loading = useSelector((state) => state.loading.isLoading)

  return (
    <>
      {loading && <Loading />}
      <Alert />
      <ScrollToTop />
      <Container>
        <Routes>

          <Route path='/' >
            <Route index path='/' element={<Home />} />
          </Route>
          <Route path='/soyCami' >
            <Route index path='/soyCami' element={<WhoAmI />} />
          </Route>
          <Route path='/curso/:id' >
            <Route index path='/curso/:id' element={<CourseCart />} />
          </Route>
          <Route path='/cart' >
            <Route index path='/cart' element={<Cart />} />
          </Route>
          <Route path='/help' >
            <Route index path='/help' element={<Help />} />
          </Route>
          <Route path='/success' >
            <Route path='/success' element={<Success />} />
          </Route>
          <Route path='/failure' >
            <Route path='/failure' element={<Failure />} />
          </Route>
          <Route path='/pending' >
            <Route path='/pending' element={<Pending />} />
          </Route>

          <Route element={<RequireAuth />} >

            <Route path='/mis-cursos' >
              <Route index path='/mis-cursos' element={<MyCourses />} />
            </Route>
            <Route path='/mis-cursos/:course' >
              <Route index path='/mis-cursos/:course' element={<Course />} />
            </Route>
            

          </Route>

          <Route element={<RequireAuth2 />} >

            
            <Route path='/cart/checkout' >
              <Route index path='/cart/checkout' element={<Checkout />} />
            </Route>
            

          </Route>

        
          <Route path='/login' >
            <Route index path='/login' element={<Login />} />
          </Route>

          <Route path='/purchaselogin' >
            <Route index path='/purchaselogin' element={<LoginForPurchase />} />
          </Route>
          
        </Routes>
      </Container>
      <Footer />
      <Banner />
    </>
  );
}

export default App;
