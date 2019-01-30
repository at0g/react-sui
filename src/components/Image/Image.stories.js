import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs'
import Image from './Image'

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
