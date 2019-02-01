import React from 'react'
import styled from 'styled-components'

const VisuallyHidden = styled('div')`
  visibility: hidden;
  position: absolute;
  left: -9999px;
`

class ImagePreloader extends React.Component {
    state = {
      loaded: false,
      error: false
    }

    handleError = () => {
      this.setState({ loaded: true, error: true })
    }

    handleLoad = () => {
      this.setState({ loaded: true, error: false })
    }

    render () {
      const { children, ...props } = this.props

      return (
        <React.Fragment>
          <VisuallyHidden
            as='img'
            {...props}
            onLoad={this.handleLoad}
            onError={this.handleError}
          />

          {children(this.state)}
        </React.Fragment>
      )
    }
}

export default ImagePreloader
