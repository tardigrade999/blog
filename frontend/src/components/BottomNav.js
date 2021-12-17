import React from 'react';

import { Button, Box } from 'grommet'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

const BottomNav = ({nextSlug, prevSlug}) => {

  console.log('nextSlug', nextSlug)
  console.log('prevSlug', prevSlug)

  return (
      <Box
        flex
        direction='row'
      >
        {
          prevSlug ? (
            <Link to={`/${prevSlug}`}>
              <Button
                secondary
                label="Previous"
              />
            </Link>
          ) : (
            <Button
              secondary
              active='false'
              label="Previous"
            />
          )
        }
        <Link to="/">
          <Button
            secondary
            label="Home"
          />
        </Link>
        {
          nextSlug ? (
            <Link to={`/${nextSlug}`}>
              <Button
                secondary
                label="Next"
              />
            </Link>
          ) : (
            <Button
              secondary
              label="Next"
              active="false"
            />
          )
        }
      </Box>
  )
}

export default BottomNav;
