/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import Image from './Image'

const defaultProps = { src: Symbol('path/to/image'), width: 10, height: 10 }
function getImagePreloader (props = {}) {
  return shallow(
    <Image {...defaultProps} {...props} />
  )
    .find('ImagePreloader')
}
function getDisplay (props, loaderProps) {
  return getImagePreloader(props)
    .renderProp('children')(loaderProps)
    .find('[data-sui="Image__imageArea"]').renderProp('children')()
}

describe('Image', () => {
  it('should pass props.src to ImagePreloader', () => {
    const wrapper = getImagePreloader()
    expect(wrapper.props().src).toBe(defaultProps.src)
  })

  describe('when loading', () => {
    it('should render a spinner when loading', () => {
      const wrapper = getDisplay(
        {},
        { loaded: false, error: false }
      )
      expect(wrapper.is('Spinner')).toBe(true)
    })

    function testSize (widthOrHeight) {
      const expected = 10
      const notExpected = expected + 1
      const wrapper = getDisplay(
        {
          width: notExpected,
          height: notExpected,
          [widthOrHeight]: expected
        },
        { loaded: false, error: false }
      )
      expect(wrapper.props().size).toBe(expected)
    }
    it('should set the spinner size to width as it is the smallest dimension', () => {
      testSize('width')
    })

    it('should set the spinner size to height as it is the smallest dimension', () => {
      testSize('height')
    })
  })

  describe('when loading fails', () => {
    it('should render a broken image when the src fails to load', () => {
      const wrapper = getDisplay(
        {},
        { loaded: true, error: true }
      )
      expect(wrapper.is('SvgFallbackImg')).toBe(true)
    })
  })

  describe('when loaded without errors', () => {
    it('renders a StyledImage', () => {
      const wrapper = getDisplay(
        {},
        { loaded: true, error: false }
      )
      expect(wrapper.is('[data-sui=\'Image\']')).toBe(true)
      expect(wrapper.props().src).toBe(defaultProps.src)
    })
  })
})
