import axios from 'axios';
import React, { useEffect, useState,useContext } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import DeviceWidthContext from '../context/deviceWidthontext';


const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page,setPage] = useState(0)
  const [noMoreContent,setNoMoreContent] = useState(false)
  const isSmallerDevice = useContext(DeviceWidthContext)

  
  const fetchPost = async () => {
    setIsLoading(true);
    let limit = isSmallerDevice ? 5 : 10 ;
    const { data: posts } = await axios.get('/api/v1/posts', {
      params: { start: isSmallerDevice ? page*5 : page*10, limit:limit },
    });
    setIsLoading(false);
    setPosts(previous=>[...previous,...posts]);
    if(posts.length<limit){
      setNoMoreContent(true)
    }else{
      setPage(page+1)
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);

  const handleClick = async() => {
    setIsLoading(true);
    await fetchPost();
    
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map((post,index) => (
          <Post key={index} post={post} />
        ))}
      </PostListContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {!noMoreContent && <LoadMoreButton onClick={handleClick} disabled={isLoading}>
          {!isLoading ? 'Load More' : 'Loading...'}
        </LoadMoreButton>}
      </div>
    </Container>
  );
}
