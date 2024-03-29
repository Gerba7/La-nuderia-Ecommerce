import styled from 'styled-components';
import { mobile, tablet2 } from '../responsive';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ReactPlayer from 'react-player';
import { useEffect } from 'react';
import privateRequest from '../api/axios';
import CommentForm from '../components/CommentForm';
import Comment from '../components/Comment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useDispatch } from 'react-redux';
import { resetLoading, setLoading } from '../redux/loadingSlice';
import Navbar from '../components/Navbar';

const Container = styled.div`
  width: 100vw;
  overflow-x: hidden;
  ${mobile({width: '100vw', height: '100%', display: 'flex'})};

`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%; 
  width: 100vw;
  ${mobile({width: '100%', height: '100%', position: 'relative'})}
`

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  ${mobile({ position: 'absolute', width: '100vw', top: '32vh', height: '100%', zIndex: '10'})};
  ${props => !props.displaymenu && mobile `
    display: none;
  `};

`

const Right = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  ${mobile({width: '100%'})}
`

const TopLeft = styled.div`
display: flex;
height: 6.5vh;
width: 100%;
background-color: #f0f0f0;
margin-top: 80px;
border: 0.2px solid lightgray;
border-right: none;
border-top: none;
border-left: none;
${mobile({display: 'none'})}
${tablet2({height: '10vh'})}

`

const TopRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6vh;
  width: 100%;
  background-color: #32dd88;
  margin-top: 80px;
  border: 0.2px solid lightgray;
  border-top: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
  ${mobile({height: '10vh'})}
  ${tablet2({height: '8.8vh'})}

`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border-right: 1px solid lightgray;
`

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Lesson = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 10vh;
  width: 100%;
  border-bottom: 1px solid lightgray;
  background-color: ${props => props.active ? '#216E8C' : '#f0f0f0'};
  color: ${props => props.active ? '#fff' : '#000'};
  cursor: pointer;

  &:hover {
    background-color: #51b9e2;
  }

  
${mobile({padding: '0vh 2vw'})}
`

const Icon = styled.div`
  margin-left: 2vw;
`

const Title = styled.div`
  margin-left: 2vw;
`

const VideoTitle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  padding: 40px;
  gap: 20px;
${mobile({marginBottom: '10vh'})}
`

const Video = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60vh;
  margin-bottom: 10vh;
  margin-top: 5vh;
  ${mobile({height: '20vh'})}
`

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 5vh 0vw;
`

const CommentsTitle = styled.h3`
  width: 50%;
  margin: 2vh 0vw;
  text-align: center;
`


const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: 2vh 0vw;
  gap: 1vh;
  ${mobile({width: '100%'})}
`

const LoadMoreButton = styled.button`
  background-color: transparent;
  border: none;
  text-decoration: underline;
  color: #216E8C;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    color: darkgray;
  }
`

const VideoSize = styled.div`
  width: 960px;
  height: 540px;
  
  ${tablet2({width: '640px', height: '360px'})}
`

const MoreVideosIcon = styled.div`
  display: none;
  ${mobile({display: 'flex', marginLeft: '150px', zIndex: 10})}
`







const Course = () => {
  
  
  const [myCourse, setMyCourse] = useState();
  const [activeLesson, setActiveLesson] = useState(undefined);
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [displaymenu, setDisplaymenu] = useState(false);
  
  const commentsPerPage = 3;

  const location = useLocation();

  const dispatch = useDispatch();

  const id = location?.pathname?.split("/")[2];

  
  useEffect(() => {
    const getMyCourse = async () => {
      dispatch(setLoading())
        try {
            const res = await privateRequest.get("/users/my-courses");
            const selectedCourse = res.data.purchasedCourses.find((course) => course?._id === id)
            setMyCourse(selectedCourse);
            setActiveLesson(selectedCourse?.urls[0]);
            dispatch(resetLoading())
        } catch (err) {
            console.log(err)
            dispatch(resetLoading())
        }
    }
    getMyCourse();
  }, []);


  // useEffect(() => {
  //   if(activeLesson) {
  //   const getActiveVideo = async () => {
  //     try {
  //       const res = await privateRequest.get(`/courses/video/${activeLesson}`);
  //       setActiveUrl(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   getActiveVideo();
  // }
  // }, [activeLesson]);


  const getComments = async () => {
    if(myCourse?._id) {
      try {
        const courseId = myCourse?._id;
        const res = await privateRequest.get(`/comments/${courseId}`, {
          params: {page: page}
        });
        if(comments.length === 0) {
          setComments(res.data);
        } else {
          const newComments = res.data.filter(comment => {
            return !comments.some(existingComment => existingComment._id === comment._id);
          });
          setComments(prevState => [ ...prevState, ...newComments ]);
        }
        if(res.data.length === 0) {
          setHasMore(false)
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
    
  };


  useEffect(() => {
    getComments();
  }, [myCourse, page]);


  const handleLoadMore = () => {
    if(hasMore) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  


  const handleActiveVideo = (e, url) => {

    e.preventDefault();
    setActiveLesson(url);
    setDisplaymenu(false)

  }


  const handleNextVideo = (e, index) => {
    e.preventDefault();
    if(index < myCourse.urls.length - 1) {
      setActiveLesson(myCourse.urls[index + 1])
    } else {
      setActiveLesson(myCourse.urls[0])
    }
  } 

  const handleDisplayMenu = (e) => {
    e. preventDefault();
    setDisplaymenu(!displaymenu)

  }
  
  const updateComments = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  }

  
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Left displaymenu={displaymenu}>
          <TopLeft>
            
          </TopLeft>
          <Content>
            {myCourse?.urls.map((url, index) => {
              return (
                <Lesson active={activeLesson === url ? true : false} onClick={(e) => handleActiveVideo(e, url)} >
                  <Icon><OndemandVideoIcon /></Icon>
                  <Title>Video {index + 1}</Title>    {/*{url?.split(['.'])[0]}*/}
                </Lesson>
              )
            })}
          </Content>
        </Left>
        <Right>
          <TopRight onClick={(e) => handleNextVideo(e, myCourse.urls.indexOf(activeLesson))}>
            Continuar<ArrowForwardIosIcon sx={{marginLeft: '10px', fontSize: '12px'}}/>
          </TopRight>
          <VideoContainer>
            <VideoTitle>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Icon><OndemandVideoIcon /></Icon>
                <Title>Video {myCourse?.urls.indexOf(activeLesson) + 1}</Title>  {/* active. title   -  Video {activeLesson?.split(['.'])[0]} */}
              </div>
              <MoreVideosIcon onClick={(e) => handleDisplayMenu(e)}>{displaymenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}</MoreVideosIcon>
            </VideoTitle>
            <Video>
              <VideoSize>
                {/* <ReactPlayer url={activeLesson} controls={true} width='100%' height='100%' playIcon={<PlayArrowIcon />} /> */}
                <iframe src={activeLesson} width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" title="Untitled"></iframe>  
              </VideoSize>
            </Video>
            <CommentSection>
              <CommentForm courseId={myCourse?._id} refreshComments={updateComments}/>
              <CommentsTitle>Consultas</CommentsTitle>
              <CommentsContainer>
                {comments.map(comment => (
                    <Comment key={comment?._id} comment={comment} refreshComments={updateComments} />
                ))}
                {hasMore && (
                    <LoadMoreButton onClick={handleLoadMore}>Cargar mas consultas...</LoadMoreButton>
                )}
              </CommentsContainer>
            </CommentSection>
          </VideoContainer>
        </Right> 
      </Wrapper>
    </Container>
    
  )
}

export default Course;
