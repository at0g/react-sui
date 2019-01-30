import React from 'react'
import styled from 'styled-components'
import ImagePreloader from '../containers/ImagePreloader'
import fallbackImg from '../assets/images/fallback-img.svg'

const paddingBottom = ({ width, height }) => `${height / width * 100}%`

const StyledImg = styled('div')`
    display: inline-block;
    width: ${p => p.width / 16}rem;
    max-width: 100%;
    &:before {
        content: "";
        background: transparent url("${p => p.src}") 50% 50% no-repeat;
        background-size: cover; 
        box-sizing: content-box;
        display: block;
        height: 0;
        padding: 0 0 ${paddingBottom};
        max-width: 100%;
    }
`

function Image({ src, fallback, width, height, scale, ...props }) {
    return (
        <ImagePreloader src={src}>
            {({ loaded, error }) => {
                const showLoading = !loaded && !error
                const showFallback = loaded && error
                const showImage = loaded || showFallback

                if (showLoading) {
                    return (
                        <span>Loading</span>
                    )
                }

                const displayWidth = Math.floor(width / scale)
                const displayHeight = Math.floor(height / scale)

                if (showImage) {
                    return (
                        <StyledImg
                            src={showFallback ? fallback : src}
                            width={displayWidth}
                            height={displayHeight}
                            aria-hidden="true"
                        />
                    )
                }
            }}
        </ImagePreloader>
    )
}

Image.defaultProps = {
    fallback: fallbackImg,
    scale: window.devicePixelRatio || 1
}

export default Image
