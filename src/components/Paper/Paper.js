import styled, { css } from 'styled-components'
import theme from 'styled-theming'

const paperStyles = theme('mode', {
  dark: css`
        background-color: #1f1f1f;
        color: #dadada;  
    `,
  light: css`
        background-color: #f0f0f0;
        color: #303030;
    `
})

const Paper = styled.div`
    ${paperStyles}
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    box-sizing: border-box;
    display: block;
    width: 100%;
    margin: 0 auto;
    max-width: ${({ theme }) => theme.maxLineLength};
    transition: all 300ms ease-in-out
`

export default Paper
