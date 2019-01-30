import React from 'react'
import styled from 'styled-components'
import ImagePreloader from '../../containers/ImagePreloader'
import FallbackImg from '../images/FallbackImg'

const paddingBottom = ({ width, height }) => `${height / width * 100}%`

const Container = styled('div')`
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

const StyledImg = styled('div')`
    background: transparent url("${p => p.src}") 50% 50% no-repeat;
    background-size: cover;
`

const Spinner = () => <span>Loading</span>

function Image({ src, width, height, scale, ...props }) {
    return (
        <ImagePreloader src={src}>
            {({ loaded, error }) => {
                const displayWidth = Math.floor(width / scale)
                const displayHeight = Math.floor(height / scale)

                let Component = Spinner
                if (loaded && error) {
                    Component = FallbackImg
                }
                else if (loaded && !error) {
                    Component = StyledImg
                }

                return (
                    <Container aria-hidden="true" width={displayWidth} height={displayHeight}>
                        <Display as={Component} src={src} />
                    </Container>
                )
            }}
        </ImagePreloader>
    )
}

Image.defaultProps = {
    scale: window.devicePixelRatio || 1
}

export default Image
