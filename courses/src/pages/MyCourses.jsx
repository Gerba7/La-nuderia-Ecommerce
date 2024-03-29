import styled, { keyframes } from 'styled-components';
import { mobile, tablet } from '../responsive';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import privateRequest from '../api/axios';
import { useDispatch } from 'react-redux';
import { resetLoading, setLoading } from '../redux/loadingSlice';
import Navbar from '../components/Navbar';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';

const Container = styled.div`
  width: 100vw;
  ${mobile({display: 'flex', width: '100%', height: '100%'})}
  ${tablet({display: 'flex', width: '100%', height: '100%'})}
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%; 
  width: 100%;
  margin: 120px 0px;
  ${mobile({width: '100vw', height: '100%'})}
`



const Resize = keyframes`
  0% {scale: 1.2; opacity: 0}
  100% {scale: 1; opacity: 1}
`


const Title = styled.h1`
  color: '#000';
  font-size: 50px;
  margin: 40px 0px;
`

const Grid = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: 20px;
  grid-auto-rows: 650px;
  grid-template-columns: 400px 400px 400px;
  grid-column-start: 2;
  ${tablet({display: 'flex', flexDirection: 'column', gap: '5vh', alignItems: 'center', height: '100%', width: '100%', gridAutoFlow: 'none', gridTemplateColums: '0px', gridAutoRows: '0px'})}
  ${mobile({display: 'flex', flexDirection: 'column', gap: '5vh', alignItems: 'center', height: '100%', width: '100%', gridAutoFlow: 'none', gridTemplateColums: '0px', gridAutoRows: '0px'})}
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
  ${tablet({padding: '2vh 2vw'})}
  ${mobile({padding: '2vh 5vw'})}
`

const CourseTitle = styled.h1`
  font-size: 22px;
`

const Description = styled.h3`
  font-weight: 300;
  display: flex;
  height: 80px;
  align-items: center;
  overflow: hidden;
  align-self: flex-end;
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
  margin-top: 20px;
  ${mobile({marginBottom: '10px', marinTop: '0px'})}
  ${tablet({marginBottom: '10px', marinTop: '0px'})}
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

const Jumbotron = styled.div`
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5vh;
`

const SubTitle = styled.h2`
  text-align: center;
  font-weight: 500;
  font-size: 18px;
`

const CartButton = styled.button`
  padding: 2vh 2vw;
  border: none;
  border-radius: 5px;
  background-color: #216E8C;
  color: #fff;

  &:hover {
    background-color: #fff;
    border: 1px solid #216E8C;
    color: #216E8C;
  }
`




const MyCourses = () => {

  const [myCourses, setMyCourses] = useState();

  const dispatch = useDispatch();


  const parseCookie = str =>
    str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
                acc[decodeURIComponent(v[0]?.trim())] = decodeURIComponent(v[1]?.trim());
                return acc;
            }, {}
    );

  const isAdmin = parseCookie(document.cookie).admin
 
  
  useEffect(() => {
    const getMyCourse = async () => {
        dispatch(setLoading())
        try {
            if(isAdmin) {
              const res = await privateRequest.get("/courses/courses-admin");
              dispatch(resetLoading())
              return setMyCourses(res.data);
            }
            const res = await privateRequest.get("/users/my-courses");
            setMyCourses(res.data.purchasedCourses);
            dispatch(resetLoading())
        } catch (err) {
            console.log(err)
            dispatch(resetLoading)
        }
    }
    getMyCourse();
  }, [])
  
  
  
  return (
    <Container>
      <Navbar />
      <Wrapper>
          <Title>Tus cursos</Title>
          {myCourses?.some((purchase) => purchase?.course !== null) ? 
          <Grid>
            {myCourses?.map((course) => {
              if(course !== null) {
              return(
                <CourseCard key={course?._id}>
                  <Thumbnail src={course?.thumbnail} alt={course?.title} />
                  <Info>
                    <CourseTitle>{course?.title}</CourseTitle>
                    <Description><VideocamOutlinedIcon sx={{marginRight: '5px', fontSize: '20px', marginBottom: '4px', color: 'violet'}} /> {course?.urls.length} Videos</Description>
                    <Duration><AccessTimeIcon sx={{marginRight: '5px', fontSize: '20px', marginBottom: '4px', color: 'violet'}} />{course?.duration} min.</Duration>
                  </Info>
                  <ButtonContainer>
                    <Button to={`/mis-cursos/${course?._id}`}>EMPEZÁ A APRENDER</Button>
                  </ButtonContainer>
                </CourseCard>
              )
            }})}
          </Grid>
          :
            <Jumbotron>
              <SubTitle>Aún no tenes cursos, siguiendo el link podés seleccionar el que mas te guste!</SubTitle>
              <CartButton>COMPRAR CURSOS</CartButton>
            </Jumbotron>
          }
      </Wrapper>
    </Container>
    
  )
}

export default MyCourses;
