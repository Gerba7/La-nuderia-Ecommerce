import styled, { keyframes } from 'styled-components';
import { mobile, tablet } from '../responsive';
import CoursesImg from '../images/la_nuderia_cursos2.jpg';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { publicRequest } from '../api/axios';
import Navbar from '../components/Navbar';
import { resetLoading } from '../redux/loadingSlice'
import { useDispatch } from 'react-redux';

const Container = styled.div`
  width: 100vw ;
  ${mobile({display: 'flex', width: '80vw', height: '100%'})}
  ${tablet({display: 'flex', width: '80vw', height: '100%'})}
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%; 
  width: 100vw ;
  ${mobile({width: '80vw', height: '100%'})}
`

const Top = styled.div`
  display: flex;
  height: 70vh;
  width: 100vw;
  position: relative;
  margin-bottom: 60px;
`

const Resize = keyframes`
  0% {scale: 1.2; opacity: 0}
  100% {scale: 1; opacity: 1}
`

const Background = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden; 
    background: #232a34;
    animation-name: ${Resize};
    animation-duration: 3s;
    transition: ease 1000ms;
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.3;
  -o-object-fit: cover;
  object-fit: cover;
  background: #232a34;
`


const Jumbotron = styled.h1`
  color: #fff;
  font-size: 72px;
  position: absolute;
  bottom: 40px;
  left: 80px;
  z-index: 3;
    animation-name: ${Resize};
    animation-duration: 3s;
    transition: ease 1000ms;
`

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  margin-bottom: 60px;
`

const Title = styled.h1`
  color: #000;
  font-size: 50px;
  margin: 40px 0px;
`

const Grid = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: 20px;
  grid-auto-rows: 650px;
  grid-template-columns: 400px 400px;
  ${tablet({display: 'flex', flexDirection: 'column', gap: '5vh', alignItems: 'center', height: '100%', width: '90%', gridAutoFlow: 'none', gridTemplateColums: '0px', gridAutoRows: '0px'})}
  ${mobile({display: 'flex', flexDirection: 'column', gap: '5vh', alignItems: 'center', height: '100%', width: '90%', gridAutoFlow: 'none', gridTemplateColums: '0px', gridAutoRows: '0px'})}
`

const CourseCard = styled.div`
  box-shadow: rgba(19, 15, 235, 0.2) 1px 2px 20px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  ${tablet({width: '380px', height: '600px'})}
  ${mobile({width: '380px', height: '600px'})}
`

const Thumbnail = styled.img`
  width: 100%;
  height: 400px;
  border-radius: 3px 3px 0px 0px;
  object-fit: cover;
`

const Info = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  padding: 2vh 2vw;
  flex: 5;
  ${tablet({padding: '1vh 2vw'})}
  ${mobile({padding: '1vh 5vw'})}
`

const CourseTitle = styled.h1`
  font-size: 22px;
`

const Description = styled.h3`
  font-weight: 300;
  font-size: 16px;
  height: 60px;
  overflow: hidden;
  ${tablet({height: '45px'})}
`

const SeeMoreButton = styled(Link)`
  background: none;
  border: none;
  align-self: flex-end;
  text-decoration: underline;
  cursor: pointer;
  color: #000;
`

const Duration = styled.h3`
  display: flex;
  align-items: center;
  font-weight: 300;
  align-self: flex-end;
  ${tablet({fontSize: '14px'})}
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  margin-bottom: 10px;
`

const Button = styled(Link)`
  background-color: #216E8C;
  border: none;
  height: 15px;
  width: 50%;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
  text-align: center;
  border-radius: 3px;
`




const Home = () => {

  const [courses, setCourses] = useState();

  const dispatch = useDispatch()
  dispatch(resetLoading())

  useEffect(() => {
      
    const getCourses = async () => {
      try {
        const res = await publicRequest.get('/courses')
        setCourses(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getCourses()

  }, [])



  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Top>
          <Background>
            <Img src={CoursesImg} alt='courses' />
          </Background>
          <Jumbotron>CURSOS</Jumbotron>
        </Top>
        <Bottom>
          <Title>Aprende ahora!</Title>
          <Grid>
            {courses?.map((course) => {
              return(
                <CourseCard key={course?._id}>
                  <Thumbnail src={course?.thumbnail} alt={course?.title} />
                  <Info>
                    <CourseTitle>{course?.title}</CourseTitle>
                    <Description>{course?.description}</Description>
                    <SeeMoreButton to={`/curso/${course?._id}`}>Ver mas...</SeeMoreButton>
                    <Duration><AccessTimeIcon sx={{marginRight: '5px', fontSize: '14px', marginBottom: '4px', color: 'violet'}} />{course?.duration} min.</Duration>
                  </Info>
                  <ButtonContainer>
                    <Button to={`/curso/${course?._id}`}>EMPEZA A APRENDER</Button>
                  </ButtonContainer>
                </CourseCard>
              )
            })}
          </Grid>
        </Bottom>
      </Wrapper>
    </Container>
    
  )
}

export default Home;
