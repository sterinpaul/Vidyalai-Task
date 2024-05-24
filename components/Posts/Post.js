/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from '@emotion/styled';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden'
}));

const NameField = styled.div(()=>({
  display:"flex",
  gap:'10px',
  padding:'10px'
}))

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
  scrollSnapType: 'x mandatory'
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto'
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
  scrollSnapAlign: 'start'
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  top: '50%',
  transform: 'translate(0, -55%)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const Post = ({ post }) => {
  const carouselRef = useRef(null);

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };
  const RoundedTitle = styled.div(()=>({
    width:'3rem',
    height:'3rem',
    display:'flex',
    alignItems:'center',
    borderRadius:'50%',
    backgroundColor:'lightslategray',
    color:'white',
    fontWeight:'bold',
    justifyContent:'center'
  }))
  const userName = post.user.name.split(" ")
  const initials = userName.slice(0, 2).map(name => name[0]).join("")
  return (
    <PostContainer>
      <NameField>
        <RoundedTitle>{initials}</RoundedTitle>
        <div>
          <h3>{post.user.name}</h3>
          <p>{post.user.email}</p>
        </div>
      </NameField>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => {

            return (
              <CarouselItem key={index}>
                <Image src={image.url} alt={post.title} />
              </CarouselItem>
            )
          })}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.any,
    images: PropTypes.array,
    title: PropTypes.string,
    body: PropTypes.string
  }),
};

export default Post;
