import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Classes from "./pages/Classes";
import Test from "./pages/Test";
import { useSelector } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Failure from "./pages/Failure";
import Pending from "./pages/Pending";
import Loading from "./components/Loading";
import AlertPopup from "./components/Alert";
import Help from "./pages/Help";
import ForgotPassword from "./pages/ForgotPassword";
import Tutorials from "./pages/Tutorials";
import WhoAmI from "./pages/WhoAmI";

function App() {
  
  

  const loading = useSelector((state) => state.loading.isLoading)

  return (
    <BrowserRouter>
      {loading && <Loading />}
      <AlertPopup />
      <ScrollToTop /> 
      {/*<HomeNavbar user={user} />*/}
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/whoami' element={<WhoAmI />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/products/:category' element={<ProductList />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/test' element={<Test />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/cart/checkout' element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/success' element={<Success />} />
        <Route path='/failure' element={<Failure />} />
        <Route path='/pending' element={<Pending />} />
        <Route path='/help' element={<Help />} />
        <Route path='/reset-password/:token' element={<ForgotPassword />} />
        <Route path='/classes' element={<Classes />} />
        <Route path='/tutorials' element={<Tutorials />} />
        
        {/*<Route element={<RequireAuth />}>
          <Route path='/classes' element={<Classes />} />
        </Route>*/}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
