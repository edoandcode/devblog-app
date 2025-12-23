'use client'
import React from 'react';

import { GridDebug as UiKitGridDebug } from '@edoandcode/ui-kit-grid';

import defaultGridConfig from '../../../../ui-kit-grid-config.mjs';

const GridDebug = () => {
    return (
        <UiKitGridDebug config={defaultGridConfig}></UiKitGridDebug>
    )
}

export default GridDebug