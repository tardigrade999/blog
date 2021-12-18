import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { Main, Heading, Paragraph, Text } from "grommet";

import Header from "./Header";
import PostNav from "./PostNav";

import { fetchPostBySlug, fetchSlugOfNextPost, fetchSlugOfPrevPost } from "../queries/fetchPosts";

import styled from "styled-components";

const PostHeader = styled(Heading)`
  max-width: 66%;
  color: ${props => props.theme.global.colors.primary};
`;

const PostBody = styled(Paragraph)`
  line-height: 1.5em;
  max-width: 66%;
  a {
    color: ${props=>props.theme.global.colors['light-1']};
    font-size: 1.1em;
    text-decoration: underline;
    :hover {
      color: ${props=>props.theme.global.colors.secondary};
    }
  };
  img {
    max-width: 100%;
    height: auto;
  }
  pre {
    background: ${props=>props.theme.global.colors.backgroundFront};
    border: 1px solid ${props=>props.theme.global.colors.secondary};
    color: ${props=>props.theme.global.colors.primary};
    page-break-inside: avoid;
    font-family: monospace;
    font-size: .8em;
    line-height: 1.6;
    margin-bottom: 1.6em;
    max-width: 100%;
    overflow: auto;
    padding: 1em 1.5em;
    display: block;
    word-wrap: break-word;
  }
`;

const formatHtml = html => {
  // add target="_blank" to all links
  let formatted = html;
  formatted = formatted?.replace(/<a/g, `<a target="_blank"`);
  // remove all <hr /> tags
  formatted = formatted?.replace(/<hr\s*\/?>/g, "");
  return formatted;

}

const Post = () => {
  const { slug } = useParams();
  // TODO: handle loading state
  // TODO: handle error state
  const { data } = useQuery(`post-${slug}`, fetchPostBySlug(slug));
  const nextSlug = useQuery(`next-slug-${slug}`, fetchSlugOfNextPost(slug));
  const prevSlug = useQuery(`prev-slug-${slug}`, fetchSlugOfPrevPost(slug));

  const post = data || {};

  const published = new Date(post.published_at).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const html = post?.html;

  const formattedHtml = formatHtml(html);

  return (
    <div className="post" id="slug">
      <Header color="primary" title="Theory In Practice" />
      <Main pad="large" direction="column" align="center">
        <PostHeader>{post.title}</PostHeader>
        <Text>{published}</Text>
        <PostNav
          nextSlug={nextSlug?.data}
          prevSlug={prevSlug?.data}
        />
        <PostBody
          size="large"
          dangerouslySetInnerHTML={{ __html: formattedHtml || html }}
        />
        <PostNav
          nextSlug={nextSlug?.data}
          prevSlug={prevSlug?.data}
        />
      </Main>
    </div>
  );
};

export default Post;
