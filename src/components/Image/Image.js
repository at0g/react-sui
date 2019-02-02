import React from 'react'
import { FelaComponent } from 'react-fela'
import ImagePreloader from '../../containers/ImagePreloader'
import FallbackImg from '../images/FallbackImg'
import Spinner from '../Spinner'

const imageContainer = [
  {
    display: 'inline-block',
    maxWidth: '100%',
    position: 'relative',
    userSelect: 'none',
    ':before': {
      content: '""',
      boxSizing: 'content-box',
      display: 'block',
      height: 0,
      position: 'relative',
      maxWidth: '100%'
    }
  },
  ({ width, height }) => ({
    width: `${width / 16}rem`,
    '&:before': {
      paddingBottom: `${height / width * 100}%`
    }
  })
]

const imageArea = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0
}

const styledImg = [
  imageArea,
  {
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat'
  },
  ({ src }) => ({ backgroundImage: `url("${src}")` })
]

function Image ({ src, width, height, scale, ...props }) {
  return (
    <ImagePreloader src={src}>
      {({ loaded, error }) => {
        const displayWidth = Math.floor(width / scale)
        const displayHeight = Math.floor(height / scale)

        return (
          <FelaComponent
            style={imageContainer}
            aria-hidden='true'
            width={displayWidth}
            height={displayHeight}
            data-sui='Image__Container'
          >
            <FelaComponent style={imageArea} data-sui='Image__imageArea'>
              {(props) => {
                if (!loaded) {
                  const size = Math.min(displayWidth, displayHeight)
                  return <Spinner {...props} size={size} />
                } else if (error) {
                  return <FallbackImg {...props} />
                } else if (loaded && !error) {
                  return (
                    <FelaComponent style={styledImg} {...props} src={src} data-sui='Image' />
                  )
                }
              }}
            </FelaComponent>
          </FelaComponent>
        )
      }}
    </ImagePreloader>
  )
}

Image.defaultProps = {
  scale: window.devicePixelRatio || 1
}

export default Image
