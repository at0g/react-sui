import React from 'react'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'
import Spinner from './Spinner'

storiesOf('Atoms/Spinner', module)
  .add('basic example', () => (
    <Spinner
      size={number('size', 48, 'props')}
    />
  ))
