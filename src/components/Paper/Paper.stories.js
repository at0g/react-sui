import React from 'react'
import { storiesOf } from '@storybook/react'
import Paper from './Paper'

storiesOf('Atoms/Paper', module)
  .add('with children', () => (
    <Paper>
      <code>Paper</code> is a primitive component.
    </Paper>
  ))
