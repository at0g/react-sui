import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs'
import Card from './Card'

storiesOf('Molecules/Card', module)
    .add('With label', () => (
        <Card
            label={text(
                'label',
                'A card title showing text overflow is clipped and replaced with ellipsis',
                'props'
            )}
        >
            {text('children', 'Card children', 'props')}
        </Card>
    ))
    .add('with children', () => (
        <Card>
            {text('children', 'Card children', 'props')}
        </Card>
    ))
