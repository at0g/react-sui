import React from 'react'
import { createRenderer } from 'fela'
import { RendererProvider } from 'react-fela'

const renderer = createRenderer()

export default function withFela (story, context) {
  return (
    <RendererProvider renderer={renderer}>
      {story(context)}
    </RendererProvider>
  )
}
