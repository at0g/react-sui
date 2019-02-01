import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { boolean, select, text } from '@storybook/addon-knobs'
import Button from './Button'

storiesOf('Atoms/Button', module)
  .add('Button', () => (
    <Button
      disabled={boolean('disabled', false, 'props')}
      onClick={action('onClick')}
      size={select('size', ['xs', 'sm', 'md', 'lg', 'xl'], 'md', 'props')}
    >
      {text('children', 'Button children', 'props')}
    </Button>
  ))
  .add('label prop', () => (
    <Button label='children via props.label' />
  ))
