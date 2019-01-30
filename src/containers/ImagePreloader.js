import React from 'react'

class ImagePreloader extends React.Component {
    state = {
        loaded: false,
        error: false,
    }

    constructor(props) {
        super(props);
    }

    handleError = () => {
        this.setState({ loaded: true, error: true })
    }

    handleLoad = () => {
        this.setState({ loaded: true, error: null })
    }

    render() {
        const { children, ...props } = this.props

        return (
            <React.Fragment>
                <img
                    {...props}
                    onLoad={this.handleLoad}
                    onError={this.handleError}
                    style={{ visibility: 'hidden', position: 'absolute', left: -9999 }}
                />

                {children(this.state)}
            </React.Fragment>
        )
    }
}

export default ImagePreloader
