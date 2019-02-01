import React from 'react'

class Spinner extends React.Component {
  static degreesToRadians (degrees) {
    return degrees * Math.PI / 180
  }
  
  componentDidMount () {
    this.animate()
  }

  componentWillUnmount () {
    window.cancelAnimationFrame(this.animationFrameId)
  }

    animate = () => {
      if (this.canvas) {
        this.draw(this.canvas.getContext('2d'), this.props.size / 2)
      }
      this.animationFrameId = window.requestAnimationFrame(this.animate)
    }

    draw = (ctx, radius) => {
      const rotationInDegrees = (new Date().getTime()) % 360
      const startAngle = this.constructor.degreesToRadians(rotationInDegrees)
      const endAngle = this.constructor.degreesToRadians(rotationInDegrees + 90)
      ctx.clearRect(0, 0, radius * 2, radius * 2)
      ctx.beginPath()
      ctx.arc(radius, radius, radius - 2, startAngle, endAngle)
      ctx.stroke()
    }

    render () {
      const { size, ...props } = this.props
      return (
        <canvas
          ref={el => {
            this.canvas = el
          }}
          width={size}
          height={size}
          {...props}
        />
      )
    }
}

export default Spinner
