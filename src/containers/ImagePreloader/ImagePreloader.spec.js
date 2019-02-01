/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import ImagePreloader from './ImagePreloader'

describe('ImagePreloader', () => {
  const src = Symbol('image-path')
  let children
  let wrapper
  let img

  beforeAll(() => {
    children = jest.fn(() => null)
  })

  beforeEach(() => {
    children.mockClear()
    wrapper = shallow(
      <ImagePreloader src={src}>
        {children}
      </ImagePreloader>
    )
    img = wrapper.find('VisuallyHidden')
  })

  it('should call children as a function', () => {
    expect(children).toBeCalledWith({ loaded: false, error: false })
  })

  describe('img', () => {
    let props
    beforeEach(() => {
      props = img.props()
    })

    it('should render a visually hidden image', () => {
      expect(img).toHaveLength(1)
    })

    it('should pass props.src to the image', () => {
      expect(props.src).toBe(src)
    })

    it('should add onLoad and onError handlers', () => {
      const { onLoad, onError } = props
      expect(typeof onLoad).toBe('function')
      expect(typeof onError).toBe('function')
    })

    describe('state changes', () => {
      const assertState = (expected) => {
        expect(children).toHaveBeenLastCalledWith(expected)
      }

      it('should call children when the image loads', () => {
        props.onLoad()
        assertState({ loaded: true, error: false })
      })

      it('should call children when the image fails to load', () => {
        props.onError()
        assertState({ loaded: true, error: true })
      })
    })
  })
})
