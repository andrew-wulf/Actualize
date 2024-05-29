import { PostsIndex } from "./PostsIndex";
import { PostsNew } from "./PostsNew";
import { useState } from 'react'
import axios from "axios";
import { useEffect } from 'react';

export function Content() {

  let title = "All posts";
  const [posts, setPosts] = useState([]); 


  const handleIndexPosts = () => {
    // let data = [{
    //   id: 1,
    //   title: "Top 10 Programming languages to learn",
    //   body: 'The completely unbiased truth!',
    //   image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/640px-Python-logo-notext.svg.png",
    // },
    // {
    //   id: 2,
    //   title: "Best Dog Breeds",
    //   body: "There are right and wrong answers!",
    //   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiEkqUCXEbnnT0SseSO2KfYlKzsL-TvxorVQ&s",
    // },
    // {
    //   id: 3,
    //   title: "How to rob a bank and get away with it",
    //   body: "(don't tell anyone!)",
    //   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSej51OVnb9OEzM564tjq7VrVkNxrKm8fzxxg&s",
    // }];

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
    

  return (
    <div>
      <PostsNew />
      <button onClick={handleIndexPosts}>Get All Posts</button>
      <PostsIndex title={title} posts={posts} />
    </div>
  );
}

