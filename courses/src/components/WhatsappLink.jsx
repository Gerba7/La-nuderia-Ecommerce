import styled from 'styled-components';


export const WhatsappLink = styled.a`
    display: inline-block;
    padding: 0;
    background: none;
    font-size: 20px;
    cursor: pointer;
    position: fixed;
    bottom: 10px;
    right: 10px;
    opacity: 0.6;
    z-index: 1100;
    width: 60px;
    height: 60px;
    opacity: 30%;

    &:hover {
        transition: all 0.2s ease-in-out;
        opacity: 100%;
    }
`; 


/*
.wspim {

    display: inline-block;
    padding: 0;
    background: none;
    font-size: 20px;
    cursor: pointer;
    position: fixed;
    bottom: 10px;
    left: 10px;
    opacity: 0.5;
    z-index: 1100;
    width: 60px;
    height: 60px;
  }
  
  .wspim:hover {
      animation-name: light;
      animation-duration: 500ms;
      animation-fill-mode: forwards;
  }
  
  @keyframes light {
      100% {
      opacity: 1;
      }
      
  }*/