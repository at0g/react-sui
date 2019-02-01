/* eslint-env jest */
import React from 'react'
import { mount, shallow } from 'enzyme'
import Spinner from './Spinner'

describe('Spinner', () => {
  it('should render a canvas', () => {
    const wrapper = shallow(
      <Spinner size={24} />
    )
    expect(wrapper.is('canvas[width=24][height=24]')).toBe(true)
  })

  it('should pass through props to the root element', () => {
    const wrapper = shallow(
      <Spinner size={20} data-foo='foo' />
    )
    expect(wrapper.is('canvas[data-foo=\'foo\']')).toBe(true)
  })

  it('should have an animate method', () => {
    const wrapper = shallow(
      <Spinner size={20} data-foo='foo' />
    )
    expect(typeof wrapper.instance().animate).toBe('function')
  })

  describe('animation', () => {
    let cancelAnimationFrame
    let requestAnimationFrame
    let realRAF
    let realCAF

    beforeAll(() => {
      requestAnimationFrame = jest.fn(() => 'test-animation-id')
      realRAF = window.requestAnimationFrame
      window.requestAnimationFrame = requestAnimationFrame

      cancelAnimationFrame = jest.fn()
      realCAF = window.cancelAnimationFrame
      window.cancelAnimationFrame = cancelAnimationFrame
    })

    afterAll(() => {
      window.cancelAnimationFrame = realCAF
      window.requestAnimationFrame = realRAF
    })

    it('should call animate when mounted', () => {
      const node = <Spinner size={12} />
      const spy = jest.spyOn(Spinner.prototype, 'animate')
      mount(node)

      expect(spy).toBeCalled()
      expect(requestAnimationFrame).toBeCalledWith(spy)
    })

    it('should stop animating when unmounted', () => {
      const wrapper = mount(<Spinner size={12} />)
      wrapper.unmount()
      expect(cancelAnimationFrame).toBeCalledWith('test-animation-id')
    })
  })

  xit('should assert that a canvas is drawn correctly', () => {
    // TODO
  })
})
