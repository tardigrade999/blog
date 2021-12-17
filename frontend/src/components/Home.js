import React from "react";

import Header from "./Header";
import PostPreview from "./PostPreview";
import { fetchPosts } from "../queries/fetchPosts";

import { Main } from "grommet";
import { useQuery } from "react-query";


const Home = () => {
  // TODO: handle loading state
  // TODO: handle error state
  const { data } = useQuery("posts", fetchPosts);

  const posts = data || [];

  return (
    <div id="home">
      <Header title="Theory In Practice" />
      <Main pad="large">
        {posts.map((post, i) => (
          <PostPreview key={post.id} post={post} i={i}/>
        ))}
      </Main>
    </div>
  );
};

export default Home;
