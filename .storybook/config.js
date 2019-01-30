import React from 'react'
import { configure, addDecorator } from '@storybook/react';
import { withKnobs, object, radios } from '@storybook/addon-knobs'
import { createGlobalStyle, css, ThemeProvider } from 'styled-components'
import toJsxString from 'jsx-to-string'
import theme from 'styled-theming'

import baseTheme from '../src/themes/nui-light'

const bodyStyles = theme('mode', {
    light: css`
        background-color: #fff;
        color: #333;
    `,
    dark: css`
        background-color: #333;
        color: #fff;
    `
})

const GlobalCSS = createGlobalStyle`
    body {
        ${bodyStyles}
        font-family: Roboto, sans-serif;
        margin: ${({ theme }) => theme.spacing.lg};
        transition: all 300ms ease-in-out   
    }
    code {
        color: hotpink;
        background-color: #fafafa;
        border: 1px solid hotpink;
        display: inline-block;
        padding: 2px 18px;
        box-sizing: border-box;
        max-width: 100%;
        flex: 0 1 auto;
        font-size: 1.26rem;
        position: relative;
        overflow: auto;
        vertical-align: middle;
    }
`

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator((story, context) => {
    const node = story(context)
    const sampleCode = toJsxString(node, {
        functionNameOnly: true,
        useFunctionCode: true,
        shortBooleanSyntax: true,
    })

    return (
        <React.Fragment>
            {node}
            <br /><br /><br />
            <hr />
            <code style={{ display: 'block' }}>
                <pre>{sampleCode}</pre>
            </code>
        </React.Fragment>
    )
})
addDecorator(withKnobs)
addDecorator((story, context) => (
    <ThemeProvider theme={{
        mode: radios('mode', ['light', 'dark'], 'light', 'Theme'),
        ...object('base', baseTheme, 'Theme')
    }}>
        <React.Fragment>
            <GlobalCSS />
            {story(context)}
        </React.Fragment>
    </ThemeProvider>
))

configure(loadStories, module);
