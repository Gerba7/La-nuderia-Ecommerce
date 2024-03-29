import React from 'react'
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import HomeNavbar from '../components/HomeNavbar';
import Newsletter from '../components/Newsletter';
import styled from 'styled-components';
import FadeInScroll from "../components/FadeInScroll";
import { WhatsappLink } from '../components/WhatsappLink';
import WLogo from '../images/WAppLogo.png';
import Row from '../components/Row';
import Slider from '../components/Slider';
import LastestProducts from '../components/LastestProducts';
import Information from '../components/Information';
import Banner from '../components/Banner';
import { useDispatch } from 'react-redux';
import { resetLoading, setLoading } from '../redux/loadingSlice';
import { useEffect } from 'react';
import ArtesanalModal from '../components/ArtesanalModal';



const Title = styled.h1`
    flex: 3;
    margin-top: 80px;
    margin-bottom: 30px;
    text-align: center;
    font-size: 40px;
`


const Home = () => {

  const dispatch = useDispatch();

  useEffect(()=>{dispatch(resetLoading())},[])

  
  return (
    <div>
        {/*<Announcement />*/}
        <ArtesanalModal />
        <HomeNavbar />
        <Slider />
        {/*<CarouselComponent />*/}
        <FadeInScroll>
          <Row />
        </FadeInScroll>
        <FadeInScroll>
          <Categories />
        </FadeInScroll>
        <FadeInScroll>
          <Title>¡Últimos lanzamientos!</Title>
          <LastestProducts />
          <Information />
        </FadeInScroll>
        <FadeInScroll>
          <Newsletter />
        </FadeInScroll>
        <Footer />
        <Banner />
        <WhatsappLink href="https://api.whatsapp.com/send?phone=5491161775193">
          <img src={WLogo} alt="Whatsapp" style={{height: '3rem', width: '3rem'}}/>
        </WhatsappLink>
    </div>
  )
}

export default Home;