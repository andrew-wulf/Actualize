import { PostsIndex } from "./PostsIndex";
import { PostsNew } from "./PostsNew";

export function Content() {

  let title = "All posts";
  let posts = [
    {
      id: 1,
      title: "Top 10 Programming languages to learn",
      body: 'The completely unbiased truth!',
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/640px-Python-logo-notext.svg.png",
    },
    {
      id: 2,
      title: "Best Dog Breeds",
      body: "There are right and wrong answers!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiEkqUCXEbnnT0SseSO2KfYlKzsL-TvxorVQ&s",
    },
    {
      id: 3,
      title: "How to rob a bank and get away with it",
      body: "(don't tell anyone!)",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSej51OVnb9OEzM564tjq7VrVkNxrKm8fzxxg&s",
    },
  ];

  return (
    <div>
      <PostsNew />
      <PostsIndex title={title} posts={posts} />
    </div>
  );

}
