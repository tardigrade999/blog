import React from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Heading,
  Text,
} from "grommet";
import styled from "styled-components";


const PreviewTitle = styled(Heading)`
  max-width: 800px;
`;

const WrapperBorderTop = (props) => {
  if (props.first) {
    return `1px solid ${props.theme.global.colors['dark-2']}`;
  }
  return "none";
}

const Wrapper = styled(Box)`
  background-color: ${props => props.theme.global.colors.background};
  border-top: ${WrapperBorderTop};
  border-bottom: 1px solid ${props => props.theme.global.colors['dark-2']};
  :hover {
    background-color: ${props => props.theme.global.colors.backgroundFront};
  }
`

const PostPreview = ({ post, i }) => {
  let navigate = useNavigate();

  const published = new Date(post.published_at).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Wrapper
      first={i === 0}
      flex
      direction="row"
      justify="flex-start"
      align="center"
      onClick={() => navigate(post.slug)}
      pad="xsmall"
    >
      <Text
        color="dark-4"
        margin={{ right: "medium" }}
      >{published}</Text>
      <PreviewTitle level={2} size="small">{post.title}</PreviewTitle>
    </Wrapper>
  )
};

export default PostPreview;
