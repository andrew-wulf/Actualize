import { PostsIndex } from "./PostsIndex";
import { PostsNew } from "./PostsNew";
import { useState } from 'react'
import axios from "axios";
import { useEffect } from 'react';

import { Modal } from "./Modal";
import { PostsShow } from "./PostsShow";

export function Content() {

  const [posts, setPosts] = useState([]); 
  const [isPostsShowVisible, setIsPostsShowVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  


  const handleIndexPosts = () => {
   
    // Make a request for a user with a given ID
    axios.get('http://localhost:3000/posts.json')
    .then(response => {
      // handle success
      console.log(response);
      setPosts(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
    });
  }

  useEffect(handleIndexPosts, []);
  
  const handleShowPost = (content) => {
    console.log(content)
    setIsPostsShowVisible(true);

    setCurrentPost(content)
  };

  const handleClose = () => {
    setIsPostsShowVisible(false);
  };

  return (
    <div>
      <PostsNew />
      <button onClick={handleShowPost}>Show Modal</button>
      <Modal show={isPostsShowVisible} onClose={handleClose}>

        <PostsShow post={currentPost}/>
        
      </Modal>

      <button onClick={handleIndexPosts}>Get All Posts</button>
      <PostsIndex title={"All Posts"} posts={posts} showMore={handleShowPost}/>
    </div>
  );
}

