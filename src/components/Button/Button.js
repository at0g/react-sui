import React from 'react'
import styled, { css } from 'styled-components'

const disabledStyles = p => p.disabled
  ? css`opacity: 0.3; cursor: not-allowed;`
  : css`opacity: 1; cursor: pointer;`

const padding = p => p.theme.spacing[p.size] || 0

const Button = styled.button`
    appearance: none;
    border-radius: 3px;
    box-shadow: 0 0 0 rgba(0,0,0,0.05)
    margin: 0;
    padding: ${padding};
    ${disabledStyles}
    outline: none;
    transition: all 300ms ease-in-out;
    &:not(:active){
        &:hover, &:focus {
            box-shadow: 0 2px 2px rgba(0,0,0,0.05);
            transform: translateY(-3px);
        }
    }
    &:active {
        transform: translateY(1px);
    }
`

const renameProps = (map) => Component => props => React.createElement(
  Component,
  Object.keys(props).reduce((accum, key) => ({
    ...accum,
    [map[key] || key]: props[key]
  }), {})
)

export default Object.assign(
  renameProps({ label: 'children' })(Button),
  {
    displayName: 'Button',
    defaultProps: {
      size: 'md'
    }
  }
)
