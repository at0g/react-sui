import React from 'react'
import styled from 'styled-components'
import Paper from '../Paper'

const Children = styled.div`
    padding: ${({ theme }) => theme.spacing.md};
`

const Header = styled(Children)`
    font-size: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    position: relative;
`

function Card({ children, label, ...props }) {
    const showHeader = !!label
    return (
        <Paper as="section" {...props}>
            {showHeader && (
                <Header>
                    {label}
                </Header>
            )}
            <Children>
                {children}
            </Children>
        </Paper>
    )
}

export default Card
