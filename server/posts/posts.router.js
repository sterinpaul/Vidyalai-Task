const express = require('express');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const params = req.query;
    const posts = await fetchPosts(params);

    const postsWithImages = await Promise.all(posts.map(async (post) => {
      try {
        const [user, photosResponse] = await Promise.all([
          fetchUserById(post.userId),
          axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`)
        ]);
        
        const images = photosResponse.data.map(singleImg => ({ url: singleImg.url }));
        return {
          ...post,
          user: {
            name: user.name,
            email: user.email
          },
          images
        };
      } catch (error) {
        console.error(`Error processing post ${post.id}: ${error.message}`);
        return null;
      }
    }));

    // Filter the posts which has error
    const validPostsWithImages = postsWithImages.filter(post => post !== null);
    res.json(validPostsWithImages);

  } catch (error) {

    console.error(`Error fetching posts: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
