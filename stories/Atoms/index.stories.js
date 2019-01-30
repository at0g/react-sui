import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { boolean, select, text } from '@storybook/addon-knobs'
import { Button, Card, Paper } from '../../src'

const childrenKnob = (DisplayName, name = 'children') => text(
    name,
    `Type in the knobs panel to edit the ${name} of ${DisplayName}`,
    'props'
)

storiesOf('Atoms/Button', module)
    .add('Button', () => (
        <Button
            disabled={boolean('disabled', false, 'props')}
            onClick={action('onClick')}
            size={select('size', ['xs', 'sm', 'md', 'lg', 'xl'], 'md', 'props')}
        >
            {childrenKnob('Button')}
        </Button>
    ))
    .add('label prop', () => (
        <Button label="children via props.label" />
    ))

storiesOf('Atoms/Paper', module)
    .add('with children', () => (
        <Paper>
            <code>Paper</code> is a primitive component.
        </Paper>
    ))

storiesOf('Molecules/Card', module)
    .add('With label', () => (
        <Card
            label={text(
                'label',
                'A card title showing text overflow is clipped and replaced with ellipsis',
                'props'
            )}
        >
            {childrenKnob('Card')}
        </Card>
    ))
    .add('with children', () => (
        <Card>
            {childrenKnob('Card')}
        </Card>
    ))
