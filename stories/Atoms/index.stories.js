import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { boolean, number, select, text } from '@storybook/addon-knobs'
import { Button, Card, Image, Paper } from '../../src/components'

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

storiesOf('Molecules/Image', module)
    .add('basic example', () => {
        const width = number('width', 256, {}, 'props')
        const height = number('height', 256, {}, 'props')
        return (
            <Image
                src={`https://placehold.it/${width}x${height}`}
                alt={`Image of ${width}x${height}`}
                width={width}
                height={height}
            />
        )
    })
    .add('with no device scaling', () => (
        <Image
            alt="This image is not scaled for the pixel density of the device"
            scale={1}
            src="https://placehold.it/150x150"
            width={150}
            height={150}
        />
    ))
    .add('with fallback', () => (
        <Image
            alt="An image that will fail to load"
            src="broken src"
            width={256}
            height={256}
        />
    ))
