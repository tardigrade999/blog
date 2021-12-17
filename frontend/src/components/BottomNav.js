import React from 'react';

import { Button, Box } from 'grommet'
import { Link } from 'react-router-dom'

import styled from 'styled-components'


const StyledButton = styled(Button)`
  border: 2px solid ${({theme}) => theme.global.colors['light-1']};
  :hover {
   border: 2px solid ${({theme}) => theme.global.colors.secondary};
   color: ${({theme}) => theme.global.colors.secondary};
   box-shadow: none;
  }
`


const NavButton = ({label, slug}) => {
  return (
      slug ? (
        <Link to={`/${slug}`}>
          <StyledButton
            default
            label={label}
            focusIndicator={false}
          />
        </Link>
      ) : (
        <StyledButton
          default
          disabled={true}
          label={label}
          focusIndicator={false}
        />
      )
  )
}


const BottomNav = ({nextSlug, prevSlug}) => {

  return (
      <Box
        width={'66%'}
        flex
        direction='row'
        justify='between'
      >
        <NavButton label="Past" slug={prevSlug} />
        <Link to="/">
          <StyledButton
            default
            label="Home"
          />
        </Link>
        <NavButton label="Future" slug={nextSlug} />
      </Box>
  )
}

export default BottomNav;
