import React from "react";

import { Link } from "react-router-dom";

import { Header } from "grommet";

import styled from "styled-components";

const AppBar = (props) => <Header background="backgroundFront" pad="medium" {...props} />;

const HomeLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.global.colors.primary};
  :hover {
    color: ${props => props.theme.global.colors.secondary};
  }
`

const MyHeader = ({ title }) => {

  return (
    <AppBar>
      <HomeLink
        to="/"
      >
        {title}
      </HomeLink>
    </AppBar>
  );
};

export default MyHeader;
