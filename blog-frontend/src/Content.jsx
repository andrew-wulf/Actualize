import { PostsIndex } from "./PostsIndex";
import { PostsNew } from "./PostsNew";
import { useState } from 'react'
import axios from "axios";
import { useEffect } from 'react';

import { Modal } from "./Modal";
import { PostsShow } from "./PostsShow";

import { Routes, Route } from "react-router-dom";
import { Signup } from "./Signup";


export function Content() {

  const [posts, setPosts] = useState([]); 
  const [isPostsShowVisible, setIsPostsShowVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [id, setID] = useState(1);
  const [index, setIndex] = useState(0);


  const handleIndexPosts = () => {
    // Make a request for a user with a given ID
    axios.get(`http://localhost:3000/posts.json`)
    .then(response => {
      // handle success
      console.log(response);
      setPosts(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
    });
  }



  const handleCurrentPost = () => {
   // Make a request for a user with a given ID
    axios.get(`http://localhost:3000/posts/${id}.json`)
    .then(response => {
      // handle success
      console.log(response);
      setCurrentPost(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
    });
  }

  
  useEffect(handleIndexPosts, []);
  useEffect(() => {
    handleCurrentPost();
  }, []);

  useEffect(handleCurrentPost, [id]);
  
  const handleShowPost = (content) => {
    console.log(content)
    setIsPostsShowVisible(true);

    setCurrentPost(content)
    console.log(currentPost)
  };

  const handleClose = () => {
    setIsPostsShowVisible(false);
  };


  const nextPost = () => {
    let limit = posts.length - 1;
    if (index < limit) {
      setIndex(index + 1);
    }
    else {
      setIndex(0);
    }
    setID(posts[index].id);
    //handleCurrentPost();
    console.log('post: ' + currentPost.id)
  }

  const prevPost = () => {
    let limit = 1;
    if (index > limit) {
      setIndex(index - 1);
    }
    else {
      setIndex(posts.length - 1);
    }
    setID(posts[index].id);
    //handleCurrentPost();
  }


  return (
    <div>

      <Routes>
      <Route path="/" element={
      <div>
        <h1>This is the Home Page!</h1>
        <br/>
        <h2>Nothing to see here...</h2>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
      } />
      </Routes>
      
      <Routes>
      <Route path="/signup" element={<Signup />} />
      </Routes>

      <Routes>
      <Route path="/newpost" element={<PostsNew refresh={handleIndexPosts}/>} />
      </Routes>
      
      
      
      <Routes>
      <Route path="/posts" element={
      <div>
        <button onClick={() => {handleShowPost(currentPost)}}>View Post</button>

        <Modal show={isPostsShowVisible} onClose={handleClose}>
          <PostsShow post={currentPost} nextPost={nextPost} prevPost={prevPost} refresh={handleCurrentPost}/>
        </Modal>
    
        <button onClick={handleIndexPosts}>Get All Posts</button>

        <PostsIndex title={"All Posts"} posts={posts} showMore={handleShowPost}/>
      </div>} />

      
      </Routes>
      
    </div>
  );
}

