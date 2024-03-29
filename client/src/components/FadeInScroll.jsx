import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';


const FadeInSection = styled.div`
    display: hidden;
    margin: 0;
    padding: 0;
    opacity: ${props => props.isVisible ? 1 : 0};
    transform: ${props => props.isVisible ? 'none' : 'translateY(20vh)'};
    visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
    transition: opacity 0.6s ease-out, transform 1.2s ease-out;
    will-change: opacity, visibility;
`


const FadeInScroll = (props) => {
  
    const [isVisible, setVisible] = useState(false);

    const domRef =  useRef();
    
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setVisible(entry.isIntersecting);
            }
        });
    });

    let ref = domRef.current

    observer.observe(ref);

    return () => observer.unobserve(ref);

    }, []);


  return (

    <FadeInSection ref={domRef} isVisible={isVisible}>
        {props.children}
    </FadeInSection>

  );

}

export default FadeInScroll