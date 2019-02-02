import React from 'react'
import styled from 'styled-components'
import ImagePreloader from '../../containers/ImagePreloader'
import FallbackImg from '../images/FallbackImg'
import Spinner from '../Spinner'

const paddingBottom = ({ width, height }) => `${height / width * 100}%`

const ImageContainer = styled('div')`
    display: inline-block;
    width: ${p => p.width / 16}rem;
    max-width: 100%;
    position: relative;
    user-select: none;
    &:before {
        content: "";
        box-sizing: content-box;
        display: block;
        height: 0;
        padding: 0 0 ${paddingBottom};
        position: relative;
        max-width: 100%;        
    }
`

const Display = styled('div')`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    svg& {
        fill: currentColor;
        pointer-events: none;
    }
`

const StyledImg = styled(({ src, ...props }) => <div {...props} />)`
    background: transparent url("${p => p.src}") 50% 50% no-repeat;
    background-size: cover;
`

function Image ({ src, width, height, scale, ...props }) {
  return (
    <ImagePreloader src={src}>
      {({ loaded, error }) => {
        const displayWidth = Math.floor(width / scale)
        const displayHeight = Math.floor(height / scale)

        let Component

        if (!loaded) {
          Component = (props) => (
            <Spinner
              {...props}
              size={Math.min(displayWidth, displayHeight)}
            />
          )
        } else if (error) {
          Component = FallbackImg
        } else if (loaded && !error) {
          Component = props => <StyledImg {...props} src={src} />
        }

        return (
          <ImageContainer aria-hidden='true' width={displayWidth} height={displayHeight}>
            <Display as={Component} />
          </ImageContainer>
        )
      }}
    </ImagePreloader>
  )
}

Image.defaultProps = {
  scale: window.devicePixelRatio || 1
}

export default Image
